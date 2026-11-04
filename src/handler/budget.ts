/**
 * Evaluation budget plumbing shared by the handler, comparators, functions
 * and the regex matcher.
 */

import type { Program } from './regex';

/**
 * Charges `n` steps to the query budget and throws once it is exhausted.
 * `regexProgram` reports the size of a regex program about to run, and
 * `regexWork` charges the states it visits: the default budget allows regexes
 * a linear scan of the document's strings on top of the other work, and only
 * for the regex work actually done.
 */
export type Tick = {
  (n?: number): void;
  regexProgram?: (size: number) => void;
  regexWork?: (n: number) => void;
  /**
   * Compiled regexes of the current query, by the AST node holding their fixed
   * pattern (see testRegex in functions.ts).
   */
  regexSites?: Map<object, Program | null>;
};

/** A budget that never runs out, for direct calls outside a query. */
export const noTick: Tick = () => undefined;
