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
  empty: 'empty',
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
    case 'dot': {
      return '.' + stringify(input.value);
    }
    case 'dotdot': {
      const res = stringify(input.value);
      return '..' + res;
    }
    case 'bracketExpression':
    case 'bracketMember': {
      return '[' + stringify(input.value) + ']';
    }
    case 'subscript': {
      return stringify(input.value) + stringify(input.next);
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
      // RFC 9535: Use single quotes for normalized path format
      const escaped = input.value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `'${escaped}'`;
    }
    case 'numericLiteral': {
      return `${input.value}`;
    }
    case 'notExpression': {
      return '!(' + stringify(input.value) + ')';
    }
    case 'value': {
      if (input.subtype === 'regex') {
        return `${input.value}${input.opts}`;
      }
      if (input.subtype === 'string') {
        // RFC 9535: Use single quotes for string literals
        const escaped = (input.value as string).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        return `'${escaped}'`;
      }
      if (input.subtype === 'object') {
        // RFC 9535: Use single quotes for object keys and string values
        const pairs = Object.entries(input.value as Record<string, unknown>).map(([k, v]) => {
          const escapedKey = k.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
          const stringifiedVal = typeof v === 'string'
            ? `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
            : JSON.stringify(v);
          return `'${escapedKey}':${stringifiedVal}`;
        });
        return `{${pairs.join(',')}}`;
      }
      if (input.subtype === 'array') {
        // RFC 9535: Use single quotes for string elements
        const elements = (input.value as unknown[]).map((v) => {
          if (typeof v === 'string') {
            return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
          }
          return JSON.stringify(v);
        });
        return `[${elements.join(',')}]`;
      }
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
    case 'functionCall': {
      const args = input.args
        .map((arg) => {
          if (typeof arg === 'string') {
            const escaped = arg.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            return `'${escaped}'`;
          }
          return stringify(arg as JsonPathElement);
        })
        .join(', ');
      return `${input.name}(${args})`;
    }
  }
}
