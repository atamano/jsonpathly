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
	public static readonly STAR = 5;
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
	public static readonly MINUS_SP = 34;
	public static readonly PLUS = 35;
	public static readonly DIV = 36;
	public static readonly IDENTIFIER = 37;
	public static readonly STRING = 38;
	public static readonly NUMBER = 39;
	public static readonly WS = 40;
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
		"'- '", "'+'", "'/'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", "DOT", "STAR", "AND", 
		"EQ", "GE", "GT", "LE", "LT", "NE", "IN", "NIN", "SUB", "ANY", "NON", 
		"SIZO", "SIZ", "NOT", "OR", "TRUE", "FALSE", "NULL", "BRACE_LEFT", "BRACE_RIGHT", 
		"BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", "PAREN_LEFT", "PAREN_RIGHT", 
		"QUESTION", "MINUS_SP", "PLUS", "DIV", "IDENTIFIER", "STRING", "NUMBER", 
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
			this.state = 49;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.PAREN_LEFT:
				{
				this.state = 43;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 44;
				this.filterarg(0);
				this.state = 45;
				this.match(JSONPathParser.PAREN_RIGHT);
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
				this.state = 47;
				this.value();
				}
				break;
			case JSONPathParser.CURRENT_VALUE:
			case JSONPathParser.ROOT_VALUE:
				{
				this.state = 48;
				this.filterpath();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 61;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 59;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
					case 1:
						{
						_localctx = new FilterargContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
						this.state = 51;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 52;
						_la = this._input.LA(1);
						if (!(_la === JSONPathParser.STAR || _la === JSONPathParser.DIV)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 53;
						this.filterarg(5);
						}
						break;

					case 2:
						{
						_localctx = new FilterargContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
						this.state = 54;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 56;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS) {
							{
							this.state = 55;
							_la = this._input.LA(1);
							if (!(_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS)) {
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

						this.state = 58;
						this.filterarg(4);
						}
						break;
					}
					}
				}
				this.state = 63;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
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
			this.state = 78;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.DOTDOT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 64;
				this.match(JSONPathParser.DOTDOT);
				this.state = 65;
				this.dotdotContent();
				this.state = 67;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 5, this._ctx) ) {
				case 1:
					{
					this.state = 66;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 69;
				this.match(JSONPathParser.DOT);
				this.state = 70;
				this.dotContent();
				this.state = 72;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
				case 1:
					{
					this.state = 71;
					this.subscript();
					}
					break;
				}
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 74;
				this.bracket();
				this.state = 76;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
				case 1:
					{
					this.state = 75;
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
			this.state = 83;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 80;
				this.match(JSONPathParser.IDENTIFIER);
				}
				break;
			case JSONPathParser.STAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 81;
				this.match(JSONPathParser.STAR);
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 82;
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
			this.state = 85;
			_la = this._input.LA(1);
			if (!(_la === JSONPathParser.STAR || _la === JSONPathParser.IDENTIFIER || _la === JSONPathParser.NUMBER)) {
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
			this.state = 87;
			this.match(JSONPathParser.BRACKET_LEFT);
			this.state = 88;
			this.bracketContent();
			this.state = 89;
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
			this.state = 99;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 91;
				this.unions();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 92;
				this.indexes();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 93;
				this.match(JSONPathParser.NUMBER);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 94;
				this.match(JSONPathParser.STRING);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 95;
				this.slices();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 96;
				this.match(JSONPathParser.STAR);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 97;
				this.filterExpression();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 98;
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
			this.state = 101;
			this.match(JSONPathParser.QUESTION);
			this.state = 102;
			this.match(JSONPathParser.PAREN_LEFT);
			this.state = 103;
			this.expression(0);
			this.state = 104;
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
			this.state = 106;
			this.match(JSONPathParser.NUMBER);
			this.state = 109;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 107;
				this.match(JSONPathParser.COMMA);
				this.state = 108;
				this.match(JSONPathParser.NUMBER);
				}
				}
				this.state = 111;
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
			this.state = 127;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 113;
				this.match(JSONPathParser.STRING);
				this.state = 116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 114;
					this.match(JSONPathParser.COMMA);
					this.state = 115;
					this.match(JSONPathParser.STRING);
					}
					}
					this.state = 118;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la === JSONPathParser.COMMA);
				}
				break;
			case JSONPathParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 120;
				this.match(JSONPathParser.IDENTIFIER);
				this.state = 123;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 121;
					this.match(JSONPathParser.COMMA);
					this.state = 122;
					this.match(JSONPathParser.IDENTIFIER);
					}
					}
					this.state = 125;
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
			this.state = 130;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.NUMBER) {
				{
				this.state = 129;
				this.match(JSONPathParser.NUMBER);
				}
			}

			this.state = 132;
			this.match(JSONPathParser.COLON);
			this.state = 134;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.NUMBER) {
				{
				this.state = 133;
				this.match(JSONPathParser.NUMBER);
				}
			}

			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === JSONPathParser.COLON) {
				{
				this.state = 136;
				this.match(JSONPathParser.COLON);
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === JSONPathParser.NUMBER) {
					{
					this.state = 137;
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
			this.state = 154;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 143;
				this.match(JSONPathParser.NOT);
				this.state = 144;
				this.expression(6);
				}
				break;

			case 2:
				{
				this.state = 145;
				this.match(JSONPathParser.PAREN_LEFT);
				this.state = 146;
				this.expression(0);
				this.state = 147;
				this.match(JSONPathParser.PAREN_RIGHT);
				}
				break;

			case 3:
				{
				this.state = 149;
				this.filterarg(0);
				this.state = 150;
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
				this.state = 151;
				this.filterarg(0);
				}
				break;

			case 4:
				{
				this.state = 153;
				this.filterpath();
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 164;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 162;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 156;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 157;
						this.match(JSONPathParser.AND);
						this.state = 158;
						this.expression(5);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
						this.state = 159;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 160;
						this.match(JSONPathParser.OR);
						this.state = 161;
						this.expression(4);
						}
						break;
					}
					}
				}
				this.state = 166;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
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
			this.state = 167;
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
			this.state = 169;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				{
				this.state = 168;
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
			this.state = 171;
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
			this.state = 186;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 173;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 174;
				this.pair();
				this.state = 179;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 175;
					this.match(JSONPathParser.COMMA);
					this.state = 176;
					this.pair();
					}
					}
					this.state = 181;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 182;
				this.match(JSONPathParser.BRACE_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 184;
				this.match(JSONPathParser.BRACE_LEFT);
				this.state = 185;
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
			this.state = 188;
			this.match(JSONPathParser.STRING);
			this.state = 189;
			this.match(JSONPathParser.COLON);
			this.state = 190;
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
			this.state = 205;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 192;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 193;
				this.value();
				this.state = 198;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === JSONPathParser.COMMA) {
					{
					{
					this.state = 194;
					this.match(JSONPathParser.COMMA);
					this.state = 195;
					this.value();
					}
					}
					this.state = 200;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 201;
				this.match(JSONPathParser.BRACKET_RIGHT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 203;
				this.match(JSONPathParser.BRACKET_LEFT);
				this.state = 204;
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
			this.state = 214;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case JSONPathParser.STRING:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 207;
				this.match(JSONPathParser.STRING);
				}
				break;
			case JSONPathParser.NUMBER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 208;
				this.match(JSONPathParser.NUMBER);
				}
				break;
			case JSONPathParser.BRACE_LEFT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 209;
				this.obj();
				}
				break;
			case JSONPathParser.BRACKET_LEFT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 210;
				this.array();
				}
				break;
			case JSONPathParser.TRUE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 211;
				this.match(JSONPathParser.TRUE);
				}
				break;
			case JSONPathParser.FALSE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 212;
				this.match(JSONPathParser.FALSE);
				}
				break;
			case JSONPathParser.NULL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 213;
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
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 4);

		case 3:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03*\xDB\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x03\x02\x03\x02\x05\x02)\n\x02\x03\x02\x03\x02\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x034\n\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x05\x03;\n\x03\x03\x03\x07\x03>\n\x03\f\x03" +
		"\x0E\x03A\v\x03\x03\x04\x03\x04\x03\x04\x05\x04F\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x05\x04K\n\x04\x03\x04\x03\x04\x05\x04O\n\x04\x05\x04Q\n\x04" +
		"\x03\x05\x03\x05\x03\x05\x05\x05V\n\x05\x03\x06\x03\x06\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b" +
		"f\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x06\np\n\n\r\n\x0E" +
		"\nq\x03\v\x03\v\x03\v\x06\vw\n\v\r\v\x0E\vx\x03\v\x03\v\x03\v\x06\v~\n" +
		"\v\r\v\x0E\v\x7F\x05\v\x82\n\v\x03\f\x05\f\x85\n\f\x03\f\x03\f\x05\f\x89" +
		"\n\f\x03\f\x03\f\x05\f\x8D\n\f\x05\f\x8F\n\f\x03\r\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x03\r\x05\r\x9D\n\r\x03\r\x03\r" +
		"\x03\r\x03\r\x03\r\x03\r\x07\r\xA5\n\r\f\r\x0E\r\xA8\v\r\x03\x0E\x03\x0E" +
		"\x05\x0E\xAC\n\x0E\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x07" +
		"\x10\xB4\n\x10\f\x10\x0E\x10\xB7\v\x10\x03\x10\x03\x10\x03\x10\x03\x10" +
		"\x05\x10\xBD\n\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12\x03" +
		"\x12\x03\x12\x07\x12\xC7\n\x12\f\x12\x0E\x12\xCA\v\x12\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x05\x12\xD0\n\x12\x03\x13\x03\x13\x03\x13\x03\x13\x03" +
		"\x13\x03\x13\x03\x13\x05\x13\xD9\n\x13\x03\x13\x02\x02\x04\x04\x18\x14" +
		"\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14" +
		"\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02\x02\x07\x04" +
		"\x02\x07\x07&&\x03\x02$%\x05\x02\x07\x07\'\'))\x03\x02\t\x15\x04\x02\x03" +
		"\x03\x05\x05\x02\xF4\x02&\x03\x02\x02\x02\x043\x03\x02\x02\x02\x06P\x03" +
		"\x02\x02\x02\bU\x03\x02\x02\x02\nW\x03\x02\x02\x02\fY\x03\x02\x02\x02" +
		"\x0Ee\x03\x02\x02\x02\x10g\x03\x02\x02\x02\x12l\x03\x02\x02\x02\x14\x81" +
		"\x03\x02\x02\x02\x16\x84\x03\x02\x02\x02\x18\x9C\x03\x02\x02\x02\x1A\xA9" +
		"\x03\x02\x02\x02\x1C\xAD\x03\x02\x02\x02\x1E\xBC\x03\x02\x02\x02 \xBE" +
		"\x03\x02\x02\x02\"\xCF\x03\x02\x02\x02$\xD8\x03\x02\x02\x02&(\x07\x05" +
		"\x02\x02\')\x05\x06\x04\x02(\'\x03\x02\x02\x02()\x03\x02\x02\x02)*\x03" +
		"\x02\x02\x02*+\x07\x02\x02\x03+\x03\x03\x02\x02\x02,-\b\x03\x01\x02-." +
		"\x07!\x02\x02./\x05\x04\x03\x02/0\x07\"\x02\x0204\x03\x02\x02\x0214\x05" +
		"$\x13\x0224\x05\x1A\x0E\x023,\x03\x02\x02\x0231\x03\x02\x02\x0232\x03" +
		"\x02\x02\x024?\x03\x02\x02\x0256\f\x06\x02\x0267\t\x02\x02\x027>\x05\x04" +
		"\x03\x078:\f\x05\x02\x029;\t\x03\x02\x02:9\x03\x02\x02\x02:;\x03\x02\x02" +
		"\x02;<\x03\x02\x02\x02<>\x05\x04\x03\x06=5\x03\x02\x02\x02=8\x03\x02\x02" +
		"\x02>A\x03\x02\x02\x02?=\x03\x02\x02\x02?@\x03\x02\x02\x02@\x05\x03\x02" +
		"\x02\x02A?\x03\x02\x02\x02BC\x07\x04\x02\x02CE\x05\b\x05\x02DF\x05\x06" +
		"\x04\x02ED\x03\x02\x02\x02EF\x03\x02\x02\x02FQ\x03\x02\x02\x02GH\x07\x06" +
		"\x02\x02HJ\x05\n\x06\x02IK\x05\x06\x04\x02JI\x03\x02\x02\x02JK\x03\x02" +
		"\x02\x02KQ\x03\x02\x02\x02LN\x05\f\x07\x02MO\x05\x06\x04\x02NM\x03\x02" +
		"\x02\x02NO\x03\x02\x02\x02OQ\x03\x02\x02\x02PB\x03\x02\x02\x02PG\x03\x02" +
		"\x02\x02PL\x03\x02\x02\x02Q\x07\x03\x02\x02\x02RV\x07\'\x02\x02SV\x07" +
		"\x07\x02\x02TV\x05\f\x07\x02UR\x03\x02\x02\x02US\x03\x02\x02\x02UT\x03" +
		"\x02\x02\x02V\t\x03\x02\x02\x02WX\t\x04\x02\x02X\v\x03\x02\x02\x02YZ\x07" +
		"\x1D\x02\x02Z[\x05\x0E\b\x02[\\\x07\x1E\x02\x02\\\r\x03\x02\x02\x02]f" +
		"\x05\x14\v\x02^f\x05\x12\n\x02_f\x07)\x02\x02`f\x07(\x02\x02af\x05\x16" +
		"\f\x02bf\x07\x07\x02\x02cf\x05\x10\t\x02df\x07\'\x02\x02e]\x03\x02\x02" +
		"\x02e^\x03\x02\x02\x02e_\x03\x02\x02\x02e`\x03\x02\x02\x02ea\x03\x02\x02" +
		"\x02eb\x03\x02\x02\x02ec\x03\x02\x02\x02ed\x03\x02\x02\x02f\x0F\x03\x02" +
		"\x02\x02gh\x07#\x02\x02hi\x07!\x02\x02ij\x05\x18\r\x02jk\x07\"\x02\x02" +
		"k\x11\x03\x02\x02\x02lo\x07)\x02\x02mn\x07 \x02\x02np\x07)\x02\x02om\x03" +
		"\x02\x02\x02pq\x03\x02\x02\x02qo\x03\x02\x02\x02qr\x03\x02\x02\x02r\x13" +
		"\x03\x02\x02\x02sv\x07(\x02\x02tu\x07 \x02\x02uw\x07(\x02\x02vt\x03\x02" +
		"\x02\x02wx\x03\x02\x02\x02xv\x03\x02\x02\x02xy\x03\x02\x02\x02y\x82\x03" +
		"\x02\x02\x02z}\x07\'\x02\x02{|\x07 \x02\x02|~\x07\'\x02\x02}{\x03\x02" +
		"\x02\x02~\x7F\x03\x02\x02\x02\x7F}\x03\x02\x02\x02\x7F\x80\x03\x02\x02" +
		"\x02\x80\x82\x03\x02\x02\x02\x81s\x03\x02\x02\x02\x81z\x03\x02\x02\x02" +
		"\x82\x15\x03\x02\x02\x02\x83\x85\x07)\x02\x02\x84\x83\x03\x02\x02\x02" +
		"\x84\x85\x03\x02\x02\x02\x85\x86\x03\x02\x02\x02\x86\x88\x07\x1F\x02\x02" +
		"\x87\x89\x07)\x02\x02\x88\x87\x03\x02\x02\x02\x88\x89\x03\x02\x02\x02" +
		"\x89\x8E\x03\x02\x02\x02\x8A\x8C\x07\x1F\x02\x02\x8B\x8D\x07)\x02\x02" +
		"\x8C\x8B\x03\x02\x02\x02\x8C\x8D\x03\x02\x02\x02\x8D\x8F\x03\x02\x02\x02" +
		"\x8E\x8A\x03\x02\x02\x02\x8E\x8F\x03\x02\x02\x02\x8F\x17\x03\x02\x02\x02" +
		"\x90\x91\b\r\x01\x02\x91\x92\x07\x16\x02\x02\x92\x9D\x05\x18\r\b\x93\x94" +
		"\x07!\x02\x02\x94\x95\x05\x18\r\x02\x95\x96\x07\"\x02\x02\x96\x9D\x03" +
		"\x02\x02\x02\x97\x98\x05\x04\x03\x02\x98\x99\t\x05\x02\x02\x99\x9A\x05" +
		"\x04\x03\x02\x9A\x9D\x03\x02\x02\x02\x9B\x9D\x05\x1A\x0E\x02\x9C\x90\x03" +
		"\x02\x02\x02\x9C\x93\x03\x02\x02\x02\x9C\x97\x03\x02\x02\x02\x9C\x9B\x03" +
		"\x02\x02\x02\x9D\xA6\x03\x02\x02\x02\x9E\x9F\f\x06\x02\x02\x9F\xA0\x07" +
		"\b\x02\x02\xA0\xA5\x05\x18\r\x07\xA1\xA2\f\x05\x02\x02\xA2\xA3\x07\x17" +
		"\x02\x02\xA3\xA5\x05\x18\r\x06\xA4\x9E\x03\x02\x02\x02\xA4\xA1\x03\x02" +
		"\x02\x02\xA5\xA8\x03\x02\x02\x02\xA6\xA4\x03\x02\x02\x02\xA6\xA7\x03\x02" +
		"\x02\x02\xA7\x19\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9\xAB\t\x06" +
		"\x02\x02\xAA\xAC\x05\x06\x04\x02\xAB\xAA\x03\x02\x02\x02\xAB\xAC\x03\x02" +
		"\x02\x02\xAC\x1B\x03\x02\x02\x02\xAD\xAE\x05$\x13\x02\xAE\x1D\x03\x02" +
		"\x02\x02\xAF\xB0\x07\x1B\x02\x02\xB0\xB5\x05 \x11\x02\xB1\xB2\x07 \x02" +
		"\x02\xB2\xB4\x05 \x11\x02\xB3\xB1\x03\x02\x02\x02\xB4\xB7\x03\x02\x02" +
		"\x02\xB5\xB3\x03\x02\x02\x02\xB5\xB6\x03\x02\x02\x02\xB6\xB8\x03\x02\x02" +
		"\x02\xB7\xB5\x03\x02\x02\x02\xB8\xB9\x07\x1C\x02\x02\xB9\xBD\x03\x02\x02" +
		"\x02\xBA\xBB\x07\x1B\x02\x02\xBB\xBD\x07\x1C\x02\x02\xBC\xAF\x03\x02\x02" +
		"\x02\xBC\xBA\x03\x02\x02\x02\xBD\x1F\x03\x02\x02\x02\xBE\xBF\x07(\x02" +
		"\x02\xBF\xC0\x07\x1F\x02\x02\xC0\xC1\x05$\x13\x02\xC1!\x03\x02\x02\x02" +
		"\xC2\xC3\x07\x1D\x02\x02\xC3\xC8\x05$\x13\x02\xC4\xC5\x07 \x02\x02\xC5" +
		"\xC7\x05$\x13\x02\xC6\xC4\x03\x02\x02\x02\xC7\xCA\x03\x02\x02\x02\xC8" +
		"\xC6\x03\x02\x02\x02\xC8\xC9\x03\x02\x02\x02\xC9\xCB\x03\x02\x02\x02\xCA" +
		"\xC8\x03\x02\x02\x02\xCB\xCC\x07\x1E\x02\x02\xCC\xD0\x03\x02\x02\x02\xCD" +
		"\xCE\x07\x1D\x02\x02\xCE\xD0\x07\x1E\x02\x02\xCF\xC2\x03\x02\x02\x02\xCF" +
		"\xCD\x03\x02\x02\x02\xD0#\x03\x02\x02\x02\xD1\xD9\x07(\x02\x02\xD2\xD9" +
		"\x07)\x02\x02\xD3\xD9\x05\x1E\x10\x02\xD4\xD9\x05\"\x12\x02\xD5\xD9\x07" +
		"\x18\x02\x02\xD6\xD9\x07\x19\x02\x02\xD7\xD9\x07\x1A\x02\x02\xD8\xD1\x03" +
		"\x02\x02\x02\xD8\xD2\x03\x02\x02\x02\xD8\xD3\x03\x02\x02\x02\xD8\xD4\x03" +
		"\x02\x02\x02\xD8\xD5\x03\x02\x02\x02\xD8\xD6\x03\x02\x02\x02\xD8\xD7\x03" +
		"\x02\x02\x02\xD9%\x03\x02\x02\x02\x1E(3:=?EJNPUeqx\x7F\x81\x84\x88\x8C" +
		"\x8E\x9C\xA4\xA6\xAB\xB5\xBC\xC8\xCF\xD8";
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
	public STAR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STAR, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.DIV, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PLUS, 0); }
	public MINUS_SP(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.MINUS_SP, 0); }
	public value(): ValueContext | undefined {
		return this.tryGetRuleContext(0, ValueContext);
	}
	public filterpath(): FilterpathContext | undefined {
		return this.tryGetRuleContext(0, FilterpathContext);
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
	public STAR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STAR, 0); }
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
	public STAR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STAR, 0); }
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
	public STAR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.STAR, 0); }
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
	public PAREN_LEFT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_LEFT, 0); }
	public PAREN_RIGHT(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(JSONPathParser.OR, 0); }
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


