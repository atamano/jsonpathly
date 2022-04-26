export { query } from './handler/query';
export type { JSONPathOptions } from './handler/query';
export { JSONPathSyntaxError, JSONPathValidationError } from './parser/errors';
export { parse } from './parser/parse';
export { stringify } from './parser/stringify';
export type {
  Root,
  Current,
  ValueObject,
  ValueArray,
  ValueString,
  ValueBoolean,
  ValueNumber,
  ValueNull,
  Value,
  NotExpression,
  GroupExpression,
  GroupOperation,
  LogicalExpression,
  Slices,
  Comparator,
  SubscriptDotContent,
  SubscriptDot,
  SubscriptDotDotContent,
  SubscriptDotDot,
  SubscriptBracketContent,
  SubscriptBracket,
  Subscript,
  Wildcard,
  StringLiteral,
  Identifier,
  NumericLiteral,
  Indexes,
  Unions,
  FilterExpressionContent,
  FilterExpression,
  OperationContent,
  Operation,
} from './parser/types';
