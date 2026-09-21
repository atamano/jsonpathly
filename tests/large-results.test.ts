/**
 * Large Result Set Tests
 *
 * Queries returning many nodes must stay linear in the result count. Result
 * accumulation used to copy everything gathered so far for each new result,
 * which made 200,000 results take minutes, and a union containing a wildcard
 * spread its results into push() and threw a RangeError.
 */
import { query } from '../src/handler/query';
import { expect } from 'chai';

const N = 200_000;
let doc: { a: { b: number }[] };

// Generous against a linear run (a few seconds at most, even under coverage on
// a loaded CI runner) and far below the quadratic one (minutes at this size).
const LIMIT_MS = 20_000;

const timed = (path: string): { count: number; ms: number } => {
  const start = Date.now();
  const result = query(doc, path, { returnArray: true }) as unknown[];
  return { count: result.length, ms: Date.now() - start };
};

describe('large result sets', () => {
  before(() => {
    doc = { a: Array.from({ length: N }, (_, i) => ({ b: i })) };
  });

  for (const [path, expected] of [
    ['$.a[*]', N],
    ['$.a[*].b', N],
    ['$..b', N],
  ] as const) {
    it(`${path} over ${N} elements is linear`, () => {
      const { count, ms } = timed(path);
      expect(count).to.equal(expected);
      expect(ms).to.be.below(LIMIT_MS);
    });
  }

  it('a union with a wildcard does not overflow the call stack', () => {
    expect(timed('$.a[*,0]').count).to.equal(N + 1);
  });
});
