import { JSONPathSyntaxError } from './errors';
// @ts-ignore - Peggy generates plain JS
import * as parser from './generated/parser.js';
import { Root } from './types';

export function parseInternal(input: string): Root {
  try {
    return parser.parse(input) as Root;
  } catch (e: unknown) {
    // Convert Peggy's SyntaxError to our JSONPathSyntaxError
    if (e && typeof e === 'object' && 'location' in e && 'message' in e) {
      const peggyError = e as { location: { start: { line: number; column: number } }; message: string };
      throw new JSONPathSyntaxError(
        peggyError.location.start.line,
        peggyError.location.start.column,
        peggyError.message,
      );
    }
    throw e;
  }
}

export type ParseOptions = {
  hideExceptions?: boolean;
};

export function parse(input: string, options: ParseOptions = {}): Root | null {
  try {
    const tree = parseInternal(input);
    return tree;
  } catch (e) {
    if (!options.hideExceptions) {
      throw e;
    }
    return null;
  }
}
