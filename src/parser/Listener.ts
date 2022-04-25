/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RuleContext } from 'antlr4ts/RuleContext';
import { default as isPlainObjet } from 'lodash.isplainobject';
import { JSONPathValidationError } from './errors';
import { JSONPathListener } from './generated/JSONPathListener';
import {
  ArrayContext,
  BracketContentContext,
  DotContentContext,
  DotdotContentContext,
  ExpressionContext,
  FilterargContext,
  FilterExpressionContext,
  FilterpathContext,
  IndexesContext,
  JsonpathContext,
  JSONPathParser,
  ObjContext,
  SlicesContext,
  SubscriptContext,
  UnionsContext,
  ValueContext,
} from './generated/JSONPathParser';
import {
  FilterExpression,
  Identifier,
  Indexes,
  NumericLiteral,
  Operation,
  Root,
  Slices,
  StringLiteral,
  Subscript,
  SubscriptBracket,
  SubscriptDot,
  SubscriptDotDot,
  Unions,
  Value,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StackType = any;

const TYPE_CHECK_MAPPER = {
  simpleObject: (node: StackType): node is Record<string, unknown> => isPlainObjet(node),
  simpleArray: (node: StackType): node is unknown[] => Array.isArray(node),
  root: (node: StackType): node is Root => 'type' in node && node.type === 'root',
  value: (node: StackType): node is Value => 'type' in node && node.type === 'value',
  operation: (node: StackType): node is Operation =>
    'type' in node && typeof node.type === 'string' && ['value', 'current', 'root', 'operation'].includes(node.type),
  subscript: (node: StackType): node is Subscript => 'type' in node && node.type === 'subscript',
  unions: (node: StackType): node is Unions => 'type' in node && node.type === 'unions',
  indexes: (node: StackType): node is Indexes => 'type' in node && node.type === 'indexes',
  slices: (node: StackType): node is Slices => 'type' in node && node.type === 'slices',
  filterExpression: (node: StackType): node is FilterExpression => 'type' in node && node.type === 'filterExpression',
  dotContent: (node: StackType): node is SubscriptDot['value'] =>
    'type' in node && ['identifier', 'numericLiteral', 'wildcard'].includes(node.type),
  dotdotContent: (node: StackType): node is SubscriptDotDot['value'] =>
    'type' in node && ['identifier', 'wildcard', 'subscript'].includes(node.type),
  bracketContent: (node: StackType): node is SubscriptBracket['value'] =>
    'type' in node &&
    [
      'identifier',
      'wildcard',
      'numericLiteral',
      'stringLiteral',
      'filterExpression',
      'slices',
      'unions',
      'indexes',
    ].includes(node.type),
  expressionContent: (node: StackType): node is FilterExpression['value'] =>
    'type' in node &&
    ['comparator', 'groupExpression', 'logicalExpression', 'negateExpression', 'current', 'root'].includes(node.type),
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeGardReturn<K> = K extends (a: any) => a is infer T ? T : never;

export default class Listener implements JSONPathListener {
  _stack: StackType[] = [];
  _isIndefinite = false;

  public getTree(): Root | undefined {
    return this.popWithCheck('root', null);
  }

  public isIndefinite(): boolean {
    return this._isIndefinite;
  }

  private setIsIndefinite(b: boolean): void {
    this._isIndefinite = b;
  }

  private popWithCheck<T extends keyof typeof TYPE_CHECK_MAPPER>(
    key: T,
    ctx: RuleContext | null,
  ): TypeGardReturn<typeof TYPE_CHECK_MAPPER[T]> {
    const value = this._stack.pop();

    if (typeof value !== 'undefined' && TYPE_CHECK_MAPPER[key](value)) {
      return value as TypeGardReturn<typeof TYPE_CHECK_MAPPER[T]>;
    }

    throw new JSONPathValidationError(`bad type returned for ${key}`, ctx);
  }

  private push(node: StackType): void {
    this._stack.push(node);
  }

  public exitJsonpath(ctx: JsonpathContext): void {
    if (ctx.ROOT_VALUE()) {
      const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

      this.push({ type: 'root', next });
    }
  }

  public exitBracketContent(ctx: BracketContentContext): void {
    switch (true) {
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.WILDCARD(): {
        this.push({ type: 'wildcard' });
        break;
      }
      case !!ctx.unions(): {
        const value = this.popWithCheck('unions', ctx);

        this.push(value);
        break;
      }
      case !!ctx.indexes(): {
        const value = this.popWithCheck('indexes', ctx);

        this.push(value);
        break;
      }
      case !!ctx.slices(): {
        const value = this.popWithCheck('slices', ctx);

        this.push(value);
        break;
      }
      case !!ctx.STRING(): {
        const value = ctx.STRING()!.text.slice(1, -1);

        this.push({ type: 'stringLiteral', value });
        break;
      }
      case !!ctx.NUMBER(): {
        const number = Number.parseInt(ctx.NUMBER()!.text);

        this.push({
          type: 'numericLiteral',
          value: number,
        });
        break;
      }
      case !!ctx.filterExpression(): {
        const value = this.popWithCheck('filterExpression', ctx);

        this.push(value);
        break;
      }
    }
  }

  public exitDotdotContent(ctx: DotdotContentContext): void {
    this.setIsIndefinite(true);

    switch (true) {
      case !!ctx.WILDCARD(): {
        this.push({ type: 'wildcard' });
        break;
      }
      case !!ctx.IDENTIFIER(): {
        const value = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value });
        break;
      }
      case !!ctx.bracket(): {
        const value = this.popWithCheck('bracketContent', ctx);

        this.push({
          type: 'subscript',
          subtype: 'bracket',
          next: null,
          value,
        });
        break;
      }
    }
  }

  public exitDotContent(ctx: DotContentContext): void {
    switch (true) {
      case !!ctx.WILDCARD(): {
        this.push({ type: 'wildcard' });
        break;
      }
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.NUMBER(): {
        const number = Number.parseInt(ctx.NUMBER()!.text);

        this.push({
          type: 'numericLiteral',
          value: number,
        });
        break;
      }
    }
  }

  public exitSubscript(ctx: SubscriptContext): void {
    switch (true) {
      case !!ctx.DOT(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const value = this.popWithCheck('dotContent', ctx);

        this.push({
          type: 'subscript',
          subtype: 'dot',
          next,
          value,
        });
        break;
      }
      case !!ctx.DOTDOT(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const value = this.popWithCheck('dotdotContent', ctx);

        this.push({
          type: 'subscript',
          subtype: 'dotdot',
          value,
          next,
        });
        break;
      }
      case !!ctx.bracket(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const value = this.popWithCheck('bracketContent', ctx);

        this.push({
          type: 'subscript',
          subtype: 'bracket',
          next,
          value,
        });
        break;
      }
    }
  }

  public exitFilterpath(ctx: FilterpathContext): void {
    switch (true) {
      case !!ctx.ROOT_VALUE(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        this.push({ type: 'root', next: next });
        break;
      }
      case !!ctx.CURRENT_VALUE(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        this.push({ type: 'current', next: next });
        break;
      }
      default: {
        throw new JSONPathValidationError('bad filter path', ctx);
      }
    }
  }

  public exitUnions(ctx: UnionsContext): void {
    const nodes: (StringLiteral | Identifier)[] = [];

    this.setIsIndefinite(true);

    for (let index = 0; index < ctx.IDENTIFIER().length; index += 1) {
      const value = ctx.IDENTIFIER(index)!.text;

      nodes.push({
        type: 'identifier',
        value,
      });
    }

    for (let index = 0; index < ctx.STRING().length; index += 1) {
      const value = ctx.STRING(index)!.text.slice(1, -1);

      nodes.push({
        type: 'stringLiteral',
        value,
      });
    }

    this.push({
      type: 'unions',
      values: nodes,
    });
  }

  public exitIndexes(ctx: IndexesContext): void {
    const nodes: NumericLiteral[] = [];

    this.setIsIndefinite(true);

    for (let index = 0; index < ctx.NUMBER().length; index += 1) {
      const number = Number.parseInt(ctx.NUMBER(index)!.text);

      nodes.push({
        type: 'numericLiteral',
        value: number,
      });
    }

    this.push({
      type: 'indexes',
      values: nodes,
    });
  }

  public exitSlices(ctx: SlicesContext): void {
    let start: number | null = null;
    let end: number | null = null;
    let step: number | null = null;

    const number0 = ctx.tryGetToken(JSONPathParser.NUMBER, 0);
    const number1 = ctx.tryGetToken(JSONPathParser.NUMBER, 1);
    const number2 = ctx.tryGetToken(JSONPathParser.NUMBER, 2);

    const colon0 = ctx.tryGetToken(JSONPathParser.COLON, 0);
    const colon1 = ctx.tryGetToken(JSONPathParser.COLON, 1);

    if (colon1 && number2) {
      step = Number.parseInt(ctx.NUMBER(2).text);
    } else if (colon1 && number1 && number1.sourceInterval.a > colon1.sourceInterval.a) {
      step = Number.parseInt(ctx.NUMBER(1).text);
    } else if (colon1 && number0 && number0.sourceInterval.a > colon1.sourceInterval.a) {
      step = Number.parseInt(ctx.NUMBER(0).text);
    }

    if (!colon1 && colon0 && number1 && number1.sourceInterval.a > colon0.sourceInterval.a) {
      end = Number.parseInt(ctx.NUMBER(1).text);
    } else if (!colon1 && colon0 && !number1 && number0 && number0.sourceInterval.a > colon0.sourceInterval.a) {
      end = Number.parseInt(ctx.NUMBER(0).text);
    } else if (colon1 && colon0 && number1 && number1.sourceInterval.a < colon1.sourceInterval.a) {
      end = Number.parseInt(ctx.NUMBER(1).text);
    } else if (
      colon1 &&
      colon0 &&
      number0 &&
      number0.sourceInterval.a > colon0.sourceInterval.a &&
      number0.sourceInterval.a < colon1.sourceInterval.a
    ) {
      end = Number.parseInt(ctx.NUMBER(0).text);
    }

    if (!colon0 && number0) {
      start = Number.parseInt(ctx.NUMBER(0).text);
    } else if (colon0 && number0 && number0.sourceInterval.a < colon0.sourceInterval.a) {
      start = Number.parseInt(ctx.NUMBER(0).text);
    }

    this.push({ type: 'slices', start, end, step });
  }

  public exitFilterExpression(ctx: FilterExpressionContext): void {
    const value = this.popWithCheck('expressionContent', ctx);

    this.setIsIndefinite(true);

    this.push({
      type: 'filterExpression',
      value,
    });
  }

  public exitExpression(ctx: ExpressionContext): void {
    switch (true) {
      case !!ctx.NOT(): {
        const value = this.popWithCheck('expressionContent', ctx);

        this.push({
          type: 'negateExpression',
          value,
        });
        break;
      }
      case !!ctx.AND(): {
        const right = this.popWithCheck('expressionContent', ctx);
        const left = this.popWithCheck('expressionContent', ctx);

        this.push({ type: 'logicalExpression', operator: 'and', left, right });
        break;
      }
      case !!ctx.OR(): {
        const right = this.popWithCheck('expressionContent', ctx);
        const left = this.popWithCheck('expressionContent', ctx);

        this.push({ type: 'logicalExpression', operator: 'or', left, right });
        break;
      }
      case !!ctx.PAREN_LEFT(): {
        const value = this.popWithCheck('expressionContent', ctx);

        this.push({ type: 'groupExpression', value });
        break;
      }
      case !!ctx.tryGetRuleContext(1, FilterargContext): {
        const right = this.popWithCheck('operation', ctx);
        const left = this.popWithCheck('operation', ctx);

        switch (true) {
          case !!ctx.EQ(): {
            this.push({ type: 'comparator', operator: 'eq', left, right });
            break;
          }
          case !!ctx.NE(): {
            this.push({ type: 'comparator', operator: 'ne', left, right });
            break;
          }
          case !!ctx.LT(): {
            this.push({ type: 'comparator', operator: 'lt', left, right });
            break;
          }
          case !!ctx.LE(): {
            this.push({ type: 'comparator', operator: 'le', left, right });
            break;
          }
          case !!ctx.GT(): {
            this.push({ type: 'comparator', operator: 'gt', left, right });
            break;
          }
          case !!ctx.GE(): {
            this.push({ type: 'comparator', operator: 'ge', left, right });
            break;
          }
          case !!ctx.IN(): {
            this.push({ type: 'comparator', operator: 'in', left, right });
            break;
          }
          case !!ctx.NIN(): {
            this.push({ type: 'comparator', operator: 'nin', left, right });
            break;
          }
          case !!ctx.SUB(): {
            this.push({ type: 'comparator', operator: 'subsetof', left, right });
            break;
          }
          case !!ctx.ANY(): {
            this.push({ type: 'comparator', operator: 'anyof', left, right });
            break;
          }
          case !!ctx.NON(): {
            this.push({ type: 'comparator', operator: 'noneof', left, right });
            break;
          }
          case !!ctx.SIZ(): {
            this.push({ type: 'comparator', operator: 'size', left, right });
            break;
          }
          case !!ctx.SIZO(): {
            this.push({ type: 'comparator', operator: 'sizeof', left, right });
            break;
          }
        }
        break;
      }
    }
  }

  public exitObj(ctx: ObjContext): void {
    const obj: Record<string, unknown> = {};

    for (const pairCtx of ctx.pair()) {
      const value = this.popWithCheck('value', ctx);
      const key = pairCtx.STRING().text.slice(1, -1);

      obj[key] = value.value;
    }

    this.push(obj);
  }

  public exitArray(ctx: ArrayContext): void {
    const array: unknown[] = [];

    for (let index = 0; index < ctx.value().length; index += 1) {
      const value = this.popWithCheck('value', ctx);

      array.unshift(value.value);
    }

    this.push(array);
  }

  public exitFilterarg(ctx: FilterargContext): void {
    switch (true) {
      case !!ctx.tryGetRuleContext(1, FilterargContext): {
        switch (true) {
          case !!ctx.PLUS(): {
            const right = this.popWithCheck('operation', ctx);
            const left = this.popWithCheck('operation', ctx);
            this.push({ type: 'operation', operator: 'plus', left, right });
            break;
          }
          case !!ctx.MINUS(): {
            const right = this.popWithCheck('operation', ctx);
            const left = this.popWithCheck('operation', ctx);
            this.push({ type: 'operation', operator: 'minus', left, right });
            break;
          }
          default: {
            // no operator occures when right value is negative, it should be validated at runtime
            const right = this.popWithCheck('operation', ctx);
            const left = this.popWithCheck('operation', ctx);

            this.push({ type: 'operation', operator: '', left, right });
            break;
          }
        }
      }
      case !!ctx.value: {
        const left = this.popWithCheck('operation', ctx);
        this.push(left);
        break;
      }
      case !!ctx.filterpath: {
        const left = this.popWithCheck('operation', ctx);
        this.push(left);
        break;
      }
    }
  }

  public exitValue(ctx: ValueContext): void {
    switch (true) {
      case !!ctx.STRING(): {
        const text = ctx.STRING()!.text.slice(1, -1);

        this.push({ type: 'value', subtype: 'string', value: text });
        break;
      }
      case !!ctx.NUMBER(): {
        const text = ctx.NUMBER()!.text;

        if (text !== `${Number.parseInt(text)}`) {
          this.push({ type: 'value', subtype: 'number', value: Number.parseFloat(text) });
        } else {
          this.push({ type: 'value', subtype: 'number', value: Number.parseInt(text) });
        }
        break;
      }
      case !!ctx.array():
        const value = this.popWithCheck('simpleArray', ctx);
        this.push({ type: 'value', subtype: 'array', value });
        break;
      case !!ctx.obj(): {
        const value = this.popWithCheck('simpleObject', ctx);
        this.push({ type: 'value', subtype: 'object', value });
        break;
      }
      case !!ctx.TRUE(): {
        this.push({ type: 'value', value: true, subtype: 'boolean' });
        break;
      }
      case !!ctx.FALSE(): {
        this.push({ type: 'value', value: false, subtype: 'boolean' });
        break;
      }
      case !!ctx.NULL(): {
        this.push({ type: 'value', value: null, subtype: 'null' });
        break;
      }
    }
  }
}
