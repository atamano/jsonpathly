import * as isPlainObject from 'lodash.isplainobject';
import { WILDCARD } from '../parser/Listener';
import { parse } from '../parser';
import {
  Identifier,
  StringLiteral,
  Subscript,
  Subscriptable,
  Subscriptables,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotdot,
} from '../parser/types';

type Payload = unknown | unknown[];

const isArray = (item: unknown): item is unknown[] => {
  return Array.isArray(item);
};

const isObject = (item: unknown): item is Record<string, unknown> => {
  return isPlainObject(item);
};

const handleIdentifier = (payload: Payload, tree: Identifier): unknown => {
  if (!isObject(payload) && !isArray(payload)) {
    return;
  }

  if (tree.value === WILDCARD) {
    return Object.values(payload);
  }

  if (isArray(payload) || !isObject(payload) || !(tree.value in payload)) {
    return;
  }

  return payload[tree.value];
};

const handleStringLitteral = (payload: Payload, tree: StringLiteral): unknown => {
  if (isObject(payload) && tree.value in payload) {
    return payload[tree.value];
  }
  return;
};

const handleSubscriptable = (payload: Payload, tree: Subscriptable): unknown => {
  switch (tree.type) {
    case 'string_literal': {
      return handleStringLitteral(payload, tree);
    }
  }
};

const handleSubscriptables = (payload: Payload, tree: Subscriptables): unknown[] => {
  const results = [];
  for (const treeValue of tree.values) {
    const res = handleSubscriptable(payload, treeValue);
    results.push(res);
  }

  return results;
};

const handleSubscriptBracket = (payload: Payload, tree: SubscriptBracket): Payload => {
  const results = handleSubscriptables(payload, tree.value);

  if (tree.value.values.length === 1 && ['string_literal', 'numeric_literal'].includes(tree.value.values[0].type)) {
    return handleSubscript(results.pop(), tree.next);
  }

  return handleSubscript(results, tree.next);
};

const handleSubscriptDotdot = (payload: Payload, tree: SubscriptDotdot): Payload => {
  let results: unknown[] = [];
  const treeValue = tree.value;

  switch (treeValue.type) {
    case 'subscriptables': {
      return handleSubscriptables(payload, treeValue);
    }
    case 'identifier': {
      const identifierRes = handleIdentifier(payload, treeValue);
      const res = handleSubscript(identifierRes, tree.next);
      if (typeof res !== 'undefined') {
        results.push(res);
      }

      if (isObject(payload)) {
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

const handleSubscriptDot = (payload: unknown, tree: SubscriptDot): Payload => {
  if (!isObject(payload)) {
    return;
  }

  const result = handleIdentifier(payload, tree.value);
  if (typeof result === 'undefined') {
    return;
  }

  return handleSubscript(result, tree.next);
};

const handleSubscript = (payload: Payload, tree: Subscript): Payload => {
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

export const query = (payload: unknown, path: string): Payload => {
  const tree = parse(path);

  return handleSubscript(payload, tree.next);
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
