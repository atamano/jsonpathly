/**
 * jsonpathly - A secure, eval-free JSONPath library for TypeScript/JavaScript.
 *
 * RFC 9535 compliant JSONPath implementation with extensions.
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { query, paths, parse, stringify } from 'jsonpathly';
 *
 * const data = {
 *   store: {
 *     book: [
 *       { title: 'Book 1', price: 10 },
 *       { title: 'Book 2', price: 20 }
 *     ]
 *   }
 * };
 *
 * // Query values
 * query(data, '$.store.book[0].title'); // => 'Book 1'
 * query(data, '$.store.book[*].price'); // => [10, 20]
 * query(data, '$.store.book[?(@.price < 15)]'); // => [{ title: 'Book 1', price: 10 }]
 *
 * // Get paths
 * paths(data, '$.store.book[*].title'); // => ["$['store']['book'][0]['title']", ...]
 *
 * // Parse and stringify
 * const ast = parse('$.store.book[0]');
 * stringify(ast); // => '$.store.book[0]'
 * ```
 */

export { paths } from './handler/paths';
export { query } from './handler/query';

export { JSONPathSyntaxError } from './parser/errors';
export { parse } from './parser/parse';
export { stringify } from './parser/stringify';
