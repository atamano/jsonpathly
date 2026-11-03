import { expect } from 'chai';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { query } from '../src';
import {
  MAX_REGEX_PATTERN_LENGTH,
  MAX_REGEX_PROGRAM_SIZE,
  MAX_REGEX_PROPERTY_ESCAPES,
  safeRegexTest,
} from '../src/handler/regex';

const NATIVE_MODIFIERS = ((): boolean => {
  try {
    new RegExp('(?i:a)');
    return true;
  } catch {
    return false;
  }
})();

/**
 * GHSA-3v46-5wmv-g87p: `=~`, match() and search() ran query-supplied patterns
 * on V8's backtracking engine, so `(a+)+$` against "aaaa...!" hung the event loop.
 */
describe('regex filters run in linear time (ReDoS)', () => {
  it('evaluates adversarial patterns quickly (child process with a hard timeout)', function () {
    this.timeout(90_000);
    const probe = path.join(__dirname, 'fixtures', 'regex-redos-probe.ts');
    const child = spawnSync(process.execPath, ['-r', 'ts-node/register/transpile-only', probe], {
      encoding: 'utf8',
      timeout: 60_000,
    });
    expect(child.signal, `probe killed after timeout; output so far:\n${child.stdout}`).to.equal(null);
    expect(child.status, child.stderr).to.equal(0);
    const results = child.stdout
      .trim()
      .split('\n')
      .map((line) => JSON.parse(line) as { name: string; ms: number; matched: boolean });
    expect(results).to.have.length.above(20);
    for (const r of results) {
      expect(r.matched, r.name).to.equal(false);
      expect(r.ms, r.name).to.be.below(2000);
    }
  });

  it('still matches when the evil pattern does match', () => {
    expect(query([{ a: 'aaaa' }], '$[?search(@.a,"(a+)+$")]')).to.deep.equal([{ a: 'aaaa' }]);
    expect(query([{ a: 'aaaa' }], '$[?match(@.a,"(a+)+")]')).to.deep.equal([{ a: 'aaaa' }]);
  });

  it('rejects patterns whose compiled form exceeds the size limit', () => {
    expect(safeRegexTest('(a{100}){100}', '', 'a')).to.equal(false);
    expect(safeRegexTest(`a{${MAX_REGEX_PROGRAM_SIZE + 1}}`, '', 'a')).to.equal(false);
  });

  it('rejects invalid patterns and flags', () => {
    expect(safeRegexTest('(', '', '(')).to.equal(false);
    expect(safeRegexTest('a', 'gg', 'a')).to.equal(false);
    expect(safeRegexTest('a{', 'u', 'a{')).to.equal(false);
    // The v flag changes class syntax ([a&&b]), which this matcher does not implement.
    expect(safeRegexTest('[a&&b]', 'v', 'a')).to.equal(false);
  });

  it('rejects oversized patterns before compiling them', () => {
    expect(safeRegexTest('a'.repeat(MAX_REGEX_PATTERN_LENGTH + 1), '', 'a'.repeat(2000))).to.equal(false);
    expect(safeRegexTest('\\p{L}'.repeat(MAX_REGEX_PROPERTY_ESCAPES + 1), 'u', 'a'.repeat(20))).to.equal(false);
    expect(safeRegexTest('\\p{L}'.repeat(MAX_REGEX_PROPERTY_ESCAPES), 'u', 'a'.repeat(16))).to.equal(true);
  });

  it('supports Annex B escapes like master did', () => {
    expect(query([{ a: '\x01' }], '$[?@.a =~ /\\01/]')).to.deep.equal([{ a: '\x01' }]);
    expect(query([{ a: '\\c' }], '$[?@.a =~ /^\\c$/]')).to.deep.equal([{ a: '\\c' }]);
  });

  // Modifier groups need V8 support (Node 23+); older runtimes reject them, as master did.
  it('supports modifier groups where the runtime does', () => {
    const expected = NATIVE_MODIFIERS ? [{ a: 'A' }] : [];
    expect(query([{ a: 'A' }], '$[?match(@.a, "(?i:a)")]')).to.deep.equal(expected);
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
    ['\\01', ''],
    ['\\017+', ''],
    ['^\\08$', ''],
    ['\\c', ''],
    ['\\c*', ''],
    ['(?i:a)b', ''],
    ['(?-i:a)b', 'i'],
    ['(?s:.)', ''],
    ['(?m:^b)', ''],
    ['(?i-s:A.)', 's'],
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
    it(`/${p}/${f}`, function () {
      if (!NATIVE_MODIFIERS && p.includes('(?') && !p.includes('(?:')) {
        expect(safeRegexTest(p, f, 'a')).to.equal(false);
        return;
      }
      const native = new RegExp(p, f);
      for (const s of inputs) {
        native.lastIndex = 0;
        expect(safeRegexTest(p, f, s), `${JSON.stringify(s)}`).to.equal(native.test(s));
      }
    });
  }
});
