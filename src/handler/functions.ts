/**
 * RFC 9535 Function implementations for JSONPath.
 *
 * These functions can be used in filter expressions:
 * - length(value) - returns length of string, array, or object key count
 * - count(nodelist) - returns count of nodes in nodelist
 * - match(string, pattern) - full string match against I-Regexp
 * - search(string, pattern) - substring match against I-Regexp
 * - value(nodelist) - extracts single value from nodelist
 */
import { Tick } from './budget';
import { isArray, isPlainObject, isString, lengthOf, ownKeys } from './helper';
import { translateIRegexp } from './iregexp';
import { MAX_REGEX_PATTERN_LENGTH, regexProgram, runProgram } from './regex';

/** The nodes a query argument selected, for the functions taking a nodelist. */
export class NodeList {
  constructor(readonly nodes: unknown[]) {}
}

/** `site`: the call's AST node, when its pattern argument is a literal. */
type FunctionImpl = (args: unknown[], tick: Tick, site?: object) => unknown;

/**
 * Check if \b or \B (word boundary) appears outside character classes.
 * Inside [...], \b means backspace and is allowed by I-Regexp.
 * Outside [...], \b means word boundary and is NOT allowed.
 */
const hasWordBoundaryOutsideCharClass = (pattern: string): boolean => {
  let inCharClass = false;
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === '\\' && i + 1 < pattern.length) {
      const next = pattern[i + 1];
      // Check for \b or \B outside character class
      if ((next === 'b' || next === 'B') && !inCharClass) {
        return true;
      }
      // Skip escaped character
      i++;
    } else if (char === '[' && !inCharClass) {
      inCharClass = true;
    } else if (char === ']' && inCharClass) {
      inCharClass = false;
    }
  }
  return false;
};

/**
 * RFC 9485 I-Regexp validation.
 * Rejects non-interoperable regex features for cross-platform compatibility.
 *
 * Scans by hand rather than with native RegExps: a successful native match
 * records its input in the legacy `RegExp.$_` state, which would keep a
 * sliced pattern's parent string alive after the pattern is rejected.
 */
export const isValidIRegexp = (pattern: string): boolean => {
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    if (char === '\\') {
      const next = pattern[i + 1];
      // Reject backreferences (\1, \2, etc.)
      if (next >= '1' && next <= '9') return false;
      i++;
    } else if (char === '(' && pattern[i + 1] === '?') {
      const next = pattern[i + 2];
      // Reject lookahead ((?=, (?!)
      if (next === '=' || next === '!') return false;
      if (next === '<') {
        const after = pattern[i + 3];
        // Reject lookbehind ((?<=, (?<!) and named capture groups ((?<name>...)
        if (after === '=' || after === '!' || /[a-zA-Z]/.test(after ?? '')) return false;
      }
    }
  }
  // Reject word boundaries (\b, \B) outside character classes
  if (hasWordBoundaryOutsideCharClass(pattern)) return false;
  return true;
};

const MAX_VALIDATION_CACHE_SIZE = 256;
const validationCache = new Map<string, boolean>();

/**
 * isValidIRegexp with a small cache: a filter such as search(@, "...") checks
 * the same pattern for every candidate. The scan is charged on a cache miss
 * only, after the result is cached, so a query stopped there does not leave
 * the next one to scan it again.
 */
export const checkIRegexp = (pattern: string, tick: Tick): boolean => {
  let valid = validationCache.get(pattern);
  if (valid === undefined) {
    valid = isValidIRegexp(pattern);
    if (validationCache.size >= MAX_VALIDATION_CACHE_SIZE) validationCache.clear();
    // A sliced pattern would keep its parent string alive as a key: cache a flat copy.
    validationCache.set(Array.from(pattern).join(''), valid);
  }
  // Validating, or finding the pattern among the flat copies, reads it whole.
  tick(pattern.length);
  return valid;
};

const translationCache = new Map<string, string | null>();

/**
 * translateIRegexp with a small cache, charged like checkIRegexp: the pattern
 * is read whole on every call, scanned only on a miss.
 */
const translateCached = (pattern: string, tick: Tick): string | null => {
  let translated = translationCache.get(pattern);
  if (translated === undefined) {
    translated = translateIRegexp(pattern);
    if (translated !== null) translated = Array.from(translated).join('');
    if (translationCache.size >= MAX_VALIDATION_CACHE_SIZE) translationCache.clear();
    translationCache.set(Array.from(pattern).join(''), translated);
  }
  tick(pattern.length);
  return translated;
};

const MAX_REGEX_SITES = 256;

/**
 * Tests `input` against a pattern: an I-Regexp (RFC 9485) for match() and
 * search() (`iregexp`), a JavaScript pattern within the I-Regexp-like subset
 * checkIRegexp accepts for the `=~` extension.
 *
 * A pattern from the document can differ from one candidate to the next, or be
 * an equal string in another object, so each call charges reading it. A
 * literal is the same for every candidate: `site`, its AST node, then finds
 * the compiled program without reading the pattern at all. Bounded, because
 * these entries keep programs alive past their eviction from the regex cache.
 */
export const testRegex = (
  pattern: string,
  flags: string,
  input: string,
  anchored: boolean,
  tick: Tick,
  site?: object,
  iregexp = false,
): boolean => {
  const sites = site === undefined ? undefined : tick.regexSites;
  let prog = sites?.get(site as object);
  if (prog === undefined) {
    // Length first: validation scans the whole pattern.
    if (pattern.length > MAX_REGEX_PATTERN_LENGTH) {
      prog = null;
    } else if (iregexp) {
      const translated = translateCached(pattern, tick);
      prog = translated === null ? null : regexProgram(translated, flags, anchored, tick, true);
    } else {
      prog = checkIRegexp(pattern, tick) ? regexProgram(pattern, flags, anchored, tick) : null;
    }
    if (sites !== undefined) {
      if (sites.size >= MAX_REGEX_SITES) sites.clear();
      sites.set(site as object, prog);
    }
  }
  return prog !== null && runProgram(prog, input, tick);
};

/**
 * RFC 9535 length() function.
 * Returns length of string, array, or number of keys in object.
 */
const length: FunctionImpl = (args, tick) => {
  const val = args[0];
  if (isString(val)) {
    // RFC 9535 section 2.4.4: the number of Unicode scalar values, so a
    // surrogate pair counts once.
    tick(val.length);
    let count = val.length;
    for (let i = 0; i < val.length - 1; i++) {
      const unit = val.charCodeAt(i);
      if (unit >= 0xd800 && unit <= 0xdbff) {
        const next = val.charCodeAt(i + 1);
        if (next >= 0xdc00 && next <= 0xdfff) {
          count--;
          i++;
        }
      }
    }
    return count;
  }
  if (isArray(val)) return lengthOf(val);
  if (isPlainObject(val)) {
    const keys = ownKeys(val);
    tick(keys.length);
    return keys.length;
  }
  return undefined;
};

/**
 * RFC 9535 count() function.
 * Returns count of nodes in nodelist.
 */
// count() and value() always receive a NodeList: parsing rejects any other argument.
const count: FunctionImpl = (args) => (args[0] as NodeList).nodes.length;

/**
 * RFC 9535 match() function.
 * Full string match against I-Regexp pattern.
 * Pattern is implicitly anchored: ^(?:pattern)$
 */
const match: FunctionImpl = (args, tick, site) => {
  const val = args[0];
  const pattern = args[1];
  if (!isString(val) || !isString(pattern)) return false;
  return testRegex(pattern, 'u', val, true, tick, site, true);
};

/**
 * RFC 9535 search() function.
 * Substring match against I-Regexp pattern.
 */
const search: FunctionImpl = (args, tick, site) => {
  const val = args[0];
  const pattern = args[1];
  if (!isString(val) || !isString(pattern)) return false;
  return testRegex(pattern, 'u', val, false, tick, site, true);
};

/**
 * RFC 9535 value() function.
 * Extracts single value from nodelist, or Nothing if not exactly one.
 */
const value: FunctionImpl = (args) => {
  const { nodes } = args[0] as NodeList;
  return nodes.length === 1 ? nodes[0] : undefined;
};

/**
 * Map of RFC 9535 function names to implementations.
 */
export const rfc9535Functions: Record<string, FunctionImpl> = {
  length,
  count,
  match,
  search,
  value,
};
