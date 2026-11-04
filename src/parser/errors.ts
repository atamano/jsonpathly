/**
 * JSONPath syntax error class.
 *
 * Thrown when parsing an invalid JSONPath expression.
 */

/**
 * Error thrown when a JSONPath expression has invalid syntax.
 *
 * @example
 * ```typescript
 * import { parse, JSONPathSyntaxError } from 'jsonpathly';
 *
 * try {
 *   parse('$[invalid');
 * } catch (e) {
 *   if (e instanceof JSONPathSyntaxError) {
 *     console.log(`Syntax error at line ${e.line}, column ${e.charPositionInLine}`);
 *     console.log(e.message);
 *   }
 * }
 * ```
 */
export class JSONPathSyntaxError extends Error {
  /** Line number where the error occurred (1-based) */
  line: number;

  /** Column position where the error occurred (1-based) */
  charPositionInLine: number;

  /** The error message */
  msg: string;

  override name = 'JSONPathSyntaxError';

  constructor(line: number, charPositionInLine: number, msg: string) {
    super(msg);
    this.line = line;
    this.charPositionInLine = charPositionInLine;
    this.msg = msg;
  }
}

/**
 * Error thrown when evaluating a query would take too much work: more
 * evaluation steps than the `maxSteps` budget, or nesting too deep to evaluate.
 *
 * @example
 * ```typescript
 * import { query, JSONPathLimitError } from 'jsonpathly';
 *
 * try {
 *   query(doc, untrustedPath, { maxSteps: 100_000 });
 * } catch (e) {
 *   if (e instanceof JSONPathLimitError) {
 *     // reject the query
 *   }
 * }
 * ```
 */
export class JSONPathLimitError extends Error {
  override name = 'JSONPathLimitError';
}
