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
import { query, paths, parse } from '../src/index';

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
      const result = paths(data, "$[\"it's\"]");
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
});
