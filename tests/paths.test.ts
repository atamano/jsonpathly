/**
 * Paths Function Tests
 *
 * Tests for the paths() function which returns JSONPath normalized paths
 * for matched values instead of the values themselves.
 *
 * Test categories:
 * - Path/query consistency: paths() results should resolve to same values as query()
 * - Recursive descent: $..property patterns
 * - Wildcards: $.* and $[*]
 * - Array slices: $[start:end:step]
 * - Filter expressions: $[?(@.condition)]
 * - RFC 9535 normalized format: single-quoted name selectors
 * - Error handling: hideExceptions option
 */
import { paths, PathsOptions } from '../src/handler/paths';
import { query } from '../src/handler/query';
import { expect } from 'chai';

describe('Paths Function', () => {
  // ============================================
  // TEST DATA
  // ============================================

  const PAYLOAD = {
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    nested: {
      nested: [
        {
          nested: 2,
          exist: true,
        },
        {
          nested: 3,
          test: { nested: [] },
        },
      ],
    },
    other: {
      nested: 5,
      object: {
        test: '1',
        nested: 10,
      },
    },
  };

  // ============================================
  // PATH/QUERY CONSISTENCY
  // ============================================

  describe('path/query consistency', () => {
    const consistencyCases = [
      // Non-existent paths
      { path: '$.string', desc: 'non-existent property' },
      { path: '$.array.2', desc: 'array index via dot notation' },
      { path: '$.bad', desc: 'missing property' },

      // Filter expressions
      { path: '$.array[?(@ > 3)]', desc: 'filter with comparator' },
      { path: '$..nested[?(@.number==1)]', desc: 'filter in recursive descent' },
      { path: '$..[?(@.number < 2 )]', desc: 'recursive descent with filter' },
      { path: '$..nested[?(@.number>=2)]', desc: 'filter with >=operator' },
      { path: '$..nested[?(@.number>=2)].number', desc: 'filter followed by property' },
      { path: '$..nested[?(@.bad+2>=2)].number', desc: 'filter with arithmetic' },
      { path: '$..nested[?(@.exist)]', desc: 'existence filter' },

      // Wildcards
      { path: '$.*.book', desc: 'wildcard property access' },
      { path: '$..*..book', desc: 'recursive descent with wildcard' },
      { path: '$..*..book[*]', desc: 'recursive descent with array wildcard' },
      { path: '$..*.nested..nested', desc: 'chained wildcards and recursion' },
      { path: '$..*..*[0].nested', desc: 'complex wildcard chain' },
      { path: '$..*..*[10].nested', desc: 'wildcard with out-of-bounds index' },
      { path: '$..*..nested.*', desc: 'recursive then wildcard' },

      // Recursive descent
      { path: '$..nested', desc: 'recursive descent for nested' },
      { path: '$..nested.nested[*]["nested"]', desc: 'complex nested access' },
      { path: '$..*.object', desc: 'recursive wildcard with property' },
      { path: '$..*.object..test', desc: 'recursive with object property' },
      { path: '$..*.object.test', desc: 'wildcard then direct access' },
      { path: '$.*.object.test', desc: 'single wildcard with path' },

      // Union selectors
      { path: '$..nested[0,2]', desc: 'union index selector' },
      { path: '$..nested["value", "exist"]', desc: 'union string selector' },

      // Negative indices
      { path: '$.array[-1]', desc: 'negative index' },

      // Out of bounds
      { path: '$.array[10,11,12]', desc: 'multiple out-of-bounds indices' },
      { path: '$.array[10]', desc: 'single out-of-bounds index' },

      // Slices
      { path: '$.string[1:3]', desc: 'slice on string (should be empty)' },
      { path: '$.array[1:3]', desc: 'basic slice' },
      { path: '$.array[-1:]', desc: 'negative start slice' },
      { path: '$.array[:3]', desc: 'slice with end only' },
      { path: '$.array[5:2]', desc: 'inverted slice (empty result)' },
      { path: '$.array[:7:2]', desc: 'slice with step' },
      { path: '$.array[::3]', desc: 'slice every 3rd element' },
      { path: '$.array[2::3]', desc: 'slice from index 2 every 3rd' },
      { path: '$.array[:2:]', desc: 'slice with trailing colon' },
      { path: '$.array[:2]', desc: 'slice first 2' },
      { path: '$.array[7::]', desc: 'slice from index 7' },
      { path: '$.array[5::2]', desc: 'slice from 5 with step 2' },
      { path: '$.array[:]', desc: 'full slice' },
      { path: '$.array[0:2:2]', desc: 'slice with all parts' },
    ];

    for (const { path, desc } of consistencyCases) {
      it(`${desc}: ${path}`, () => {
        const queryResult = query(PAYLOAD, path, { returnArray: true });
        const pathsResult = paths(PAYLOAD, path);
        const resolvedResult = query(PAYLOAD, pathsResult as string[]);

        expect(queryResult).to.deep.equal(resolvedResult);
      });
    }
  });

  // ============================================
  // EXPECTED PATH OUTPUT
  // ============================================

  describe('expected path output', () => {
    const SIMPLE_PAYLOAD = {
      string: 'string',
      array: [1, 2, 3, 4],
      nested: {
        object: 1,
      },
    };

    const outputCases = [
      { path: '$.string', expected: ["$['string']"], desc: 'simple property' },
      { path: '$.array.2', expected: ["$['array'][2]"], desc: 'array index' },
      { path: '$.bad', expected: [], desc: 'missing property' },
      { path: '$.array[?(@ > 3)]', expected: ["$['array'][3]"], desc: 'filter result' },
    ];

    for (const { path, expected, desc } of outputCases) {
      it(`returns correct path for ${desc}: ${path}`, () => {
        const result = paths(SIMPLE_PAYLOAD, path);
        expect(result).to.deep.equal(expected);
      });
    }
  });

  // ============================================
  // ERROR HANDLING
  // ============================================

  describe('error handling', () => {
    it('returns empty array with hideExceptions for invalid path', () => {
      const result = paths({}, '$.array["badQUote\']', { hideExceptions: true } as PathsOptions);
      expect(result).to.deep.equal([]);
    });

    it('throws for invalid path by default', () => {
      expect(() => paths({}, 'bad')).to.throw(Error);
    });
  });
});
