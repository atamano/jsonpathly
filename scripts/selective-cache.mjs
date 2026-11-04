/**
 * Post-processes the parser generated with `peggy --cache` so that only two
 * rules are memoized.
 *
 * Without memoization, a failed alternative reparses whatever its operand
 * contained, and nested filters, groups or negations made parse time grow
 * exponentially with the nesting depth. Full packrat memoization (Peggy's
 * --cache) is linear but parses about 50 times slower and keeps hundreds of
 * bytes per input character. The retries all go through two rules: a
 * filter operand (filterarg, parsed again by primaryExpression when no
 * comparison follows it) and orExpression (the body of a group or negation,
 * parsed again when the group or negation turns out to be unclosed).
 * Memoizing those bounds every rule beneath them to a few attempts per
 * position, for under one cache entry per character. tests/hardening.test.ts
 * pins the parse time and the memory.
 *
 * Usage: node scripts/selective-cache.mjs <generated parser file>
 * scripts/check-parser-linearity.mjs checks the result.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const MEMOIZED = new Set(['filterarg', 'orExpression']);

const prologue =
  /(\n    const key = peg\$currPos \* \d+ \+ \d+;\n    const cached = peg\$resultsCache)\[key\];\n\n    if \(cached\) \{\n      peg\$currPos = cached\.nextPos;\n\n      return cached\.result;\n    \}\n/;
const epilogue = /\n    peg\$resultsCache\[key\] = (\{ nextPos: peg\$currPos, result: s0 \});\n/;

/** Returns the parser source with only the MEMOIZED rules memoized. */
export const selectiveCache = (input) => {
  const fail = (message) => {
    throw new Error(`selective-cache: ${message} (did the Peggy output format change?)`);
  };
  const declaration = '  let peg$resultsCache = {};\n';
  if (!input.includes(declaration)) fail('cache declaration not found');
  let source = input.replace(declaration, '  const peg$resultsCache = new Map();\n');

  const seen = new Set();
  source = source.replace(/function peg\$parse(\w+)\(\) \{\n[\s\S]*?\n  \}\n/g, (body, rule) => {
    if (!prologue.test(body) || !epilogue.test(body)) fail(`cache code not found in rule ${rule}`);
    seen.add(rule);
    if (MEMOIZED.has(rule)) {
      return body
        .replace(
          prologue,
          (_, start) =>
            `${start}.get(key);\n\n    if (cached) {\n      peg$currPos = cached.nextPos;\n\n      return cached.result;\n    }\n`,
        )
        .replace(epilogue, (_, entry) => `\n    peg$resultsCache.set(key, ${entry});\n`);
    }
    return body.replace(prologue, '\n').replace(epilogue, '\n');
  });

  for (const rule of MEMOIZED) if (!seen.has(rule)) fail(`rule ${rule} not found`);
  if (source.includes('peg$resultsCache[')) fail('unprocessed cache access left');
  return source;
};

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  try {
    writeFileSync(file, selectiveCache(readFileSync(file, 'utf8')));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}
