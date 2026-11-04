/**
 * JSONPath AST to string serialization.
 *
 * Converts parsed JSONPath AST back to string representation.
 * Uses RFC 9535 normalized format with single quotes.
 */
import { hasOwn, isCapacityError, isStackOverflow, lengthOf, ownAt } from '../handler/helper';
import { JSONPathLimitError } from './errors';
import { Comparator, JsonPathElement, LogicalExpression, Operation } from './types';

// ============================================
// Operator Mappings
// ============================================

const COMPARATOR_OPERATORS: Record<Comparator['operator'], string> = {
  eq: '==',
  ne: '!=',
  lt: '<',
  le: '<=',
  gt: '>',
  ge: '>=',
  in: 'in',
  reg: '=~',
  nin: 'nin',
  subsetof: 'subsetof',
  anyof: 'anyof',
  noneof: 'noneof',
  empty: 'empty',
  sizeof: 'sizeof',
  size: 'size',
};

const ARITHMETIC_OPERATORS: Record<Operation['operator'], string> = {
  plus: '+',
  minus: '-',
  multi: '*',
  div: '/',
};

const LOGICAL_OPERATORS: Record<LogicalExpression['operator'], string> = {
  and: '&&',
  or: '||',
};

/**
 * The operator's text; a hand-built AST may hold anything in the field. Only a
 * string is quoted in the message: coercing an arbitrary value could do
 * unbounded work (a nested array joins itself recursively).
 */
const operatorText = (table: Record<string, string>, operator: unknown): string => {
  if (typeof operator !== 'string') throw new TypeError('Expected a string operator in the AST');
  if (!hasOwn(table, operator)) throw new TypeError(`Unknown operator in the AST: ${operator}`);
  return table[operator];
};

/** Message for an unknown discriminator, quoting it only when it is a string. */
const unknownField = (what: string, value: unknown): TypeError =>
  new TypeError(typeof value === 'string' ? `Unknown ${what}: ${value}` : `Expected a string ${what} in the AST`);

// ============================================
// String Escaping Utilities
// ============================================

/**
 * Escape string for single-quoted output per RFC 9535 normalized path format.
 * Escapes: backslash, single quote, and control characters (U+0000-U+001F).
 */
const escapeForSingleQuote = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = char.charCodeAt(0);

    if (char === '\\') {
      result += '\\\\';
    } else if (char === "'") {
      result += "\\'";
    } else if (code < 0x20) {
      // Control characters U+0000-U+001F
      switch (char) {
        case '\b':
          result += '\\b';
          break;
        case '\f':
          result += '\\f';
          break;
        case '\n':
          result += '\\n';
          break;
        case '\r':
          result += '\\r';
          break;
        case '\t':
          result += '\\t';
          break;
        default:
          // Other control chars as \uXXXX
          result += '\\u' + code.toString(16).padStart(4, '0');
      }
    } else {
      result += char;
    }
  }
  return result;
};

/**
 * Format string as single-quoted literal.
 */
/** A hand-built AST may hold anything where a string is expected; escaping trusts the string's length. */
const expectString = (value: unknown): string => {
  if (typeof value !== 'string') throw new TypeError('Expected a string in the AST');
  return value;
};

const singleQuoted = (str: string): string => `'${escapeForSingleQuote(expectString(str))}'`;

/** A number or boolean field of a hand-built AST, checked before it is serialized. */
const expectScalar = <T extends number | boolean>(value: unknown, kind: 'number' | 'boolean'): T => {
  if (typeof value !== kind) throw new TypeError(`Expected a ${kind} in the AST`);
  return value as T;
};

/** A slice bound: a number, or null when omitted. */
const sliceBound = (value: unknown): string => (value === null ? '' : String(expectScalar(value, 'number')));

// ============================================
// Cycle Detection
// ============================================

/**
 * The objects (AST nodes and literal containers) on the path from the root to
 * the node being serialized. Only a hand-built AST can hold a cycle; one is
 * detected when a node is met again while still on the path, at the moment
 * the serializer reads the link, so what is checked is exactly what is
 * serialized (each field is read once). Shared, acyclic references are fine.
 */
type Path = Set<object>;

const cyclicAst = (): TypeError => new TypeError('Cannot stringify a cyclic AST');

const enter = (path: Path, node: object): void => {
  if (path.has(node)) throw cyclicAst();
  path.add(node);
};

/**
 * Stringify a JSON value with single quotes for strings.
 * Used for object and array values in filter expressions. Iterative (an
 * explicit stack of pending values and punctuation): recursion overflowed the
 * call stack on deeply nested literals such as [[[...0...]]].
 */
const stringifyJsonValue = (root: unknown, path: Path): string => {
  const out: string[] = [];
  // Punctuation, a pending value, a cursor over an array's elements, or the
  // object to take off the path once its members are written.
  type Cursor = { array: unknown[]; length: number; i: number };
  type Pending =
    | string
    | { value: unknown; cursor?: undefined; exit?: undefined }
    | { cursor: Cursor; value?: undefined; exit?: undefined }
    | { exit: object; value?: undefined; cursor?: undefined };
  const stack: Pending[] = [{ value: root }];

  while (stack.length > 0) {
    const item = stack.pop() as Pending;
    if (typeof item === 'string') {
      out.push(item);
      continue;
    }
    if (item.exit !== undefined) {
      path.delete(item.exit);
      continue;
    }
    if (item.cursor !== undefined) {
      // One element at a time, so a cycle at the first index of a huge sparse
      // array is found before anything is queued for the rest of it. Own
      // elements only: an inherited one reads as a hole.
      const cursor = item.cursor;
      if (cursor.i >= cursor.length) {
        out.push(']');
        path.delete(cursor.array);
        continue;
      }
      if (cursor.i > 0) out.push(',');
      const element = ownAt(cursor.array, cursor.i++);
      stack.push(item, { value: element });
      continue;
    }
    const value = item.value;
    if (typeof value === 'string') {
      out.push(singleQuoted(value));
    } else if (Array.isArray(value)) {
      enter(path, value);
      out.push('[');
      stack.push({ cursor: { array: value, length: lengthOf(value), i: 0 } });
    } else if (value !== null && typeof value === 'object') {
      enter(path, value);
      const entries = Object.entries(value);
      stack.push({ exit: value }, '}');
      for (let i = entries.length - 1; i >= 0; i--) {
        stack.push({ value: entries[i][1] });
        stack.push(`${singleQuoted(entries[i][0])}:`);
        if (i > 0) stack.push(',');
      }
      stack.push('{');
    } else {
      out.push(JSON.stringify(value));
    }
  }

  return out.join('');
};

// ============================================
// Helper Functions (defined before stringify)
// ============================================

/**
 * Stringify a value node based on its subtype.
 */
function stringifyValue(input: Extract<JsonPathElement, { type: 'value' }>, path: Path): string {
  switch (input.subtype) {
    case 'regex':
      return expectString(input.value) + expectString(input.opts);

    case 'string':
      return singleQuoted(input.value as string);

    case 'object':
      return stringifyJsonValue(input.value, path);

    case 'array':
      return stringifyJsonValue(input.value, path);

    case 'boolean':
      return JSON.stringify(expectScalar(input.value, 'boolean'));

    case 'number':
      return JSON.stringify(expectScalar(input.value, 'number'));

    case 'null':
      if (input.value !== null) throw new TypeError('Expected null in the AST');
      return 'null';

    /* c8 ignore start */
    default: {
      const _exhaustive: never = input;
      throw unknownField('value subtype', (_exhaustive as { subtype: unknown }).subtype);
    }
    /* c8 ignore stop */
  }
}

/**
 * Stringify a slice expression.
 */
function stringifySlice(input: Extract<JsonPathElement, { type: 'slices' }>): string {
  // Each field read once.
  const { start, end, step } = input;
  return `${sliceBound(start)}:${sliceBound(end)}${step !== null ? ':' + sliceBound(step) : ''}`;
}

// ============================================
// Main Stringify Function
// ============================================

/**
 * Convert JSONPath AST element to string representation.
 *
 * @param input - AST element to stringify
 * @returns String representation of the JSONPath
 */
export function stringify(input: JsonPathElement | null): string {
  try {
    // Inside the try: on a chain of millions of segments, the path Set can
    // reach V8's maximum Set size.
    return stringifyNode(input, new Set());
  } catch (e) {
    // Segment, operator and literal chains are iterative; only nesting (groups,
    // filters, function calls) recurses, and parse() bounds it. A hand-built
    // AST nested deeper still must not escape as a RangeError.
    if (isStackOverflow(e)) {
      throw new JSONPathLimitError('AST is nested too deeply to stringify');
    }
    if (isCapacityError(e)) {
      throw new JSONPathLimitError('AST is too large to stringify');
    }
    // The TypeError for a cyclic AST, among others.
    throw e;
  }
}

/**
 * `head` followed by `parts` in reverse order. Concatenates rather than
 * joining: join() copies its parts into a new flat string, so nested chains
 * copied the same serialized right operand once per enclosing level.
 */
function appendReversed(head: string, parts: string[]): string {
  let out = head;
  for (let i = parts.length - 1; i >= 0; i--) out += parts[i];
  return out;
}

/**
 * `open`, the nodes separated by ", ", then `close`, concatenated for the same
 * reason. As many nodes as the array holds when the call starts, own ones only.
 */
function joinNodes(open: string, nodes: readonly JsonPathElement[], close: string, path: Path): string {
  let out = open;
  const length = lengthOf(nodes as unknown[]);
  for (let i = 0; i < length; i++) {
    out += (i === 0 ? '' : ', ') + stringifyNode(ownAt(nodes as unknown[], i) as JsonPathElement | null, path);
  }
  return out + close;
}

function stringifyNode(input: JsonPathElement | null | undefined, path: Path): string {
  if (input === null || input === undefined) {
    return '';
  }

  enter(path, input);
  // The further nodes of a chain walked in a loop below, released with `input`.
  let chain: object[] | undefined;
  try {
    switch (input.type) {
      case 'root':
        return '$' + stringifyNode(input.next, path);

      case 'current':
        return '@' + stringifyNode(input.next, path);

      case 'dot':
        return '.' + stringifyNode(input.value, path);

      case 'dotdot':
        return '..' + stringifyNode(input.value, path);

      case 'bracketExpression':
      case 'bracketMember':
        return '[' + stringifyNode(input.value, path) + ']';

      case 'subscript': {
        // Iterative: one recursive call per segment overflowed the call stack on long paths.
        chain = [];
        let out = stringifyNode(input.value, path);
        for (let segment = input.next; segment !== null; segment = segment.next) {
          enter(path, segment);
          chain.push(segment);
          out += stringifyNode(segment.value, path);
        }
        return out;
      }

      case 'identifier':
        return expectString(input.value);

      case 'wildcard':
        return '*';

      case 'unions':
        return joinNodes('', input.values, '', path);

      case 'stringLiteral':
        return singleQuoted(input.value);

      case 'numericLiteral':
        return String(expectScalar(input.value, 'number'));

      case 'notExpression':
        return '!(' + stringifyNode(input.value, path) + ')';

      case 'value':
        return stringifyValue(input, path);

      case 'filterExpression':
        return '?(' + stringifyNode(input.value, path) + ')';

      case 'groupOperation':
      case 'groupExpression':
        return '(' + stringifyNode(input.value, path) + ')';

      case 'operation': {
        // Chains such as 1 + 1 + ... are left-deep: walk the left spine in a loop.
        chain = [];
        const tail: string[] = [
          ' ' + operatorText(ARITHMETIC_OPERATORS, input.operator) + ' ' + stringifyNode(input.right, path),
        ];
        let node: JsonPathElement = input.left;
        while (node.type === 'operation') {
          enter(path, node);
          chain.push(node);
          tail.push(' ' + operatorText(ARITHMETIC_OPERATORS, node.operator) + ' ' + stringifyNode(node.right, path));
          node = node.left;
        }
        return appendReversed(stringifyNode(node, path), tail);
      }

      case 'comparator': {
        const operator = input.operator;
        // Handle unary operators (empty has no right operand)
        if (operator === 'empty') {
          return stringifyNode(input.left, path) + ' empty';
        }
        return (
          stringifyNode(input.left, path) +
          ` ${operatorText(COMPARATOR_OPERATORS, operator)} ` +
          stringifyNode(input.right, path)
        );
      }

      case 'logicalExpression': {
        // Chains such as @.a && @.b && ... are left-deep: walk the left spine in a loop.
        chain = [];
        const tail: string[] = [
          ` ${operatorText(LOGICAL_OPERATORS, input.operator)} ` + stringifyNode(input.right, path),
        ];
        let node: JsonPathElement = input.left;
        while (node.type === 'logicalExpression') {
          enter(path, node);
          chain.push(node);
          tail.push(` ${operatorText(LOGICAL_OPERATORS, node.operator)} ` + stringifyNode(node.right, path));
          node = node.left;
        }
        return appendReversed(stringifyNode(node, path), tail);
      }

      case 'slices':
        return stringifySlice(input);

      case 'functionCall':
        return joinNodes(expectString(input.name) + '(', input.args as JsonPathElement[], ')', path);

      /* c8 ignore start */
      default: {
        const _exhaustive: never = input;
        throw unknownField('AST node type', (_exhaustive as { type: unknown }).type);
      }
      /* c8 ignore stop */
    }
  } finally {
    path.delete(input);
    if (chain !== undefined) {
      for (const node of chain) path.delete(node);
    }
  }
}
