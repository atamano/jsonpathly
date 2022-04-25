// Generated from ./src/parser/generated/JSONPath.g4 by ANTLR 4.9.0-SNAPSHOT


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
	public static readonly DOTDOT = 2;
	public static readonly ROOT_VALUE = 3;
	public static readonly DOT = 4;
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
	public static readonly SUB = 15;
	public static readonly ANY = 16;
	public static readonly NON = 17;
	public static readonly SIZO = 18;
	public static readonly SIZ = 19;
	public static readonly NOT = 20;
	public static readonly OR = 21;
	public static readonly TRUE = 22;
	public static readonly FALSE = 23;
	public static readonly NULL = 24;
	public static readonly BRACE_LEFT = 25;
	public static readonly BRACE_RIGHT = 26;
	public static readonly BRACKET_LEFT = 27;
	public static readonly BRACKET_RIGHT = 28;
	public static readonly COLON = 29;
	public static readonly COMMA = 30;
	public static readonly PAREN_LEFT = 31;
	public static readonly PAREN_RIGHT = 32;
	public static readonly QUESTION = 33;
	public static readonly MINUS = 34;
	public static readonly PLUS = 35;
	public static readonly IDENTIFIER = 36;
	public static readonly STRING = 37;
	public static readonly NUMBER = 38;
	public static readonly WS = 39;
	public static readonly RULE_jsonpath = 0;
	public static readonly RULE_filterarg = 1;
	public static readonly RULE_subscript = 2;
	public static readonly RULE_dotdotContent = 3;
	public static readonly RULE_dotContent = 4;
	public static readonly RULE_bracket = 5;
	public static readonly RULE_bracketContent = 6;
	public static readonly RULE_filterExpression = 7;
	public static readonly RULE_indexes = 8;
	public static readonly RULE_unions = 9;
	public static readonly RULE_slices = 10;
	public static readonly RULE_expression = 11;
	public static readonly RULE_filterpath = 12;
	public static readonly RULE_json = 13;
	public static readonly RULE_obj = 14;
	public static readonly RULE_pair = 15;
	public static readonly RULE_array = 16;
	public static readonly RULE_value = 17;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"jsonpath", "filterarg", "subscript", "dotdotContent", "dotContent", "bracket", 
		"bracketContent", "filterExpression", "indexes", "unions", "slices", "expression", 
		"filterpath", "json", "obj", "pair", "array", "value",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'@'", "'..'", "'$'", "'.'", "'*'", "'&&'", "'=='", "'>='", 
		"'>'", "'<='", "'<'", "'!='", "' in '", "' nin '", "' subsetof '", "' anyof '", 
		"' noneof '", "' sizeof '", "' size '", "'!'", "'||'", "'true'", "'false'", 
		"'null'", "'{'", "'}'", "'['", "']'", "':'", "','", "'('", "')'", "'?'", 
		"'- '", "'+'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", "DOT", "WILDCARD", 
		"AND", "EQ", "GE", "GT", "LE", "LT", "NE", "IN", "NIN", "SUB", "ANY", 
		"NON", "SIZO", "SIZ", "NOT", "OR", "TRUE", "FALSE", "NULL", "BRACE_LEFT", 
		"BRACE_RIGHT", "BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", "PAREN_LEFT", 
		"PAREN_RIGHT", "QUESTION", "MINUS", "PLUS", "IDENTIFIER", "STRING", "NUMBER", 
		"WS",
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
			this.state = 36;
			this.match(JSONPathParser.ROOT_VALUE);
			this.state = 38;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JSONPathParser.DOTDOT) | (1 << JSONPathParser.DOT) | (1 << JSONPathParser.BRACKET_LEFT))) !== 0)) {
				{
				this.state = 37;
				this.subscript();
				}
			}

			this.state = 40;
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

	public filterarg(): FilterargContext;
	public filterarg(_p: number): FilterargContext;
	// @RuleVersion(0)
	public filterarg(_p?: number): FilterargContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: FilterargContext = new FilterargContext(this._ctx, _parentState);
		let _prevctx: FilterargContext = _localctx;
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, JSONPathParser.RULE_filterarg, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 45;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.CURRENT_VALUE:
			case JSONPathParser.ROOT_VALUE:
				{
				this.state = 43;
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
				{
				this.state = 44;
				this.value();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 54;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new FilterargContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
					this.state = 47;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 49;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === JSONPathParser.MINUS || _la === JSONPathParser.PLUS) {
						{
						this.state = 48;
						_la = this._input.LA(1);
						if (!(_la === JSONPathParser.MINUS || _la === JSONPathParser.PLUS)) {
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

					this.state = 51;
					this.filterarg(2);
					}
					}
				}
				this.state = 56;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 3, this._ctx);
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
	public subscript(): SubscriptContext {
		let _localctx: SubscriptContext = new SubscriptContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, JSONPathParser.RULE_subscript);
		try {
			this.state = 71;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.DOTDOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 57;
				this.match(JSONPathParser.DOTDOT);
				this.state = 58;
				this.dotdotContent();
				this.state = 60;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
				case 1:
					{
					this.state = 59;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 62;
				this.match(JSONPathParser.DOT);
				this.state = 63;
				this.dotContent();
				this.state = 65;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
				case 1:
					{
					this.state = 64;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 67;
				this.bracket();
				this.state = 69;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
				case 1:
					{
					this.state = 68;
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
	public dotdotContent(): DotdotContentContext {
		let _localctx: DotdotContentContext = new DotdotContentContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, JSONPathParser.RULE_dotdotContent);
		try {
			this.state = 76;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 73;
				this.match(JSONPathParser.IDENTIFIER);
				}
				break;
			case JSONPathParser.WILDCARD:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 74;
				this.match(JSONPathParser.WILDCARD);
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 75;
				this.bracket();
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
	public dotContent(): DotContentContext {
		let _localctx: DotContentContext = new DotContentContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, JSONPathParser.RULE_dotContent);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			_la = this._input.LA(1);
			if (!(_la === JSONPathParser.WILDCARD || _la === JSONPathParser.IDENTIFIER || _la === JSONPathParser.NUMBER)) {
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
	public bracket(): BracketContext {
		let _localctx: BracketContext = new BracketContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, JSONPathParser.RULE_bracket);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 80;
			this.match(JSONPathParser.BRACKET_LEFT);
			this.state = 81;
			this.bracketContent();
			this.state = 82;
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
	public bracketContent(): BracketContentContext {
		let _localctx: BracketContentContext = new BracketContentContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, JSONPathParser.RULE_bracketContent);
		try {
			this.state = 92;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 84;
				this.unions();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 85;
				this.indexes();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 86;
				this.match(JSONPathParser.NUMBER);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 87;
				this.match(JSONPathParser.STRING);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 88;
				this.slices();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 89;
				this.match(JSONPathParser.WILDCARD);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 90;
				this.filterExpression();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 91;
				this.match(JSONPathParser.IDENTIFIER);
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
	public filterExpression(): FilterExpressionContext {
		let _localctx: FilterExpressionContext = new FilterExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, JSONPathParser.RULE_filterExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 94;
			this.match(JSONPathParser.QUESTION);
			this.state = 95;
			this.match(JSONPathParser.PAREN_LEFT);
			this.state = 96;
			this.expression(0);
			this.state = 97;
			this.match(JSONPathParser.PAREN_RIGHT);
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
	public indexes(): IndexesContext {
		let _localctx: IndexesContext = new IndexesContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, JSONPathParser.RULE_indexes);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 99;
			this.match(JSONPathParser.NUMBER);
			this.state = 102;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 100;
				this.match(JSONPathParser.COMMA);
				this.state = 101;
				this.match(JSONPathParser.NUMBER);
				}
				}
				this.state = 104;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === JSONPathParser.COMMA);
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
	public unions(): UnionsContext {
		let _localctx: UnionsContext = new UnionsContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, JSONPathParser.RULE_unions);
		let _la: number;
		try {
			this.state = 120;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 106;
				this.match(JSONPathParser.STRING);
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 107;
					this.match(JSONPathParser.COMMA);
					this.state = 108;
					this.match(JSONPathParser.STRING);
					}
					}
					this.state = 111;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === JSONPathParser.COMMA);
				}
				break;
			case JSONPathParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 113;
				this.match(JSONPathParser.IDENTIFIER);
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 114;
					this.match(JSONPathParser.COMMA);
					this.state = 115;
					this.match(JSONPathParser.IDENTIFIER);
					}
					}
					this.state = 118;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === JSONPathParser.COMMA);
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
	public slices(): SlicesContext {
		let _localctx: SlicesContext = new SlicesContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, JSONPathParser.RULE_slices);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 123;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.NUMBER) {
				{
				this.state = 122;
				this.match(JSONPathParser.NUMBER);
				}
			}

			this.state = 125;
			this.match(JSONPathParser.COLON);
			this.state = 127;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.NUMBER) {
				{
				this.state = 126;
				this.match(JSONPathParser.NUMBER);
				}
			}

			this.state = 133;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.COLON) {
				{
				this.state = 129;
				this.match(JSONPathParser.COLON);
				this.state = 131;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === JSONPathParser.NUMBER) {
					{
					this.state = 130;
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
		let _startState: number = 22;
		this.enterRecursionRule(_localctx, 22, JSONPathParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 147;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 136;
				this.match(JSONPathParser.NOT);
				this.state = 137;
				this.expression(6);
				}
				break;

			case 2:
				{
				this.state = 138;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 139;
				this.expression(0);
				this.state = 140;
				this.match(JSONPathParser.PAREN_RIGHT);
				}
				break;

			case 3:
				{
				this.state = 142;
				this.filterarg(0);
				this.state = 143;
				_la = this._input.LA(1);
				if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << JSONPathParser.EQ) | (1 << JSONPathParser.GE) | (1 << JSONPathParser.GT) | (1 << JSONPathParser.LE) | (1 << JSONPathParser.LT) | (1 << JSONPathParser.NE) | (1 << JSONPathParser.IN) | (1 << JSONPathParser.NIN) | (1 << JSONPathParser.SUB) | (1 << JSONPathParser.ANY) | (1 << JSONPathParser.NON) | (1 << JSONPathParser.SIZO) | (1 << JSONPathParser.SIZ))) !== 0))) {
				this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 144;
				this.filterarg(0);
				}
				break;

			case 4:
				{
				this.state = 146;
				this.filterpath();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 157;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 155;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 149;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 150;
						this.match(JSONPathParser.AND);
						this.state = 151;
						this.expression(6);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 152;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 153;
						this.match(JSONPathParser.OR);
						this.state = 154;
						this.expression(5);
						}
						break;
					}
					}
				}
				this.state = 159;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
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
	public filterpath(): FilterpathContext {
		let _localctx: FilterpathContext = new FilterpathContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, JSONPathParser.RULE_filterpath);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 160;
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
			this.state = 162;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 161;
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
	public json(): JsonContext {
		let _localctx: JsonContext = new JsonContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, JSONPathParser.RULE_json);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 164;
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
		this.enterRule(_localctx, 28, JSONPathParser.RULE_obj);
		let _la: number;
		try {
			this.state = 179;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 23, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 167;
				this.pair();
				this.state = 172;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 168;
					this.match(JSONPathParser.COMMA);
					this.state = 169;
					this.pair();
					}
					}
					this.state = 174;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 175;
				this.match(JSONPathParser.BRACE_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 177;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 178;
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
		this.enterRule(_localctx, 30, JSONPathParser.RULE_pair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 181;
			this.match(JSONPathParser.STRING);
			this.state = 182;
			this.match(JSONPathParser.COLON);
			this.state = 183;
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
		this.enterRule(_localctx, 32, JSONPathParser.RULE_array);
		let _la: number;
		try {
			this.state = 198;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 25, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 185;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 186;
				this.value();
				this.state = 191;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 187;
					this.match(JSONPathParser.COMMA);
					this.state = 188;
					this.value();
					}
					}
					this.state = 193;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 194;
				this.match(JSONPathParser.BRACKET_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 196;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 197;
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
		this.enterRule(_localctx, 34, JSONPathParser.RULE_value);
		try {
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 200;
				this.match(JSONPathParser.STRING);
				}
				break;
			case JSONPathParser.NUMBER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 201;
				this.match(JSONPathParser.NUMBER);
				}
				break;
			case JSONPathParser.BRACE_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 202;
				this.obj();
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 203;
				this.array();
				}
				break;
			case JSONPathParser.TRUE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 204;
				this.match(JSONPathParser.TRUE);
				}
				break;
			case JSONPathParser.FALSE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 205;
				this.match(JSONPathParser.FALSE);
				}
				break;
			case JSONPathParser.NULL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 206;
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
		case 1:
			return this.filterarg_sempred(_localctx as FilterargContext, predIndex);

		case 11:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private filterarg_sempred(_localctx: FilterargContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 1:
			return this.precpred(this._ctx, 5);

		case 2:
			return this.precpred(this._ctx, 4);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03)\xD4\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x03\x02\x03\x02\x05\x02)\n\x02\x03\x02\x03\x02\x03\x03\x03" +
		"\x03\x03\x03\x05\x030\n\x03\x03\x03\x03\x03\x05\x034\n\x03\x03\x03\x07" +
		"\x037\n\x03\f\x03\x0E\x03:\v\x03\x03\x04\x03\x04\x03\x04\x05\x04?\n\x04" +
		"\x03\x04\x03\x04\x03\x04\x05\x04D\n\x04\x03\x04\x03\x04\x05\x04H\n\x04" +
		"\x05\x04J\n\x04\x03\x05\x03\x05\x03\x05\x05\x05O\n\x05\x03\x06\x03\x06" +
		"\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x05\b_\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x06" +
		"\ni\n\n\r\n\x0E\nj\x03\v\x03\v\x03\v\x06\vp\n\v\r\v\x0E\vq\x03\v\x03\v" +
		"\x03\v\x06\vw\n\v\r\v\x0E\vx\x05\v{\n\v\x03\f\x05\f~\n\f\x03\f\x03\f\x05" +
		"\f\x82\n\f\x03\f\x03\f\x05\f\x86\n\f\x05\f\x88\n\f\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\x96\n\r\x03\r" +
		"\x03\r\x03\r\x03\r\x03\r\x03\r\x07\r\x9E\n\r\f\r\x0E\r\xA1\v\r\x03\x0E" +
		"\x03\x0E\x05\x0E\xA5\n\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x07\x10\xAD\n\x10\f\x10\x0E\x10\xB0\v\x10\x03\x10\x03\x10\x03\x10" +
		"\x03\x10\x05\x10\xB6\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03" +
		"\x12\x03\x12\x03\x12\x07\x12\xC0\n\x12\f\x12\x0E\x12\xC3\v\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x05\x12\xC9\n\x12\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x03\x13\x05\x13\xD2\n\x13\x03\x13\x02\x02\x04\x04" +
		"\x18\x14\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12" +
		"\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02\x02" +
		"\x06\x03\x02$%\x05\x02\x07\x07&&((\x03\x02\t\x15\x04\x02\x03\x03\x05\x05" +
		"\x02\xEB\x02&\x03\x02\x02\x02\x04/\x03\x02\x02\x02\x06I\x03\x02\x02\x02" +
		"\bN\x03\x02\x02\x02\nP\x03\x02\x02\x02\fR\x03\x02\x02\x02\x0E^\x03\x02" +
		"\x02\x02\x10`\x03\x02\x02\x02\x12e\x03\x02\x02\x02\x14z\x03\x02\x02\x02" +
		"\x16}\x03\x02\x02\x02\x18\x95\x03\x02\x02\x02\x1A\xA2\x03\x02\x02\x02" +
		"\x1C\xA6\x03\x02\x02\x02\x1E\xB5\x03\x02\x02\x02 \xB7\x03\x02\x02\x02" +
		"\"\xC8\x03\x02\x02\x02$\xD1\x03\x02\x02\x02&(\x07\x05\x02\x02\')\x05\x06" +
		"\x04\x02(\'\x03\x02\x02\x02()\x03\x02\x02\x02)*\x03\x02\x02\x02*+\x07" +
		"\x02\x02\x03+\x03\x03\x02\x02\x02,-\b\x03\x01\x02-0\x05\x1A\x0E\x02.0" +
		"\x05$\x13\x02/,\x03\x02\x02\x02/.\x03\x02\x02\x0208\x03\x02\x02\x0213" +
		"\f\x03\x02\x0224\t\x02\x02\x0232\x03\x02\x02\x0234\x03\x02\x02\x0245\x03" +
		"\x02\x02\x0257\x05\x04\x03\x0461\x03\x02\x02\x027:\x03\x02\x02\x0286\x03" +
		"\x02\x02\x0289\x03\x02\x02\x029\x05\x03\x02\x02\x02:8\x03\x02\x02\x02" +
		";<\x07\x04\x02\x02<>\x05\b\x05\x02=?\x05\x06\x04\x02>=\x03\x02\x02\x02" +
		">?\x03\x02\x02\x02?J\x03\x02\x02\x02@A\x07\x06\x02\x02AC\x05\n\x06\x02" +
		"BD\x05\x06\x04\x02CB\x03\x02\x02\x02CD\x03\x02\x02\x02DJ\x03\x02\x02\x02" +
		"EG\x05\f\x07\x02FH\x05\x06\x04\x02GF\x03\x02\x02\x02GH\x03\x02\x02\x02" +
		"HJ\x03\x02\x02\x02I;\x03\x02\x02\x02I@\x03\x02\x02\x02IE\x03\x02\x02\x02" +
		"J\x07\x03\x02\x02\x02KO\x07&\x02\x02LO\x07\x07\x02\x02MO\x05\f\x07\x02" +
		"NK\x03\x02\x02\x02NL\x03\x02\x02\x02NM\x03\x02\x02\x02O\t\x03\x02\x02" +
		"\x02PQ\t\x03\x02\x02Q\v\x03\x02\x02\x02RS\x07\x1D\x02\x02ST\x05\x0E\b" +
		"\x02TU\x07\x1E\x02\x02U\r\x03\x02\x02\x02V_\x05\x14\v\x02W_\x05\x12\n" +
		"\x02X_\x07(\x02\x02Y_\x07\'\x02\x02Z_\x05\x16\f\x02[_\x07\x07\x02\x02" +
		"\\_\x05\x10\t\x02]_\x07&\x02\x02^V\x03\x02\x02\x02^W\x03\x02\x02\x02^" +
		"X\x03\x02\x02\x02^Y\x03\x02\x02\x02^Z\x03\x02\x02\x02^[\x03\x02\x02\x02" +
		"^\\\x03\x02\x02\x02^]\x03\x02\x02\x02_\x0F\x03\x02\x02\x02`a\x07#\x02" +
		"\x02ab\x07!\x02\x02bc\x05\x18\r\x02cd\x07\"\x02\x02d\x11\x03\x02\x02\x02" +
		"eh\x07(\x02\x02fg\x07 \x02\x02gi\x07(\x02\x02hf\x03\x02\x02\x02ij\x03" +
		"\x02\x02\x02jh\x03\x02\x02\x02jk\x03\x02\x02\x02k\x13\x03\x02\x02\x02" +
		"lo\x07\'\x02\x02mn\x07 \x02\x02np\x07\'\x02\x02om\x03\x02\x02\x02pq\x03" +
		"\x02\x02\x02qo\x03\x02\x02\x02qr\x03\x02\x02\x02r{\x03\x02\x02\x02sv\x07" +
		"&\x02\x02tu\x07 \x02\x02uw\x07&\x02\x02vt\x03\x02\x02\x02wx\x03\x02\x02" +
		"\x02xv\x03\x02\x02\x02xy\x03\x02\x02\x02y{\x03\x02\x02\x02zl\x03\x02\x02" +
		"\x02zs\x03\x02\x02\x02{\x15\x03\x02\x02\x02|~\x07(\x02\x02}|\x03\x02\x02" +
		"\x02}~\x03\x02\x02\x02~\x7F\x03\x02\x02\x02\x7F\x81\x07\x1F\x02\x02\x80" +
		"\x82\x07(\x02\x02\x81\x80\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82" +
		"\x87\x03\x02\x02\x02\x83\x85\x07\x1F\x02\x02\x84\x86\x07(\x02\x02\x85" +
		"\x84\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x88\x03\x02\x02\x02\x87" +
		"\x83\x03\x02\x02\x02\x87\x88\x03\x02\x02\x02\x88\x17\x03\x02\x02\x02\x89" +
		"\x8A\b\r\x01\x02\x8A\x8B\x07\x16\x02\x02\x8B\x96\x05\x18\r\b\x8C\x8D\x07" +
		"!\x02\x02\x8D\x8E\x05\x18\r\x02\x8E\x8F\x07\"\x02\x02\x8F\x96\x03\x02" +
		"\x02\x02\x90\x91\x05\x04\x03\x02\x91\x92\t\x04\x02\x02\x92\x93\x05\x04" +
		"\x03\x02\x93\x96\x03\x02\x02\x02\x94\x96\x05\x1A\x0E\x02\x95\x89\x03\x02" +
		"\x02\x02\x95\x8C\x03\x02\x02\x02\x95\x90\x03\x02\x02\x02\x95\x94\x03\x02" +
		"\x02\x02\x96\x9F\x03\x02\x02\x02\x97\x98\f\x07\x02\x02\x98\x99\x07\b\x02" +
		"\x02\x99\x9E\x05\x18\r\b\x9A\x9B\f\x06\x02\x02\x9B\x9C\x07\x17\x02\x02" +
		"\x9C\x9E\x05\x18\r\x07\x9D\x97\x03\x02\x02\x02\x9D\x9A\x03\x02\x02\x02" +
		"\x9E\xA1\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02\x9F\xA0\x03\x02\x02\x02" +
		"\xA0\x19\x03\x02\x02\x02\xA1\x9F\x03\x02\x02\x02\xA2\xA4\t\x05\x02\x02" +
		"\xA3\xA5\x05\x06\x04\x02\xA4\xA3\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02" +
		"\xA5\x1B\x03\x02\x02\x02\xA6\xA7\x05$\x13\x02\xA7\x1D\x03\x02\x02\x02" +
		"\xA8\xA9\x07\x1B\x02\x02\xA9\xAE\x05 \x11\x02\xAA\xAB\x07 \x02\x02\xAB" +
		"\xAD\x05 \x11\x02\xAC\xAA\x03\x02\x02\x02\xAD\xB0\x03\x02\x02\x02\xAE" +
		"\xAC\x03\x02\x02\x02\xAE\xAF\x03\x02\x02\x02\xAF\xB1\x03\x02\x02\x02\xB0" +
		"\xAE\x03\x02\x02\x02\xB1\xB2\x07\x1C\x02\x02\xB2\xB6\x03\x02\x02\x02\xB3" +
		"\xB4\x07\x1B\x02\x02\xB4\xB6\x07\x1C\x02\x02\xB5\xA8\x03\x02\x02\x02\xB5" +
		"\xB3\x03\x02\x02\x02\xB6\x1F\x03\x02\x02\x02\xB7\xB8\x07\'\x02\x02\xB8" +
		"\xB9\x07\x1F\x02\x02\xB9\xBA\x05$\x13\x02\xBA!\x03\x02\x02\x02\xBB\xBC" +
		"\x07\x1D\x02\x02\xBC\xC1\x05$\x13\x02\xBD\xBE\x07 \x02\x02\xBE\xC0\x05" +
		"$\x13\x02\xBF\xBD\x03\x02\x02\x02\xC0\xC3\x03\x02\x02\x02\xC1\xBF\x03" +
		"\x02\x02\x02\xC1\xC2\x03\x02\x02\x02\xC2\xC4\x03\x02\x02\x02\xC3\xC1\x03" +
		"\x02\x02\x02\xC4\xC5\x07\x1E\x02\x02\xC5\xC9\x03\x02\x02\x02\xC6\xC7\x07" +
		"\x1D\x02\x02\xC7\xC9\x07\x1E\x02\x02\xC8\xBB\x03\x02\x02\x02\xC8\xC6\x03" +
		"\x02\x02\x02\xC9#\x03\x02\x02\x02\xCA\xD2\x07\'\x02\x02\xCB\xD2\x07(\x02" +
		"\x02\xCC\xD2\x05\x1E\x10\x02\xCD\xD2\x05\"\x12\x02\xCE\xD2\x07\x18\x02" +
		"\x02\xCF\xD2\x07\x19\x02\x02\xD0\xD2\x07\x1A\x02\x02\xD1\xCA\x03\x02\x02" +
		"\x02\xD1\xCB\x03\x02\x02\x02\xD1\xCC\x03\x02\x02\x02\xD1\xCD\x03\x02\x02" +
		"\x02\xD1\xCE\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02\xD1\xD0\x03\x02\x02" +
		"\x02\xD2%\x03\x02\x02\x02\x1D(/38>CGIN^jqxz}\x81\x85\x87\x95\x9D\x9F\xA4" +
		"\xAE\xB5\xC1\xC8\xD1";
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


export class FilterargContext extends ParserRuleContext {
	public filterpath(): FilterpathContext | undefined {
		return this.tryGetRuleContext(0, FilterpathContext);
	}
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	public filterarg(): FilterargContext[];
	public filterarg(i: number): FilterargContext;
	public filterarg(i?: number): FilterargContext | FilterargContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FilterargContext);
		} else {
			return this.getRuleContext(i, FilterargContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.MINUS, 0); }
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
	public DOTDOT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.DOTDOT, 0); }
	public dotdotContent(): DotdotContentContext | undefined {
		return this.tryGetRuleContext(0, DotdotContentContext);
	}
	public subscript(): SubscriptContext | undefined {
		return this.tryGetRuleContext(0, SubscriptContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.DOT, 0); }
	public dotContent(): DotContentContext | undefined {
		return this.tryGetRuleContext(0, DotContentContext);
	}
	public bracket(): BracketContext | undefined {
		return this.tryGetRuleContext(0, BracketContext);
	}
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


export class DotdotContentContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IDENTIFIER, 0); }
	public WILDCARD(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.WILDCARD, 0); }
	public bracket(): BracketContext | undefined {
		return this.tryGetRuleContext(0, BracketContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_dotdotContent; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterDotdotContent) {
			listener.enterDotdotContent(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitDotdotContent) {
			listener.exitDotdotContent(this);
		}
	}
}


export class DotContentContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IDENTIFIER, 0); }
	public WILDCARD(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.WILDCARD, 0); }
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NUMBER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_dotContent; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterDotContent) {
			listener.enterDotContent(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitDotContent) {
			listener.exitDotContent(this);
		}
	}
}


export class BracketContext extends ParserRuleContext {
	public BRACKET_LEFT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_LEFT, 0); }
	public bracketContent(): BracketContentContext {
		return this.getRuleContext(0, BracketContentContext);
	}
	public BRACKET_RIGHT(): TerminalNode { return this.getToken(JSONPathParser.BRACKET_RIGHT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_bracket; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterBracket) {
			listener.enterBracket(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitBracket) {
			listener.exitBracket(this);
		}
	}
}


export class BracketContentContext extends ParserRuleContext {
	public unions(): UnionsContext | undefined {
		return this.tryGetRuleContext(0, UnionsContext);
	}
	public indexes(): IndexesContext | undefined {
		return this.tryGetRuleContext(0, IndexesContext);
	}
	public NUMBER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NUMBER, 0); }
	public STRING(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STRING, 0); }
	public slices(): SlicesContext | undefined {
		return this.tryGetRuleContext(0, SlicesContext);
	}
	public WILDCARD(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.WILDCARD, 0); }
	public filterExpression(): FilterExpressionContext | undefined {
		return this.tryGetRuleContext(0, FilterExpressionContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_bracketContent; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterBracketContent) {
			listener.enterBracketContent(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitBracketContent) {
			listener.exitBracketContent(this);
		}
	}
}


export class FilterExpressionContext extends ParserRuleContext {
	public QUESTION(): TerminalNode { return this.getToken(JSONPathParser.QUESTION, 0); }
	public PAREN_LEFT(): TerminalNode { return this.getToken(JSONPathParser.PAREN_LEFT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public PAREN_RIGHT(): TerminalNode { return this.getToken(JSONPathParser.PAREN_RIGHT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_filterExpression; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterFilterExpression) {
			listener.enterFilterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitFilterExpression) {
			listener.exitFilterExpression(this);
		}
	}
}


export class IndexesContext extends ParserRuleContext {
	public NUMBER(): TerminalNode[];
	public NUMBER(i: number): TerminalNode;
	public NUMBER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.NUMBER);
		} else {
			return this.getToken(JSONPathParser.NUMBER, i);
		}
	}
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
	public get ruleIndex(): number { return JSONPathParser.RULE_indexes; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterIndexes) {
			listener.enterIndexes(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitIndexes) {
			listener.exitIndexes(this);
		}
	}
}


export class UnionsContext extends ParserRuleContext {
	public STRING(): TerminalNode[];
	public STRING(i: number): TerminalNode;
	public STRING(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.STRING);
		} else {
			return this.getToken(JSONPathParser.STRING, i);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.COMMA);
		} else {
			return this.getToken(JSONPathParser.COMMA, i);
		}
	}
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(JSONPathParser.IDENTIFIER);
		} else {
			return this.getToken(JSONPathParser.IDENTIFIER, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return JSONPathParser.RULE_unions; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterUnions) {
			listener.enterUnions(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitUnions) {
			listener.exitUnions(this);
		}
	}
}


export class SlicesContext extends ParserRuleContext {
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
	public get ruleIndex(): number { return JSONPathParser.RULE_slices; }
	// @Override
	public enterRule(listener: JSONPathListener): void {
		if (listener.enterSlices) {
			listener.enterSlices(this);
		}
	}
	// @Override
	public exitRule(listener: JSONPathListener): void {
		if (listener.exitSlices) {
			listener.exitSlices(this);
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
	public SUB(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.SUB, 0); }
	public ANY(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.ANY, 0); }
	public SIZO(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.SIZO, 0); }
	public NON(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.NON, 0); }
	public SIZ(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.SIZ, 0); }
	public filterpath(): FilterpathContext | undefined {
		return this.tryGetRuleContext(0, FilterpathContext);
	}
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


