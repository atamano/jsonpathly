import { JSONPathSyntaxError } from '../parser/errors';
import {
  BracketExpressionContent,
  BracketMemberContent,
  Comparator,
  DotDot,
  FilterExpressionContent,
  FunctionCall,
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
import { isArray, isDefined, isEqual, isNumber, isPlainObject, isString, isUndefined } from './helper';

const getNumericLiteralIndex = (index: number, total: number): number => (index < 0 ? total + index : index);

// RFC 9535: Normalize slice index (negative indices count from end)
const normalizeSliceIndex = (index: number, len: number): number => (index < 0 ? len + index : index);

// RFC 9535 Normalized Path Format: Use single quotes with proper escaping
const formatStringLiteralPath = (paths: string | string[], v: string): string | string[] => {
  const escaped = v
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\x08/g, '\\b') // backspace
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (c) => '\\u00' + c.charCodeAt(0).toString(16).padStart(2, '0'));
  return paths.concat(`['${escaped}']`);
};

const formatNumericLiteralPath = (paths: string | string[], v: number): string | string[] => paths.concat(`[${v}]`);

// RFC 9485 I-Regexp validation - reject non-interoperable regex features
const isValidIRegexp = (pattern: string): boolean => {
  // Reject backreferences (\1, \2, etc.)
  if (/\\[1-9]/.test(pattern)) return false;
  // Reject lookahead/lookbehind ((?=, (?!, (?<=, (?<!)
  if (/\(\?[=!]/.test(pattern)) return false;
  if (/\(\?<[=!]/.test(pattern)) return false;
  // Reject named capture groups ((?<name>...)
  if (/\(\?<[a-zA-Z]/.test(pattern)) return false;
  // Reject word boundaries (\b, \B) - but not \b inside character class which means backspace
  // Simple check: \b or \B not preceded by [ (approximate check)
  if (/(?<!\[)\\[bB]/.test(pattern)) return false;
  return true;
};

type ValuePath<T extends unknown = unknown> = { value: T; paths: string | string[]; isIndefinite?: boolean };

export class Handler<T extends unknown = unknown> {
  rootPayload: ValuePath<T>;

  constructor(rootPayload: T) {
    this.rootPayload = { value: rootPayload, paths: '$' };
  }

  private handleIdentifier = (payload: ValuePath, tree: Identifier): ValuePath | undefined => {
    if (!isPlainObject(payload.value) || !(tree.value in payload.value)) {
      return;
    }

    return { value: payload.value[tree.value], paths: formatStringLiteralPath(payload.paths, tree.value) };
  };

  private handleWildcard = ({ value, paths }: ValuePath): ValuePath[] => {
    if (!isPlainObject(value) && !isArray(value)) {
      return [];
    }

    if (isArray(value)) {
      return value.map((item, index) => ({
        value: item,
        paths: formatNumericLiteralPath(paths, index),
      }));
    }

    return Object.keys(value).map((key) => ({ value: value[key], paths: formatStringLiteralPath(paths, key) }));
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
      case 'functionCall': {
        const result = this.handleFunctionCall(payload, tree);
        return { value: result, paths: payload.paths };
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
        // RFC 9535: Empty nodelists on both sides compare equal
        if (leftValue === undefined && rightValue === undefined) return true;
        return isEqual(leftValue, rightValue);
      }
      case 'ne': {
        return !isEqual(leftValue, rightValue);
      }
      case 'lt': {
        if (isNumber(leftValue) && isNumber(rightValue)) {
          return leftValue < rightValue;
        }
        if (isString(leftValue) && isString(rightValue)) {
          return leftValue < rightValue;
        }
        return false;
      }
      case 'le': {
        if (isNumber(leftValue) && isNumber(rightValue)) {
          return leftValue <= rightValue;
        }
        if (isString(leftValue) && isString(rightValue)) {
          return leftValue <= rightValue;
        }
        return false;
      }
      case 'gt': {
        if (isNumber(leftValue) && isNumber(rightValue)) {
          return leftValue > rightValue;
        }
        if (isString(leftValue) && isString(rightValue)) {
          return leftValue > rightValue;
        }
        return false;
      }
      case 'ge': {
        if (isNumber(leftValue) && isNumber(rightValue)) {
          return leftValue >= rightValue;
        }
        if (isString(leftValue) && isString(rightValue)) {
          return leftValue >= rightValue;
        }
        return false;
      }
      case 'in': {
        if (!isArray(rightValue)) {
          return false;
        }
        return rightValue.includes(leftValue);
      }
      case 'nin': {
        if (!isArray(rightValue)) {
          return false;
        }
        return !rightValue.includes(leftValue);
      }
      case 'reg': {
        if (!isString(leftValue) || !isString(rightValue)) {
          return false;
        }
        const value = rightValue.slice(1, -1);
        return !!leftValue.match(new RegExp(value, tree.right.opts));
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

  // RFC 9535 Function implementations
  private handleFunctionCall = (payload: ValuePath, tree: FunctionCall): unknown => {
    const args = tree.args.map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      }
      return this.handleOperationContent(payload, arg)?.value;
    });

    switch (tree.name) {
      case 'length': {
        // Returns length of string, array, or object (number of keys)
        const val = args[0];
        if (isString(val)) return val.length;
        if (isArray(val)) return val.length;
        if (isPlainObject(val)) return Object.keys(val).length;
        return undefined;
      }
      case 'count': {
        // Returns count of nodes in nodelist
        const val = args[0];
        if (isArray(val)) return val.length;
        return isDefined(val) ? 1 : 0;
      }
      case 'match': {
        // Full string match against regex (RFC 9485 I-Regexp)
        const val = args[0];
        const pattern = args[1];
        if (!isString(val) || !isString(pattern)) return false;
        if (!isValidIRegexp(pattern)) return false;
        try {
          const regex = new RegExp(`^(?:${pattern})$`, 'u');
          return regex.test(val);
        } catch {
          return false;
        }
      }
      case 'search': {
        // Substring match against regex (RFC 9485 I-Regexp)
        const val = args[0];
        const pattern = args[1];
        if (!isString(val) || !isString(pattern)) return false;
        if (!isValidIRegexp(pattern)) return false;
        try {
          const regex = new RegExp(pattern, 'u');
          return regex.test(val);
        } catch {
          return false;
        }
      }
      case 'value': {
        // Extract single value from nodelist, or Nothing if not exactly one
        const val = args[0];
        if (isArray(val) && val.length === 1) return val[0];
        if (!isArray(val) && isDefined(val)) return val;
        return undefined;
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
      case 'functionCall': {
        // Function calls in filter context return truthy/falsy
        const result = this.handleFunctionCall(payload, tree);
        return !!result;
      }
      case 'root': {
        const result = this.handleSubscript(this.rootPayload, tree.next);
        // For indefinite results (filters, wildcards), check if non-empty
        if (result?.isIndefinite) {
          return Array.isArray(result.value) && result.value.length > 0;
        }
        return isDefined(result);
      }
      case 'current': {
        const result = this.handleSubscript(payload, tree.next);
        // For indefinite results (filters, wildcards), check if non-empty
        if (result?.isIndefinite) {
          return Array.isArray(result.value) && result.value.length > 0;
        }
        return isDefined(result);
      }
      case 'value': {
        return !!tree.value;
      }
    }
  };

  private handleNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    // RFC 9535: Numeric index selectors in bracket notation only work on arrays
    if (!isArray(value)) {
      return;
    }

    const index = getNumericLiteralIndex(tree.value, value.length);

    if (index < value.length && index >= 0) {
      return { value: value[index], paths: formatNumericLiteralPath(paths, index) };
    }
    return;
  };

  // Dot notation with number ($.2) - works as property access on objects, index on arrays
  private handleDotNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (isArray(value)) {
      // For arrays, treat as index
      const index = getNumericLiteralIndex(tree.value, value.length);
      if (index < value.length && index >= 0) {
        return { value: value[index], paths: formatNumericLiteralPath(paths, index) };
      }
      return;
    }

    if (isPlainObject(value)) {
      // For objects, treat as property name
      const key = String(tree.value);
      if (key in value) {
        return { value: value[key], paths: formatStringLiteralPath(paths, key) };
      }
      return;
    }

    return;
  };

  private handleSlices = ({ value, paths }: ValuePath, tree: Slices): ValuePath[] => {
    const results: ValuePath[] = [];

    if (!isArray(value)) {
      return [];
    }

    const len = value.length;

    // RFC 9535 Section 2.3.4.2: Slice semantics
    // Step defaults to 1, step of 0 returns empty
    const step = tree.step ?? 1;
    if (step === 0) {
      return [];
    }

    // Normalize start (n) and end (m)
    // n = S if S >= 0, else len + S (with default based on step direction)
    // m = E if E >= 0, else len + E (with default based on step direction)
    let n: number;
    let m: number;

    if (step > 0) {
      n = tree.start !== null ? (tree.start >= 0 ? tree.start : len + tree.start) : 0;
      m = tree.end !== null ? (tree.end >= 0 ? tree.end : len + tree.end) : len;
    } else {
      n = tree.start !== null ? (tree.start >= 0 ? tree.start : len + tree.start) : len - 1;
      m = tree.end !== null ? (tree.end >= 0 ? tree.end : len + tree.end) : -len - 1;
    }

    // Compute lower and upper bounds
    let lower: number;
    let upper: number;

    if (step > 0) {
      lower = Math.max(n, 0);
      upper = Math.min(m, len);
    } else {
      lower = Math.min(n, len - 1);
      upper = Math.max(m, -1);
    }

    // Iterate
    let i = step > 0 ? lower : upper;
    while ((step > 0 && i < upper) || (step < 0 && i > lower)) {
      if (i >= 0 && i < len) {
        results.push({ value: value[i], paths: formatNumericLiteralPath(paths, i) });
      }
      i += step;
    }

    return results;
  };

  private handleStringLiteral = ({ value, paths }: ValuePath, tree: StringLiteral): ValuePath | undefined => {
    if (!isPlainObject(value) || !(tree.value in value)) {
      return;
    }

    return { value: value[tree.value], paths: formatStringLiteralPath(paths, tree.value) };
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
        const result = this.handleBracketMemberContent(payload, treeValue.value);
        if (isDefined(result)) {
          results = results.concat(result);
        }
        break;
      }
      case 'bracketExpression': {
        if (isPlainObject(value) || (isArray(value) && treeValue.value.type === 'wildcard')) {
          const result = this.handleBracketExpressionContent(payload, treeValue.value);
          results = results.concat(result);
        }
        break;
      }
      case 'wildcard': {
        const result = this.handleWildcard(payload);
        results = results.concat(result);
        break;
      }
      case 'identifier': {
        const result = this.handleIdentifier(payload, treeValue);
        if (isDefined(result)) {
          results = results.concat(result);
        }
        break;
      }
    }

    if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => {
        const result = this.handleDotdot(
          { value: value[key], paths: formatStringLiteralPath(payload.paths, key) },
          tree,
        );
        results = results.concat(result);
      });
    } else if (isArray(value)) {
      value.forEach((item, index) => {
        const result = this.handleDotdot({ value: item, paths: formatNumericLiteralPath(payload.paths, index) }, tree);
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
    const payloadValue = payload.value;

    switch (tree.type) {
      case 'filterExpression': {
        let results: ValuePath[] = [];

        // RFC 9535 Section 2.3.5.1: Filter selects children for which expression is TRUE
        if (isArray(payloadValue)) {
          payloadValue.forEach((value, index) => {
            const item = { value, paths: formatNumericLiteralPath(payload.paths, index) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              results = results.concat(item);
            }
          });
        } else if (isPlainObject(payloadValue)) {
          // For objects, iterate over values (children), not the root object
          Object.keys(payloadValue).forEach((key) => {
            const item = { value: payloadValue[key], paths: formatStringLiteralPath(payload.paths, key) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              results = results.concat(item);
            }
          });
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
      return payload.reduce<ValuePath<unknown[]>>(
        (acc, current) => ({
          isIndefinite: true,
          value: [...acc.value, current.value],
          paths: [...acc.paths, current.paths] as string[],
        }),
        { value: [], paths: [], isIndefinite: true },
      );
    }

    let values: unknown[] = [];
    let paths: string[] = [];

    payload.forEach((item) => {
      const result = this.handleSubscript(item, tree);

      if (isUndefined(result)) {
        return;
      }

      values = result.isIndefinite ? values.concat(result.value) : [...values, result.value];
      paths = paths.concat(result.paths);
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
            // Dot notation with number ($.2) should access property as string on objects
            // and work as array index on arrays
            const result = this.handleDotNumericLiteral(payload, treeValue.value);
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
