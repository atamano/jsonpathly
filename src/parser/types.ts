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

export type NegateExpression = {
  type: 'negateExpression';
  value: FilterExpressionContent;
};

export type GroupExpression = {
  type: 'groupExpression';
  value: FilterExpressionContent;
};

export type LogicalExpression = {
  type: 'logicalExpression';
  operator: 'or' | 'and';
  left: FilterExpressionContent;
  right: FilterExpressionContent;
};

export type Slices = {
  type: 'slices';
  start: number | null;
  end: number | null;
  step: number | null;
};

export type Comparator = {
  type: 'comparator';
  operator:
    | 'eq'
    | 'ne'
    | 'lt'
    | 'le'
    | 'gt'
    | 'ge'
    | 'in'
    | 'nin'
    | 'subsetof'
    | 'anyof'
    | 'noneof'
    | 'size'
    | 'sizeof';
  left: Operation;
  right: Operation;
};

export type SubscriptDot = {
  type: 'subscript';
  subtype: 'dot';
  value: Identifier | NumericLiteral | Wildcard;
  next: Subscript | null;
};

export type SubscriptDotDot = {
  type: 'subscript';
  subtype: 'dotdot';
  value: Identifier | Wildcard | SubscriptBracket;
  next: Subscript | null;
};

export type SubscriptBracket = {
  type: 'subscript';
  subtype: 'bracket';
  value: Identifier | Wildcard | StringLiteral | NumericLiteral | FilterExpression | Slices | Unions | Indexes;
  next: Subscript | null;
};

export type Subscript = SubscriptDot | SubscriptDotDot | SubscriptBracket;

export type Wildcard = {
  type: 'wildcard';
};

export type StringLiteral = {
  type: 'stringLiteral';
  value: string;
};

export type Identifier = {
  type: 'identifier';
  value: string;
};

export type NumericLiteral = {
  type: 'numericLiteral';
  value: number;
};

export type Indexes = {
  type: 'indexes';
  values: NumericLiteral[];
};

export type Unions = {
  type: 'unions';
  values: StringLiteral[] | Identifier[];
};

export type FilterExpressionContent =
  | Comparator
  | GroupExpression
  | LogicalExpression
  | NegateExpression
  | Current
  | Root;

export type FilterExpression = {
  type: 'filterExpression';
  value: FilterExpressionContent;
};

export type OperationContent = Root | Current | Value | Operation;

export type Operation = {
  type: 'operation';
  operator: 'plus' | 'minus' | '';
  left: OperationContent;
  right: OperationContent;
};
