import * as isPlainObject from 'lodash.isplainobject';
import { WILDCARD } from '../parser/Listener';
import { parse } from '../parser';
import {
  StringLiteral,
  Subscript,
  Subscriptable,
  Subscriptables,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotdot,
} from '../parser/types';

const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return isPlainObject(item);
};

const handleStringLitteral = (payload: unknown, tree: StringLiteral): unknown => {
  if (isObject(payload) && tree.value in payload) {
    return payload[tree.value];
  }
  return;
};

const handleSubscriptable = (payload: unknown, tree: Subscriptable): unknown => {
  switch (tree.type) {
    case 'string_literal': {
      return handleStringLitteral(payload, tree);
    }
  }
};

const handleSubscriptables = (payload: unknown, tree: Subscriptables): unknown[] => {
  const results = [];
  for (const treeValue of tree.values) {
    const res = handleSubscriptable(payload, treeValue);
    results.push(res);
  }

  return results;
};

const handleSubscriptBracket = (payload: unknown, tree: SubscriptBracket): unknown => {
  const results = handleSubscriptables(payload, tree.value);

  if (tree.value.values.length === 1 && ['string_literal', 'numeric_literal'].includes(tree.value.values[0].type)) {
    return handlSubscript(results.pop(), tree.next);
  }

  return handlSubscript(results, tree.next);
};

const handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotdot): unknown[] => {
  let results = [];
  const treeValue = tree.value;

  switch (treeValue.type) {
    case 'subscriptables': {
      return handleSubscriptables(payload, treeValue);
    }
    case 'identifier': {
      if (treeValue.value === WILDCARD) {
        if (isObject(payload) || isArray(payload)) {
          results = results.concat(Object.values(payload));
        }
      }
      if (isObject(payload)) {
        if (treeValue.value in payload) {
          const res = handlSubscript(payload[treeValue.value], tree.next);
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
      break;
    }
  }

  return results;
};

const handleSubscriptDot = (payload: unknown, tree: SubscriptDot): unknown => {
  const treeValue = tree.value;

  if (!isObject(payload)) {
    return;
  }

  if (treeValue.value === WILDCARD) {
    return Object.values(payload);
  }

  if (treeValue.value in payload) {
    return handlSubscript(payload[treeValue.value], tree.next);
  }
};

const handlSubscript = (payload: unknown, tree: Subscript): unknown => {
  if (tree === null) {
    return payload;
  }

  switch (tree.subtype) {
    case 'bracket': {
      return handleSubscriptBracket(payload, tree);
    }
    case 'dot': {
      return handleSubscriptDot(payload, tree);
    }
    case 'dotdot': {
      return handleSubscriptDotdot(payload, tree);
    }
  }
};

export const query = (payload: unknown, path: string): unknown => {
  const tree = parse(path);

  return handlSubscript(payload, tree.next);
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
