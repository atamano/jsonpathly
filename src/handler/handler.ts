import { WILDCARD } from '../parser/Listener';
import {
  ArraySlice,
  LogicalExpression,
  Comparator,
  ComparatorArgument,
  FilterExpressionChild,
  Identifier,
  NumericLiteral,
  ScriptExpression,
  StringLiteral,
  Subscript,
  Subscriptable,
  Subscriptables,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
} from '../parser/types';
import { isArray, isNumber, isObject } from './helper';

export class Handler {
  rootPayload: unknown;

  constructor(rootPayload: unknown) {
    this.rootPayload = rootPayload;
  }

  handleIdentifier = (payload: unknown, tree: Identifier): unknown => {
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

  handleComparatorArgument = (payload: unknown, tree: ComparatorArgument): unknown => {
    switch (tree.type) {
      case 'root': {
        return this.handleSubscript(this.rootPayload, tree.next);
      }
      case 'current': {
        return this.handleSubscript(payload, tree.next);
      }
      case 'value': {
        return tree.value;
      }
    }
  };

  handleComparator = (payload: unknown, tree: Comparator): boolean => {
    const leftValue = this.handleComparatorArgument(payload, tree.left);
    const rightValue = this.handleComparatorArgument(payload, tree.right);

    switch (tree.operator) {
      case 'eq': {
        return leftValue === rightValue;
      }
      case 'ne': {
        return leftValue !== rightValue;
      }
      case 'lt': {
        if (!isNumber(leftValue) || !isNumber(rightValue)) {
          return false;
        }
        return leftValue < rightValue;
      }
      case 'le': {
        if (!isNumber(leftValue) || !isNumber(rightValue)) {
          return false;
        }
        return leftValue <= rightValue;
      }
      case 'gt': {
        if (!isNumber(leftValue) || !isNumber(rightValue)) {
          return false;
        }
        return leftValue > rightValue;
      }
      case 'ge': {
        if (!isNumber(leftValue) || !isNumber(rightValue)) {
          return false;
        }
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

  handleLogicalExpression = (payload: unknown, tree: LogicalExpression): boolean => {
    const leftValue = this.handleFilterExpressionChild(payload, tree.left);
    const rightValue = this.handleFilterExpressionChild(payload, tree.right);
    switch (tree.operator) {
      case 'and': {
        return leftValue && rightValue;
      }
      case 'or': {
        return leftValue || rightValue;
      }
    }
  };

  handleFilterExpressionChild = (payload: unknown, tree: FilterExpressionChild): boolean => {
    switch (tree.type) {
      case 'logical_expression': {
        return this.handleLogicalExpression(payload, tree);
      }
      case 'comparator': {
        return this.handleComparator(payload, tree);
      }
      case 'group_expression': {
        return this.handleFilterExpressionChild(payload, tree.value);
      }
      case 'negate_expression': {
        return !this.handleFilterExpressionChild(payload, tree.value);
      }
      case 'root': {
        return !!this.handleSubscript(this.rootPayload, tree.next);
      }
      case 'current': {
        return !!this.handleSubscript(payload, tree.next);
      }
    }
  };

  handleNumericLiteral = (payload: unknown, tree: NumericLiteral): unknown => {
    if (isArray(payload) && tree.value < payload.length) {
      return payload[tree.value];
    }

    if (typeof payload === 'string' && tree.value < payload.length) {
      return payload[tree.value];
    }
  };

  handleArraySlice = (payload: unknown, tree: ArraySlice): unknown[] => {
    const results = [];

    if (!isArray(payload)) {
      return [];
    }

    const result = payload.slice(
      tree.start !== null ? tree.start : undefined,
      tree.end !== null ? tree.end : undefined,
    );
    const step = tree.step === null || tree.step <= 0 ? 1 : tree.step;

    for (let i = 0; i < result.length; i++) {
      if (i % step === 0) {
        results.push(result[i]);
      }
    }

    return results;
  };

  handleStringLiteral = (payload: unknown, tree: StringLiteral): unknown => {
    if (!isObject(payload) || !(tree.value in payload)) {
      return;
    }

    return payload[tree.value];
  };

  handleScriptExpression = (payload: unknown, tree: ScriptExpression): unknown => {
    console.log('Script expression', tree);

    return payload;
  };

  handleSubscriptable = (payload: unknown, tree: Subscriptable): unknown => {
    switch (tree.type) {
      case 'identifier': {
        return this.handleIdentifier(payload, tree);
      }
      case 'string_literal': {
        return this.handleStringLiteral(payload, tree);
      }
      case 'numeric_literal': {
        return this.handleNumericLiteral(payload, tree);
      }
      case 'filter_expression': {
        let results: unknown[] = [];

        if (isArray(payload)) {
          for (const item of payload) {
            const isValid = this.handleFilterExpressionChild(item, tree.value);
            if (isValid) {
              results = results.concat(item);
            }
          }
        }
        // Handle objects?
        return results;
      }
      case 'array_slice': {
        return this.handleArraySlice(payload, tree);
      }
      case 'script_expression': {
        return this.handleScriptExpression(payload, tree);
      }
    }
  };

  handleSubscriptables = (payload: unknown, tree: Subscriptables): unknown[] => {
    let results: unknown[] = [];

    for (const treeValue of tree.values) {
      const res = this.handleSubscriptable(payload, treeValue);
      if (typeof res !== 'undefined') {
        results = results.concat(res);
      }
    }

    return results;
  };

  handleSubscriptBracket = (payload: unknown, tree: SubscriptBracket): unknown => {
    const results = this.handleSubscriptables(payload, tree.value);

    if (
      tree.value.values.length === 1 &&
      ['string_literal', 'numeric_literal', 'identifier'].includes(tree.value.values[0].type)
    ) {
      return this.handleSubscript(results.pop(), tree.next);
    }

    return this.handleSubscript(results, tree.next);
  };

  handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotDot): unknown => {
    const treeValue = tree.value;

    switch (treeValue.type) {
      case 'subscriptables': {
        return this.handleSubscriptables(payload, treeValue);
      }
      case 'identifier': {
        let results: unknown[] = [];
        const identifierRes = this.handleIdentifier(payload, treeValue);
        const res = this.handleSubscript(identifierRes, tree.next);
        if (typeof res !== 'undefined') {
          results = results.concat(res);
        }

        if (isObject(payload)) {
          for (const value of Object.values(payload)) {
            const res = this.handleSubscriptDotdot(value, tree);
            results = results.concat(res);
          }
        }
        if (isArray(payload)) {
          for (const item of payload) {
            const res = this.handleSubscriptDotdot(item, tree);
            results = results.concat(res);
          }
        }
        return results;
      }
    }
  };

  handleSubscriptDot = (payload: unknown, tree: SubscriptDot): unknown => {
    if (!isObject(payload)) {
      return;
    }

    const result = this.handleIdentifier(payload, tree.value);
    if (typeof result === 'undefined') {
      return;
    }

    return this.handleSubscript(result, tree.next);
  };

  handleSubscript = (payload: unknown, tree: Subscript | null): unknown => {
    if (tree === null) {
      return payload;
    }

    switch (tree.subtype) {
      case 'bracket': {
        return this.handleSubscriptBracket(payload, tree);
      }
      case 'dot': {
        return this.handleSubscriptDot(payload, tree);
      }
      case 'dotdot': {
        return this.handleSubscriptDotdot(payload, tree);
      }
    }
  };
}
