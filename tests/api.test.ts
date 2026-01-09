/**
 * Public API Tests
 *
 * Tests for the jsonpathly public API:
 *
 * - parse(path, options?)    - Parse JSONPath string to AST
 * - stringify(ast)           - Convert AST back to JSONPath string
 * - paths(data, path, opts?) - Get matched paths instead of values
 * - query(data, path, opts?) - Query JSON data with JSONPath
 * - JSONPathSyntaxError      - Error class for invalid paths
 */
import { expect } from 'chai';
import { parse, stringify, paths, query, JSONPathSyntaxError } from '../src/index';

describe('Public API', () => {
  // ============================================
  // parse()
  // ============================================

  describe('parse()', () => {
    describe('valid expressions', () => {
      const validPaths = [
        // Basic selectors
        '$',
        '$.store',
        '$.store.book',
        '$[0]',
        '$[*]',

        // Combined selectors
        '$.store.book[*]',
        '$.store.book[0,1,2]',

        // Slices
        '$.store.book[:2]',
        '$.store.book[1:3]',
        '$.store.book[::2]',

        // Recursive descent
        '$..book',
        '$.store..price',

        // Bracket notation
        "$['store']['book']",

        // Filter expressions
        '$[?(@.price < 10)]',
        '$[?(@.author)]',
        '$[?(@.price == 10.99)]',
        '$[?(@.title == "Test")]',
        '$[?(@.available == true)]',
        '$[?(@.data == null)]',

        // Logical operators
        '$[?(@.price < 10 && @.category == "fiction")]',
        '$[?(@.price < 10 || @.price > 100)]',
        '$[?(!(@.sold))]',
      ];

      for (const path of validPaths) {
        it(`parses: ${path}`, () => {
          const result = parse(path);

          expect(result).to.not.be.null;
          expect(result!.type).to.equal('root');
        });
      }
    });

    describe('invalid expressions', () => {
      const invalidPaths = [
        { path: '', desc: 'empty string' },
        { path: 'bad', desc: 'no root' },
        { path: '@', desc: 'current without context' },
        { path: '$.$', desc: 'invalid root after root' },
        { path: '$...', desc: 'triple dot' },
        { path: '$[?(@.test == undefined)]', desc: 'undefined keyword' },
        { path: '$[1:2:3:4]', desc: 'too many slice parts' },
      ];

      for (const { path, desc } of invalidPaths) {
        it(`throws for ${desc}: ${path || '(empty)'}`, () => {
          expect(() => parse(path)).to.throw(JSONPathSyntaxError);
        });
      }
    });

    describe('options', () => {
      it('returns null with hideExceptions for invalid path', () => {
        const result = parse('bad', { hideExceptions: true });
        expect(result).to.be.null;
      });

      it('still returns AST for valid path with hideExceptions', () => {
        const result = parse('$.test', { hideExceptions: true });

        expect(result).to.not.be.null;
        expect(result!.type).to.equal('root');
      });
    });
  });

  // ============================================
  // stringify()
  // ============================================

  describe('stringify()', () => {
    describe('round-trip parsing', () => {
      const cases = [
        { input: '$', expected: '$' },
        { input: '$.store', expected: '$.store' },
        { input: '$[0]', expected: '$[0]' },
        { input: '$[*]', expected: '$[*]' },
        { input: '$[0,1,2]', expected: '$[0, 1, 2]' },
        { input: '$[1:3]', expected: '$[1:3]' },
        { input: '$[:2]', expected: '$[:2]' },
        { input: '$[::2]', expected: '$[::2]' },
        { input: '$..book', expected: '$..book' },
      ];

      for (const { input, expected } of cases) {
        it(`stringifies: ${input}`, () => {
          const ast = parse(input);
          const result = stringify(ast);

          expect(result).to.equal(expected);
        });
      }
    });

    describe('RFC 9535 normalized format', () => {
      it('uses single quotes for string literals', () => {
        const ast = parse('$["key"]');
        expect(stringify(ast)).to.equal("$['key']");
      });

      it('escapes single quotes in strings', () => {
        const ast = parse('$["it\'s"]');
        expect(stringify(ast)).to.equal("$['it\\'s']");
      });

      it('escapes backslashes', () => {
        const ast = parse('$["a\\\\b"]');
        expect(stringify(ast)).to.equal("$['a\\\\b']");
      });
    });

    describe('filter expressions', () => {
      it('stringifies comparators', () => {
        const ast = parse('$[?(@.price < 10)]');
        expect(stringify(ast)).to.equal('$[?(@.price < 10)]');
      });

      it('stringifies logical expressions', () => {
        const ast = parse('$[?(@.a && @.b)]');
        expect(stringify(ast)).to.equal('$[?(@.a && @.b)]');
      });

      it('stringifies negation', () => {
        const ast = parse('$[?(!(@.sold))]');
        expect(stringify(ast)).to.equal('$[?(!(@.sold))]');
      });
    });

    describe('edge cases', () => {
      it('returns empty string for null', () => {
        expect(stringify(null)).to.equal('');
      });
    });
  });

  // ============================================
  // paths()
  // ============================================

  describe('paths()', () => {
    describe('basic paths', () => {
      it('returns path for simple property', () => {
        const result = paths({ a: 1 }, '$.a');
        expect(result).to.deep.equal(["$['a']"]);
      });

      it('returns nested paths', () => {
        const result = paths({ a: { b: { c: 1 } } }, '$.a.b.c');
        expect(result).to.deep.equal(["$['a']['b']['c']"]);
      });

      it('returns array index paths', () => {
        const result = paths([1, 2, 3], '$[1]');
        expect(result).to.deep.equal(['$[1]']);
      });

      it('returns empty for no matches', () => {
        const result = paths({ a: 1 }, '$.b');
        expect(result).to.deep.equal([]);
      });
    });

    describe('wildcard paths', () => {
      it('returns all object paths', () => {
        const result = paths({ a: 1, b: 2 }, '$.*');

        expect(result).to.have.length(2);
        expect(result).to.include("$['a']");
        expect(result).to.include("$['b']");
      });

      it('returns all array paths', () => {
        const result = paths([1, 2, 3], '$[*]');
        expect(result).to.deep.equal(['$[0]', '$[1]', '$[2]']);
      });
    });

    describe('recursive descent', () => {
      it('returns all matching paths', () => {
        const data = { a: { x: 1 }, b: { x: 2 } };
        const result = paths(data, '$..x');

        expect(result).to.have.length(2);
        expect(result).to.include("$['a']['x']");
        expect(result).to.include("$['b']['x']");
      });
    });

    describe('filter paths', () => {
      it('returns paths for matches', () => {
        const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const result = paths(data, '$[?(@.id > 1)]');

        expect(result).to.deep.equal(['$[1]', '$[2]']);
      });
    });

    describe('RFC 9535 normalized format', () => {
      it('uses single quotes for name selectors', () => {
        const result = paths({ key: 'value' }, '$.key');
        expect(result).to.deep.equal(["$['key']"]);
      });

      it('escapes special characters', () => {
        const result = paths({ "it's": 1 }, "$[\"it's\"]");
        expect(result).to.deep.equal(["$['it\\'s']"]);
      });
    });

    describe('options', () => {
      it('returns empty for invalid path with hideExceptions', () => {
        const result = paths({}, 'bad', { hideExceptions: true });
        expect(result).to.deep.equal([]);
      });

      it('throws for invalid path by default', () => {
        expect(() => paths({}, 'bad')).to.throw(Error);
      });
    });

    describe('path/query consistency', () => {
      const cases = [
        { data: { a: { b: { c: 1 } } }, path: '$.a.b.c' },
        { data: [1, [2, [3]]], path: '$[1][1][0]' },
        { data: { items: [{ id: 1 }, { id: 2 }] }, path: '$.items[?(@.id == 2)]' },
        { data: { x: { y: 1 }, z: { y: 2 } }, path: '$..y' },
      ];

      for (const { data, path } of cases) {
        it(`paths resolve to same values: ${path}`, () => {
          const queryResult = query(data, path, { returnArray: true });
          const pathsResult = paths(data, path);
          const resolvedResult = query(data, pathsResult as string[]);

          expect(resolvedResult).to.deep.equal(queryResult);
        });
      }
    });
  });

  // ============================================
  // query()
  // ============================================

  describe('query()', () => {
    describe('return modes', () => {
      it('returns single value by default', () => {
        const result = query({ a: 1 }, '$.a');
        expect(result).to.equal(1);
      });

      it('returns array with returnArray option', () => {
        const result = query({ a: 1 }, '$.a', { returnArray: true });
        expect(result).to.deep.equal([1]);
      });

      it('returns undefined for no match', () => {
        const result = query({ a: 1 }, '$.b');
        expect(result).to.be.undefined;
      });

      it('returns empty array for no match with returnArray', () => {
        const result = query({ a: 1 }, '$.b', { returnArray: true });
        expect(result).to.deep.equal([]);
      });
    });

    describe('error handling', () => {
      it('returns undefined for invalid path with hideExceptions', () => {
        const result = query({}, 'bad', { hideExceptions: true });
        expect(result).to.be.undefined;
      });

      it('returns empty array with both options', () => {
        const result = query({}, 'bad', { hideExceptions: true, returnArray: true });
        expect(result).to.deep.equal([]);
      });
    });

    describe('array of paths', () => {
      it('queries multiple paths', () => {
        const data = { a: 1, b: 2, c: 3 };
        const result = query(data, ['$.a', '$.b']);

        expect(result).to.deep.equal([1, 2]);
      });

      it('works with normalized paths from paths()', () => {
        const data = { a: { b: 1 }, c: { b: 2 } };
        const pathsResult = paths(data, '$..b');
        const queryResult = query(data, pathsResult as string[]);

        expect(queryResult).to.deep.equal([1, 2]);
      });
    });
  });

  // ============================================
  // JSONPathSyntaxError
  // ============================================

  describe('JSONPathSyntaxError', () => {
    it('is exported', () => {
      expect(JSONPathSyntaxError).to.be.a('function');
    });

    it('is thrown for invalid paths', () => {
      expect(() => parse('invalid')).to.throw(JSONPathSyntaxError);
    });

    it('has correct name property', () => {
      try {
        parse('invalid');
        expect.fail('Should have thrown');
      } catch (e) {
        expect((e as Error).name).to.equal('JSONPathSyntaxError');
      }
    });

    it('is instanceof Error', () => {
      try {
        parse('invalid');
        expect.fail('Should have thrown');
      } catch (e) {
        expect(e).to.be.instanceOf(Error);
        expect(e).to.be.instanceOf(JSONPathSyntaxError);
      }
    });
  });
});
