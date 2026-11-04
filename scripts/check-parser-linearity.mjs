/**
 * Checks that the selectively memoized parser (scripts/selective-cache.mjs)
 * does work linear in the nesting depth on shapes that used to make it retry:
 * nested, unclosed or malformed filters, groups, negations, literals and
 * function calls. Builds the parser from the grammar, counts rule invocations
 * at depths 40, 80 and 160, and fails if doubling the depth more than about
 * doubles them. Timing tests miss growth that is quadratic but still fast.
 *
 * Usage: node scripts/check-parser-linearity.mjs (run by tests/hardening.test.ts)
 */
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import peggy from 'peggy';
import { selectiveCache } from './selective-cache.mjs';

const grammar = readFileSync(fileURLToPath(new URL('../src/parser/jsonpath.peggy', import.meta.url)), 'utf8');
let source = selectiveCache(peggy.generate(grammar, { cache: true, output: 'source', format: 'es' }));
const entry = /(function peg\$parse\w+\(\) \{\n)/g;
if (!entry.test(source)) throw new Error('rule functions not found (did the Peggy output format change?)');
// Past the cap a shape is far from linear; stop instead of running for minutes.
const CAP = 5_000_000;
source = source.replace(
  entry,
  `$1    if (++globalThis.__jsonpathlyRuleCalls > ${CAP}) throw new Error('rule call cap');\n`,
);

const dir = mkdtempSync(join(tmpdir(), 'jsonpathly-linearity-'));
const file = join(dir, 'parser.mjs');
writeFileSync(file, source);
const { parse } = await import(pathToFileURL(file).href);
rmSync(dir, { recursive: true, force: true });

const token = 'a'.repeat(1000);
const shapes = {
  'unclosed negations': (n) => '$[?' + '!('.repeat(n) + '@',
  'unclosed negations, regex': (n) => '$[?' + '!('.repeat(n) + '@=~/' + token + '/',
  'unclosed negations, chain': (n) => '$[?' + '!('.repeat(n) + '@ && @ && @',
  'unclosed negations, spaces': (n) => '$[?' + '!('.repeat(n) + '@' + ' '.repeat(1000),
  'unclosed negations, union': (n) => '$[?' + '!('.repeat(n) + "@['a','b',",
  'unclosed negated comparisons': (n) => '$[?' + '!(@==1 && '.repeat(n),
  'unclosed groups': (n) => '$[?' + '('.repeat(n) + '@',
  'unclosed groups, comparison': (n) => '$[?' + '('.repeat(n) + '@ == "' + token + '"',
  'unclosed arithmetic groups': (n) => '$[?' + '(1+'.repeat(n) + '@',
  'unclosed filters': (n) => '$[?'.repeat(n) + '@',
  'unclosed length()': (n) => '$[?' + 'length('.repeat(n) + '@',
  'unclosed match()': (n) => '$[?' + 'match(@, '.repeat(n),
  'unclosed arrays': (n) => '$[?@==' + '['.repeat(n),
  'unclosed objects': (n) => '$[?@==' + '{"a":'.repeat(n),
  'mixed groups and calls': (n) => '$[?' + '!((@ && length('.repeat(n) + '@',
  'closed negations': (n) => '$[?' + '!('.repeat(n) + '@' + ')'.repeat(n) + ']',
  'closed groups of filters': (n) => {
    let e = '@';
    for (let i = 0; i < n; i++) e = '@ && (($[?' + e + ']))';
    return '$[?' + e + ']';
  },
};

const calls = (query) => {
  globalThis.__jsonpathlyRuleCalls = 0;
  try {
    parse(query);
  } catch {
    // Most shapes are invalid on purpose.
  }
  return globalThis.__jsonpathlyRuleCalls;
};

let failed = false;
for (const [name, shape] of Object.entries(shapes)) {
  const [a, b, c] = [40, 80, 160].map((n) => calls(shape(n)));
  const growth = Math.max(b / a, c / b);
  const ok = growth <= 2.3 && c <= CAP;
  if (!ok) failed = true;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}: ${a} ${b} ${c} rule calls (x${growth.toFixed(2)} per doubling)`);
}
process.exit(failed ? 1 : 0);
