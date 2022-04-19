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
      _: Recognizer<T, any>,
      __: T | undefined,
      line: number,
      charPositionInLine: number,
      msg: string,
      ___: RecognitionException | undefined,
    ): void => {
      throw new PathSyntaxError(line, charPositionInLine, msg);
    },
  });
  const listener = new CustomJSONPathListener();

  const tree = parser.jsonpath();
  ParseTreeWalker.DEFAULT.walk(listener as JSONPathListener, tree);

  return listener.getTree();
}