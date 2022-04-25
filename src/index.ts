export { query } from './handler/query';
export type { JSONPathOptions } from './handler/query';
export { JSONPathSyntaxError, JSONPathValidationError } from './parser/errors';
export { parse } from './parser/parse';
export { stringify } from './parser/stringify';
export type {
  ArraySlice,
  Comparator,
  Current,
  FilterExpression,
  GroupExpression,
  Identifier,
  JsonPathItem,
  LogicalExpression,
  NegateExpression,
  NumericLiteral,
  Root,
  StringLiteral,
  Subscriptable,
  Subscriptables,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
  Value,
} from './parser/types';
