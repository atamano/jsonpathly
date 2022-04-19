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
import { isArray, isNumber, isObject, isString, isUndefined } from './helper';

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
        return !isUndefined(this.handleSubscript(this.rootPayload, tree.next));
      }
      case 'current': {
        return !isUndefined(this.handleSubscript(payload, tree.next));
      }
    }
  };

  handleNumericLiteral = (payload: unknown, tree: NumericLiteral): unknown => {
    if (isArray(payload) && tree.value < payload.length) {
      return payload[tree.value];
    }

    if (isString(payload) && tree.value < payload.length) {
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

  handleScriptExpression = (_payload: unknown, _tree: ScriptExpression): unknown => {
    throw new Error('Script expressions not handles');
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
      if (!isUndefined(res)) {
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
      return results.pop();
    }

    return results;
  };

  handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotDot): unknown[] => {
    const treeValue = tree.value;

    switch (treeValue.type) {
      case 'subscriptables': {
        return this.handleSubscriptables(payload, treeValue);
      }
      case 'identifier': {
        let results: unknown[] = [];
        const identifierRes = this.handleIdentifier(payload, treeValue);
        if (!isUndefined(identifierRes)) {
          if (treeValue.value === WILDCARD) {
            results = results.concat(identifierRes);
          } else {
            results.push(identifierRes);
          }
        }

        if (isObject(payload)) {
          for (const value of Object.values(payload)) {
            const res = this.handleSubscriptDotdot(value, tree);
            results = results.concat(res);
          }
        }

        if (isArray(payload)) {
          for (const value of payload) {
            const res = this.handleSubscriptDotdot(value, tree);
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

    return this.handleIdentifier(payload, tree.value);
  };

  handleSubscript = (payload: unknown, tree: Subscript | null): unknown => {
    if (tree === null) {
      return payload;
    }

    switch (tree.subtype) {
      case 'bracket': {
        const result = this.handleSubscriptBracket(payload, tree);
        return this.handleSubscript(result, tree.next);
      }
      case 'dot': {
        const result = this.handleSubscriptDot(payload, tree);
        return this.handleSubscript(result, tree.next);
      }
      case 'dotdot': {
        let resultsFinal: unknown[] = [];
        const results = this.handleSubscriptDotdot(payload, tree);

        for (const item of results) {
          const res = this.handleSubscript(item, tree.next);
          if (!isUndefined(res)) {
            resultsFinal = resultsFinal.concat(res);
          }
        }
        return resultsFinal;
      }
    }
  };
}
