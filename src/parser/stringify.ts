/**
 * JSONPath AST to string serialization.
 *
 * Converts parsed JSONPath AST back to string representation.
 * Uses RFC 9535 normalized format with single quotes.
 */
import { Comparator, JsonPathElement, LogicalExpression, Operation } from './types';

// ============================================
// Operator Mappings
// ============================================

const COMPARATOR_OPERATORS: Record<Comparator['operator'], string> = {
  eq: '==',
  ne: '!=',
  lt: '<',
  le: '<=',
  gt: '>',
  ge: '>=',
  in: 'in',
  reg: '=~',
  nin: 'nin',
  subsetof: 'subsetof',
  anyof: 'anyof',
  noneof: 'noneof',
  empty: 'empty',
  sizeof: 'sizeof',
  size: 'size',
};

const ARITHMETIC_OPERATORS: Record<Operation['operator'], string> = {
  plus: '+',
  minus: '-',
  multi: '*',
  div: '/',
};

const LOGICAL_OPERATORS: Record<LogicalExpression['operator'], string> = {
  and: '&&',
  or: '||',
};

// ============================================
// String Escaping Utilities
// ============================================

/**
 * Escape string for single-quoted output per RFC 9535.
 * Escapes backslashes and single quotes.
 */
const escapeForSingleQuote = (str: string): string => str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/**
 * Format string as single-quoted literal.
 */
const singleQuoted = (str: string): string => `'${escapeForSingleQuote(str)}'`;

/**
 * Recursively stringify a JSON value with single quotes for strings.
 * Used for object and array values in filter expressions.
 */
const stringifyJsonValue = (value: unknown): string => {
  if (typeof value === 'string') {
    return singleQuoted(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map(stringifyJsonValue).join(',')}]`;
  }
  if (value !== null && typeof value === 'object') {
    const pairs = Object.entries(value).map(([k, v]) => `${singleQuoted(k)}:${stringifyJsonValue(v)}`);
    return `{${pairs.join(',')}}`;
  }
  return JSON.stringify(value);
};

// ============================================
// Main Stringify Function
// ============================================

/**
 * Convert JSONPath AST element to string representation.
 *
 * @param input - AST element to stringify
 * @returns String representation of the JSONPath
 */
export function stringify(input: JsonPathElement | null): string {
  if (input === null) {
    return '';
  }

  switch (input.type) {
    case 'root':
      return '$' + stringify(input.next);

    case 'current':
      return '@' + stringify(input.next);

    case 'dot':
      return '.' + stringify(input.value);

    case 'dotdot':
      return '..' + stringify(input.value);

    case 'bracketExpression':
    case 'bracketMember':
      return '[' + stringify(input.value) + ']';

    case 'subscript':
      return stringify(input.value) + stringify(input.next);

    case 'identifier':
      return input.value;

    case 'wildcard':
      return '*';

    case 'indexes':
      return input.values.map(stringify).join(', ');

    case 'unions':
      return input.values.map(stringify).join(', ');

    case 'stringLiteral':
      return singleQuoted(input.value);

    case 'numericLiteral':
      return String(input.value);

    case 'notExpression':
      return '!(' + stringify(input.value) + ')';

    case 'value':
      return stringifyValue(input);

    case 'filterExpression':
      return '?(' + stringify(input.value) + ')';

    case 'groupOperation':
    case 'groupExpression':
      return '(' + stringify(input.value) + ')';

    case 'operation':
      return stringify(input.left) + ' ' + ARITHMETIC_OPERATORS[input.operator] + ' ' + stringify(input.right);

    case 'comparator':
      return stringify(input.left) + ` ${COMPARATOR_OPERATORS[input.operator]} ` + stringify(input.right);

    case 'logicalExpression':
      return stringify(input.left) + ` ${LOGICAL_OPERATORS[input.operator]} ` + stringify(input.right);

    case 'slices':
      return stringifySlice(input);

    case 'functionCall':
      return stringifyFunctionCall(input);

    /* c8 ignore next */
    default: {
      const _exhaustive: never = input;
      throw new Error(`Unknown AST node type: ${(_exhaustive as JsonPathElement).type}`);
    }
  }
}

// ============================================
// Helper Functions
// ============================================

/**
 * Stringify a value node based on its subtype.
 */
function stringifyValue(input: Extract<JsonPathElement, { type: 'value' }>): string {
  switch (input.subtype) {
    case 'regex':
      return `${input.value}${input.opts}`;

    case 'string':
      return singleQuoted(input.value as string);

    case 'object':
      return stringifyJsonValue(input.value);

    case 'array':
      return stringifyJsonValue(input.value);

    case 'boolean':
    case 'number':
    case 'null':
      return JSON.stringify(input.value);

    /* c8 ignore next */
    default: {
      const _exhaustive: never = input;
      throw new Error(`Unknown value subtype: ${(_exhaustive as { subtype: string }).subtype}`);
    }
  }
}

/**
 * Stringify a slice expression.
 */
function stringifySlice(input: Extract<JsonPathElement, { type: 'slices' }>): string {
  const start = input.start !== null ? String(input.start) : '';
  const end = input.end !== null ? String(input.end) : '';
  const step = input.step !== null ? ':' + input.step : '';
  return `${start}:${end}${step}`;
}

/**
 * Stringify a function call.
 */
function stringifyFunctionCall(input: Extract<JsonPathElement, { type: 'functionCall' }>): string {
  const args = input.args.map((arg) => stringify(arg as JsonPathElement)).join(', ');
  return `${input.name}(${args})`;
}
