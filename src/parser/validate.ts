/**
 * RFC 9535 well-typedness checks (sections 2.3.5.1 and 2.4.3), run on the AST
 * once the grammar has accepted a query:
 *
 * - a filter test is a query (existence test), a comparison, a logical
 *   combination of tests, or a function returning LogicalType (match, search);
 * - the operands of ==, !=, <, <=, >, >= are literals, singular queries or
 *   functions returning ValueType (length, count, value);
 * - functions take the right number of arguments, of the right type: count()
 *   and value() take a query, length(), match() and search() take values.
 *
 * jsonpathly's extensions keep their own rules: the operands of in, nin,
 * subsetof, anyof, noneof, size, sizeof, empty and =~ may be any query, and
 * arithmetic operands are values like comparison operands.
 *
 * Iterative, with an explicit stack: queries can nest deeper than the call stack.
 */
import { JSONPathSyntaxError } from './errors';

/** What the position of a node requires of it. */
type Context =
  /** A filter test (LogicalType). */
  | 'test'
  /** A comparison or arithmetic operand, or a ValueType function argument. */
  | 'value'
  /** A NodesType function argument: any query. */
  | 'nodes'
  /** An operand of an extension operator: any query, value or function. */
  | 'any';

type Node = { type?: unknown; [key: string]: unknown };

const RFC_COMPARATORS = new Set(['eq', 'ne', 'lt', 'le', 'gt', 'ge']);

/** Argument contexts of each function; the result type follows. */
const FUNCTIONS: Record<string, { args: Context[]; logical: boolean }> = {
  length: { args: ['value'], logical: false },
  count: { args: ['nodes'], logical: false },
  value: { args: ['nodes'], logical: false },
  match: { args: ['value', 'value'], logical: true },
  search: { args: ['value', 'value'], logical: true },
};

const fail = (message: string): never => {
  throw new JSONPathSyntaxError(1, 1, message);
};

const isQuery = (node: Node): boolean => node.type === 'root' || node.type === 'current';

/** A query whose segments are all names or indices (RFC 9535 section 2.3.5.1). */
const isSingular = (query: Node): boolean => {
  for (let sub = query.next as Node | null; sub; sub = sub.next as Node | null) {
    const segment = sub.value as Node;
    if (segment.type === 'bracketMember') continue;
    if (segment.type === 'dot' && (segment.value as Node).type !== 'wildcard') continue;
    return false;
  }
  return true;
};

export function validate(root: Node): void {
  const stack: { node: unknown; context: Context }[] = [{ node: root, context: 'nodes' }];
  // Filters nested in the segments of a query are tests of their own.
  const pushSegments = (query: Node): void => {
    for (let sub = query.next as Node | null; sub; sub = sub.next as Node | null) {
      let segment = sub.value as Node;
      if (segment.type === 'dotdot') segment = segment.value as Node;
      if (segment.type !== 'bracketExpression') continue;
      const content = segment.value as Node;
      const selectors = content.type === 'unions' ? (content.values as Node[]) : [content];
      for (const selector of selectors) {
        if (selector.type === 'filterExpression') stack.push({ node: selector.value, context: 'test' });
      }
    }
  };

  while (stack.length > 0) {
    const { node: raw, context } = stack.pop()!;
    if (typeof raw !== 'object' || raw === null) continue;
    const node = raw as Node;

    if (isQuery(node)) {
      if (context === 'value' && !isSingular(node)) {
        fail('A non-singular query cannot be compared or used as a value: use a name or an index in each segment');
      }
      pushSegments(node);
      continue;
    }

    if (context === 'nodes') fail(`Expected a query, found ${String(node.type)}`);

    // The grammar already keeps logical expressions and comparisons out of
    // operands, and arithmetic out of tests: only the positions it accepts
    // in both roles (queries, function calls, literals) are checked here.
    switch (node.type) {
      case 'logicalExpression':
      case 'notExpression':
      case 'groupExpression':
        if (node.type === 'logicalExpression') {
          stack.push({ node: node.left, context: 'test' }, { node: node.right, context: 'test' });
        } else {
          stack.push({ node: node.value, context: 'test' });
        }
        break;
      case 'comparator': {
        const operand: Context = RFC_COMPARATORS.has(node.operator as string) ? 'value' : 'any';
        stack.push({ node: node.left, context: operand });
        if (node.operator !== 'reg') stack.push({ node: node.right, context: operand });
        break;
      }
      case 'functionCall': {
        const name = node.name as string;
        const spec = FUNCTIONS[name];
        const args = node.args as unknown[];
        if (args.length !== spec.args.length) {
          fail(`${name}() takes ${spec.args.length} argument${spec.args.length > 1 ? 's' : ''}, found ${args.length}`);
        }
        if (context === 'test' && !spec.logical) fail(`The result of ${name}() must be compared`);
        if (context === 'value' && spec.logical) fail(`The result of ${name}() cannot be compared`);
        args.forEach((arg, i) => stack.push({ node: arg, context: spec.args[i] }));
        break;
      }
      case 'operation':
        stack.push({ node: node.left, context: 'value' }, { node: node.right, context: 'value' });
        break;
      case 'groupOperation':
        stack.push({ node: node.value, context: context === 'any' ? 'any' : 'value' });
        break;
      case 'value':
        if (context === 'test') fail('A literal must be compared');
        break;
    }
  }
}
