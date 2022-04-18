export type Root = {
  type: 'root';
  next: Subscript | null;
};

export type Current = {
  type: 'current';
  next: Subscript | null;
};

export type ValueObject = { type: 'value'; value: Record<string, Value>; subtype: 'object' };
export type ValueArray = { type: 'value'; value: string[] | number[]; subtype: 'array' };
export type ValueString = { type: 'value'; value: string; subtype: 'string' };
export type ValueBoolean = { type: 'value'; value: boolean; subtype: 'boolean' };
export type ValueNumber = { type: 'value'; value: number; subtype: 'number' };
export type ValueNull = { type: 'value'; value: null; subtype: 'null' };

export type Value = ValueString | ValueBoolean | ValueNumber | ValueNull | ValueArray | ValueObject;

export type Negate = {
  type: 'negate';
  value: ExpressionChild;
};

export type GroupExpression = {
  type: 'group_expression';
  value: ExpressionChild;
};

export type BinaryExpression = {
  type: 'binary_expression';
  operator: 'or' | 'and';
  left: ExpressionChild;
  right: ExpressionChild;
};

export type ArraySlice = {
  type: 'array_slice';
  start: number;
  end: number;
  step: number;
};

export type Comparator = {
  type: 'comparator';
  operator: 'eq' | 'ne' | 'lt' | 'le' | 'gt' | 'ge' | 'in' | 'nin';
  left: ComparatorArgument;
  right: ComparatorArgument;
};

export type StartFunction = (start: number) => ArraySlice;

export type SubscriptDot = {
  type: 'subscript';
  subtype: 'dot';
  value: Identifier;
  next: Subscript | null;
};

export type SubscriptDotdot = {
  type: 'subscript';
  subtype: 'dotdot';
  value: Identifier | Subscriptables;
  next: Subscript | null;
};

export type SubscriptBracket = {
  type: 'subscript';
  subtype: 'bracket';
  value: Subscriptables;
  next: Subscript | null;
};

export type Subscriptable =
  | Identifier
  | StringLiteral
  | NumericLiteral
  | FilterExpression
  | FilterSubscript
  | ArraySlice
  | ScriptExpression;

export type Subscript = SubscriptDot | SubscriptDotdot | SubscriptBracket;

export type FilterSubscript = {
  type: 'filter_subscript';
  value: ExpressionChild;
};

export type StringLiteral = {
  type: 'string_literal';
  value: string;
};

export type Identifier = {
  type: 'identifier';
  value: string;
};

export type NumericLiteral = {
  type: 'numeric_literal';
  value: number;
};

export type Subscriptables = {
  type: 'subscriptables';
  values: Subscriptable[];
};

export type FilterExpression = {
  type: 'filter_expression';
  value: ExpressionChild;
};

export type ScriptExpression = {
  type: 'script_expression';
  left: ExpressionChild;
  right: ExpressionChild;
};

export type ComparatorArgument = Current | Root | Value;

export type ExpressionChild = Comparator | GroupExpression | BinaryExpression | Negate | ComparatorArgument;

export type JsonPathItem =
  | Value
  | Root
  | Current
  | Negate
  | SubscriptDot
  | SubscriptDotdot
  | SubscriptBracket
  | Subscriptable
  | Subscriptables
  | FilterSubscript
  | ArraySlice
  | StringLiteral
  | Identifier
  | NumericLiteral
  | FilterExpression
  | ScriptExpression
  | GroupExpression
  | BinaryExpression
  | Comparator;

export type Node = unknown[] | Record<string, unknown> | StartFunction | JsonPathItem;
