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

// A short slice of a huge string must not pin that string (V8 sliced strings share their
// parent from 13 characters on). Each retention path is measured right after its scenario
// returns, with no query in between: any native match in a later query would overwrite the
// legacy RegExp.$_ state and hide a leak through it.
const retains = (scenario: () => void): boolean | string => {
  const gc = (globalThis as { gc?: () => void }).gc;
  if (!gc) return 'gc unavailable';
  gc();
  gc();
  const before = process.memoryUsage().heapUsed;
  scenario();
  gc();
  gc();
  // A pinned parent adds 80 MiB or more; GC noise stays around 20 MiB.
  return (process.memoryUsage().heapUsed - before) / 1048576 > 48;
};
const parent = () => 'z'.repeat(80 * 1024 * 1024);

cases.push([
  'cache retains sliced patterns',
  () =>
    retains(() => {
      const p = (parent() + ')invalid-regex-x').slice(-16);
      query([{ a: 'x', p }], '$[?search(@.a, @.p)]');
      const q = (parent() + 'valid-regex-x').slice(-13);
      query([{ a: 'x', q }], '$[?search(@.a, @.q)]');
    }),
]);
cases.push([
  'property-escape budget retains sliced pattern',
  () =>
    retains(() => {
      const r = (parent() + '\\p{L}'.repeat(17)).slice(-85);
      query([{ a: 'x', r }], '$[?search(@.a, @.r)]');
    }),
]);
cases.push([
  'I-Regexp validation retains sliced pattern',
  () =>
    retains(() => {
      const b = (parent() + '(a)\\1 backreference').slice(-19);
      query([{ a: 'x', b }], '$[?search(@.a, @.b)]');
    }),
]);

for (const [name, run] of cases) {
  const start = Date.now();
  const result = run();
  const ms = Date.now() - start;
  process.stdout.write(
    JSON.stringify({ name, ms, matched: Array.isArray(result) ? result.length > 0 : result }) + '\n',
  );
}
