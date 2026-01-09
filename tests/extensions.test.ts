/**
 * Extension Operators Tests
 *
 * Tests for jsonpathly-specific extensions beyond RFC 9535:
 *
 * Value membership:
 * - `in`     - Check if value is in array: @.status in ['active', 'pending']
 * - `nin`    - Check if value is NOT in array: @.status nin ['closed']
 *
 * Array comparisons:
 * - `subsetof` - All elements in left exist in right: [1,2] subsetof @.nums
 * - `anyof`    - Any element in left exists in right: [1,10] anyof @.nums
 * - `noneof`   - No elements in left exist in right: [10,20] noneof @.nums
 *
 * Size checks:
 * - `sizeof` - Arrays have same length: @.arr sizeof [1,2,3]
 * - `size`   - Array/string has specific length: @.arr size 5
 * - `empty`  - Array/string is empty: @.arr empty
 *
 * Pattern matching:
 * - `=~`     - Regex match: @.name =~ /pattern/flags
 */
import { query } from '../src/handler/query';
import { expect } from 'chai';

describe('Extension Operators', () => {
  // ============================================
  // VALUE MEMBERSHIP OPERATORS
  // ============================================

  describe('in - value in array', () => {
    const items = [
      { id: 1, tags: ['a', 'b', 'c'] },
      { id: 2, tags: ['d', 'e', 'f'] },
      { id: 3, tags: ['a', 'd', 'g'] },
    ];

    it('finds items where value exists in array', () => {
      const result = query(items, '$[?("a" in @.tags)]');
      expect(result).to.deep.equal([items[0], items[2]]);
    });

    it('returns empty when value not found', () => {
      const result = query(items, '$[?("z" in @.tags)]');
      expect(result).to.deep.equal([]);
    });

    it('checks scalar against array of values', () => {
      const result = query(items, '$[?(@.id in [1, 3])]');
      expect(result).to.deep.equal([items[0], items[2]]);
    });

    it('returns empty for non-array operand', () => {
      const result = query(items, '$[?(@.id in "123")]');
      expect(result).to.deep.equal([]);
    });

    it('handles numeric array membership', () => {
      const data = [{ val: 5 }, { val: 10 }, { val: 15 }];
      const result = query(data, '$[?(@.val in [1, 5, 10])]');
      expect(result).to.deep.equal([{ val: 5 }, { val: 10 }]);
    });
  });

  describe('nin - value not in array', () => {
    const items = [
      { status: 'active' },
      { status: 'pending' },
      { status: 'closed' },
    ];

    it('finds items where value is not in array', () => {
      const result = query(items, '$[?(@.status nin ["active", "pending"])]');
      expect(result).to.deep.equal([{ status: 'closed' }]);
    });

    it('returns all when none match exclusion list', () => {
      const result = query(items, '$[?(@.status nin ["unknown"])]');
      expect(result).to.deep.equal(items);
    });

    it('returns empty for non-array operand', () => {
      const result = query(items, '$[?(@.status nin "active")]');
      expect(result).to.deep.equal([]);
    });
  });

  // ============================================
  // ARRAY COMPARISON OPERATORS
  // ============================================

  describe('subsetof - all elements exist in target', () => {
    // RFC 9535: wrap in array since filters iterate over children
    const data = [{ nums: [1, 2, 3, 4, 5] }];

    it('matches when left is subset of right', () => {
      const result = query(data, '$[?([1, 2, 3] subsetof @.nums)]');
      expect(result).to.deep.equal(data);
    });

    it('rejects when left has elements not in right', () => {
      const result = query(data, '$[?([1, 2, 10] subsetof @.nums)]');
      expect(result).to.deep.equal([]);
    });

    it('accepts empty array as subset', () => {
      const result = query(data, '$[?([] subsetof @.nums)]');
      expect(result).to.deep.equal(data);
    });

    it('returns empty for non-array operands', () => {
      const result = query(data, '$[?(123 subsetof @.nums)]');
      expect(result).to.deep.equal([]);
    });

    it('handles duplicates in subset', () => {
      const result = query(data, '$[?([1, 1, 2] subsetof @.nums)]');
      expect(result).to.deep.equal(data);
    });
  });

  describe('anyof - any element exists in target', () => {
    const data = [{ nums: [1, 2, 3] }];

    it('matches when any element is found', () => {
      const result = query(data, '$[?([10, 2, 20] anyof @.nums)]');
      expect(result).to.deep.equal(data);
    });

    it('rejects when no elements are found', () => {
      const result = query(data, '$[?([10, 20, 30] anyof @.nums)]');
      expect(result).to.deep.equal([]);
    });

    it('returns empty for non-array operands', () => {
      const result = query(data, '$[?(123 anyof @.nums)]');
      expect(result).to.deep.equal([]);
    });
  });

  describe('noneof - no elements exist in target', () => {
    const data = [{ nums: [1, 2, 3] }];

    it('matches when no elements overlap', () => {
      const result = query(data, '$[?([10, 20, 30] noneof @.nums)]');
      expect(result).to.deep.equal(data);
    });

    it('rejects when any element overlaps', () => {
      const result = query(data, '$[?([10, 2, 30] noneof @.nums)]');
      expect(result).to.deep.equal([]);
    });

    it('returns empty for non-array operands', () => {
      const result = query(data, '$[?(123 noneof @.nums)]');
      expect(result).to.deep.equal([]);
    });
  });

  // ============================================
  // SIZE OPERATORS
  // ============================================

  describe('sizeof - arrays have same length', () => {
    // RFC 9535: wrap in array since filters iterate over children
    const data = [{ arr: [1, 2, 3, 4, 5] }];

    it('matches arrays with same length', () => {
      const result = query(data, '$[?(@.arr sizeof [10, 20, 30, 40, 50])]');
      expect(result).to.deep.equal(data);
    });

    it('rejects arrays with different lengths', () => {
      const result = query(data, '$[?(@.arr sizeof [1, 2])]');
      expect(result).to.deep.equal([]);
    });

    it('returns empty for non-array operands', () => {
      const result = query(data, '$[?(@.arr sizeof 5)]');
      expect(result).to.deep.equal([]);
    });

    it('compares string lengths', () => {
      // Tests comparators.ts line 83 - sizeof with strings
      const strData = [{ str: 'hello' }];
      const result = query(strData, '$[?(@.str sizeof "world")]');
      expect(result).to.deep.equal(strData);
    });

    it('rejects strings with different lengths', () => {
      const strData = [{ str: 'hello' }];
      const result = query(strData, '$[?(@.str sizeof "hi")]');
      expect(result).to.deep.equal([]);
    });
  });

  describe('size - check array/string length', () => {
    // RFC 9535: wrap in array since filters iterate over children
    const data = [{ arr: [1, 2, 3, 4, 5], str: 'hello' }];

    it('matches array with correct length', () => {
      const result = query(data, '$[?(@.arr size 5)]');
      expect(result).to.deep.equal(data);
    });

    it('matches string with correct length', () => {
      const result = query(data, '$[?(@.str size 5)]');
      expect(result).to.deep.equal(data);
    });

    it('rejects incorrect length', () => {
      const result = query(data, '$[?(@.arr size 3)]');
      expect(result).to.deep.equal([]);
    });

    it('returns empty for non-numeric size', () => {
      const result = query(data, '$[?(@.arr size "5")]');
      expect(result).to.deep.equal([]);
    });

    it('returns empty for non-sizable values', () => {
      const result = query([{ num: 123 }], '$[?(@.num size 3)]');
      expect(result).to.deep.equal([]);
    });
  });

  describe('empty - check if empty', () => {
    const items = [
      { arr: [], str: '', obj: {} },
      { arr: [1], str: 'a', obj: { a: 1 } },
    ];

    it('matches empty arrays', () => {
      const result = query(items, '$[?(@.arr empty)]');
      expect(result).to.deep.equal([items[0]]);
    });

    it('matches empty strings', () => {
      const result = query(items, '$[?(@.str empty)]');
      expect(result).to.deep.equal([items[0]]);
    });

    it('rejects non-empty arrays', () => {
      const result = query([{ arr: [1, 2, 3] }], '$[?(@.arr empty)]');
      expect(result).to.deep.equal([]);
    });

    it('rejects non-empty strings', () => {
      const result = query([{ str: 'hello' }], '$[?(@.str empty)]');
      expect(result).to.deep.equal([]);
    });

    it('returns false for non-array/non-string values', () => {
      // Tests comparators.ts line 122 - isEmpty with object/number/null
      const data = [{ obj: {} }, { num: 0 }, { val: null }];
      expect(query(data, '$[?(@.obj empty)]')).to.deep.equal([]);
      expect(query(data, '$[?(@.num empty)]')).to.deep.equal([]);
      expect(query(data, '$[?(@.val empty)]')).to.deep.equal([]);
    });
  });

  // ============================================
  // REGEX OPERATOR
  // ============================================

  describe('=~ regex match', () => {
    const strings = ['Hello World', 'hello earth', 'Good Morning'];

    it('matches with case-insensitive flag', () => {
      const result = query(strings, '$[?(@ =~ /hello/i)]');
      expect(result).to.deep.equal(['Hello World', 'hello earth']);
    });

    it('matches case-sensitive by default', () => {
      const result = query(strings, '$[?(@ =~ /World/)]');
      expect(result).to.deep.equal(['Hello World']);
    });

    it('returns empty for no matches', () => {
      const result = query(strings, '$[?(@ =~ /notfound/)]');
      expect(result).to.deep.equal([]);
    });

    it('matches all with wildcard pattern', () => {
      const result = query(strings, '$[?(@ =~ /.*/)]');
      expect(result).to.deep.equal(strings);
    });

    it('does not match non-strings', () => {
      const result = query([1, 2, 3], '$[?(@ =~ /1/)]');
      expect(result).to.deep.equal([]);
    });
  });

  // ============================================
  // COMBINED OPERATORS
  // ============================================

  describe('combined operators', () => {
    const products = [
      { name: 'Widget', tags: ['sale', 'popular'], price: 10 },
      { name: 'Gadget', tags: ['new'], price: 50 },
      { name: 'Gizmo', tags: ['sale', 'new', 'featured'], price: 30 },
    ];

    it('combines in with logical AND', () => {
      const result = query(products, '$[?("sale" in @.tags && @.price < 20)]');
      expect(result).to.deep.equal([products[0]]);
    });

    it('combines subsetof with logical OR', () => {
      const result = query(products, '$[?(["new"] subsetof @.tags || @.price < 15)]');
      expect(result).to.deep.equal(products);
    });

    it('combines anyof with size', () => {
      const result = query(products, '$[?(["popular", "featured"] anyof @.tags && @.tags size 3)]');
      expect(result).to.deep.equal([products[2]]);
    });
  });
});
