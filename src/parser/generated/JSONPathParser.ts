// Generated from ./src/parser/generated/JSONPath.g4 by ANTLR 4.9.0-SNAPSHOT

import { ATN } from 'antlr4ts/atn/ATN';
import { ATNDeserializer } from 'antlr4ts/atn/ATNDeserializer';
import { FailedPredicateException } from 'antlr4ts/FailedPredicateException';
import { NotNull } from 'antlr4ts/Decorators';
import { NoViableAltException } from 'antlr4ts/NoViableAltException';
import { Override } from 'antlr4ts/Decorators';
import { Parser } from 'antlr4ts/Parser';
import { ParserRuleContext } from 'antlr4ts/ParserRuleContext';
import { ParserATNSimulator } from 'antlr4ts/atn/ParserATNSimulator';
import { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
import { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
import { RecognitionException } from 'antlr4ts/RecognitionException';
import { RuleContext } from 'antlr4ts/RuleContext';
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from 'antlr4ts/tree/TerminalNode';
import { Token } from 'antlr4ts/Token';
import { TokenStream } from 'antlr4ts/TokenStream';
import { Vocabulary } from 'antlr4ts/Vocabulary';
import { VocabularyImpl } from 'antlr4ts/VocabularyImpl';

import * as Utils from 'antlr4ts/misc/Utils';

import { JSONPathListener } from './JSONPathListener';

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
  public static readonly REG = 13;
  public static readonly IN = 14;
  public static readonly NIN = 15;
  public static readonly SUB = 16;
  public static readonly ANY = 17;
  public static readonly NON = 18;
  public static readonly SIZO = 19;
  public static readonly SIZ = 20;
  public static readonly EMPT = 21;
  public static readonly NOT = 22;
  public static readonly OR = 23;
  public static readonly TRUE = 24;
  public static readonly FALSE = 25;
  public static readonly NULL = 26;
  public static readonly BRACE_LEFT = 27;
  public static readonly BRACE_RIGHT = 28;
  public static readonly BRACKET_LEFT = 29;
  public static readonly BRACKET_RIGHT = 30;
  public static readonly COLON = 31;
  public static readonly COMMA = 32;
  public static readonly PAREN_LEFT = 33;
  public static readonly PAREN_RIGHT = 34;
  public static readonly QUESTION = 35;
  public static readonly MINUS_SP = 36;
  public static readonly PLUS = 37;
  public static readonly DIV = 38;
  public static readonly REGEX_OPT = 39;
  public static readonly REGEX_EXPR = 40;
  public static readonly FN_MIN = 41;
  public static readonly FN_MAX = 42;
  public static readonly FN_AVG = 43;
  public static readonly FN_STD = 44;
  public static readonly FN_LEN = 45;
  public static readonly FN_SUM = 46;
  public static readonly FN_KEY = 47;
  public static readonly FN_CONC = 48;
  public static readonly FN_APPE = 49;
  public static readonly IDENTIFIER = 50;
  public static readonly STRING = 51;
  public static readonly NUMBER = 52;
  public static readonly WS = 53;
  public static readonly RULE_jsonpath = 0;
  public static readonly RULE_function = 1;
  public static readonly RULE_filterarg = 2;
  public static readonly RULE_subscript = 3;
  public static readonly RULE_dotdotContent = 4;
  public static readonly RULE_dotContent = 5;
  public static readonly RULE_bracket = 6;
  public static readonly RULE_bracketContent = 7;
  public static readonly RULE_filterExpression = 8;
  public static readonly RULE_indexes = 9;
  public static readonly RULE_unions = 10;
  public static readonly RULE_slices = 11;
  public static readonly RULE_regex = 12;
  public static readonly RULE_expression = 13;
  public static readonly RULE_filterpath = 14;
  public static readonly RULE_json = 15;
  public static readonly RULE_obj = 16;
  public static readonly RULE_pair = 17;
  public static readonly RULE_array = 18;
  public static readonly RULE_value = 19;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'jsonpath',
    'function',
    'filterarg',
    'subscript',
    'dotdotContent',
    'dotContent',
    'bracket',
    'bracketContent',
    'filterExpression',
    'indexes',
    'unions',
    'slices',
    'regex',
    'expression',
    'filterpath',
    'json',
    'obj',
    'pair',
    'array',
    'value',
  ];

  private static readonly _LITERAL_NAMES: Array<string | undefined> = [
    undefined,
    "'@'",
    "'..'",
    "'$'",
    "'.'",
    "'*'",
    "'&&'",
    "'=='",
    "'>='",
    "'>'",
    "'<='",
    "'<'",
    "'!='",
    "'=~'",
    "' in '",
    "' nin '",
    "' subsetof '",
    "' anyof '",
    "' noneof '",
    "' sizeof '",
    "' size '",
    "' empty'",
    "'!'",
    "'||'",
    "'true'",
    "'false'",
    "'null'",
    "'{'",
    "'}'",
    "'['",
    "']'",
    "':'",
    "','",
    "'('",
    "')'",
    "'?'",
    "'- '",
    "'+'",
    "'/'",
    undefined,
    undefined,
    "'min()'",
    "'max()'",
    "'avg()'",
    "'stddev()'",
    "'length()'",
    "'sum()'",
    "'keys()'",
    "'concat('",
    "'append('",
  ];
  private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
    undefined,
    'CURRENT_VALUE',
    'DOTDOT',
    'ROOT_VALUE',
    'DOT',
    'STAR',
    'AND',
    'EQ',
    'GE',
    'GT',
    'LE',
    'LT',
    'NE',
    'REG',
    'IN',
    'NIN',
    'SUB',
    'ANY',
    'NON',
    'SIZO',
    'SIZ',
    'EMPT',
    'NOT',
    'OR',
    'TRUE',
    'FALSE',
    'NULL',
    'BRACE_LEFT',
    'BRACE_RIGHT',
    'BRACKET_LEFT',
    'BRACKET_RIGHT',
    'COLON',
    'COMMA',
    'PAREN_LEFT',
    'PAREN_RIGHT',
    'QUESTION',
    'MINUS_SP',
    'PLUS',
    'DIV',
    'REGEX_OPT',
    'REGEX_EXPR',
    'FN_MIN',
    'FN_MAX',
    'FN_AVG',
    'FN_STD',
    'FN_LEN',
    'FN_SUM',
    'FN_KEY',
    'FN_CONC',
    'FN_APPE',
    'IDENTIFIER',
    'STRING',
    'NUMBER',
    'WS',
  ];
  public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(
    JSONPathParser._LITERAL_NAMES,
    JSONPathParser._SYMBOLIC_NAMES,
    [],
  );

  // @Override
  // @NotNull
  public get vocabulary(): Vocabulary {
    return JSONPathParser.VOCABULARY;
  }
  // tslint:enable:no-trailing-whitespace

  // @Override
  public get grammarFileName(): string {
    return 'JSONPath.g4';
  }

  // @Override
  public get ruleNames(): string[] {
    return JSONPathParser.ruleNames;
  }

  // @Override
  public get serializedATN(): string {
    return JSONPathParser._serializedATN;
  }

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
        this.state = 40;
        this.match(JSONPathParser.ROOT_VALUE);
        this.state = 42;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << JSONPathParser.DOTDOT) | (1 << JSONPathParser.DOT) | (1 << JSONPathParser.BRACKET_LEFT))) !==
            0
        ) {
          {
            this.state = 41;
            this.subscript();
          }
        }

        this.state = 44;
        this.match(JSONPathParser.EOF);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public function(): FunctionContext {
    let _localctx: FunctionContext = new FunctionContext(this._ctx, this.state);
    this.enterRule(_localctx, 2, JSONPathParser.RULE_function);
    try {
      this.state = 67;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.FN_MIN:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 46;
            this.match(JSONPathParser.FN_MIN);
          }
          break;
        case JSONPathParser.FN_MAX:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 47;
            this.match(JSONPathParser.FN_MAX);
          }
          break;
        case JSONPathParser.FN_AVG:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 48;
            this.match(JSONPathParser.FN_AVG);
          }
          break;
        case JSONPathParser.FN_STD:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 49;
            this.match(JSONPathParser.FN_STD);
          }
          break;
        case JSONPathParser.FN_LEN:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 50;
            this.match(JSONPathParser.FN_LEN);
          }
          break;
        case JSONPathParser.FN_SUM:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 51;
            this.match(JSONPathParser.FN_SUM);
          }
          break;
        case JSONPathParser.FN_KEY:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 52;
            this.match(JSONPathParser.FN_KEY);
          }
          break;
        case JSONPathParser.FN_CONC:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 53;
            this.match(JSONPathParser.FN_CONC);
            this.state = 56;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case JSONPathParser.TRUE:
              case JSONPathParser.FALSE:
              case JSONPathParser.NULL:
              case JSONPathParser.BRACE_LEFT:
              case JSONPathParser.BRACKET_LEFT:
              case JSONPathParser.STRING:
              case JSONPathParser.NUMBER:
                {
                  this.state = 54;
                  this.value();
                }
                break;
              case JSONPathParser.CURRENT_VALUE:
              case JSONPathParser.ROOT_VALUE:
                {
                  this.state = 55;
                  this.filterpath();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
            this.state = 58;
            this.match(JSONPathParser.PAREN_RIGHT);
          }
          break;
        case JSONPathParser.FN_APPE:
          this.enterOuterAlt(_localctx, 9);
          {
            this.state = 60;
            this.match(JSONPathParser.FN_APPE);
            this.state = 63;
            this._errHandler.sync(this);
            switch (this._input.LA(1)) {
              case JSONPathParser.TRUE:
              case JSONPathParser.FALSE:
              case JSONPathParser.NULL:
              case JSONPathParser.BRACE_LEFT:
              case JSONPathParser.BRACKET_LEFT:
              case JSONPathParser.STRING:
              case JSONPathParser.NUMBER:
                {
                  this.state = 61;
                  this.value();
                }
                break;
              case JSONPathParser.CURRENT_VALUE:
              case JSONPathParser.ROOT_VALUE:
                {
                  this.state = 62;
                  this.filterpath();
                }
                break;
              default:
                throw new NoViableAltException(this);
            }
            this.state = 65;
            this.match(JSONPathParser.PAREN_RIGHT);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
    let _startState: number = 4;
    this.enterRecursionRule(_localctx, 4, JSONPathParser.RULE_filterarg, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 76;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case JSONPathParser.PAREN_LEFT:
            {
              this.state = 70;
              this.match(JSONPathParser.PAREN_LEFT);
              this.state = 71;
              this.filterarg(0);
              this.state = 72;
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
              this.state = 74;
              this.value();
            }
            break;
          case JSONPathParser.CURRENT_VALUE:
          case JSONPathParser.ROOT_VALUE:
            {
              this.state = 75;
              this.filterpath();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 88;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 86;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
                case 1:
                  {
                    _localctx = new FilterargContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
                    this.state = 78;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 4)');
                    }
                    this.state = 79;
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
                    this.state = 80;
                    this.filterarg(5);
                  }
                  break;

                case 2:
                  {
                    _localctx = new FilterargContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
                    this.state = 81;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)');
                    }
                    this.state = 83;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS) {
                      {
                        this.state = 82;
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

                    this.state = 85;
                    this.filterarg(4);
                  }
                  break;
              }
            }
          }
          this.state = 90;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public subscript(): SubscriptContext {
    let _localctx: SubscriptContext = new SubscriptContext(this._ctx, this.state);
    this.enterRule(_localctx, 6, JSONPathParser.RULE_subscript);
    try {
      this.state = 105;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.DOTDOT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 91;
            this.match(JSONPathParser.DOTDOT);
            this.state = 92;
            this.dotdotContent();
            this.state = 94;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 8, this._ctx)) {
              case 1:
                {
                  this.state = 93;
                  this.subscript();
                }
                break;
            }
          }
          break;
        case JSONPathParser.DOT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 96;
            this.match(JSONPathParser.DOT);
            this.state = 97;
            this.dotContent();
            this.state = 99;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 9, this._ctx)) {
              case 1:
                {
                  this.state = 98;
                  this.subscript();
                }
                break;
            }
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 101;
            this.bracket();
            this.state = 103;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
              case 1:
                {
                  this.state = 102;
                  this.subscript();
                }
                break;
            }
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public dotdotContent(): DotdotContentContext {
    let _localctx: DotdotContentContext = new DotdotContentContext(this._ctx, this.state);
    this.enterRule(_localctx, 8, JSONPathParser.RULE_dotdotContent);
    try {
      this.state = 110;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 107;
            this.match(JSONPathParser.IDENTIFIER);
          }
          break;
        case JSONPathParser.STAR:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 108;
            this.match(JSONPathParser.STAR);
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 109;
            this.bracket();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public dotContent(): DotContentContext {
    let _localctx: DotContentContext = new DotContentContext(this._ctx, this.state);
    this.enterRule(_localctx, 10, JSONPathParser.RULE_dotContent);
    try {
      this.state = 116;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.FN_MIN:
        case JSONPathParser.FN_MAX:
        case JSONPathParser.FN_AVG:
        case JSONPathParser.FN_STD:
        case JSONPathParser.FN_LEN:
        case JSONPathParser.FN_SUM:
        case JSONPathParser.FN_KEY:
        case JSONPathParser.FN_CONC:
        case JSONPathParser.FN_APPE:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 112;
            this.function();
          }
          break;
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 113;
            this.match(JSONPathParser.IDENTIFIER);
          }
          break;
        case JSONPathParser.STAR:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 114;
            this.match(JSONPathParser.STAR);
          }
          break;
        case JSONPathParser.NUMBER:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 115;
            this.match(JSONPathParser.NUMBER);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public bracket(): BracketContext {
    let _localctx: BracketContext = new BracketContext(this._ctx, this.state);
    this.enterRule(_localctx, 12, JSONPathParser.RULE_bracket);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 118;
        this.match(JSONPathParser.BRACKET_LEFT);
        this.state = 119;
        this.bracketContent();
        this.state = 120;
        this.match(JSONPathParser.BRACKET_RIGHT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public bracketContent(): BracketContentContext {
    let _localctx: BracketContentContext = new BracketContentContext(this._ctx, this.state);
    this.enterRule(_localctx, 14, JSONPathParser.RULE_bracketContent);
    try {
      this.state = 130;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 14, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 122;
            this.unions();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 123;
            this.indexes();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 124;
            this.match(JSONPathParser.NUMBER);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 125;
            this.match(JSONPathParser.STRING);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 126;
            this.slices();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 127;
            this.match(JSONPathParser.STAR);
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 128;
            this.filterExpression();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 129;
            this.match(JSONPathParser.IDENTIFIER);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public filterExpression(): FilterExpressionContext {
    let _localctx: FilterExpressionContext = new FilterExpressionContext(this._ctx, this.state);
    this.enterRule(_localctx, 16, JSONPathParser.RULE_filterExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 132;
        this.match(JSONPathParser.QUESTION);
        this.state = 133;
        this.match(JSONPathParser.PAREN_LEFT);
        this.state = 134;
        this.expression(0);
        this.state = 135;
        this.match(JSONPathParser.PAREN_RIGHT);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public indexes(): IndexesContext {
    let _localctx: IndexesContext = new IndexesContext(this._ctx, this.state);
    this.enterRule(_localctx, 18, JSONPathParser.RULE_indexes);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 137;
        this.match(JSONPathParser.NUMBER);
        this.state = 140;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 138;
              this.match(JSONPathParser.COMMA);
              this.state = 139;
              this.match(JSONPathParser.NUMBER);
            }
          }
          this.state = 142;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
        } while (_la === JSONPathParser.COMMA);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public unions(): UnionsContext {
    let _localctx: UnionsContext = new UnionsContext(this._ctx, this.state);
    this.enterRule(_localctx, 20, JSONPathParser.RULE_unions);
    let _la: number;
    try {
      this.state = 158;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 144;
            this.match(JSONPathParser.STRING);
            this.state = 147;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 145;
                  this.match(JSONPathParser.COMMA);
                  this.state = 146;
                  this.match(JSONPathParser.STRING);
                }
              }
              this.state = 149;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === JSONPathParser.COMMA);
          }
          break;
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 151;
            this.match(JSONPathParser.IDENTIFIER);
            this.state = 154;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 152;
                  this.match(JSONPathParser.COMMA);
                  this.state = 153;
                  this.match(JSONPathParser.IDENTIFIER);
                }
              }
              this.state = 156;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === JSONPathParser.COMMA);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public slices(): SlicesContext {
    let _localctx: SlicesContext = new SlicesContext(this._ctx, this.state);
    this.enterRule(_localctx, 22, JSONPathParser.RULE_slices);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 161;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.NUMBER) {
          {
            this.state = 160;
            this.match(JSONPathParser.NUMBER);
          }
        }

        this.state = 163;
        this.match(JSONPathParser.COLON);
        this.state = 165;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.NUMBER) {
          {
            this.state = 164;
            this.match(JSONPathParser.NUMBER);
          }
        }

        this.state = 171;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.COLON) {
          {
            this.state = 167;
            this.match(JSONPathParser.COLON);
            this.state = 169;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === JSONPathParser.NUMBER) {
              {
                this.state = 168;
                this.match(JSONPathParser.NUMBER);
              }
            }
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public regex(): RegexContext {
    let _localctx: RegexContext = new RegexContext(this._ctx, this.state);
    this.enterRule(_localctx, 24, JSONPathParser.RULE_regex);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 173;
        this.match(JSONPathParser.REGEX_EXPR);
        this.state = 175;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 23, this._ctx)) {
          case 1:
            {
              this.state = 174;
              this.match(JSONPathParser.REGEX_OPT);
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
    let _startState: number = 26;
    this.enterRecursionRule(_localctx, 26, JSONPathParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 196;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 24, this._ctx)) {
          case 1:
            {
              this.state = 178;
              this.match(JSONPathParser.NOT);
              this.state = 179;
              this.expression(8);
            }
            break;

          case 2:
            {
              this.state = 180;
              this.match(JSONPathParser.PAREN_LEFT);
              this.state = 181;
              this.expression(0);
              this.state = 182;
              this.match(JSONPathParser.PAREN_RIGHT);
            }
            break;

          case 3:
            {
              this.state = 184;
              this.filterarg(0);
              this.state = 185;
              _la = this._input.LA(1);
              if (
                !(
                  (_la & ~0x1f) === 0 &&
                  ((1 << _la) &
                    ((1 << JSONPathParser.EQ) |
                      (1 << JSONPathParser.GE) |
                      (1 << JSONPathParser.GT) |
                      (1 << JSONPathParser.LE) |
                      (1 << JSONPathParser.LT) |
                      (1 << JSONPathParser.NE) |
                      (1 << JSONPathParser.IN) |
                      (1 << JSONPathParser.NIN) |
                      (1 << JSONPathParser.SUB) |
                      (1 << JSONPathParser.ANY) |
                      (1 << JSONPathParser.NON) |
                      (1 << JSONPathParser.SIZO) |
                      (1 << JSONPathParser.SIZ))) !==
                    0
                )
              ) {
                this._errHandler.recoverInline(this);
              } else {
                if (this._input.LA(1) === Token.EOF) {
                  this.matchedEOF = true;
                }

                this._errHandler.reportMatch(this);
                this.consume();
              }
              this.state = 186;
              this.filterarg(0);
            }
            break;

          case 4:
            {
              this.state = 188;
              this.filterarg(0);
              this.state = 189;
              this.match(JSONPathParser.REG);
              this.state = 190;
              this.regex();
            }
            break;

          case 5:
            {
              this.state = 192;
              this.filterarg(0);
              this.state = 193;
              this.match(JSONPathParser.EMPT);
            }
            break;

          case 6:
            {
              this.state = 195;
              this.filterpath();
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 206;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 204;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 25, this._ctx)) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
                    this.state = 198;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 6)');
                    }
                    this.state = 199;
                    this.match(JSONPathParser.AND);
                    this.state = 200;
                    this.expression(7);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
                    this.state = 201;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 5)');
                    }
                    this.state = 202;
                    this.match(JSONPathParser.OR);
                    this.state = 203;
                    this.expression(6);
                  }
                  break;
              }
            }
          }
          this.state = 208;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public filterpath(): FilterpathContext {
    let _localctx: FilterpathContext = new FilterpathContext(this._ctx, this.state);
    this.enterRule(_localctx, 28, JSONPathParser.RULE_filterpath);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 209;
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
        this.state = 211;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 27, this._ctx)) {
          case 1:
            {
              this.state = 210;
              this.subscript();
            }
            break;
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public json(): JsonContext {
    let _localctx: JsonContext = new JsonContext(this._ctx, this.state);
    this.enterRule(_localctx, 30, JSONPathParser.RULE_json);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 213;
        this.value();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public obj(): ObjContext {
    let _localctx: ObjContext = new ObjContext(this._ctx, this.state);
    this.enterRule(_localctx, 32, JSONPathParser.RULE_obj);
    let _la: number;
    try {
      this.state = 228;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 29, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 215;
            this.match(JSONPathParser.BRACE_LEFT);
            this.state = 216;
            this.pair();
            this.state = 221;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === JSONPathParser.COMMA) {
              {
                {
                  this.state = 217;
                  this.match(JSONPathParser.COMMA);
                  this.state = 218;
                  this.pair();
                }
              }
              this.state = 223;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 224;
            this.match(JSONPathParser.BRACE_RIGHT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 226;
            this.match(JSONPathParser.BRACE_LEFT);
            this.state = 227;
            this.match(JSONPathParser.BRACE_RIGHT);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public pair(): PairContext {
    let _localctx: PairContext = new PairContext(this._ctx, this.state);
    this.enterRule(_localctx, 34, JSONPathParser.RULE_pair);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 230;
        this.match(JSONPathParser.STRING);
        this.state = 231;
        this.match(JSONPathParser.COLON);
        this.state = 232;
        this.value();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public array(): ArrayContext {
    let _localctx: ArrayContext = new ArrayContext(this._ctx, this.state);
    this.enterRule(_localctx, 36, JSONPathParser.RULE_array);
    let _la: number;
    try {
      this.state = 247;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 31, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 234;
            this.match(JSONPathParser.BRACKET_LEFT);
            this.state = 235;
            this.value();
            this.state = 240;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === JSONPathParser.COMMA) {
              {
                {
                  this.state = 236;
                  this.match(JSONPathParser.COMMA);
                  this.state = 237;
                  this.value();
                }
              }
              this.state = 242;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 243;
            this.match(JSONPathParser.BRACKET_RIGHT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 245;
            this.match(JSONPathParser.BRACKET_LEFT);
            this.state = 246;
            this.match(JSONPathParser.BRACKET_RIGHT);
          }
          break;
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }
  // @RuleVersion(0)
  public value(): ValueContext {
    let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
    this.enterRule(_localctx, 38, JSONPathParser.RULE_value);
    try {
      this.state = 256;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 249;
            this.match(JSONPathParser.STRING);
          }
          break;
        case JSONPathParser.NUMBER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 250;
            this.match(JSONPathParser.NUMBER);
          }
          break;
        case JSONPathParser.BRACE_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 251;
            this.obj();
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 252;
            this.array();
          }
          break;
        case JSONPathParser.TRUE:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 253;
            this.match(JSONPathParser.TRUE);
          }
          break;
        case JSONPathParser.FALSE:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 254;
            this.match(JSONPathParser.FALSE);
          }
          break;
        case JSONPathParser.NULL:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 255;
            this.match(JSONPathParser.NULL);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        _localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return _localctx;
  }

  public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
    switch (ruleIndex) {
      case 2:
        return this.filterarg_sempred(_localctx as FilterargContext, predIndex);

      case 13:
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
        return this.precpred(this._ctx, 6);

      case 3:
        return this.precpred(this._ctx, 5);
    }
    return true;
  }

  public static readonly _serializedATN: string =
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x037\u0105\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x03\x02\x03\x02\x05\x02-\n\x02' +
    '\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03' +
    '\x03\x03\x03\x03\x03\x03\x05\x03;\n\x03\x03\x03\x03\x03\x03\x03\x03\x03' +
    '\x03\x03\x05\x03B\n\x03\x03\x03\x03\x03\x05\x03F\n\x03\x03\x04\x03\x04' +
    '\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04O\n\x04\x03\x04\x03\x04' +
    '\x03\x04\x03\x04\x03\x04\x05\x04V\n\x04\x03\x04\x07\x04Y\n\x04\f\x04\x0E' +
    '\x04\\\v\x04\x03\x05\x03\x05\x03\x05\x05\x05a\n\x05\x03\x05\x03\x05\x03' +
    '\x05\x05\x05f\n\x05\x03\x05\x03\x05\x05\x05j\n\x05\x05\x05l\n\x05\x03' +
    '\x06\x03\x06\x03\x06\x05\x06q\n\x06\x03\x07\x03\x07\x03\x07\x03\x07\x05' +
    '\x07w\n\x07\x03\b\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03' +
    '\t\x03\t\x03\t\x05\t\x85\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\v\x03\v' +
    '\x03\v\x06\v\x8F\n\v\r\v\x0E\v\x90\x03\f\x03\f\x03\f\x06\f\x96\n\f\r\f' +
    '\x0E\f\x97\x03\f\x03\f\x03\f\x06\f\x9D\n\f\r\f\x0E\f\x9E\x05\f\xA1\n\f' +
    '\x03\r\x05\r\xA4\n\r\x03\r\x03\r\x05\r\xA8\n\r\x03\r\x03\r\x05\r\xAC\n' +
    '\r\x05\r\xAE\n\r\x03\x0E\x03\x0E\x05\x0E\xB2\n\x0E\x03\x0F\x03\x0F\x03' +
    '\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03' +
    '\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xC7' +
    '\n\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x03\x0F\x07\x0F\xCF\n\x0F' +
    '\f\x0F\x0E\x0F\xD2\v\x0F\x03\x10\x03\x10\x05\x10\xD6\n\x10\x03\x11\x03' +
    '\x11\x03\x12\x03\x12\x03\x12\x03\x12\x07\x12\xDE\n\x12\f\x12\x0E\x12\xE1' +
    '\v\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\xE7\n\x12\x03\x13\x03\x13' +
    '\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x03\x14\x07\x14\xF1\n\x14\f\x14' +
    '\x0E\x14\xF4\v\x14\x03\x14\x03\x14\x03\x14\x03\x14\x05\x14\xFA\n\x14\x03' +
    '\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u0103\n\x15' +
    '\x03\x15\x02\x02\x04\x06\x1C\x16\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f' +
    '\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E' +
    '\x02 \x02"\x02$\x02&\x02(\x02\x02\x06\x04\x02\x07\x07((\x03\x02&\'\x04' +
    '\x02\t\x0E\x10\x16\x04\x02\x03\x03\x05\x05\x02\u012C\x02*\x03\x02\x02' +
    '\x02\x04E\x03\x02\x02\x02\x06N\x03\x02\x02\x02\bk\x03\x02\x02\x02\np\x03' +
    '\x02\x02\x02\fv\x03\x02\x02\x02\x0Ex\x03\x02\x02\x02\x10\x84\x03\x02\x02' +
    '\x02\x12\x86\x03\x02\x02\x02\x14\x8B\x03\x02\x02\x02\x16\xA0\x03\x02\x02' +
    '\x02\x18\xA3\x03\x02\x02\x02\x1A\xAF\x03\x02\x02\x02\x1C\xC6\x03\x02\x02' +
    '\x02\x1E\xD3\x03\x02\x02\x02 \xD7\x03\x02\x02\x02"\xE6\x03\x02\x02\x02' +
    '$\xE8\x03\x02\x02\x02&\xF9\x03\x02\x02\x02(\u0102\x03\x02\x02\x02*,\x07' +
    '\x05\x02\x02+-\x05\b\x05\x02,+\x03\x02\x02\x02,-\x03\x02\x02\x02-.\x03' +
    '\x02\x02\x02./\x07\x02\x02\x03/\x03\x03\x02\x02\x020F\x07+\x02\x021F\x07' +
    ',\x02\x022F\x07-\x02\x023F\x07.\x02\x024F\x07/\x02\x025F\x070\x02\x02' +
    '6F\x071\x02\x027:\x072\x02\x028;\x05(\x15\x029;\x05\x1E\x10\x02:8\x03' +
    '\x02\x02\x02:9\x03\x02\x02\x02;<\x03\x02\x02\x02<=\x07$\x02\x02=F\x03' +
    '\x02\x02\x02>A\x073\x02\x02?B\x05(\x15\x02@B\x05\x1E\x10\x02A?\x03\x02' +
    '\x02\x02A@\x03\x02\x02\x02BC\x03\x02\x02\x02CD\x07$\x02\x02DF\x03\x02' +
    '\x02\x02E0\x03\x02\x02\x02E1\x03\x02\x02\x02E2\x03\x02\x02\x02E3\x03\x02' +
    '\x02\x02E4\x03\x02\x02\x02E5\x03\x02\x02\x02E6\x03\x02\x02\x02E7\x03\x02' +
    '\x02\x02E>\x03\x02\x02\x02F\x05\x03\x02\x02\x02GH\b\x04\x01\x02HI\x07' +
    '#\x02\x02IJ\x05\x06\x04\x02JK\x07$\x02\x02KO\x03\x02\x02\x02LO\x05(\x15' +
    '\x02MO\x05\x1E\x10\x02NG\x03\x02\x02\x02NL\x03\x02\x02\x02NM\x03\x02\x02' +
    '\x02OZ\x03\x02\x02\x02PQ\f\x06\x02\x02QR\t\x02\x02\x02RY\x05\x06\x04\x07' +
    'SU\f\x05\x02\x02TV\t\x03\x02\x02UT\x03\x02\x02\x02UV\x03\x02\x02\x02V' +
    'W\x03\x02\x02\x02WY\x05\x06\x04\x06XP\x03\x02\x02\x02XS\x03\x02\x02\x02' +
    'Y\\\x03\x02\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[\x07\x03\x02\x02' +
    '\x02\\Z\x03\x02\x02\x02]^\x07\x04\x02\x02^`\x05\n\x06\x02_a\x05\b\x05' +
    '\x02`_\x03\x02\x02\x02`a\x03\x02\x02\x02al\x03\x02\x02\x02bc\x07\x06\x02' +
    '\x02ce\x05\f\x07\x02df\x05\b\x05\x02ed\x03\x02\x02\x02ef\x03\x02\x02\x02' +
    'fl\x03\x02\x02\x02gi\x05\x0E\b\x02hj\x05\b\x05\x02ih\x03\x02\x02\x02i' +
    'j\x03\x02\x02\x02jl\x03\x02\x02\x02k]\x03\x02\x02\x02kb\x03\x02\x02\x02' +
    'kg\x03\x02\x02\x02l\t\x03\x02\x02\x02mq\x074\x02\x02nq\x07\x07\x02\x02' +
    'oq\x05\x0E\b\x02pm\x03\x02\x02\x02pn\x03\x02\x02\x02po\x03\x02\x02\x02' +
    'q\v\x03\x02\x02\x02rw\x05\x04\x03\x02sw\x074\x02\x02tw\x07\x07\x02\x02' +
    'uw\x076\x02\x02vr\x03\x02\x02\x02vs\x03\x02\x02\x02vt\x03\x02\x02\x02' +
    'vu\x03\x02\x02\x02w\r\x03\x02\x02\x02xy\x07\x1F\x02\x02yz\x05\x10\t\x02' +
    'z{\x07 \x02\x02{\x0F\x03\x02\x02\x02|\x85\x05\x16\f\x02}\x85\x05\x14\v' +
    '\x02~\x85\x076\x02\x02\x7F\x85\x075\x02\x02\x80\x85\x05\x18\r\x02\x81' +
    '\x85\x07\x07\x02\x02\x82\x85\x05\x12\n\x02\x83\x85\x074\x02\x02\x84|\x03' +
    '\x02\x02\x02\x84}\x03\x02\x02\x02\x84~\x03\x02\x02\x02\x84\x7F\x03\x02' +
    '\x02\x02\x84\x80\x03\x02\x02\x02\x84\x81\x03\x02\x02\x02\x84\x82\x03\x02' +
    '\x02\x02\x84\x83\x03\x02\x02\x02\x85\x11\x03\x02\x02\x02\x86\x87\x07%' +
    '\x02\x02\x87\x88\x07#\x02\x02\x88\x89\x05\x1C\x0F\x02\x89\x8A\x07$\x02' +
    '\x02\x8A\x13\x03\x02\x02\x02\x8B\x8E\x076\x02\x02\x8C\x8D\x07"\x02\x02' +
    '\x8D\x8F\x076\x02\x02\x8E\x8C\x03\x02\x02\x02\x8F\x90\x03\x02\x02\x02' +
    '\x90\x8E\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02\x91\x15\x03\x02\x02\x02' +
    '\x92\x95\x075\x02\x02\x93\x94\x07"\x02\x02\x94\x96\x075\x02\x02\x95\x93' +
    '\x03\x02\x02\x02\x96\x97\x03\x02\x02\x02\x97\x95\x03\x02\x02\x02\x97\x98' +
    '\x03\x02\x02\x02\x98\xA1\x03\x02\x02\x02\x99\x9C\x074\x02\x02\x9A\x9B' +
    '\x07"\x02\x02\x9B\x9D\x074\x02\x02\x9C\x9A\x03\x02\x02\x02\x9D\x9E\x03' +
    '\x02\x02\x02\x9E\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA1\x03' +
    '\x02\x02\x02\xA0\x92\x03\x02\x02\x02\xA0\x99\x03\x02\x02\x02\xA1\x17\x03' +
    '\x02\x02\x02\xA2\xA4\x076\x02\x02\xA3\xA2\x03\x02\x02\x02\xA3\xA4\x03' +
    '\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA7\x07!\x02\x02\xA6\xA8\x07' +
    '6\x02\x02\xA7\xA6\x03\x02\x02\x02\xA7\xA8\x03\x02\x02\x02\xA8\xAD\x03' +
    '\x02\x02\x02\xA9\xAB\x07!\x02\x02\xAA\xAC\x076\x02\x02\xAB\xAA\x03\x02' +
    '\x02\x02\xAB\xAC\x03\x02\x02\x02\xAC\xAE\x03\x02\x02\x02\xAD\xA9\x03\x02' +
    '\x02\x02\xAD\xAE\x03\x02\x02\x02\xAE\x19\x03\x02\x02\x02\xAF\xB1\x07*' +
    '\x02\x02\xB0\xB2\x07)\x02\x02\xB1\xB0\x03\x02\x02\x02\xB1\xB2\x03\x02' +
    '\x02\x02\xB2\x1B\x03\x02\x02\x02\xB3\xB4\b\x0F\x01\x02\xB4\xB5\x07\x18' +
    '\x02\x02\xB5\xC7\x05\x1C\x0F\n\xB6\xB7\x07#\x02\x02\xB7\xB8\x05\x1C\x0F' +
    '\x02\xB8\xB9\x07$\x02\x02\xB9\xC7\x03\x02\x02\x02\xBA\xBB\x05\x06\x04' +
    '\x02\xBB\xBC\t\x04\x02\x02\xBC\xBD\x05\x06\x04\x02\xBD\xC7\x03\x02\x02' +
    '\x02\xBE\xBF\x05\x06\x04\x02\xBF\xC0\x07\x0F\x02\x02\xC0\xC1\x05\x1A\x0E' +
    '\x02\xC1\xC7\x03\x02\x02\x02\xC2\xC3\x05\x06\x04\x02\xC3\xC4\x07\x17\x02' +
    '\x02\xC4\xC7\x03\x02\x02\x02\xC5\xC7\x05\x1E\x10\x02\xC6\xB3\x03\x02\x02' +
    '\x02\xC6\xB6\x03\x02\x02\x02\xC6\xBA\x03\x02\x02\x02\xC6\xBE\x03\x02\x02' +
    '\x02\xC6\xC2\x03\x02\x02\x02\xC6\xC5\x03\x02\x02\x02\xC7\xD0\x03\x02\x02' +
    '\x02\xC8\xC9\f\b\x02\x02\xC9\xCA\x07\b\x02\x02\xCA\xCF\x05\x1C\x0F\t\xCB' +
    '\xCC\f\x07\x02\x02\xCC\xCD\x07\x19\x02\x02\xCD\xCF\x05\x1C\x0F\b\xCE\xC8' +
    '\x03\x02\x02\x02\xCE\xCB\x03\x02\x02\x02\xCF\xD2\x03\x02\x02\x02\xD0\xCE' +
    '\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\x1D\x03\x02\x02\x02\xD2\xD0' +
    '\x03\x02\x02\x02\xD3\xD5\t\x05\x02\x02\xD4\xD6\x05\b\x05\x02\xD5\xD4\x03' +
    '\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\x1F\x03\x02\x02\x02\xD7\xD8\x05' +
    '(\x15\x02\xD8!\x03\x02\x02\x02\xD9\xDA\x07\x1D\x02\x02\xDA\xDF\x05$\x13' +
    '\x02\xDB\xDC\x07"\x02\x02\xDC\xDE\x05$\x13\x02\xDD\xDB\x03\x02\x02\x02' +
    '\xDE\xE1\x03\x02\x02\x02\xDF\xDD\x03\x02\x02\x02\xDF\xE0\x03\x02\x02\x02' +
    '\xE0\xE2\x03\x02\x02\x02\xE1\xDF\x03\x02\x02\x02\xE2\xE3\x07\x1E\x02\x02' +
    '\xE3\xE7\x03\x02\x02\x02\xE4\xE5\x07\x1D\x02\x02\xE5\xE7\x07\x1E\x02\x02' +
    '\xE6\xD9\x03\x02\x02\x02\xE6\xE4\x03\x02\x02\x02\xE7#\x03\x02\x02\x02' +
    '\xE8\xE9\x075\x02\x02\xE9\xEA\x07!\x02\x02\xEA\xEB\x05(\x15\x02\xEB%\x03' +
    '\x02\x02\x02\xEC\xED\x07\x1F\x02\x02\xED\xF2\x05(\x15\x02\xEE\xEF\x07' +
    '"\x02\x02\xEF\xF1\x05(\x15\x02\xF0\xEE\x03\x02\x02\x02\xF1\xF4\x03\x02' +
    '\x02\x02\xF2\xF0\x03\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3\xF5\x03\x02' +
    '\x02\x02\xF4\xF2\x03\x02\x02\x02\xF5\xF6\x07 \x02\x02\xF6\xFA\x03\x02' +
    '\x02\x02\xF7\xF8\x07\x1F\x02\x02\xF8\xFA\x07 \x02\x02\xF9\xEC\x03\x02' +
    "\x02\x02\xF9\xF7\x03\x02\x02\x02\xFA'\x03\x02\x02\x02\xFB\u0103\x075" +
    '\x02\x02\xFC\u0103\x076\x02\x02\xFD\u0103\x05"\x12\x02\xFE\u0103\x05' +
    '&\x14\x02\xFF\u0103\x07\x1A\x02\x02\u0100\u0103\x07\x1B\x02\x02\u0101' +
    '\u0103\x07\x1C\x02\x02\u0102\xFB\x03\x02\x02\x02\u0102\xFC\x03\x02\x02' +
    '\x02\u0102\xFD\x03\x02\x02\x02\u0102\xFE\x03\x02\x02\x02\u0102\xFF\x03' +
    '\x02\x02\x02\u0102\u0100\x03\x02\x02\x02\u0102\u0101\x03\x02\x02\x02\u0103' +
    ')\x03\x02\x02\x02#,:AENUXZ`eikpv\x84\x90\x97\x9E\xA0\xA3\xA7\xAB\xAD\xB1' +
    '\xC6\xCE\xD0\xD5\xDF\xE6\xF2\xF9\u0102';
  public static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!JSONPathParser.__ATN) {
      JSONPathParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(JSONPathParser._serializedATN));
    }

    return JSONPathParser.__ATN;
  }
}

export class JsonpathContext extends ParserRuleContext {
  public ROOT_VALUE(): TerminalNode {
    return this.getToken(JSONPathParser.ROOT_VALUE, 0);
  }
  public EOF(): TerminalNode {
    return this.getToken(JSONPathParser.EOF, 0);
  }
  public subscript(): SubscriptContext | undefined {
    return this.tryGetRuleContext(0, SubscriptContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_jsonpath;
  }
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

export class FunctionContext extends ParserRuleContext {
  public FN_MIN(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_MIN, 0);
  }
  public FN_MAX(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_MAX, 0);
  }
  public FN_AVG(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_AVG, 0);
  }
  public FN_STD(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_STD, 0);
  }
  public FN_LEN(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_LEN, 0);
  }
  public FN_SUM(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_SUM, 0);
  }
  public FN_KEY(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_KEY, 0);
  }
  public FN_CONC(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_CONC, 0);
  }
  public PAREN_RIGHT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0);
  }
  public value(): ValueContext | undefined {
    return this.tryGetRuleContext(0, ValueContext);
  }
  public filterpath(): FilterpathContext | undefined {
    return this.tryGetRuleContext(0, FilterpathContext);
  }
  public FN_APPE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FN_APPE, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_function;
  }
  // @Override
  public enterRule(listener: JSONPathListener): void {
    if (listener.enterFunction) {
      listener.enterFunction(this);
    }
  }
  // @Override
  public exitRule(listener: JSONPathListener): void {
    if (listener.exitFunction) {
      listener.exitFunction(this);
    }
  }
}

export class FilterargContext extends ParserRuleContext {
  public PAREN_LEFT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PAREN_LEFT, 0);
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
  public PAREN_RIGHT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STAR, 0);
  }
  public DIV(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.DIV, 0);
  }
  public PLUS(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PLUS, 0);
  }
  public MINUS_SP(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.MINUS_SP, 0);
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_filterarg;
  }
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
  public DOTDOT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.DOTDOT, 0);
  }
  public dotdotContent(): DotdotContentContext | undefined {
    return this.tryGetRuleContext(0, DotdotContentContext);
  }
  public subscript(): SubscriptContext | undefined {
    return this.tryGetRuleContext(0, SubscriptContext);
  }
  public DOT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.DOT, 0);
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_subscript;
  }
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
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.IDENTIFIER, 0);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STAR, 0);
  }
  public bracket(): BracketContext | undefined {
    return this.tryGetRuleContext(0, BracketContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_dotdotContent;
  }
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
  public function(): FunctionContext | undefined {
    return this.tryGetRuleContext(0, FunctionContext);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.IDENTIFIER, 0);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STAR, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NUMBER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_dotContent;
  }
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
  public BRACKET_LEFT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
  }
  public bracketContent(): BracketContentContext {
    return this.getRuleContext(0, BracketContentContext);
  }
  public BRACKET_RIGHT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_bracket;
  }
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
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NUMBER, 0);
  }
  public STRING(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STRING, 0);
  }
  public slices(): SlicesContext | undefined {
    return this.tryGetRuleContext(0, SlicesContext);
  }
  public STAR(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STAR, 0);
  }
  public filterExpression(): FilterExpressionContext | undefined {
    return this.tryGetRuleContext(0, FilterExpressionContext);
  }
  public IDENTIFIER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.IDENTIFIER, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_bracketContent;
  }
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
  public QUESTION(): TerminalNode {
    return this.getToken(JSONPathParser.QUESTION, 0);
  }
  public PAREN_LEFT(): TerminalNode {
    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
  }
  public expression(): ExpressionContext {
    return this.getRuleContext(0, ExpressionContext);
  }
  public PAREN_RIGHT(): TerminalNode {
    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_filterExpression;
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_indexes;
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_unions;
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_slices;
  }
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

export class RegexContext extends ParserRuleContext {
  public REGEX_EXPR(): TerminalNode {
    return this.getToken(JSONPathParser.REGEX_EXPR, 0);
  }
  public REGEX_OPT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.REGEX_OPT, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_regex;
  }
  // @Override
  public enterRule(listener: JSONPathListener): void {
    if (listener.enterRegex) {
      listener.enterRegex(this);
    }
  }
  // @Override
  public exitRule(listener: JSONPathListener): void {
    if (listener.exitRegex) {
      listener.exitRegex(this);
    }
  }
}

export class ExpressionContext extends ParserRuleContext {
  public NOT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NOT, 0);
  }
  public expression(): ExpressionContext[];
  public expression(i: number): ExpressionContext;
  public expression(i?: number): ExpressionContext | ExpressionContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ExpressionContext);
    } else {
      return this.getRuleContext(i, ExpressionContext);
    }
  }
  public PAREN_LEFT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PAREN_LEFT, 0);
  }
  public PAREN_RIGHT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.PAREN_RIGHT, 0);
  }
  public AND(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.AND, 0);
  }
  public OR(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.OR, 0);
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
  public EQ(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.EQ, 0);
  }
  public NE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NE, 0);
  }
  public LT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.LT, 0);
  }
  public LE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.LE, 0);
  }
  public GT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.GT, 0);
  }
  public GE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.GE, 0);
  }
  public IN(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.IN, 0);
  }
  public NIN(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NIN, 0);
  }
  public SUB(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.SUB, 0);
  }
  public ANY(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.ANY, 0);
  }
  public SIZO(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.SIZO, 0);
  }
  public NON(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NON, 0);
  }
  public SIZ(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.SIZ, 0);
  }
  public REG(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.REG, 0);
  }
  public regex(): RegexContext | undefined {
    return this.tryGetRuleContext(0, RegexContext);
  }
  public EMPT(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.EMPT, 0);
  }
  public filterpath(): FilterpathContext | undefined {
    return this.tryGetRuleContext(0, FilterpathContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_expression;
  }
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
  public ROOT_VALUE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.ROOT_VALUE, 0);
  }
  public CURRENT_VALUE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.CURRENT_VALUE, 0);
  }
  public subscript(): SubscriptContext | undefined {
    return this.tryGetRuleContext(0, SubscriptContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_filterpath;
  }
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_json;
  }
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
  public BRACE_LEFT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACE_LEFT, 0);
  }
  public pair(): PairContext[];
  public pair(i: number): PairContext;
  public pair(i?: number): PairContext | PairContext[] {
    if (i === undefined) {
      return this.getRuleContexts(PairContext);
    } else {
      return this.getRuleContext(i, PairContext);
    }
  }
  public BRACE_RIGHT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACE_RIGHT, 0);
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_obj;
  }
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
  public STRING(): TerminalNode {
    return this.getToken(JSONPathParser.STRING, 0);
  }
  public COLON(): TerminalNode {
    return this.getToken(JSONPathParser.COLON, 0);
  }
  public value(): ValueContext {
    return this.getRuleContext(0, ValueContext);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_pair;
  }
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
  public BRACKET_LEFT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
  }
  public value(): ValueContext[];
  public value(i: number): ValueContext;
  public value(i?: number): ValueContext | ValueContext[] {
    if (i === undefined) {
      return this.getRuleContexts(ValueContext);
    } else {
      return this.getRuleContext(i, ValueContext);
    }
  }
  public BRACKET_RIGHT(): TerminalNode {
    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
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
  public get ruleIndex(): number {
    return JSONPathParser.RULE_array;
  }
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
  public STRING(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.STRING, 0);
  }
  public NUMBER(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NUMBER, 0);
  }
  public obj(): ObjContext | undefined {
    return this.tryGetRuleContext(0, ObjContext);
  }
  public array(): ArrayContext | undefined {
    return this.tryGetRuleContext(0, ArrayContext);
  }
  public TRUE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.TRUE, 0);
  }
  public FALSE(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.FALSE, 0);
  }
  public NULL(): TerminalNode | undefined {
    return this.tryGetToken(JSONPathParser.NULL, 0);
  }
  constructor(parent: ParserRuleContext | undefined, invokingState: number) {
    super(parent, invokingState);
  }
  // @Override
  public get ruleIndex(): number {
    return JSONPathParser.RULE_value;
  }
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
