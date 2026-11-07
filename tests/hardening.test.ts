/**
 * Hardening Tests
 *
 * Queries and documents often come from untrusted input. These tests pin down
 * that a query only sees the document's own members, that its cost stays
 * bounded (parse time, evaluation steps), and that deep nesting yields a
 * result or a jsonpathly error instead of a RangeError.
 */
import { expect } from 'chai';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { JSONPathLimitError, JSONPathSyntaxError, parse, paths, query, stringify } from '../src';

const nestedArrays = (depth: number): unknown => {
  let value: unknown = 1;
  for (let i = 0; i < depth; i++) value = [value];
  return value;
};

const nestedObjects = (depth: number): unknown => {
  let value: unknown = {};
  for (let i = 0; i < depth; i++) value = { a: value };
  return value;
};

type ProbeResult = { name: string; outcome: 'ok' | 'limit' | 'syntax' | 'type' | 'error'; ms: number };

// What each probe case must end with. Every case used to hang, exhaust memory
// or run for seconds to hours; now each finishes quickly with this outcome.
const EXPECTED_OUTCOMES: Record<string, ProbeResult['outcome']> = {
  'parse: nested filters': 'ok',
  'parse: nested comparisons': 'ok',
  'parse: nested count() of filters': 'ok',
  'parse: nested descendant filters': 'ok',
  'parse: grouped filters': 'ok',
  'parse: unclosed nested filters': 'syntax',
  'parse: unclosed negations': 'syntax',
  'parse: unclosed groups of filters': 'syntax',
  'parse: fractional slice step': 'syntax',
  'eval: $[?$..x] over 20,000 elements': 'ok',
  'eval: 8 nested $ filters': 'ok',
  'eval: equality of root arrays differing at the first element': 'ok',
  'budget: nested descendant filters': 'limit',
  'budget: chained descendants': 'limit',
  'budget: repeated unions': 'limit',
  'budget: in over a large nodelist': 'limit',
  'budget: wildcard union charged before allocation': 'limit',
  'budget: union of missing names': 'limit',
  'budget: long arithmetic chain per element': 'limit',
  'eval: long arithmetic chain without @, once per query': 'ok',
  'budget: long && chain per element': 'limit',
  // Rejected by the arity check before any evaluation.
  'budget: many function arguments per element': 'syntax',
  'eval: length() of a wide root object, once per query': 'ok',
  'budget: search() over a long string': 'limit',
  'budget: =~ over a long string': 'limit',
  'budget: < on long strings': 'limit',
  'budget: == on long strings': 'limit',
  'budget: cyclic object': 'limit',
  'budget: cyclic object with a long key': 'limit',
  'budget: descendants of a 1,000,000-element array': 'limit',
  'budget: regex with many live threads': 'limit',
  'budget: match() over a long string': 'limit',
  'eval: long member name selected many times': 'ok',
  'budget: member name longer than the limit': 'limit',
  'budget: in over long strings': 'limit',
  'budget: subsetof over long equal strings': 'limit',
  'budget: in over a sparse array': 'limit',
  'budget: wildcard over a sparse array': 'limit',
  'budget: wildcard over a sparse array, default budget': 'limit',
  'budget: descendants of a sparse array': 'limit',
  'budget: hideExceptions returns no result': 'ok',
  'budget: the right operand alone exceeds the budget': 'limit',
  'eval: false && short-circuits that operand': 'ok',
  'eval: true || short-circuits that operand': 'ok',
  'stringify: cyclic literal': 'type',
  'stringify: cyclic segment chain': 'type',
  'stringify: result longer than the maximum string length': 'limit',
  'budget: regex with many empty groups': 'limit',
  'budget: subsetof with a sparse left operand': 'limit',
  'budget: anyof with a sparse left operand': 'limit',
  'budget: noneof with a sparse left operand': 'limit',
  'budget: many sparse arrays, default budget': 'limit',
  'stringify: cyclic right operand of operation': 'type',
  'stringify: cyclic right operand of logicalExpression': 'type',
  'eval: large query, small budget': 'ok',
  'eval: large query, default budget': 'ok',
  'parse: 400,000-character path': 'ok',
  'parse: valid groups of filters, 20 levels': 'ok',
  'parse: unclosed negations around a long string': 'syntax',
  'parse: unclosed negations around a long array': 'syntax',
  'parse: unclosed negations around whitespace': 'syntax',
  'parse: unclosed negations around a long union': 'syntax',
  'parse: 500 parentheses around a comparison': 'ok',
  'parse: 5,000 conditions': 'ok',
  'budget: repeated unions padded with whitespace': 'limit',
  'eval: long cached pattern matching at once': 'ok',
  'parse: 400 unclosed negations around a long regex': 'syntax',
  'stringify: cyclic non-enumerable array element': 'type',
  'stringify: cyclic non-enumerable field': 'type',
  'stringify: cyclic inherited array element': 'ok',
  'stringify: cyclic inherited field': 'type',
  'budget: array growing while the document is weighed': 'ok',
  'stringify: AST growing its prototype chain under a getter': 'ok',
  'stringify: segment link read once': 'ok',
  'stringify: function arguments appended by a getter': 'ok',
  'stringify: literal array with a throwing inherited index': 'ok',
  'budget: member deleted while the document is weighed': 'ok',
  'stringify: literal array with an infinite length': 'type',
  'budget: array with an infinite length while the document is weighed': 'type',
  'stringify: cyclic sparse literal array of maximal length': 'type',
  'budget: numbers chosen to collide in a set operand': 'ok',
  'budget: long strings of one length in a set operand': 'ok',
  'budget: strings at the hashing boundary in a set operand': 'ok',
  'parse: many member names over the limit as selectors': 'syntax',
  'parse: object literal with member names over the limit': 'syntax',
};

// Generous for a loaded CI runner; the regressions take seconds to forever.
const CASE_LIMIT_MS = 5_000;

describe('hardening', () => {
  it('parses in work linear in the nesting depth (instrumented parser)', () => {
    const script = path.join(__dirname, '..', 'scripts', 'check-parser-linearity.mjs');
    const child = spawnSync(process.execPath, [script], { encoding: 'utf8', timeout: 120_000 });
    expect(child.status, child.stdout + child.stderr).to.equal(0);
  }).timeout(130_000);

  it('parses a long filter within a small heap (child process)', () => {
    // Needs under 160 MiB; memoizing every filter rule needed over 320 MiB.
    const probe = path.join(__dirname, 'fixtures', 'parse-memory-probe.ts');
    const child = spawnSync(
      process.execPath,
      ['--max-old-space-size=256', '-r', 'ts-node/register/transpile-only', probe],
      { encoding: 'utf8', timeout: 120_000 },
    );
    expect(child.stdout.trim(), child.stderr.slice(-500)).to.equal('ok');
  }).timeout(130_000);

  describe('only own members are visible', () => {
    it('does not return Object.prototype or its members', () => {
      expect(query({ a: 1 }, '$.__proto__')).to.equal(undefined);
      expect(query({ a: 1 }, "$['__proto__']")).to.equal(undefined);
      expect(query({}, '$.constructor')).to.equal(undefined);
      expect(query({}, "$['toString']")).to.equal(undefined);
      expect(query({}, '$.hasOwnProperty')).to.equal(undefined);
      expect(query({}, "$['__proto__','constructor']")).to.deep.equal([]);
      expect(query({ b: {} }, '$..constructor')).to.deep.equal([]);
      expect(paths({}, '$.toString')).to.deep.equal([]);
    });

    it('does not let a caller reach Object.prototype through a result', () => {
      const result = query({ a: 1 }, '$.__proto__', { returnArray: true }) as unknown[];
      expect(result).to.deep.equal([]);
      expect(Object.prototype).to.not.have.property('polluted');
    });

    it('does not treat inherited members as existing in filters', () => {
      expect(query([{}, { toString: 1 }], '$[?@.toString]')).to.deep.equal([{ toString: 1 }]);
      expect(query([{}], '$[?@.constructor]')).to.deep.equal([]);
      expect(query([{}], '$[?@.constructor == $[0].constructor]')).to.deep.equal([{}]);
    });

    it('still reads own members named like Object.prototype members', () => {
      const doc = JSON.parse('{"__proto__":{"x":1},"constructor":2,"toString":3}');
      expect(query(doc, "$['__proto__'].x")).to.equal(1);
      expect(query(doc, '$.constructor')).to.equal(2);
      expect(query(doc, '$.toString')).to.equal(3);
      expect(query({ 2: 'two' }, "$['2']")).to.equal('two');
      expect(query([[0, 5]], '$[0][1]')).to.equal(5);
      expect(paths([[0, 5]], '$[0][1]')).to.deep.equal(['$[0][1]']);
    });

    it('does not return array elements inherited from a prototype', () => {
      // An array whose (non-standard) prototype supplies index 0.
      const proto = Object.create(Array.prototype);
      proto[0] = Object.prototype;
      const arr = Object.setPrototypeOf(new Array(1), proto) as unknown[];
      expect(arr[0]).to.equal(Object.prototype);
      expect(query(arr, '$[0]')).to.equal(undefined);
      expect(query(arr, '$[-1]')).to.equal(undefined);
      expect(query(arr, '$[*]')).to.deep.equal([]);
      expect(query(arr, '$..*')).to.deep.equal([]);
      expect(query(arr, '$[?@]')).to.deep.equal([]);
      // Unions and slices read holes as undefined; an inherited element is treated as a hole.
      expect(query(arr, '$[0,0]')).to.deep.equal([undefined, undefined]);
      expect(query(arr, '$[0:1]')).to.deep.equal([undefined]);
      expect(paths(arr, '$[*]')).to.deep.equal([]);
      expect(Object.prototype).to.not.have.property('polluted');
    });

    it('reads inherited array elements as holes in operands, functions and literals', () => {
      const proto = Object.assign(Object.create(Array.prototype), { 0: 7 });
      const inherited = Object.setPrototypeOf(new Array(1), proto) as unknown[];
      const hole = new Array(1) as unknown[];
      expect(inherited[0]).to.equal(7);
      for (const q of [
        '$[?7 in @]',
        '$[?7 nin @]',
        '$[?[7] subsetof @]',
        '$[?@ subsetof [7]]',
        '$[?[7] anyof @]',
        '$[?[7] noneof @]',
        '$[?@ == [7]]',
        '$[?value(@) == 7]',
        '$[?@[0] == 7]',
        '$[?@[-1:] anyof [7]]',
        '$[?length(@) == 1]',
      ]) {
        // Same selection as for a hole (the selected candidate is the array itself,
        // which JSON.stringify and deep-equal would read through its prototype).
        expect(query([inherited], q), q).to.have.length((query([hole], q) as unknown[]).length);
      }
      expect(query([inherited], '$[?value(@) == 7]')).to.deep.equal([]);
      expect(query(inherited, '$[0]')).to.equal(undefined);
      const literal = (value: unknown): never => ({ type: 'value', subtype: 'array', value } as never);
      expect(stringify(literal(inherited))).to.equal(stringify(literal(hole)));
    });

    it('does not return a member deleted by a getter visited before it', () => {
      // The own "__proto__" member is deleted while `a` is read, which uncovers Object.prototype.
      const make = (): object => ({
        get a() {
          Reflect.deleteProperty(this, '__proto__');
          return 0;
        },
        ['__proto__']: 1,
      });
      expect(Object.keys(make())).to.deep.equal(['a', '__proto__']);
      for (const q of ['$.*', '$[*]', '$[?@]', '$..*', '$..[?@]', "$['a','__proto__']"]) {
        expect(query(make(), q), q).to.deep.equal([0]);
      }
      expect(paths(make(), '$.*')).to.deep.equal(["$['a']"]);
      // Equality rechecks ownership of each member as it reads it.
      const right = { toString: 0 };
      const left = {
        get toString() {
          Reflect.deleteProperty(right, 'toString');
          return Object.prototype.toString;
        },
      };
      expect(query([{ left, right }], '$[?@.left == @.right]')).to.deep.equal([]);
      // Weighing the document (triggered by the long comparison) skips it too.
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
      const s = 'x'.repeat(10_000_001);
      expect(query({ s, obj }, '$[?@ == $.s]')).to.deep.equal([s]);
    });

    it('reads an array length or a scalar AST field once per operation', () => {
      // A Proxy whose length grows on every read: the first read decides.
      const counting = (): unknown[] => {
        let reads = 0;
        return new Proxy([7, 8], {
          get(target, key, receiver) {
            return key === 'length' ? ++reads : Reflect.get(target, key, receiver);
          },
        });
      };
      expect(query(counting(), '$[1]')).to.equal(undefined);
      expect(query(counting(), '$[0]')).to.equal(7);
      expect(query([{ a: counting(), b: [7] }], '$[?@.a == @.b]')).to.have.length(1);
      // stringify reads each scalar field once.
      let reads = 0;
      const slice = {
        type: 'slices',
        get start() {
          return ++reads;
        },
        end: null,
        step: null,
      };
      expect(stringify(slice as never)).to.equal('1:');
      let operators = ['eq', 'ne'];
      const comparator = {
        type: 'comparator',
        get operator() {
          return operators.shift();
        },
        left: { type: 'value', subtype: 'number', value: 1 },
        right: { type: 'value', subtype: 'number', value: 1 },
      };
      expect(stringify(comparator as never)).to.equal('1 == 1');
      operators = ['empty', 'eq'];
      expect(stringify(comparator as never)).to.equal('1 empty');
    });

    it('rejects an array whose reported length is not a valid one', () => {
      // Only a Proxy can report such a length; trusting it meant endless loops.
      const infinite = (): unknown[] =>
        new Proxy([], { get: (t, k, r) => (k === 'length' ? Infinity : Reflect.get(t, k, r)) });
      // Rejected before any element is visited: a tiny budget is never reached.
      for (const q of ['$[*]', '$[0]', '$[0:]', '$..*', '$[?@ == 0]']) {
        expect(() => query(infinite(), q, { maxSteps: 10 }), q).to.throw(TypeError, /array length/);
      }
      // 2^32 - 1 is the largest valid array length.
      const tooLong = new Proxy([7], { get: (t, k, r) => (k === 'length' ? 2 ** 32 : Reflect.get(t, k, r)) });
      expect(() => query(tooLong, '$[0]')).to.throw(TypeError, /array length/);
      for (const q of [
        '$[?1 in @]',
        '$[?@ subsetof [1]]',
        '$[?[1] anyof @]',
        '$[?@ == [1]]',
        '$[?[] == @]',
        '$[?length(@) > 0]',
        '$[?value(@[*]) == 1]',
        '$[?@ sizeof @]',
        '$[?@ size 1]',
        '$[?@ empty]',
      ]) {
        expect(() => query([infinite()], q, { maxSteps: 10 }), q).to.throw(TypeError, /array length/);
      }
      expect(query(infinite(), '$[*]', { hideExceptions: true })).to.equal(undefined);
      const literal = { type: 'value', subtype: 'array', value: infinite() };
      expect(() => stringify(literal as never)).to.throw(TypeError, /array length/);
      const notAString = new Proxy({}, { get: (_, k) => (k === 'length' ? Infinity : '') });
      for (const ast of [
        { type: 'stringLiteral', value: notAString },
        { type: 'identifier', value: 42 },
        { type: 'functionCall', name: 42, args: [] },
        { type: 'value', subtype: 'regex', value: 42, opts: 'i' },
        { type: 'value', subtype: 'regex', value: '/a/', opts: 7 },
        { type: 'value', subtype: 'string', value: 42 },
      ]) {
        expect(() => stringify(ast as never), JSON.stringify(ast)).to.throw(TypeError, /string/);
      }
      const leaf = { type: 'current', next: null };
      for (const ast of [
        { type: 'comparator', operator: 42, left: leaf, right: leaf },
        { type: 'comparator', operator: 'constructor', left: leaf, right: leaf },
        { type: 'operation', operator: 'and', left: leaf, right: leaf },
        { type: 'logicalExpression', operator: 'plus', left: leaf, right: leaf },
        { type: 42 },
        { type: 'value', subtype: 42, value: 1 },
      ]) {
        expect(() => stringify(ast as never), JSON.stringify(ast)).to.throw(TypeError);
      }
      // Scalar payloads are checked too: JSON.stringify or String() would serialize anything.
      const proxied = new Proxy([7], { get: (t, k, r) => (k === 'length' ? 1.5 : Reflect.get(t, k, r)) });
      for (const ast of [
        { type: 'value', subtype: 'number', value: proxied },
        { type: 'value', subtype: 'number', value: '1' },
        { type: 'value', subtype: 'boolean', value: 1 },
        { type: 'value', subtype: 'null', value: 0 },
        { type: 'numericLiteral', value: '1' },
        { type: 'slices', start: '1', end: null, step: null },
        { type: 'slices', start: null, end: null, step: [1] },
      ]) {
        expect(() => stringify(ast as never), JSON.stringify(ast)).to.throw(TypeError, /Expected/);
      }
      expect(stringify({ type: 'value', subtype: 'number', value: NaN } as never)).to.equal('null');
      // The rejection must not coerce the offending value: String() of a deeply
      // nested array joins it recursively.
      let nested: unknown[] = [];
      for (let i = 0; i < 10_000; i++) nested = [nested];
      for (const ast of [
        { type: 'operation', operator: nested, left: leaf, right: leaf },
        { type: 'comparator', operator: nested, left: leaf, right: leaf },
        { type: 'logicalExpression', operator: nested, left: leaf, right: leaf },
        { type: nested },
        { type: 'value', subtype: nested, value: 1 },
      ]) {
        expect(() => stringify(ast as never), 'nested field').to.throw(TypeError, /Expected a string/);
      }
    });

    it('skips non-enumerable members when enumerating, reads them when named', () => {
      // As in 3.1.0: Object.keys drives enumeration, own-property checks drive names and indices.
      const obj = Object.defineProperty({ shown: 1 }, 'hidden', { value: 7 });
      expect(query(obj, '$.hidden')).to.equal(7);
      expect(query(obj, '$.*')).to.deep.equal([1]);
      expect(query(obj, '$..*')).to.deep.equal([1]);
      expect(query(obj, '$[?@ == 7]')).to.deep.equal([]);
      expect(query([obj], '$[?length(@) == 1]')).to.have.length(1);
      const arr = Object.defineProperty([], '0', { value: 7 });
      expect(query(arr, '$[0]')).to.equal(7);
      expect(query(arr, '$[*]')).to.deep.equal([7]);
    });

    it('limits member names to 1,000 characters', () => {
      const ok = 'a'.repeat(1000);
      const long = 'a'.repeat(1001);
      // In a query: a syntax error, wherever the name appears.
      for (const q of [
        `$.${long}`,
        `$['${long}']`,
        `$['a','${long}']`,
        `$..${long}`,
        `$[?@.${long}]`,
        `$[?@ == {"${long}": 1}]`,
      ]) {
        expect(() => parse(q), q).to.throw(JSONPathSyntaxError, /Member name too long/);
      }
      expect(query({ [ok]: 1 }, `$.${ok}`)).to.equal(1);
      expect(query({ [ok]: 1 }, `$['${ok}']`)).to.equal(1);
      // In a document: a limit error once the query enumerates or compares that object...
      const doc = { b: 2, [long]: 1 };
      for (const q of ['$.*', '$..*', '$[?@ == 1]', '$[?$ == $]', "$['b','c']"]) {
        if (q === "$['b','c']") continue;
        expect(() => query(doc, q), q).to.throw(JSONPathLimitError, /Member name too long/);
      }
      expect(() => query([doc], '$[?length(@) == 2]')).to.throw(JSONPathLimitError, /Member name too long/);
      expect(() => paths(doc, '$.*')).to.throw(JSONPathLimitError, /Member name too long/);
      expect(query(doc, '$.*', { hideExceptions: true })).to.equal(undefined);
      // ...but not before: a selector that never touches the long name is fine.
      expect(query(doc, '$.b')).to.equal(2);
      expect(query(doc, "$['b','c']")).to.deep.equal([2]);
      expect(query({ a: doc, s: 'x'.repeat(10_000_001) }, '$.a.b')).to.equal(2);
    });

    it('keeps "__proto__" in an object literal as a member', () => {
      const q = '$[?@ == {"__proto__":{"injected":1}}]';
      expect(query([{}], q)).to.deep.equal([]);
      expect(query([JSON.parse('{"__proto__":{"injected":1}}')], q)).to.have.length(1);
      expect(stringify(parse(q))).to.equal("$[?(@ == {'__proto__':{'injected':1}})]");
    });
  });

  describe('indices and slices are integers', () => {
    for (const q of ['$[1:2:1e-100]', '$[0:1:0.5]', '$[0.5:1]', '$[1.5]', '$[0,1.5]', '$[1e2]', '$.1e2', '$[?@.1e2]']) {
      it(`rejects ${q}`, () => {
        expect(() => query([0, 1], q)).to.throw(JSONPathSyntaxError);
      });
    }

    it('still accepts integer indices and slices', () => {
      expect(query([0, 1, 2, 3], '$[-1]')).to.equal(3);
      expect(query([0, 1, 2, 3], '$[1:-1]')).to.deep.equal([1, 2]);
      expect(query([0, 1, 2, 3], '$[::-2]')).to.deep.equal([3, 1]);
      expect(query([0, 1, 2, 3], '$[0,-1]')).to.deep.equal([0, 3]);
      expect(query([0, 1], '$[?@ == 1.5e0 - 0.5]')).to.deep.equal([1]);
    });
  });

  it('expensive inputs finish quickly (child process with a hard timeout)', function () {
    this.timeout(150_000);
    const probe = path.join(__dirname, 'fixtures', 'hardening-probe.ts');
    const child = spawnSync(process.execPath, ['-r', 'ts-node/register/transpile-only', probe], {
      encoding: 'utf8',
      timeout: 120_000,
    });
    expect(child.signal, `probe killed after timeout; output so far:\n${child.stdout}`).to.equal(null);
    expect(child.status, child.stderr).to.equal(0);
    const results = child.stdout
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line) as ProbeResult);
    expect(results.map((r) => r.name)).to.deep.equal(Object.keys(EXPECTED_OUTCOMES));
    for (const r of results) {
      expect(r.outcome, r.name).to.equal(EXPECTED_OUTCOMES[r.name]);
      expect(r.ms, r.name).to.be.below(CASE_LIMIT_MS);
    }
  });

  describe('evaluation budget', () => {
    it('honours maxSteps and hideExceptions', () => {
      expect(() => query([1, 2, 3], '$[*]', { maxSteps: 2 })).to.throw(JSONPathLimitError);
      expect(query([1, 2, 3], '$[*]', { maxSteps: 3 })).to.deep.equal([1, 2, 3]);
      expect(query([1, 2, 3], '$[*]', { maxSteps: 2, hideExceptions: true })).to.equal(undefined);
      expect(query([1, 2, 3], '$[*]', { maxSteps: 2, hideExceptions: true, returnArray: true })).to.deep.equal([]);
      expect(() => paths([1, 2, 3], '$[*]', { maxSteps: 2 })).to.throw(JSONPathLimitError);
      expect(paths([1, 2, 3], '$[*]', { maxSteps: 2, hideExceptions: true })).to.deep.equal([]);
    });

    it('bounds the nodes a query keeps live on a small document', () => {
      // 2^k duplicates of one node: each is a step, but the memory grows with
      // the nodelist, so it is bounded separately and lower than the step floor.
      const doc = nestedArrays(40);
      // On a small document both floors are 1,000,000 and the step limit fires first.
      expect(() => query(doc, '$' + '[0,0]'.repeat(40))).to.throw(JSONPathLimitError, /1000000/);
      expect(() => paths(doc, '$' + '[0,0]'.repeat(40))).to.throw(JSONPathLimitError, /1000000/);
      // A large document justifies large nodelists.
      const wide = { a: Array.from({ length: 1_200_000 }, (_, i) => i) };
      expect(query(wide, '$..*')).to.have.length(1_200_001);
      expect(query(wide, '$.a[*]')).to.have.length(1_200_000);
      // An explicit budget bounds them on its own.
      expect(query(nestedArrays(21), '$' + '[0,0]'.repeat(21), { maxSteps: 10_000_000 })).to.have.length(2 ** 21);
      // Counted as they are produced, inside one selector too: 21 wildcards over
      // 100,000 elements would allocate 2,100,000 nodes before any check made
      // between segments, and the step budget alone allows that.
      const reads = { count: 0 };
      const array = new Proxy(
        Array.from({ length: 100_000 }, (_, i) => i),
        {
          get(target, key, receiver) {
            if (typeof key === 'string' && /^\d+$/.test(key)) reads.count++;
            return Reflect.get(target, key, receiver);
          },
        },
      );
      expect(() => query(array, '$[' + Array(21).fill('*').join(',') + ']')).to.throw(JSONPathLimitError, /retains/);
      // The query stops on the node past its limit of 2,000,020 (twenty per
      // document node); weighing the document reads its 100,000 elements once.
      expect(reads.count).to.be.at.most(2_000_021 + 100_000);
      // Twenty nodes per document node is enough for twenty wildcards over it...
      expect(
        query(
          Array.from({ length: 100_000 }, (_, i) => i),
          '$[' + Array(20).fill('*').join(',') + ']',
        ),
      ).to.have.length(2_000_000);
      // ...and for `$..*..*`, whose segments produce about eleven per node together.
      let deep: unknown = Array(100_000).fill(0);
      for (let i = 0; i < 10; i++) deep = [deep];
      expect(query(deep, '$..*..*')).to.have.length(1_000_045);
    });

    it('weighs only as much of the document as the budget needs', () => {
      // A query stopping soon after the floor must not pay a full pass over a
      // large document: element reads through a Proxy show how far weighing went.
      let reads = 0;
      const items = Array.from({ length: 300_000 }, (_, i) => ({ v: i }));
      const doc = {
        items: new Proxy(items, {
          get(target, key, receiver) {
            if (typeof key === 'string' && /^\d+$/.test(key)) reads++;
            return Reflect.get(target, key, receiver);
          },
        }),
      };
      // About 1,300,000 steps: a deficit of 300,000 needs 3,000 nodes weighed, one chunk of 10,000.
      expect(query(doc, '$.items[?@.v > 299990 && @.v < 299995]')).to.have.length(4);
      expect(reads).to.be.below(300_000 + 30_000);
    });

    it('weighs sparse arrays by their own indices, not by scanning their holes', () => {
      // A populated tail far past a million holes still counts (it used to be
      // given up on), and a 2^32-1 length array costs a bounded scan.
      const tail = Array(250_001).fill(0);
      const sparse: unknown[] = [];
      sparse[1_000_100] = tail;
      expect(query({ a: sparse, s: 'x'.repeat(1000) }, '$.a[1000100][?@ == 1]')).to.deep.equal([]);
      const start = Date.now();
      const doc = { pad: 'x'.repeat(2_000_000), unused: new Array(0xffffffff), items: Array(250_001).fill(0) };
      expect(query(doc, '$.items[?@ == 1]')).to.deep.equal([]);
      // Scanning the 4 billion holes took 13 seconds; generous for a loaded runner.
      expect(Date.now() - start).to.be.below(3000);
      // Non-canonical index-like keys ("010002") are members, not elements: they
      // must not make the element they alias weigh once more each.
      const aliased: unknown[] = [];
      aliased[10_002] = 'x'.repeat(7000);
      for (let i = 1; i <= 20; i++) (aliased as unknown as Record<string, unknown>)['0'.repeat(i) + '10002'] = 0;
      const budgetDoc = { a: aliased, items: Array(1000).fill(0) };
      const heavy = '$.items[?' + Array(250).fill('@ == 1').join(' || ') + ']';
      // About 1,250,000 steps against a document weighing about 8,000: the floor holds.
      expect(() => query(budgetDoc, heavy)).to.throw(JSONPathLimitError, / 1000000 evaluation steps/);
      // A key at 2^32 - 1 is a plain member too, outside any array's length.
      const beyond: unknown[] = new Array(10_002);
      (beyond as unknown as Record<string, unknown>)['4294967295'] = 'x'.repeat(20_000);
      expect(() => query({ a: beyond, items: Array(1000).fill(0) }, heavy)).to.throw(
        JSONPathLimitError,
        / 1000000 evaluation steps/,
      );
      // Non-enumerable own elements are elements: counted like the others.
      const hidden: unknown[] = new Array(10_002);
      Object.defineProperty(hidden, 10_001, { value: Array(250_001).fill(0) });
      expect(query({ a: hidden }, '$.a[10001][?@ == 1]')).to.deep.equal([]);
      // Weighing counts; the member-name limit applies only to objects the query enumerates.
      const unrelated = { unused: { ['x'.repeat(1001)]: 0 }, items: Array(250_001).fill(0) };
      expect(query(unrelated, '$.items[?@ == 1]')).to.deep.equal([]);
      expect(() => query(unrelated, '$.unused.*')).to.throw(JSONPathLimitError, /Member name too long/);
    });

    it('maxSteps: Infinity disables the limit', () => {
      const doc = nestedObjects(150);
      expect(query(doc, '$..[?@..[?@..a]]', { maxSteps: Infinity })).to.have.length(148);
    });

    it('charges definite segments and member names', () => {
      // Two segments plus two one-character names to escape.
      expect(() => query({ a: { b: 1 } }, '$.a.b', { maxSteps: 3 })).to.throw(JSONPathLimitError);
      expect(query({ a: { b: 1 } }, '$.a.b', { maxSteps: 4 })).to.equal(1);
    });

    it('charges the keys of compared objects', () => {
      const keys = Object.fromEntries(Array.from({ length: 2000 }, (_, i) => ['k' + i, 0]));
      const doc = { items: [0], x: { ...keys }, y: { ...keys } };
      // About 2,000 member comparisons, 4,000 keys enumerated and 9,000 key
      // characters hashed for the lookups.
      expect(() => query(doc, '$.items[?$.x == $.y]', { maxSteps: 4000 })).to.throw(JSONPathLimitError);
      expect(query(doc, '$.items[?$.x == $.y]', { maxSteps: 20_000 })).to.deep.equal([0]);
    });

    // Reads of array elements through a Proxy show how far a selection got
    // before the budget stopped it.
    const countingArray = (length: number): { array: unknown[]; reads: () => number } => {
      let reads = 0;
      const array = new Proxy(Array(length).fill(0), {
        get(target, key, receiver) {
          if (typeof key === 'string' && /^\d+$/.test(key)) reads++;
          return Reflect.get(target, key, receiver);
        },
      });
      return { array, reads: () => reads };
    };

    for (const q of ['$[*]', '$..missing', '$[?@ == 0]', '$[0:10000]']) {
      it(`${q} stops reading elements once the budget is spent`, () => {
        const { array, reads } = countingArray(10_000);
        expect(() => query(array, q, { maxSteps: 10 })).to.throw(JSONPathLimitError);
        expect(reads()).to.be.below(20);
      });
    }

    it('does not walk prototype chains for every candidate', () => {
      // Each level of the chain is a Proxy counting prototype reads through it.
      let reads = 0;
      let proto: object = Object.prototype;
      for (let i = 0; i < 400; i++) {
        proto = new Proxy(Object.create(proto), {
          getPrototypeOf(target) {
            reads++;
            return Reflect.getPrototypeOf(target);
          },
        });
      }
      const doc = Array.from({ length: 400 }, () => Object.create(proto));
      expect(query(doc, '$[?length(@) > 0]', { maxSteps: 6 * 400 })).to.deep.equal([]);
      // Deciding plainness read the whole 400-level chain per candidate: 160,000 reads.
      expect(reads).to.be.below(400 * 10);
    });

    it('does not visit elements appended during a traversal', () => {
      const growing = (): unknown[] => {
        const arr: unknown[] = [0];
        Object.defineProperty(arr, '0', {
          enumerable: true,
          get() {
            arr.push(1);
            return 0;
          },
        });
        return arr;
      };
      // forEach reads the length once; so does the budgeted iteration.
      expect(query(growing(), '$[*]')).to.deep.equal([0]);
      expect(query(growing(), '$..*')).to.deep.equal([0]);
      expect(query(growing(), '$[?@ == 0]')).to.deep.equal([0]);
      // includes(), every() and some() read it once too.
      expect(query([growing()], '$[?1 in @]')).to.deep.equal([]);
      expect(query([growing()], '$[?@ subsetof [0]]')).to.have.length(1);
      expect(query([growing()], '$[?@ anyof [1]]')).to.deep.equal([]);
      expect(query([growing()], '$[?@ noneof [1]]')).to.have.length(1);
      expect(query([growing()], '$[?[1] anyof @]')).to.deep.equal([]);
      expect(query([growing()], '$[?@ == [0]]')).to.have.length(1);
    });

    it('reads a descendant only if its parent still owns it when visited', () => {
      // A getter visited first deletes a sibling that the prototype also supplies.
      const proto = Object.assign(Object.create(Array.prototype), { 1: { x: 2 } });
      const deleting = Object.setPrototypeOf([0, { x: 1 }], proto) as unknown[];
      Object.defineProperty(deleting, 0, {
        get() {
          delete deleting[1];
          return 0;
        },
      });
      expect(query(deleting, '$..x')).to.deep.equal([]);

      // A getter visited first fills a hole that comes after it.
      const filling: unknown[] = [0, ,];
      Object.defineProperty(filling, 0, {
        get() {
          filling[1] = { x: 1 };
          return 0;
        },
      });
      expect(query(filling, '$..x')).to.deep.equal([1]);
      expect(paths(filling, '$..x')).to.deep.equal(["$[1]['x']"]);
    });

    it('runs the document getters in the order of the recursive traversal', () => {
      let n = 0;
      const doc = {
        get a() {
          return { x: ++n };
        },
        get b() {
          return { x: ++n };
        },
      };
      // Children are read when visited, not when queued in reverse.
      expect(query(doc, '$..x')).to.deep.equal([1, 2]);

      n = 0;
      const node = (): object => ({
        get a() {
          n++;
          return {
            get b() {
              return ++n;
            },
          };
        },
      });
      // Segments are applied node by node, not one segment to every node.
      expect(query([node(), node()], '$[*].a.b')).to.deep.equal([2, 4]);
    });

    it('charges the keys of each object a descendant traversal enters', () => {
      // A cycle through the first of 20,000 keys: each level used to snapshot
      // every key while charging only the one child visited.
      let snapshots = 0;
      const target: Record<string, unknown> = {};
      const doc: Record<string, unknown> = new Proxy(target, {
        ownKeys(t) {
          snapshots++;
          return Reflect.ownKeys(t);
        },
      });
      target.first = doc;
      for (let i = 0; i < 20_000; i++) target['k' + i] = i;
      expect(() => query(doc, '$..missing', { maxSteps: 500 })).to.throw(JSONPathLimitError);
      expect(snapshots).to.be.below(5);
    });

    it('charges the keys of each object a filter enters', () => {
      // Nested `$[?...]` filters over a wide object: each level used to snapshot
      // every key while charging one key at a time.
      let snapshots = 0;
      const target = Object.fromEntries(Array.from({ length: 20_000 }, (_, i) => ['k' + i, 0]));
      const doc = new Proxy(target, {
        ownKeys(t) {
          snapshots++;
          return Reflect.ownKeys(t);
        },
      });
      const q = '$[?'.repeat(100) + '@' + ']'.repeat(100);
      expect(() => query(doc, q, { maxSteps: 300 })).to.throw(JSONPathLimitError);
      expect(snapshots).to.be.below(5);
    });

    it('evaluates every operand of an arithmetic chain, as the recursive evaluator did', () => {
      // The first candidate lacks `m`; its `b` getter must still run.
      const second = { m: 0, a: 0, b: 0 };
      const doc = [
        {
          a: 0,
          get b() {
            second.b = 1;
            return 0;
          },
        },
        second,
      ];
      expect(paths(doc, '$[?@.m + @.a + @.b == 1]')).to.deep.equal(['$[1]']);
      // Same after a division by zero.
      const other = { a: 0, z: 1, b: 0 };
      const doc2 = [
        {
          a: 1,
          z: 0,
          get b() {
            other.b = 1;
            return 0;
          },
        },
        other,
      ];
      expect(paths(doc2, '$[?@.a / @.z + @.b == 1]')).to.deep.equal(['$[1]']);
    });

    it('rebuilds the Set of an operand read through @ for each candidate', () => {
      // The same array object appears twice; a getter answers differently each
      // time, as the recursive evaluator saw. Only `$` operands are built once.
      const shared = (): unknown[] => {
        let reads = 0;
        const arr: unknown[] = [];
        Object.defineProperty(arr, '0', {
          enumerable: true,
          get() {
            return ++reads;
          },
        });
        return arr;
      };
      let s = shared();
      expect(paths([s, s], '$[?[2] subsetof @]')).to.deep.equal(['$[1]']);
      s = shared();
      expect(paths([s, s], '$[?[2] anyof @]')).to.deep.equal(['$[1]']);
      s = shared();
      expect(paths([s, s], '$[?[2] noneof @]')).to.deep.equal(['$[0]']);
    });

    it('evaluates invariant groups and negations once per query', () => {
      const doc = Array(1000).fill(0);
      const arithmetic = '$[?@ == ' + '('.repeat(100) + '0' + ')'.repeat(100) + ']';
      expect(query(doc, arithmetic, { maxSteps: 10_000 })).to.have.length(1000);
      const grouped = '$[?' + '('.repeat(100) + '$' + ')'.repeat(100) + ']';
      expect(query(doc, grouped, { maxSteps: 5000 })).to.have.length(1000);
      const negated = '$[?' + '!('.repeat(100) + '$' + ')'.repeat(100) + ']'; // an even number of negations
      expect(query(doc, negated, { maxSteps: 5000 })).to.have.length(1000);
      expect(query(doc, '$[?!(!(@ == 0))]')).to.have.length(1000);
    });

    it('charges a member name once per query, found or not', () => {
      // A missing name was never charged, yet looking up a non-internalized
      // name costs native work proportional to its length for every candidate.
      const doc = Array.from({ length: 1000 }, () => ({}));
      const q = '$[?@.' + 'reviewMiss'.repeat(100) + ']';
      // 1,000 characters charged once, plus a few steps per candidate.
      expect(() => query(doc, q, { maxSteps: 2000 })).to.throw(JSONPathLimitError);
      expect(query(doc, q, { maxSteps: 10_000 })).to.deep.equal([]);
    });

    it('distinguishes numbers, strings and others in set operands', () => {
      expect(query([[1, '1', true, null]], '$[?1 in @ && "1" in @]')).to.have.length(1);
      expect(query([[1]], "$[?['1'] subsetof @]")).to.deep.equal([]);
      expect(query([['1']], '$[?[1] subsetof @]')).to.deep.equal([]);
      expect(query([[1, 2]], '$[?[1, 2] subsetof @ && [3] noneof @ && [2, 5] anyof @]')).to.have.length(1);
      expect(query([[true, null]], '$[?[true, null] subsetof @ && ["true", "null"] noneof @]')).to.have.length(1);
      expect(query([[-0]], '$[?[0] subsetof @]')).to.have.length(1);
      // Strings too long for V8 to hash are compared one by one.
      const long = 'y'.repeat(20_000);
      const other = 'y'.repeat(19_999) + 'z';
      expect(
        query([[long, 1]], `$[?["${long}"] subsetof @ && ["${other}"] noneof @ && ["${long}", 2] anyof @]`),
      ).to.have.length(1);
      expect(query([[long]], `$[?["${other}"] subsetof @]`)).to.deep.equal([]);
      expect(query([[long]], `$[?"${long}" in @ && "${other}" nin @]`)).to.have.length(1);
    });

    it('settles equality on a key missing on the right before reading the left', () => {
      // As the recursive evaluator did: the left getter must not run.
      const later = { left: { a: 0 }, right: { a: 1 } };
      const first = {
        left: {
          get a() {
            later.left.a = 1;
            return 1;
          },
        },
        right: { b: 1 },
      };
      expect(paths([first, later], '$[?@.left == @.right]')).to.deep.equal([]);
    });

    it('indexes a $ operand of subsetof, anyof and noneof once per query', () => {
      // Documented memoization: the Set of `$.allowed` is built once, so a getter
      // changing that array while the query runs is not seen by later candidates.
      const allowed = [1];
      const doc = {
        allowed,
        items: [
          { tags: [1] },
          {
            get tags() {
              allowed[0] = 2;
              return [2];
            },
          },
        ],
      };
      expect(paths(doc, '$.items[?@.tags subsetof $.allowed]')).to.deep.equal(["$['items'][0]"]);
    });

    it('does not cache a pattern as invalid when compiling it overflowed the stack', () => {
      // Compiled under 800 nested calls, the pattern's compiler may run out of
      // stack: that is a limit error for this query, not an invalid pattern for
      // every later query.
      const pattern = '('.repeat(490) + 'a' + ')'.repeat(490);
      const test = `search(@, ${JSON.stringify(pattern)})`;
      const deep = '$[?' + '('.repeat(800) + test + ')'.repeat(800) + ']';
      try {
        expect(query(['a'], deep)).to.deep.equal(['a']);
      } catch (e) {
        expect(e).to.be.instanceOf(JSONPathLimitError);
      }
      expect(query(['a'], `$[?${test}]`)).to.deep.equal(['a']);
    });

    it('keeps one Set per comparator site, not per array alone', () => {
      // Two `$` operands yield the same array; a getter changes it in between.
      const shared = [1];
      const doc = {
        items: [[1]],
        a: shared,
        get b() {
          shared[0] = 2;
          return shared;
        },
      };
      expect(paths(doc, '$.items[?@ subsetof $.a && [2] subsetof $.b]')).to.deep.equal(["$['items'][0]"]);
    });

    it('scales with the document for linear queries', () => {
      const doc = { a: Array.from({ length: 300_000 }, (_, i) => ({ b: i, c: [i] })) };
      expect(query(doc, '$..c[0]')).to.have.length(300_000);
      expect(query(doc, '$.a[?@.b >= 0 && @.c[0] >= 0].b')).to.have.length(300_000);
    });

    it('weighs strings by their length for linear string work', () => {
      const n = 2_000_000;
      const doc = { items: Array(10).fill(0), s: 'a'.repeat(n), t: ['a'.repeat(n - 1), 'a'].join('') };
      // 10 comparisons of 2,000,000 characters exceed the 1,000,000 floor.
      expect(query(doc, '$.items[?$.s == $.t]')).to.have.length(10);
      expect(query(doc, '$.items[?$.s =~ /^a+$/]')).to.have.length(10);
    });

    it('charges nothing for strings settled by their length', () => {
      const n = 300_000;
      const doc = { items: Array(n).fill(0), s: 'a'.repeat(n), t: 'a'.repeat(n + 1) };
      expect(query(doc, '$.items[?$.s != $.t]')).to.have.length(n);
    });

    it('charges a regex by the work it does, not the subject length', () => {
      const n = 300_000;
      const doc = { items: Array(n).fill(0), s: 'a'.repeat(n) };
      expect(query(doc, '$.items[?search($.s, "")]')).to.have.length(n);
      expect(query(doc, '$.items[?search($.s, "a")]')).to.have.length(n);
      expect(query(doc, '$.items[?$.s =~ /a/]')).to.have.length(n);
    });

    it('evaluates subexpressions that do not read @ once per query', () => {
      const n = 300_000;
      const doc = { items: Array(n).fill(0), s: 'a'.repeat(n), t: 'b'.repeat(n), l: ['a'.repeat(n)] };
      for (const q of [
        '$.items[?$.s != $.t]',
        '$.items[?$.s < $.t]',
        '$.items[?$.s == $.s]',
        '$.items[?$.l noneof []]',
      ]) {
        expect(query(doc, q), q).to.have.length(n);
      }
      // @ inside a nested filter belongs to that filter: the outer test is still per query.
      expect(query({ a: [1, 2], b: [{ x: 1 }] }, '$.a[?$.b[?@.x == 1]]')).to.deep.equal([1, 2]);
      // ...while a test reading the outer @ is evaluated per candidate.
      expect(query({ a: [1, 2], b: [1] }, '$.a[?@ in $.b]')).to.deep.equal([1]);
      expect(query([{ v: 1 }, { v: 2 }], '$[?length(@) == 1 && @.v > 1]')).to.deep.equal([{ v: 2 }]);
      // Logical chains and negations without @ as well: a few steps per
      // candidate, where 100 terms x 1,000 candidates would be 100,000.
      // `$` is a true test and `$.no` a false one, neither reading @.
      const many = Array(1000).fill(0);
      expect(query(many, '$[?' + Array(100).fill('$').join(' && ') + ']', { maxSteps: 5000 })).to.have.length(1000);
      expect(query(many, '$[?!(' + Array(100).fill('$.no').join(' || ') + ')]', { maxSteps: 5000 })).to.have.length(
        1000,
      );
      // ...including as the prefix of a chain whose last term reads @ (about
      // 8 steps per candidate; 100 per candidate without the memo).
      const andPrefix = '$[?' + Array(100).fill('$').join(' && ') + ' && @ == 0]';
      expect(query(many, andPrefix, { maxSteps: 10_000 })).to.have.length(1000);
      const orPrefix = '$[?' + Array(100).fill('$.no').join(' || ') + ' || @ == 1]';
      expect(query(many, orPrefix, { maxSteps: 10_000 })).to.have.length(0);
      // A wholly invariant chain stays iterative.
      expect(query([0], '$[?' + Array(10_000).fill('$').join(' && ') + ']')).to.deep.equal([0]);
    });

    it('charges regex states without input', () => {
      expect(() => query(['x'], '$[?search(@, "(){0,990}z")]', { maxSteps: 100 })).to.throw(JSONPathLimitError);
    });

    it('charges regex validation once per query, not per candidate', () => {
      // A pattern no other test uses; the lookahead makes it invalid, so only
      // the I-Regexp validation scan runs (about 900 steps).
      const pattern = 'q'.repeat(880) + String(Date.now()) + '(?=x)';
      const q = `$[?match(@, "${pattern}")]`;
      expect(() => query([''], q, { maxSteps: 500 })).to.throw(JSONPathLimitError);
      // Cold, then warm (found among the cached copies, compared once per
      // query): 2,000 candidates cost a few steps each, not 900.
      const doc = Array(2000).fill('');
      for (let i = 0; i < 2; i++) expect(query(doc, q, { maxSteps: 30_000 })).to.deep.equal([]);
    });

    it('charges regex compilation once per query, not per candidate', () => {
      const pattern = 'q'.repeat(880) + String(Date.now());
      // Validates and compiles for search() (flag u).
      expect(query([''], `$[?search(@, "${pattern}")]`)).to.deep.equal([]);
      // Validation is cached, but =~ compiles without the u flag: about 900
      // steps to find the validation and 900 to compile.
      const reg = `$[?@ =~ /${pattern}/]`;
      expect(() => query([''], reg, { maxSteps: 1500 })).to.throw(JSONPathLimitError);
      const doc = Array(2000).fill('');
      for (let i = 0; i < 2; i++) expect(query(doc, reg, { maxSteps: 30_000 })).to.deep.equal([]);
      // Warm: the pattern is still compared once with its cached validation and
      // once with its cached program, about 900 steps each.
      expect(() => query([''], reg, { maxSteps: 1500 })).to.throw(JSONPathLimitError);
      expect(query([''], reg, { maxSteps: 2500 })).to.deep.equal([]);
    });

    it('charges a regex that matches at once', () => {
      const doc = Array(5).fill('x');
      expect(query(doc, '$[?search(@, "")]')).to.deep.equal(doc);
      // About 25 steps, one per element of which is the matcher reaching its
      // match state at once; without that charge it would fit in 20.
      expect(() => query(doc, '$[?search(@, "")]', { maxSteps: 22 })).to.throw(JSONPathLimitError);
      expect(query(doc, '$[?search(@, "")]', { maxSteps: 30 })).to.deep.equal(doc);
    });

    it('extracts a =~ pattern from its literal once, not per candidate', () => {
      // A new substring per evaluation was hashed again in full by the caches.
      const literal = '/' + '()'.repeat(490) + String(Date.now()) + '/';
      let sliced = 0;
      const slice = String.prototype.slice;
      String.prototype.slice = function (this: string, start?: number, end?: number) {
        const out = slice.call(this, start, end);
        if (this === literal) sliced += out.length;
        return out;
      };
      try {
        expect(query(Array(1000).fill('x'), `$[?@ =~ ${literal}]`)).to.have.length(0);
      } finally {
        String.prototype.slice = slice;
      }
      expect(sliced).to.be.below(2 * literal.length);
    });

    it('reuses the matcher buffers instead of allocating them per string', () => {
      // The empty alternative matches at once, but buffers sized for the whole
      // program (a{900}) were allocated for every string tested.
      const q = '$[?search(@, "|a{900}' + String(Date.now()) + '")]';
      const Original = globalThis.Int32Array;
      let allocated = 0;
      globalThis.Int32Array = class extends Original {
        constructor(...args: ConstructorParameters<Int32ArrayConstructor>) {
          super(...args);
          allocated++;
        }
      } as Int32ArrayConstructor;
      try {
        expect(query(Array(10_000).fill('x'), q)).to.have.length(10_000);
      } finally {
        globalThis.Int32Array = Original;
      }
      expect(allocated).to.be.below(20);
    });

    it('keeps regex results right after a run stopped by the budget', () => {
      // Every stopping point: while expanding the first states, and between
      // characters. Marks left by the stopped run must not reach the next one.
      const cases: Array<[string, unknown[], unknown[]]> = [
        ['$[?search(@, "a")]', ['a'], ['a']],
        ['$[?search(@, "ab|cd")]', ['xxcd', 'yy'], ['xxcd']],
        ['$[?match(@, "(a|b)*c")]', ['ababc', 'abab'], ['ababc']],
        ['$[?@ =~ /x+y/]', ['xxxy', 'xxx'], ['xxxy']],
      ];
      for (const [q, doc, expected] of cases) {
        for (let maxSteps = 1; maxSteps < 60; maxSteps++) {
          query(doc, q, { maxSteps, hideExceptions: true });
          expect(query(doc, q), `${q} after maxSteps ${maxSteps}`).to.deep.equal(expected);
        }
      }
    });

    it('keeps a run intact when a getter starts a nested query', () => {
      // Weighing the document on overflow reads the getter in mid-run. Only some
      // lengths put the overflow where the nested run does damage: scan them,
      // with the program cached so that the step count does not depend on
      // what ran before this test.
      const q = '$[?search(@, "ab")]';
      query(['ab'], q);
      for (let n = 499_975; n <= 500_010; n++) {
        const doc = {
          items: ['a'.repeat(n) + 'b'],
          get probe() {
            query(['b'], q);
            return null;
          },
        };
        expect(query(doc, '$.items[?search(@, "ab")]'), `length ${n}`).to.have.length(1);
      }
    });

    it('does not reuse what a previous string told about a position', () => {
      // The same program over strings differing at the same positions.
      expect(query(['b', 'a', 'ba', 'xy', 'ab'], '$[?search(@, "a")]')).to.deep.equal(['a', 'ba', 'ab']);
      expect(query(['ax', 'ay', 'bx', 'ay'], '$[?match(@, "ay")]')).to.deep.equal(['ay', 'ay']);
      const strings = Array.from({ length: 500 }, (_, i) => i.toString(2));
      const expected = strings.filter((text) => /10+1/u.test(text));
      expect(query(strings, '$[?search(@, "10+1")]')).to.deep.equal(expected);
    });

    it('uses each pattern taken from the document', () => {
      const doc = [
        { s: 'abc', p: 'b' },
        { s: 'abc', p: 'z' },
        { s: 'xyz', p: 'z' },
      ];
      expect(query(doc, '$[?search(@.s, @.p)].p')).to.deep.equal(['b', 'z']);
      expect(query(doc, '$[?match(@.s, @.p)].p')).to.deep.equal([]);
    });

    it('charges a pattern from the document for every candidate', () => {
      // Equal strings in distinct objects: each lookup compares 900 characters.
      const pattern = '|' + 'a'.repeat(900);
      const doc = Array.from({ length: 2000 }, () => Array.from(pattern).join(''));
      expect(() => query(doc, '$[?search("", @)]', { maxSteps: 30_000 })).to.throw(JSONPathLimitError);
      expect(query(doc, '$[?search("", @)]')).to.have.length(2000);
    });

    it('charges compiling a long pattern with a small program', () => {
      // One character class: about 900 steps to find the validation of search(),
      // and 900 to read the pattern while compiling it for =~.
      const pattern = '[' + 'q'.repeat(880) + String(Date.now()) + ']';
      expect(query([''], `$[?search(@, "${pattern}")]`)).to.deep.equal([]);
      expect(() => query([''], `$[?@ =~ /${pattern}/]`, { maxSteps: 1500 })).to.throw(JSONPathLimitError);
    });

    it('charges compiling by the program size, not the pattern length', () => {
      const q = '$[?search(@, "|a{900}' + String(Date.now()) + '")]';
      expect(() => query(['x'], q, { maxSteps: 300 })).to.throw(JSONPathLimitError);
      expect(query(['x'], q, { maxSteps: 300 })).to.deep.equal(['x']);
    });

    it('keeps a bounded number of compiled patterns per query', () => {
      const conditions = Array.from({ length: 400 }, (_, i) => `search(@, "site${i}")`);
      let largest = 0;
      const set = Map.prototype.set;
      Map.prototype.set = function (this: Map<unknown, unknown>, key: unknown, value: unknown) {
        const out = set.call(this, key, value);
        if ((key as { type?: string } | null)?.type === 'functionCall') largest = Math.max(largest, this.size);
        return out;
      } as typeof set;
      try {
        expect(query(['x'], '$[?' + conditions.join(' || ') + ']')).to.deep.equal([]);
      } finally {
        Map.prototype.set = set;
      }
      expect(largest).to.be.within(1, 256);
    });

    it('does not let a regex pay for unrelated work', () => {
      // One search() on a 20,000-character string, evaluated once, used to
      // raise the whole budget by program size x string length (20,000,000).
      const doc: Record<string, unknown> = {};
      let chain: Record<string, unknown> = doc;
      for (let i = 0; i < 400; i++) chain = chain.a = {};
      doc.s = 'a'.repeat(20_000);
      expect(() => query(doc, '$..[?@..[?@..a] || search($.s, "a{900}")]')).to.throw(JSONPathLimitError);
      expect(() => query(doc, '$..[?@..[?@..a]]')).to.throw(JSONPathLimitError);
    });

    it('does not keep patterns taken from the document', () => {
      // 12,000 distinct patterns, each compiling to a 900-state program, kept
      // per query used to take hundreds of MB; only literals are kept now.
      const doc = Array.from({ length: 12_000 }, (_, i) => '|a{900}' + i);
      let kept = 0;
      const set = Map.prototype.set;
      Map.prototype.set = function (this: Map<unknown, unknown>, key: unknown, value: unknown) {
        if ((key as { type?: string } | null)?.type === 'functionCall') kept++;
        return set.call(this, key, value);
      } as typeof set;
      try {
        expect(query(doc, '$[?search("", @)]')).to.have.length(12_000);
      } finally {
        Map.prototype.set = set;
      }
      expect(kept).to.equal(0);
    });

    it('allows linear regex work on large documents', () => {
      expect(query(['a'.repeat(20_000)], '$[?search(@, "a{200}b")]')).to.deep.equal([]);
      expect(query(Array(20_000).fill(''), '$[?search(@, "' + 'a'.repeat(150) + '")]')).to.deep.equal([]);
    });

    it('does not scale the default budget with the query text', () => {
      let doc: unknown = 0;
      for (let i = 0; i < 24; i++) doc = [doc];
      const q = '$' + ' '.repeat(50_000) + '[0,0]'.repeat(24);
      // Neither bound grows with the 50,000 characters of padding.
      expect(() => query(doc, q)).to.throw(JSONPathLimitError, / 1000000 evaluation steps/);
      expect(() => query(doc, q, { maxSteps: 10_000_000 })).to.throw(JSONPathLimitError, / 10000000 evaluation steps/);
    });

    it('evaluates a long query on a small document within a small budget', () => {
      // Classifying the 200,000-node query is linear and not charged.
      const q = '$[?' + 'length('.repeat(150) + '$' + '.x'.repeat(100_000) + ')'.repeat(150) + ' == @]';
      expect(query([0], q, { maxSteps: 500 })).to.deep.equal([]);
    });

    it('charges nothing for cheap string and Set decisions', () => {
      // A few dozen steps for the query itself; comparing or hashing the
      // 1,000 characters would cost far more.
      expect(query(['x'.repeat(1000)], '$[?@ != "x"]', { maxSteps: 30 })).to.have.length(1);
      expect(query([['x'.repeat(1000)]], '$[?@ noneof []]', { maxSteps: 30 })).to.have.length(1);
    });

    it('charges the keys counted by length()', () => {
      const wide = Object.fromEntries(Array.from({ length: 2000 }, (_, i) => ['k' + i, 0]));
      expect(() => query([wide], '$[?length(@) > 0]', { maxSteps: 1000 })).to.throw(JSONPathLimitError);
      expect(query([wide], '$[?length(@) > 0]', { maxSteps: 3000 })).to.have.length(1);
    });

    it('charges building the Set of a right-hand array', () => {
      expect(() => query([Array(1000).fill(0)], '$[?[] subsetof @]', { maxSteps: 10 })).to.throw(JSONPathLimitError);
      expect(query([Array(1000).fill(0)], '$[?[] subsetof @]', { maxSteps: 2000 })).to.have.length(1);
    });

    it('charges in/nin by the elements inspected', () => {
      expect(query(Array(5000).fill(0), '$[?@ in $]')).to.have.length(5000);
      expect(query([1, 2, 3], '$[?@ nin [2]]')).to.deep.equal([1, 3]);
      expect(query([NaN], '$[?@ in $]')).to.have.length(1);
    });

    it('builds the Set of a right-hand array once per query', () => {
      const allowed = Array.from({ length: 5000 }, (_, i) => 'tag' + i);
      const doc = { allowed, items: Array.from({ length: 5000 }, (_, i) => ({ tags: ['tag' + i] })) };
      expect(query(doc, '$.items[?@.tags subsetof $.allowed]')).to.have.length(5000);
      expect(query(doc, '$.items[?@.tags anyof $.allowed]')).to.have.length(5000);
      expect(query(doc, '$.items[?@.tags noneof $.allowed]')).to.have.length(0);
    });
  });

  describe('deep nesting does not overflow the call stack', () => {
    it('descendant segments over deep documents', () => {
      expect(query(nestedArrays(100_000), '$..*')).to.have.length(100_000);
      expect(query(nestedObjects(100_000), '$..a')).to.have.length(100_000);
      expect(query(nestedObjects(100_000), '$..missing')).to.deep.equal([]);
    });

    it('descendant order is unchanged', () => {
      const doc = { a: [{ x: 1 }, { x: 2, y: { x: 3 } }], b: { x: 4 } };
      expect(query(doc, '$..x')).to.deep.equal([1, 2, 3, 4]);
      expect(paths(doc, '$..x')).to.deep.equal([
        "$['a'][0]['x']",
        "$['a'][1]['x']",
        "$['a'][1]['y']['x']",
        "$['b']['x']",
      ]);
    });

    it('long paths over deep documents', () => {
      const depth = 50_000;
      const q = '$' + '.a'.repeat(depth);
      expect(query(nestedObjects(depth), q)).to.deep.equal({});
      expect(stringify(parse(q))).to.equal(q);
    });

    it('equality semantics are unchanged', () => {
      expect(query([{ a: [1, { b: 2 }] }], '$[?@ == {"a":[1,{"b":2}]}]')).to.have.length(1);
      expect(query([{ a: [1, { b: 2 }] }], '$[?@ == {"a":[1,{"b":3}]}]')).to.have.length(0);
      expect(query([{ a: 1, b: 2 }], '$[?@ == {"b":2,"a":1}]')).to.have.length(1);
      expect(query([{ a: 1 }], '$[?@ == {"a":1,"b":2}]')).to.have.length(0);
      expect(query([{ a: 1, c: 2 }], '$[?@ == {"a":1,"b":2}]')).to.have.length(0);
      expect(query([[1, 2]], '$[?@ == [1,2]]')).to.have.length(1);
      expect(query([[1, 2]], '$[?@ == [2,1]]')).to.have.length(0);
      expect(query([[1, 2]], '$[?@ != [1,2,3]]')).to.have.length(1);
      expect(query([{ a: 'x' }], '$[?@.a == "x"]')).to.have.length(1);
    });

    it('equality of deep structures', () => {
      const doc = { x: nestedArrays(50_000), y: nestedArrays(50_000), z: nestedArrays(49_999) };
      expect(query([doc], '$[?@.x == @.y]')).to.have.length(1);
      expect(query([doc], '$[?@.x == @.z]')).to.have.length(0);
    });

    it('long && and + chains', () => {
      const ands = '$[?' + Array(10_000).fill('@').join(' && ') + ']';
      expect(query([0], ands)).to.deep.equal([0]);
      expect(stringify(parse(ands))).to.equal(ands.replace('[?', '[?(').replace(/]$/, ')]'));
      expect(query([10_000], '$[?' + Array(10_000).fill('1').join(' + ') + ' == @]')).to.deep.equal([10_000]);
      expect(query([2], '$[?10 - 4 / 2 * 3 + 1 == 5]')).to.deep.equal([2]);
    });

    it('deeply nested literals stringify without recursion', () => {
      const q = '$[?@ == ' + '['.repeat(500) + '0' + ']'.repeat(500) + ']';
      expect(stringify(parse(q))).to.equal('$[?(@ == ' + '['.repeat(500) + '0' + ']'.repeat(500) + ')]');
      const ast = parse('$[?@ == [0]]') as unknown as {
        next: { value: { value: { value: { right: { value: unknown } } } } };
      };
      ast.next.value.value.value.right.value = nestedArrays(100_000);
      expect(stringify(ast as never)).to.have.length('$[?(@ == )]'.length + 200_001);
      expect(stringify(parse('$[?@ == {"a":[1,{"b":"c"}],"d":{}}]'))).to.equal("$[?(@ == {'a':[1,{'b':'c'}],'d':{}})]");
    });

    it('parses a comparison inside 500 parentheses', () => {
      const q = '$[?' + '('.repeat(500) + '@==1' + ')'.repeat(500) + ']';
      expect(query([1, 2], q)).to.deep.equal([1]);
    });

    it('stringify does not copy nested right operands once per level', () => {
      // A long operand (member names are limited, string values are not).
      const longPath = 'length("' + 'x'.repeat(100_000) + '")';
      const longTest = 'search("' + 'x'.repeat(100_000) + '", "x")';
      const queries = [
        '$[?' + '1+1+('.repeat(400) + longPath + ')'.repeat(400) + '==0]',
        '$[?' + '@&&('.repeat(400) + longTest + ')'.repeat(400) + ']',
        '$[?' + 'length('.repeat(400) + longPath + ')'.repeat(400) + '==0]',
      ];
      for (const q of queries) {
        const ast = parse(q);
        // Characters produced by join(), which copies its parts (concatenation
        // builds ropes); once per level would be 400 x 100,000.
        let joined = 0;
        const join = Array.prototype.join;
        Array.prototype.join = function (this: unknown[], separator?: string) {
          const out = join.call(this, separator);
          joined += out.length;
          return out;
        };
        let out: string;
        try {
          out = stringify(ast);
        } finally {
          Array.prototype.join = join;
        }
        expect(joined, q.slice(0, 12)).to.be.below(10 * q.length);
        expect(out.length).to.be.above(100_000);
      }
    });

    // V8 caps Maps and Sets at 2^24 entries; reaching it takes gigabytes, so
    // these tests make the next insertion fail as V8 would.
    const failingInsert = <T extends object>(proto: T, method: keyof T, kind: string, fn: () => void): void => {
      const original = proto[method];
      (proto as Record<keyof T, unknown>)[method] = function () {
        throw new RangeError(`${kind} maximum size exceeded`);
      };
      try {
        fn();
      } finally {
        (proto as Record<keyof T, unknown>)[method] = original;
      }
    };

    it('a Set outgrowing V8 during evaluation is a JSONPathLimitError', () => {
      failingInsert(Set.prototype, 'add', 'Set', () => {
        expect(() => query([[1, 2]], '$[?[1] subsetof @]')).to.throw(JSONPathLimitError, /too large/);
      });
    });

    it('a Set outgrowing V8 during stringify is a JSONPathLimitError', () => {
      const ast = parse('$.a.b');
      failingInsert(Set.prototype, 'add', 'Set', () => {
        expect(() => stringify(ast)).to.throw(JSONPathLimitError, /too large/);
      });
    });

    it('a Map outgrowing V8 during parsing is a JSONPathSyntaxError', () => {
      failingInsert(Map.prototype, 'set', 'Map', () => {
        expect(() => parse('$[?@.a == 1]')).to.throw(JSONPathSyntaxError, /too large/);
      });
    });

    it('a hand-built AST nested too deeply for stringify is a JSONPathLimitError', () => {
      let node: unknown = { type: 'current', next: null };
      for (let i = 0; i < 200_000; i++) node = { type: 'groupExpression', value: node };
      const ast = {
        type: 'root',
        next: {
          type: 'subscript',
          value: { type: 'bracketExpression', value: { type: 'filterExpression', value: node } },
          next: null,
        },
      };
      expect(() => stringify(ast as never)).to.throw(JSONPathLimitError);
    });

    it('deeply nested parentheses are a syntax error', () => {
      const q = '$[?' + '('.repeat(20_000) + '@' + ')'.repeat(20_000) + ']';
      expect(() => parse(q)).to.throw(JSONPathSyntaxError, /nested too deeply/);
      expect(() => query([1], q)).to.throw(JSONPathSyntaxError);
      expect(query([1], q, { hideExceptions: true })).to.equal(undefined);
    });
  });
});
