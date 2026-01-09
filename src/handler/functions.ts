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
import { isArray, isDefined, isPlainObject, isString } from './helper';

type FunctionImpl = (args: unknown[]) => unknown;

/**
 * RFC 9485 I-Regexp validation.
 * Rejects non-interoperable regex features for cross-platform compatibility.
 */
export const isValidIRegexp = (pattern: string): boolean => {
  // Reject backreferences (\1, \2, etc.)
  if (/\\[1-9]/.test(pattern)) return false;
  // Reject lookahead/lookbehind ((?=, (?!, (?<=, (?<!)
  if (/\(\?[=!]/.test(pattern)) return false;
  if (/\(\?<[=!]/.test(pattern)) return false;
  // Reject named capture groups ((?<name>...)
  if (/\(\?<[a-zA-Z]/.test(pattern)) return false;
  // Reject word boundaries (\b, \B) - but not \b inside character class which means backspace
  // Simple check: \b or \B not preceded by [ (approximate check)
  if (/(?<!\[)\\[bB]/.test(pattern)) return false;
  return true;
};

/**
 * RFC 9535 length() function.
 * Returns length of string, array, or number of keys in object.
 */
const length: FunctionImpl = (args) => {
  const val = args[0];
  if (isString(val)) return val.length;
  if (isArray(val)) return val.length;
  if (isPlainObject(val)) return Object.keys(val).length;
  return undefined;
};

/**
 * RFC 9535 count() function.
 * Returns count of nodes in nodelist.
 */
const count: FunctionImpl = (args) => {
  const val = args[0];
  if (isArray(val)) return val.length;
  return isDefined(val) ? 1 : 0;
};

/**
 * RFC 9535 match() function.
 * Full string match against I-Regexp pattern.
 * Pattern is implicitly anchored: ^(?:pattern)$
 */
const match: FunctionImpl = (args) => {
  const val = args[0];
  const pattern = args[1];
  if (!isString(val) || !isString(pattern)) return false;
  if (!isValidIRegexp(pattern)) return false;
  try {
    const regex = new RegExp(`^(?:${pattern})$`, 'u');
    return regex.test(val);
  } catch /* c8 ignore next */ {
    return false;
  }
};

/**
 * RFC 9535 search() function.
 * Substring match against I-Regexp pattern.
 */
const search: FunctionImpl = (args) => {
  const val = args[0];
  const pattern = args[1];
  if (!isString(val) || !isString(pattern)) return false;
  if (!isValidIRegexp(pattern)) return false;
  try {
    const regex = new RegExp(pattern, 'u');
    return regex.test(val);
  } catch /* c8 ignore next */ {
    return false;
  }
};

/**
 * RFC 9535 value() function.
 * Extracts single value from nodelist, or Nothing if not exactly one.
 */
const value: FunctionImpl = (args) => {
  const val = args[0];
  if (isArray(val) && val.length === 1) return val[0];
  if (!isArray(val) && isDefined(val)) return val;
  return undefined;
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
