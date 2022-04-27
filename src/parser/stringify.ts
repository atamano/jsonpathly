import { Comparator, JsonPathElement, LogicalExpression, Operation } from './types';

const OPERATOR: Record<Comparator['operator'], string> = {
  eq: '==',
  ne: '!=',
  lt: '<',
  le: '<=',
  gt: '>',
  ge: '>=',
  in: 'in',
  reg: '=~',
  nin: 'nin',
  subsetof: 'subsetof',
  anyof: 'anyof',
  noneof: 'noneof',
  sizeof: 'sizeof',
  size: 'size',
};

const COMP_OPERATOR: Record<Operation['operator'], string> = {
  plus: '+',
  minus: '-',
  multi: '*',
  div: '/',
  '': '',
};

const EXPR_OPERATOR: Record<LogicalExpression['operator'], string> = {
  and: '&&',
  or: '||',
};

export function stringify(input: JsonPathElement | null): string {
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
    case 'subscript': {
      switch (input.subtype) {
        case 'dot': {
          return '.' + stringify(input.value) + stringify(input.next);
        }
        case 'dotdot': {
          const res = stringify(input.value);
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
    case 'indexes': {
      return input.values.map(stringify).join(', ');
    }
    case 'unions': {
      return input.values.map(stringify).join(', ');
    }
    case 'stringLiteral': {
      return `"${input.value}"`;
    }
    case 'numericLiteral': {
      return `${input.value}`;
    }
    case 'notExpression': {
      return '!' + stringify(input.value);
    }
    case 'value': {
      return JSON.stringify(input.value);
    }
    case 'filterExpression': {
      return '?(' + stringify(input.value) + ')';
    }
    case 'groupOperation': {
      return '(' + stringify(input.value) + ')';
    }
    case 'groupExpression': {
      return '(' + stringify(input.value) + ')';
    }
    case 'operation': {
      return stringify(input.left) + ' ' + COMP_OPERATOR[input.operator] + ' ' + stringify(input.right);
    }
    case 'comparator': {
      return stringify(input.left) + ` ${OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'logicalExpression': {
      return stringify(input.left) + ` ${EXPR_OPERATOR[input.operator]} ` + stringify(input.right);
    }
    case 'slices': {
      return `${input.start !== null ? input.start : ''}:${input.end !== null ? input.end : ''}${
        input.step !== null ? ':' + input.step : ''
      }`;
    }
  }
}
