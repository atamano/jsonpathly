/**
 * Comparator implementations for JSONPath filter expressions.
 *
 * RFC 9535 comparison operators plus jsonpathly extensions.
 */
import { isValidIRegexp } from './functions';
import { isArray, isEqual, isNumber, isString } from './helper';

type ComparatorFn = (left: unknown, right: unknown) => boolean;

/** RFC 9535: Equality comparison (handles undefined for empty nodelists) */
const eq: ComparatorFn = (left, right) => {
  // RFC 9535: Empty nodelists on both sides compare equal
  if (left === undefined && right === undefined) return true;
  return isEqual(left, right);
};

/** RFC 9535: Inequality comparison */
const ne: ComparatorFn = (left, right) => !isEqual(left, right);

/** RFC 9535: Less than (numbers and strings) */
const lt: ComparatorFn = (left, right) => {
  if (isNumber(left) && isNumber(right)) return left < right;
  if (isString(left) && isString(right)) return left < right;
  return false;
};

/** RFC 9535: Less than or equal (numbers and strings) */
const le: ComparatorFn = (left, right) => {
  if (isNumber(left) && isNumber(right)) return left <= right;
  if (isString(left) && isString(right)) return left <= right;
  return false;
};

/** RFC 9535: Greater than (numbers and strings) */
const gt: ComparatorFn = (left, right) => {
  if (isNumber(left) && isNumber(right)) return left > right;
  if (isString(left) && isString(right)) return left > right;
  return false;
};

/** RFC 9535: Greater than or equal (numbers and strings) */
const ge: ComparatorFn = (left, right) => {
  if (isNumber(left) && isNumber(right)) return left >= right;
  if (isString(left) && isString(right)) return left >= right;
  return false;
};

/** Extension: Check if left value exists in right array */
const inOp: ComparatorFn = (left, right) => {
  if (!isArray(right)) return false;
  return right.includes(left);
};

/** Extension: Check if left value does NOT exist in right array */
const nin: ComparatorFn = (left, right) => {
  if (!isArray(right)) return false;
  return !right.includes(left);
};

/** Extension: Check if all elements in left exist in right (subset) */
const subsetof: ComparatorFn = (left, right) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = new Set(right);
  return left.every((e) => rightSet.has(e));
};

/** Extension: Check if any element in left exists in right */
const anyof: ComparatorFn = (left, right) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = new Set(right);
  return left.some((e) => rightSet.has(e));
};

/** Extension: Check if no elements in left exist in right */
const noneof: ComparatorFn = (left, right) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = new Set(right);
  return !left.some((e) => rightSet.has(e));
};

/** Extension: Check if left and right have same length (arrays/strings) */
const sizeof: ComparatorFn = (left, right) => {
  if ((!isArray(left) && !isString(left)) || (!isArray(right) && !isString(right))) {
    return false;
  }
  return left.length === right.length;
};

/** Extension: Check if left has specific length (number) */
const size: ComparatorFn = (left, right) => {
  if ((!isArray(left) && !isString(left)) || !isNumber(right)) {
    return false;
  }
  return left.length === right;
};

/**
 * Map of comparison operators to their implementations.
 * Use `in` key for the `in` operator since it's a reserved word.
 */
export const comparators: Record<string, ComparatorFn> = {
  eq,
  ne,
  lt,
  le,
  gt,
  ge,
  in: inOp,
  nin,
  subsetof,
  anyof,
  noneof,
  sizeof,
  size,
};

/**
 * Check if array or string is empty.
 * Separate function since it's a unary operator (no right operand).
 */
export const isEmpty = (value: unknown): boolean => {
  if (!isArray(value) && !isString(value)) return false;
  return value.length === 0;
};

/**
 * Evaluate regex match (=~ operator).
 * Validates I-Regexp compliance per RFC 9485 for consistency with match()/search().
 * Separate function due to different signature (needs opts).
 */
export const matchRegex = (left: unknown, pattern: string, opts: string): boolean => {
  if (!isString(left) || !isString(pattern)) return false;
  const value = pattern.slice(1, -1);
  // RFC 9485: Validate I-Regexp compliance (same as match/search functions)
  if (!isValidIRegexp(value)) return false;
  try {
    return !!left.match(new RegExp(value, opts));
  } catch {
    // Invalid regex pattern
    return false;
  }
};
