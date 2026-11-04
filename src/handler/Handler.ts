/**
 * JSONPath Query Handler
 *
 * Core engine that traverses JSON documents using parsed JSONPath AST.
 * Implements RFC 9535 semantics with jsonpathly extensions.
 */
import {
  BracketExpressionContent,
  BracketMemberContent,
  Comparator,
  DotDot,
  FilterExpressionContent,
  FunctionCall,
  Identifier,
  LogicalExpression,
  NumericLiteral,
  OperationContent,
  Root,
  Slices,
  StringLiteral,
  Subscript,
  Unions,
} from '../parser/types';
import { JSONPathLimitError } from '../parser/errors';
import { Tick } from './budget';
import { comparators, isEmpty, matchRegex, SetCache } from './comparators';
import { rfc9535Functions } from './functions';
import type { Program } from './regex';
import {
  hasOwn,
  isArray,
  isDefined,
  isNumber,
  isCapacityError,
  isPlainObject,
  isStackOverflow,
  lengthOf,
  ownKeys,
} from './helper';

// ============================================
// Path Formatting Utilities
// ============================================

/**
 * RFC 9535 Normalized Path Format: Use single quotes with proper escaping.
 * Escapes: \' (single quote), \\ (backslash), \b \f \n \r \t (control chars)
 */
const escapeName = (v: string): string =>
  v
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\x08/g, '\\b')
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (c) => '\\u00' + c.charCodeAt(0).toString(16).padStart(2, '0'));

/** Format numeric index for path output */
const formatNumericLiteralPath = (paths: string | string[], v: number): string | string[] => paths.concat(`[${v}]`);

// ============================================
// Index Utilities
// ============================================

/** Normalize array index (negative indices count from end) */
const normalizeArrayIndex = (index: number, length: number): number => (index < 0 ? length + index : index);

/**
 * Check if array index is valid and get element.
 * Returns { exists: true, value, index } if valid, { exists: false } otherwise.
 * This properly handles elements with undefined values. An index the array
 * does not own (a hole, or an element inherited from a non-standard
 * prototype) reads as undefined, like a hole always did.
 */
const getArrayElement = <T>(
  arr: T[],
  index: number,
): { exists: true; value: T | undefined; index: number } | { exists: false } => {
  // Length read once.
  const length = lengthOf(arr);
  const normalized = normalizeArrayIndex(index, length);
  if (normalized >= 0 && normalized < length) {
    return { exists: true, value: hasOwn(arr, normalized) ? arr[normalized] : undefined, index: normalized };
  }
  return { exists: false };
};

// ============================================
// ValuePath Type
// ============================================

type ValuePath<T = unknown> = {
  value: T;
  paths: string | string[];
  isIndefinite?: boolean;
};

/** Append `items` to `target` in place (no spread: large arrays would overflow push's arguments). */
const appendAll = <T>(target: T[], items: T[]): void => {
  for (const item of items) {
    target.push(item);
  }
};

// ============================================
// Evaluation Budget
// ============================================

/**
 * Steps a query may always take, whatever the document size. A step is a node
 * selected or visited, a filter evaluated, or a value compared.
 */
export const MIN_STEP_BUDGET = 1_000_000;

/**
 * Past MIN_STEP_BUDGET, steps allowed per node of the document. Queries whose
 * cost is linear in the document stay far below it; nested descendant
 * filters such as `$..[?@..[?@..a]]` grow polynomially and hit it.
 */
export const STEPS_PER_DOCUMENT_NODE = 100;

/**
 * Nodes a query may place in nodelists before the document is weighed; past
 * that, RETAINED_PER_DOCUMENT_NODE per document node. Steps bound the time;
 * this bounds the memory, which repeated unions such as `$[0,0][0,0]...` grow
 * faster than the step floor alone would allow. Counted as the nodes are
 * produced, as a total for the query: an upper bound on the nodes live at once.
 */
export const MIN_RETAINED_NODES = 1_000_000;

/**
 * Past MIN_RETAINED_NODES, nodes a query may retain per node of the document.
 * Counted over all segments, so `$..*..*` on n nodes produces about 11n.
 */
export const RETAINED_PER_DOCUMENT_NODE = 20;

/** Nodes weighed per request at least, to amortize the resumed traversal. */
const WEIGH_CHUNK = 10_000;

/**
 * Holes of a sparse (non-JSON) array scanned one by one before its own indices
 * are enumerated instead: bounds the scan of `new Array(2 ** 32 - 1)` without
 * giving up on populated elements further on.
 */
const HOLE_SCAN_LIMIT = 10_000;

/**
 * A container being weighed: its children are read one at a time, when
 * visited. `keys` holds an object's member names; `indices` holds the own
 * indices of an array found to be sparse, once its holes stopped being scanned.
 */
type WeighFrame = {
  container: unknown[] | Record<string, unknown>;
  keys: string[] | null;
  indices: string[] | null;
  length: number;
  i: number;
  holes: number;
};

/**
 * Size of the document, counted iteratively and only as far as the budget
 * needs it: the traversal is resumed in chunks and reads one child per node
 * weighed, so a query that stops soon after the floor weighs a few thousand
 * nodes rather than the whole document.
 */
class DocumentWeigher {
  /** Distinct objects and arrays, scalars, member names and string characters. */
  weight = 0;
  /** Values alone: what a query can select. */
  nodes = 0;
  /** String characters plus one per string: the positions a regex can scan. */
  stringPositions = 0;
  /** True once the whole document has been weighed. */
  done = false;

  private readonly seen = new Set<object>();
  private readonly frames: WeighFrame[] = [];

  constructor(root: unknown) {
    this.visit(root);
  }

  /** Weighs at least `minNodes` more nodes, or the rest of the document. */
  advance(minNodes: number): void {
    const target = this.nodes + minNodes;
    const { frames } = this;
    while (frames.length > 0 && this.nodes < target) {
      const frame = frames[frames.length - 1];
      if (frame.i >= frame.length) {
        frames.pop();
        continue;
      }
      const i = frame.i++;
      if (frame.keys === null) {
        const array = frame.container as unknown[];
        if (frame.indices !== null) {
          const index = Number(frame.indices[i]);
          if (hasOwn(array, index)) this.visit(array[index]);
        } else if (hasOwn(array, i)) {
          this.visit(array[i]);
        } else if (++frame.holes > HOLE_SCAN_LIMIT) {
          // Holes weigh nothing; past the scan limit the remaining own indices
          // are enumerated (ascending, as V8 lists them) instead of scanned.
          // Canonical indices only: a key such as "010002" is a plain member,
          // and counting it as index 10002 would weigh that element twice.
          const indices = Object.keys(array).filter((key) => {
            const index = Number(key);
            return Number.isInteger(index) && index > i && String(index) === key;
          });
          frame.indices = indices;
          frame.length = indices.length;
          frame.i = 0;
        }
      } else {
        const object = frame.container as Record<string, unknown>;
        const key = frame.keys[i];
        // A getter read before it may have deleted the member: own members only.
        if (!hasOwn(object, key)) continue;
        // Names weigh their length too: escaping them in paths is charged per character.
        this.weight += key.length;
        this.visit(object[key]);
      }
    }
    if (frames.length === 0) this.done = true;
  }

  /** Counts a value and, for a container not seen before, opens a frame on its children. */
  private visit(value: unknown): void {
    this.nodes++;
    // Strings weigh their length: comparisons and regexes are charged per character.
    this.weight += typeof value === 'string' ? 1 + value.length : 1;
    if (typeof value === 'string') this.stringPositions += 1 + value.length;
    if (typeof value !== 'object' || value === null || this.seen.has(value)) return;
    this.seen.add(value);
    if (isArray(value)) {
      // Length read once: a getter that appends elements must not keep the scan going.
      this.frames.push({ container: value, keys: null, indices: null, length: lengthOf(value), i: 0, holes: 0 });
    } else if (isPlainObject(value)) {
      const keys = ownKeys(value);
      this.frames.push({ container: value, keys, indices: null, length: keys.length, i: 0, holes: 0 });
    }
  }
}

/** An AST node (typed, or an array of arguments or selectors) being classified. */
type AstFrame = { node: object; children: unknown[]; i: number; reads: boolean };

export type HandlerOptions = {
  /**
   * Maximum number of evaluation steps before the query is aborted with a
   * JSONPathLimitError. Defaults to the larger of 1,000,000 and 100 per
   * document node or string character, plus the work of regexes up to the
   * largest program size per string character (a linear scan of every
   * string by it).
   * Pass Infinity to disable the limit.
   */
  maxSteps?: number;
};

// ============================================
// Handler Class
// ============================================

export class Handler<T = unknown> {
  rootPayload: ValuePath<T>;

  private steps = 0;
  private stepLimit: number;
  private retainedLimit: number;
  private readonly adaptiveLimit: boolean;
  private weigher: DocumentWeigher | undefined;
  private largestRegexProgram = 0;
  private regexSteps = 0;

  // Subqueries starting at `$` do not depend on the node being filtered, so
  // each one is evaluated once per query instead of once per candidate node
  // (which made `$[?$..x]` quadratic and nested `$` filters exponential).
  private readonly rootQueryCache = new Map<object, ValuePath | undefined>();

  // Sets built by subsetof/anyof/noneof, per right-hand array, for this query only
  // (the caller may change the document between queries).
  private readonly setCaches = new Map<object, SetCache>();

  /**
   * Sets built by subsetof/anyof/noneof, for this query only, per comparator
   * site and per right-hand array: an operand that does not read `@` yields the
   * same array for every candidate, but the same array reached through another
   * operand may have been changed in between by a getter.
   */
  private siteSetCache = (site: object): SetCache => {
    let cache = this.setCaches.get(site);
    if (cache === undefined) {
      cache = new WeakMap();
      this.setCaches.set(site, cache);
    }
    return cache;
  };

  // Member names from the query, canonicalized (internalized) once per selector
  // and charged by their length then: looking up a non-internalized name costs
  // native work proportional to its length for every candidate, found or not.
  // Keyed by the selector node: a lookup by the name itself would compare its
  // characters again whenever another selector holds an equal name.
  private readonly canonicalNames = new Map<object, string>();

  private canonicalName = (selector: object, name: string): string => {
    let canonical = this.canonicalNames.get(selector);
    if (canonical === undefined) {
      // One charge covers canonicalizing and escaping the name.
      this.tick(name.length);
      canonical = Object.keys({ [name]: 0 })[0];
      this.canonicalNames.set(selector, canonical);
      if (!this.escapedNames.has(canonical)) this.escapedNames.set(canonical, escapeName(canonical));
    }
    return canonical;
  };

  // Escaped member names: a name is escaped once per query and its characters
  // charged then, instead of rescanning a long name for every path built with it.
  private readonly escapedNames = new Map<string, string>();

  private formatStringLiteralPath = (paths: string | string[], name: string): string | string[] => {
    let escaped = this.escapedNames.get(name);
    if (escaped === undefined) {
      this.tick(name.length);
      escaped = escapeName(name);
      this.escapedNames.set(name, escaped);
    }
    return paths.concat(`['${escaped}']`);
  };

  /**
   * Calls `fn` for each own element of `array`, like forEach: the length is
   * read once (elements a getter appends are not visited) and holes are
   * skipped, as are elements inherited from a non-standard prototype. Unlike
   * forEach, every index is charged first: forEach scans holes without
   * calling back, so a sparse array of length 2^32 - 1 escaped the budget.
   */
  private forEachElement = (array: unknown[], fn: (item: unknown, index: number) => void): void => {
    const length = lengthOf(array);
    for (let i = 0; i < length; i++) {
      this.tick();
      if (hasOwn(array, i)) fn(array[i], i);
    }
  };

  constructor(rootPayload: T, options: HandlerOptions = {}) {
    this.rootPayload = { value: rootPayload, paths: '$' };
    this.adaptiveLimit = options.maxSteps === undefined;
    this.stepLimit = options.maxSteps ?? MIN_STEP_BUDGET;
    // Every retained node was a step, so an explicit budget bounds them too.
    this.retainedLimit = this.adaptiveLimit ? MIN_RETAINED_NODES : Infinity;
  }

  private retained = 0;

  /** Counts a node placed in a nodelist; stops the query past what the document justifies. */
  private retain = (): void => {
    if (++this.retained <= this.retainedLimit) return;
    if (this.adaptiveLimit) {
      const weigher = (this.weigher ??= new DocumentWeigher(this.rootPayload.value));
      while (!weigher.done) {
        weigher.advance(
          Math.max(WEIGH_CHUNK, Math.ceil((this.retained - this.retainedLimit) / RETAINED_PER_DOCUMENT_NODE)),
        );
        this.raiseLimits(weigher);
        if (this.retained <= this.retainedLimit) return;
      }
      this.raiseLimits(weigher);
      if (this.retained <= this.retainedLimit) return;
    }
    throw new JSONPathLimitError(`Query retains more than ${this.retainedLimit} nodes`);
  };

  /** Both limits, from what has been weighed so far. */
  private raiseLimits = (weigher: DocumentWeigher): void => {
    // Regexes get a linear scan of the strings by the largest program on top,
    // but only for the regex work done: unused allowance would let one cheap
    // regex pay for unrelated polynomial work.
    const regexAllowance = Math.min(this.regexSteps, this.largestRegexProgram * weigher.stringPositions);
    this.stepLimit = Math.max(MIN_STEP_BUDGET, STEPS_PER_DOCUMENT_NODE * weigher.weight) + regexAllowance;
    this.retainedLimit = Math.max(MIN_RETAINED_NODES, RETAINED_PER_DOCUMENT_NODE * weigher.nodes);
  };

  private tick: Tick = Object.assign(
    (n = 1): void => {
      this.steps += n;
      if (this.steps <= this.stepLimit) return;
      if (this.adaptiveLimit) {
        // The document is weighed only once a query turns out to be expensive,
        // and only as far as needed to cover the deficit, so cheap queries on
        // large documents never pay for it and expensive ones pay gradually.
        const weigher = (this.weigher ??= new DocumentWeigher(this.rootPayload.value));
        while (!weigher.done) {
          weigher.advance(Math.max(WEIGH_CHUNK, Math.ceil((this.steps - this.stepLimit) / STEPS_PER_DOCUMENT_NODE)));
          this.raiseLimits(weigher);
          if (this.steps <= this.stepLimit) return;
        }
        this.raiseLimits(weigher);
        if (this.steps <= this.stepLimit) return;
      }
      throw new JSONPathLimitError(`Query exceeded ${this.stepLimit} evaluation steps`);
    },
    {
      regexProgram: (size: number): void => {
        this.largestRegexProgram = Math.max(this.largestRegexProgram, size);
      },
      regexWork: (n: number): void => {
        this.regexSteps += n;
        this.tick(n);
      },
      regexSites: new Map<object, Program | null>(),
    },
  );

  // Filter subexpressions that do not read `@` (`$.s != $.t`, `length($) > 0`)
  // have the same value for every candidate: evaluated once per query.
  private readonly readsCurrent = new WeakMap<object, boolean>();
  private readonly invariantResults = new Map<object, unknown>();

  private isInvariant = (node: object): boolean => {
    if (!this.readsCurrent.has(node)) this.classify(node);
    return !this.readsCurrent.get(node);
  };

  /**
   * Records, for `root` and every node below it, whether it reads the current
   * node `@` of the filter it belongs to. `@` inside a nested filter refers to
   * that filter's own candidates, and literal values hold data, not AST nodes:
   * neither is searched. One post-order pass with an explicit stack; every
   * node classified on the way is cached, so nested function calls are not
   * rescanned once per level.
   */
  private classify = (root: object): void => {
    const known = this.readsCurrent;
    const frames: AstFrame[] = [];

    // Returns the answer for a node already known or decided at once, or
    // undefined after pushing a frame for it.
    const enter = (value: unknown): boolean | undefined => {
      if (typeof value !== 'object' || value === null) return false;
      const cached = known.get(value);
      if (cached !== undefined) return cached;
      const type = (value as { type?: unknown }).type;
      if (type === 'current') {
        known.set(value, true);
        return true;
      }
      if (type === 'filterExpression' || type === 'value') {
        known.set(value, false);
        return false;
      }
      // Not charged: every node is classified once per query, so this pass is
      // linear in the parsed query, like parsing itself. Charging it made the
      // default budget scale with the query, and padding bought evaluation.
      const children = Object.values(value);
      frames.push({ node: value, children, i: 0, reads: false });
      return undefined;
    };

    enter(root);
    while (frames.length > 0) {
      const frame = frames[frames.length - 1];
      if (frame.i < frame.children.length) {
        if (enter(frame.children[frame.i++]) === true) frame.reads = true;
        continue;
      }
      known.set(frame.node, frame.reads);
      frames.pop();
      if (frame.reads && frames.length > 0) frames[frames.length - 1].reads = true;
    }
  };

  private memoInvariant = <R>(node: object, compute: () => R): R => {
    if (!this.isInvariant(node)) return compute();
    if (this.invariantResults.has(node)) return this.invariantResults.get(node) as R;
    const result = compute();
    this.invariantResults.set(node, result);
    return result;
  };

  private handleRootQuery = (key: object, next: Subscript | null): ValuePath | undefined => {
    if (this.rootQueryCache.has(key)) return this.rootQueryCache.get(key);
    const result = this.handleSubscript(this.rootPayload, next);
    this.rootQueryCache.set(key, result);
    return result;
  };

  // ============================================
  // Property Access Handlers
  // ============================================

  private handleIdentifier = (payload: ValuePath, tree: Identifier): ValuePath | undefined =>
    this.selectMember(payload, tree);

  private handleStringLiteral = (payload: ValuePath, tree: StringLiteral): ValuePath | undefined =>
    this.selectMember(payload, tree);

  private selectMember = ({ value, paths }: ValuePath, selector: Identifier | StringLiteral): ValuePath | undefined => {
    if (!isPlainObject(value)) {
      return;
    }
    const name = this.canonicalName(selector, selector.value);
    if (!hasOwn(value, name)) {
      return;
    }
    return { value: value[name], paths: this.formatStringLiteralPath(paths, name) };
  };

  private handleWildcard = ({ value, paths }: ValuePath): ValuePath[] => {
    if (isArray(value)) {
      // Holes of sparse arrays are skipped: map would keep them and hand
      // undefined entries to the result accumulators.
      const results: ValuePath[] = [];
      this.forEachElement(value, (item, index) => {
        this.retain();
        results.push({ value: item, paths: formatNumericLiteralPath(paths, index) });
      });
      return results;
    }
    if (isPlainObject(value)) {
      const keys = ownKeys(value);
      this.tick(keys.length);
      const results: ValuePath[] = [];
      for (const key of keys) {
        // Still own? A getter read before it may have deleted the member.
        if (hasOwn(value, key)) {
          this.retain();
          results.push({ value: value[key], paths: this.formatStringLiteralPath(paths, key) });
        }
      }
      return results;
    }
    return [];
  };

  // ============================================
  // Numeric Index Handlers
  // ============================================

  /** Bracket notation numeric index - RFC 9535: only works on arrays */
  private handleNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (!isArray(value)) {
      return;
    }
    const result = getArrayElement(value, tree.value);
    if (result.exists) {
      return { value: result.value, paths: formatNumericLiteralPath(paths, result.index) };
    }
    return;
  };

  /** Dot notation numeric ($.2) - works as property access on objects, index on arrays */
  private handleDotNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (isArray(value)) {
      const result = getArrayElement(value, tree.value);
      if (result.exists) {
        return { value: result.value, paths: formatNumericLiteralPath(paths, result.index) };
      }
      return;
    }
    if (isPlainObject(value)) {
      const key = String(tree.value);
      if (hasOwn(value, key)) {
        return { value: value[key], paths: this.formatStringLiteralPath(paths, key) };
      }
      return;
    }
    return;
  };

  // ============================================
  // Slice Handler
  // ============================================

  /** RFC 9535 Section 2.3.4.2: Array slice semantics */
  private handleSlices = ({ value, paths }: ValuePath, tree: Slices): ValuePath[] => {
    if (!isArray(value)) {
      return [];
    }

    const len = lengthOf(value);
    const step = tree.step ?? 1;

    // Step of 0 returns empty per RFC 9535
    if (step === 0) {
      return [];
    }

    // Normalize start (n) and end (m) based on step direction
    let n: number;
    let m: number;

    if (step > 0) {
      n = tree.start !== null ? normalizeArrayIndex(tree.start, len) : 0;
      m = tree.end !== null ? normalizeArrayIndex(tree.end, len) : len;
    } else {
      n = tree.start !== null ? normalizeArrayIndex(tree.start, len) : len - 1;
      m = tree.end !== null ? normalizeArrayIndex(tree.end, len) : -len - 1;
    }

    // Compute bounds per RFC 9535 Section 2.3.4.2
    let lower: number;
    let upper: number;

    if (step > 0) {
      lower = Math.max(n, 0);
      upper = Math.min(m, len);
    } else {
      // For negative step: upper = min(start, len-1), lower = max(end, -1)
      upper = Math.min(n, len - 1);
      lower = Math.max(m, -1);
    }

    // Iterate and collect results
    const results: ValuePath[] = [];
    let i = step > 0 ? lower : upper;

    while ((step > 0 && i < upper) || (step < 0 && i > lower)) {
      this.tick();
      // Holes and inherited elements read as undefined, as holes always did.
      this.retain();
      results.push({ value: hasOwn(value, i) ? value[i] : undefined, paths: formatNumericLiteralPath(paths, i) });
      i += step;
    }

    return results;
  };

  // ============================================
  // Union and Index Handlers
  // ============================================

  // RFC 9535: Union selector list supports mixed types (strings, numbers, wildcards)
  private handleUnions = (payload: ValuePath, tree: Unions): ValuePath[] => {
    const results: ValuePath[] = [];

    for (const selector of tree.values) {
      // Charged even when the selector selects nothing: a long list of
      // missing names applied to many nodes is work too.
      this.tick();
      switch (selector.type) {
        case 'identifier':
          if (isPlainObject(payload.value)) {
            const result = this.handleIdentifier(payload, selector);
            if (isDefined(result)) {
              this.retain();
              results.push(result);
            }
          }
          break;
        case 'stringLiteral':
          if (isPlainObject(payload.value)) {
            const result = this.handleStringLiteral(payload, selector);
            if (isDefined(result)) {
              this.retain();
              results.push(result);
            }
          }
          break;
        case 'numericLiteral':
          if (isArray(payload.value)) {
            const result = this.handleNumericLiteral(payload, selector);
            if (isDefined(result)) {
              this.retain();
              results.push(result);
            }
          }
          break;
        case 'wildcard':
          appendAll(results, this.handleWildcard(payload));
          break;
      }
    }

    return results;
  };

  // ============================================
  // Recursive Descent Handler
  // ============================================

  private handleDotdot = (payload: ValuePath, tree: DotDot): ValuePath[] => {
    const results: ValuePath[] = [];
    this.collectDotdot(payload, tree, results);
    return results;
  };

  // One accumulator for the whole descent, and an explicit stack rather than
  // recursion: returning a fresh array per level copied every result once per
  // ancestor (quadratic), and recursing overflowed the call stack on deeply
  // nested documents. Pre-order with children pushed in reverse keeps the
  // document order of the recursive version.
  private collectDotdot = (start: ValuePath, tree: DotDot, results: ValuePath[]): void => {
    const treeValue = tree.value;
    // One frame per ancestor on the current path, holding the keys or length
    // read when the ancestor was visited. Each child is read when visited, so
    // the document's getters run in the order of the recursive traversal, and
    // only if the parent still owns it at that moment.
    const frames: { parent: ValuePath; keys: string[] | null; length: number; i: number }[] = [];
    // Each node is charged when visited, before its payload and path are built.
    this.tick();

    let payload: ValuePath | undefined = start;
    while (payload !== undefined) {
      const value = payload.value;

      // Match at current level
      switch (treeValue.type) {
        case 'bracketMember': {
          const result = this.handleBracketMemberContent(payload, treeValue.value);
          if (isDefined(result)) {
            this.retain();
            results.push(result);
          }
          break;
        }
        case 'bracketExpression': {
          if (isPlainObject(value) || (isArray(value) && treeValue.value.type === 'wildcard')) {
            appendAll(results, this.handleBracketExpressionContent(payload, treeValue.value));
          }
          break;
        }
        case 'wildcard': {
          appendAll(results, this.handleWildcard(payload));
          break;
        }
        case 'identifier': {
          const result = this.handleIdentifier(payload, treeValue);
          if (isDefined(result)) {
            this.retain();
            results.push(result);
          }
          break;
        }
      }

      // Descend into the children
      if (isPlainObject(value)) {
        const keys = ownKeys(value);
        // The keys are charged when snapshotted: a cycle through the first key
        // of a wide object would otherwise retain one snapshot per level while
        // paying for a single child each.
        this.tick(keys.length);
        frames.push({ parent: payload, keys, length: keys.length, i: 0 });
      } else if (isArray(value)) {
        frames.push({ parent: payload, keys: null, length: lengthOf(value), i: 0 });
      }

      // Next child in pre-order. Every array index is charged; holes, inherited
      // elements and members deleted meanwhile are skipped, like the wildcard does.
      payload = undefined;
      while (frames.length > 0) {
        const frame = frames[frames.length - 1];
        if (frame.i >= frame.length) {
          frames.pop();
          continue;
        }
        const i = frame.i++;
        if (frame.keys === null) {
          this.tick();
          const parent = frame.parent.value as unknown[];
          if (!hasOwn(parent, i)) continue;
          payload = { value: parent[i], paths: formatNumericLiteralPath(frame.parent.paths, i) };
        } else {
          const parent = frame.parent.value as Record<string, unknown>;
          const key = frame.keys[i];
          if (!hasOwn(parent, key)) continue;
          payload = { value: parent[key], paths: this.formatStringLiteralPath(frame.parent.paths, key) };
        }
        break;
      }
    }
  };

  // ============================================
  // Operation Handlers (Arithmetic)
  // ============================================

  private handleOperationContent = (payload: ValuePath, tree: OperationContent): ValuePath | undefined => {
    this.tick();
    switch (tree.type) {
      case 'root':
        return this.handleRootQuery(tree, tree.next);
      case 'current':
        return this.handleSubscript(payload, tree.next);
      case 'value':
        return { value: tree.value, paths: payload.paths };
      case 'groupOperation':
        // Memoized when the group does not read `@`, like the other invariant tests.
        return this.memoInvariant(tree, () => this.handleOperationContent(payload, tree.value));
      case 'functionCall': {
        const result = this.handleFunctionCall(payload, tree);
        return { value: result, paths: payload.paths };
      }
      case 'operation': {
        // Arithmetic chains are left-deep (((a + b) - c) * ...): walk the left
        // spine in a loop rather than recursing once per operator.
        const steps: { operator: typeof tree.operator; right: OperationContent }[] = [];
        let node: OperationContent = tree;
        while (node.type === 'operation') {
          steps.push({ operator: node.operator, right: node.right });
          node = node.left;
        }
        let acc: unknown = this.handleOperationContent(payload, node)?.value;
        this.tick(steps.length);
        // Every operand is evaluated, as the recursive version did (a getter in
        // a later operand still runs); an invalid intermediate makes the result Nothing.
        for (let i = steps.length - 1; i >= 0; i--) {
          const right = this.handleOperationContent(payload, steps[i].right)?.value;
          if (!isNumber(acc) || !isNumber(right)) {
            acc = undefined;
            continue;
          }
          switch (steps[i].operator) {
            case 'plus':
              acc = acc + right;
              break;
            case 'minus':
              acc = acc - right;
              break;
            case 'div':
              acc = right === 0 ? undefined : acc / right;
              break;
            case 'multi':
              acc = acc * right;
              break;
          }
        }
        return isNumber(acc) ? { value: acc, paths: payload.paths } : undefined;
      }
    }
  };

  // ============================================
  // Comparator Handler
  // ============================================

  private handleComparator = (payload: ValuePath, tree: Comparator): boolean =>
    this.memoInvariant(tree, () => this.evaluateComparator(payload, tree));

  private evaluateComparator = (payload: ValuePath, tree: Comparator): boolean => {
    const leftValue = this.handleOperationContent(payload, tree.left)?.value;

    // Handle unary 'empty' operator
    if (tree.operator === 'empty') {
      return isEmpty(leftValue);
    }

    // Handle regex operator (different signature)
    if (tree.operator === 'reg') {
      return matchRegex(leftValue, tree.right.value, tree.right.opts, this.tick, tree);
    }

    // Handle standard binary comparators
    const rightValue = this.handleOperationContent(payload, tree.right)?.value;
    const comparatorFn = comparators[tree.operator];

    if (comparatorFn) {
      // Sets built from the right operand are reused across candidates only
      // when the operand does not read `@`: the same array object is then the
      // same operand (`@ anyof $.allowed`), whereas an operand read through `@`
      // may be a document array whose getters answer differently each time.
      const sets = this.isInvariant(tree.right) ? this.siteSetCache(tree.right) : undefined;
      return comparatorFn(leftValue, rightValue, this.tick, sets);
    }
    /* c8 ignore next */
    return false;
  };

  // ============================================
  // Logical Expression Handler
  // ============================================

  // Chains such as @.a && @.b || ... are left-deep: walk the left spine in a
  // loop rather than recursing once per operator, and short-circuit.
  private handleLogicalExpression = (payload: ValuePath, tree: LogicalExpression): boolean =>
    this.memoInvariant(tree, () => this.evaluateLogicalExpression(payload, tree));

  private evaluateLogicalExpression = (payload: ValuePath, tree: LogicalExpression): boolean => {
    const steps: { operator: LogicalExpression['operator']; right: FilterExpressionContent }[] = [];
    // A chain reading @ may start with a prefix that does not (`true && ... && @`):
    // stop there, so the prefix goes through the memoized handler instead of
    // being redone per candidate. A chain not reading @ at all is flattened
    // whole: it is memoized as a unit, and recursing into it per level could
    // overflow the stack.
    const stopAtInvariant = !this.isInvariant(tree);
    let node: FilterExpressionContent = tree;
    while (node.type === 'logicalExpression' && (node === tree || !stopAtInvariant || !this.isInvariant(node))) {
      steps.push({ operator: node.operator, right: node.right });
      node = node.left;
    }
    this.tick(steps.length);
    let result = this.handleFilterExpressionContent(payload, node);
    for (let i = steps.length - 1; i >= 0; i--) {
      if (steps[i].operator === 'and' ? result : !result) {
        result = this.handleFilterExpressionContent(payload, steps[i].right);
      }
    }
    return result;
  };

  // ============================================
  // Function Call Handler
  // ============================================

  private handleFunctionCall = (payload: ValuePath, tree: FunctionCall): unknown =>
    this.memoInvariant(tree, () => this.evaluateFunctionCall(payload, tree));

  private evaluateFunctionCall = (payload: ValuePath, tree: FunctionCall): unknown => {
    const args = tree.args.map((arg) => this.handleOperationContent(payload, arg)?.value);
    const fn = rfc9535Functions[tree.name];
    const pattern = tree.args[1] as { type?: string; subtype?: string } | undefined;
    const literal = pattern?.type === 'stringLiteral' || pattern?.subtype === 'string';
    return fn ? fn(args, this.tick, literal ? tree : undefined) : undefined;
  };

  // ============================================
  // Filter Expression Handler
  // ============================================

  private handleFilterExpressionContent = (payload: ValuePath, tree: FilterExpressionContent): boolean => {
    this.tick();
    switch (tree.type) {
      case 'logicalExpression':
        return this.handleLogicalExpression(payload, tree);
      case 'comparator':
        return this.handleComparator(payload, tree);
      // Memoized when the wrapped test does not read `@`, like the tests themselves.
      case 'groupExpression':
        return this.memoInvariant(tree, () => this.handleFilterExpressionContent(payload, tree.value));
      case 'notExpression':
        return this.memoInvariant(tree, () => !this.handleFilterExpressionContent(payload, tree.value));
      case 'functionCall':
        return !!this.handleFunctionCall(payload, tree);
      case 'root': {
        const result = this.handleRootQuery(tree, tree.next);
        // For indefinite results (filters, wildcards), check if non-empty
        if (result?.isIndefinite) {
          return Array.isArray(result.value) && result.value.length > 0;
        }
        return isDefined(result);
      }
      case 'current': {
        const result = this.handleSubscript(payload, tree.next);
        // For indefinite results (filters, wildcards), check if non-empty
        if (result?.isIndefinite) {
          return Array.isArray(result.value) && result.value.length > 0;
        }
        return isDefined(result);
      }
      case 'value':
        return !!tree.value;
    }
  };

  // ============================================
  // Bracket Content Handlers
  // ============================================

  private handleBracketMemberContent = (payload: ValuePath, tree: BracketMemberContent): ValuePath | undefined => {
    switch (tree.type) {
      case 'identifier':
        return this.handleIdentifier(payload, tree);
      case 'numericLiteral':
        return this.handleNumericLiteral(payload, tree);
      case 'stringLiteral':
        return this.handleStringLiteral(payload, tree);
    }
  };

  private handleBracketExpressionContent = (payload: ValuePath, tree: BracketExpressionContent): ValuePath[] => {
    const payloadValue = payload.value;

    switch (tree.type) {
      case 'filterExpression': {
        const results: ValuePath[] = [];

        // RFC 9535 Section 2.3.5.1: Filter selects children for which expression is TRUE
        if (isArray(payloadValue)) {
          this.forEachElement(payloadValue, (value, index) => {
            const item = { value, paths: formatNumericLiteralPath(payload.paths, index) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              this.retain();
              results.push(item);
            }
          });
        } else if (isPlainObject(payloadValue)) {
          // For objects, iterate over values (children), not the root object.
          // The keys are charged when snapshotted: nested filters over a wide
          // object retained one uncharged snapshot per level.
          const keys = ownKeys(payloadValue);
          this.tick(keys.length);
          for (const key of keys) {
            // Still own? A getter read before it may have deleted the member.
            if (!hasOwn(payloadValue, key)) continue;
            const item = { value: payloadValue[key], paths: this.formatStringLiteralPath(payload.paths, key) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              this.retain();
              results.push(item);
            }
          }
        }

        return results;
      }
      case 'unions':
        return this.handleUnions(payload, tree);
      case 'wildcard':
        return this.handleWildcard(payload);
      case 'slices':
        return this.handleSlices(payload, tree);
    }
  };

  // ============================================
  // Segment Evaluation
  // ============================================

  /** Segments that can select any number of nodes. */
  private isIndefiniteSegment = (tree: Subscript): boolean => {
    const value = tree.value;
    return (
      value.type === 'bracketExpression' ||
      value.type === 'dotdot' ||
      (value.type === 'dot' && value.value.type === 'wildcard')
    );
  };

  private selectMany = (payload: ValuePath, tree: Subscript): ValuePath[] => {
    const value = tree.value;
    switch (value.type) {
      case 'bracketExpression':
        return this.handleBracketExpressionContent(payload, value.value);
      case 'dotdot':
        return this.handleDotdot(payload, value);
      default:
        return this.handleWildcard(payload);
    }
  };

  private selectOne = (payload: ValuePath, tree: Subscript): ValuePath | undefined => {
    const value = tree.value;
    switch (value.type) {
      case 'bracketMember':
        return this.handleBracketMemberContent(payload, value.value);
      case 'dot':
        if (value.value.type === 'identifier') return this.handleIdentifier(payload, value.value);
        if (value.value.type === 'numericLiteral') return this.handleDotNumericLiteral(payload, value.value);
    }
    /* c8 ignore next */
    return;
  };

  // ============================================
  // Main Subscript Handler
  // ============================================

  // Applies the segments depth first, node by node, as the recursive version
  // did (so the document's getters run in the same order), but with an explicit
  // stack instead of one call frame per segment: long queries on deep documents
  // cannot overflow the call stack. Results are appended in place: rebuilding
  // the accumulator per item made large result sets quadratic.
  private handleSubscript = (payload: ValuePath, tree: Subscript | null): ValuePath | undefined => {
    if (tree === null) {
      return payload;
    }

    const results: ValuePath[] = [];
    const stack: { node: ValuePath; segment: Subscript }[] = [{ node: payload, segment: tree }];
    // The result is a nodelist once some node reaches a segment that can
    // select any number of nodes; `$.missing[*]` stays a single, missing value.
    let indefinite = false;

    while (stack.length > 0) {
      const { node, segment } = stack.pop() as { node: ValuePath; segment: Subscript };
      let selected: ValuePath[];
      if (this.isIndefiniteSegment(segment)) {
        indefinite = true;
        selected = this.selectMany(node, segment);
      } else {
        this.tick();
        const result = this.selectOne(node, segment);
        if (!isDefined(result)) continue;
        selected = [result];
      }
      const next = segment.next;
      if (next === null) {
        appendAll(results, selected);
      } else {
        for (let i = selected.length - 1; i >= 0; i--) {
          stack.push({ node: selected[i], segment: next });
        }
      }
    }

    if (!indefinite) {
      return results[0];
    }

    const values: unknown[] = [];
    const paths: string[] = [];
    for (const node of results) {
      values.push(node.value);
      paths.push(node.paths as string);
    }
    return { value: values, paths, isIndefinite: true };
  };

  // ============================================
  // Public Entry Point
  // ============================================

  public handleRoot = (tree: Root): ValuePath | undefined => {
    try {
      return this.handleSubscript(this.rootPayload, tree.next);
    } catch (e) {
      // Safety net: evaluation recurses only along filter nesting, which the
      // parser bounds, but a RangeError must never escape as a crash.
      /* c8 ignore next 3 */
      if (isStackOverflow(e)) {
        throw new JSONPathLimitError('Query is nested too deeply');
      }
      // Normalized paths grow with the depth; on a cyclic JavaScript object a
      // path can outgrow V8's maximum string length before the budget runs out.
      // A Set built for subsetof & co. can likewise outgrow V8's 2^24 entries.
      if (isCapacityError(e)) {
        throw new JSONPathLimitError('Query result is too large');
      }
      throw e;
    }
  };
}
