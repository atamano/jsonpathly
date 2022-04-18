import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { JSONPathLexer } from './generated/JSONPathLexer';
import { JSONPathListener } from './generated/JSONPathListener';
import { JSONPathParser } from './generated/JSONPathParser';
import CustomJSONPathListener from './Listener';
import { Comparator, BinaryExpression, JsonPathItem, Root } from './types';

export function parse(input: string): Root | undefined {
  const inputStream = new ANTLRInputStream(input);
  const lexer = new JSONPathLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new JSONPathParser(tokenStream);
  const listener = new CustomJSONPathListener();

  const tree = parser.jsonpath();
  ParseTreeWalker.DEFAULT.walk(listener as JSONPathListener, tree);

  return listener.getTree();
}

const OPERATOR: Record<Comparator['operator'], string> = {
  eq: '==',
  ne: '!=',
  lt: '<',
  le: '<=',
  gt: '>',
  ge: '>=',
  in: 'in',
  nin: 'nin',
};

const EXPR_OPERATOR: Record<BinaryExpression['operator'], string> = {
  and: '&&',
  or: '||',
};

export function stringify(input: JsonPathItem | null): string {
  if (input === null) {
    return '';
  }

  switch (input.type) {
    case 'root': {
      return '$' + stringify(input.next);
    }
    case 'current': {
      return '@' + stringify(input.next);
    }
    case 'subscriptables': {
      return input.values.map(stringify).join(', ');
    }
    case 'subscript': {
      switch (input.subtype) {
        case 'dot': {
          return '.' + stringify(input.value) + stringify(input.next);
        }
        case 'dotdot': {
          let res = '';
          if (input.value.type === 'subscriptables') {
            res = `[${stringify(input.value)}]`;
          } else {
            res = stringify(input.value);
          }
          return '..' + res + stringify(input.next);
        }
        case 'bracket': {
          return '[' + stringify(input.value) + ']' + stringify(input.next);
        }
      }
    }
    case 'identifier': {
      return input.value;
    }
    case 'string_literal': {
      return `"${input.value}"`;
    }
    case 'numeric_literal': {
      return `${input.value}`;
    }
    case 'negate': {
      return '!' + stringify(input.value);
    }
    case 'value': {
      return JSON.stringify(input.value);
    }
    case 'filter_expression': {
      return '?(' + stringify(input.value) + ')';
    }
    case 'script_expression': {
      return '(' + stringify(input.left) + stringify(input.right) + ')';
    }
    case 'group_expression': {
      return '(' + stringify(input.value) + ')';
    }
    case 'comparator': {
      return stringify(input.left) + ` ${OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'binary_expression': {
      return stringify(input.left) + ` ${EXPR_OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'array_slice': {
      return `${input.start !== null ? input.start : ''}:${input.end !== null ? input.end : ''}${
        input.step !== null ? ':' + input.step : ''
      }`;
    }
  }
}
