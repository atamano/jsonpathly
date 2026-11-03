/**
 * Runs the adversarial regex cases and prints one JSON line per case.
 * Spawned by tests/regex-redos.test.ts in a child process with a hard timeout,
 * so a regression that hangs the matcher fails the test instead of the suite.
 */
import { query } from '../../src';
import { safeRegexTest } from '../../src/handler/regex';

const evil = [{ a: 'a'.repeat(50_000) + '!' }];
const escape = (p: string): string => p.replace(/\\/g, '\\\\');

// Each pattern fails on "aaa...a!", after exponential or high-polynomial backtracking in V8.
const patterns = ['(a+)+$', '(a|a)+$', '(a*)*b', '(a|aa)+$', 'a*a*a*a*a*a*b', '(\\w+\\s?)+$', '(.*a){12}$'];

const cases: Array<[string, () => unknown]> = [];
for (const p of patterns) {
  cases.push([`search() ${p}`, () => query(evil, `$[?search(@.a, "${escape(p)}")]`)]);
  cases.push([`match() ${p}`, () => query(evil, `$[?match(@.a, "${escape(p)}")]`)]);
  cases.push([`=~ ${p}`, () => query(evil, `$[?@.a =~ /${p}/]`)]);
}
cases.push(['advisory PoC', () => query([{ a: 'a'.repeat(40) + '!' }], '$[?search(@.a,"(a+)+$")]')]);
cases.push(['repeated empty groups', () => safeRegexTest('(?:(?:(?:(?:){1000}){1000}){1000}){1000}', '', 'x')]);
cases.push(['many property escapes', () => safeRegexTest(`[${'\\p{L}'.repeat(4000)}]`, 'u', 'x')]);
cases.push(['huge pattern', () => safeRegexTest(')' + 'a'.repeat(1024 * 1024), 'u', '')]);

// A short slice of a huge string must not pin that string through the cache (V8 sliced strings).
cases.push([
  'cache retains sliced patterns',
  () => {
    const gc = (globalThis as { gc?: () => void }).gc;
    if (!gc) return 'gc unavailable';
    gc();
    const before = process.memoryUsage().heapUsed;
    // Allocated inside a function that has returned, so nothing here is live when measuring.
    (() => {
      // V8 only shares the parent for slices of 13+ characters; shorter ones are copied.
      for (let i = 0; i < 8; i++) {
        const big = 'z'.repeat(10 * 1024 * 1024);
        const p = (big + `)invalid-regex-${i}`).slice(-16);
        query([{ a: 'x', p }], '$[?search(@.a, @.p)]');
        const q = (big + `valid-regex-${i}`).slice(-13);
        query([{ a: 'x', q }], '$[?search(@.a, @.q)]');
      }
      // Rejected by the property-escape budget before compiling: must not be retained either.
      // Only the last native match would be kept (legacy RegExp.$_), so use one large parent.
      const r = ('z'.repeat(80 * 1024 * 1024) + '\\p{L}'.repeat(17)).slice(-85);
      query([{ a: 'x', r }], '$[?search(@.a, @.r)]');
      // Rejected earlier still, by the I-Regexp validation (backreference).
      const b = ('z'.repeat(80 * 1024 * 1024) + '(a)\\1 backreference').slice(-19);
      query([{ a: 'x', b }], '$[?search(@.a, @.b)]');
    })();
    gc();
    gc();
    // Pinned parents would add 160 MiB (16 x 10 MiB) or 80 MiB; a GC pass leaves ~20 MiB of noise.
    return (process.memoryUsage().heapUsed - before) / 1048576 > 64;
  },
]);

for (const [name, run] of cases) {
  const start = Date.now();
  const result = run();
  const ms = Date.now() - start;
  process.stdout.write(
    JSON.stringify({ name, ms, matched: Array.isArray(result) ? result.length > 0 : result }) + '\n',
  );
}
