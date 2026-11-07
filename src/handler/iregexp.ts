/**
 * RFC 9485 I-Regexp: validation and translation to an ECMAScript pattern.
 *
 * `match()` and `search()` take I-Regexp patterns, whose syntax differs from
 * JavaScript's: `\-` is a valid escape outside classes, `.` excludes only CR
 * and LF, and there is no `\d`, `\w`, `\b`, lookaround, backreference,
 * non-capturing group or lazy quantifier.
 *
 * `^` and `$` stay anchors, as the JSONPath Compliance Test Suite requires
 * (`match(@, '^ab.*')` selects "abc"), although RFC 9485's ABNF lists them
 * among ordinary characters. This module checks a
 * pattern against the ABNF of RFC 9485 section 5 and rewrites it as section
 * 5.3 describes, for the linear-time matcher in regex.ts (compiled with the
 * `u` flag, its `iregexp` mode making `.` match anything but CR and LF).
 *
 * One pass over the pattern, without recursion or native RegExps.
 */

/** RFC 9485 SingleCharEsc: the characters that may follow a backslash. */
const SINGLE_CHAR_ESCAPES = new Set([
  '(',
  ')',
  '*',
  '+',
  '-',
  '.',
  '?',
  '[',
  '\\',
  ']',
  '^',
  'n',
  'r',
  't',
  '{',
  '|',
  '}',
]);

/** RFC 9485 IsCategory: General_Category values usable in \p{..} and \P{..}. */
const CATEGORIES = new Set([
  'L',
  'Ll',
  'Lm',
  'Lo',
  'Lt',
  'Lu',
  'M',
  'Mc',
  'Me',
  'Mn',
  'N',
  'Nd',
  'Nl',
  'No',
  'P',
  'Pc',
  'Pd',
  'Pe',
  'Pf',
  'Pi',
  'Po',
  'Ps',
  'Z',
  'Zl',
  'Zp',
  'Zs',
  'S',
  'Sc',
  'Sk',
  'Sm',
  'So',
  'C',
  'Cc',
  'Cf',
  'Cn',
  'Co',
]);

const isHigh = (code: number): boolean => code >= 0xd800 && code <= 0xdbff;
const isLow = (code: number): boolean => code >= 0xdc00 && code <= 0xdfff;
const isDigit = (ch: string | undefined): boolean => ch !== undefined && ch >= '0' && ch <= '9';

/** A character read from the pattern: its ECMAScript text, its length in the pattern and its code point. */
type Char = { text: string; length: number; code: number };

/** One literal code point at `i` (a surrogate pair counts as one), or null for a lone surrogate. */
const readCodePoint = (p: string, i: number): Char | null => {
  const unit = p.charCodeAt(i);
  if (isHigh(unit) && isLow(p.charCodeAt(i + 1))) {
    return {
      text: p.slice(i, i + 2),
      length: 2,
      code: (unit - 0xd800) * 0x400 + (p.charCodeAt(i + 1) - 0xdc00) + 0x10000,
    };
  }
  if (isHigh(unit) || isLow(unit)) return null;
  return { text: p[i], length: 1, code: unit };
};

/** SingleCharEsc at `i` (a backslash), or null. */
const readSingleCharEscape = (p: string, i: number): Char | null => {
  const ch = p[i + 1];
  if (ch === undefined || !SINGLE_CHAR_ESCAPES.has(ch)) return null;
  if (ch === 'n') return { text: '\\n', length: 2, code: 0x0a };
  if (ch === 'r') return { text: '\\r', length: 2, code: 0x0d };
  if (ch === 't') return { text: '\\t', length: 2, code: 0x09 };
  return { text: '\\' + ch, length: 2, code: ch.charCodeAt(0) };
};

/** catEsc / complEsc at `i` (a backslash followed by p or P): its text and length, or null. */
const readCategoryEscape = (p: string, i: number): { text: string; length: number } | null => {
  if (p[i + 2] !== '{') return null;
  const close = p.indexOf('}', i + 3);
  if (close === -1 || close - (i + 3) > 2) return null;
  const name = p.slice(i + 3, close);
  if (!CATEGORIES.has(name)) return null;
  return { text: `\\${p[i + 1]}{${name}}`, length: close + 1 - i };
};

/** CCchar at `i`: a class character or a SingleCharEsc, or null. */
const readClassChar = (p: string, i: number): Char | null => {
  const ch = p[i];
  if (ch === '\\') return readSingleCharEscape(p, i);
  if (ch === undefined || ch === '-' || ch === '[' || ch === ']') return null;
  return readCodePoint(p, i);
};

/** charClassExpr at `i` (a "["): its text and length, or null. */
const readClassExpression = (p: string, i: number): { text: string; length: number } | null => {
  let j = i + 1;
  let text = '[';
  if (p[j] === '^') {
    text += '^';
    j++;
  }
  let first = true;
  for (;;) {
    const ch = p[j];
    if (ch === undefined) return null;
    if (ch === ']') {
      if (first) return null;
      return { text: text + ']', length: j + 1 - i };
    }
    if (ch === '-') {
      // Only first, or last before "]": a range operator is read with its range.
      // Unescaped, as ECMAScript reads it there too: the translation is never
      // longer than the pattern, so it fits the same length limit.
      if (!first && p[j + 1] !== ']') return null;
      text += '-';
      j++;
      first = false;
      continue;
    }
    first = false;
    if (ch === '\\' && (p[j + 1] === 'p' || p[j + 1] === 'P')) {
      const category = readCategoryEscape(p, j);
      if (category === null) return null;
      text += category.text;
      j += category.length;
      continue;
    }
    const low = readClassChar(p, j);
    if (low === null) return null;
    j += low.length;
    if (p[j] === '-' && p[j + 1] !== ']') {
      const high = readClassChar(p, j + 1);
      if (high === null || high.code < low.code) return null;
      text += low.text + '-' + high.text;
      j += 1 + high.length;
    } else {
      text += low.text;
    }
  }
};

/** range-quantifier at `i` (a "{"): its text and length, or null. */
const readRangeQuantifier = (p: string, i: number): { text: string; length: number } | null => {
  let j = i + 1;
  const start = j;
  while (isDigit(p[j])) j++;
  if (j === start) return null;
  if (p[j] === ',') {
    j++;
    while (isDigit(p[j])) j++;
  }
  if (p[j] !== '}') return null;
  return { text: p.slice(i, j + 1), length: j + 1 - i };
};

/**
 * The ECMAScript pattern (for the `u` flag and the matcher's `iregexp` mode)
 * equivalent to the I-Regexp `pattern`, or null if `pattern` is not an I-Regexp.
 */
export const translateIRegexp = (pattern: string): string | null => {
  const p = pattern;
  let out = '';
  let depth = 0;
  // Whether the last piece is an atom a quantifier may follow.
  let quantifiable = false;
  let i = 0;
  while (i < p.length) {
    const ch = p[i];
    switch (ch) {
      case '|':
        out += '|';
        quantifiable = false;
        i++;
        continue;
      case '(':
        depth++;
        out += '(';
        quantifiable = false;
        i++;
        continue;
      case ')':
        if (depth === 0) return null;
        depth--;
        out += ')';
        quantifiable = true;
        i++;
        continue;
      case '*':
      case '+':
      case '?':
        if (!quantifiable) return null;
        out += ch;
        quantifiable = false;
        i++;
        continue;
      case '{': {
        const quantifier = quantifiable ? readRangeQuantifier(p, i) : null;
        if (quantifier === null) return null;
        out += quantifier.text;
        quantifiable = false;
        i += quantifier.length;
        continue;
      }
      case '.':
        out += '.';
        i++;
        break;
      case '[': {
        const expression = readClassExpression(p, i);
        if (expression === null) return null;
        out += expression.text;
        i += expression.length;
        break;
      }
      case '\\': {
        if (p[i + 1] === 'p' || p[i + 1] === 'P') {
          const category = readCategoryEscape(p, i);
          if (category === null) return null;
          out += category.text;
          i += category.length;
        } else {
          const escape = readSingleCharEscape(p, i);
          if (escape === null) return null;
          // `\-` is an identity escape ECMAScript rejects outside classes with `u`.
          out += escape.text === '\\-' ? '-' : escape.text;
          i += escape.length;
        }
        break;
      }
      case ']':
      case '}':
        return null;
      default: {
        // NormalChar (`^` and `$` included: anchors, see above).
        const literal = readCodePoint(p, i);
        if (literal === null) return null;
        out += literal.text;
        i += literal.length;
      }
    }
    quantifiable = true;
  }
  return depth === 0 ? out : null;
};
