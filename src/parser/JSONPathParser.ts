// Generated from ./src/parser/JSONPath.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { JSONPathListener } from "./JSONPathListener";

export class JSONPathParser extends Parser {
	public static readonly CURRENT_VALUE = 1;
	public static readonly RECURSIVE_DESCENT = 2;
	public static readonly ROOT_VALUE = 3;
	public static readonly SUBSCRIPT = 4;
	public static readonly WILDCARD = 5;
	public static readonly AND = 6;
	public static readonly EQ = 7;
	public static readonly GE = 8;
	public static readonly GT = 9;
	public static readonly LE = 10;
	public static readonly LT = 11;
	public static readonly NE = 12;
	public static readonly IN = 13;
	public static readonly NIN = 14;
	public static readonly NOT = 15;
	public static readonly OR = 16;
	public static readonly TRUE = 17;
	public static readonly FALSE = 18;
	public static readonly NULL = 19;
	public static readonly BRACE_LEFT = 20;
	public static readonly BRACE_RIGHT = 21;
	public static readonly BRACKET_LEFT = 22;
	public static readonly BRACKET_RIGHT = 23;
	public static readonly COLON = 24;
	public static readonly COMMA = 25;
	public static readonly PAREN_LEFT = 26;
	public static readonly PAREN_RIGHT = 27;
	public static readonly QUESTION = 28;
	public static readonly IDENTIFIER = 29;
	public static readonly STRING = 30;
	public static readonly NUMBER = 31;
	public static readonly WS = 32;
	public static readonly RULE_jsonpath = 0;
	public static readonly RULE_filterpath = 1;
	public static readonly RULE_filterarg = 2;
	public static readonly RULE_subscript = 3;
	public static readonly RULE_subscriptables = 4;
	public static readonly RULE_subscriptableBareword = 5;
	public static readonly RULE_subscriptable = 6;
	public static readonly RULE_sliceable = 7;
	public static readonly RULE_expression = 8;
	public static readonly RULE_json = 9;
	public static readonly RULE_obj = 10;
	public static readonly RULE_pair = 11;
	public static readonly RULE_array = 12;
	public static readonly RULE_value = 13;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"jsonpath", "filterpath", "filterarg", "subscript", "subscriptables", 
		"subscriptableBareword", "subscriptable", "sliceable", "expression", "json", 
		"obj", "pair", "array", "value",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'@'", "'..'", "'$'", "'.'", "'*'", "'&&'", "'=='", "'>='", 
		"'>'", "'<='", "'<'", "'!='", "'in'", "'nin'", "'!'", "'||'", "'true'", 
		"'false'", "'null'", "'{'", "'}'", "'['", "']'", "':'", "','", "'('", 
		"')'", "'?'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CURRENT_VALUE", "RECURSIVE_DESCENT", "ROOT_VALUE", "SUBSCRIPT", 
		"WILDCARD", "AND", "EQ", "GE", "GT", "LE", "LT", "NE", "IN", "NIN", "NOT", 
		"OR", "TRUE", "FALSE", "NULL", "BRACE_LEFT", "BRACE_RIGHT", "BRACKET_LEFT", 
		"BRACKET_RIGHT", "COLON", "COMMA", "PAREN_LEFT", "PAREN_RIGHT", "QUESTION", 
		"IDENTIFIER", "STRING", "NUMBER", "WS",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(JSONPathParser._LITERAL_NAMES, JSONPathParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return JSONPathParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "JSONPath.g4"; }

	// @Override
	public get ruleNames(): string[] { return JSONPathParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return JSONPathParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(JSONPathParser._ATN, this);
	}
	// @RuleVersion(0)
	public jsonpath(): JsonpathContext {
		let _localctx: JsonpathContext = new JsonpathContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, JSONPathParser.RULE_jsonpath);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 28;
			this.match(JSONPathParser.ROOT_VALUE);
			this.state = 30;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JSONPathParser.RECURSIVE_DESCENT) | (1 << JSONPathParser.SUBSCRIPT) | (1 << JSONPathParser.BRACKET_LEFT))) !== 0)) {
				{
				this.state = 29;
				this.subscript();
				}
			}

			this.state = 32;
			this.match(JSONPathParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public filterpath(): FilterpathContext {
		let _localctx: FilterpathContext = new FilterpathContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, JSONPathParser.RULE_filterpath);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 34;
			_la = this._input.LA(1);
			if (!(_la === JSONPathParser.CURRENT_VALUE || _la === JSONPathParser.ROOT_VALUE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 36;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 35;
				this.subscript();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public filterarg(): FilterargContext {
		let _localctx: FilterargContext = new FilterargContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, JSONPathParser.RULE_filterarg);
		try {
			this.state = 40;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.CURRENT_VALUE:
			case JSONPathParser.ROOT_VALUE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 38;
				this.filterpath();
				}
				break;
			case JSONPathParser.TRUE:
			case JSONPathParser.FALSE:
			case JSONPathParser.NULL:
			case JSONPathParser.BRACE_LEFT:
			case JSONPathParser.BRACKET_LEFT:
			case JSONPathParser.STRING:
			case JSONPathParser.NUMBER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 39;
				this.value();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subscript(): SubscriptContext {
		let _localctx: SubscriptContext = new SubscriptContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, JSONPathParser.RULE_subscript);
		try {
			this.state = 59;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.RECURSIVE_DESCENT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 42;
				this.match(JSONPathParser.RECURSIVE_DESCENT);
				this.state = 45;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case JSONPathParser.WILDCARD:
				case JSONPathParser.IDENTIFIER:
					{
					this.state = 43;
					this.subscriptableBareword();
					}
					break;
				case JSONPathParser.BRACKET_LEFT:
					{
					this.state = 44;
					this.subscriptables();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 48;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 47;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.SUBSCRIPT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 50;
				this.match(JSONPathParser.SUBSCRIPT);
				this.state = 51;
				this.subscriptableBareword();
				this.state = 53;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
				case 1:
					{
					this.state = 52;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 55;
				this.subscriptables();
				this.state = 57;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
				case 1:
					{
					this.state = 56;
					this.subscript();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subscriptables(): SubscriptablesContext {
		let _localctx: SubscriptablesContext = new SubscriptablesContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, JSONPathParser.RULE_subscriptables);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 61;
			this.match(JSONPathParser.BRACKET_LEFT);
			this.state = 62;
			this.subscriptable();
			this.state = 67;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === JSONPathParser.COMMA) {
				{
				{
				this.state = 63;
				this.match(JSONPathParser.COMMA);
				this.state = 64;
				this.subscriptable();
				}
				}
				this.state = 69;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 70;
			this.match(JSONPathParser.BRACKET_RIGHT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subscriptableBareword(): SubscriptableBarewordContext {
		let _localctx: SubscriptableBarewordContext = new SubscriptableBarewordContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, JSONPathParser.RULE_subscriptableBareword);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 72;
			_la = this._input.LA(1);
			if (!(_la === JSONPathParser.WILDCARD || _la === JSONPathParser.IDENTIFIER)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subscriptable(): SubscriptableContext {
		let _localctx: SubscriptableContext = new SubscriptableContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, JSONPathParser.RULE_subscriptable);
		let _la: number;
		try {
			this.state = 95;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 74;
				this.match(JSONPathParser.STRING);
				}
				break;
			case JSONPathParser.NUMBER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 75;
				this.match(JSONPathParser.NUMBER);
				this.state = 77;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === JSONPathParser.COLON) {
					{
					this.state = 76;
					this.sliceable();
					}
				}

				}
				break;
			case JSONPathParser.COLON:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 79;
				this.sliceable();
				}
				break;
			case JSONPathParser.WILDCARD:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 80;
				this.match(JSONPathParser.WILDCARD);
				}
				break;
			case JSONPathParser.PAREN_LEFT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 81;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 82;
				this.filterarg();
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JSONPathParser.CURRENT_VALUE) | (1 << JSONPathParser.ROOT_VALUE) | (1 << JSONPathParser.TRUE) | (1 << JSONPathParser.FALSE) | (1 << JSONPathParser.NULL) | (1 << JSONPathParser.BRACE_LEFT) | (1 << JSONPathParser.BRACKET_LEFT) | (1 << JSONPathParser.STRING) | (1 << JSONPathParser.NUMBER))) !== 0)) {
					{
					this.state = 83;
					this.filterarg();
					}
				}

				this.state = 86;
				this.match(JSONPathParser.PAREN_RIGHT);
				}
				break;
			case JSONPathParser.QUESTION:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 88;
				this.match(JSONPathParser.QUESTION);
				this.state = 89;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 90;
				this.expression(0);
				this.state = 91;
				this.match(JSONPathParser.PAREN_RIGHT);
				}
				break;
			case JSONPathParser.CURRENT_VALUE:
			case JSONPathParser.ROOT_VALUE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 93;
				this.filterpath();
				}
				break;
			case JSONPathParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 94;
				this.match(JSONPathParser.IDENTIFIER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sliceable(): SliceableContext {
		let _localctx: SliceableContext = new SliceableContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, JSONPathParser.RULE_sliceable);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 97;
			this.match(JSONPathParser.COLON);
			this.state = 99;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.NUMBER) {
				{
				this.state = 98;
				this.match(JSONPathParser.NUMBER);
				}
			}

			this.state = 105;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.COLON) {
				{
				this.state = 101;
				this.match(JSONPathParser.COLON);
				this.state = 103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === JSONPathParser.NUMBER) {
					{
					this.state = 102;
					this.match(JSONPathParser.NUMBER);
					}
				}

				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 16;
		this.enterRecursionRule(_localctx, 16, JSONPathParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 119;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.NOT:
				{
				this.state = 108;
				this.match(JSONPathParser.NOT);
				this.state = 109;
				this.expression(5);
				}
				break;
			case JSONPathParser.PAREN_LEFT:
				{
				this.state = 110;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 111;
				this.expression(0);
				this.state = 112;
				this.match(JSONPathParser.PAREN_RIGHT);
				}
				break;
			case JSONPathParser.CURRENT_VALUE:
			case JSONPathParser.ROOT_VALUE:
			case JSONPathParser.TRUE:
			case JSONPathParser.FALSE:
			case JSONPathParser.NULL:
			case JSONPathParser.BRACE_LEFT:
			case JSONPathParser.BRACKET_LEFT:
			case JSONPathParser.STRING:
			case JSONPathParser.NUMBER:
				{
				this.state = 114;
				this.filterarg();
				this.state = 117;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
				case 1:
					{
					this.state = 115;
					_la = this._input.LA(1);
					if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JSONPathParser.EQ) | (1 << JSONPathParser.GE) | (1 << JSONPathParser.GT) | (1 << JSONPathParser.LE) | (1 << JSONPathParser.LT) | (1 << JSONPathParser.NE) | (1 << JSONPathParser.IN) | (1 << JSONPathParser.NIN))) !== 0))) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 116;
					this.filterarg();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 129;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 127;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 121;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 122;
						this.match(JSONPathParser.AND);
						this.state = 123;
						this.expression(5);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 124;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 125;
						this.match(JSONPathParser.OR);
						this.state = 126;
						this.expression(4);
						}
						break;
					}
					}
				}
				this.state = 131;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public json(): JsonContext {
		let _localctx: JsonContext = new JsonContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, JSONPathParser.RULE_json);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public obj(): ObjContext {
		let _localctx: ObjContext = new ObjContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, JSONPathParser.RULE_obj);
		let _la: number;
		try {
			this.state = 147;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 134;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 135;
				this.pair();
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 136;
					this.match(JSONPathParser.COMMA);
					this.state = 137;
					this.pair();
					}
					}
					this.state = 142;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 143;
				this.match(JSONPathParser.BRACE_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 145;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 146;
				this.match(JSONPathParser.BRACE_RIGHT);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pair(): PairContext {
		let _localctx: PairContext = new PairContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, JSONPathParser.RULE_pair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(JSONPathParser.STRING);
			this.state = 150;
			this.match(JSONPathParser.COLON);
			this.state = 151;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public array(): ArrayContext {
		let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, JSONPathParser.RULE_array);
		let _la: number;
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 153;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 154;
				this.value();
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 155;
					this.match(JSONPathParser.COMMA);
					this.state = 156;
					this.value();
					}
					}
					this.state = 161;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 162;
				this.match(JSONPathParser.BRACKET_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 164;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 165;
				this.match(JSONPathParser.BRACKET_RIGHT);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, JSONPathParser.RULE_value);
		try {
			this.state = 175;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 168;
				this.match(JSONPathParser.STRING);
				}
				break;
			case JSONPathParser.NUMBER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 169;
				this.match(JSONPathParser.NUMBER);
				}
				break;
			case JSONPathParser.BRACE_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 170;
				this.obj();
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 171;
				this.array();
				}
				break;
			case JSONPathParser.TRUE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 172;
				this.match(JSONPathParser.TRUE);
				}
				break;
			case JSONPathParser.FALSE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 173;
				this.match(JSONPathParser.FALSE);
				}
				break;
			case JSONPathParser.NULL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 174;
				this.match(JSONPathParser.NULL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 8:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\"\xB4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x03\x02\x03\x02\x05\x02!\n\x02\x03\x02\x03\x02" +
		"\x03\x03\x03\x03\x05\x03\'\n\x03\x03\x04\x03\x04\x05\x04+\n\x04\x03\x05" +
		"\x03\x05\x03\x05\x05\x050\n\x05\x03\x05\x05\x053\n\x05\x03\x05\x03\x05" +
		"\x03\x05\x05\x058\n\x05\x03\x05\x03\x05\x05\x05<\n\x05\x05\x05>\n\x05" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x07\x06D\n\x06\f\x06\x0E\x06G\v\x06\x03" +
		"\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x03\b\x05\bP\n\b\x03\b\x03\b" +
		"\x03\b\x03\b\x03\b\x05\bW\n\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x05\bb\n\b\x03\t\x03\t\x05\tf\n\t\x03\t\x03\t\x05\tj\n" +
		"\t\x05\tl\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03" +
		"\n\x05\nx\n\n\x05\nz\n\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\n\x82" +
		"\n\n\f\n\x0E\n\x85\v\n\x03\v\x03\v\x03\f\x03\f\x03\f\x03\f\x07\f\x8D\n" +
		"\f\f\f\x0E\f\x90\v\f\x03\f\x03\f\x03\f\x03\f\x05\f\x96\n\f\x03\r\x03\r" +
		"\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x07\x0E\xA0\n\x0E\f\x0E\x0E" +
		"\x0E\xA3\v\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xA9\n\x0E\x03\x0F" +
		"\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xB2\n\x0F\x03" +
		"\x0F\x02\x02\x03\x12\x10\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E" +
		"\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x02\x05\x04" +
		"\x02\x03\x03\x05\x05\x04\x02\x07\x07\x1F\x1F\x03\x02\t\x10\x02\xCA\x02" +
		"\x1E\x03\x02\x02\x02\x04$\x03\x02\x02\x02\x06*\x03\x02\x02\x02\b=\x03" +
		"\x02\x02\x02\n?\x03\x02\x02\x02\fJ\x03\x02\x02\x02\x0Ea\x03\x02\x02\x02" +
		"\x10c\x03\x02\x02\x02\x12y\x03\x02\x02\x02\x14\x86\x03\x02\x02\x02\x16" +
		"\x95\x03\x02\x02\x02\x18\x97\x03\x02\x02\x02\x1A\xA8\x03\x02\x02\x02\x1C" +
		"\xB1\x03\x02\x02\x02\x1E \x07\x05\x02\x02\x1F!\x05\b\x05\x02 \x1F\x03" +
		"\x02\x02\x02 !\x03\x02\x02\x02!\"\x03\x02\x02\x02\"#\x07\x02\x02\x03#" +
		"\x03\x03\x02\x02\x02$&\t\x02\x02\x02%\'\x05\b\x05\x02&%\x03\x02\x02\x02" +
		"&\'\x03\x02\x02\x02\'\x05\x03\x02\x02\x02(+\x05\x04\x03\x02)+\x05\x1C" +
		"\x0F\x02*(\x03\x02\x02\x02*)\x03\x02\x02\x02+\x07\x03\x02\x02\x02,/\x07" +
		"\x04\x02\x02-0\x05\f\x07\x02.0\x05\n\x06\x02/-\x03\x02\x02\x02/.\x03\x02" +
		"\x02\x0202\x03\x02\x02\x0213\x05\b\x05\x0221\x03\x02\x02\x0223\x03\x02" +
		"\x02\x023>\x03\x02\x02\x0245\x07\x06\x02\x0257\x05\f\x07\x0268\x05\b\x05" +
		"\x0276\x03\x02\x02\x0278\x03\x02\x02\x028>\x03\x02\x02\x029;\x05\n\x06" +
		"\x02:<\x05\b\x05\x02;:\x03\x02\x02\x02;<\x03\x02\x02\x02<>\x03\x02\x02" +
		"\x02=,\x03\x02\x02\x02=4\x03\x02\x02\x02=9\x03\x02\x02\x02>\t\x03\x02" +
		"\x02\x02?@\x07\x18\x02\x02@E\x05\x0E\b\x02AB\x07\x1B\x02\x02BD\x05\x0E" +
		"\b\x02CA\x03\x02\x02\x02DG\x03\x02\x02\x02EC\x03\x02\x02\x02EF\x03\x02" +
		"\x02\x02FH\x03\x02\x02\x02GE\x03\x02\x02\x02HI\x07\x19\x02\x02I\v\x03" +
		"\x02\x02\x02JK\t\x03\x02\x02K\r\x03\x02\x02\x02Lb\x07 \x02\x02MO\x07!" +
		"\x02\x02NP\x05\x10\t\x02ON\x03\x02\x02\x02OP\x03\x02\x02\x02Pb\x03\x02" +
		"\x02\x02Qb\x05\x10\t\x02Rb\x07\x07\x02\x02ST\x07\x1C\x02\x02TV\x05\x06" +
		"\x04\x02UW\x05\x06\x04\x02VU\x03\x02\x02\x02VW\x03\x02\x02\x02WX\x03\x02" +
		"\x02\x02XY\x07\x1D\x02\x02Yb\x03\x02\x02\x02Z[\x07\x1E\x02\x02[\\\x07" +
		"\x1C\x02\x02\\]\x05\x12\n\x02]^\x07\x1D\x02\x02^b\x03\x02\x02\x02_b\x05" +
		"\x04\x03\x02`b\x07\x1F\x02\x02aL\x03\x02\x02\x02aM\x03\x02\x02\x02aQ\x03" +
		"\x02\x02\x02aR\x03\x02\x02\x02aS\x03\x02\x02\x02aZ\x03\x02\x02\x02a_\x03" +
		"\x02\x02\x02a`\x03\x02\x02\x02b\x0F\x03\x02\x02\x02ce\x07\x1A\x02\x02" +
		"df\x07!\x02\x02ed\x03\x02\x02\x02ef\x03\x02\x02\x02fk\x03\x02\x02\x02" +
		"gi\x07\x1A\x02\x02hj\x07!\x02\x02ih\x03\x02\x02\x02ij\x03\x02\x02\x02" +
		"jl\x03\x02\x02\x02kg\x03\x02\x02\x02kl\x03\x02\x02\x02l\x11\x03\x02\x02" +
		"\x02mn\b\n\x01\x02no\x07\x11\x02\x02oz\x05\x12\n\x07pq\x07\x1C\x02\x02" +
		"qr\x05\x12\n\x02rs\x07\x1D\x02\x02sz\x03\x02\x02\x02tw\x05\x06\x04\x02" +
		"uv\t\x04\x02\x02vx\x05\x06\x04\x02wu\x03\x02\x02\x02wx\x03\x02\x02\x02" +
		"xz\x03\x02\x02\x02ym\x03\x02\x02\x02yp\x03\x02\x02\x02yt\x03\x02\x02\x02" +
		"z\x83\x03\x02\x02\x02{|\f\x06\x02\x02|}\x07\b\x02\x02}\x82\x05\x12\n\x07" +
		"~\x7F\f\x05\x02\x02\x7F\x80\x07\x12\x02\x02\x80\x82\x05\x12\n\x06\x81" +
		"{\x03\x02\x02\x02\x81~\x03\x02\x02\x02\x82\x85\x03\x02\x02\x02\x83\x81" +
		"\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x13\x03\x02\x02\x02\x85\x83" +
		"\x03\x02\x02\x02\x86\x87\x05\x1C\x0F\x02\x87\x15\x03\x02\x02\x02\x88\x89" +
		"\x07\x16\x02\x02\x89\x8E\x05\x18\r\x02\x8A\x8B\x07\x1B\x02\x02\x8B\x8D" +
		"\x05\x18\r\x02\x8C\x8A\x03\x02\x02\x02\x8D\x90\x03\x02\x02\x02\x8E\x8C" +
		"\x03\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x91\x03\x02\x02\x02\x90\x8E" +
		"\x03\x02\x02\x02\x91\x92\x07\x17\x02\x02\x92\x96\x03\x02\x02\x02\x93\x94" +
		"\x07\x16\x02\x02\x94\x96\x07\x17\x02\x02\x95\x88\x03\x02\x02\x02\x95\x93" +
		"\x03\x02\x02\x02\x96\x17\x03\x02\x02\x02\x97\x98\x07 \x02\x02\x98\x99" +
		"\x07\x1A\x02\x02\x99\x9A\x05\x1C\x0F\x02\x9A\x19\x03\x02\x02\x02\x9B\x9C" +
		"\x07\x18\x02\x02\x9C\xA1\x05\x1C\x0F\x02\x9D\x9E\x07\x1B\x02\x02\x9E\xA0" +
		"\x05\x1C\x0F\x02\x9F\x9D\x03\x02\x02\x02\xA0\xA3\x03\x02\x02\x02\xA1\x9F" +
		"\x03\x02\x02\x02\xA1\xA2\x03\x02\x02\x02\xA2\xA4\x03\x02\x02\x02\xA3\xA1" +
		"\x03\x02\x02\x02\xA4\xA5\x07\x19\x02\x02\xA5\xA9\x03\x02\x02\x02\xA6\xA7" +
		"\x07\x18\x02\x02\xA7\xA9\x07\x19\x02\x02\xA8\x9B\x03\x02\x02\x02\xA8\xA6" +
		"\x03\x02\x02\x02\xA9\x1B\x03\x02\x02\x02\xAA\xB2\x07 \x02\x02\xAB\xB2" +
		"\x07!\x02\x02\xAC\xB2\x05\x16\f\x02\xAD\xB2\x05\x1A\x0E\x02\xAE\xB2\x07" +
		"\x13\x02\x02\xAF\xB2\x07\x14\x02\x02\xB0\xB2\x07\x15\x02\x02\xB1\xAA\x03" +
		"\x02\x02\x02\xB1\xAB\x03\x02\x02\x02\xB1\xAC\x03\x02\x02\x02\xB1\xAD\x03" +
		"\x02\x02\x02\xB1\xAE\x03\x02\x02\x02\xB1\xAF\x03\x02\x02\x02\xB1\xB0\x03" +
		"\x02\x02\x02\xB2\x1D\x03\x02\x02\x02\x1A &*/27;=EOVaeikwy\x81\x83\x8E" +
		"\x95\xA1\xA8\xB1";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JSONPathParser.__ATN) {
			JSONPathParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JSONPathParser._serializedATN));
		}

		return JSONPathParser.__ATN;
	}

}

export class JsonpathContext extends ParserRuleContext {
	public ROOT_VALUE(): TerminalNode { return this.getToken(JSONPathParser.ROOT_VALUE, 0); }
	public EOF(): TerminalNode { return this.getToken(JSONPathParser.EOF, 0); }
	public subscript(): SubscriptContext | undefined {
		return this.tryGetRuleContext(0, SubscriptContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_jsonpath; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterJsonpath) {
			listener.enterJsonpath(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitJsonpath) {
			listener.exitJsonpath(this);
		}
	}
}


export class FilterpathContext extends ParserRuleContext {
	public ROOT_VALUE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.ROOT_VALUE, 0); }
	public CURRENT_VALUE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.CURRENT_VALUE, 0); }
	public subscript(): SubscriptContext | undefined {
		return this.tryGetRuleContext(0, SubscriptContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_filterpath; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterFilterpath) {
			listener.enterFilterpath(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitFilterpath) {
			listener.exitFilterpath(this);
		}
	}
}


export class FilterargContext extends ParserRuleContext {
	public filterpath(): FilterpathContext | undefined {
		return this.tryGetRuleContext(0, FilterpathContext);
	}
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_filterarg; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterFilterarg) {
			listener.enterFilterarg(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitFilterarg) {
			listener.exitFilterarg(this);
		}
	}
}


export class SubscriptContext extends ParserRuleContext {
	public RECURSIVE_DESCENT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.RECURSIVE_DESCENT, 0); }
	public subscriptableBareword(): SubscriptableBarewordContext | undefined {
		return this.tryGetRuleContext(0, SubscriptableBarewordContext);
	}
	public subscriptables(): SubscriptablesContext | undefined {
		return this.tryGetRuleContext(0, SubscriptablesContext);
	}
	public subscript(): SubscriptContext | undefined {
		return this.tryGetRuleContext(0, SubscriptContext);
	}
	public SUBSCRIPT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.SUBSCRIPT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_subscript; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSubscript) {
			listener.enterSubscript(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSubscript) {
			listener.exitSubscript(this);
		}
	}
}


export class SubscriptablesContext extends ParserRuleContext {
	public BRACKET_LEFT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_LEFT, 0); }
	public subscriptable(): SubscriptableContext[];
	public subscriptable(i: number): SubscriptableContext;
	public subscriptable(i?: number): SubscriptableContext | SubscriptableContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SubscriptableContext);
		} else {
			return this.getRuleContext(i, SubscriptableContext);
		}
	}
	public BRACKET_RIGHT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_RIGHT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.COMMA);
		} else {
			return this.getToken(JSONPathParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_subscriptables; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSubscriptables) {
			listener.enterSubscriptables(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSubscriptables) {
			listener.exitSubscriptables(this);
		}
	}
}


export class SubscriptableBarewordContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IDENTIFIER, 0); }
	public WILDCARD(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.WILDCARD, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_subscriptableBareword; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSubscriptableBareword) {
			listener.enterSubscriptableBareword(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSubscriptableBareword) {
			listener.exitSubscriptableBareword(this);
		}
	}
}


export class SubscriptableContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STRING, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NUMBER, 0); }
	public sliceable(): SliceableContext | undefined {
		return this.tryGetRuleContext(0, SliceableContext);
	}
	public WILDCARD(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.WILDCARD, 0); }
	public PAREN_LEFT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_LEFT, 0); }
	public filterarg(): FilterargContext[];
	public filterarg(i: number): FilterargContext;
	public filterarg(i?: number): FilterargContext | FilterargContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FilterargContext);
		} else {
			return this.getRuleContext(i, FilterargContext);
		}
	}
	public PAREN_RIGHT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0); }
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.QUESTION, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public filterpath(): FilterpathContext | undefined {
		return this.tryGetRuleContext(0, FilterpathContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_subscriptable; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSubscriptable) {
			listener.enterSubscriptable(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSubscriptable) {
			listener.exitSubscriptable(this);
		}
	}
}


export class SliceableContext extends ParserRuleContext {
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.COLON);
		} else {
			return this.getToken(JSONPathParser.COLON, i);
		}
	}
	public NUMBER(): TerminalNode[];
	public NUMBER(i: number): TerminalNode;
	public NUMBER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.NUMBER);
		} else {
			return this.getToken(JSONPathParser.NUMBER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_sliceable; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSliceable) {
			listener.enterSliceable(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSliceable) {
			listener.exitSliceable(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public NOT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NOT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public AND(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.OR, 0); }
	public PAREN_LEFT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_LEFT, 0); }
	public PAREN_RIGHT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0); }
	public filterarg(): FilterargContext[];
	public filterarg(i: number): FilterargContext;
	public filterarg(i?: number): FilterargContext | FilterargContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FilterargContext);
		} else {
			return this.getRuleContext(i, FilterargContext);
		}
	}
	public EQ(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.EQ, 0); }
	public NE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NE, 0); }
	public LT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.LT, 0); }
	public LE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.LE, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.GT, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.GE, 0); }
	public IN(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IN, 0); }
	public NIN(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NIN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_expression; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
}


export class JsonContext extends ParserRuleContext {
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_json; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterJson) {
			listener.enterJson(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitJson) {
			listener.exitJson(this);
		}
	}
}


export class ObjContext extends ParserRuleContext {
	public BRACE_LEFT(): TerminalNode { return this.getToken(JSONPathParser.BRACE_LEFT, 0); }
	public pair(): PairContext[];
	public pair(i: number): PairContext;
	public pair(i?: number): PairContext | PairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(PairContext);
		} else {
			return this.getRuleContext(i, PairContext);
		}
	}
	public BRACE_RIGHT(): TerminalNode { return this.getToken(JSONPathParser.BRACE_RIGHT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.COMMA);
		} else {
			return this.getToken(JSONPathParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_obj; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterObj) {
			listener.enterObj(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitObj) {
			listener.exitObj(this);
		}
	}
}


export class PairContext extends ParserRuleContext {
	public STRING(): TerminalNode { return this.getToken(JSONPathParser.STRING, 0); }
	public COLON(): TerminalNode { return this.getToken(JSONPathParser.COLON, 0); }
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_pair; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterPair) {
			listener.enterPair(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitPair) {
			listener.exitPair(this);
		}
	}
}


export class ArrayContext extends ParserRuleContext {
	public BRACKET_LEFT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_LEFT, 0); }
	public value(): ValueContext[];
	public value(i: number): ValueContext;
	public value(i?: number): ValueContext | ValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ValueContext);
		} else {
			return this.getRuleContext(i, ValueContext);
		}
	}
	public BRACKET_RIGHT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_RIGHT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.COMMA);
		} else {
			return this.getToken(JSONPathParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_array; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterArray) {
			listener.enterArray(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitArray) {
			listener.exitArray(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public STRING(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STRING, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NUMBER, 0); }
	public obj(): ObjContext | undefined {
		return this.tryGetRuleContext(0, ObjContext);
	}
	public array(): ArrayContext | undefined {
		return this.tryGetRuleContext(0, ArrayContext);
	}
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.FALSE, 0); }
	public NULL(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NULL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_value; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
}


