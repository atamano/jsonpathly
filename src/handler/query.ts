/**
 * JSONPath query execution.
 *
 * Main entry point for querying JSON documents using JSONPath expressions.
 */
import { parseInternal } from '../parser/parse';
import { Handler } from './Handler';
import { isArray, isDefined, isUndefined } from './helper';

/**
 * Options for the query function.
 */
export type QueryOptions = {
  /**
   * If true, returns undefined/empty array instead of throwing on invalid paths.
   * @default false
   */
  hideExceptions?: boolean;

  /**
   * If true, always returns results as an array.
   * @default false
   */
  returnArray?: boolean;
};

/**
 * Execute a single JSONPath query.
 */
const querySingle = (payload: unknown, path: string, options: QueryOptions): unknown => {
  const tree = parseInternal(path);
  const handler = new Handler(payload);
  const result = handler.handleRoot(tree);

  if (!result?.isIndefinite && options.returnArray) {
    if (isUndefined(result)) {
      return [];
    }
    return [result.value];
  }

  return result?.value;
};

/**
 * Execute multiple JSONPath queries and collect results.
 */
const queryMany = (payload: unknown, paths: string[], options: QueryOptions): unknown => {
  const results: unknown[] = [];
  for (const path of paths) {
    const res = querySingle(payload, path, options);
    if (isDefined(res)) {
      results.push(res);
    }
  }
  return results;
};

/**
 * Query a JSON document using JSONPath expression(s).
 *
 * @param payload - The JSON document to query
 * @param paths - JSONPath expression string or array of expressions
 * @param options - Query options
 * @returns Matched value(s), undefined if no match, or empty array with returnArray option
 *
 * @example
 * ```typescript
 * // Single value
 * query({ a: { b: 1 } }, '$.a.b'); // => 1
 *
 * // Array of values
 * query([1, 2, 3], '$[*]'); // => [1, 2, 3]
 *
 * // Filter expression
 * query([{ id: 1 }, { id: 2 }], '$[?(@.id == 1)]'); // => [{ id: 1 }]
 *
 * // With returnArray option
 * query({ a: 1 }, '$.a', { returnArray: true }); // => [1]
 *
 * // Multiple paths
 * query({ a: 1, b: 2 }, ['$.a', '$.b']); // => [1, 2]
 * ```
 *
 * @throws {JSONPathSyntaxError} If path is invalid (unless hideExceptions is true)
 */
export const query = (payload: unknown, paths: string | string[], options: QueryOptions = {}): unknown => {
  try {
    if (isArray(paths)) {
      return queryMany(payload, paths, options);
    }
    return querySingle(payload, paths, options);
  } catch (e) {
    if (!options.hideExceptions) {
      throw e;
    }
    return options.returnArray ? [] : undefined;
  }
};
