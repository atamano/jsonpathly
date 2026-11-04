/**
 * Expensive-input probe for tests/hardening.test.ts. Runs in a child process
 * with a hard deadline: a regression here is an infinite loop or a blocked
 * event loop, which mocha's own timeout cannot interrupt.
 *
 * Prints one JSON line per case as soon as it finishes, so the output of a
 * killed run shows which case hung.
 */
import { JSONPathLimitError, JSONPathSyntaxError, parse, query, stringify } from '../../src';

type Outcome = 'ok' | 'limit' | 'syntax' | 'type' | 'error';

const nestedObjects = (depth: number): unknown => {
  let value: unknown = {};
  for (let i = 0; i < depth; i++) value = { a: value };
  return value;
};

const nestedArrays = (depth: number): unknown => {
  let value: unknown = 1;
  for (let i = 0; i < depth; i++) value = [value];
  return value;
};

const run = (name: string, fn: () => unknown): void => {
  const start = Date.now();
  let outcome: Outcome = 'ok';
  try {
    fn();
  } catch (e) {
    if (e instanceof JSONPathLimitError) outcome = 'limit';
    else if (e instanceof JSONPathSyntaxError) outcome = 'syntax';
    else if (e instanceof TypeError) outcome = 'type';
    else outcome = 'error';
  }
  process.stdout.write(JSON.stringify({ name, outcome, ms: Date.now() - start }) + '\n');
};

// The same node selected `times` times through a union, so a filter reads
// the same long string through @ once per duplicate. (A filter on $ alone is
// evaluated once per query.)
const dup = (times: number): string => "$['a'" + ",'a'".repeat(times - 1) + ']';

// --- parsing (used to be exponential in the nesting depth) ---
const K = 40;
run('parse: nested filters', () => parse('$[?'.repeat(K) + '@' + ']'.repeat(K)));
run('parse: nested comparisons', () => parse('$[?'.repeat(K) + '@==1' + ']'.repeat(K)));
run('parse: nested length() of filters', () => parse('$[?' + 'length($[?'.repeat(K) + '@' + '])'.repeat(K) + '>0]'));
run('parse: nested descendant filters', () => parse('$' + '..[?@'.repeat(K) + ']'.repeat(K)));
run('parse: grouped filters', () => {
  let e = '@';
  for (let i = 0; i < K; i++) e = '@ && ($[?' + e + '])';
  parse('$[?' + e + ']');
});
run('parse: unclosed nested filters', () => parse('$[?'.repeat(K) + '@'));
run('parse: unclosed negations', () => parse('$[?' + '!('.repeat(K) + '@'));
run('parse: unclosed groups of filters', () => parse('$[?('.repeat(K) + '@'));
run('parse: fractional slice step', () => query([0, 1], '$[1:2:1e-100]'));

// --- subqueries on $ (evaluated once per query) ---
run('eval: $[?$..x] over 20,000 elements', () =>
  query(
    Array.from({ length: 20_000 }, (_, i) => ({ x: i })),
    '$[?$..x]',
  ),
);
run('eval: 8 nested $ filters', () => {
  let q = '$[*]';
  for (let i = 0; i < 8; i++) q = `$[?count(${q}) > 0]`;
  query(
    Array.from({ length: 100 }, (_, i) => i),
    q,
  );
});
run('eval: equality of root arrays differing at the first element', () => {
  const n = 16_000;
  query({ c: Array(n).fill(0), x: Array(n).fill(0), y: Array(n).fill(1) }, '$.c[?$.x == $.y]');
});

// --- budget (polynomial queries stop with JSONPathLimitError) ---
const chain = nestedObjects(600);
run('budget: nested descendant filters', () => query(chain, '$..[?@..[?@..a]]'));
run('budget: chained descendants', () => query(chain, '$..*..*..*.missing'));
run('budget: repeated unions', () => query(nestedArrays(40), '$' + '[0,0]'.repeat(40)));
run('budget: in over a large nodelist', () =>
  query(
    Array.from({ length: 30_000 }, (_, i) => ({ x: i })),
    '$[?@ in $..*]',
  ),
);
run('budget: wildcard union charged before allocation', () =>
  query(Array(4000).fill(0), '$[' + Array(4000).fill('*').join(',') + ']', { maxSteps: 1 }),
);
run('budget: union of missing names', () => {
  const n = 8000;
  query(
    Array.from({ length: n }, () => ({})),
    '$[*][' + Array(n).fill('"z"').join(',') + ']',
  );
});
run('budget: long arithmetic chain per element', () => {
  const n = 16_000;
  query(Array(n).fill(0), '$[?@ + ' + Array(n).fill('1').join('+') + ' > 0]');
});
run('eval: long arithmetic chain without @, once per query', () => {
  const n = 16_000;
  query(Array(n).fill(0), '$[?' + Array(n).fill('1').join('+') + ' > 0]');
});
run('budget: long && chain per element', () => {
  const n = 16_000;
  query(Array(n).fill(0), '$[?' + Array(n).fill('@ == 0').join(' && ') + ']');
});
run('budget: many function arguments per element', () => {
  const n = 16_000;
  query(Array(n).fill(0), '$[?length(' + Array(n).fill('@').join(', ') + ') > 0]');
});
run('eval: length() of a wide root object, once per query', () => {
  const doc = Object.fromEntries(Array.from({ length: 8000 }, (_, i) => ['k' + i, 0]));
  query(doc, '$[?length($) > 0]');
});
run('budget: search() over a long string', () => {
  const n = 16_000;
  query({ a: { s: 'a'.repeat(n) } }, dup(n) + '[?search(@, "z")]');
});
run('budget: =~ over a long string', () => {
  const n = 16_000;
  query({ a: { s: 'a'.repeat(n) } }, dup(n) + '[?@ =~ /z/]');
});
for (const op of ['<', '==']) {
  run(`budget: ${op} on long strings`, () => {
    const n = 256_000;
    query({ a: { s: 'a'.repeat(n) + 'b' }, t: 'a'.repeat(n) + 'c' }, dup(20_000) + `[?@ ${op} $.t]`);
  });
}
run('budget: cyclic object', () => {
  const cyclic: Record<string, unknown> = { a: {} };
  (cyclic.a as Record<string, unknown>).b = cyclic;
  query(cyclic, '$..x');
});
run('budget: cyclic object with a long key', () => {
  const cyclic: Record<string, unknown> = {};
  cyclic['a'.repeat(100_000)] = cyclic;
  query(cyclic, '$..missing');
});

// --- round 2: work done before or outside the budget checks ---
run('budget: descendants of a 1,000,000-element array', () =>
  query(Array(1_000_000).fill(0), '$..missing', { maxSteps: 1 }),
);
run('budget: regex with many live threads', () => {
  const pattern = 'a?'.repeat(450) + 'z';
  query({ a: { s: 'a'.repeat(1000) } }, dup(1000) + `[?search(@, "${pattern}")]`);
});
run('budget: match() over a long string', () => {
  const n = 16_000;
  query({ a: { s: 'a'.repeat(n) } }, dup(n) + '[?match(@, "a*z")]');
});
run('eval: long member name selected many times', () => {
  const key = 'a'.repeat(1000);
  query({ [key]: 0 }, '$[' + Array(5000).fill('*').join(',') + ']');
});
// A member name over the limit (1,000 characters) met while enumerating.
run('budget: member name longer than the limit', () => {
  const key = 'a'.repeat(1001);
  query({ [key]: 0 }, '$[' + Array(5000).fill('*').join(',') + ']');
});
run('budget: in over long strings', () => {
  const n = 300_000;
  query({ a: { s: 'a'.repeat(n) + 'b' }, l: ['a'.repeat(n) + 'c'] }, dup(20_000) + '[?@ in $.l]');
});
run('budget: subsetof over long equal strings', () => {
  const n = 300_000;
  query({ a: { l: ['a'.repeat(n) + 'b'] }, r: [['a'.repeat(n), 'b'].join('')] }, dup(2000) + '[?@ subsetof $.r]');
});
run('budget: in over a sparse array', () => query({ x: new Array(2 ** 32 - 1) }, '$[?0 in @]', { maxSteps: 10 }));
run('budget: wildcard over a sparse array', () => query(new Array(2 ** 32 - 1), '$[*]', { maxSteps: 1 }));
run('budget: wildcard over a sparse array, default budget', () => query(new Array(2 ** 32 - 1), '$[*]'));
run('budget: descendants of a sparse array', () => query({ a: new Array(2 ** 32 - 1) }, '$..x'));
run('budget: hideExceptions returns no result', () => {
  const r = query(chain, '$..[?@..[?@..a]]', { hideExceptions: true, returnArray: true }) as unknown[];
  if (r.length !== 0) throw new Error('expected []');
});
run('budget: the right operand alone exceeds the budget', () => query({ a: chain }, '$[?$..[?@..[?@..a]]]'));
run('eval: false && short-circuits that operand', () => query({ a: chain }, '$[?false && $..[?@..[?@..a]]]'));
run('eval: true || short-circuits that operand', () => query({ a: chain }, '$[?true || $..[?@..[?@..a]]]'));
run('stringify: cyclic literal', () => {
  const value: unknown[] = [];
  value.push(value);
  stringify({ type: 'value', subtype: 'array', value } as never);
});
run('stringify: cyclic segment chain', () => {
  const segment: Record<string, unknown> = { type: 'subscript', value: { type: 'wildcard' } };
  segment.next = segment;
  stringify({ type: 'root', next: segment } as never);
});
run('stringify: result longer than the maximum string length', () => {
  const dot = { type: 'dot', value: { type: 'identifier', value: 'a'.repeat(2 ** 27) } };
  let next: unknown = null;
  for (let i = 0; i < 5; i++) next = { type: 'subscript', value: dot, next };
  stringify({ type: 'root', next } as never);
});

// --- round 3 ---
run('budget: regex with many empty groups', () =>
  query({ a: { s: 'a'.repeat(1000) } }, dup(1000) + '[?search(@, "(){0,990}z")]'),
);
for (const op of ['subsetof', 'anyof', 'noneof']) {
  run(`budget: ${op} with a sparse left operand`, () =>
    query({ a: new Array(2 ** 32 - 1) }, `$[?@ ${op} []]`, { maxSteps: 10 }),
  );
}
run('budget: many sparse arrays, default budget', () =>
  query(
    Array.from({ length: 200 }, () => new Array(2 ** 32 - 1)),
    '$[*][*]',
  ),
);
for (const type of ['operation', 'logicalExpression']) {
  run(`stringify: cyclic right operand of ${type}`, () => {
    const node: Record<string, unknown> = {
      type,
      operator: type === 'operation' ? 'plus' : 'and',
      left: { type: 'value', subtype: 'number', value: 1 },
    };
    node.right = node;
    stringify(node as never);
  });
}

// --- round 4 ---
const nestedLengths = '$[?' + 'length('.repeat(150) + '$' + '.x'.repeat(100_000) + ')'.repeat(150) + ' == @]';
// 800 nested calls around a 100,000-character path: classified once, not
// once per level (which took seconds).
run('eval: large query, small budget', () =>
  query([0], '$[?' + 'length('.repeat(800) + '$' + '.x'.repeat(50_000) + ')'.repeat(800) + ' == @]', {
    maxSteps: 5000,
  }),
);
run('eval: large query, default budget', () => query([0], nestedLengths));
run('parse: 400,000-character path', () => parse('$' + '.x'.repeat(200_000)));
run('parse: valid groups of filters, 20 levels', () => {
  let e = '@';
  for (let i = 0; i < 20; i++) e = '@ && ($[?' + e + '])';
  parse('$[?' + e + ']');
});

// --- round 5 ---
// Each unclosed !( used to reparse what follows it, large tokens included.
const negations = '$[?' + '!('.repeat(20);
run('parse: unclosed negations around a long string', () => parse(negations + '@ == "' + 'x'.repeat(10_000) + '"'));
run('parse: unclosed negations around a long array', () =>
  parse(negations + '@ == [' + Array(5000).fill('1').join(',') + ']'),
);
run('parse: unclosed negations around whitespace', () => parse(negations + ' '.repeat(20_000) + '@'));
run('parse: unclosed negations around a long union', () =>
  parse(negations + '@[' + Array(5000).fill("'k'").join(',') + ']'),
);
run('parse: 500 parentheses around a comparison', () =>
  parse('$[?' + '('.repeat(500) + '@==1' + ')'.repeat(500) + ']'),
);
run('parse: 5,000 conditions', () => parse('$[?' + Array(5000).fill('@.a == "xyz"').join(' && ') + ']'));
run('budget: repeated unions padded with whitespace', () => {
  let doc: unknown = 0;
  for (let i = 0; i < 24; i++) doc = [doc];
  query(doc, '$' + '[0,0]'.repeat(24) + ' '.repeat(50_000));
});
// The pattern matches at once; every call used to rescan it to build a cache key.
run('eval: long cached pattern matching at once', () =>
  query(Array(600_000).fill('x'), '$[?search(@, "' + '()'.repeat(490) + '")]'),
);

// --- round 7 ---
// Each unclosed !( reparsed its body, so a long token was scanned once per level.
run('parse: 400 unclosed negations around a long regex', () =>
  parse('$[?' + '!('.repeat(400) + '@=~/' + 'a'.repeat(1_000_000) + '/'),
);

// --- final review ---
// Cycle detection looked at enumerable values only, while the serializer reads
// every index and field: a non-enumerable cycle made it grow forever.
run('stringify: cyclic non-enumerable array element', () => {
  const arr: unknown[] = [];
  Object.defineProperty(arr, '0', { value: arr });
  stringify({ type: 'value', subtype: 'array', value: arr } as never);
});
run('stringify: cyclic non-enumerable field', () => {
  const tree = parse('$.a.b') as { next?: unknown };
  // defineProperty on an existing field keeps it enumerable: remove it first.
  delete tree.next;
  Object.defineProperty(tree, 'next', { value: tree });
  stringify(tree as never);
});
// The serializer reads fields and indices through the prototype chain; the
// cycle check only looked at own properties.
run('stringify: cyclic inherited array element', () => {
  const arr = new Array(1) as unknown[];
  Object.setPrototypeOf(arr, Object.assign(Object.create(Array.prototype), { 0: arr }));
  stringify({ type: 'value', subtype: 'array', value: arr } as never);
});
run('stringify: cyclic inherited field', () => {
  const proto: Record<string, unknown> = {};
  const node = Object.assign(Object.create(proto), parse('$.a')) as Record<string, unknown>;
  delete node.next;
  proto.next = node;
  stringify(node as never);
});
// Weighing the document re-read the length of an array whose getter appends
// an element on every read, so it never finished.
run('budget: array growing while the document is weighed', () => {
  const arr: unknown[] = [];
  const grow = (): number => {
    Object.defineProperty(arr, arr.length, { get: grow });
    return 0;
  };
  Object.defineProperty(arr, 0, { get: grow });
  query({ s: 'x'.repeat(1_000_001), arr }, '$[?@ == $.s]');
});
// Cycles are now detected as links are read, each exactly once: a check made
// beforehand read the AST again, and getters could change it in between.
run('stringify: AST growing its prototype chain under a getter', () => {
  const ast: Record<string, unknown> = { type: 'identifier' };
  let tail = ast;
  Object.defineProperty(ast, 'value', {
    enumerable: true,
    get() {
      const p = { value: 'a' };
      Object.setPrototypeOf(tail, p);
      tail = p;
      return 'a';
    },
  });
  stringify(ast as never);
});
run('stringify: segment link read once', () => {
  const ast = parse('$.a') as { next: Record<string, unknown> };
  const segment = ast.next;
  let reads = 0;
  Object.defineProperty(segment, 'next', { get: () => (++reads === 1 ? null : segment) });
  stringify(ast as never);
});
run('stringify: function arguments appended by a getter', () => {
  const args: unknown[] = [];
  const zero = {
    type: 'value',
    subtype: 'number',
    get value() {
      args.push(zero);
      return 0;
    },
  };
  args.push(zero);
  stringify({ type: 'functionCall', name: 'length', args } as never);
});
run('stringify: literal array with a throwing inherited index', () => {
  const arr = Object.setPrototypeOf(
    new Array(1),
    Object.create(Array.prototype, {
      0: {
        get() {
          throw new Error('inherited index');
        },
      },
    }),
  ) as unknown[];
  stringify({ type: 'value', subtype: 'array', value: arr } as never);
});
run('budget: member deleted while the document is weighed', () => {
  const obj = Object.setPrototypeOf(
    {
      get a() {
        Reflect.deleteProperty(this, 'b');
        return 0;
      },
      b: 0,
    },
    Object.create(null, {
      b: {
        get() {
          throw new Error('inherited b');
        },
      },
    }),
  );
  query({ s: 'x'.repeat(1_000_001), obj }, '$[?@ == $.s]');
});
// A Proxy can report any length; a loop over an infinite one never ended.
run('stringify: literal array with an infinite length', () => {
  const arr = new Proxy([], { get: (t, k, r) => (k === 'length' ? Infinity : Reflect.get(t, k, r)) });
  stringify({ type: 'value', subtype: 'array', value: arr } as never);
});
// Weighing the document trusted a Proxy's infinite length and pushed forever.
run('budget: array with an infinite length while the document is weighed', () => {
  const descriptor = { configurable: true, value: 0 };
  const arr = new Proxy([], {
    get: (_, key) => (key === 'length' ? Infinity : 0),
    getOwnPropertyDescriptor: () => descriptor,
  });
  query({ s: 'x'.repeat(1_000_001), arr }, '$[?@ == $.s]');
});
// Every element of a literal array used to be queued before any was looked at:
// a cycle at index 0 of a huge sparse array exhausted the heap first.
run('stringify: cyclic sparse literal array of maximal length', () => {
  const arr: unknown[] = new Array(2 ** 32 - 1);
  arr[0] = arr;
  stringify({ type: 'value', subtype: 'array', value: arr } as never);
});
// V8 hashes a number by its value: numbers chosen to share a bucket made each
// Set insertion walk a chain, quadratic work for one charged step each.
const undo = (x: number, shift: number): number => {
  let y = x;
  for (let s = shift; s < 32; s += shift) y ^= x >>> s;
  return y;
};
const colliding = (i: number): number => {
  let x = undo(i << 16, 16);
  x = undo(Math.imul(x, -924973511), 4);
  x = undo(Math.imul(x, -858993459), 12);
  return Math.imul(x + 1, -1073774593);
};
const collidingDoc = JSON.parse(JSON.stringify([Array.from({ length: 120_000 }, (_, i) => colliding(i))]));
run('budget: numbers chosen to collide in a set operand', () => {
  query(collidingDoc, '$[?[0] subsetof @ && [0] anyof @ && @ noneof [0]]');
});
// Strings longer than 16,383 characters all hash alike in V8: a Set or Map of
// many such strings of one length is a list with a full comparison per entry.
const longWords = (n: number): string[] =>
  Array.from({ length: n }, (_, i) => 'x'.repeat(20_000 - 8) + i.toString(16).padStart(8, '0'));
// Fixtures are built outside the timed runs: building them is not the query's work.
const longWordList = longWords(3000);
run('budget: long strings of one length in a set operand', () => {
  query([longWordList], '$[?[0] subsetof @ && ["' + longWordList[2999] + '"] subsetof @]', {
    maxSteps: 3000 * 20_001 * 2 + 100,
  });
});
// 16,383-character values become 16,384-character tagged keys, the first length V8 hashes by length only.
const boundaryWords = Array.from({ length: 4000 }, (_, i) => 'x'.repeat(16_375) + String(i).padStart(8, '0'));
run('budget: strings at the hashing boundary in a set operand', () => {
  query([boundaryWords], '$[?[] subsetof @]', { maxSteps: 4000 * 16_384 + 10 });
});
// Member names over the limit in a query are syntax errors.
const longSelectorNames = Array.from({ length: 400 }, (_, i) => 'x'.repeat(993) + String(i).padStart(8, '0'));
run('parse: many member names over the limit as selectors', () => {
  query({}, '$[' + longSelectorNames.map((k) => JSON.stringify(k)).join(',') + ']');
});
run('parse: object literal with member names over the limit', () => {
  parse('$[?@ == {' + longSelectorNames.map((k) => JSON.stringify(k) + ':0').join(',') + '}]');
});
