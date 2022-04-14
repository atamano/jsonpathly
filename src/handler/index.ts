import { parse, JsonPathItem } from '../parser';
import * as isPlainObject from 'lodash.isplainobject';

const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return isPlainObject(item);
};

export const queryPayload = (payload: unknown, tree: JsonPathItem): unknown => {
  if (tree === null) {
    return payload;
  }

  switch (tree.type) {
    case 'current':
    case 'root': {
      return queryPayload(payload, tree.next);
    }
    case 'negate': {
      return !queryPayload(payload, tree.value);
    }
    case 'value':
    case 'identifier':
    case 'numeric_literal':
    case 'string_literal': {
      return tree.value;
    }
    case 'subscript': {
      switch (tree.subtype) {
        case 'dot': {
          if (!isObject(payload)) {
            return null;
          }
          const treeValue = tree.value;
          switch (treeValue.type) {
            case 'string_literal': {
              if (treeValue.value in payload) {
                return queryPayload(payload[treeValue.value], tree.next);
              } else {
                return null;
              }
            }
            case 'identifier': {
              if (treeValue.value in payload) {
                return queryPayload(payload[treeValue.value], tree.next);
              } else if (treeValue.value === '*') {
                return null;
              } else {
                return null;
              }
            }
          }
        }
      }
      return queryPayload(payload, tree.next);
    }
  }
};

export const query = (payload: unknown, path: string): unknown => {
  const tree = parse(path);

  return queryPayload(payload, tree);
};

// subscriptables
// subscript
// filter_expression
// script_expression
// group_expression
// comparator
// binary_expression
// filter_subscript
// array_slice
