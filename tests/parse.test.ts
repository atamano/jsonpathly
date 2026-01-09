/**
 * Parser Tests
 *
 * Tests for the JSONPath parser (parse) and stringify functions:
 *
 * - Valid expression parsing and round-trip verification
 * - String literal handling (single/double quotes, escapes)
 * - Filter expressions with various operators
 * - Array slices and indices
 * - Recursive descent expressions
 * - Error handling with hideExceptions option
 *
 * Round-trip verification: parse(input) -> stringify() should reproduce
 * the input (normalized to RFC 9535 single-quote format).
 */
import { parse } from '../src/parser/parse';
import { stringify } from '../src/parser/stringify';
import { expect } from 'chai';

describe('Parser', () => {
  // ============================================
  // ROUND-TRIP TESTS (parse -> stringify)
  // ============================================

  describe('round-trip parsing', () => {
    /**
     * Test cases for parse/stringify round-trips.
     * Format: [input, expectedOutput]
     * If expectedOutput is empty, input (normalized to single quotes) is expected.
     */
    const roundTripCases: [string, string][] = [
      // Basic selectors
      ['$', ''],
      ['$[*]', ''],
      ['$[0]', ''],
      ['$[?(@.author)]', ''],

      // Bracket notation with quotes
      ['$["book"]', ''],
      ['$["book with space"]', ''],
      ["$['book with  \"double\" quotes']", "$['book with  \"double\" quotes']"],
      ['$["book with  \'single\' quotes"]', "$['book with  \\'single\\' quotes']"],
      ['$.book["test"].title', ''],

      // Recursive descent
      ['$..["book"]', ''],
      ['$..book[0][category, author]', ''],
      ['$..book[-1:].title', ''],
      ['$..book[0, 1].title', ''],
      ['$..*', ''],
    ];

    for (const [input, expected] of roundTripCases) {
      it(`parses and stringifies: ${input}`, () => {
        const tree = parse(input);

        if (expected) {
          expect(stringify(tree || null)).to.equal(expected);
        } else {
          // RFC 9535: stringify outputs single quotes for string literals
          expect(stringify(tree || null)).to.equal(input.replace(/"/g, "'"));
        }
      });
    }
  });

  // ============================================
  // FILTER EXPRESSIONS
  // ============================================

  describe('filter expressions', () => {
    const filterCases: [string, string][] = [
      // Basic comparators
      ['$.phoneNumbers[?(@.price < 30)]', ''],
      ['$.store.book[?(@.price < 10)]', ''],
      ['$.store.book[?(@.price == 10.2)]', ''],
      ['$.store.book[?(@.price == true)]', ''],
      ['$.store.book[?(@.price == false)]', ''],
      ['$.store.book[?(@.price == null)]', ''],

      // Comparators with root references
      ['$.store.book[?(@.price <= $.expensive)]', ''],
      ['$.store.book[?(@.price == $.expensive)]', ''],
      ['$.store.book[?(@.price != $.expensive)]', ''],
      ['$.store.book[?(@.price >= $.expensive)]', ''],
      ['$.store.book[?(@.price > $.expensive)]', ''],

      // Arithmetic in filters
      ['$.store.book[?(@.price < 8 + 2)]', ''],
      ['$.store.book[?(@.price < 8 * 2)]', ''],
      ['$.store.book[?(@.price < 8 / 2)]', ''],
      ['$.store.book[?(@.price < (8 / 2) + 1)]', ''],
      ['$.store.book[?(@.price < 8 + @.price)]', ''],
      ['$.store.book[?(@.price < 8 - 2)]', ''],

      // Complex logical expressions
      ['$.phoneNumbers[?((@.price < 30 && @.type == "iPhone") || @.num == 1)]', ''],
      ['$..phoneNumbers[?(!(@.price < 30 && !(@.type == "iPhone") && !(@.number)))]', ''],
      ['$..phoneNumbers[?(!(@.price < 30) && !(@.type == "iPhone") && !(@.number))]', ''],
      ['$..phoneNumbers[?(@.price < 30 && !(@.type == "iPhone" && @.number))]', ''],

      // Existence checks
      ['$..book[?(@.isbn)]', ''],
      ['$..book[?(!(@.isbn))]', ''],

      // String comparisons
      ["$..book[?(@.author == 'J.R.R. Tolkien')].title", ''],

      // Object comparison in filter
      ['$..book[?(@.author == {"test":1})].title', ''],
    ];

    for (const [input, expected] of filterCases) {
      it(`parses filter: ${input}`, () => {
        const tree = parse(input);

        if (expected) {
          expect(stringify(tree || null)).to.equal(expected);
        } else {
          expect(stringify(tree || null)).to.equal(input.replace(/"/g, "'"));
        }
      });
    }
  });

  // ============================================
  // EXTENSION OPERATORS
  // ============================================

  describe('extension operators', () => {
    const extensionCases: [string, string][] = [
      // in/nin operators
      ["$.store.book[?(@.size nin ['M','L'])]", ''],
      ['$.store.book[?(@.size nin ["M","L"])]', ''],
      ['$.store.book[?(@.price in [1,2,3])]', ''],

      // Regex operator
      ['$.store.book[?(@.price =~ /hello/)]', ''],
      ['$.store.book[?(@.price =~ /hello/i)]', ''],
      ['$.store.book[?(@.price =~ /hello/gui)]', ''],
    ];

    for (const [input, expected] of extensionCases) {
      it(`parses extension: ${input}`, () => {
        const tree = parse(input);

        if (expected) {
          expect(stringify(tree || null)).to.equal(expected);
        } else {
          expect(stringify(tree || null)).to.equal(input.replace(/"/g, "'"));
        }
      });
    }
  });

  // ============================================
  // UNION SELECTORS
  // ============================================

  describe('union selectors', () => {
    const unionCases: [string, string][] = [
      ['$.book[test, toto]', ''],
      ['$.book["test", "toto"]', ''],
    ];

    for (const [input, expected] of unionCases) {
      it(`parses union: ${input}`, () => {
        const tree = parse(input);

        if (expected) {
          expect(stringify(tree || null)).to.equal(expected);
        } else {
          expect(stringify(tree || null)).to.equal(input.replace(/"/g, "'"));
        }
      });
    }
  });

  // ============================================
  // ARRAY SLICES
  // ============================================

  describe('array slices', () => {
    const sliceCases: [string, string][] = [
      // Basic slices
      ['$..book[0:1].title', ''],
      ['$..book[:2].title', ''],
      ['$..book[5:2].title', ''],

      // Slices with step
      ['$..book[:7:2].title', ''],
      ['$..book[::2].title', ''],
      ['$..book[1::2].title', ''],
      ['$..book[5::2].title', ''],
      ['$..book[0:2:1].title', ''],

      // Normalized slice output (trailing colons removed)
      ['$..book[:1:].title', '$..book[:1].title'],
      ['$..book[1::].title', '$..book[1:].title'],
      ['$..book[:].title', ''],
    ];

    for (const [input, expected] of sliceCases) {
      it(`parses slice: ${input}`, () => {
        const tree = parse(input);

        if (expected) {
          expect(stringify(tree || null)).to.equal(expected);
        } else {
          expect(stringify(tree || null)).to.equal(input.replace(/"/g, "'"));
        }
      });
    }
  });

  // ============================================
  // ERROR HANDLING
  // ============================================

  describe('error handling', () => {
    it('returns null with hideExceptions for invalid path', () => {
      const tree = parse('bad', { hideExceptions: true });
      expect(tree).to.be.null;
    });

    it('throws for invalid path by default', () => {
      expect(() => parse('bad')).to.throw(Error);
    });
  });

  // ============================================
  // RFC 9535 FUNCTION CALLS
  // ============================================

  describe('function call parsing', () => {
    it('parses length function', () => {
      const tree = parse('$[?(length(@.name) > 5)]');
      expect(stringify(tree)).to.equal("$[?(length(@.name) > 5)]");
    });

    it('parses count function', () => {
      const tree = parse('$[?(count(@.items) == 3)]');
      expect(stringify(tree)).to.equal("$[?(count(@.items) == 3)]");
    });

    it('parses match function with string argument', () => {
      const tree = parse('$[?(match(@.name, "foo.*"))]');
      expect(stringify(tree)).to.equal("$[?(match(@.name, 'foo.*'))]");
    });

    it('parses search function with string argument', () => {
      const tree = parse('$[?(search(@.text, "pattern"))]');
      expect(stringify(tree)).to.equal("$[?(search(@.text, 'pattern'))]");
    });

    it('parses value function', () => {
      const tree = parse('$[?(value(@.single) == 42)]');
      expect(stringify(tree)).to.equal('$[?(value(@.single) == 42)]');
    });

    it('parses function with multiple path arguments', () => {
      const tree = parse('$[?(match(@.a, @.b))]');
      expect(stringify(tree)).to.equal('$[?(match(@.a, @.b))]');
    });
  });

  // ============================================
  // VALUE SUBTYPES IN STRINGIFY
  // ============================================

  describe('value subtypes', () => {
    it('stringifies object values in filters', () => {
      const tree = parse('$[?(@.data == {"key": "value"})]');
      expect(stringify(tree)).to.equal("$[?(@.data == {'key':'value'})]");
    });

    it('stringifies array values in filters', () => {
      const tree = parse('$[?(@.arr == [1, 2, "three"])]');
      expect(stringify(tree)).to.equal("$[?(@.arr == [1,2,'three'])]");
    });

    it('stringifies nested objects', () => {
      const tree = parse('$[?(@.data == {"outer": {"inner": 1}})]');
      expect(stringify(tree)).to.equal("$[?(@.data == {'outer':{'inner':1}})]");
    });

    it('stringifies mixed arrays', () => {
      const tree = parse('$[?(@.arr == [1, "two", true, null])]');
      expect(stringify(tree)).to.equal("$[?(@.arr == [1,'two',true,null])]");
    });
  });
});
