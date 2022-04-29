import { JSONPathSyntaxError } from '../parser/errors';
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
  BracketExpressionContent,
  BracketMemberContent,
  DotDot,
  Unions,
  JsonPathElement,
  PathFunction,
  PathFunctionContent,
  Root,
} from '../parser/types';
import {
  isArray,
  isArrayOfNumber,
  isDefined,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  standardDeviation,
} from './helper';

const isIndefinite = (item: JsonPathElement | null): boolean => {
  if (!item) {
    return false;
  }

  if (['dotdot', 'bracketExpression', 'wildcard'].includes(item.type)) {
    return true;
  }

  if ('value' in item && isPlainObject(item.value) && 'type' in item && item.type !== 'value') {
    if (isIndefinite(item.value)) {
      return true;
    }
  }

  if (item.type === 'subscript') {
    return isIndefinite(item.next);
  }

  return false;
};

export class Handler {
  rootPayload: unknown;

  constructor(rootPayload: unknown) {
    this.rootPayload = rootPayload;
  }

  private handleIdentifier = (payload: unknown, tree: Identifier): unknown => {
    if (!isPlainObject(payload)) {
      return;
    }

    if (!(tree.value in payload)) {
      return;
    }

    return payload[tree.value];
  };

  private handleWildcard = (payload: unknown): unknown[] => {
    if (!isPlainObject(payload) && !isArray(payload)) {
      return [];
    }

    return Object.values(payload);
  };

  private handleOperationContent = (payload: unknown, tree: OperationContent): unknown => {
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
      case 'groupOperation': {
        return this.handleOperationContent(payload, tree.value);
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
          case 'div': {
            if (right === 0) {
              return;
            }
            return left / right;
          }
          case 'multi': {
            return left * right;
          }
          case '': {
            if (right > 0) {
              throw new JSONPathSyntaxError(0, 0, 'Missing operator in operation');
            }
            return left + right;
          }
        }
      }
    }
  };

  private handleComparator = (payload: unknown, tree: Comparator): boolean => {
    const leftValue = this.handleOperationContent(payload, tree.left);

    if (tree.operator === 'empty') {
      if (!isArray(leftValue) && !isString(leftValue)) {
        return false;
      }
      return leftValue.length === 0;
    }

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
      case 'reg': {
        if (isString(leftValue) && isString(rightValue)) {
          const value = rightValue.slice(1, -1);
          return !!leftValue.match(new RegExp(value, tree.right.opts));
        }
        return false;
      }
    }
  };

  private handleLogicalExpression = (payload: unknown, tree: LogicalExpression): boolean => {
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

  private handleFilterExpressionContent = (payload: unknown, tree: FilterExpressionContent): boolean => {
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
      case 'notExpression': {
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

  private handleFunctionContent = (payload: unknown, tree: PathFunctionContent): unknown => {
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

  private handleFunction = (payload: unknown, tree: PathFunction): unknown => {
    switch (tree.operator) {
      case 'avg': {
        if (!isArrayOfNumber(payload)) {
          return;
        }
        if (payload.length === 0) {
          return 0;
        }
        return payload.reduce((a, b) => a + b, 0.0) / payload.length;
      }
      case 'keys': {
        if (!isPlainObject(payload)) {
          return;
        }
        return Object.keys(payload);
      }
      case 'length': {
        if (!isArray(payload)) {
          return;
        }
        return payload.length;
      }
      case 'max': {
        if (!isArrayOfNumber(payload)) {
          return;
        }
        if (payload.length === 0) {
          return 0;
        }
        return Math.max(...payload);
      }
      case 'min': {
        if (!isArrayOfNumber(payload)) {
          return;
        }
        if (payload.length === 0) {
          return 0;
        }
        return Math.min(...payload);
      }
      case 'stddev': {
        if (!isArrayOfNumber(payload)) {
          return;
        }
        if (payload.length === 0) {
          return 0;
        }
        return standardDeviation(payload);
      }
      case 'sum': {
        if (!isArrayOfNumber(payload)) {
          return;
        }

        return payload.reduce((a, b) => a + b, 0);
      }
      case 'concat': {
        if (!isArray(payload) && !isString(payload)) {
          return;
        }

        const value = this.handleFunctionContent(payload, tree.value);
        if (isUndefined(value)) {
          return payload;
        }

        if (isString(payload)) {
          if (!isString(value)) {
            return undefined;
          }
          return `${payload}${value}`;
        }

        return payload.concat(value);
      }
      case 'append': {
        if (!isArray(payload)) {
          return;
        }
        const value = this.handleFunctionContent(payload, tree.value);

        if (isUndefined(value)) {
          return payload;
        }

        return [...payload, value];
      }
    }
  };

  private handleNumericLiteral = (payload: unknown, tree: NumericLiteral): unknown => {
    if (!isArray(payload) && !isString(payload)) {
      return;
    }

    const index = tree.value < 0 && payload.length ? payload.length + (tree.value % payload.length) : tree.value;

    if (index < payload.length) {
      return payload[index];
    }
  };

  private handleSlices = (payload: unknown, tree: Slices): unknown[] => {
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

  private handleStringLiteral = (payload: unknown, tree: StringLiteral): unknown => {
    if (!isPlainObject(payload) || !(tree.value in payload)) {
      return;
    }

    return payload[tree.value];
  };

  private handleUnions = (payload: unknown, tree: Unions): unknown[] => {
    if (!isPlainObject(payload)) {
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

  private handleIndexes = (payload: unknown, tree: Indexes): unknown[] => {
    if (!isArray(payload)) {
      return [];
    }

    return tree.values.map((value) => this.handleNumericLiteral(payload, value)).filter(isDefined);
  };

  private handleDotdot = (payload: unknown, tree: DotDot): unknown[] => {
    const treeValue = tree.value;
    let results: unknown[] = [];

    switch (treeValue.type) {
      case 'bracketMember': {
        const identifierRes = this.handleBracketMemberContent(payload, treeValue.value);
        if (isDefined(identifierRes)) {
          results.push(identifierRes);
        }
        break;
      }
      case 'bracketExpression': {
        if (!isPlainObject(payload)) {
          const identifierRes = this.handleBracketExpressionContent(payload, treeValue.value);
          results = results.concat(identifierRes);
        }
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
        }
        break;
      }
    }

    if (isPlainObject(payload)) {
      for (const value of Object.values(payload)) {
        const result = this.handleDotdot(value, tree);
        results = results.concat(result);
      }
    }

    if (isArray(payload)) {
      for (const value of payload) {
        const result = this.handleDotdot(value, tree);
        results = results.concat(result);
      }
    }

    return results;
  };

  private handleBracketMemberContent = (payload: unknown, tree: BracketMemberContent): unknown => {
    switch (tree.type) {
      case 'identifier': {
        return this.handleIdentifier(payload, tree);
      }
      case 'numericLiteral': {
        return this.handleNumericLiteral(payload, tree);
      }
      case 'stringLiteral': {
        return this.handleStringLiteral(payload, tree);
      }
    }
  };

  private handleBracketExpressionContent = (payload: unknown, tree: BracketExpressionContent): unknown[] => {
    switch (tree.type) {
      case 'filterExpression': {
        let results: unknown[] = [];
        if (isArray(payload)) {
          for (const item of payload) {
            const isValid = this.handleFilterExpressionContent(item, tree.value);
            if (isValid) {
              results = results.concat(item);
            }
          }
        } else if (isPlainObject(payload)) {
          const isValid = this.handleFilterExpressionContent(payload, tree.value);
          if (isValid) {
            results = results.concat(payload);
          }
        }

        return results;
      }
      case 'indexes': {
        return this.handleIndexes(payload, tree);
      }
      case 'unions': {
        return this.handleUnions(payload, tree);
      }
      case 'wildcard': {
        return this.handleWildcard(payload);
      }
      case 'slices': {
        return this.handleSlices(payload, tree);
      }
    }
  };

  private handleSubscriptConcat = (payload: unknown[], tree: Subscript | null): unknown => {
    if (!tree) {
      return payload;
    }

    let results: unknown[] = [];

    for (const item of payload) {
      const res = this.handleSubscript(item, tree);

      if (isDefined(res) && isIndefinite(tree)) {
        results = results.concat(res);
      } else if (isDefined(res)) {
        results.push(res);
      }
    }

    return results;
  };

  private handleSubscript = (payload: unknown, tree: Subscript | null): unknown => {
    if (tree === null) {
      return payload;
    }

    const treeValue = tree.value;
    switch (treeValue.type) {
      case 'bracketExpression': {
        const result = this.handleBracketExpressionContent(payload, treeValue.value);
        return this.handleSubscriptConcat(result, tree.next);
      }
      case 'bracketMember': {
        const result = this.handleBracketMemberContent(payload, treeValue.value);
        return this.handleSubscript(result, tree.next);
      }
      case 'dot': {
        switch (treeValue.value.type) {
          case 'identifier': {
            const result = this.handleIdentifier(payload, treeValue.value);
            return this.handleSubscript(result, tree.next);
          }
          case 'numericLiteral': {
            const result = this.handleNumericLiteral(payload, treeValue.value);
            return this.handleSubscript(result, tree.next);
          }
          case 'wildcard': {
            const result = this.handleWildcard(payload);
            return this.handleSubscriptConcat(result, tree.next);
          }
        }
      }
      case 'dotdot': {
        const result = this.handleDotdot(payload, treeValue);
        return this.handleSubscriptConcat(result, tree.next);
      }
    }
  };

  public handleRoot = (payload: unknown, tree: Root): unknown => {
    const result = this.handleSubscript(payload, tree.next);
    if (tree.fn) {
      return this.handleFunction(result, tree.fn);
    }
    return result;
  };
}
