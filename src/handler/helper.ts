import { default as isPlainObject } from 'lodash.isplainobject';

export const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

export const isObject = (item: unknown): item is Record<string, unknown> => {
  return isPlainObject(item);
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
