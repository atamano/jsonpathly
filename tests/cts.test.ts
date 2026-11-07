/**
 * JSONPath Compliance Test Suite (RFC 9535)
 *
 * Runs the official suite, vendored in tests/data/cts/cts.json from
 * https://github.com/jsonpath-standard/jsonpath-compliance-test-suite
 * (commit 20ebdcc, BSD-2 license, see tests/data/cts/LICENSE and NOTICE).
 *
 * Valid queries must return the expected nodes and normalized paths; invalid
 * ones must throw. The cases jsonpathly does not pass yet are listed in
 * tests/data/cts/known-failures.ts and must keep failing: a fix that makes one
 * pass has to remove it from that list.
 */
import { expect } from 'chai';
import { readFileSync } from 'fs';
import { join } from 'path';
import { paths, query } from '../src';
import { knownFailures } from './data/cts/known-failures';

type CtsTest = {
  name: string;
  selector: string;
  document?: unknown;
  result?: unknown[];
  results?: unknown[][];
  result_paths?: string[];
  results_paths?: string[][];
  invalid_selector?: boolean;
};

const { tests } = JSON.parse(readFileSync(join(__dirname, 'data/cts/cts.json'), 'utf8')) as { tests: CtsTest[] };

const known = new Map<string, string>();
for (const { reason, names } of knownFailures) {
  for (const name of names) known.set(name, reason);
}

const options = { hideExceptions: false, returnArray: true } as const;

/** Throws an AssertionError when `test` fails. */
const check = (test: CtsTest): void => {
  if (test.invalid_selector) {
    expect(() => query(test.document ?? null, test.selector, options), 'invalid selector accepted').to.throw();
    return;
  }
  const nodes = query(test.document, test.selector, options);
  const expectedNodes = test.results ?? [test.result];
  expect(expectedNodes, 'nodes').to.deep.include(nodes);
  const expectedPaths = test.results_paths ?? (test.result_paths ? [test.result_paths] : undefined);
  if (expectedPaths) {
    expect(expectedPaths, 'paths').to.deep.include(paths(test.document, test.selector, options));
  }
};

const fails = (test: CtsTest): boolean => {
  try {
    check(test);
    return false;
  } catch {
    return true;
  }
};

describe('JSONPath Compliance Test Suite', () => {
  it('lists only known failures that exist in the suite', () => {
    const names = new Set(tests.map((t) => t.name));
    expect([...known.keys()].filter((name) => !names.has(name))).to.deep.equal([]);
  });

  for (const test of tests) {
    const reason = known.get(test.name);
    if (reason === undefined) {
      it(test.name, () => check(test));
    } else {
      it(`${test.name} (known failure: ${reason})`, () => {
        expect(fails(test), 'passes now: remove it from tests/data/cts/known-failures.ts').to.equal(true);
      });
    }
  }
});
