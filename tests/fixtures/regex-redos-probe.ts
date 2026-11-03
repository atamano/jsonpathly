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

for (const [name, run] of cases) {
  const start = Date.now();
  const result = run();
  const ms = Date.now() - start;
  process.stdout.write(
    JSON.stringify({ name, ms, matched: Array.isArray(result) ? result.length > 0 : result }) + '\n',
  );
}
