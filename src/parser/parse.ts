/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import antlr4 from 'antlr4';
import { JSONPathSyntaxError } from './errors';
import JSONPathLexer from './generated/JSONPathLexer';
import JSONPathParser from './generated/JSONPathParser';
import Listener from './Listener';
import { Root } from './types';

export function parseInternal(input: string): Root {
  const inputStream = new antlr4.InputStream(input);
  const lexer = new JSONPathLexer(inputStream);
  const tokenStream = new antlr4.CommonTokenStream(lexer);
  const parser = new JSONPathParser(tokenStream);

  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: (
      _recognizer: antlr4.Recognizer,
      _offendingSymbol: any,
      line: number,
      charPositionInLine: number,
      msg: string,
      _e: any,
    ): void => {
      throw new JSONPathSyntaxError(line, charPositionInLine, msg);
    },
  } as any);

  const listener = new Listener();
  parser.buildParseTrees = true;

  const tree = parser.jsonpath();

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);

  return listener.getTree();
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
