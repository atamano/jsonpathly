import * as isPlainObject from 'lodash.isplainobject';
import { WILDCARD } from '../parser/Listener';
import { parse } from '../parser';
import {
  ArraySlice,
  Comparator,
  ComparatorArgument,
  FilterExpression,
  Identifier,
  NumericLiteral,
  ScriptExpression,
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

const handleComparatorArgument = (payload: Payload, tree: ComparatorArgument): Payload => {
  switch (tree.type) {
    case 'current': {
      return handleSubscript(payload, tree.next);
    }
    case 'value': {
      return tree.value;
    }
  }
};
const handleComparator = (payload: Payload, tree: Comparator): boolean => {
  const leftValue = handleComparatorArgument(payload, tree.left);
  const rightValue = handleComparatorArgument(payload, tree.right);

  switch (tree.operator) {
    case 'eq': {
      return leftValue === rightValue;
    }
    case 'ne': {
      return leftValue !== rightValue;
    }
    case 'lt': {
      return leftValue < rightValue;
    }
    case 'le': {
      return leftValue <= rightValue;
    }
    case 'gt': {
      return leftValue > rightValue;
    }
    case 'ge': {
      return leftValue >= rightValue;
    }
    case 'in': {
      if (isArray(rightValue)) {
        return rightValue.includes(leftValue);
      }
      return false;
    }
    case 'nin': {
      if (isArray(rightValue)) {
        return !rightValue.includes(leftValue);
      }
      return false;
    }
  }
};

const handleFilterExpression = (payload: Payload, tree: FilterExpression): boolean => {
  const treeValue = tree.value;

  switch (treeValue.type) {
    case 'binary_expression': {
      break;
    }
    case 'comparator': {
      return handleComparator(payload, treeValue);
    }
    case 'group_expression': {
      break;
    }
    case 'negate': {
      return !handleFilterExpression(payload, treeValue.value);
    }
    case 'root': {
      // TODO
      return !!handleSubscript(payload, treeValue.next);
    }
    case 'current': {
      return !!handleSubscript(payload, treeValue.next);
    }
    case 'value': {
      // TODO: Check if correct
      return !!treeValue.value;
    }
  }
  return false;
};

const handleNumericLiteral = (payload: Payload, tree: NumericLiteral): unknown => {
  // Only array allowed (should handle string as well ?)
  if (!isArray(payload) || tree.value >= payload.length) {
    return;
  }

  return payload[tree.value];
};

const handleArraySlice = (payload: Payload, tree: ArraySlice): unknown[] => {
  if (!isArray(payload)) {
    return;
  }

  const results = [];
  const result = payload.slice(tree.start !== null ? tree.start : undefined, tree.end !== null ? tree.end : undefined);
  const step = tree.step === null || tree.step <= 0 ? 1 : tree.step;

  for (let i = 0; i < result.length; i++) {
    if (i % step === 0) {
      results.push(result[i]);
    }
  }

  return results;
};

const handleStringLiteral = (payload: Payload, tree: StringLiteral): unknown => {
  if (!isObject(payload) || !(tree.value in payload)) {
    return;
  }

  return payload[tree.value];
};

const handleScriptExpression = (payload: Payload, tree: ScriptExpression): Payload => {
  console.log('Script expression', tree);

  return payload;
};

const handleSubscriptable = (payload: Payload, tree: Subscriptable): unknown => {
  switch (tree.type) {
    case 'identifier': {
      return handleIdentifier(payload, tree);
    }
    case 'string_literal': {
      return handleStringLiteral(payload, tree);
    }
    case 'numeric_literal': {
      return handleNumericLiteral(payload, tree);
    }
    case 'filter_expression': {
      let results = [];
      if (isArray(payload)) {
        for (const item of payload) {
          const isValid = handleFilterExpression(item, tree);
          if (isValid) {
            results = results.concat(item);
          }
        }
      }
      // Handle objects?
      return results;
    }
    case 'array_slice': {
      return handleArraySlice(payload, tree);
    }
    case 'script_expression': {
      return handleScriptExpression(payload, tree);
    }
  }
};

const handleSubscriptables = (payload: Payload, tree: Subscriptables): unknown[] => {
  let results = [];

  for (const treeValue of tree.values) {
    const res = handleSubscriptable(payload, treeValue);
    if (typeof res !== 'undefined') {
      results = results.concat(res);
    }
  }

  return results;
};

const handleSubscriptBracket = (payload: Payload, tree: SubscriptBracket): Payload => {
  const results = handleSubscriptables(payload, tree.value);

  if (
    tree.value.values.length === 1 &&
    ['string_literal', 'numeric_literal', 'identifier'].includes(tree.value.values[0].type)
  ) {
    return handleSubscript(results.pop(), tree.next);
  }

  return handleSubscript(results, tree.next);
};

const handleSubscriptDotdot = (payload: Payload, tree: SubscriptDotdot): Payload => {
  const treeValue = tree.value;

  switch (treeValue.type) {
    case 'subscriptables': {
      return handleSubscriptables(payload, treeValue);
    }
    case 'identifier': {
      let results = [];
      const identifierRes = handleIdentifier(payload, treeValue);
      const res = handleSubscript(identifierRes, tree.next);
      if (typeof res !== 'undefined') {
        results = results.concat(res);
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
      return results;
    }
  }
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

// group_expression
// binary_expression
