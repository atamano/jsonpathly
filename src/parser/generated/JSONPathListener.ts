// Generated from ./src/parser/generated/JSONPath.g4 by ANTLR 4.9.0-SNAPSHOT

import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';

import { JsonpathContext } from './JSONPathParser';
import { FunctionContext } from './JSONPathParser';
import { FilterargContext } from './JSONPathParser';
import { SubscriptContext } from './JSONPathParser';
import { DotdotContentContext } from './JSONPathParser';
import { DotContentContext } from './JSONPathParser';
import { BracketContext } from './JSONPathParser';
import { BracketContentContext } from './JSONPathParser';
import { FilterExpressionContext } from './JSONPathParser';
import { IndexesContext } from './JSONPathParser';
import { UnionsContext } from './JSONPathParser';
import { SlicesContext } from './JSONPathParser';
import { RegexContext } from './JSONPathParser';
import { ExpressionContext } from './JSONPathParser';
import { FilterpathContext } from './JSONPathParser';
import { JsonContext } from './JSONPathParser';
import { ObjContext } from './JSONPathParser';
import { PairContext } from './JSONPathParser';
import { ArrayContext } from './JSONPathParser';
import { ValueContext } from './JSONPathParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `JSONPathParser`.
 */
export interface JSONPathListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `JSONPathParser.jsonpath`.
   * @param ctx the parse tree
   */
  enterJsonpath?: (ctx: JsonpathContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.jsonpath`.
   * @param ctx the parse tree
   */
  exitJsonpath?: (ctx: JsonpathContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.function`.
   * @param ctx the parse tree
   */
  enterFunction?: (ctx: FunctionContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.function`.
   * @param ctx the parse tree
   */
  exitFunction?: (ctx: FunctionContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.filterarg`.
   * @param ctx the parse tree
   */
  enterFilterarg?: (ctx: FilterargContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.filterarg`.
   * @param ctx the parse tree
   */
  exitFilterarg?: (ctx: FilterargContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.subscript`.
   * @param ctx the parse tree
   */
  enterSubscript?: (ctx: SubscriptContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.subscript`.
   * @param ctx the parse tree
   */
  exitSubscript?: (ctx: SubscriptContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.dotdotContent`.
   * @param ctx the parse tree
   */
  enterDotdotContent?: (ctx: DotdotContentContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.dotdotContent`.
   * @param ctx the parse tree
   */
  exitDotdotContent?: (ctx: DotdotContentContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.dotContent`.
   * @param ctx the parse tree
   */
  enterDotContent?: (ctx: DotContentContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.dotContent`.
   * @param ctx the parse tree
   */
  exitDotContent?: (ctx: DotContentContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.bracket`.
   * @param ctx the parse tree
   */
  enterBracket?: (ctx: BracketContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.bracket`.
   * @param ctx the parse tree
   */
  exitBracket?: (ctx: BracketContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.bracketContent`.
   * @param ctx the parse tree
   */
  enterBracketContent?: (ctx: BracketContentContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.bracketContent`.
   * @param ctx the parse tree
   */
  exitBracketContent?: (ctx: BracketContentContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.filterExpression`.
   * @param ctx the parse tree
   */
  enterFilterExpression?: (ctx: FilterExpressionContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.filterExpression`.
   * @param ctx the parse tree
   */
  exitFilterExpression?: (ctx: FilterExpressionContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.indexes`.
   * @param ctx the parse tree
   */
  enterIndexes?: (ctx: IndexesContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.indexes`.
   * @param ctx the parse tree
   */
  exitIndexes?: (ctx: IndexesContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.unions`.
   * @param ctx the parse tree
   */
  enterUnions?: (ctx: UnionsContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.unions`.
   * @param ctx the parse tree
   */
  exitUnions?: (ctx: UnionsContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.slices`.
   * @param ctx the parse tree
   */
  enterSlices?: (ctx: SlicesContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.slices`.
   * @param ctx the parse tree
   */
  exitSlices?: (ctx: SlicesContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.regex`.
   * @param ctx the parse tree
   */
  enterRegex?: (ctx: RegexContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.regex`.
   * @param ctx the parse tree
   */
  exitRegex?: (ctx: RegexContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.expression`.
   * @param ctx the parse tree
   */
  enterExpression?: (ctx: ExpressionContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.expression`.
   * @param ctx the parse tree
   */
  exitExpression?: (ctx: ExpressionContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.filterpath`.
   * @param ctx the parse tree
   */
  enterFilterpath?: (ctx: FilterpathContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.filterpath`.
   * @param ctx the parse tree
   */
  exitFilterpath?: (ctx: FilterpathContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.json`.
   * @param ctx the parse tree
   */
  enterJson?: (ctx: JsonContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.json`.
   * @param ctx the parse tree
   */
  exitJson?: (ctx: JsonContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.obj`.
   * @param ctx the parse tree
   */
  enterObj?: (ctx: ObjContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.obj`.
   * @param ctx the parse tree
   */
  exitObj?: (ctx: ObjContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.pair`.
   * @param ctx the parse tree
   */
  enterPair?: (ctx: PairContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.pair`.
   * @param ctx the parse tree
   */
  exitPair?: (ctx: PairContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.array`.
   * @param ctx the parse tree
   */
  enterArray?: (ctx: ArrayContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.array`.
   * @param ctx the parse tree
   */
  exitArray?: (ctx: ArrayContext) => void;

  /**
   * Enter a parse tree produced by `JSONPathParser.value`.
   * @param ctx the parse tree
   */
  enterValue?: (ctx: ValueContext) => void;
  /**
   * Exit a parse tree produced by `JSONPathParser.value`.
   * @param ctx the parse tree
   */
  exitValue?: (ctx: ValueContext) => void;
}
