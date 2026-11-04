/**
 * Linear-time regular expression matching for filter expressions.
 *
 * `=~`, `match()` and `search()` evaluate a pattern taken from the query
 * against a string taken from the document. V8's backtracking engine takes
 * exponential time on patterns like `(a+)+$`, so a single query could block
 * the event loop (ReDoS). This module compiles the pattern into a Thompson NFA
 * and simulates it (Pike VM without captures): every input character is read
 * once, and each step visits each NFA state at most once, so matching takes
 * O(input length x pattern size) whatever the pattern.
 *
 * Only the boolean "does it match" answer is computed, which is all the
 * filter operators need. Single-character atoms (literals, `.`, classes,
 * escapes such as `\d` or `\p{L}`) are tested with a native RegExp against
 * one character: that cannot backtrack, and it keeps JavaScript semantics for
 * case folding, Unicode properties and the `s` flag.
 *
 * Constructs that need backtracking (backreferences, lookaround) or that this
 * module does not implement are rejected: the pattern then matches nothing.
 */
import { noTick, Tick } from './budget';

/** Upper bound on compiled NFA instructions (bounds `a{1000}{1000}` and similar). */
export const MAX_REGEX_PROGRAM_SIZE = 1000;

/** Longest pattern accepted, checked before any native RegExp is built or anything is cached. */
export const MAX_REGEX_PATTERN_LENGTH = 1000;

/**
 * Most `\p{...}` / `\P{...}` escapes accepted in one pattern. V8 expands each
 * property into a large code point set, so a class holding thousands of them
 * takes seconds to compile and test natively, even on a one-character input.
 */
export const MAX_REGEX_PROPERTY_ESCAPES = 16;

const SUPPORTED_FLAGS_RE = /^[dgimsuy]*$/;

/**
 * Counts `\p{` / `\P{` occurrences without a native RegExp: a successful native
 * match records its input in the legacy `RegExp.$_` state, which would keep a
 * sliced pattern's parent string alive even when the pattern is rejected.
 */
const countPropertyEscapes = (pattern: string): number => {
  let n = 0;
  for (let i = 0; i + 2 < pattern.length; i++) {
    if (pattern[i] === '\\' && (pattern[i + 1] === 'p' || pattern[i + 1] === 'P') && pattern[i + 2] === '{') n++;
  }
  return n;
};

/** Flags that groups such as `(?i:...)` can switch on or off for part of a pattern. */
type Modifiers = { i: boolean; m: boolean; s: boolean };

type Node =
  | { t: 'atom'; src: string; literal?: string; mods: Modifiers }
  | { t: 'bol'; multiline: boolean }
  | { t: 'eol'; multiline: boolean }
  | { t: 'cat'; items: Node[] }
  | { t: 'alt'; alts: Node[] }
  | { t: 'rep'; node: Node; min: number; max: number };

class UnsupportedRegex extends Error {}

const OP_CHAR = 0;
const OP_SPLIT = 1;
const OP_JMP = 2;
const OP_BOL = 3;
const OP_EOL = 4;
const OP_MATCH = 5;

export type Program = {
  op: number[];
  x: number[];
  y: number[];
  atoms: Array<{ re: RegExp; literal?: string }>;
  unicode: boolean;
  sticky: boolean;
  /** Buffers reused by every run, allocated on the first one. */
  scratch?: Scratch;
};

/**
 * Per-program working memory. Allocating it per run cost the program size for
 * every string tested, outside the budget, even when the run matched at once.
 * Marks compare against `gen` and `step`, which only grow, so nothing is
 * cleared between runs. A run reserves its range of both before starting, so
 * a run stopped by the budget leaves no mark the next run could mistake for
 * its own.
 */
type Scratch = {
  clist: Int32Array;
  nlist: Int32Array;
  onList: Int32Array;
  stack: Int32Array;
  atomGen: Int32Array;
  atomHit: Uint8Array;
  gen: number;
  step: number;
};

// Counters restart (and the marks are cleared) before they could overflow Int32.
const MAX_MARK = 2 ** 31 - 1;

/**
 * Takes the program's scratch for one run. It stays detached until the run
 * ends: reading a getter of a JavaScript document can start a nested query
 * using the same program, which then works on buffers of its own.
 */
const leaseScratch = (prog: Program, inputLength: number): Scratch => {
  const size = prog.op.length;
  const scratch: Scratch = prog.scratch ?? {
    clist: new Int32Array(size),
    nlist: new Int32Array(size),
    onList: new Int32Array(size),
    stack: new Int32Array(size),
    atomGen: new Int32Array(prog.atoms.length),
    atomHit: new Uint8Array(prog.atoms.length),
    gen: 0,
    step: 0,
  };
  prog.scratch = undefined;
  if (scratch.gen > MAX_MARK - inputLength - 2 || scratch.step > MAX_MARK - inputLength - 2) {
    scratch.onList.fill(0);
    scratch.atomGen.fill(0);
    scratch.gen = 0;
    scratch.step = 0;
  }
  return scratch;
};

const SYNTAX_CHARS = new Set(['^', '$', '\\', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|', '/']);
const QUANTIFIER_RE = /^\{(\d+)(?:,(\d*))?\}/;
const HEX4_RE = /^[0-9a-fA-F]{4}/;
const MODIFIER_GROUP_RE = /^\(\?([ims]*)(?:-([ims]*))?:/;

const isLineTerminator = (code: number): boolean =>
  code === 0x0a || code === 0x0d || code === 0x2028 || code === 0x2029;

class Parser {
  private i = 0;
  private mods: Modifiers;

  constructor(private readonly src: string, private readonly unicode: boolean, flags: string) {
    this.mods = { i: flags.includes('i'), m: flags.includes('m'), s: flags.includes('s') };
  }

  private atom(src: string, literal?: string): Node {
    return { t: 'atom', src, literal, mods: this.mods };
  }

  parse(): Node {
    const node = this.parseAlt();
    if (this.i < this.src.length) throw new UnsupportedRegex('unexpected character');
    return node;
  }

  private parseAlt(): Node {
    const alts = [this.parseSeq()];
    while (this.src[this.i] === '|') {
      this.i++;
      alts.push(this.parseSeq());
    }
    return alts.length === 1 ? alts[0] : { t: 'alt', alts };
  }

  private parseSeq(): Node {
    const items: Node[] = [];
    while (this.i < this.src.length && this.src[this.i] !== '|' && this.src[this.i] !== ')') {
      items.push(this.parseTerm());
    }
    return items.length === 1 ? items[0] : { t: 'cat', items };
  }

  private parseTerm(): Node {
    const ch = this.src[this.i];
    if (ch === '^') {
      this.i++;
      return { t: 'bol', multiline: this.mods.m };
    }
    if (ch === '$') {
      this.i++;
      return { t: 'eol', multiline: this.mods.m };
    }
    return this.parseQuantifier(this.parseAtom());
  }

  private parseAtom(): Node {
    const { src } = this;
    const start = this.i;
    const ch = src[start];

    if (ch === '(') {
      const outer = this.mods;
      if (src[start + 1] === '?') {
        // (?:...) or a modifier group such as (?i:...), (?-i:...), (?s-m:...).
        const m = MODIFIER_GROUP_RE.exec(src.slice(start, start + 12));
        if (!m) throw new UnsupportedRegex('lookaround or named group');
        const mods = { ...outer };
        for (const f of m[1]) mods[f as keyof Modifiers] = true;
        for (const f of m[2] ?? '') mods[f as keyof Modifiers] = false;
        this.mods = mods;
        this.i = start + m[0].length;
      } else {
        this.i = start + 1;
      }
      const inner = this.parseAlt();
      if (src[this.i] !== ')') throw new UnsupportedRegex('unclosed group');
      this.i++;
      this.mods = outer;
      return inner;
    }

    if (ch === '[') {
      let j = start + 1;
      if (src[j] === '^') j++;
      while (j < src.length && src[j] !== ']') j += src[j] === '\\' ? 2 : 1;
      if (j >= src.length) throw new UnsupportedRegex('unclosed class');
      this.i = j + 1;
      return this.atom(src.slice(start, this.i));
    }

    if (ch === '.') {
      this.i++;
      return this.atom('.');
    }

    if (ch === '\\') {
      // Annex B: `\c` not followed by a letter is a literal backslash, then `c` is read normally.
      if (!this.unicode && src[start + 1] === 'c' && !/[a-zA-Z]/.test(src[start + 2] ?? '')) {
        this.i = start + 1;
        return this.atom('\\\\', '\\');
      }
      this.i = start + this.escapeLength(start);
      return this.atom(src.slice(start, this.i));
    }

    // V8 already rejects these when validating the pattern; kept as a guard.
    /* c8 ignore next 3 */
    if (ch === '*' || ch === '+' || ch === '?' || ch === ')') {
      throw new UnsupportedRegex('nothing to repeat');
    }

    // Literal character (a whole code point in unicode mode).
    const code = src.codePointAt(start) as number;
    const literal = this.unicode && code > 0xffff ? String.fromCodePoint(code) : ch;
    this.i = start + literal.length;
    return this.atom(SYNTAX_CHARS.has(literal) ? `\\${literal}` : literal, literal);
  }

  /** Length of the escape sequence starting at `start` (which holds a backslash). */
  private escapeLength(start: number): number {
    const { src, unicode } = this;
    const next = src[start + 1];
    if (next === undefined) throw new UnsupportedRegex('trailing backslash');
    if (next === 'b' || next === 'B') throw new UnsupportedRegex('word boundary');
    if (next >= '1' && next <= '9') throw new UnsupportedRegex('backreference');
    if (next === '0') {
      // Annex B legacy octal: \0 followed by up to two octal digits (\01, \017). `\08` is NUL then `8`.
      if (unicode) return 2;
      let len = 2;
      while (len < 4 && /[0-7]/.test(src[start + len] ?? '')) len++;
      return len;
    }
    // `\c` without a letter was handled by the caller (non-unicode) or rejected by V8 (unicode).
    if (next === 'c') return 3;
    if (next === 'x' && /^[0-9a-fA-F]{2}/.test(src.slice(start + 2))) return 4;
    if (unicode && (next === 'p' || next === 'P' || next === 'u') && src[start + 2] === '{') {
      const close = src.indexOf('}', start + 3);
      if (close === -1) throw new UnsupportedRegex('unclosed escape');
      return close - start + 1;
    }
    if (next === 'u' && HEX4_RE.test(src.slice(start + 2))) {
      const unit = parseInt(src.slice(start + 2, start + 6), 16);
      // In unicode mode an escaped surrogate pair denotes a single code point.
      if (unicode && unit >= 0xd800 && unit <= 0xdbff && src.slice(start + 6, start + 8) === '\\u') {
        const low = src.slice(start + 8, start + 12);
        if (HEX4_RE.test(low) && parseInt(low, 16) >= 0xdc00 && parseInt(low, 16) <= 0xdfff) return 12;
      }
      return 6;
    }
    return 2;
  }

  private parseQuantifier(node: Node): Node {
    const { src } = this;
    const ch = src[this.i];
    let min: number;
    let max: number;
    if (ch === '*') {
      min = 0;
      max = Infinity;
      this.i++;
    } else if (ch === '+') {
      min = 1;
      max = Infinity;
      this.i++;
    } else if (ch === '?') {
      min = 0;
      max = 1;
      this.i++;
    } else if (ch === '{') {
      const m = QUANTIFIER_RE.exec(src.slice(this.i));
      if (!m) {
        // Not a quantifier: a literal `{`, which only non-unicode mode allows.
        return node;
      }
      min = Number(m[1]);
      max = m[2] === undefined ? min : m[2] === '' ? Infinity : Number(m[2]);
      this.i += m[0].length;
    } else {
      return node;
    }
    // Lazy and greedy quantifiers accept the same strings.
    if (src[this.i] === '?') this.i++;
    if (min > MAX_REGEX_PROGRAM_SIZE || (max !== Infinity && max > MAX_REGEX_PROGRAM_SIZE)) {
      throw new UnsupportedRegex('repetition too large');
    }
    return { t: 'rep', node, min, max };
  }
}

class Compiler {
  readonly op: number[] = [];
  readonly x: number[] = [];
  readonly y: number[] = [];
  readonly atoms: Program['atoms'] = [];
  private readonly atomIds = new Map<string, number>();

  constructor(private readonly unicode: boolean) {}

  private emit(op: number, x = 0, y = 0): number {
    if (this.op.length >= MAX_REGEX_PROGRAM_SIZE) throw new UnsupportedRegex('pattern too large');
    this.op.push(op);
    this.x.push(x);
    this.y.push(y);
    return this.op.length - 1;
  }

  private atomId(node: { src: string; literal?: string; mods: Modifiers }): number {
    const flags = (node.mods.i ? 'i' : '') + (node.mods.s ? 's' : '') + (this.unicode ? 'u' : '');
    const key = `${flags}/${node.src}`;
    let id = this.atomIds.get(key);
    if (id === undefined) {
      id = this.atoms.length;
      this.atoms.push({
        re: new RegExp(`^(?:${node.src})$`, flags),
        literal: node.mods.i ? undefined : node.literal,
      });
      this.atomIds.set(key, id);
    }
    return id;
  }

  finish(): void {
    this.emit(OP_MATCH);
  }

  // Counts compile() calls: an empty group emits nothing, so the instruction cap
  // alone would let (?:(?:(?:){1000}){1000}){1000} expand a billion times.
  private work = 0;

  compile(node: Node): void {
    if (++this.work > 4 * MAX_REGEX_PROGRAM_SIZE) throw new UnsupportedRegex('pattern too large');
    switch (node.t) {
      case 'atom':
        this.emit(OP_CHAR, this.atomId(node));
        return;
      case 'bol':
        this.emit(OP_BOL, node.multiline ? 1 : 0);
        return;
      case 'eol':
        this.emit(OP_EOL, node.multiline ? 1 : 0);
        return;
      case 'cat':
        for (const item of node.items) this.compile(item);
        return;
      case 'alt': {
        // split L1, next; L1: alt0; jmp end; next: split L2, next2; ...
        const jumps: number[] = [];
        for (let k = 0; k < node.alts.length - 1; k++) {
          const split = this.emit(OP_SPLIT);
          this.x[split] = split + 1;
          this.compile(node.alts[k]);
          jumps.push(this.emit(OP_JMP));
          this.y[split] = this.op.length;
        }
        this.compile(node.alts[node.alts.length - 1]);
        for (const j of jumps) this.x[j] = this.op.length;
        return;
      }
      case 'rep': {
        for (let k = 0; k < node.min; k++) this.compile(node.node);
        if (node.max === Infinity) {
          const split = this.emit(OP_SPLIT);
          this.x[split] = split + 1;
          this.compile(node.node);
          this.emit(OP_JMP, split);
          this.y[split] = this.op.length;
        } else {
          const splits: number[] = [];
          for (let k = node.min; k < node.max; k++) {
            const split = this.emit(OP_SPLIT);
            this.x[split] = split + 1;
            splits.push(split);
            this.compile(node.node);
          }
          for (const s of splits) this.y[s] = this.op.length;
        }
        return;
      }
    }
  }
}

/**
 * Compile a pattern with JavaScript RegExp flags.
 * Returns null when the pattern is invalid or uses an unsupported construct.
 */
const compile = (pattern: string, flags: string): Program | null => {
  try {
    // Let V8 reject syntax errors and bad flags (compiling is linear, running is what backtracks).
    new RegExp(pattern, flags);
    const unicode = flags.includes('u');
    const ast = new Parser(pattern, unicode, flags).parse();
    const compiler = new Compiler(unicode);
    compiler.compile(ast);
    compiler.finish();
    return {
      op: compiler.op,
      x: compiler.x,
      y: compiler.y,
      atoms: compiler.atoms,
      unicode,
      sticky: flags.includes('y'),
    };
  } catch {
    return null;
  }
};

// `tick` is charged for every state addThread visits. Each thread is examined
// once at the next position after being added, so this bounds the whole run,
// and an early match stops it.
const execute = (prog: Program, input: string, tick: Tick, scratch: Scratch): boolean => {
  const { op, x, y, atoms, unicode, sticky } = prog;
  const charge = tick.regexWork ?? tick;
  let { clist, nlist } = scratch;
  let clen = 0;
  let nlen = 0;
  // onList[pc] === gen means pc is already in the list being built for this step.
  const { onList, stack, atomGen, atomHit } = scratch;
  let gen = scratch.gen;
  // atomGen[a] === step means atom a was already tested at this position.
  const stepBase = scratch.step;
  // One generation per position plus the first; steps are at most input.length + 1.
  scratch.gen = gen + input.length + 2;
  scratch.step = stepBase + input.length + 2;

  let pos = 0;
  let matched = false;

  // Adds pc and everything reachable from it without consuming input to `list`.
  // Each state visited is charged: a run of empty groups such as (){0,990}
  // walks hundreds of states per input position.
  const addThread = (list: Int32Array, len: number, pc: number): number => {
    let sp = 0;
    stack[sp++] = pc;
    let visited = 0;
    while (sp > 0) {
      const p = stack[--sp];
      if (onList[p] === gen) continue;
      onList[p] = gen;
      if (++visited === 64) {
        charge(visited);
        visited = 0;
      }
      switch (op[p]) {
        case OP_CHAR:
          list[len++] = p;
          break;
        case OP_MATCH:
          charge(visited);
          matched = true;
          return len;
        case OP_JMP:
          stack[sp++] = x[p];
          break;
        case OP_SPLIT:
          stack[sp++] = y[p];
          stack[sp++] = x[p];
          break;
        case OP_BOL:
          if (pos === 0 || (x[p] === 1 && isLineTerminator(input.charCodeAt(pos - 1)))) stack[sp++] = p + 1;
          break;
        case OP_EOL:
          if (pos === input.length || (x[p] === 1 && isLineTerminator(input.charCodeAt(pos)))) stack[sp++] = p + 1;
          break;
      }
    }
    charge(visited);
    return len;
  };

  gen++;
  clen = addThread(clist, 0, 0);
  if (matched) return true;

  while (pos < input.length) {
    if (clen === 0 && sticky) return false;
    const code = unicode ? (input.codePointAt(pos) as number) : input.charCodeAt(pos);
    const width = code > 0xffff ? 2 : 1;
    const ch = input.slice(pos, pos + width);
    const step = stepBase + pos + 1;

    gen++;
    nlen = 0;
    pos += width;
    for (let k = 0; k < clen; k++) {
      const p = clist[k];
      const a = x[p];
      if (atomGen[a] !== step) {
        atomGen[a] = step;
        const atom = atoms[a];
        atomHit[a] = (atom.literal !== undefined ? atom.literal === ch : atom.re.test(ch)) ? 1 : 0;
      }
      if (atomHit[a] === 1) {
        nlen = addThread(nlist, nlen, p + 1);
        if (matched) return true;
      }
    }
    // Unanchored search: a match may also start at the new position.
    if (!sticky) {
      nlen = addThread(nlist, nlen, 0);
      if (matched) return true;
    }

    const tmp = clist;
    clist = nlist;
    nlist = tmp;
    clen = nlen;
  }
  return false;
};

const run = (prog: Program, input: string, tick: Tick): boolean => {
  const scratch = leaseScratch(prog, input.length);
  try {
    return execute(prog, input, tick, scratch);
  } finally {
    prog.scratch = scratch;
  }
};

const MAX_CACHE_SIZE = 256;
// Keyed by pattern (a flat copy), then by flags and anchoring.
const cache = new Map<string, Map<string, Program | null>>();
let cacheEntries = 0;

/**
 * The compiled program for `pattern`, or null if it is invalid or unsupported.
 * Charges the pattern's length on every call: a hit compares it with the
 * cached copy. A miss also charges the program size, which a short pattern
 * such as a{900} can make far larger than itself.
 */
export const regexProgram = (pattern: string, flags: string, anchored: boolean, tick: Tick): Program | null => {
  // Bounds checked before V8 sees the pattern and before it is cached, so oversized
  // patterns cost neither native compile time nor cache memory.
  if (pattern.length > MAX_REGEX_PATTERN_LENGTH || flags.length > 7 || !SUPPORTED_FLAGS_RE.test(flags)) return null;
  const variant = `${flags}/${anchored ? 1 : 0}`;
  const cached = cache.get(pattern)?.get(variant);
  if (cached !== undefined) {
    tick(pattern.length);
    return cached;
  }
  // A pattern produced by slice() keeps its whole parent string alive in V8, so a
  // 19-character slice of a 10 MiB string would pin those 10 MiB in the cache (via
  // the key and the atom sources). Copy it into an independent string first.
  const flat = Array.from(pattern).join('');
  // Too many property escapes is cached as unsupported, so a hit skips this scan.
  const prog =
    countPropertyEscapes(flat) > MAX_REGEX_PROPERTY_ESCAPES ? null : compile(anchored ? `^(?:${flat})$` : flat, flags);
  if (cacheEntries >= MAX_CACHE_SIZE) {
    cache.clear();
    cacheEntries = 0;
  }
  let variants = cache.get(flat);
  if (variants === undefined) cache.set(flat, (variants = new Map()));
  variants.set(variant, prog);
  cacheEntries++;
  // Charged once cached (work bounded by MAX_REGEX_PROGRAM_SIZE), so a query
  // stopped here does not leave the next one to compile it again.
  tick(flat.length + (prog === null ? 0 : prog.op.length));
  return prog;
};

/** Runs a program from regexProgram on `input`, in time linear in its length. */
export const runProgram = (prog: Program, input: string, tick: Tick): boolean => {
  tick.regexProgram?.(prog.op.length);
  return run(prog, input, tick);
};

/**
 * Test whether `pattern` (JavaScript syntax, compiled with `flags`) matches
 * somewhere in `input`, in time linear in the input length. With `anchored`,
 * the whole input must match (the pattern is wrapped as `^(?:pattern)$`
 * after the length check, so the wrapper does not eat into the budget).
 * Returns false for invalid or unsupported patterns.
 */
export const safeRegexTest = (
  pattern: string,
  flags: string,
  input: string,
  anchored = false,
  tick: Tick = noTick,
): boolean => {
  const prog = regexProgram(pattern, flags, anchored, tick);
  return prog !== null && runProgram(prog, input, tick);
};
