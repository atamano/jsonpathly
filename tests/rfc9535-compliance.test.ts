/**
 * RFC 9535 Full Compliance Tests
 *
 * Tests for complete RFC 9535 JSONPath specification compliance:
 *
 * Normalized Paths (Section 2.7):
 * - Single-quoted string selectors: $['key'] instead of $["key"]
 * - Proper escaping: single quotes, backslashes, control characters
 * - Numeric indices for arrays: $[0] instead of $['0']
 *
 * Integer Range (I-JSON):
 * - Integers must be within [-(2^53)+1, (2^53)-1]
 * - Values outside range should throw errors
 *
 * I-Regexp Compliance (RFC 9485):
 * - match() and search() use restricted I-Regexp subset
 * - Reject backreferences, lookahead/lookbehind, named groups, word boundaries
 *
 * Empty Nodelist Comparison:
 * - Two empty nodelists should compare equal
 * - Comparison semantics for undefined values
 *
 * Function Type System:
 * - Proper return values for edge cases (empty nodelists, wrong types)
 */
import { expect } from 'chai';
import { query, paths, parse, stringify, JSONPathSyntaxError } from '../src/index';

describe('RFC 9535 Full Compliance', () => {
  // ============================================
  // NORMALIZED PATHS (Section 2.7)
  // ============================================

  describe('Normalized Paths (Section 2.7)', () => {
    it('should use single quotes for name selectors', () => {
      const result = paths({ a: 1 }, '$.a');
      expect(result).to.deep.equal(["$['a']"]);
    });

    it('should use single quotes for nested paths', () => {
      const result = paths({ a: { b: { c: 1 } } }, '$.a.b.c');
      expect(result).to.deep.equal(["$['a']['b']['c']"]);
    });

    it('should escape single quotes in keys', () => {
      const data = { "it's": 1 };
      const result = paths(data, '$["it\'s"]');
      expect(result).to.deep.equal(["$['it\\'s']"]);
    });

    it('should escape backslashes in keys', () => {
      const data = { 'a\\b': 1 };
      const result = paths(data, '$["a\\\\b"]');
      expect(result).to.deep.equal(["$['a\\\\b']"]);
    });

    it('should escape newlines in keys', () => {
      const data = { 'a\nb': 1 };
      const result = paths(data, '$["a\\nb"]');
      expect(result).to.deep.equal(["$['a\\nb']"]);
    });

    it('should escape tabs in keys', () => {
      const data = { 'a\tb': 1 };
      const result = paths(data, '$["a\\tb"]');
      expect(result).to.deep.equal(["$['a\\tb']"]);
    });

    it('should use numeric indices for arrays', () => {
      const result = paths([1, 2, 3], '$[1]');
      expect(result).to.deep.equal(['$[1]']);
    });

    it('should handle wildcard with single quotes for object keys', () => {
      const result = paths({ a: 1, b: 2 }, '$.*');
      expect(result).to.include("$['a']");
      expect(result).to.include("$['b']");
    });
  });

  // ============================================
  // INTEGER RANGE (I-JSON)
  // ============================================

  describe('Integer Range (I-JSON)', () => {
    it('should accept Number.MAX_SAFE_INTEGER', () => {
      expect(() => parse(`$[${Number.MAX_SAFE_INTEGER}]`)).not.to.throw();
    });

    it('should accept Number.MIN_SAFE_INTEGER', () => {
      expect(() => parse(`$[${Number.MIN_SAFE_INTEGER}]`)).not.to.throw();
    });

    it('should reject integers beyond MAX_SAFE_INTEGER', () => {
      expect(() => parse('$[9007199254740992]')).to.throw(/I-JSON range/);
    });

    it('should reject integers below MIN_SAFE_INTEGER', () => {
      expect(() => parse('$[-9007199254740992]')).to.throw(/I-JSON range/);
    });

    it('should accept floating point numbers (no range check)', () => {
      // Floating point numbers are not subject to integer range check
      expect(() => parse('$[?(@ > 1e308)]')).not.to.throw();
    });
  });

  // ============================================
  // I-REGEXP COMPLIANCE (RFC 9485)
  // ============================================

  describe('I-Regexp Compliance (RFC 9485)', () => {
    describe('match() function', () => {
      it('should work with basic patterns', () => {
        const result = query([{ name: 'hello' }], '$[?(match(@.name, "hello"))]');
        expect(result).to.have.length(1);
      });

      it('should work with regex patterns', () => {
        const result = query([{ name: 'hello' }], '$[?(match(@.name, "hel.*"))]');
        expect(result).to.have.length(1);
      });

      it('should reject backreferences', () => {
        // Pattern with backreference \1
        const result = query([{ name: 'aa' }], '$[?(match(@.name, "(a)\\\\1"))]');
        expect(result).to.deep.equal([]);
      });

      it('should reject lookahead', () => {
        const result = query([{ name: 'test' }], '$[?(match(@.name, "t(?=est)"))]');
        expect(result).to.deep.equal([]);
      });

      it('should reject lookbehind', () => {
        const result = query([{ name: 'test' }], '$[?(match(@.name, "(?<=t)est"))]');
        expect(result).to.deep.equal([]);
      });

      it('should reject negative lookahead', () => {
        const result = query([{ name: 'test' }], '$[?(match(@.name, "t(?!x)"))]');
        expect(result).to.deep.equal([]);
      });

      it('should reject named capture groups', () => {
        const result = query([{ name: 'test' }], '$[?(match(@.name, "(?<word>test)"))]');
        expect(result).to.deep.equal([]);
      });

      it('should reject word boundaries', () => {
        const result = query([{ name: 'test word' }], '$[?(match(@.name, "\\\\bword\\\\b"))]');
        expect(result).to.deep.equal([]);
      });
    });

    describe('search() function', () => {
      it('should work with basic patterns', () => {
        const result = query([{ text: 'hello world' }], '$[?(search(@.text, "world"))]');
        expect(result).to.have.length(1);
      });

      it('should reject non-I-Regexp features', () => {
        // Backreference
        const result = query([{ text: 'aa' }], '$[?(search(@.text, "(a)\\\\1"))]');
        expect(result).to.deep.equal([]);
      });
    });
  });

  // ============================================
  // EMPTY NODELIST COMPARISON
  // ============================================

  describe('Empty Nodelist Comparison', () => {
    it('should compare two empty nodelists as equal', () => {
      const result = query([{ a: 1 }], '$[?(@.nonexistent == @.alsoNonexistent)]');
      expect(result).to.deep.equal([{ a: 1 }]);
    });

    it('should not match when only one nodelist is empty', () => {
      const result = query([{ a: 1 }], '$[?(@.a == @.nonexistent)]');
      expect(result).to.deep.equal([]);
    });

    it('should work in filter with multiple conditions', () => {
      const result = query([{ a: 1 }, { b: 2 }], '$[?(@.x == @.y)]');
      expect(result).to.have.length(2); // Both match because both have empty x and y
    });
  });

  // ============================================
  // COMPARISON SEMANTICS
  // ============================================

  describe('Comparison Semantics', () => {
    it('should compare arrays by element order', () => {
      const result = query([{ arr: [1, 2, 3] }], '$[?(@.arr == [1, 2, 3])]');
      expect(result).to.have.length(1);
    });

    it('should not match arrays with different order', () => {
      const result = query([{ arr: [1, 2, 3] }], '$[?(@.arr == [3, 2, 1])]');
      expect(result).to.deep.equal([]);
    });

    it('should compare objects by member names and values', () => {
      const result = query([{ obj: { a: 1, b: 2 } }], '$[?(@.obj == {"a": 1, "b": 2})]');
      expect(result).to.have.length(1);
    });

    it('should not match objects with different keys', () => {
      // Tests helper.ts line 35 - object comparison when key exists in one but not other
      const result = query([{ obj: { a: 1, b: 2 } }], '$[?(@.obj == {"a": 1, "c": 2})]');
      expect(result).to.deep.equal([]);
    });

    it('should not match objects with different values', () => {
      // Tests helper.ts lines 36-37 - object values don't match
      const result = query([{ obj: { a: 1, b: 2 } }], '$[?(@.obj == {"a": 1, "b": 3})]');
      expect(result).to.deep.equal([]);
    });

    it('should not match objects with different key count', () => {
      // Tests helper.ts line 33 - objects have different number of keys
      const result = query([{ obj: { a: 1, b: 2, c: 3 } }], '$[?(@.obj == {"a": 1, "b": 2})]');
      expect(result).to.deep.equal([]);
    });

    it('should not match array with object', () => {
      // Tests helper.ts line 27 - one is array, other is object
      const result = query([{ val: [1, 2, 3] }], '$[?(@.val == {"0": 1, "1": 2, "2": 3})]');
      expect(result).to.deep.equal([]);
    });

    it('should treat null as a value (not undefined)', () => {
      const result = query([{ a: null }], '$[?(@.a == null)]');
      expect(result).to.have.length(1);
    });

    it('should not match null with missing property', () => {
      const result = query([{ b: 1 }], '$[?(@.a == null)]');
      expect(result).to.deep.equal([]);
    });
  });

  // ============================================
  // FUNCTION TYPE SYSTEM
  // ============================================

  describe('Function Type System', () => {
    it('length() should return undefined for non-string/array/object', () => {
      // length(123) should return undefined, making comparison false
      const result = query([{ num: 123 }], '$[?(length(@.num) == 3)]');
      expect(result).to.deep.equal([]);
    });

    it('value() should return undefined for empty nodelist', () => {
      const result = query([{ a: 1 }], '$[?(value(@.nonexistent) == 1)]');
      expect(result).to.deep.equal([]);
    });

    it('count() should return 0 for undefined', () => {
      const result = query([{ a: 1 }], '$[?(count(@.nonexistent) == 0)]');
      expect(result).to.have.length(1);
    });
  });

  // ============================================
  // Issue #16 (JSONPath Compliance Test Suite)
  // ============================================

  describe('Issue #16', () => {
    const q = (data: unknown, path: string): unknown => query(data, path, { hideExceptions: false, returnArray: true });

    it('<= and >= hold for equal null, booleans and structured values', () => {
      const data = [
        { a: null, d: 'e' },
        { a: 'c', d: 'f' },
      ];
      expect(q(data, '$[?@.a<=null]')).to.deep.equal([{ a: null, d: 'e' }]);
      expect(q(data, '$[?@.a>=null]')).to.deep.equal([{ a: null, d: 'e' }]);
      expect(q([{ a: true }, { a: false }], '$[?@.a<=true]')).to.deep.equal([{ a: true }]);
      expect(q([{ a: true }, { a: false }], '$[?@.a>=false]')).to.deep.equal([{ a: false }]);
      expect(q([{ a: [1] }, { a: [2] }], '$[?@.a<=[1]]')).to.deep.equal([{ a: [1] }]);
      expect(q([{ a: 1 }], '$[?@.x<=@.y]')).to.deep.equal([{ a: 1 }]);
      // Unequal values of non-ordered types still compare false.
      expect(q([{ a: true }], '$[?@.a<=false]')).to.deep.equal([]);
      expect(q([{ a: null }], '$[?@.a<1]')).to.deep.equal([]);
    });

    it("I-Regexp '.' matches any character but CR and LF", () => {
      expect(q(['\u2028', '\u2029', '\r', '\n', 'a'], "$[?match(@, '.')]")).to.deep.equal(['\u2028', '\u2029', 'a']);
      expect(q(['x\u2028y', 'x\ny'], "$[?search(@, 'x.y')]")).to.deep.equal(['x\u2028y']);
      // `.` inside a class is a literal dot.
      expect(q(['.', 'a'], "$[?match(@, '[.]')]")).to.deep.equal(['.']);
    });

    it('accepts slices and filters in selector lists', () => {
      const data = [0, 1, 2, 3, 4, 5, 6, 7];
      expect(q(data, '$[1,5:7]')).to.deep.equal([1, 5, 6]);
      expect(q(data, '$[?@<2, ?@>6, 0]')).to.deep.equal([0, 1, 7, 0]);
      expect(q(data, '$[:2, ::-3]')).to.deep.equal([0, 1, 7, 4, 1]);
      expect(paths(data, '$[1,6:8]')).to.deep.equal(['$[1]', '$[6]', '$[7]']);
      expect(q([{ a: 1 }, { b: 2 }, { c: 3 }], '$[?@.a,?@.b]')).to.deep.equal([{ a: 1 }, { b: 2 }]);
      expect(q({ k: [1, 2, 3] }, '$..[?@ == 2, 0]')).to.deep.equal([2, 1]);
    });

    it('accepts a parenthesized group followed by a logical operator', () => {
      const data = [{ a: 1, c: 1 }, { b: 1 }, { b: 1, c: 1 }, { c: 1 }];
      expect(q(data, '$[?(@.a || @.b) && @.c]')).to.deep.equal([
        { a: 1, c: 1 },
        { b: 1, c: 1 },
      ]);
      expect(q(data, '$[?(@.a) || (@.b && @.c)]')).to.deep.equal([
        { a: 1, c: 1 },
        { b: 1, c: 1 },
      ]);
      expect(q(data, '$[?(@.c)]')).to.have.length(3);
    });

    it('accepts blank space between segments and inside slices', () => {
      const data = { a: { b: [0, 1, 2, 3, 4, 5] } };
      expect(q(data, '$ .a')).to.deep.equal([{ b: [0, 1, 2, 3, 4, 5] }]);
      expect(q(data, '$ .a\n\t["b"] [0]')).to.deep.equal([0]);
      expect(q(data, '$ ..b')).to.deep.equal([[0, 1, 2, 3, 4, 5]]);
      expect(q(data, '$.a.b[1 :5 : 2]')).to.deep.equal([1, 3]);
      expect(q(data, '$.a.b[ 1 : 5 : 2 ]')).to.deep.equal([1, 3]);
      expect(q(data, '$.a.b[ : 2 ]')).to.deep.equal([0, 1]);
      expect(q([{ a: { b: 'xyz' } }], '$[?length(@ .a .b) == 3]')).to.deep.equal([{ a: { b: 'xyz' } }]);
      expect(q([{ a: 1 }], '$[?$ .x == @ .x]')).to.deep.equal([{ a: 1 }]);
      // Blank space stays forbidden inside a dot segment.
      expect(() => q(data, '$. a')).to.throw();
      expect(() => q(data, '$.. a')).to.throw();
    });

    it('stringifies the new forms back to equivalent paths', () => {
      for (const path of ['$[1,5:7]', '$[?@.a,?@.b]', '$[?(@.a || @.b) && @.c]', '$ .a', '$[1 :5:2]']) {
        const round = parse(path);
        expect(parse(stringify(round)), path).to.deep.equal(round);
      }
    });
  });

  // ============================================
  // Strict syntax and well-typedness (4.0.0)
  // ============================================

  describe('Strict syntax and well-typedness', () => {
    const rejects = (path: string, message?: RegExp): void => {
      const call = (): unknown => parse(path);
      if (message) expect(call, path).to.throw(JSONPathSyntaxError, message);
      else expect(call, path).to.throw(JSONPathSyntaxError);
    };

    it('rejects literals and ValueType functions as filter tests', () => {
      rejects('$[?true]', /literal must be compared/);
      rejects('$[?@.a && null]', /literal must be compared/);
      rejects('$[?!false]', /literal must be compared/);
      rejects('$[?length(@.a)]', /length\(\) must be compared/);
      rejects('$[?count(@.*)]', /count\(\) must be compared/);
      rejects('$[?@.a + 1]'); // already rejected by the grammar
    });

    it('rejects comparing LogicalType functions and non-singular queries', () => {
      rejects("$[?match(@.a, 'x') == true]", /match\(\) cannot be compared/);
      rejects('$[?@.* == 1]', /non-singular/);
      rejects('$[?$..a == 1]', /non-singular/);
      rejects('$[?@[0:1] == 1]', /non-singular/);
      rejects('$[?@.a + @.* == 1]', /non-singular/);
      rejects('$[?length(@.*) == 1]', /non-singular/);
    });

    it('checks function arity and NodesType arguments', () => {
      rejects('$[?count() == 1]', /count\(\) takes 1 argument, found 0/);
      rejects('$[?match(@.a) == 1]', /match\(\) takes 2 arguments, found 1/);
      rejects('$[?count(1) == 1]', /Expected a query/);
      rejects('$[?value(length(@.a)) == 1]', /Expected a query/);
    });

    it('checks nested filters too', () => {
      rejects('$[?@[?true]]', /literal must be compared/);
      rejects('$..[?@.a, ?@.* == 1]', /non-singular/);
      rejects('$[?count(@[?length(@)]) > 0]', /length\(\) must be compared/);
    });

    it('keeps valid typed queries', () => {
      for (const path of [
        '$[?@.a == 1 && (@.b || !@.c)]',
        '$[?count(@.*) > 1]',
        '$[?count($..a[?@ > 1]) == 0]',
        '$[?value(@..a) == 1]',
        "$[?length(value(@.a)) == 3 && match(@.b, 'x.*')]",
        '$[?@.a == @.b[0]]',
        '$[?(count(@.a[*])) == 2]',
        '$[?$[0] == @]',
      ]) {
        expect(() => parse(path), path).to.not.throw();
      }
    });

    it('keeps the extension operators lenient', () => {
      const data = [{ tags: ['a', 'b'], n: 5, name: 'Magnus' }];
      expect(query(data, '$[?@.tags[*] anyof ["b"]]', { returnArray: true })).to.have.length(1);
      expect(query(data, '$[?(@.tags[*]) anyof ["b"]]', { returnArray: true })).to.have.length(1);
      expect(query(data, '$[?"a" in @.tags]', { returnArray: true })).to.have.length(1);
      expect(query(data, '$[?@.name =~ /^mag/i]', { returnArray: true })).to.have.length(1);
      expect(query(data, '$[?@.n * 2 + 1 == 11]', { returnArray: true })).to.have.length(1);
    });

    it('rejects uppercase function names and non-singular arithmetic operands', () => {
      rejects('$[?LENGTH(@) == 1]');
      rejects('$[?Count(@.*) == 1]');
      rejects('$[?@.* + 1 == @.missing]', /non-singular/);
    });

    it('keeps unquoted names in brackets (jsonpathly extension)', () => {
      const data = { 'key-dash': 7, a: 1, é: 2 };
      expect(query(data, '$[key-dash]')).to.equal(7);
      expect(query(data, '$[a, key-dash]')).to.deep.equal([1, 7]);
      expect(query(data, '$[é]')).to.equal(2);
      expect(query([data], '$[?@[key-dash] == 7]', { returnArray: true })).to.have.length(1);
    });

    it('rejects lax tokens', () => {
      for (const path of [
        '$.1',
        '$.a-b',
        '$[01]',
        '$[-0]',
        '$[:-0]',
        '$[?@.a == 01]',
        ' $',
        '$ ',
        '$[?count (@.*) == 1]',
      ]) {
        rejects(path);
      }
      // A raw control character, an escaped quote of the other kind, lone surrogates.
      rejects('$["\u0001"]');
      rejects(`$['\\"']`);
      rejects(`$["\\'"]`);
      rejects('$["\\uD800"]');
      rejects('$["\\uDC00\\uD800"]');
      // Still valid: -0 as a number, escaped surrogate pairs, non-ASCII names.
      expect(query([{ a: 0 }], '$[?@.a == -0]', { returnArray: true })).to.have.length(1);
      expect(query({ '\u{1F600}': 1 }, '$["\\uD83D\\uDE00"]')).to.equal(1);
      expect(query({ 'é𝄞x9': 1 }, '$.é𝄞x9')).to.equal(1);
    });
  });

  describe('Unicode and I-Regexp details', () => {
    const q = (data: unknown, path: string): unknown => query(data, path, { returnArray: true });

    it('length() counts Unicode scalar values', () => {
      expect(q(['😀', 'ab', '\uD800'], '$[?length(@) == 1]')).to.deep.equal(['😀', '\uD800']);
      expect(q(['a😀b'], '$[?length(@) == 3]')).to.deep.equal(['a😀b']);
    });

    it('strings compare by code point, not UTF-16 unit', () => {
      // U+FFFF is one unit above the surrogates, but below U+1F600.
      expect(q([{ s: '￿' }], "$[?@.s < '😀']")).to.have.length(1);
      expect(q([{ s: '😀' }], "$[?@.s > '￿']")).to.have.length(1);
      expect(q([{ s: 'ab' }], "$[?@.s < 'abc' && @.s > 'a']")).to.have.length(1);
    });

    it('accepts I-Regexp constructs JavaScript treats differently', () => {
      expect(q(['a-b', 'ab'], "$[?match(@, 'a\\\\-b')]")).to.deep.equal(['a-b']);
      expect(q(['a-b'], "$[?match(@, '[a\\\\-]-b')]")).to.deep.equal(['a-b']);
      expect(q(['Ab', 'ab'], "$[?match(@, '\\\\p{Lu}b')]")).to.deep.equal(['Ab']);
      expect(q(['ab', 'aab'], "$[?match(@, '(a){2}b|ab')]")).to.deep.equal(['ab', 'aab']);
      expect(q(['x'], "$[?match(@, 'x|')]")).to.deep.equal(['x']);
      expect(q(['😀x', 'ax'], "$[?match(@, '😀x')]")).to.deep.equal(['😀x']);
      expect(q(['-', 'a', 'b'], "$[?match(@, '[-a]')]")).to.deep.equal(['-', 'a']);
      expect(q(['-', 'a', 'b'], "$[?match(@, '[^a-]')]")).to.deep.equal(['b']);
      // A translation is never longer than its pattern: an 804-character
      // pattern stays within the 1,000-character limit.
      expect(q(['a'.repeat(201)], `$[?match(@, "${'[a-]'.repeat(201)}")]`)).to.have.length(1);
      expect(q(['😀', '😃', 'a'], "$[?match(@, '[😀-😂]')]")).to.deep.equal(['😀']);
      expect(q(['a', '1'], "$[?match(@, '[\\\\p{L}]')]")).to.deep.equal(['a']);
      // ^ and $ stay anchors, as the Compliance Test Suite expects.
      expect(q(['abc', 'xab'], "$[?search(@, '^ab')]")).to.deep.equal(['abc']);
    });

    it('rejects what is not I-Regexp (the pattern matches nothing)', () => {
      for (const pattern of [
        '\\d',
        '\\w',
        '\\s',
        '\\b',
        '(?:a)',
        'a*?',
        '[]',
        '[^]',
        'a{,2}',
        '\\p{IsBasicLatin}',
        '[a-\\d]',
        '[z-a]',
        '[--a]',
        'a]',
        'a}',
        '(a',
        'a)',
        '\\uD800',
      ]) {
        expect(q(['1', 'a', 'z', ' ', 'aa'], `$[?search(@, ${JSON.stringify(pattern)})]`), pattern).to.deep.equal([]);
      }
    });

    it('leaves the =~ extension on JavaScript regular expressions', () => {
      expect(q(['1', 'a'], '$[?@ =~ /\\d/]')).to.deep.equal(['1']);
      // ...within the subset that excludes lookaround and backreferences.
      expect(q(['ab'], '$[?@ =~ /(?<=a)b/]')).to.deep.equal([]);
      expect(q(['ab'], '$[?@ =~ /(?<n>a)b/]')).to.deep.equal([]);
    });
  });
});
