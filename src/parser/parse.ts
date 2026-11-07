/**
 * JSONPath parser.
 *
 * Parses JSONPath expressions into an Abstract Syntax Tree (AST).
 * Uses Peggy-generated parser with RFC 9535 compliant grammar.
 */
import { isStackOverflow } from '../handler/helper';
import { JSONPathSyntaxError } from './errors';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Peggy generates plain JS without types
import * as parser from './generated/parser.js';
import { Root } from './types';
import { validate } from './validate';

/**
 * Internal parse function that always throws on error.
 * Used by query/paths functions.
 *
 * @internal
 */
export function parseInternal(input: string): Root {
  let ast: Root;
  try {
    ast = parser.parse(input) as Root;
  } catch (e: unknown) {
    // The generated parser recurses once per nesting level: a deeply nested
    // expression must surface as a syntax error, not as a RangeError.
    if (isStackOverflow(e)) {
      throw new JSONPathSyntaxError(1, 1, 'Expression is nested too deeply');
    }
    // Map maximum size, invalid array or string length: an input of tens of
    // megabytes outgrowing the parser's tables or its AST.
    if (e instanceof RangeError) {
      throw new JSONPathSyntaxError(1, 1, 'Expression is too large to parse');
    }
    // Convert Peggy's SyntaxError to our JSONPathSyntaxError
    if (e && typeof e === 'object' && 'location' in e && 'message' in e) {
      const peggyError = e as { location: { start: { line: number; column: number } }; message: string };
      throw new JSONPathSyntaxError(
        peggyError.location.start.line,
        peggyError.location.start.column,
        peggyError.message,
      );
    }
    /* c8 ignore start */
    throw e;
  }
  /* c8 ignore stop */
  validate(ast as unknown as Parameters<typeof validate>[0]);
  return ast;
}

/**
 * Options for the parse function.
 */
export type ParseOptions = {
  /**
   * If true, returns null instead of throwing on invalid paths.
   * @default false
   */
  hideExceptions?: boolean;
};

/**
 * Parse a JSONPath expression into an Abstract Syntax Tree (AST).
 *
 * The AST can be used for analysis, transformation, or passed to stringify()
 * to convert back to a string.
 *
 * @param input - JSONPath expression string
 * @param options - Parse options
 * @returns Parsed AST (Root node) or null if invalid with hideExceptions
 *
 * @example
 * ```typescript
 * // Basic parsing
 * const ast = parse('$.store.book[0].title');
 * // => { type: 'root', next: { type: 'subscript', value: { type: 'dot', ... }, ... } }
 *
 * // Check validity
 * const result = parse('invalid', { hideExceptions: true });
 * // => null
 *
 * // Round-trip with stringify
 * import { stringify } from 'jsonpathly';
 * stringify(parse('$.a.b')); // => '$.a.b'
 * ```
 *
 * @throws {JSONPathSyntaxError} If expression is invalid (unless hideExceptions is true)
 */
export function parse(input: string, options: ParseOptions = {}): Root | null {
  try {
    return parseInternal(input);
  } catch (e) {
    if (!options.hideExceptions) {
      throw e;
    }
    return null;
  }
}
