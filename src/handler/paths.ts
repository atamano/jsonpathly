/**
 * JSONPath path extraction.
 *
 * Returns the normalized paths of matched nodes instead of their values.
 */
import { parseInternal } from '../parser/parse';
import { Handler } from './Handler';
import { isArray, isUndefined } from './helper';

/**
 * Options for the paths function.
 */
export type PathsOptions = {
  /**
   * If true, returns empty array instead of throwing on invalid paths.
   * @default false
   */
  hideExceptions?: boolean;
};

/**
 * Get the normalized paths of nodes matching a JSONPath expression.
 *
 * Returns RFC 9535 normalized path format using single quotes for name selectors.
 *
 * @param payload - The JSON document to query
 * @param path - JSONPath expression string
 * @param options - Options
 * @returns Array of normalized path strings
 *
 * @example
 * ```typescript
 * // Simple property
 * paths({ a: { b: 1 } }, '$.a.b'); // => ["$['a']['b']"]
 *
 * // Array index
 * paths([1, 2, 3], '$[1]'); // => ['$[1]']
 *
 * // Wildcard
 * paths({ a: 1, b: 2 }, '$.*'); // => ["$['a']", "$['b']"]
 *
 * // Filter
 * paths([{ id: 1 }, { id: 2 }], '$[?(@.id == 1)]'); // => ['$[0]']
 *
 * // Recursive descent
 * paths({ a: { b: { c: 1 } } }, '$..c'); // => ["$['a']['b']['c']"]
 * ```
 *
 * @throws {JSONPathSyntaxError} If path is invalid (unless hideExceptions is true)
 */
export const paths = (payload: unknown, path: string, options: PathsOptions = {}): string[] => {
  try {
    const tree = parseInternal(path);
    const handler = new Handler(payload);
    const result = handler.handleRoot(tree);

    if (isUndefined(result)) {
      return [];
    }

    if (!isArray(result.paths)) {
      return [result.paths];
    }
    return result.paths;
  } catch (e) {
    if (!options.hideExceptions) {
      throw e;
    }
    return [];
  }
};
