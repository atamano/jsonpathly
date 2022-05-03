/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { RuleContext } from 'antlr4ts/RuleContext';
import { JSONPathListener } from './generated/JSONPathListener';
import {
  ArrayContext,
  BracketContentContext,
  BracketContext,
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
  RegexContext,
  SlicesContext,
  SubscriptContext,
  UnionsContext,
  ValueContext,
} from './generated/JSONPathParser';
import {
  BracketExpression,
  BracketExpressionContent,
  BracketMember,
  BracketMemberContent,
  DotContent,
  DotDotContent,
  FilterExpression,
  Identifier,
  Indexes,
  JsonPathElement,
  NumericLiteral,
  OperationContent,
  Root,
  Slices,
  StringLiteral,
  Subscript,
  Unions,
  Value,
  ValueRegex,
} from './types';

const TYPE_CHECK_MAPPER = {
  root: (node: JsonPathElement): node is Root => 'type' in node && node.type === 'root',
  value: (node: JsonPathElement): node is Value => 'type' in node && node.type === 'value',
  regex: (node: JsonPathElement): node is ValueRegex =>
    'type' in node && node.type === 'value' && node.subtype === 'regex',
  operationContent: (node: JsonPathElement): node is OperationContent =>
    'type' in node &&
    typeof node.type === 'string' &&
    ['value', 'current', 'root', 'groupOperation', 'operation'].includes(node.type),
  subscript: (node: JsonPathElement): node is Subscript => 'type' in node && node.type === 'subscript',
  bracket: (node: JsonPathElement): node is BracketMember | BracketExpression =>
    'type' in node && ['bracketMember', 'bracketExpression'].includes(node.type),
  unions: (node: JsonPathElement): node is Unions => 'type' in node && node.type === 'unions',
  indexes: (node: JsonPathElement): node is Indexes => 'type' in node && node.type === 'indexes',
  slices: (node: JsonPathElement): node is Slices => 'type' in node && node.type === 'slices',
  filterExpression: (node: JsonPathElement): node is FilterExpression =>
    'type' in node && node.type === 'filterExpression',
  dotContent: (node: JsonPathElement): node is DotContent =>
    'type' in node && ['identifier', 'numericLiteral', 'wildcard'].includes(node.type),
  dotdotContent: (node: JsonPathElement): node is DotDotContent =>
    'type' in node && ['identifier', 'wildcard', 'bracketMember', 'bracketExpression'].includes(node.type),
  bracketContent: (node: JsonPathElement): node is BracketMemberContent | BracketExpressionContent =>
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
  expressionContent: (node: JsonPathElement): node is FilterExpression['value'] =>
    'type' in node &&
    ['comparator', 'groupExpression', 'logicalExpression', 'notExpression', 'current', 'root'].includes(node.type),
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypeGardReturn<K> = K extends (a: any) => a is infer T ? T : never;

const isBracketMember = (item: BracketMemberContent | BracketExpressionContent): item is BracketMemberContent =>
  ['identifier', 'numericLiteral', 'stringLiteral'].includes(item.type);

export default class Listener implements JSONPathListener {
  _stack: JsonPathElement[] = [];

  public getTree(): Root {
    return this.popWithCheck('root', null);
  }

  private popWithCheck<T extends keyof typeof TYPE_CHECK_MAPPER>(
    key: T,
    ctx: RuleContext | null,
  ): TypeGardReturn<typeof TYPE_CHECK_MAPPER[T]> {
    const value = this._stack.pop();

    if (typeof value !== 'undefined' && TYPE_CHECK_MAPPER[key](value)) {
      return value as TypeGardReturn<typeof TYPE_CHECK_MAPPER[T]>;
    }

    /* istanbul ignore next */
    throw new Error(`bad type returned for ${key} with token: ${ctx?.text}`);
  }

  private push(node: JsonPathElement): void {
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
      case !!ctx.STAR(): {
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

  public exitBracket(ctx: BracketContext): void {
    const value = this.popWithCheck('bracketContent', ctx);

    if (isBracketMember(value)) {
      this.push({
        type: 'bracketMember',
        value,
      });
      return;
    }

    this.push({
      type: 'bracketExpression',
      value,
    });
  }

  public exitDotdotContent(ctx: DotdotContentContext): void {
    switch (true) {
      case !!ctx.STAR(): {
        this.push({ type: 'wildcard' });
        break;
      }
      case !!ctx.IDENTIFIER(): {
        const value = ctx.IDENTIFIER()!.text;

        this.push({ type: 'identifier', value });
        break;
      }
      case !!ctx.bracket(): {
        const value = this.popWithCheck('bracket', ctx);

        this.push(value);
        break;
      }
    }
  }

  public exitDotContent(ctx: DotContentContext): void {
    switch (true) {
      case !!ctx.STAR(): {
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
          value: {
            type: 'dot',
            value,
          },
          next,
        });
        break;
      }
      case !!ctx.DOTDOT(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const value = this.popWithCheck('dotdotContent', ctx);

        this.push({
          type: 'subscript',
          value: {
            type: 'dotdot',
            value,
          },
          next,
        });
        break;
      }
      case !!ctx.bracket(): {
        const next = ctx.subscript() ? this.popWithCheck('subscript', ctx) : null;
        const value = this.popWithCheck('bracket', ctx);

        this.push({
          type: 'subscript',
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
    }
  }

  public exitUnions(ctx: UnionsContext): void {
    const nodes: (StringLiteral | Identifier)[] = [];

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

    if (colon0 && number0 && number0.sourceInterval.a < colon0.sourceInterval.a) {
      start = Number.parseInt(ctx.NUMBER(0).text);
    }

    this.push({ type: 'slices', start, end, step });
  }

  public exitFilterExpression(ctx: FilterExpressionContext): void {
    const value = this.popWithCheck('expressionContent', ctx);

    this.push({
      type: 'filterExpression',
      value,
    });
  }

  public exitRegex(ctx: RegexContext): void {
    const value = ctx.REGEX_EXPR().text;
    const opts = ctx.REGEX_OPT()?.text || '';

    this.push({
      type: 'value',
      subtype: 'regex',
      value: value as ValueRegex['value'],
      opts,
    });
  }

  public exitExpression(ctx: ExpressionContext): void {
    switch (true) {
      case !!ctx.NOT(): {
        const value = this.popWithCheck('expressionContent', ctx);

        this.push({
          type: 'notExpression',
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
      case !!ctx.regex(): {
        const right = this.popWithCheck('regex', ctx);
        const left = this.popWithCheck('operationContent', ctx);

        this.push({
          type: 'comparator',
          operator: 'reg',
          left,
          right,
        });
        break;
      }
      case !!ctx.EMPT(): {
        const left = this.popWithCheck('operationContent', ctx);
        this.push({ type: 'comparator', operator: 'empty', left, right: null });
        break;
      }
      case !!ctx.tryGetRuleContext(1, FilterargContext): {
        const right = this.popWithCheck('operationContent', ctx);
        const left = this.popWithCheck('operationContent', ctx);

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

    this.push({ type: 'value', subtype: 'object', value: obj });
  }

  public exitArray(ctx: ArrayContext): void {
    const array: unknown[] = [];

    for (let index = 0; index < ctx.value().length; index += 1) {
      const value = this.popWithCheck('value', ctx);

      array.unshift(value.value);
    }

    this.push({ type: 'value', subtype: 'array', value: array });
  }

  public exitFilterarg(ctx: FilterargContext): void {
    switch (true) {
      case !!ctx.tryGetRuleContext(1, FilterargContext): {
        switch (true) {
          case !!ctx.STAR(): {
            const right = this.popWithCheck('operationContent', ctx);
            const left = this.popWithCheck('operationContent', ctx);
            this.push({ type: 'operation', operator: 'multi', left, right });
            break;
          }
          case !!ctx.DIV(): {
            const right = this.popWithCheck('operationContent', ctx);
            const left = this.popWithCheck('operationContent', ctx);
            this.push({ type: 'operation', operator: 'div', left, right });
            break;
          }
          case !!ctx.PLUS(): {
            const right = this.popWithCheck('operationContent', ctx);
            const left = this.popWithCheck('operationContent', ctx);
            this.push({ type: 'operation', operator: 'plus', left, right });
            break;
          }
          case !!ctx.MINUS_SP(): {
            const right = this.popWithCheck('operationContent', ctx);
            const left = this.popWithCheck('operationContent', ctx);
            this.push({ type: 'operation', operator: 'minus', left, right });
            break;
          }
          default: {
            // no operator occures when right value is negative, it should be validated at runtime
            const right = this.popWithCheck('operationContent', ctx);
            const left = this.popWithCheck('operationContent', ctx);

            this.push({ type: 'operation', operator: '', left, right });
            break;
          }
        }
        break;
      }
      case !!ctx.PAREN_LEFT(): {
        const value = this.popWithCheck('operationContent', ctx);
        this.push({ type: 'groupOperation', value });
        break;
      }
      case !!ctx.value(): {
        const left = this.popWithCheck('operationContent', ctx);
        this.push(left);
        break;
      }
      case !!ctx.filterpath(): {
        const value = this.popWithCheck('operationContent', ctx);
        this.push(value);
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
        const value = this.popWithCheck('value', ctx);
        this.push(value);
        break;
      case !!ctx.obj(): {
        const value = this.popWithCheck('value', ctx);
        this.push(value);
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
