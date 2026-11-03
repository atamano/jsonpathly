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

/** Upper bound on compiled NFA instructions (bounds `a{1000}{1000}` and similar). */
export const MAX_REGEX_PROGRAM_SIZE = 1000;

type Node =
  | { t: 'atom'; src: string; literal?: string }
  | { t: 'bol' }
  | { t: 'eol' }
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

type Program = {
  op: number[];
  x: number[];
  y: number[];
  atoms: Array<{ re: RegExp; literal?: string }>;
  unicode: boolean;
  multiline: boolean;
  sticky: boolean;
};

const SYNTAX_CHARS = new Set(['^', '$', '\\', '.', '*', '+', '?', '(', ')', '[', ']', '{', '}', '|', '/']);
const QUANTIFIER_RE = /^\{(\d+)(?:,(\d*))?\}/;
const HEX4_RE = /^[0-9a-fA-F]{4}/;

const isLineTerminator = (code: number): boolean =>
  code === 0x0a || code === 0x0d || code === 0x2028 || code === 0x2029;

class Parser {
  private i = 0;

  constructor(private readonly src: string, private readonly unicode: boolean) {}

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
      return { t: 'bol' };
    }
    if (ch === '$') {
      this.i++;
      return { t: 'eol' };
    }
    return this.parseQuantifier(this.parseAtom());
  }

  private parseAtom(): Node {
    const { src } = this;
    const start = this.i;
    const ch = src[start];

    if (ch === '(') {
      if (src[start + 1] === '?') {
        if (src[start + 2] !== ':') throw new UnsupportedRegex('group modifier');
        this.i = start + 3;
      } else {
        this.i = start + 1;
      }
      const inner = this.parseAlt();
      if (src[this.i] !== ')') throw new UnsupportedRegex('unclosed group');
      this.i++;
      return inner;
    }

    if (ch === '[') {
      let j = start + 1;
      if (src[j] === '^') j++;
      while (j < src.length && src[j] !== ']') j += src[j] === '\\' ? 2 : 1;
      if (j >= src.length) throw new UnsupportedRegex('unclosed class');
      this.i = j + 1;
      return { t: 'atom', src: src.slice(start, this.i) };
    }

    if (ch === '.') {
      this.i++;
      return { t: 'atom', src: '.' };
    }

    if (ch === '\\') {
      this.i = start + this.escapeLength(start);
      return { t: 'atom', src: src.slice(start, this.i) };
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
    return { t: 'atom', src: SYNTAX_CHARS.has(literal) ? `\\${literal}` : literal, literal };
  }

  /** Length of the escape sequence starting at `start` (which holds a backslash). */
  private escapeLength(start: number): number {
    const { src, unicode } = this;
    const next = src[start + 1];
    if (next === undefined) throw new UnsupportedRegex('trailing backslash');
    if (next === 'b' || next === 'B') throw new UnsupportedRegex('word boundary');
    if (next >= '1' && next <= '9') throw new UnsupportedRegex('backreference');
    if (next === '0' && /[0-9]/.test(src[start + 2] ?? '')) throw new UnsupportedRegex('octal escape');
    if (next === 'c') {
      if (!/[a-zA-Z]/.test(src[start + 2] ?? '')) throw new UnsupportedRegex('control escape');
      return 3;
    }
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

  constructor(private readonly atomFlags: string) {}

  private emit(op: number, x = 0, y = 0): number {
    if (this.op.length >= MAX_REGEX_PROGRAM_SIZE) throw new UnsupportedRegex('pattern too large');
    this.op.push(op);
    this.x.push(x);
    this.y.push(y);
    return this.op.length - 1;
  }

  private atomId(node: { src: string; literal?: string }): number {
    let id = this.atomIds.get(node.src);
    if (id === undefined) {
      id = this.atoms.length;
      const caseInsensitive = this.atomFlags.includes('i');
      this.atoms.push({
        re: new RegExp(`^(?:${node.src})$`, this.atomFlags),
        literal: caseInsensitive ? undefined : node.literal,
      });
      this.atomIds.set(node.src, id);
    }
    return id;
  }

  finish(): void {
    this.emit(OP_MATCH);
  }

  compile(node: Node): void {
    switch (node.t) {
      case 'atom':
        this.emit(OP_CHAR, this.atomId(node));
        return;
      case 'bol':
        this.emit(OP_BOL);
        return;
      case 'eol':
        this.emit(OP_EOL);
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
    const ast = new Parser(pattern, unicode).parse();
    const atomFlags = [...flags].filter((f) => f === 'i' || f === 's' || f === 'u').join('');
    const compiler = new Compiler(atomFlags);
    compiler.compile(ast);
    compiler.finish();
    return {
      op: compiler.op,
      x: compiler.x,
      y: compiler.y,
      atoms: compiler.atoms,
      unicode,
      multiline: flags.includes('m'),
      sticky: flags.includes('y'),
    };
  } catch {
    return null;
  }
};

const run = (prog: Program, input: string): boolean => {
  const { op, x, y, atoms, unicode, multiline, sticky } = prog;
  const size = op.length;
  let clist = new Int32Array(size);
  let nlist = new Int32Array(size);
  let clen = 0;
  let nlen = 0;
  // onList[pc] === gen means pc is already in the list being built for this step.
  const onList = new Int32Array(size);
  let gen = 0;
  const stack = new Int32Array(size);
  const atomGen = new Int32Array(atoms.length);
  const atomHit = new Uint8Array(atoms.length);

  let pos = 0;
  let matched = false;

  // Adds pc and everything reachable from it without consuming input to `list`.
  const addThread = (list: Int32Array, len: number, pc: number): number => {
    let sp = 0;
    stack[sp++] = pc;
    while (sp > 0) {
      const p = stack[--sp];
      if (onList[p] === gen) continue;
      onList[p] = gen;
      switch (op[p]) {
        case OP_CHAR:
          list[len++] = p;
          break;
        case OP_MATCH:
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
          if (pos === 0 || (multiline && isLineTerminator(input.charCodeAt(pos - 1)))) stack[sp++] = p + 1;
          break;
        case OP_EOL:
          if (pos === input.length || (multiline && isLineTerminator(input.charCodeAt(pos)))) stack[sp++] = p + 1;
          break;
      }
    }
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
    const step = pos + 1;

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

const MAX_CACHE_SIZE = 256;
const cache = new Map<string, Program | null>();

/**
 * Test whether `pattern` (JavaScript syntax, compiled with `flags`) matches
 * somewhere in `input`, in time linear in the input length.
 * Returns false for invalid or unsupported patterns.
 */
export const safeRegexTest = (pattern: string, flags: string, input: string): boolean => {
  const key = `${flags}/${pattern}`;
  let prog = cache.get(key);
  if (prog === undefined) {
    prog = compile(pattern, flags);
    if (cache.size >= MAX_CACHE_SIZE) cache.clear();
    cache.set(key, prog);
  }
  return prog !== null && run(prog, input);
};
