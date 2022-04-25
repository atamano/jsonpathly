export { query } from './handler/query';
export type { JSONPathOptions } from './handler/query';
export { JSONPathSyntaxError, JSONPathValidationError } from './parser/errors';
export { parse } from './parser/parse';
export { stringify } from './parser/stringify';
export type {
  Comparator,
  Current,
  FilterExpression,
  GroupExpression,
  Identifier,
  LogicalExpression,
  NegateExpression,
  NumericLiteral,
  Root,
  StringLiteral,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
  Value,
} from './parser/types';
