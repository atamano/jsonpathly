import { LogicalExpression, Comparator, JsonPathItem } from './types';

const OPERATOR: Record<Comparator['operator'], string> = {
  eq: '==',
  ne: '!=',
  lt: '<',
  le: '<=',
  gt: '>',
  ge: '>=',
  in: 'in',
  nin: 'nin',
  subsetof: 'subsetof',
  anyof: 'anyof',
  noneof: 'noneof',
  sizeof: 'sizeof',
  size: 'size',
};

const EXPR_OPERATOR: Record<LogicalExpression['operator'], string> = {
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
    case 'wildcard': {
      return '*';
    }
    case 'string_literal': {
      return `"${input.value}"`;
    }
    case 'numeric_literal': {
      return `${input.value}`;
    }
    case 'negate_expression': {
      return '!' + stringify(input.value);
    }
    case 'value': {
      return JSON.stringify(input.value);
    }
    case 'filter_expression': {
      return '?(' + stringify(input.value) + ')';
    }
    case 'group_expression': {
      return '(' + stringify(input.value) + ')';
    }
    case 'comparator': {
      return stringify(input.left) + ` ${OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'logical_expression': {
      return stringify(input.left) + ` ${EXPR_OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'array_slice': {
      return `${input.start !== null ? input.start : ''}:${input.end !== null ? input.end : ''}${
        input.step !== null ? ':' + input.step : ''
      }`;
    }
  }
}
