import * as isPlainObjet from 'lodash.isplainobject';
import { RuleContext } from 'antlr4ts/RuleContext';
import { JSONPathListener } from './JSONPathListener';
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
} from './JSONPathParser';
import {
  ExpressionChild,
  ComparatorArgument,
  BinaryExpression,
  Node,
  Root,
  StartFunction,
  Subscript,
  Subscriptable,
  Value,
  Identifier,
  Bareword,
  Subscriptables,
} from './types';

type StackType = Node | Node[];

const isSubscriptable = (node: StackType): node is Subscriptable => {
  return (
    'type' in node &&
    typeof node.type === 'string' &&
    [
      'string_literal',
      'identifier',
      'numeric_literal',
      'wildcard',
      'filter_expression',
      'filter_subscript',
      'script_expression',
      'array_slice',
    ].includes(node.type)
  );
};
const TYPE_CHECKER = {
  simple_object: (node: StackType): node is Record<string, unknown> => isPlainObjet(node),
  simple_array: (node: StackType): node is unknown[] => Array.isArray(node),
  root: (node: StackType): node is Root => 'type' in node && node.type === 'root',
  value: (node: StackType): node is Value => 'type' in node && node.type === 'value',
  comparator_argument: (node: StackType): node is ComparatorArgument =>
    'type' in node && typeof node.type === 'string' && ['value', 'current', 'root'].includes(node.type),
  expression_child: (node: StackType): node is ExpressionChild =>
    'type' in node &&
    typeof node.type === 'string' &&
    ['comparator', 'group_expression', 'negate', 'binary_expression', 'value', 'current', 'root'].includes(node.type),
  subscript: (node: StackType): node is Subscript => 'type' in node && node.type === 'subscript',
  bareword: (node: StackType): node is Bareword | Identifier =>
    'type' in node && typeof node.type === 'string' && ['identifier', 'string_literal'].includes(node.type),
  start_function: (node: StackType): node is StartFunction => typeof node === 'function',
  subscriptable: isSubscriptable,
  subscriptables: (node: StackType): node is Subscriptables => 'type' in node && node.type === 'subscriptables',
} as const;

class ValidationError extends Error {
  rule: RuleContext;
  value: StackType;

  constructor(msg: string, rule: RuleContext | null, value?: StackType) {
    super(msg);
    this.rule = rule;
    this.value = value;
  }
}

type TypeGardReturn<K> = K extends (a: unknown) => a is infer T ? T : never;

export default class Listener implements JSONPathListener {
  _stack: StackType[] = [];

  public getTree(): Root | undefined {
    return this.popWithCheck('root', null);
  }

  private popWithCheck<T extends keyof typeof TYPE_CHECKER>(
    key: T,
    ctx: RuleContext | null,
  ): TypeGardReturn<typeof TYPE_CHECKER[T]> {
    const value = this._stack.pop();

    if (TYPE_CHECKER[key](value)) {
      return value as TypeGardReturn<typeof TYPE_CHECKER[T]>;
    }

    throw new ValidationError(`bad type returned for ${key}`, ctx, value);
  }

  private push(node: StackType): void {
    this._stack.push(node);
  }

  public exitJsonpath(ctx: JsonpathContext): void {
    if (ctx.ROOT_VALUE()) {
      const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

      this.push({ type: 'root', next });
    } else {
      throw new ValidationError('root value not found', ctx);
    }
  }

  public exitSubscript(ctx: SubscriptContext): void {
    switch (true) {
      case !!ctx.SUBSCRIPT(): {
        let subscriptableNode: Bareword;
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        if (ctx.subscriptableBareword()) {
          subscriptableNode = this.popWithCheck('bareword', ctx);
        } else {
          throw new ValidationError('subscript child should be bareword', ctx);
        }

        this.push({
          type: 'subscript',
          subtype: 'dot',
          next,
          value: subscriptableNode,
        });
        break;
      }
      case !!ctx.RECURSIVE_DESCENT(): {
        let subscriptableNode: Bareword | Subscriptables;
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;

        if (ctx.subscriptableBareword()) {
          subscriptableNode = this.popWithCheck('bareword', ctx);
        } else if (ctx.subscriptables()) {
          subscriptableNode = this.popWithCheck('subscriptables', ctx);
        } else {
          throw new ValidationError('recursive descent child should be either bareword or subscriptables', ctx);
        }

        this.push({
          type: 'subscript',
          subtype: 'dotdot',
          next,
          value: subscriptableNode,
        });
        break;
      }
      case !!ctx.subscriptables(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const subscriptableNode = this.popWithCheck('subscriptables', ctx);

        this.push({
          type: 'subscript',
          subtype: 'bracket',
          next,
          value: subscriptableNode,
        });
        break;
      }
      default: {
        throw new ValidationError('not handled subscript', ctx);
      }
    }
  }

  public exitSubscriptable(ctx: SubscriptableContext): void {
    switch (true) {
      case !!ctx.STRING(): {
        const text = ctx.STRING().text.slice(1, -1);

        this.push({ type: 'string_literal', value: text });
        break;
      }
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER().text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.NUMBER(): {
        if (ctx.sliceable()) {
          var func = this.popWithCheck('start_function', ctx);
          const start = ctx.NUMBER() ? Number.parseInt(ctx.NUMBER().text) : null;

          this.push(func(start));
        } else {
          const number = Number.parseInt(ctx.NUMBER().text);

          this.push({ type: 'numeric_literal', value: number });
        }
        break;
      }
      case !!ctx.sliceable(): {
        const func = this.popWithCheck('start_function', ctx);
        this.push(func(null));
        break;
      }
      case !!ctx.WILDCARD(): {
        this.push({ type: 'identifier', value: '*' });
        break;
      }
      case !!ctx.expression(): {
        const expression = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'filter_expression', value: expression });
        break;
      }
      case !!ctx.filterpath(): {
        const value = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'filter_subscript', value });
        break;
      }
      case !!ctx.filterarg(): {
        const right = this.popWithCheck('expression_child', ctx);
        const left = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'script_expression', left, right });
        break;
      }
      default: {
        throw new ValidationError('not handled subscriptable', ctx);
      }
    }
  }

  public exitSubscriptableBareword(ctx: SubscriptableBarewordContext): void {
    switch (true) {
      case !!ctx.IDENTIFIER(): {
        const text = ctx.IDENTIFIER().text;

        this.push({ type: 'identifier', value: text });
        break;
      }
      case !!ctx.WILDCARD(): {
        this.push({ type: 'identifier', value: '*' });
        break;
      }
      default: {
        throw new ValidationError('bad subsriptable bareword', ctx);
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
        throw new ValidationError('bad filter path', ctx);
      }
    }
  }

  public exitSubscriptables(ctx: SubscriptablesContext): void {
    const subscriptableNodes: Subscriptable[] = [];

    for (let index = 0; index < ctx.subscriptable().length; index += 1) {
      const subscriptable_node = this.popWithCheck('subscriptable', ctx);
      subscriptableNodes.unshift(subscriptable_node);
    }

    this.push({
      type: 'subscriptables',
      values: subscriptableNodes,
    });
  }

  public exitSliceable(ctx: SliceableContext): void {
    let end = null;
    let step = null;

    if (ctx.tryGetToken(JSONPathParser.NUMBER, 0)) {
      if (ctx.tryGetToken(JSONPathParser.COLON, 1)) {
        if (ctx.tryGetToken(JSONPathParser.NUMBER, 1)) {
          end = Number.parseInt(ctx.NUMBER(0).text);
          step = Number.parseInt(ctx.NUMBER(1).text);
        } else if (
          ctx.tryGetToken(JSONPathParser.NUMBER, 0).sourceInterval.a <
          ctx.tryGetToken(JSONPathParser.COLON, 1).sourceInterval.a
        ) {
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

    this.push((start: number) => {
      return { type: 'array_slice', start, end, step };
    });
  }

  public exitExpression(ctx: ExpressionContext): void {
    switch (true) {
      case !!ctx.NOT(): {
        const value = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'negate', value });
        break;
      }
      case !!ctx.AND(): {
        const right = this.popWithCheck('expression_child', ctx);
        const left = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'binary_expression', operator: 'and', left, right });
        break;
      }
      case !!ctx.OR(): {
        const right = this.popWithCheck('expression_child', ctx);
        const left = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'binary_expression', operator: 'or', left, right });
        break;
      }
      case !!ctx.PAREN_LEFT(): {
        const value = this.popWithCheck('expression_child', ctx);

        this.push({ type: 'group_expression', value });
        break;
      }
      case !!ctx.tryGetRuleContext(1, FilterargContext): {
        const right = this.popWithCheck('comparator_argument', ctx);
        const left = this.popWithCheck('comparator_argument', ctx);

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
          default: {
            throw new ValidationError('not handled comparator', ctx);
          }
        }
        break;
      }
    }
  }

  public exitObj(ctx: ObjContext): void {
    const values = [];
    for (const _ of ctx.pair()) {
      const value = this.popWithCheck('value', ctx);
      values.unshift(value);
    }

    let i = 0;
    let obj: Record<string, unknown> = {};
    for (const pairCtx of ctx.pair()) {
      const key = pairCtx.STRING().text.slice(1, -1);

      obj[key] = values[i].value;
      i += 1;
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

  public exitValue(ctx: ValueContext): void {
    switch (true) {
      case !!ctx.STRING(): {
        const text = ctx.STRING().text.slice(1, -1);

        this.push({ type: 'value', subtype: 'string', value: text });
        break;
      }
      case !!ctx.NUMBER(): {
        const text = ctx.NUMBER().text;

        if (text !== `${Number.parseInt(text)}`) {
          this.push({ type: 'value', subtype: 'number', value: Number.parseFloat(text) });
        } else {
          this.push({ type: 'value', subtype: 'number', value: Number.parseInt(text) });
        }
        break;
      }
      case !!ctx.array():
        const value = this.popWithCheck('simple_array', ctx);
        this.push({ type: 'value', subtype: 'array', value });
        break;
      case !!ctx.obj(): {
        const value = this.popWithCheck('simple_object', ctx);
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
        throw new ValidationError('not handled value', ctx);
      }
    }
  }
}