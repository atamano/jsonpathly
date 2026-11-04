/**
 * JSONPath AST to string serialization.
 *
 * Converts parsed JSONPath AST back to string representation.
 * Uses RFC 9535 normalized format with single quotes.
 */
import { isCapacityError, isStackOverflow } from '../handler/helper';
import { JSONPathLimitError } from './errors';
import { Comparator, JsonPathElement, LogicalExpression, Operation } from './types';

// ============================================
// Operator Mappings
// ============================================

const COMPARATOR_OPERATORS: Record<Comparator['operator'], string> = {
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

const ARITHMETIC_OPERATORS: Record<Operation['operator'], string> = {
  plus: '+',
  minus: '-',
  multi: '*',
  div: '/',
};

const LOGICAL_OPERATORS: Record<LogicalExpression['operator'], string> = {
  and: '&&',
  or: '||',
};

// ============================================
// String Escaping Utilities
// ============================================

/**
 * Escape string for single-quoted output per RFC 9535 normalized path format.
 * Escapes: backslash, single quote, and control characters (U+0000-U+001F).
 */
const escapeForSingleQuote = (str: string): string => {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const code = char.charCodeAt(0);

    if (char === '\\') {
      result += '\\\\';
    } else if (char === "'") {
      result += "\\'";
    } else if (code < 0x20) {
      // Control characters U+0000-U+001F
      switch (char) {
        case '\b':
          result += '\\b';
          break;
        case '\f':
          result += '\\f';
          break;
        case '\n':
          result += '\\n';
          break;
        case '\r':
          result += '\\r';
          break;
        case '\t':
          result += '\\t';
          break;
        default:
          // Other control chars as \uXXXX
          result += '\\u' + code.toString(16).padStart(4, '0');
      }
    } else {
      result += char;
    }
  }
  return result;
};

/**
 * Format string as single-quoted literal.
 */
const singleQuoted = (str: string): string => `'${escapeForSingleQuote(str)}'`;

/**
 * Stringify a JSON value with single quotes for strings.
 * Used for object and array values in filter expressions. Iterative (an
 * explicit stack of pending values and punctuation): recursion overflowed the
 * call stack on deeply nested literals such as [[[...0...]]].
 */
const stringifyJsonValue = (root: unknown): string => {
  const out: string[] = [];
  const stack: ({ value: unknown } | string)[] = [{ value: root }];

  while (stack.length > 0) {
    const item = stack.pop() as { value: unknown } | string;
    if (typeof item === 'string') {
      out.push(item);
      continue;
    }
    const value = item.value;
    if (typeof value === 'string') {
      out.push(singleQuoted(value));
    } else if (Array.isArray(value)) {
      // Pushed in reverse so they pop in order: '[' v0 ',' v1 ... ']'
      stack.push(']');
      for (let i = value.length - 1; i >= 0; i--) {
        stack.push({ value: value[i] });
        if (i > 0) stack.push(',');
      }
      stack.push('[');
    } else if (value !== null && typeof value === 'object') {
      const entries = Object.entries(value);
      stack.push('}');
      for (let i = entries.length - 1; i >= 0; i--) {
        stack.push({ value: entries[i][1] });
        stack.push(`${singleQuoted(entries[i][0])}:`);
        if (i > 0) stack.push(',');
      }
      stack.push('{');
    } else {
      out.push(JSON.stringify(value));
    }
  }

  return out.join('');
};

// ============================================
// Helper Functions (defined before stringify)
// ============================================

/**
 * Stringify a value node based on its subtype.
 */
function stringifyValue(input: Extract<JsonPathElement, { type: 'value' }>): string {
  switch (input.subtype) {
    case 'regex':
      return `${input.value}${input.opts}`;

    case 'string':
      return singleQuoted(input.value as string);

    case 'object':
      return stringifyJsonValue(input.value);

    case 'array':
      return stringifyJsonValue(input.value);

    case 'boolean':
    case 'number':
    case 'null':
      return JSON.stringify(input.value);

    /* c8 ignore start */
    default: {
      const _exhaustive: never = input;
      throw new Error(`Unknown value subtype: ${(_exhaustive as { subtype: string }).subtype}`);
    }
    /* c8 ignore stop */
  }
}

/**
 * Stringify a slice expression.
 */
function stringifySlice(input: Extract<JsonPathElement, { type: 'slices' }>): string {
  const start = input.start !== null ? String(input.start) : '';
  const end = input.end !== null ? String(input.end) : '';
  const step = input.step !== null ? ':' + input.step : '';
  return `${start}:${end}${step}`;
}

// ============================================
// Main Stringify Function
// ============================================

/**
 * Throw a TypeError if the AST (literal values included) contains a cycle,
 * which only a hand-built AST can: the iterative parts of stringify would
 * otherwise grow forever. Depth-first with an explicit stack; shared
 * (acyclic) references are allowed.
 */
const assertAcyclic = (root: unknown): void => {
  const ON_PATH = 1;
  const DONE = 2;
  const state = new Map<object, number>();
  const frames: { node: object; children: unknown[]; i: number }[] = [];

  const enter = (value: unknown): void => {
    if (typeof value !== 'object' || value === null) return;
    const s = state.get(value);
    if (s === ON_PATH) throw new TypeError('Cannot stringify a cyclic AST');
    if (s === DONE) return;
    state.set(value, ON_PATH);
    frames.push({ node: value, children: Object.values(value), i: 0 });
  };

  enter(root);
  while (frames.length > 0) {
    const frame = frames[frames.length - 1];
    if (frame.i < frame.children.length) {
      enter(frame.children[frame.i++]);
    } else {
      state.set(frame.node, DONE);
      frames.pop();
    }
  }
};

/**
 * Convert JSONPath AST element to string representation.
 *
 * @param input - AST element to stringify
 * @returns String representation of the JSONPath
 */
export function stringify(input: JsonPathElement | null): string {
  try {
    // Inside the try: on an AST of millions of nodes, its visited Map can
    // reach V8's maximum Map size.
    assertAcyclic(input);
    return stringifyNode(input);
  } catch (e) {
    // Segment, operator and literal chains are iterative; only nesting (groups,
    // filters, function calls) recurses, and parse() bounds it. A hand-built
    // AST nested deeper still must not escape as a RangeError.
    if (isStackOverflow(e)) {
      throw new JSONPathLimitError('AST is nested too deeply to stringify');
    }
    if (isCapacityError(e)) {
      throw new JSONPathLimitError('AST is too large to stringify');
    }
    // The TypeError for a cyclic AST, among others.
    throw e;
  }
}

/**
 * `head` followed by `parts` in reverse order. Concatenates rather than
 * joining: join() copies its parts into a new flat string, so nested chains
 * copied the same serialized right operand once per enclosing level.
 */
function appendReversed(head: string, parts: string[]): string {
  let out = head;
  for (let i = parts.length - 1; i >= 0; i--) out += parts[i];
  return out;
}

/** `open`, the nodes separated by ", ", then `close`, concatenated for the same reason. */
function joinNodes(open: string, nodes: readonly JsonPathElement[], close: string): string {
  let out = open;
  for (let i = 0; i < nodes.length; i++) out += (i === 0 ? '' : ', ') + stringifyNode(nodes[i]);
  return out + close;
}

function stringifyNode(input: JsonPathElement | null): string {
  if (input === null) {
    return '';
  }

  switch (input.type) {
    case 'root':
      return '$' + stringifyNode(input.next);

    case 'current':
      return '@' + stringifyNode(input.next);

    case 'dot':
      return '.' + stringifyNode(input.value);

    case 'dotdot':
      return '..' + stringifyNode(input.value);

    case 'bracketExpression':
    case 'bracketMember':
      return '[' + stringifyNode(input.value) + ']';

    case 'subscript': {
      // Iterative: one recursive call per segment overflowed the call stack on long paths.
      let out = '';
      for (let segment: typeof input | null = input; segment !== null; segment = segment.next) {
        out += stringifyNode(segment.value);
      }
      return out;
    }

    case 'identifier':
      return input.value;

    case 'wildcard':
      return '*';

    case 'unions':
      return joinNodes('', input.values, '');

    case 'stringLiteral':
      return singleQuoted(input.value);

    case 'numericLiteral':
      return String(input.value);

    case 'notExpression':
      return '!(' + stringifyNode(input.value) + ')';

    case 'value':
      return stringifyValue(input);

    case 'filterExpression':
      return '?(' + stringifyNode(input.value) + ')';

    case 'groupOperation':
    case 'groupExpression':
      return '(' + stringifyNode(input.value) + ')';

    case 'operation': {
      // Chains such as 1 + 1 + ... are left-deep: walk the left spine in a loop.
      const tail: string[] = [];
      let node: JsonPathElement = input;
      while (node.type === 'operation') {
        tail.push(' ' + ARITHMETIC_OPERATORS[node.operator] + ' ' + stringifyNode(node.right));
        node = node.left;
      }
      return appendReversed(stringifyNode(node), tail);
    }

    case 'comparator':
      // Handle unary operators (empty has no right operand)
      if (input.operator === 'empty') {
        return stringifyNode(input.left) + ' empty';
      }
      return stringifyNode(input.left) + ` ${COMPARATOR_OPERATORS[input.operator]} ` + stringifyNode(input.right);

    case 'logicalExpression': {
      // Chains such as @.a && @.b && ... are left-deep: walk the left spine in a loop.
      const tail: string[] = [];
      let node: JsonPathElement = input;
      while (node.type === 'logicalExpression') {
        tail.push(` ${LOGICAL_OPERATORS[node.operator]} ` + stringifyNode(node.right));
        node = node.left;
      }
      return appendReversed(stringifyNode(node), tail);
    }

    case 'slices':
      return stringifySlice(input);

    case 'functionCall':
      return joinNodes(input.name + '(', input.args as JsonPathElement[], ')');

    /* c8 ignore start */
    default: {
      const _exhaustive: never = input;
      throw new Error(`Unknown AST node type: ${(_exhaustive as JsonPathElement).type}`);
    }
    /* c8 ignore stop */
  }
}
