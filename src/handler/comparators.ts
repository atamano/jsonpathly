/**
 * Comparator implementations for JSONPath filter expressions.
 *
 * RFC 9535 comparison operators plus jsonpathly extensions.
 */
import { noTick, Tick } from './budget';
import { testRegex } from './functions';
import { hasOwn, isArray, isEqual, isNumber, isString, lengthOf, MAX_HASHED_STRING_LENGTH, ownAt } from './helper';

/** Sets built from right-hand arrays, kept for the duration of one query. */
/**
 * Membership index of an array: a Set of the values V8 hashes well, plus the
 * strings too long to be hashed (see MAX_HASHED_STRING_LENGTH), scanned with
 * one charged comparison each.
 */
export type MembershipIndex = { set: Set<unknown>; long: string[] };

export type SetCache = WeakMap<unknown[], MembershipIndex>;

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

/** RFC 9535 section 2.3.5.2.2: `a <= b` holds when `a < b` or `a == b` (null, booleans, objects too). */
const le: ComparatorFn = (left, right, tick = noTick) => lt(left, right, tick) || eq(left, right, tick);

/** RFC 9535: Greater than (numbers and strings) */
const gt: ComparatorFn = (left, right, tick = noTick) => {
  if (isNumber(left) && isNumber(right)) return left > right;
  if (isString(left) && isString(right)) {
    tick(Math.min(left.length, right.length));
    return left > right;
  }
  return false;
};

/** RFC 9535 section 2.3.5.2.2: `a >= b` holds when `a > b` or `a == b`. */
const ge: ComparatorFn = (left, right, tick = noTick) => gt(left, right, tick) || eq(left, right, tick);

/** Character work of comparing two values when both are strings of the same length. */
const stringCost = (a: unknown, b: unknown): number =>
  typeof a === 'string' && typeof b === 'string' && a.length === b.length ? a.length : 0;

/**
 * Position of `value` in `array` with includes() semantics (SameValueZero,
 * holes read as undefined, length read once), charging each element before
 * inspecting it, so the budget stops long scans and an early match stays cheap.
 */
const indexOfCharged = (array: unknown[], value: unknown, tick: Tick): number => {
  const length = lengthOf(array);
  for (let i = 0; i < length; i++) {
    const item = ownAt(array, i);
    tick(1 + stringCost(item, value));
    if (item === value || (item !== item && value !== value)) {
      return i;
    }
  }
  return -1;
};

/**
 * Key under which a value is stored in a membership Set. Numbers and strings are
 * tagged strings: V8 hashes a number by its value, so a document could hold
 * numbers chosen to collide and make every insertion walk a chain (quadratic
 * work for one charged step each), whereas string hashes are seeded per process.
 * SameValueZero is preserved: -0 and 0 both read '0', NaN reads 'NaN'. Other
 * values (booleans, null, objects) hash by identity or oddball and stay as they are.
 */
const setKey = (value: unknown): unknown =>
  typeof value === 'number' ? 'n' + String(value) : typeof value === 'string' ? 's' + value : value;

/** A string whose tagged key V8 would hash by length only (the tag adds one character). */
const isUnhashable = (value: unknown): value is string =>
  typeof value === 'string' && value.length + 1 > MAX_HASHED_STRING_LENGTH;

/**
 * Set of `array`, charging each element and the hashing of its string content.
 * Within a query the right operand is usually the same array for every
 * candidate (`@ anyof $.allowed`), so the Set is built once.
 */
const toSetCharged = (array: unknown[], tick: Tick, sets?: SetCache): MembershipIndex => {
  const cached = sets?.get(array);
  if (cached) return cached;
  const index: MembershipIndex = { set: new Set(), long: [] };
  const length = lengthOf(array);
  for (let i = 0; i < length; i++) {
    const item = ownAt(array, i);
    tick(1 + (typeof item === 'string' ? item.length : 0));
    if (isUnhashable(item)) index.long.push(item);
    else index.set.add(setKey(item));
  }
  sets?.set(array, index);
  return index;
};

/** Set lookup charging the element and, for a string, its hashing and comparison. */
const hasCharged = ({ set, long }: MembershipIndex, item: unknown, tick: Tick): boolean => {
  if (isUnhashable(item)) {
    // Too long to hash: compared with each long entry, equal lengths charged in full.
    for (const entry of long) {
      tick(1 + stringCost(entry, item));
      if (entry === item) return true;
    }
    return false;
  }
  if (set.size === 0) {
    tick();
    return false;
  }
  tick(1 + (typeof item === 'string' ? 2 * item.length : 0));
  return set.has(setKey(item));
};

/**
 * Whether `test` holds for some own element of `array`, reading the length
 * once and skipping holes like Array.prototype.some, but charging every index
 * first: the native method scans the holes of a sparse array without calling back.
 */
const someCharged = (array: unknown[], test: (item: unknown) => boolean, tick: Tick): boolean => {
  const length = lengthOf(array);
  for (let i = 0; i < length; i++) {
    tick();
    if (hasOwn(array, i) && test(array[i])) return true;
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
  return (isArray(left) ? lengthOf(left) : left.length) === (isArray(right) ? lengthOf(right) : right.length);
};

/** Extension: Check if left has specific length (number) */
const size: ComparatorFn = (left, right) => {
  if ((!isArray(left) && !isString(left)) || !isNumber(right)) {
    return false;
  }
  return (isArray(left) ? lengthOf(left) : left.length) === right;
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
  return (isArray(value) ? lengthOf(value) : value.length) === 0;
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
