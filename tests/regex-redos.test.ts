import { expect } from 'chai';
import { query } from '../src';
import { MAX_REGEX_PROGRAM_SIZE, safeRegexTest } from '../src/handler/regex';

/**
 * GHSA-3v46-5wmv-g87p: `=~`, match() and search() ran query-supplied patterns
 * on V8's backtracking engine, so `(a+)+$` against "aaaa...!" hung the event loop.
 */
describe('regex filters run in linear time (ReDoS)', () => {
  const evil = 'a'.repeat(50_000) + '!';
  const doc = [{ a: evil }];

  const timed = (fn: () => unknown): number => {
    const start = Date.now();
    fn();
    return Date.now() - start;
  };

  // Each pattern fails on "aaa...a!", after exponential or high-polynomial backtracking in V8.
  const patterns = ['(a+)+$', '(a|a)+$', '(a*)*b', '(a|aa)+$', 'a*a*a*a*a*a*b', '(\\w+\\s?)+$', '(.*a){12}$'];

  for (const p of patterns) {
    it(`search() with ${p}`, () => {
      const ms = timed(() => expect(query(doc, `$[?search(@.a, "${p.replace(/\\/g, '\\\\')}")]`)).to.have.length(0));
      expect(ms).to.be.below(2000);
    });

    it(`match() with ${p}`, () => {
      const ms = timed(() => expect(query(doc, `$[?match(@.a, "${p.replace(/\\/g, '\\\\')}")]`)).to.have.length(0));
      expect(ms).to.be.below(2000);
    });

    it(`=~ with ${p}`, () => {
      const ms = timed(() => expect(query(doc, `$[?@.a =~ /${p}/]`)).to.have.length(0));
      expect(ms).to.be.below(2000);
    });
  }

  it('reproduces the advisory proof of concept', () => {
    const ms = timed(() => query([{ a: 'a'.repeat(40) + '!' }], '$[?search(@.a,"(a+)+$")]'));
    expect(ms).to.be.below(500);
  });

  it('still matches when the evil pattern does match', () => {
    expect(query([{ a: 'aaaa' }], '$[?search(@.a,"(a+)+$")]')).to.deep.equal([{ a: 'aaaa' }]);
    expect(query([{ a: 'aaaa' }], '$[?match(@.a,"(a+)+")]')).to.deep.equal([{ a: 'aaaa' }]);
  });

  it('rejects patterns whose compiled form exceeds the size limit', () => {
    expect(safeRegexTest('(a{100}){100}', '', 'a')).to.equal(false);
    expect(safeRegexTest(`a{${MAX_REGEX_PROGRAM_SIZE + 1}}`, '', 'a')).to.equal(false);
  });

  it('bounds compile work for repeated empty groups', () => {
    const start = Date.now();
    expect(safeRegexTest('(?:(?:(?:(?:){1000}){1000}){1000}){1000}', '', 'x')).to.equal(false);
    expect(Date.now() - start).to.be.below(500);
  });

  it('rejects invalid patterns and flags', () => {
    expect(safeRegexTest('(', '', '(')).to.equal(false);
    expect(safeRegexTest('a', 'gg', 'a')).to.equal(false);
    expect(safeRegexTest('a{', 'u', 'a{')).to.equal(false);
  });
});

describe('safeRegexTest agrees with RegExp.prototype.test', () => {
  const patterns: Array<[string, string]> = [
    ['', ''],
    ['abc', ''],
    ['^abc$', ''],
    ['a|b|', ''],
    ['(?:ab|cd)+e', ''],
    ['a{2}', ''],
    ['a{2,}', ''],
    ['a{1,3}?b', ''],
    ['x{0}y', ''],
    ['colou?r', ''],
    ['[a-c]+[^a-c]', ''],
    ['[]', ''],
    ['[^]', ''],
    ['[\\]a]+', ''],
    ['\\d+\\.\\d*', ''],
    ['\\w\\W\\s\\S\\D', ''],
    ['.', ''],
    ['.', 's'],
    ['^b', 'm'],
    ['a$', 'm'],
    ['^$', 'm'],
    ['HELLO', 'i'],
    ['[a-z]+', 'i'],
    ['\\x41\\u0042', ''],
    ['\\u{1F600}', 'u'],
    ['\\uD83D\\uDE00', 'u'],
    ['^.$', 'u'],
    ['^.$', ''],
    ['^..$', ''],
    ['\\p{Lu}\\p{Ll}+', 'u'],
    ['\\P{L}', 'u'],
    ['[\\p{N}]', 'u'],
    ['\\/', ''],
    ['a{', ''],
    ['a{,2}', ''],
    ['}', ''],
    ['\\cJ', ''],
    ['\\0', ''],
    ['bc', 'y'],
    ['ab', 'y'],
    ['ab', 'gy'],
    ['[😀]', 'u'],
    ['(a|b)*c(d|e)?', 'g'],
    ['.*foo.*', ''],
  ];
  const inputs = [
    '',
    'abc',
    'xabcx',
    'ab',
    'cde',
    'abcde',
    'aa',
    'aaa',
    'aab',
    'color',
    'colour',
    'xy',
    'y',
    'b]a',
    'dd',
    'x1.5',
    '12.',
    'a_ !Z',
    '\n',
    'a\nb',
    'hello',
    'Hello',
    'AB',
    '😀',
    '😀😀',
    'Éte',
    '!',
    'a/b',
    'a{',
    'a{,2}',
    '}',
    '\n\0',
    '\0',
    'abc',
    'foo',
    'cfoo',
    'é',
  ];

  for (const [p, f] of patterns) {
    it(`/${p}/${f}`, () => {
      const native = new RegExp(p, f);
      for (const s of inputs) {
        native.lastIndex = 0;
        expect(safeRegexTest(p, f, s), `${JSON.stringify(s)}`).to.equal(native.test(s));
      }
    });
  }
});
