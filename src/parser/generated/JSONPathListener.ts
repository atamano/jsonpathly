// Generated from ./src/parser/generated/JSONPath.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { JsonpathContext } from "./JSONPathParser";
import { FilterpathContext } from "./JSONPathParser";
import { FilterargContext } from "./JSONPathParser";
import { SubscriptContext } from "./JSONPathParser";
import { SubscriptablesContext } from "./JSONPathParser";
import { SubscriptableBarewordContext } from "./JSONPathParser";
import { SubscriptableContext } from "./JSONPathParser";
import { SliceableContext } from "./JSONPathParser";
import { ExpressionContext } from "./JSONPathParser";
import { JsonContext } from "./JSONPathParser";
import { ObjContext } from "./JSONPathParser";
import { PairContext } from "./JSONPathParser";
import { ArrayContext } from "./JSONPathParser";
import { ValueContext } from "./JSONPathParser";


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
	 * Enter a parse tree produced by `JSONPathParser.subscriptables`.
	 * @param ctx the parse tree
	 */
	enterSubscriptables?: (ctx: SubscriptablesContext) => void;
	/**
	 * Exit a parse tree produced by `JSONPathParser.subscriptables`.
	 * @param ctx the parse tree
	 */
	exitSubscriptables?: (ctx: SubscriptablesContext) => void;

	/**
	 * Enter a parse tree produced by `JSONPathParser.subscriptableBareword`.
	 * @param ctx the parse tree
	 */
	enterSubscriptableBareword?: (ctx: SubscriptableBarewordContext) => void;
	/**
	 * Exit a parse tree produced by `JSONPathParser.subscriptableBareword`.
	 * @param ctx the parse tree
	 */
	exitSubscriptableBareword?: (ctx: SubscriptableBarewordContext) => void;

	/**
	 * Enter a parse tree produced by `JSONPathParser.subscriptable`.
	 * @param ctx the parse tree
	 */
	enterSubscriptable?: (ctx: SubscriptableContext) => void;
	/**
	 * Exit a parse tree produced by `JSONPathParser.subscriptable`.
	 * @param ctx the parse tree
	 */
	exitSubscriptable?: (ctx: SubscriptableContext) => void;

	/**
	 * Enter a parse tree produced by `JSONPathParser.sliceable`.
	 * @param ctx the parse tree
	 */
	enterSliceable?: (ctx: SliceableContext) => void;
	/**
	 * Exit a parse tree produced by `JSONPathParser.sliceable`.
	 * @param ctx the parse tree
	 */
	exitSliceable?: (ctx: SliceableContext) => void;

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

