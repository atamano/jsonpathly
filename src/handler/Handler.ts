import { JSONPathValidationError } from '../parser/errors';
import {
  Comparator,
  FilterExpressionContent,
  Identifier,
  Indexes,
  LogicalExpression,
  NumericLiteral,
  OperationContent,
  Slices,
  StringLiteral,
  Subscript,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
  Unions,
} from '../parser/types';
import { isArray, isDefined, isNumber, isObject, isString } from './helper';

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

  handleWildcard = (payload: unknown): unknown[] => {
    if (!isObject(payload) && !isArray(payload)) {
      return [];
    }

    return Object.values(payload);
  };

  handleOperationContent = (payload: unknown, tree: OperationContent): unknown => {
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
      case 'operation': {
        const left = this.handleOperationContent(payload, tree.left);
        const right = this.handleOperationContent(payload, tree.right);

        if (!isNumber(left) || !isNumber(right)) {
          return;
        }

        switch (tree.operator) {
          case 'plus': {
            return left + right;
          }
          case 'minus': {
            return left - right;
          }
          case '': {
            if (right > 0) {
              throw new JSONPathValidationError('bad syntax on comparator opertion', null);
            }
            return left + right;
          }
        }
      }
    }
  };

  handleComparator = (payload: unknown, tree: Comparator): boolean => {
    const leftValue = this.handleOperationContent(payload, tree.left);
    const rightValue = this.handleOperationContent(payload, tree.right);

    switch (tree.operator) {
      case 'subsetof': {
        if (!isArray(leftValue) || !isArray(rightValue)) {
          return false;
        }
        const itemsRight = new Set(rightValue);
        return leftValue.every((e) => itemsRight.has(e));
      }
      case 'anyof': {
        if (!isArray(leftValue) || !isArray(rightValue)) {
          return false;
        }
        const itemsRight = new Set(rightValue);
        return leftValue.some((e) => itemsRight.has(e));
      }
      case 'noneof': {
        if (!isArray(leftValue) || !isArray(rightValue)) {
          return false;
        }
        const itemsRight = new Set(rightValue);
        return !leftValue.some((e) => itemsRight.has(e));
      }
      case 'sizeof': {
        if ((!isArray(leftValue) && !isString(leftValue)) || (!isArray(rightValue) && !isString(rightValue))) {
          return false;
        }
        return leftValue.length === rightValue.length;
      }
      case 'size': {
        if ((!isArray(leftValue) && !isString(leftValue)) || !isNumber(rightValue)) {
          return false;
        }
        return leftValue.length === rightValue;
      }
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
    const leftValue = this.handleFilterExpressionContent(payload, tree.left);
    const rightValue = this.handleFilterExpressionContent(payload, tree.right);
    switch (tree.operator) {
      case 'and': {
        return leftValue && rightValue;
      }
      case 'or': {
        return leftValue || rightValue;
      }
    }
  };

  handleFilterExpressionContent = (payload: unknown, tree: FilterExpressionContent): boolean => {
    switch (tree.type) {
      case 'logicalExpression': {
        return this.handleLogicalExpression(payload, tree);
      }
      case 'comparator': {
        return this.handleComparator(payload, tree);
      }
      case 'groupExpression': {
        return this.handleFilterExpressionContent(payload, tree.value);
      }
      case 'negateExpression': {
        return !this.handleFilterExpressionContent(payload, tree.value);
      }
      case 'root': {
        return isDefined(this.handleSubscript(this.rootPayload, tree.next));
      }
      case 'current': {
        return isDefined(this.handleSubscript(payload, tree.next));
      }
    }
  };

  handleNumericLiteral = (payload: unknown, tree: NumericLiteral): unknown => {
    if (!isArray(payload) && !isString(payload)) {
      return;
    }

    const index = tree.value < 0 && payload.length ? payload.length + (tree.value % payload.length) : tree.value;

    if (index < payload.length) {
      return payload[index];
    }
  };

  handleSlices = (payload: unknown, tree: Slices): unknown[] => {
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

  handleUnions = (payload: unknown, tree: Unions): unknown => {
    if (!isObject(payload)) {
      return [];
    }

    return tree.values
      .map((value) => {
        switch (value.type) {
          case 'identifier': {
            return this.handleIdentifier(payload, value);
          }
          case 'stringLiteral': {
            return this.handleStringLiteral(payload, value);
          }
        }
      })
      .filter(isDefined);
  };

  handleIndexes = (payload: unknown, tree: Indexes): unknown => {
    if (!isArray(payload)) {
      return [];
    }

    return tree.values.map((value) => this.handleNumericLiteral(payload, value)).filter(isDefined);
  };

  handleBracketContent = (payload: unknown, tree: SubscriptBracket['value']): unknown => {
    switch (tree.type) {
      case 'identifier': {
        return this.handleIdentifier(payload, tree);
      }
      case 'wildcard': {
        return this.handleWildcard(payload);
      }
      case 'stringLiteral': {
        return this.handleStringLiteral(payload, tree);
      }
      case 'numericLiteral': {
        return this.handleNumericLiteral(payload, tree);
      }
      case 'filterExpression': {
        let results: unknown[] = [];

        if (isArray(payload)) {
          for (const item of payload) {
            const isValid = this.handleFilterExpressionContent(item, tree.value);
            if (isValid) {
              results = results.concat(item);
            }
          }
        }
        if (isObject(payload)) {
          const isValid = this.handleFilterExpressionContent(payload, tree.value);
          if (isValid) {
            results = results.concat(payload);
          }
        }
        return results;
      }
      case 'slices': {
        return this.handleSlices(payload, tree);
      }
      case 'indexes': {
        return this.handleIndexes(payload, tree);
      }
      case 'unions': {
        return this.handleUnions(payload, tree);
      }
    }
  };

  handleSubscriptBracket = (payload: unknown, tree: SubscriptBracket): unknown => {
    const results = this.handleBracketContent(payload, tree.value);

    if (!tree.next) {
      return results;
    }

    if (['identifier', 'stringLiteral', 'numericLiteral'].includes(tree.value.type) || !isArray(results)) {
      return this.handleSubscript(results, tree.next);
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
      case 'subscript': {
        const identifierRes = this.handleSubscriptBracket(payload, treeValue);
        results = results.concat(identifierRes);
        break;
      }
      case 'wildcard': {
        const identifierRes = this.handleWildcard(payload);
        results = results.concat(identifierRes);
        break;
      }
      case 'identifier': {
        const identifierRes = this.handleIdentifier(payload, treeValue);
        if (isDefined(identifierRes)) {
          results.push(identifierRes);
          break;
        }
      }
    }

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

    return results;
  };

  handleSubscriptDotdot = (payload: unknown, tree: SubscriptDotDot): unknown => {
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
        return results
          .map((item) => this.handleSubscriptBracket(item, treeNext))
          .filter(isDefined)
          .flat();
      }
    }
  };

  handleSubscriptDot = (payload: unknown, tree: SubscriptDot): unknown => {
    switch (tree.value.type) {
      case 'identifier': {
        if (!isObject(payload)) {
          return;
        }
        const result = this.handleIdentifier(payload, tree.value);
        return this.handleSubscript(result, tree.next);
      }
      case 'numericLiteral': {
        if (!isArray(payload)) {
          return;
        }
        const result = this.handleNumericLiteral(payload, tree.value);
        return this.handleSubscript(result, tree.next);
      }
      case 'wildcard': {
        const result = this.handleWildcard(payload);
        if (!tree.next) {
          return result;
        }

        return result
          .map((item) => this.handleSubscript(item, tree.next))
          .filter(isDefined)
          .flat();
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
