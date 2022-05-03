import { JSONPathSyntaxError } from '../parser/errors';
import {
  BracketExpressionContent,
  BracketMemberContent,
  Comparator,
  DotDot,
  FilterExpressionContent,
  Identifier,
  Indexes,
  LogicalExpression,
  NumericLiteral,
  OperationContent,
  Root,
  Slices,
  StringLiteral,
  Subscript,
  Unions,
} from '../parser/types';
import { isArray, isDefined, isNumber, isPlainObject, isString, isUndefined } from './helper';

type ValuePath = { value: unknown; paths: string | string[]; isIndefinite?: boolean };

const getIndex = (index: number, total: number): number => (index < 0 && total ? total + (index % total) : index);

export class Handler {
  rootPayload: ValuePath;

  constructor(rootPayload: unknown) {
    this.rootPayload = { value: rootPayload, paths: '$' };
  }

  private handleIdentifier = (payload: ValuePath, tree: Identifier): ValuePath | undefined => {
    if (!isPlainObject(payload.value) || !(tree.value in payload.value)) {
      return;
    }

    return { value: payload.value[tree.value], paths: payload.paths.concat(`["${tree.value}"]`) };
  };

  private handleWildcard = ({ value, paths }: ValuePath): ValuePath[] => {
    if (!isPlainObject(value) && !isArray(value)) {
      return [];
    }

    if (isArray(value)) {
      return value.map((item, index) => ({
        value: item,
        paths: paths.concat(`[${index}]`),
      }));
    }

    return Object.keys(value).map((key) => ({ value: value[key], paths: paths.concat(`["${key}"]`) }));
  };

  private handleOperationContent = (payload: ValuePath, tree: OperationContent): ValuePath | undefined => {
    switch (tree.type) {
      case 'root': {
        return this.handleSubscript(this.rootPayload, tree.next);
      }
      case 'current': {
        return this.handleSubscript(payload, tree.next);
      }
      case 'value': {
        return { value: tree.value, paths: payload.paths };
      }
      case 'groupOperation': {
        return this.handleOperationContent(payload, tree.value);
      }
      case 'operation': {
        const left = this.handleOperationContent(payload, tree.left)?.value;
        const right = this.handleOperationContent(payload, tree.right)?.value;

        if (!isNumber(left) || !isNumber(right)) {
          return;
        }

        switch (tree.operator) {
          case 'plus': {
            return { value: left + right, paths: payload.paths };
          }
          case 'minus': {
            return { value: left - right, paths: payload.paths };
          }
          case 'div': {
            if (right === 0) {
              return;
            }
            return { value: left / right, paths: payload.paths };
          }
          case 'multi': {
            return { value: left * right, paths: payload.paths };
          }
          case '': {
            if (right > 0) {
              throw new JSONPathSyntaxError(0, 0, 'Missing operator in operation');
            }
            return { value: left + right, paths: payload.paths };
          }
        }
      }
    }
  };

  private handleComparator = (payload: ValuePath, tree: Comparator): boolean => {
    const leftValue = this.handleOperationContent(payload, tree.left)?.value;

    if (tree.operator === 'empty') {
      if (!isArray(leftValue) && !isString(leftValue)) {
        return false;
      }
      return leftValue.length === 0;
    }

    const rightValue = this.handleOperationContent(payload, tree.right)?.value;

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

  private handleLogicalExpression = (payload: ValuePath, tree: LogicalExpression): boolean => {
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

  private handleFilterExpressionContent = (payload: ValuePath, tree: FilterExpressionContent): boolean => {
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

  private handleNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (!isArray(value) && !isString(value)) {
      return;
    }

    const index = getIndex(tree.value, value.length);

    if (index < value.length) {
      return { value: value[index], paths: paths.concat(`[${index}]`) };
    }
  };

  private handleSlices = ({ value, paths }: ValuePath, tree: Slices): ValuePath[] => {
    const results: ValuePath[] = [];

    if (!isArray(value)) {
      return [];
    }

    const start = tree.start !== null ? getIndex(tree.start, value.length) : 0;
    const end = tree.end !== null ? getIndex(tree.end, value.length) : value.length;
    const step = tree.step === null || tree.step <= 0 ? 1 : tree.step;

    let count = 0;
    value.forEach((item, index) => {
      if (index >= start && index < end) {
        if (count % step === 0) {
          results.push({ value: item, paths: paths.concat(`[${index}]`) });
        }
        count += 1;
      }
    });

    return results;
  };

  private handleStringLiteral = ({ value, paths }: ValuePath, tree: StringLiteral): ValuePath | undefined => {
    if (!isPlainObject(value) || !(tree.value in value)) {
      return;
    }

    return { value: value[tree.value], paths: paths.concat(`["${tree.value}"]`) };
  };

  private handleUnions = (payload: ValuePath, tree: Unions): ValuePath[] => {
    if (!isPlainObject(payload.value)) {
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

  private handleIndexes = ({ value, paths }: ValuePath, tree: Indexes): ValuePath[] => {
    if (!isArray(value)) {
      return [];
    }

    return tree.values.map((item) => this.handleNumericLiteral({ value, paths }, item)).filter(isDefined);
  };

  private handleDotdot = (payload: ValuePath, tree: DotDot): ValuePath[] => {
    const treeValue = tree.value;
    const value = payload.value;
    let results: ValuePath[] = [];

    switch (treeValue.type) {
      case 'bracketMember': {
        const identifierRes = this.handleBracketMemberContent(payload, treeValue.value);
        if (isDefined(identifierRes)) {
          results.push(identifierRes);
        }
        break;
      }
      case 'bracketExpression': {
        if (!isPlainObject(value)) {
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

    if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => {
        const result = this.handleDotdot({ value: value[key], paths: payload.paths.concat(`["${key}"]`) }, tree);
        results = results.concat(result);
      });
    }

    if (isArray(value)) {
      value.forEach((item, index) => {
        const result = this.handleDotdot({ value: item, paths: payload.paths.concat(`[${index}]`) }, tree);
        results = results.concat(result);
      });
    }

    return results;
  };

  private handleBracketMemberContent = (payload: ValuePath, tree: BracketMemberContent): ValuePath | undefined => {
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

  private handleBracketExpressionContent = (payload: ValuePath, tree: BracketExpressionContent): ValuePath[] => {
    switch (tree.type) {
      case 'filterExpression': {
        let results: ValuePath[] = [];

        if (isArray(payload.value)) {
          payload.value.forEach((value, index) => {
            const item = { value, paths: payload.paths.concat(`[${index}]`) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              results = results.concat(item);
            }
          });
        } else if (isPlainObject(payload.value)) {
          if (this.handleFilterExpressionContent(payload, tree.value)) {
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

  private concatIndefiniteValuePaths = (payload: ValuePath[], tree: Subscript | null): ValuePath => {
    if (!tree) {
      return payload.reduce(
        (acc, current) => ({
          isIndefinite: true,
          value: [...(acc.value as unknown[]), current.value],
          paths: [...acc.paths, current.paths] as string | string[],
        }),
        { value: [], paths: [], isIndefinite: true },
      );
    }

    let values: unknown[] = [];
    let paths: string[] = [];

    payload.forEach((item) => {
      const res = this.handleSubscript(item, tree);

      if (isUndefined(res)) {
        return;
      }

      if (res.isIndefinite) {
        values = values.concat(res.value);
        paths = paths.concat(res.paths);
      } else {
        values.push(res.value);
        paths = paths.concat(res.paths);
      }
    });

    return { value: values, paths, isIndefinite: true };
  };

  private handleSubscript = (payload: ValuePath, tree: Subscript | null): ValuePath | undefined => {
    if (tree === null) {
      return payload;
    }

    const treeValue = tree.value;
    switch (treeValue.type) {
      case 'bracketExpression': {
        const result = this.handleBracketExpressionContent(payload, treeValue.value);
        return this.concatIndefiniteValuePaths(result, tree.next);
      }
      case 'bracketMember': {
        const result = this.handleBracketMemberContent(payload, treeValue.value);
        if (isUndefined(result)) {
          return;
        }
        return this.handleSubscript(result, tree.next);
      }
      case 'dot': {
        switch (treeValue.value.type) {
          case 'identifier': {
            const result = this.handleIdentifier(payload, treeValue.value);
            if (isUndefined(result)) {
              return;
            }
            return this.handleSubscript(result, tree.next);
          }
          case 'numericLiteral': {
            const result = this.handleNumericLiteral(payload, treeValue.value);
            if (isUndefined(result)) {
              return;
            }
            return this.handleSubscript(result, tree.next);
          }
          case 'wildcard': {
            const result = this.handleWildcard(payload);
            return this.concatIndefiniteValuePaths(result, tree.next);
          }
        }
      }
      case 'dotdot': {
        const result = this.handleDotdot(payload, treeValue);
        return this.concatIndefiniteValuePaths(result, tree.next);
      }
    }
  };

  public handleRoot = (tree: Root): ValuePath | undefined => {
    return this.handleSubscript(this.rootPayload, tree.next);
  };
}
