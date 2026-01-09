/**
 * JSONPath Query Handler
 *
 * Core engine that traverses JSON documents using parsed JSONPath AST.
 * Implements RFC 9535 semantics with jsonpathly extensions.
 */
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
import { comparators, isEmpty, matchRegex } from './comparators';
import { rfc9535Functions } from './functions';
import { isArray, isDefined, isNumber, isPlainObject, isUndefined } from './helper';

// ============================================
// Path Formatting Utilities
// ============================================

/**
 * RFC 9535 Normalized Path Format: Use single quotes with proper escaping.
 * Escapes: \' (single quote), \\ (backslash), \b \f \n \r \t (control chars)
 */
const formatStringLiteralPath = (paths: string | string[], v: string): string | string[] => {
  const escaped = v
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\x08/g, '\\b')
    .replace(/\f/g, '\\f')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\x00-\x07\x0b\x0e-\x1f]/g, (c) => '\\u00' + c.charCodeAt(0).toString(16).padStart(2, '0'));
  return paths.concat(`['${escaped}']`);
};

/** Format numeric index for path output */
const formatNumericLiteralPath = (paths: string | string[], v: number): string | string[] => paths.concat(`[${v}]`);

// ============================================
// Index Utilities
// ============================================

/** Normalize array index (negative indices count from end) */
const normalizeArrayIndex = (index: number, length: number): number => (index < 0 ? length + index : index);

/**
 * Check if array index is valid and get element.
 * Returns { exists: true, value, index } if valid, { exists: false } otherwise.
 * This properly handles elements with undefined values.
 */
const getArrayElement = <T>(
  arr: T[],
  index: number
): { exists: true; value: T; index: number } | { exists: false } => {
  const normalized = normalizeArrayIndex(index, arr.length);
  if (normalized >= 0 && normalized < arr.length) {
    return { exists: true, value: arr[normalized], index: normalized };
  }
  return { exists: false };
};

// ============================================
// ValuePath Type
// ============================================

type ValuePath<T extends unknown = unknown> = {
  value: T;
  paths: string | string[];
  isIndefinite?: boolean;
};

// ============================================
// Handler Class
// ============================================

export class Handler<T extends unknown = unknown> {
  rootPayload: ValuePath<T>;

  constructor(rootPayload: T) {
    this.rootPayload = { value: rootPayload, paths: '$' };
  }

  // ============================================
  // Property Access Handlers
  // ============================================

  private handleIdentifier = (payload: ValuePath, tree: Identifier): ValuePath | undefined => {
    if (!isPlainObject(payload.value) || !(tree.value in payload.value)) {
      return;
    }
    return { value: payload.value[tree.value], paths: formatStringLiteralPath(payload.paths, tree.value) };
  };

  private handleStringLiteral = ({ value, paths }: ValuePath, tree: StringLiteral): ValuePath | undefined => {
    if (!isPlainObject(value) || !(tree.value in value)) {
      return;
    }
    return { value: value[tree.value], paths: formatStringLiteralPath(paths, tree.value) };
  };

  private handleWildcard = ({ value, paths }: ValuePath): ValuePath[] => {
    if (isArray(value)) {
      return value.map((item, index) => ({
        value: item,
        paths: formatNumericLiteralPath(paths, index),
      }));
    }
    if (isPlainObject(value)) {
      return Object.keys(value).map((key) => ({
        value: value[key],
        paths: formatStringLiteralPath(paths, key),
      }));
    }
    return [];
  };

  // ============================================
  // Numeric Index Handlers
  // ============================================

  /** Bracket notation numeric index - RFC 9535: only works on arrays */
  private handleNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (!isArray(value)) {
      return;
    }
    const result = getArrayElement(value, tree.value);
    if (result.exists) {
      return { value: result.value, paths: formatNumericLiteralPath(paths, result.index) };
    }
    return;
  };

  /** Dot notation numeric ($.2) - works as property access on objects, index on arrays */
  private handleDotNumericLiteral = ({ value, paths }: ValuePath, tree: NumericLiteral): ValuePath | undefined => {
    if (isArray(value)) {
      const result = getArrayElement(value, tree.value);
      if (result.exists) {
        return { value: result.value, paths: formatNumericLiteralPath(paths, result.index) };
      }
      return;
    }
    if (isPlainObject(value)) {
      const key = String(tree.value);
      if (key in value) {
        return { value: value[key], paths: formatStringLiteralPath(paths, key) };
      }
      return;
    }
    return;
  };

  // ============================================
  // Slice Handler
  // ============================================

  /** RFC 9535 Section 2.3.4.2: Array slice semantics */
  private handleSlices = ({ value, paths }: ValuePath, tree: Slices): ValuePath[] => {
    if (!isArray(value)) {
      return [];
    }

    const len = value.length;
    const step = tree.step ?? 1;

    // Step of 0 returns empty per RFC 9535
    if (step === 0) {
      return [];
    }

    // Normalize start (n) and end (m) based on step direction
    let n: number;
    let m: number;

    if (step > 0) {
      n = tree.start !== null ? normalizeArrayIndex(tree.start, len) : 0;
      m = tree.end !== null ? normalizeArrayIndex(tree.end, len) : len;
    } else {
      n = tree.start !== null ? normalizeArrayIndex(tree.start, len) : len - 1;
      m = tree.end !== null ? normalizeArrayIndex(tree.end, len) : -len - 1;
    }

    // Compute bounds per RFC 9535 Section 2.3.4.2
    let lower: number;
    let upper: number;

    if (step > 0) {
      lower = Math.max(n, 0);
      upper = Math.min(m, len);
    } else {
      // For negative step: upper = min(start, len-1), lower = max(end, -1)
      upper = Math.min(n, len - 1);
      lower = Math.max(m, -1);
    }

    // Iterate and collect results
    const results: ValuePath[] = [];
    let i = step > 0 ? lower : upper;

    while ((step > 0 && i < upper) || (step < 0 && i > lower)) {
      results.push({ value: value[i], paths: formatNumericLiteralPath(paths, i) });
      i += step;
    }

    return results;
  };

  // ============================================
  // Union and Index Handlers
  // ============================================

  private handleUnions = (payload: ValuePath, tree: Unions): ValuePath[] => {
    if (!isPlainObject(payload.value)) {
      return [];
    }
    return tree.values
      .map((value) => {
        switch (value.type) {
          case 'identifier':
            return this.handleIdentifier(payload, value);
          case 'stringLiteral':
            return this.handleStringLiteral(payload, value);
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

  // ============================================
  // Recursive Descent Handler
  // ============================================

  private handleDotdot = (payload: ValuePath, tree: DotDot): ValuePath[] => {
    const treeValue = tree.value;
    const value = payload.value;
    let results: ValuePath[] = [];

    // Match at current level
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
        results = results.concat(this.handleWildcard(payload));
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

    // Recurse into children
    if (isPlainObject(value)) {
      for (const key of Object.keys(value)) {
        const childPayload = { value: value[key], paths: formatStringLiteralPath(payload.paths, key) };
        results = results.concat(this.handleDotdot(childPayload, tree));
      }
    } else if (isArray(value)) {
      value.forEach((item, index) => {
        const childPayload = { value: item, paths: formatNumericLiteralPath(payload.paths, index) };
        results = results.concat(this.handleDotdot(childPayload, tree));
      });
    }

    return results;
  };

  // ============================================
  // Operation Handlers (Arithmetic)
  // ============================================

  private handleOperationContent = (payload: ValuePath, tree: OperationContent): ValuePath | undefined => {
    switch (tree.type) {
      case 'root':
        return this.handleSubscript(this.rootPayload, tree.next);
      case 'current':
        return this.handleSubscript(payload, tree.next);
      case 'value':
        return { value: tree.value, paths: payload.paths };
      case 'groupOperation':
        return this.handleOperationContent(payload, tree.value);
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
          case 'plus':
            return { value: left + right, paths: payload.paths };
          case 'minus':
            return { value: left - right, paths: payload.paths };
          case 'div':
            return right === 0 ? undefined : { value: left / right, paths: payload.paths };
          case 'multi':
            return { value: left * right, paths: payload.paths };
        }
      }
    }
  };

  // ============================================
  // Comparator Handler
  // ============================================

  private handleComparator = (payload: ValuePath, tree: Comparator): boolean => {
    const leftValue = this.handleOperationContent(payload, tree.left)?.value;

    // Handle unary 'empty' operator
    if (tree.operator === 'empty') {
      return isEmpty(leftValue);
    }

    // Handle regex operator (different signature)
    if (tree.operator === 'reg') {
      return matchRegex(leftValue, tree.right.value, tree.right.opts);
    }

    // Handle standard binary comparators
    const rightValue = this.handleOperationContent(payload, tree.right)?.value;
    const comparatorFn = comparators[tree.operator];

    if (comparatorFn) {
      return comparatorFn(leftValue, rightValue);
    }
    /* c8 ignore next */
    return false;
  };

  // ============================================
  // Logical Expression Handler
  // ============================================

  private handleLogicalExpression = (payload: ValuePath, tree: LogicalExpression): boolean => {
    const leftValue = this.handleFilterExpressionContent(payload, tree.left);
    const rightValue = this.handleFilterExpressionContent(payload, tree.right);

    switch (tree.operator) {
      case 'and':
        return leftValue && rightValue;
      case 'or':
        return leftValue || rightValue;
    }
  };

  // ============================================
  // Function Call Handler
  // ============================================

  private handleFunctionCall = (payload: ValuePath, tree: FunctionCall): unknown => {
    const args = tree.args.map((arg) => this.handleOperationContent(payload, arg)?.value);
    const fn = rfc9535Functions[tree.name];
    return fn ? fn(args) : undefined;
  };

  // ============================================
  // Filter Expression Handler
  // ============================================

  private handleFilterExpressionContent = (payload: ValuePath, tree: FilterExpressionContent): boolean => {
    switch (tree.type) {
      case 'logicalExpression':
        return this.handleLogicalExpression(payload, tree);
      case 'comparator':
        return this.handleComparator(payload, tree);
      case 'groupExpression':
        return this.handleFilterExpressionContent(payload, tree.value);
      case 'notExpression':
        return !this.handleFilterExpressionContent(payload, tree.value);
      case 'functionCall':
        return !!this.handleFunctionCall(payload, tree);
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
      case 'value':
        return !!tree.value;
    }
  };

  // ============================================
  // Bracket Content Handlers
  // ============================================

  private handleBracketMemberContent = (payload: ValuePath, tree: BracketMemberContent): ValuePath | undefined => {
    switch (tree.type) {
      case 'identifier':
        return this.handleIdentifier(payload, tree);
      case 'numericLiteral':
        return this.handleNumericLiteral(payload, tree);
      case 'stringLiteral':
        return this.handleStringLiteral(payload, tree);
    }
  };

  private handleBracketExpressionContent = (payload: ValuePath, tree: BracketExpressionContent): ValuePath[] => {
    const payloadValue = payload.value;

    switch (tree.type) {
      case 'filterExpression': {
        const results: ValuePath[] = [];

        // RFC 9535 Section 2.3.5.1: Filter selects children for which expression is TRUE
        if (isArray(payloadValue)) {
          payloadValue.forEach((value, index) => {
            const item = { value, paths: formatNumericLiteralPath(payload.paths, index) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              results.push(item);
            }
          });
        } else if (isPlainObject(payloadValue)) {
          // For objects, iterate over values (children), not the root object
          for (const key of Object.keys(payloadValue)) {
            const item = { value: payloadValue[key], paths: formatStringLiteralPath(payload.paths, key) };
            if (this.handleFilterExpressionContent(item, tree.value)) {
              results.push(item);
            }
          }
        }

        return results;
      }
      case 'indexes':
        return this.handleIndexes(payload, tree);
      case 'unions':
        return this.handleUnions(payload, tree);
      case 'wildcard':
        return this.handleWildcard(payload);
      case 'slices':
        return this.handleSlices(payload, tree);
    }
  };

  // ============================================
  // Result Aggregation
  // ============================================

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

    for (const item of payload) {
      const result = this.handleSubscript(item, tree);
      if (isUndefined(result)) {
        continue;
      }
      values = result.isIndefinite ? values.concat(result.value) : [...values, result.value];
      paths = paths.concat(result.paths);
    }

    return { value: values, paths, isIndefinite: true };
  };

  // ============================================
  // Main Subscript Handler
  // ============================================

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
        /* c8 ignore start */
        return;
      }
      /* c8 ignore stop */
      case 'dotdot': {
        const result = this.handleDotdot(payload, treeValue);
        return this.concatIndefiniteValuePaths(result, tree.next);
      }
    }
  };

  // ============================================
  // Public Entry Point
  // ============================================

  public handleRoot = (tree: Root): ValuePath | undefined => {
    return this.handleSubscript(this.rootPayload, tree.next);
  };
}
