import { parse, JsonPathItem } from '../parser';
import * as isPlainObject from 'lodash.isplainobject';
import { SubscriptDotdot, SubscriptDot } from '../parser/types';

const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return isPlainObject(item);
};

const handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotdot): unknown[] => {
  let results = [];
  const treeValue = tree.value;

  switch (treeValue.type) {
    case 'identifier':
      if (treeValue.value === '*') {
        if (isObject(payload) || isArray(payload)) {
          results = results.concat(Object.values(payload));
        }
      }
    case 'string_literal': {
      if (isObject(payload)) {
        if (treeValue.value in payload) {
          const res = queryPayload(payload[treeValue.value], tree.next);
          if (typeof res !== 'undefined') {
            results.push(res);
          }
        }
        for (const value of Object.values(payload)) {
          const res = handleSubscriptDotdot(value, tree);
          results = results.concat(res);
        }
      }
      if (isArray(payload)) {
        for (const item of payload) {
          const res = handleSubscriptDotdot(item, tree);
          results = results.concat(res);
        }
      }
    }
  }

  return results;
};

const handleSubscriptDot = (payload: unknown, tree: SubscriptDot): unknown => {
  if (!isObject(payload)) {
    return;
  }
  const treeValue = tree.value;
  switch (treeValue.type) {
    case 'string_literal': {
      if (treeValue.value in payload) {
        return queryPayload(payload[treeValue.value], tree.next);
      } else {
        return;
      }
    }
    case 'identifier': {
      if (treeValue.value in payload) {
        return queryPayload(payload[treeValue.value], tree.next);
      } else if (treeValue.value === '*') {
        return Object.values(payload);
      } else {
        return;
      }
    }
  }
};

const queryPayload = (payload: unknown, tree: JsonPathItem): unknown => {
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
          return handleSubscriptDot(payload, tree);
        }
        case 'dotdot': {
          return handleSubscriptDotdot(payload, tree);
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
