import { ANTLRInputStream, CommonTokenStream, RecognitionException, Recognizer } from 'antlr4ts';
import { ParseTreeWalker } from 'antlr4ts/tree/ParseTreeWalker';
import { PathSyntaxError } from './errors';
import { JSONPathLexer } from './generated/JSONPathLexer';
import { JSONPathListener } from './generated/JSONPathListener';
import { JSONPathParser } from './generated/JSONPathParser';
import CustomJSONPathListener from './Listener';
import { Root } from './types';

export function parse(input: string): Root | undefined {
  const inputStream = new ANTLRInputStream(input);
  const lexer = new JSONPathLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new JSONPathParser(tokenStream);
  parser.removeErrorListeners();
  parser.addErrorListener({
    syntaxError: <T>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _recognizer: Recognizer<T, any>,
      _offendingSymbol: T | undefined,
      line: number,
      charPositionInLine: number,
      msg: string,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _e: RecognitionException | undefined,
    ): void => {
      throw new PathSyntaxError(line, charPositionInLine, msg);
    },
  });
  const listener = new CustomJSONPathListener();

  const tree = parser.jsonpath();
  ParseTreeWalker.DEFAULT.walk(listener as JSONPathListener, tree);

  return listener.getTree();
}
