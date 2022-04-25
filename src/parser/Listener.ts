/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RuleContext } from 'antlr4ts/RuleContext';
import { default as isPlainObjet } from 'lodash.isplainobject';
import { JSONPathValidationError } from './errors';
import { JSONPathListener } from './generated/JSONPathListener';
import {
  ArrayContext,
  ExpressionContext,
  FilterargContext,
  FilterpathContext,
  JsonpathContext,
  JSONPathParser,
  ObjContext,
  SliceableContext,
  SubscriptableBarewordContext,
  SubscriptableContext,
  SubscriptablesContext,
  SubscriptContext,
  ValueContext,
} from './generated/JSONPathParser';
import {
  Operation,
  FilterExpressionChild,
  Identifier,
  Node,
  Root,
  StartFunction,
  Subscript,
  Subscriptable,
  Subscriptables,
  Value,
  Wildcard,
  NumericLiteral,
} from './types';

type StackType = Node | Node[];

const TYPE_CHECK_MAPPER = {
  simpleObject: (node: StackType): node is Record<string, unknown> => isPlainObjet(node),
  simpleArray: (node: StackType): node is unknown[] => Array.isArray(node),
  root: (node: StackType): node is Root => 'type' in node && node.type === 'root',
  value: (node: StackType): node is Value => 'type' in node && node.type === 'value',
  operation: (node: StackType): node is Operation =>
    'type' in node && typeof node.type === 'string' && ['value', 'current', 'root', 'operation'].includes(node.type),
  filterExpressionChild: (node: StackType): node is FilterExpressionChild =>
    'type' in node &&
    typeof node.type === 'string' &&
    ['comparator', 'group_expression', 'negate_expression', 'logical_expression', 'current', 'root'].includes(
      node.type,
    ),
  subscript: (node: StackType): node is Subscript => 'type' in node && node.type === 'subscript',
  identifierWildcard: (node: StackType): node is Identifier | Wildcard =>
    'type' in node && typeof node.type === 'string' && ['identifier', 'wildcard'].includes(node.type),
  startFunction: (node: StackType): node is StartFunction => typeof node === 'function',
  subscriptable: (node: StackType): node is Subscriptable => {
    return (
      'type' in node &&
      typeof node.type === 'string' &&
      ['string_literal', 'identifier', 'numeric_literal', 'wildcard', 'filter_expression', 'array_slice'].includes(
        node.type,
      )
    );
  },
  subscriptables: (node: StackType): node is Subscriptables => 'type' in node && node.type === 'subscriptables',
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
    } else {
      throw new JSONPathValidationError('root value not found', ctx);
    }
  }

  public exitSubscript(ctx: SubscriptContext): void {
    switch (true) {
      case !!ctx.SUBSCRIPT(): {
        let node: Identifier | Wildcard | NumericLiteral;
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        switch (true) {
          case !!ctx.subscriptableBareword(): {
            node = this.popWithCheck('identifierWildcard', ctx);
            break;
          }
          case !!ctx.NUMBER(): {
            const number = Number.parseInt(ctx.NUMBER()!.text);

            node = {
              type: 'numeric_literal',
              value: number,
            };
            break;
          }
          default: {
            throw new JSONPathValidationError('subscript child should be bareword', ctx);
          }
        }

        this.push({
          type: 'subscript',
          subtype: 'dot',
          next,
          value: node,
        });
        break;
      }
      case !!ctx.RECURSIVE_DESCENT(): {
        let node: Identifier | Wildcard | Subscriptables;
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        if (ctx.subscriptableBareword()) {
          node = this.popWithCheck('identifierWildcard', ctx);
        } else if (ctx.subscriptables()) {
          node = this.popWithCheck('subscriptables', ctx);
        } else {
          throw new JSONPathValidationError('recursive descent child should be either bareword or subscriptables', ctx);
        }

        this.setIsIndefinite(true);
        this.push({
          type: 'subscript',
          subtype: 'dotdot',
          next,
          value: node,
        });
        break;
      }
      case !!ctx.subscriptables(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const node = this.popWithCheck('subscriptables', ctx);

        this.push({
          type: 'subscript',
          subtype: 'bracket',
          next,
          value: node,
        });
        break;
      }
      default: {
        throw new JSONPathValidationError('not handled subscript', ctx);
      }
    }
  }

  public exitSubscriptable(ctx: SubscriptableContext): void {
    switch (true) {
      case !!ctx.STRING(): {
        const text = ctx.STRING()!.text.slice(1, -1);

        this.push({ type: 'string_literal', value: text });
        break;
      }
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.NUMBER(): {
        if (ctx.sliceable()) {
          const func: StartFunction = this.popWithCheck('startFunction', ctx);
          const start = ctx.NUMBER() ? Number.parseInt(ctx.NUMBER()!.text) : null;

          this.setIsIndefinite(true);

          this.push(func(start));
        } else {
          const number = Number.parseInt(ctx.NUMBER()!.text);

          this.push({ type: 'numeric_literal', value: number });
        }
        break;
      }
      case !!ctx.sliceable(): {
        const func: StartFunction = this.popWithCheck('startFunction', ctx);
        this.setIsIndefinite(true);
        this.push(func(null));
        break;
      }
      case !!ctx.WILDCARD(): {
        this.setIsIndefinite(true);
        this.push({ type: 'wildcard' });
        break;
      }
      case !!ctx.expression(): {
        const expression = this.popWithCheck('filterExpressionChild', ctx);

        this.setIsIndefinite(true);
        this.push({ type: 'filter_expression', value: expression });
        break;
      }
      default: {
        throw new JSONPathValidationError('not handled subscriptable', ctx);
      }
    }
  }

  public exitSubscriptableBareword(ctx: SubscriptableBarewordContext): void {
    switch (true) {
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.WILDCARD(): {
        this.setIsIndefinite(true);
        this.push({ type: 'wildcard' });
        break;
      }
      default: {
        throw new JSONPathValidationError('bad subsriptable bareword', ctx);
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

  public exitSubscriptables(ctx: SubscriptablesContext): void {
    const nodes: Subscriptable[] = [];

    for (let index = 0; index < ctx.subscriptable().length; index += 1) {
      const subscriptableNode = this.popWithCheck('subscriptable', ctx);
      nodes.unshift(subscriptableNode);
    }

    if (nodes.length > 1) {
      this.setIsIndefinite(true);
    }

    this.push({
      type: 'subscriptables',
      values: nodes,
    });
  }

  public exitSliceable(ctx: SliceableContext): void {
    let end: number | null = null;
    let step: number | null = null;

    const number0 = ctx.tryGetToken(JSONPathParser.NUMBER, 0);
    const number1 = ctx.tryGetToken(JSONPathParser.NUMBER, 1);
    const colon1 = ctx.tryGetToken(JSONPathParser.COLON, 1);

    if (number0) {
      if (colon1) {
        if (number1) {
          end = Number.parseInt(ctx.NUMBER(0).text);
          step = Number.parseInt(ctx.NUMBER(1).text);
        } else if (number0.sourceInterval.a < colon1.sourceInterval.a) {
          end = Number.parseInt(ctx.NUMBER(0).text);
          step = null;
        } else {
          end = null;
          step = Number.parseInt(ctx.NUMBER(0).text);
        }
      } else {
        end = Number.parseInt(ctx.NUMBER(0).text);
        step = null;
      }
    }
    this.setIsIndefinite(true);

    this.push((start: number | null) => {
      return { type: 'array_slice', start, end, step };
    });
  }

  public exitExpression(ctx: ExpressionContext): void {
    switch (true) {
      case !!ctx.NOT(): {
        const value = this.popWithCheck('filterExpressionChild', ctx);

        this.push({
          type: 'negate_expression',
          value,
        });
        break;
      }
      case !!ctx.AND(): {
        const right = this.popWithCheck('filterExpressionChild', ctx);
        const left = this.popWithCheck('filterExpressionChild', ctx);

        this.push({ type: 'logical_expression', operator: 'and', left, right });
        break;
      }
      case !!ctx.OR(): {
        const right = this.popWithCheck('filterExpressionChild', ctx);
        const left = this.popWithCheck('filterExpressionChild', ctx);

        this.push({ type: 'logical_expression', operator: 'or', left, right });
        break;
      }
      case !!ctx.PAREN_LEFT(): {
        const value = this.popWithCheck('filterExpressionChild', ctx);

        this.push({ type: 'group_expression', value });
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
          default: {
            throw new JSONPathValidationError('not handled comparator', ctx);
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
      default: {
        throw new JSONPathValidationError('not handled value', ctx);
      }
    }
  }
}
