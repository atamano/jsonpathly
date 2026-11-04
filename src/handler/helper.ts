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
import { noTick, Tick } from './budget';

/** One container pair being compared, advanced one child at a time. */
type EqualFrame = {
  x: unknown[] | Record<string, unknown>;
  y: unknown[] | Record<string, unknown>;
  keys: string[] | null;
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
    if (x.length !== y.length) return false;
    frames.push({ x, y, keys: null, i: 0 });
    return true;
  }

  // Objects
  if (typeof x === 'object' && typeof y === 'object') {
    const keysA = Object.keys(x as object);
    const keysB = Object.keys(y as object);
    tick(keysA.length + keysB.length);
    if (keysA.length !== keysB.length) return false;
    frames.push({ x: x as Record<string, unknown>, y: y as Record<string, unknown>, keys: keysA, i: 0 });
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
    if (frame.keys === null) {
      const x = frame.x as unknown[];
      if (frame.i >= x.length) {
        frames.pop();
        continue;
      }
      const i = frame.i++;
      if (!compareStep(x[i], (frame.y as unknown[])[i], frames, tick)) return false;
    } else {
      if (frame.i >= frame.keys.length) {
        frames.pop();
        continue;
      }
      const key = frame.keys[frame.i++];
      const x = frame.x as Record<string, unknown>;
      const y = frame.y as Record<string, unknown>;
      if (!hasOwn(y, key)) return false;
      if (!compareStep(x[key], y[key], frames, tick)) return false;
    }
  }

  return true;
};

/**
 * Own enumerable-or-not property check. The `in` operator also sees inherited
 * members, so `$.constructor` or `$.__proto__` used to return Object or
 * Object.prototype itself, which a caller could then modify.
 */
export const hasOwn = (obj: object, key: string): boolean => Object.prototype.hasOwnProperty.call(obj, key);

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

// https://github.com/reduxjs/redux/blob/master/src/utils/isPlainObject.ts
export const isPlainObject = (item: unknown): item is Record<string, unknown> => {
  if (typeof item !== 'object' || item === null) {
    return false;
  }

  let proto = item;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(item) === proto;
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
