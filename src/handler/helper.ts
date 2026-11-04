/**
 * Deep equality comparison for JSON values.
 *
 * Handles JSON-compatible types: primitives (string, number, boolean, null),
 * arrays, and plain objects. Per RFC 9535, JSONPath operates on JSON data.
 *
 * Note: Non-JSON objects (Date, RegExp, Map, Set, etc.) with no enumerable
 * properties will compare as equal to empty objects. This is by design since
 * JSONPath is specifically for JSON data, not arbitrary JavaScript objects.
 */
import { JSONPathLimitError } from '../parser/errors';
import { noTick, Tick } from './budget';

/** One container pair being compared, advanced one child at a time. */
type EqualFrame = {
  x: unknown[] | Record<string, unknown>;
  y: unknown[] | Record<string, unknown>;
  keys: string[] | null;
  /** Elements or keys to compare, fixed when the frame opens. */
  length: number;
  i: number;
};

/**
 * Compare two leaves, or open a frame for two containers of the same shape.
 * Returns false on a mismatch, true when equal so far.
 */
const compareStep = (x: unknown, y: unknown, frames: EqualFrame[], tick: Tick): boolean => {
  tick();

  // Strings of equal length are compared character by character, even when
  // equal; unequal lengths settle it at once.
  if (typeof x === 'string' && typeof y === 'string' && x.length === y.length) {
    tick(x.length);
  }

  // Same reference or identical primitives
  if (x === y) return true;

  // Handle null/undefined (x !== y here)
  if (x === null || y === null || x === undefined || y === undefined) return false;

  // Different types
  if (typeof x !== typeof y) return false;

  // One is array, other is not
  if (Array.isArray(x) !== Array.isArray(y)) return false;

  // Arrays
  if (Array.isArray(x) && Array.isArray(y)) {
    // Each length read once.
    const length = lengthOf(x);
    if (length !== lengthOf(y)) return false;
    frames.push({ x, y, keys: null, length, i: 0 });
    return true;
  }

  // Objects
  if (typeof x === 'object' && typeof y === 'object') {
    const keysA = ownKeys(x as object);
    const keysB = ownKeys(y as object);
    tick(keysA.length + keysB.length);
    if (keysA.length !== keysB.length) return false;
    frames.push({
      x: x as Record<string, unknown>,
      y: y as Record<string, unknown>,
      keys: keysA,
      length: keysA.length,
      i: 0,
    });
    return true;
  }

  return false;
};

export const isEqual = (a: unknown, b: unknown, tick: Tick = noTick): boolean => {
  // Explicit stack of frames rather than recursion, which overflowed the call
  // stack on deeply nested documents. Each frame yields one child pair at a
  // time, so the first difference still stops the comparison. `tick` charges
  // the work to the query budget.
  const frames: EqualFrame[] = [];
  if (!compareStep(a, b, frames, tick)) return false;

  while (frames.length > 0) {
    const frame = frames[frames.length - 1];
    if (frame.i >= frame.length) {
      frames.pop();
      continue;
    }
    if (frame.keys === null) {
      const i = frame.i++;
      if (!compareStep(ownAt(frame.x as unknown[], i), ownAt(frame.y as unknown[], i), frames, tick)) return false;
    } else {
      const i = frame.i++;
      const key = frame.keys[i];
      const x = frame.x as Record<string, unknown>;
      const y = frame.y as Record<string, unknown>;
      // Looking a key up in the other object hashes it: charged by its length
      // (a long key from a parsed document is not internalized yet).
      tick(key.length);
      // A key missing on the right settles it before anything is read, as the
      // recursive version did; each side is then checked right before it is
      // read, since a getter on one side may delete the member on the other.
      if (!hasOwn(y, key) || !hasOwn(x, key)) return false;
      const xValue = x[key];
      if (!hasOwn(y, key)) return false;
      if (!compareStep(xValue, y[key], frames, tick)) return false;
    }
  }

  return true;
};

/**
 * Own enumerable-or-not property check. The `in` operator also sees inherited
 * members, so `$.constructor` or `$.__proto__` used to return Object or
 * Object.prototype itself, which a caller could then modify.
 */
export const hasOwn = (obj: object, key: string | number): boolean => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * `arr[i]` if the array owns index `i`, otherwise undefined: an element
 * supplied by a non-standard array prototype reads as a hole.
 */
export const ownAt = (arr: unknown[], i: number): unknown => (hasOwn(arr, i) ? arr[i] : undefined);

/**
 * V8 hashes a string longer than this by its length alone, so strings of one
 * longer length all collide: a Map or Set keyed by them degrades to a list,
 * with a full comparison per entry. Such string values are kept out of hash
 * tables (see comparators.ts); member names are limited well below it.
 */
export const MAX_HASHED_STRING_LENGTH = 16_383;

/**
 * Longest supported member name, in a query or a document. V8 hashes longer
 * strings poorly (see MAX_HASHED_STRING_LENGTH) and no real document needs
 * such names, so rather than bound their cost everywhere they are rejected:
 * a longer name in a query is a JSONPathSyntaxError, one met in a document is
 * a JSONPathLimitError.
 */
export const MAX_MEMBER_NAME_LENGTH = 1000;

/** The object's own enumerable keys, each checked against MAX_MEMBER_NAME_LENGTH. */
export const ownKeys = (obj: object): string[] => {
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (key.length > MAX_MEMBER_NAME_LENGTH) {
      throw new JSONPathLimitError(`Member name too long (maximum ${MAX_MEMBER_NAME_LENGTH} characters)`);
    }
  }
  return keys;
};

/**
 * The array's length, read once. A Proxy may report anything: a value that is
 * not a valid array length is a TypeError rather than an endless loop.
 */
export const lengthOf = (arr: unknown[]): number => {
  const length = arr.length;
  if (!Number.isSafeInteger(length) || length < 0 || length > 0xffffffff) throw new TypeError('Invalid array length');
  return length;
};

/** True for the RangeError V8 throws when the call stack overflows. */
export const isStackOverflow = (e: unknown): boolean => e instanceof RangeError && /call stack/i.test(e.message);

export const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

/**
 * A RangeError from a value outgrowing an engine limit: V8's maximum string or
 * array length, or the maximum size of a Map or Set (2^24 entries).
 */
export const isCapacityError = (e: unknown): boolean =>
  e instanceof RangeError && /Invalid (string|array|typed array) length|maximum size exceeded/i.test(e.message);

/**
 * An object whose prototype is a root prototype (Object.prototype, or any
 * object without one), the redux definition. Decided from two prototype reads:
 * walking the whole chain to its root was uncharged work repeated for every
 * candidate node, quadratic in the depth of a (non-JSON) prototype chain.
 */
export const isPlainObject = (item: unknown): item is Record<string, unknown> => {
  if (typeof item !== 'object' || item === null) {
    return false;
  }
  const proto = Object.getPrototypeOf(item);
  return proto !== null && Object.getPrototypeOf(proto) === null;
};

export const isNumber = (item: unknown): item is number => {
  return typeof item === 'number';
};

export const isString = (item: unknown): item is string => {
  return typeof item === 'string';
};

export const isUndefined = <T>(item: T | undefined): item is undefined => {
  return typeof item === 'undefined';
};

export const isDefined = <T>(item: T): item is Exclude<typeof item, undefined> => {
  return typeof item !== 'undefined';
};
