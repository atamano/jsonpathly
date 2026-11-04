/**
 * Comparator implementations for JSONPath filter expressions.
 *
 * RFC 9535 comparison operators plus jsonpathly extensions.
 */
import { noTick, Tick } from './budget';
import { testRegex } from './functions';
import { isArray, isEqual, isNumber, isString } from './helper';

/** Sets built from right-hand arrays, kept for the duration of one query. */
export type SetCache = WeakMap<unknown[], Set<unknown>>;

type ComparatorFn = (left: unknown, right: unknown, tick: Tick, sets?: SetCache) => boolean;

/** RFC 9535: Equality comparison (handles undefined for empty nodelists) */
const eq: ComparatorFn = (left, right, tick = noTick) => {
  // RFC 9535: Empty nodelists on both sides compare equal
  if (left === undefined && right === undefined) return true;
  return isEqual(left, right, tick);
};

/** RFC 9535: Inequality comparison */
const ne: ComparatorFn = (left, right, tick = noTick) => !isEqual(left, right, tick);

/** RFC 9535: Less than (numbers and strings) */
const lt: ComparatorFn = (left, right, tick = noTick) => {
  if (isNumber(left) && isNumber(right)) return left < right;
  if (isString(left) && isString(right)) {
    tick(Math.min(left.length, right.length));
    return left < right;
  }
  return false;
};

/** RFC 9535: Less than or equal (numbers and strings) */
const le: ComparatorFn = (left, right, tick = noTick) => {
  if (isNumber(left) && isNumber(right)) return left <= right;
  if (isString(left) && isString(right)) {
    tick(Math.min(left.length, right.length));
    return left <= right;
  }
  return false;
};

/** RFC 9535: Greater than (numbers and strings) */
const gt: ComparatorFn = (left, right, tick = noTick) => {
  if (isNumber(left) && isNumber(right)) return left > right;
  if (isString(left) && isString(right)) {
    tick(Math.min(left.length, right.length));
    return left > right;
  }
  return false;
};

/** RFC 9535: Greater than or equal (numbers and strings) */
const ge: ComparatorFn = (left, right, tick = noTick) => {
  if (isNumber(left) && isNumber(right)) return left >= right;
  if (isString(left) && isString(right)) {
    tick(Math.min(left.length, right.length));
    return left >= right;
  }
  return false;
};

/** Character work of comparing two values when both are strings of the same length. */
const stringCost = (a: unknown, b: unknown): number =>
  typeof a === 'string' && typeof b === 'string' && a.length === b.length ? a.length : 0;

/**
 * Position of `value` in `array` with includes() semantics (SameValueZero),
 * charging each element before inspecting it, so the budget stops long scans
 * and an early match stays cheap.
 */
const indexOfCharged = (array: unknown[], value: unknown, tick: Tick): number => {
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    tick(1 + stringCost(item, value));
    if (item === value || (item !== item && value !== value)) {
      return i;
    }
  }
  return -1;
};

/**
 * Set of `array`, charging each element and the hashing of its string content.
 * Within a query the right operand is usually the same array for every
 * candidate (`@ anyof $.allowed`), so the Set is built once.
 */
const toSetCharged = (array: unknown[], tick: Tick, sets?: SetCache): Set<unknown> => {
  const cached = sets?.get(array);
  if (cached) return cached;
  const set = new Set<unknown>();
  for (const item of array) {
    tick(1 + (typeof item === 'string' ? item.length : 0));
    set.add(item);
  }
  sets?.set(array, set);
  return set;
};

/** Set lookup charging the element and, for a string, its hashing and comparison. */
const hasCharged = (set: Set<unknown>, item: unknown, tick: Tick): boolean => {
  if (set.size === 0) {
    tick();
    return false;
  }
  tick(1 + (typeof item === 'string' ? 2 * item.length : 0));
  return set.has(item);
};

/**
 * Whether `test` holds for some element of `array`, skipping holes like
 * Array.prototype.some but charging every index first: the native method
 * scans the holes of a sparse array without calling back.
 */
const someCharged = (array: unknown[], test: (item: unknown) => boolean, tick: Tick): boolean => {
  for (let i = 0; i < array.length; i++) {
    tick();
    if (i in array && test(array[i])) return true;
  }
  return false;
};

/** Extension: Check if left value exists in right array */
const inOp: ComparatorFn = (left, right, tick = noTick) => {
  if (!isArray(right)) return false;
  return indexOfCharged(right, left, tick) !== -1;
};

/** Extension: Check if left value does NOT exist in right array */
const nin: ComparatorFn = (left, right, tick = noTick) => {
  if (!isArray(right)) return false;
  return indexOfCharged(right, left, tick) === -1;
};

/** Extension: Check if all elements in left exist in right (subset) */
const subsetof: ComparatorFn = (left, right, tick = noTick, sets) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = toSetCharged(right, tick, sets);
  return !someCharged(left, (e) => !hasCharged(rightSet, e, tick), tick);
};

/** Extension: Check if any element in left exists in right */
const anyof: ComparatorFn = (left, right, tick = noTick, sets) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = toSetCharged(right, tick, sets);
  return someCharged(left, (e) => hasCharged(rightSet, e, tick), tick);
};

/** Extension: Check if no elements in left exist in right */
const noneof: ComparatorFn = (left, right, tick = noTick, sets) => {
  if (!isArray(left) || !isArray(right)) return false;
  const rightSet = toSetCharged(right, tick, sets);
  return !someCharged(left, (e) => hasCharged(rightSet, e, tick), tick);
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
 * Separate function due to different signature (needs opts). `site`, the
 * comparator's AST node, identifies the literal (see testRegex).
 */
export const matchRegex = (
  left: unknown,
  literal: string,
  opts: string,
  tick: Tick = noTick,
  site?: object,
): boolean => {
  if (!isString(left) || !isString(literal)) return false;
  // Sliced only when testRegex will read it: a new string per candidate, hashed
  // and compared in full by the regex caches, would defeat `site`.
  const compiled = site !== undefined && tick.regexSites?.has(site) === true;
  const pattern = compiled ? '' : literal.slice(1, -1);
  // Linear-time matcher: V8's backtracking engine is exponential on patterns like (a+)+$
  return testRegex(pattern, opts, left, false, tick, site);
};
