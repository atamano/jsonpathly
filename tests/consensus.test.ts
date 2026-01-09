/**
 * JSON Path Comparison Consensus Tests
 *
 * These tests validate jsonpathly against the consensus behavior from the
 * JSON Path Comparison project: https://cburgmer.github.io/json-path-comparison/
 *
 * Test categories:
 * - Array slices: $[start:end:step]
 * - Bracket notation: $['key'], $[0]
 * - Dot notation: $.key, $.*
 * - Filter expressions: $[?(@.key == value)]
 * - Recursive descent: $..key
 * - Root: $
 * - Unions: $[0,1], $['a','b']
 */
import { query } from '../src/handler/query';
import { expect } from 'chai';
import { consensusTests, ConsensusTest } from './data/consensus-tests';

/**
 * Groups tests by their category prefix (e.g., 'array_slice', 'bracket_notation')
 */
function groupTestsByCategory(tests: ConsensusTest[]): Record<string, ConsensusTest[]> {
  const categories: Record<string, ConsensusTest[]> = {};

  for (const test of tests) {
    // Extract category from test ID (first two words separated by underscore)
    const category = test.id.split('_').slice(0, 2).join('_');

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(test);
  }

  return categories;
}

/**
 * Formats category name for display (e.g., 'array_slice' -> 'Array Slice')
 */
function formatCategoryName(category: string): string {
  return category
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

describe('JSON Path Comparison - Consensus Tests', () => {
  const categories = groupTestsByCategory(consensusTests);

  for (const [category, tests] of Object.entries(categories)) {
    describe(formatCategoryName(category), () => {
      for (const test of tests) {
        const testTitle = `${test.selector}`;

        if (test.consensus === 'NOT_SUPPORTED') {
          it.skip(`${testTitle} (no consensus)`);
          continue;
        }

        if (test.skip) {
          it.skip(`${testTitle} (${test.skipReason || 'differs from consensus'})`);
          continue;
        }

        it(testTitle, () => {
          let result: unknown[];

          try {
            result = query(test.document, test.selector, { returnArray: true }) as unknown[];
          } catch {
            // Parsing failed - treat as empty result for unsupported syntax
            result = [];
          }

          expect(result).to.deep.equal(
            test.consensus,
            `Query: ${test.selector}\nDocument: ${JSON.stringify(test.document)}`
          );
        });
      }
    });
  }
});
