import {
  ArraySlice,
  Comparator,
  ComparatorArgument,
  FilterExpressionChild,
  Identifier,
  LogicalExpression,
  NumericLiteral,
  ScriptExpression,
  StringLiteral,
  Subscript,
  Subscriptable,
  Subscriptables,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
  Wildcard,
} from '../parser/types';
import { isArray, isDefined, isNumber, isObject, isString, isUndefined } from './helper';

const isSingleValueBracket = (tree: SubscriptBracket): boolean => {
  return (
    tree.value.values.length === 1 &&
    ['string_literal', 'numeric_literal', 'identifier'].includes(tree.value.values[0].type)
  );
};

export class Handler {
  rootPayload: unknown;

  constructor(rootPayload: unknown) {
    this.rootPayload = rootPayload;
  }

  handleIdentifier = (payload: unknown, tree: Identifier): unknown => {
    if (!isObject(payload)) {
      return;
    }

    if (isArray(payload) || !isObject(payload) || !(tree.value in payload)) {
      return;
    }

    return payload[tree.value];
  };

  handleWildcard = (payload: unknown, _tree: Wildcard): unknown[] => {
    if (!isObject(payload) && !isArray(payload)) {
      return [];
    }

    return Object.values(payload);
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
      case 'wildcard': {
        return this.handleWildcard(payload, tree);
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
      const result = this.handleSubscriptable(payload, treeValue);
      if (!isUndefined(result)) {
        results = results.concat(result);
      }
    }

    return results;
  };

  handleSubscriptBracket = (payload: unknown, tree: SubscriptBracket): unknown => {
    const results = this.handleSubscriptables(payload, tree.value);

    if (isSingleValueBracket(tree)) {
      return this.handleSubscript(results.pop(), tree.next);
    }

    if (!tree.next) {
      return results;
    }

    return results
      .map((item) => this.handleSubscript(item, tree.next))
      .filter(isDefined)
      .flat();
  };

  handleSubscriptDotdotRecursive = (payload: unknown, tree: SubscriptDotDot): unknown[] => {
    const treeValue = tree.value;
    let results: unknown[] = [];

    switch (treeValue.type) {
      case 'subscriptables': {
        const identifierRes = this.handleSubscriptables(payload, treeValue);
        results = results.concat(identifierRes);
        break;
      }
      case 'wildcard': {
        const identifierRes = this.handleWildcard(payload, treeValue);
        results = results.concat(identifierRes);
        break;
      }
      case 'identifier': {
        const identifierRes = this.handleIdentifier(payload, treeValue);
        if (!isUndefined(identifierRes)) {
          results.push(identifierRes);
          break;
        }
      }
    }

    if (['wildcard', 'identifier'].includes(treeValue.type)) {
      if (isObject(payload)) {
        for (const value of Object.values(payload)) {
          const result = this.handleSubscriptDotdotRecursive(value, tree);
          results = results.concat(result);
        }
      }

      if (isArray(payload)) {
        for (const value of payload) {
          const result = this.handleSubscriptDotdotRecursive(value, tree);
          results = results.concat(result);
        }
      }
    }

    return results;
  };

  handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotDot): unknown | unknown[] => {
    const results = this.handleSubscriptDotdotRecursive(payload, tree);

    if (!tree.next) {
      return results;
    }

    const treeNext = tree.next;
    switch (treeNext.subtype) {
      case 'dot': {
        return results
          .map((item) => this.handleSubscriptDot(item, treeNext))
          .filter(isDefined)
          .flat();
      }
      case 'dotdot': {
        if (treeNext.value.type === 'wildcard') {
          return results
            .map((item) => this.handleSubscriptDotdot(item, treeNext))
            .filter(isDefined)
            .flat();
        }
        return this.handleSubscriptDotdot(results, treeNext);
      }
      case 'bracket': {
        if (isSingleValueBracket(treeNext)) {
          return results
            .map((item) => this.handleSubscriptBracket(item, treeNext))
            .filter(isDefined)
            .flat();
        }
        return this.handleSubscriptBracket(results, treeNext);
      }
    }
  };

  handleSubscriptDot = (payload: unknown, tree: SubscriptDot): unknown => {
    if (!isObject(payload)) {
      return;
    }

    switch (tree.value.type) {
      case 'identifier': {
        const result = this.handleIdentifier(payload, tree.value);
        return this.handleSubscript(result, tree.next);
      }
      case 'wildcard': {
        return this.handleWildcard(payload, tree.value)
          .map((item) => this.handleSubscript(item, tree.next))
          .filter(isDefined);
      }
    }
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
