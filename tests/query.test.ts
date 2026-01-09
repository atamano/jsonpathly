/**
 * Query Function Tests
 *
 * Comprehensive tests for the query() function covering:
 * - Dot notation: $.key, $.*
 * - Bracket notation: $['key'], $[0]
 * - Recursive descent: $..key
 * - Array slices: $[start:end:step]
 * - Filters: $[?(@.key == value)]
 * - Comparators: ==, !=, <, <=, >, >=
 * - Logical operators: &&, ||, !
 * - RFC 9535 functions: length(), count(), match(), search(), value()
 */
import { query } from '../src/handler/query';
import { JSONPathSyntaxError } from '../src/parser/errors';
import { expect } from 'chai';

describe('query()', () => {
  // ============================================
  // DOT NOTATION
  // ============================================

  describe('dot notation', () => {
    const data = {
      string: 'string',
      array: [1, 2, 3, 4],
      nested: { object: 1 },
    };

    it('accesses simple property', () => {
      expect(query(data, '$.string')).to.equal('string');
    });

    it('accesses array by index', () => {
      expect(query(data, '$.array.2')).to.equal(3);
    });

    it('returns undefined for missing property', () => {
      expect(query(data, '$.missing')).to.be.undefined;
    });

    it('accesses negative index', () => {
      expect(query(data, '$.array.-1')).to.equal(4);
    });

    it('accesses nested property', () => {
      expect(query(data, '$.nested.object')).to.equal(1);
    });

    it('uses wildcard for all values', () => {
      expect(query(data, '$.*')).to.deep.equal(Object.values(data));
    });

    it('combines wildcard with property', () => {
      expect(query(data, '$.*.object')).to.deep.equal([1]);
    });

    it('handles key with underscore and dash', () => {
      const obj = { 'key_underscore-dash': 'value' };
      expect(query(obj, '$.key_underscore-dash')).to.equal('value');
    });
  });

  // ============================================
  // RECURSIVE DESCENT
  // ============================================

  describe('recursive descent', () => {
    const data = {
      nested: {
        nested: [
          { nested: 2, exist: true },
          { nested: 3, test: { nested: [] } },
        ],
      },
      other: { object: { test: '1' } },
    };

    it('finds all matching properties', () => {
      expect(query(data, '$..nested..nested..nested')).to.deep.equal([2, 3, []]);
    });

    it('returns empty for non-existent property', () => {
      expect(query(data, '$..notExist')).to.deep.equal([]);
    });

    it('combines with bracket notation', () => {
      expect(query(data, '$..["nested"].nested..test')).to.deep.equal([data.nested.nested[1].test]);
    });

    it('accesses by index in recursive descent', () => {
      expect(query(data, '$..nested.nested[0]')).to.deep.equal([data.nested.nested[0]]);
    });

    describe('with wildcard', () => {
      it('finds nested objects', () => {
        const obj = { store: { book: [1, 2, 3] } };
        expect(query(obj, '$.*.book')).to.deep.equal([[1, 2, 3]]);
      });

      it('recursively finds all items', () => {
        const obj = { store: { book: [1, 2, 3] } };
        expect(query(obj, '$..*..book[*]')).to.deep.equal([1, 2, 3]);
      });
    });

    describe('with filters', () => {
      const items = {
        number: 2,
        nested: {
          nested: [{ number: 1, exist: true }, { number: 2 }, { number: 3 }],
        },
      };

      it('filters in recursive descent', () => {
        expect(query(items, '$..nested[?(@.number==1)]')).to.deep.equal([items.nested.nested[0]]);
      });

      it('filters with comparison to root', () => {
        expect(query(items, '$..nested[?(@.number < $.number)]')).to.deep.equal([items.nested.nested[0]]);
      });
    });
  });

  // ============================================
  // BRACKET NOTATION - NUMERIC
  // ============================================

  describe('bracket notation - numeric', () => {
    const data = {
      string: 'stringValue',
      number: 0,
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    it('accesses by negative index', () => {
      expect(query(data, '$.array[-1]')).to.equal(9);
    });

    it('accesses by positive index', () => {
      expect(query(data, '$.array[1]')).to.equal(2);
    });

    it('accesses multiple indices', () => {
      expect(query(data, '$.array[1,3,5]')).to.deep.equal([2, 4, 6]);
    });

    it('returns empty for out of bounds indices', () => {
      expect(query(data, '$.array[10,11,12]')).to.deep.equal([]);
    });

    it('returns undefined for single out of bounds index', () => {
      expect(query(data, '$.array[10]')).to.be.undefined;
    });

    it('returns undefined for index on string', () => {
      expect(query(data, '$.string[0]')).to.be.undefined;
    });

    it('returns undefined for index on number', () => {
      expect(query(data, '$.number[0]')).to.be.undefined;
    });
  });

  // ============================================
  // BRACKET NOTATION - STRING
  // ============================================

  describe('bracket notation - string', () => {
    const data = {
      string: 'stringValue',
      number: 0,
      nested: { object: { test: '1' } },
    };

    it('accesses by quoted string', () => {
      expect(query(data, '$["string"]')).to.equal('stringValue');
    });

    it('accesses multiple keys', () => {
      expect(query(data, '$["string", "number"]')).to.deep.equal(['stringValue', 0]);
    });

    it('accesses unquoted identifiers', () => {
      expect(query(data, '$[string, number]')).to.deep.equal(['stringValue', 0]);
    });

    it('accesses nested with bracket notation', () => {
      expect(query(data, '$["nested"]["object"]')).to.deep.equal(data.nested.object);
    });

    it('uses wildcard in brackets', () => {
      expect(query(data, '$[*]')).to.deep.equal(Object.values(data));
    });
  });

  // ============================================
  // ARRAY SLICES
  // ============================================

  describe('array slices', () => {
    const data = {
      string: 'stringValue',
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };

    it('returns empty for slice on string', () => {
      expect(query(data, '$.string[1:3]')).to.deep.equal([]);
    });

    it('slices with start and end', () => {
      expect(query(data, '$.array[1:3]')).to.deep.equal([2, 3]);
    });

    it('slices from negative to end', () => {
      expect(query(data, '$.array[-1:]')).to.deep.equal([9]);
    });

    it('slices from start to index', () => {
      expect(query(data, '$.array[:3]')).to.deep.equal([1, 2, 3]);
    });

    it('returns empty for invalid range', () => {
      expect(query(data, '$.array[5:2]')).to.deep.equal([]);
    });

    it('slices with step', () => {
      expect(query(data, '$.array[:7:2]')).to.deep.equal([1, 3, 5, 7]);
    });

    it('slices with step only', () => {
      expect(query(data, '$.array[::3]')).to.deep.equal([1, 4, 7]);
    });

    it('slices with start and step', () => {
      expect(query(data, '$.array[2::3]')).to.deep.equal([3, 6, 9]);
    });

    it('slices all elements', () => {
      expect(query(data, '$.array[:]')).to.deep.equal(data.array);
    });

    it('slices with all parameters', () => {
      expect(query(data, '$.array[0:2:2]')).to.deep.equal([1]);
    });
  });

  // ============================================
  // COMPARATORS
  // ============================================

  describe('comparators', () => {
    const data = {
      items: [
        { number: 2, string: 'ABC', exist: true, array: [1, 2, 3], str: '123' },
        { number: 5, string: 'BCD', array: [4, 5, 6], str: '' },
        { number: 7, string: 'CDE', array: [4, 5, 6], arr: [] },
      ],
    };

    describe('equality', () => {
      it('matches equal numbers', () => {
        expect(query(data, '$.items[?(@.number==2)].number')).to.deep.equal([2]);
      });

      it('does not match string to number', () => {
        expect(query(data, '$.items[?(@.number=="2")]..number')).to.deep.equal([]);
      });

      it('matches not equal', () => {
        expect(query(data, '$.items[?(@.number!=2)].number')).to.deep.equal([5, 7]);
      });
    });

    describe('numeric comparison', () => {
      it('matches greater than or equal', () => {
        expect(query(data, '$.items[?(@.number>=5)].number')).to.deep.equal([5, 7]);
      });

      it('matches greater than', () => {
        expect(query(data, '$.items[?(@.number>5)].number')).to.deep.equal([7]);
      });

      it('matches less than or equal', () => {
        expect(query(data, '$.items[?(@.number<=5)].number')).to.deep.equal([2, 5]);
      });

      it('matches less than', () => {
        expect(query(data, '$.items[?(@.number<5)].number')).to.deep.equal([2]);
      });
    });

    describe('existence check', () => {
      it('matches when property exists and is truthy', () => {
        expect(query(data, '$.items[?(@.exist)].number')).to.deep.equal([2]);
      });
    });

    describe('arithmetic operations', () => {
      it('evaluates multiplication', () => {
        expect(query(data, '$.items[?(@.number*2==@.number+@.number)]..number')).to.deep.equal([2, 5, 7]);
      });

      it('matches current and root paths', () => {
        expect(query(data, '$.items[?(@)]..number')).to.deep.equal([2, 5, 7]);
      });
    });
  });

  // ============================================
  // COMPARATOR OPERATIONS
  // ============================================

  describe('arithmetic in comparators', () => {
    const data = {
      number: 0,
      items: [
        { number: 2, string: 'ABC', exist: true },
        { number: 5, string: 'BCD' },
        { number: 7, string: 'CDE' },
      ],
    };

    it('adds to root value', () => {
      expect(query(data, '$.items[?(@.number>$.number+3)]..number')).to.deep.equal([5, 7]);
    });

    it('handles complex arithmetic', () => {
      expect(query(data, '$.items[?(@.number>$.number+7-10/10)]..number')).to.deep.equal([7]);
    });

    it('handles division by zero', () => {
      expect(query(data, '$.items[?(@.number>$.number+7-10/0)]..number')).to.deep.equal([]);
    });

    it('respects operator precedence', () => {
      expect(query(data, '$.items[?(@.number>$.number+2+2*2)]..number')).to.deep.equal([7]);
    });

    it('respects parentheses', () => {
      expect(query(data, '$.items[?(@.number>$.number+(2+2)*2)]..number')).to.deep.equal([]);
    });

    it('throws on missing operator', () => {
      expect(() => query(data, '$.items[?(@.number>3 4)]..number')).to.throw(Error);
    });
  });

  // ============================================
  // LOGICAL EXPRESSIONS
  // ============================================

  describe('logical expressions', () => {
    const data = {
      number: 0,
      items: [
        { number: 2, string: 'ABC', exist: true, array: [1, 2, 3] },
        { number: 5, string: 'BCD', array: [4, 5, 6] },
        { number: 7, string: 'CDE', array: [4, 5, 6] },
      ],
    };

    it('uses OR operator', () => {
      expect(query(data, '$.items[?(@.number==2 || @.number==7)].number')).to.deep.equal([2, 7]);
    });

    it('uses AND operator', () => {
      expect(query(data, '$.items[?(4 in @.array && @.string=="BCD")].number')).to.deep.equal([5]);
    });

    it('combines AND and OR', () => {
      expect(query(data, '$.items[?((4 in @.array && @.string=="BCD") || @.number==2)].number'))
        .to.deep.equal([2, 5]);
    });

    it('uses NOT operator', () => {
      expect(query(data, '$.items[?(!((4 in @.array && @.string=="BCD") || @.number==2))].number'))
        .to.deep.equal([7]);
    });

    it('references root in filter', () => {
      expect(query(data, '$.items[?($.number==0)].number')).to.deep.equal([2, 5, 7]);
    });
  });

  // ============================================
  // REGEX OPERATOR
  // ============================================

  describe('regex operator', () => {
    const strings = ['Hello World !', 'hello Earth !', 'Good Morning'];

    it('matches case-insensitive', () => {
      expect(query(strings, '$[?(@ =~ /hello/i)]')).to.deep.equal([strings[0], strings[1]]);
    });

    it('matches with global flag', () => {
      expect(query(strings, '$[?(@ =~ /World/g)]')).to.deep.equal([strings[0]]);
    });

    it('returns empty for no match', () => {
      expect(query(strings, '$[?(@ =~ /bad/g)]')).to.deep.equal([]);
    });

    it('matches all with wildcard', () => {
      expect(query(strings, '$[?(@ =~ /.*/g)]')).to.deep.equal(strings);
    });

    it('does not match numbers', () => {
      expect(query([1], '$[?(@ =~ /.*/g)]')).to.deep.equal([]);
    });
  });

  // ============================================
  // OPTIONS
  // ============================================

  describe('returnArray option', () => {
    const data = { string: 'stringValue', number: 0 };

    it('returns array for single value', () => {
      expect(query(data, '$.number', { returnArray: true })).to.deep.equal([0]);
    });

    it('returns array for wildcard', () => {
      expect(query(data, '$.*', { returnArray: true })).to.deep.equal(Object.values(data));
    });

    it('returns array for string value', () => {
      expect(query(data, '$.string', { returnArray: true })).to.deep.equal(['stringValue']);
    });

    it('returns empty array for missing property', () => {
      expect(query(data, '$.notExist', { returnArray: true })).to.deep.equal([]);
    });
  });

  describe('hideExceptions option', () => {
    const cases = [
      '$.bad',
      'bad',
      '',
      '$...',
      '$.$',
      '$["bad Quote\']',
      '@',
      '$[1:2:3:4]',
    ];

    for (const path of cases) {
      it(`returns undefined for invalid path: ${path || '(empty)'}`, () => {
        expect(query({ test: 1 }, path, { hideExceptions: true })).to.be.undefined;
      });
    }

    it('returns empty array with returnArray', () => {
      expect(query({}, 'bad', { returnArray: true, hideExceptions: true })).to.deep.equal([]);
    });
  });

  // ============================================
  // INVALID PATHS
  // ============================================

  describe('invalid paths', () => {
    const invalidPaths = [
      'bad',
      '',
      '$...',
      '$.$',
      '$["bad Quote\']',
      '$[bad Quote\']',
      '@',
      '$[?(@.test == undefined)]',
      '$[1:2:3:4]',
      '$[[1:2:3]]',
    ];

    for (const path of invalidPaths) {
      it(`throws for: ${path || '(empty)'}`, () => {
        expect(() => query({ test: 1 }, path)).to.throw(JSONPathSyntaxError);
      });
    }
  });

  // ============================================
  // RFC 9535 FUNCTIONS
  // ============================================

  describe('RFC 9535 functions', () => {
    describe('length()', () => {
      it('returns string length', () => {
        // RFC 9535: filters iterate over array elements
        expect(query([{ str: 'hello' }], '$[?(length(@.str) == 5)]', { returnArray: true }))
          .to.deep.equal([{ str: 'hello' }]);
      });

      it('returns array length', () => {
        expect(query([{ arr: [1, 2, 3] }], '$[?(length(@.arr) == 3)]', { returnArray: true }))
          .to.deep.equal([{ arr: [1, 2, 3] }]);
      });

      it('returns object key count', () => {
        expect(query([{ obj: { a: 1, b: 2 } }], '$[?(length(@.obj) == 2)]', { returnArray: true }))
          .to.deep.equal([{ obj: { a: 1, b: 2 } }]);
      });

      it('filters by length comparison', () => {
        const data = [{ str: 'ab' }, { str: 'abc' }, { str: 'abcd' }];
        expect(query(data, '$[?(length(@.str) > 2)]', { returnArray: true }))
          .to.deep.equal([{ str: 'abc' }, { str: 'abcd' }]);
      });
    });

    describe('count()', () => {
      it('counts array elements', () => {
        expect(query([{ items: [1, 2, 3] }], '$[?(count(@.items) == 3)]', { returnArray: true }))
          .to.deep.equal([{ items: [1, 2, 3] }]);
      });

      it('counts empty array as zero', () => {
        expect(query([{ items: [] }], '$[?(count(@.items) == 0)]', { returnArray: true }))
          .to.deep.equal([{ items: [] }]);
      });
    });

    describe('match()', () => {
      it('matches full string', () => {
        const data = [{ name: 'foo' }, { name: 'bar' }, { name: 'foobar' }];
        expect(query(data, '$[?(match(@.name, "foo"))]', { returnArray: true }))
          .to.deep.equal([{ name: 'foo' }]);
      });

      it('matches with regex pattern', () => {
        const data = [{ name: 'hello' }, { name: 'world' }];
        expect(query(data, '$[?(match(@.name, "hel.*"))]', { returnArray: true }))
          .to.deep.equal([{ name: 'hello' }]);
      });
    });

    describe('search()', () => {
      it('finds substring', () => {
        const data = [{ name: 'foobar' }, { name: 'bar' }, { name: 'baz' }];
        expect(query(data, '$[?(search(@.name, "foo"))]', { returnArray: true }))
          .to.deep.equal([{ name: 'foobar' }]);
      });

      it('finds pattern anywhere in string', () => {
        const data = [{ text: 'hello world' }, { text: 'goodbye' }];
        expect(query(data, '$[?(search(@.text, "wor"))]', { returnArray: true }))
          .to.deep.equal([{ text: 'hello world' }]);
      });
    });

    describe('value()', () => {
      it('extracts single value from array', () => {
        expect(query([{ items: [42] }], '$[?(value(@.items) == 42)]', { returnArray: true }))
          .to.deep.equal([{ items: [42] }]);
      });

      it('extracts single string value', () => {
        expect(query([{ single: 'test' }], '$[?(value(@.single) == "test")]', { returnArray: true }))
          .to.deep.equal([{ single: 'test' }]);
      });
    });

    describe('filter without parentheses', () => {
      it('matches with RFC 9535 syntax', () => {
        const data = [{ key: 42 }, { key: 10 }];
        expect(query(data, '$[?@.key==42]', { returnArray: true }))
          .to.deep.equal([{ key: 42 }]);
      });

      it('uses comparison operators', () => {
        const data = [{ a: 1, b: 2 }, { a: 3, b: 4 }];
        expect(query(data, '$[?@.a > 1]', { returnArray: true }))
          .to.deep.equal([{ a: 3, b: 4 }]);
      });
    });

    describe('filter on objects', () => {
      it('filters object values with wildcard', () => {
        // Tests Handler.ts lines 474-480 - filter on plain object values
        const data = {
          items: {
            first: { active: true, value: 10 },
            second: { active: false, value: 20 },
            third: { active: true, value: 30 },
          },
        };
        expect(query(data, '$.items[?(@.active == true)]', { returnArray: true }))
          .to.deep.equal([
            { active: true, value: 10 },
            { active: true, value: 30 },
          ]);
      });

      it('filters object children by nested property', () => {
        const data = {
          users: {
            alice: { age: 25, active: true },
            bob: { age: 35, active: false },
            carol: { age: 30, active: true },
          },
        };
        expect(query(data, '$.users[?(@.age > 28)]', { returnArray: true }))
          .to.deep.equal([
            { age: 35, active: false },
            { age: 30, active: true },
          ]);
      });
    });
  });

  // ============================================
  // NESTED FILTER EXISTENCE CHECKS
  // ============================================

  describe('nested filter existence', () => {
    it('returns false when recursive descent finds nothing', () => {
      // Tests Handler.ts lines 434-436 - isIndefinite check with empty results
      const data = [
        { a: { b: 1 } },
        { a: { c: 2 } },
      ];
      // Filter using recursive descent that returns empty for some items
      expect(query(data, '$[?(@..b)]', { returnArray: true }))
        .to.deep.equal([{ a: { b: 1 } }]);
    });

    it('returns true when recursive descent finds values', () => {
      const data = [
        { nested: { deep: { target: 1 } } },
        { nested: { other: 2 } },
      ];
      expect(query(data, '$[?(@..target)]', { returnArray: true }))
        .to.deep.equal([{ nested: { deep: { target: 1 } } }]);
    });

    it('handles wildcard in existence check', () => {
      const data = [
        { items: [1, 2, 3] },
        { items: [] },
      ];
      expect(query(data, '$[?(@.items[*])]', { returnArray: true }))
        .to.deep.equal([{ items: [1, 2, 3] }]);
    });

    it('checks existence using root reference in filter', () => {
      // Tests Handler.ts lines 424-430 - root reference in filter existence
      const data = {
        threshold: 15,
        items: [
          { value: 10 },
          { value: 20 },
        ],
      };
      expect(query(data, '$.items[?($.threshold)]', { returnArray: true }))
        .to.deep.equal([{ value: 10 }, { value: 20 }]);
    });

    it('returns empty when root reference does not exist', () => {
      // Tests Handler.ts lines 424-430 - root reference to missing property
      const data = {
        items: [{ value: 10 }],
      };
      expect(query(data, '$.items[?($.threshold)]', { returnArray: true }))
        .to.deep.equal([]);
    });

    it('handles root reference with indefinite results', () => {
      // Tests Handler.ts lines 426-428 - root with wildcard/filter
      const data = {
        tags: ['a', 'b', 'c'],
        items: [{ id: 1 }],
      };
      expect(query(data, '$.items[?($.tags[*])]', { returnArray: true }))
        .to.deep.equal([{ id: 1 }]);
    });

    it('returns empty when root indefinite result is empty', () => {
      // Tests Handler.ts lines 426-428 - root with empty indefinite result
      const data = {
        tags: [],
        items: [{ id: 1 }],
      };
      expect(query(data, '$.items[?($.tags[*])]', { returnArray: true }))
        .to.deep.equal([]);
    });
  });

  // ============================================
  // NEGATIVE NUMBERS IN FILTERS
  // ============================================

  describe('negative numbers in filters', () => {
    it('compares with negative literal', () => {
      const data = [{ value: -5 }, { value: 5 }, { value: -10 }];
      expect(query(data, '$[?(@.value == -5)]', { returnArray: true }))
        .to.deep.equal([{ value: -5 }]);
    });

    it('compares with negative in arithmetic', () => {
      const data = [{ value: 3 }];
      expect(query(data, '$[?(@.value == 5 + -2)]', { returnArray: true }))
        .to.deep.equal([{ value: 3 }]);
    });

    it('handles negative result from subtraction', () => {
      const data = [{ value: -2 }];
      expect(query(data, '$[?(@.value == 3 - 5)]', { returnArray: true }))
        .to.deep.equal([{ value: -2 }]);
    });
  });

  // ============================================
  // SLICE EDGE CASES
  // ============================================

  describe('slice edge cases', () => {
    it('returns empty for step=0 (RFC 9535)', () => {
      const data = ['a', 'b', 'c', 'd', 'e'];
      expect(query(data, '$[0:3:0]', { returnArray: true }))
        .to.deep.equal([]);
    });
  });

  // ============================================
  // DOT NUMERIC LITERAL EDGE CASES
  // ============================================

  describe('dot numeric literal edge cases', () => {
    it('returns undefined when object has no matching property', () => {
      const data = { a: 1, b: 2 };
      expect(query(data, '$.5')).to.be.undefined;
    });

    it('returns undefined when accessing numeric property on primitive', () => {
      const data = { value: 'string' };
      expect(query(data, '$.value.0')).to.be.undefined;
    });

    it('accesses numeric property on object', () => {
      const data = { '0': 'zero', '1': 'one' };
      expect(query(data, '$.0')).to.equal('zero');
    });
  });

  // ============================================
  // STRING COMPARISONS (RFC 9535)
  // ============================================

  describe('string comparisons', () => {
    const data = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' },
    ];

    it('compares strings with less than', () => {
      expect(query(data, '$[?(@.name < "banana")]', { returnArray: true }))
        .to.deep.equal([{ name: 'apple' }]);
    });

    it('compares strings with less than or equal', () => {
      expect(query(data, '$[?(@.name <= "banana")]', { returnArray: true }))
        .to.deep.equal([{ name: 'apple' }, { name: 'banana' }]);
    });

    it('compares strings with greater than', () => {
      expect(query(data, '$[?(@.name > "banana")]', { returnArray: true }))
        .to.deep.equal([{ name: 'cherry' }]);
    });

    it('compares strings with greater than or equal', () => {
      expect(query(data, '$[?(@.name >= "banana")]', { returnArray: true }))
        .to.deep.equal([{ name: 'banana' }, { name: 'cherry' }]);
    });

    it('returns empty when comparing string with number', () => {
      expect(query(data, '$[?(@.name < 100)]', { returnArray: true }))
        .to.deep.equal([]);
    });

    it('returns empty when comparing number with string', () => {
      const numData = [{ value: 10 }, { value: 20 }];
      expect(query(numData, '$[?(@.value < "30")]', { returnArray: true }))
        .to.deep.equal([]);
    });
  });

  // ============================================
  // BUG FIX REGRESSION TESTS
  // ============================================

  describe('bug fix regressions', () => {
    describe('negative step slice (RFC 9535 Section 2.3.4.2)', () => {
      const arr = [0, 1, 2, 3, 4];

      it('$[::-1] reverses the array', () => {
        expect(query(arr, '$[::-1]')).to.deep.equal([4, 3, 2, 1, 0]);
      });

      it('$[4:0:-1] returns elements from index 4 down to 1', () => {
        expect(query(arr, '$[4:0:-1]')).to.deep.equal([4, 3, 2, 1]);
      });

      it('$[3:0:-2] returns every second element from 3 down to 1', () => {
        expect(query(arr, '$[3:0:-2]')).to.deep.equal([3, 1]);
      });

      it('$[2::-1] returns elements from index 2 to start', () => {
        expect(query(arr, '$[2::-1]')).to.deep.equal([2, 1, 0]);
      });
    });

    describe('subtraction without whitespace', () => {
      it('@.a-@.b works without spaces', () => {
        expect(query([{ a: 5, b: 2 }], '$[?@.a-@.b>0]')).to.deep.equal([{ a: 5, b: 2 }]);
      });

      it('@.a-5 works (subtraction with literal)', () => {
        expect(query([{ a: 10 }], '$[?@.a-5>0]')).to.deep.equal([{ a: 10 }]);
      });

      it('@.a--5 works (double minus for negative literal)', () => {
        expect(query([{ a: 10 }], '$[?@.a--5>10]')).to.deep.equal([{ a: 10 }]);
      });

      it('hyphenated keys still work', () => {
        expect(query([{ 'my-key': 1 }], '$[*].my-key')).to.deep.equal([1]);
        expect(query([{ 'my-key-name': 2 }], '$[*].my-key-name')).to.deep.equal([2]);
      });
    });

    describe('undefined array elements', () => {
      it('$[*] includes undefined elements', () => {
        const arr = [1, undefined, 3];
        expect(query(arr, '$[*]')).to.deep.equal([1, undefined, 3]);
      });

      it('$[1] returns undefined value (not "no match")', () => {
        const arr = [1, undefined, 3];
        const result = query(arr, '$[1]');
        // The result is the undefined value itself
        expect(result).to.equal(undefined);
      });
    });

    describe('I-Regexp validation without lookbehind', () => {
      it('match() works with basic patterns', () => {
        expect(query([{ v: 'abc' }], '$[?(match(@.v, "abc"))]')).to.deep.equal([{ v: 'abc' }]);
      });

      it('match() rejects word boundary \\b outside char class', () => {
        expect(query([{ v: 'test' }], '$[?(match(@.v, "\\\\btest\\\\b"))]')).to.deep.equal([]);
      });

      it('match() allows \\b inside char class (backspace)', () => {
        // \b inside [...] means backspace, which is allowed
        expect(query([{ v: 'a' }], '$[?(match(@.v, "[a\\\\b]"))]')).to.deep.equal([{ v: 'a' }]);
      });

      it('match() rejects backreferences', () => {
        expect(query([{ v: 'aa' }], '$[?(match(@.v, "(a)\\\\1"))]')).to.deep.equal([]);
      });

      it('match() rejects lookahead', () => {
        expect(query([{ v: 'test' }], '$[?(match(@.v, "t(?=est)"))]')).to.deep.equal([]);
      });
    });
  });
});
