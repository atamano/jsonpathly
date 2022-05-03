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
  public static readonly IDENTIFIER = 41;
  public static readonly STRING = 42;
  public static readonly NUMBER = 43;
  public static readonly WS = 44;
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
  public static readonly RULE_regex = 11;
  public static readonly RULE_expression = 12;
  public static readonly RULE_filterpath = 13;
  public static readonly RULE_json = 14;
  public static readonly RULE_obj = 15;
  public static readonly RULE_pair = 16;
  public static readonly RULE_array = 17;
  public static readonly RULE_value = 18;
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'jsonpath',
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
        this.state = 38;
        this.match(JSONPathParser.ROOT_VALUE);
        this.state = 40;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (
          (_la & ~0x1f) === 0 &&
          ((1 << _la) &
            ((1 << JSONPathParser.DOTDOT) | (1 << JSONPathParser.DOT) | (1 << JSONPathParser.BRACKET_LEFT))) !==
            0
        ) {
          {
            this.state = 39;
            this.subscript();
          }
        }

        this.state = 42;
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
        this.state = 51;
        this._errHandler.sync(this);
        switch (this._input.LA(1)) {
          case JSONPathParser.PAREN_LEFT:
            {
              this.state = 45;
              this.match(JSONPathParser.PAREN_LEFT);
              this.state = 46;
              this.filterarg(0);
              this.state = 47;
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
              this.state = 49;
              this.value();
            }
            break;
          case JSONPathParser.CURRENT_VALUE:
          case JSONPathParser.ROOT_VALUE:
            {
              this.state = 50;
              this.filterpath();
            }
            break;
          default:
            throw new NoViableAltException(this);
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 63;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 61;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 3, this._ctx)) {
                case 1:
                  {
                    _localctx = new FilterargContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
                    this.state = 53;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 4)');
                    }
                    this.state = 54;
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
                    this.state = 55;
                    this.filterarg(5);
                  }
                  break;

                case 2:
                  {
                    _localctx = new FilterargContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_filterarg);
                    this.state = 56;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 3)');
                    }
                    this.state = 58;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                    if (_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS) {
                      {
                        this.state = 57;
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

                    this.state = 60;
                    this.filterarg(4);
                  }
                  break;
              }
            }
          }
          this.state = 65;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 4, this._ctx);
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
    this.enterRule(_localctx, 4, JSONPathParser.RULE_subscript);
    try {
      this.state = 80;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.DOTDOT:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 66;
            this.match(JSONPathParser.DOTDOT);
            this.state = 67;
            this.dotdotContent();
            this.state = 69;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 5, this._ctx)) {
              case 1:
                {
                  this.state = 68;
                  this.subscript();
                }
                break;
            }
          }
          break;
        case JSONPathParser.DOT:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 71;
            this.match(JSONPathParser.DOT);
            this.state = 72;
            this.dotContent();
            this.state = 74;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 6, this._ctx)) {
              case 1:
                {
                  this.state = 73;
                  this.subscript();
                }
                break;
            }
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 76;
            this.bracket();
            this.state = 78;
            this._errHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this._input, 7, this._ctx)) {
              case 1:
                {
                  this.state = 77;
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
    this.enterRule(_localctx, 6, JSONPathParser.RULE_dotdotContent);
    try {
      this.state = 85;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 82;
            this.match(JSONPathParser.IDENTIFIER);
          }
          break;
        case JSONPathParser.STAR:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 83;
            this.match(JSONPathParser.STAR);
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 84;
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
    this.enterRule(_localctx, 8, JSONPathParser.RULE_dotContent);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 87;
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
    this.enterRule(_localctx, 10, JSONPathParser.RULE_bracket);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 89;
        this.match(JSONPathParser.BRACKET_LEFT);
        this.state = 90;
        this.bracketContent();
        this.state = 91;
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
    this.enterRule(_localctx, 12, JSONPathParser.RULE_bracketContent);
    try {
      this.state = 101;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 10, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 93;
            this.unions();
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 94;
            this.indexes();
          }
          break;

        case 3:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 95;
            this.match(JSONPathParser.NUMBER);
          }
          break;

        case 4:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 96;
            this.match(JSONPathParser.STRING);
          }
          break;

        case 5:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 97;
            this.slices();
          }
          break;

        case 6:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 98;
            this.match(JSONPathParser.STAR);
          }
          break;

        case 7:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 99;
            this.filterExpression();
          }
          break;

        case 8:
          this.enterOuterAlt(_localctx, 8);
          {
            this.state = 100;
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
    this.enterRule(_localctx, 14, JSONPathParser.RULE_filterExpression);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 103;
        this.match(JSONPathParser.QUESTION);
        this.state = 104;
        this.match(JSONPathParser.PAREN_LEFT);
        this.state = 105;
        this.expression(0);
        this.state = 106;
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
    this.enterRule(_localctx, 16, JSONPathParser.RULE_indexes);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 108;
        this.match(JSONPathParser.NUMBER);
        this.state = 111;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        do {
          {
            {
              this.state = 109;
              this.match(JSONPathParser.COMMA);
              this.state = 110;
              this.match(JSONPathParser.NUMBER);
            }
          }
          this.state = 113;
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
    this.enterRule(_localctx, 18, JSONPathParser.RULE_unions);
    let _la: number;
    try {
      this.state = 129;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 115;
            this.match(JSONPathParser.STRING);
            this.state = 118;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 116;
                  this.match(JSONPathParser.COMMA);
                  this.state = 117;
                  this.match(JSONPathParser.STRING);
                }
              }
              this.state = 120;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            } while (_la === JSONPathParser.COMMA);
          }
          break;
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 122;
            this.match(JSONPathParser.IDENTIFIER);
            this.state = 125;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
              {
                {
                  this.state = 123;
                  this.match(JSONPathParser.COMMA);
                  this.state = 124;
                  this.match(JSONPathParser.IDENTIFIER);
                }
              }
              this.state = 127;
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
    this.enterRule(_localctx, 20, JSONPathParser.RULE_slices);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 132;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.NUMBER) {
          {
            this.state = 131;
            this.match(JSONPathParser.NUMBER);
          }
        }

        this.state = 134;
        this.match(JSONPathParser.COLON);
        this.state = 136;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.NUMBER) {
          {
            this.state = 135;
            this.match(JSONPathParser.NUMBER);
          }
        }

        this.state = 142;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.COLON) {
          {
            this.state = 138;
            this.match(JSONPathParser.COLON);
            this.state = 140;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === JSONPathParser.NUMBER) {
              {
                this.state = 139;
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
    this.enterRule(_localctx, 22, JSONPathParser.RULE_regex);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 144;
        this.match(JSONPathParser.REGEX_EXPR);
        this.state = 146;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 19, this._ctx)) {
          case 1:
            {
              this.state = 145;
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
    let _startState: number = 24;
    this.enterRecursionRule(_localctx, 24, JSONPathParser.RULE_expression, _p);
    let _la: number;
    try {
      let _alt: number;
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 167;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 20, this._ctx)) {
          case 1:
            {
              this.state = 149;
              this.match(JSONPathParser.NOT);
              this.state = 150;
              this.expression(8);
            }
            break;

          case 2:
            {
              this.state = 151;
              this.match(JSONPathParser.PAREN_LEFT);
              this.state = 152;
              this.expression(0);
              this.state = 153;
              this.match(JSONPathParser.PAREN_RIGHT);
            }
            break;

          case 3:
            {
              this.state = 155;
              this.filterarg(0);
              this.state = 156;
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
              this.state = 157;
              this.filterarg(0);
            }
            break;

          case 4:
            {
              this.state = 159;
              this.filterarg(0);
              this.state = 160;
              this.match(JSONPathParser.REG);
              this.state = 161;
              this.regex();
            }
            break;

          case 5:
            {
              this.state = 163;
              this.filterarg(0);
              this.state = 164;
              this.match(JSONPathParser.EMPT);
            }
            break;

          case 6:
            {
              this.state = 166;
              this.filterpath();
            }
            break;
        }
        this._ctx._stop = this._input.tryLT(-1);
        this.state = 177;
        this._errHandler.sync(this);
        _alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = _localctx;
            {
              this.state = 175;
              this._errHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this._input, 21, this._ctx)) {
                case 1:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
                    this.state = 169;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 6)');
                    }
                    this.state = 170;
                    this.match(JSONPathParser.AND);
                    this.state = 171;
                    this.expression(7);
                  }
                  break;

                case 2:
                  {
                    _localctx = new ExpressionContext(_parentctx, _parentState);
                    this.pushNewRecursionContext(_localctx, _startState, JSONPathParser.RULE_expression);
                    this.state = 172;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException('this.precpred(this._ctx, 5)');
                    }
                    this.state = 173;
                    this.match(JSONPathParser.OR);
                    this.state = 174;
                    this.expression(6);
                  }
                  break;
              }
            }
          }
          this.state = 179;
          this._errHandler.sync(this);
          _alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
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
    this.enterRule(_localctx, 26, JSONPathParser.RULE_filterpath);
    let _la: number;
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 180;
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
        this.state = 182;
        this._errHandler.sync(this);
        switch (this.interpreter.adaptivePredict(this._input, 23, this._ctx)) {
          case 1:
            {
              this.state = 181;
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
    this.enterRule(_localctx, 28, JSONPathParser.RULE_json);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 184;
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
    this.enterRule(_localctx, 30, JSONPathParser.RULE_obj);
    let _la: number;
    try {
      this.state = 199;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 25, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 186;
            this.match(JSONPathParser.BRACE_LEFT);
            this.state = 187;
            this.pair();
            this.state = 192;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === JSONPathParser.COMMA) {
              {
                {
                  this.state = 188;
                  this.match(JSONPathParser.COMMA);
                  this.state = 189;
                  this.pair();
                }
              }
              this.state = 194;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 195;
            this.match(JSONPathParser.BRACE_RIGHT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 197;
            this.match(JSONPathParser.BRACE_LEFT);
            this.state = 198;
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
    this.enterRule(_localctx, 32, JSONPathParser.RULE_pair);
    try {
      this.enterOuterAlt(_localctx, 1);
      {
        this.state = 201;
        this.match(JSONPathParser.STRING);
        this.state = 202;
        this.match(JSONPathParser.COLON);
        this.state = 203;
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
    this.enterRule(_localctx, 34, JSONPathParser.RULE_array);
    let _la: number;
    try {
      this.state = 218;
      this._errHandler.sync(this);
      switch (this.interpreter.adaptivePredict(this._input, 27, this._ctx)) {
        case 1:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 205;
            this.match(JSONPathParser.BRACKET_LEFT);
            this.state = 206;
            this.value();
            this.state = 211;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while (_la === JSONPathParser.COMMA) {
              {
                {
                  this.state = 207;
                  this.match(JSONPathParser.COMMA);
                  this.state = 208;
                  this.value();
                }
              }
              this.state = 213;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
            }
            this.state = 214;
            this.match(JSONPathParser.BRACKET_RIGHT);
          }
          break;

        case 2:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 216;
            this.match(JSONPathParser.BRACKET_LEFT);
            this.state = 217;
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
    this.enterRule(_localctx, 36, JSONPathParser.RULE_value);
    try {
      this.state = 227;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(_localctx, 1);
          {
            this.state = 220;
            this.match(JSONPathParser.STRING);
          }
          break;
        case JSONPathParser.NUMBER:
          this.enterOuterAlt(_localctx, 2);
          {
            this.state = 221;
            this.match(JSONPathParser.NUMBER);
          }
          break;
        case JSONPathParser.BRACE_LEFT:
          this.enterOuterAlt(_localctx, 3);
          {
            this.state = 222;
            this.obj();
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(_localctx, 4);
          {
            this.state = 223;
            this.array();
          }
          break;
        case JSONPathParser.TRUE:
          this.enterOuterAlt(_localctx, 5);
          {
            this.state = 224;
            this.match(JSONPathParser.TRUE);
          }
          break;
        case JSONPathParser.FALSE:
          this.enterOuterAlt(_localctx, 6);
          {
            this.state = 225;
            this.match(JSONPathParser.FALSE);
          }
          break;
        case JSONPathParser.NULL:
          this.enterOuterAlt(_localctx, 7);
          {
            this.state = 226;
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
      case 1:
        return this.filterarg_sempred(_localctx as FilterargContext, predIndex);

      case 12:
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
    '\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03.\xE8\x04\x02' +
    '\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07' +
    '\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04' +
    '\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04' +
    '\x13\t\x13\x04\x14\t\x14\x03\x02\x03\x02\x05\x02+\n\x02\x03\x02\x03\x02' +
    '\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x036\n\x03' +
    '\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03=\n\x03\x03\x03\x07\x03' +
    '@\n\x03\f\x03\x0E\x03C\v\x03\x03\x04\x03\x04\x03\x04\x05\x04H\n\x04\x03' +
    '\x04\x03\x04\x03\x04\x05\x04M\n\x04\x03\x04\x03\x04\x05\x04Q\n\x04\x05' +
    '\x04S\n\x04\x03\x05\x03\x05\x03\x05\x05\x05X\n\x05\x03\x06\x03\x06\x03' +
    '\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b' +
    '\x03\b\x05\bh\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x06' +
    '\nr\n\n\r\n\x0E\ns\x03\v\x03\v\x03\v\x06\vy\n\v\r\v\x0E\vz\x03\v\x03\v' +
    '\x03\v\x06\v\x80\n\v\r\v\x0E\v\x81\x05\v\x84\n\v\x03\f\x05\f\x87\n\f\x03' +
    '\f\x03\f\x05\f\x8B\n\f\x03\f\x03\f\x05\f\x8F\n\f\x05\f\x91\n\f\x03\r\x03' +
    '\r\x05\r\x95\n\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E' +
    '\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x03\x0E' +
    '\x03\x0E\x03\x0E\x03\x0E\x05\x0E\xAA\n\x0E\x03\x0E\x03\x0E\x03\x0E\x03' +
    '\x0E\x03\x0E\x03\x0E\x07\x0E\xB2\n\x0E\f\x0E\x0E\x0E\xB5\v\x0E\x03\x0F' +
    '\x03\x0F\x05\x0F\xB9\n\x0F\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03' +
    '\x11\x07\x11\xC1\n\x11\f\x11\x0E\x11\xC4\v\x11\x03\x11\x03\x11\x03\x11' +
    '\x03\x11\x05\x11\xCA\n\x11\x03\x12\x03\x12\x03\x12\x03\x12\x03\x13\x03' +
    '\x13\x03\x13\x03\x13\x07\x13\xD4\n\x13\f\x13\x0E\x13\xD7\v\x13\x03\x13' +
    '\x03\x13\x03\x13\x03\x13\x05\x13\xDD\n\x13\x03\x14\x03\x14\x03\x14\x03' +
    '\x14\x03\x14\x03\x14\x03\x14\x05\x14\xE6\n\x14\x03\x14\x02\x02\x04\x04' +
    '\x1A\x15\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12' +
    '\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02"\x02$\x02&' +
    "\x02\x02\x07\x04\x02\x07\x07((\x03\x02&'\x05\x02\x07\x07++--\x04\x02" +
    '\t\x0E\x10\x16\x04\x02\x03\x03\x05\x05\x02\u0103\x02(\x03\x02\x02\x02' +
    '\x045\x03\x02\x02\x02\x06R\x03\x02\x02\x02\bW\x03\x02\x02\x02\nY\x03\x02' +
    '\x02\x02\f[\x03\x02\x02\x02\x0Eg\x03\x02\x02\x02\x10i\x03\x02\x02\x02' +
    '\x12n\x03\x02\x02\x02\x14\x83\x03\x02\x02\x02\x16\x86\x03\x02\x02\x02' +
    '\x18\x92\x03\x02\x02\x02\x1A\xA9\x03\x02\x02\x02\x1C\xB6\x03\x02\x02\x02' +
    '\x1E\xBA\x03\x02\x02\x02 \xC9\x03\x02\x02\x02"\xCB\x03\x02\x02\x02$\xDC' +
    '\x03\x02\x02\x02&\xE5\x03\x02\x02\x02(*\x07\x05\x02\x02)+\x05\x06\x04' +
    '\x02*)\x03\x02\x02\x02*+\x03\x02\x02\x02+,\x03\x02\x02\x02,-\x07\x02\x02' +
    '\x03-\x03\x03\x02\x02\x02./\b\x03\x01\x02/0\x07#\x02\x0201\x05\x04\x03' +
    '\x0212\x07$\x02\x0226\x03\x02\x02\x0236\x05&\x14\x0246\x05\x1C\x0F\x02' +
    '5.\x03\x02\x02\x0253\x03\x02\x02\x0254\x03\x02\x02\x026A\x03\x02\x02\x02' +
    '78\f\x06\x02\x0289\t\x02\x02\x029@\x05\x04\x03\x07:<\f\x05\x02\x02;=\t' +
    '\x03\x02\x02<;\x03\x02\x02\x02<=\x03\x02\x02\x02=>\x03\x02\x02\x02>@\x05' +
    '\x04\x03\x06?7\x03\x02\x02\x02?:\x03\x02\x02\x02@C\x03\x02\x02\x02A?\x03' +
    '\x02\x02\x02AB\x03\x02\x02\x02B\x05\x03\x02\x02\x02CA\x03\x02\x02\x02' +
    'DE\x07\x04\x02\x02EG\x05\b\x05\x02FH\x05\x06\x04\x02GF\x03\x02\x02\x02' +
    'GH\x03\x02\x02\x02HS\x03\x02\x02\x02IJ\x07\x06\x02\x02JL\x05\n\x06\x02' +
    'KM\x05\x06\x04\x02LK\x03\x02\x02\x02LM\x03\x02\x02\x02MS\x03\x02\x02\x02' +
    'NP\x05\f\x07\x02OQ\x05\x06\x04\x02PO\x03\x02\x02\x02PQ\x03\x02\x02\x02' +
    'QS\x03\x02\x02\x02RD\x03\x02\x02\x02RI\x03\x02\x02\x02RN\x03\x02\x02\x02' +
    'S\x07\x03\x02\x02\x02TX\x07+\x02\x02UX\x07\x07\x02\x02VX\x05\f\x07\x02' +
    'WT\x03\x02\x02\x02WU\x03\x02\x02\x02WV\x03\x02\x02\x02X\t\x03\x02\x02' +
    '\x02YZ\t\x04\x02\x02Z\v\x03\x02\x02\x02[\\\x07\x1F\x02\x02\\]\x05\x0E' +
    '\b\x02]^\x07 \x02\x02^\r\x03\x02\x02\x02_h\x05\x14\v\x02`h\x05\x12\n\x02' +
    'ah\x07-\x02\x02bh\x07,\x02\x02ch\x05\x16\f\x02dh\x07\x07\x02\x02eh\x05' +
    '\x10\t\x02fh\x07+\x02\x02g_\x03\x02\x02\x02g`\x03\x02\x02\x02ga\x03\x02' +
    '\x02\x02gb\x03\x02\x02\x02gc\x03\x02\x02\x02gd\x03\x02\x02\x02ge\x03\x02' +
    '\x02\x02gf\x03\x02\x02\x02h\x0F\x03\x02\x02\x02ij\x07%\x02\x02jk\x07#' +
    '\x02\x02kl\x05\x1A\x0E\x02lm\x07$\x02\x02m\x11\x03\x02\x02\x02nq\x07-' +
    '\x02\x02op\x07"\x02\x02pr\x07-\x02\x02qo\x03\x02\x02\x02rs\x03\x02\x02' +
    '\x02sq\x03\x02\x02\x02st\x03\x02\x02\x02t\x13\x03\x02\x02\x02ux\x07,\x02' +
    '\x02vw\x07"\x02\x02wy\x07,\x02\x02xv\x03\x02\x02\x02yz\x03\x02\x02\x02' +
    'zx\x03\x02\x02\x02z{\x03\x02\x02\x02{\x84\x03\x02\x02\x02|\x7F\x07+\x02' +
    '\x02}~\x07"\x02\x02~\x80\x07+\x02\x02\x7F}\x03\x02\x02\x02\x80\x81\x03' +
    '\x02\x02\x02\x81\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x84\x03' +
    '\x02\x02\x02\x83u\x03\x02\x02\x02\x83|\x03\x02\x02\x02\x84\x15\x03\x02' +
    '\x02\x02\x85\x87\x07-\x02\x02\x86\x85\x03\x02\x02\x02\x86\x87\x03\x02' +
    '\x02\x02\x87\x88\x03\x02\x02\x02\x88\x8A\x07!\x02\x02\x89\x8B\x07-\x02' +
    '\x02\x8A\x89\x03\x02\x02\x02\x8A\x8B\x03\x02\x02\x02\x8B\x90\x03\x02\x02' +
    '\x02\x8C\x8E\x07!\x02\x02\x8D\x8F\x07-\x02\x02\x8E\x8D\x03\x02\x02\x02' +
    '\x8E\x8F\x03\x02\x02\x02\x8F\x91\x03\x02\x02\x02\x90\x8C\x03\x02\x02\x02' +
    '\x90\x91\x03\x02\x02\x02\x91\x17\x03\x02\x02\x02\x92\x94\x07*\x02\x02' +
    '\x93\x95\x07)\x02\x02\x94\x93\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02' +
    '\x95\x19\x03\x02\x02\x02\x96\x97\b\x0E\x01\x02\x97\x98\x07\x18\x02\x02' +
    '\x98\xAA\x05\x1A\x0E\n\x99\x9A\x07#\x02\x02\x9A\x9B\x05\x1A\x0E\x02\x9B' +
    '\x9C\x07$\x02\x02\x9C\xAA\x03\x02\x02\x02\x9D\x9E\x05\x04\x03\x02\x9E' +
    '\x9F\t\x05\x02\x02\x9F\xA0\x05\x04\x03\x02\xA0\xAA\x03\x02\x02\x02\xA1' +
    '\xA2\x05\x04\x03\x02\xA2\xA3\x07\x0F\x02\x02\xA3\xA4\x05\x18\r\x02\xA4' +
    '\xAA\x03\x02\x02\x02\xA5\xA6\x05\x04\x03\x02\xA6\xA7\x07\x17\x02\x02\xA7' +
    '\xAA\x03\x02\x02\x02\xA8\xAA\x05\x1C\x0F\x02\xA9\x96\x03\x02\x02\x02\xA9' +
    '\x99\x03\x02\x02\x02\xA9\x9D\x03\x02\x02\x02\xA9\xA1\x03\x02\x02\x02\xA9' +
    '\xA5\x03\x02\x02\x02\xA9\xA8\x03\x02\x02\x02\xAA\xB3\x03\x02\x02\x02\xAB' +
    '\xAC\f\b\x02\x02\xAC\xAD\x07\b\x02\x02\xAD\xB2\x05\x1A\x0E\t\xAE\xAF\f' +
    '\x07\x02\x02\xAF\xB0\x07\x19\x02\x02\xB0\xB2\x05\x1A\x0E\b\xB1\xAB\x03' +
    '\x02\x02\x02\xB1\xAE\x03\x02\x02\x02\xB2\xB5\x03\x02\x02\x02\xB3\xB1\x03' +
    '\x02\x02\x02\xB3\xB4\x03\x02\x02\x02\xB4\x1B\x03\x02\x02\x02\xB5\xB3\x03' +
    '\x02\x02\x02\xB6\xB8\t\x06\x02\x02\xB7\xB9\x05\x06\x04\x02\xB8\xB7\x03' +
    '\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\x1D\x03\x02\x02\x02\xBA\xBB\x05' +
    '&\x14\x02\xBB\x1F\x03\x02\x02\x02\xBC\xBD\x07\x1D\x02\x02\xBD\xC2\x05' +
    '"\x12\x02\xBE\xBF\x07"\x02\x02\xBF\xC1\x05"\x12\x02\xC0\xBE\x03\x02' +
    '\x02\x02\xC1\xC4\x03\x02\x02\x02\xC2\xC0\x03\x02\x02\x02\xC2\xC3\x03\x02' +
    '\x02\x02\xC3\xC5\x03\x02\x02\x02\xC4\xC2\x03\x02\x02\x02\xC5\xC6\x07\x1E' +
    '\x02\x02\xC6\xCA\x03\x02\x02\x02\xC7\xC8\x07\x1D\x02\x02\xC8\xCA\x07\x1E' +
    '\x02\x02\xC9\xBC\x03\x02\x02\x02\xC9\xC7\x03\x02\x02\x02\xCA!\x03\x02' +
    '\x02\x02\xCB\xCC\x07,\x02\x02\xCC\xCD\x07!\x02\x02\xCD\xCE\x05&\x14\x02' +
    '\xCE#\x03\x02\x02\x02\xCF\xD0\x07\x1F\x02\x02\xD0\xD5\x05&\x14\x02\xD1' +
    '\xD2\x07"\x02\x02\xD2\xD4\x05&\x14\x02\xD3\xD1\x03\x02\x02\x02\xD4\xD7' +
    '\x03\x02\x02\x02\xD5\xD3\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD8' +
    '\x03\x02\x02\x02\xD7\xD5\x03\x02\x02\x02\xD8\xD9\x07 \x02\x02\xD9\xDD' +
    '\x03\x02\x02\x02\xDA\xDB\x07\x1F\x02\x02\xDB\xDD\x07 \x02\x02\xDC\xCF' +
    '\x03\x02\x02\x02\xDC\xDA\x03\x02\x02\x02\xDD%\x03\x02\x02\x02\xDE\xE6' +
    '\x07,\x02\x02\xDF\xE6\x07-\x02\x02\xE0\xE6\x05 \x11\x02\xE1\xE6\x05$\x13' +
    '\x02\xE2\xE6\x07\x1A\x02\x02\xE3\xE6\x07\x1B\x02\x02\xE4\xE6\x07\x1C\x02' +
    '\x02\xE5\xDE\x03\x02\x02\x02\xE5\xDF\x03\x02\x02\x02\xE5\xE0\x03\x02\x02' +
    '\x02\xE5\xE1\x03\x02\x02\x02\xE5\xE2\x03\x02\x02\x02\xE5\xE3\x03\x02\x02' +
    "\x02\xE5\xE4\x03\x02\x02\x02\xE6'\x03\x02\x02\x02\x1F*5<?AGLPRWgsz\x81" +
    '\x83\x86\x8A\x8E\x90\x94\xA9\xB1\xB3\xB8\xC2\xC9\xD5\xDC\xE5';
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
