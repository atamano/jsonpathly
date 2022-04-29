export const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

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

export const isUndefined = (item: unknown): item is undefined => {
  return typeof item === 'undefined';
};

export const isDefined = (item: unknown): item is Exclude<typeof item, undefined> => {
  return typeof item !== 'undefined';
};

export const isArrayOfNumber = (item: unknown): item is number[] => {
  return isArray(item) && item.every(isNumber);
};

export const standardDeviation = (arr: number[]): number => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr.reduce((acc, val) => acc.concat((val - mean) ** 2), [] as number[]).reduce((acc, val) => acc + val, 0) /
      arr.length,
  );
};
