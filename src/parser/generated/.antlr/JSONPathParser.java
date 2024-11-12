// Generated from /Users/colin.mckibben/Documents/github/jsonpathly/src/parser/generated/JSONPath.g4 by ANTLR 4.13.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class JSONPathParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		CURRENT_VALUE=1, DOTDOT=2, ROOT_VALUE=3, DOT=4, STAR=5, AND=6, EQ=7, GE=8, 
		GT=9, LE=10, LT=11, NE=12, REG=13, IN=14, NIN=15, SUB=16, ANY=17, NON=18, 
		SIZO=19, SIZ=20, EMPT=21, NOT=22, OR=23, TRUE=24, FALSE=25, NULL=26, BRACE_LEFT=27, 
		BRACE_RIGHT=28, BRACKET_LEFT=29, BRACKET_RIGHT=30, COLON=31, COMMA=32, 
		PAREN_LEFT=33, PAREN_RIGHT=34, QUESTION=35, MINUS_SP=36, PLUS=37, DIV=38, 
		FN_LEN=39, REGEX_OPT=40, REGEX_EXPR=41, KEY=42, SPECIAL_KEY=43, WS=44, 
		NUMBER=45, STRING=46;
	public static final int
		RULE_jsonpath = 0, RULE_function = 1, RULE_filterarg = 2, RULE_subscript = 3, 
		RULE_dotdotContent = 4, RULE_dotContent = 5, RULE_bracket = 6, RULE_bracketContent = 7, 
		RULE_filterExpression = 8, RULE_indexes = 9, RULE_unions = 10, RULE_slices = 11, 
		RULE_regex = 12, RULE_expression = 13, RULE_filterpath = 14, RULE_identifier = 15, 
		RULE_obj = 16, RULE_pair = 17, RULE_array = 18, RULE_value = 19;
	private static String[] makeRuleNames() {
		return new String[] {
			"jsonpath", "function", "filterarg", "subscript", "dotdotContent", "dotContent", 
			"bracket", "bracketContent", "filterExpression", "indexes", "unions", 
			"slices", "regex", "expression", "filterpath", "identifier", "obj", "pair", 
			"array", "value"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'@'", "'..'", "'$'", "'.'", "'*'", "'&&'", "'=='", "'>='", "'>'", 
			"'<='", "'<'", "'!='", "'=~'", "' in '", "' nin '", "' subsetof '", "' anyof '", 
			"' noneof '", "' sizeof '", "' size '", "' empty'", "'!'", "'||'", "'true'", 
			"'false'", "'null'", "'{'", "'}'", "'['", "']'", "':'", "','", "'('", 
			"')'", "'?'", "'- '", "'+'", "'/'", "'length()'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", "DOT", "STAR", "AND", 
			"EQ", "GE", "GT", "LE", "LT", "NE", "REG", "IN", "NIN", "SUB", "ANY", 
			"NON", "SIZO", "SIZ", "EMPT", "NOT", "OR", "TRUE", "FALSE", "NULL", "BRACE_LEFT", 
			"BRACE_RIGHT", "BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", "PAREN_LEFT", 
			"PAREN_RIGHT", "QUESTION", "MINUS_SP", "PLUS", "DIV", "FN_LEN", "REGEX_OPT", 
			"REGEX_EXPR", "KEY", "SPECIAL_KEY", "WS", "NUMBER", "STRING"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "JSONPath.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public JSONPathParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class JsonpathContext extends ParserRuleContext {
		public TerminalNode ROOT_VALUE() { return getToken(JSONPathParser.ROOT_VALUE, 0); }
		public TerminalNode EOF() { return getToken(JSONPathParser.EOF, 0); }
		public SubscriptContext subscript() {
			return getRuleContext(SubscriptContext.class,0);
		}
		public JsonpathContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_jsonpath; }
	}

	public final JsonpathContext jsonpath() throws RecognitionException {
		JsonpathContext _localctx = new JsonpathContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_jsonpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(40);
			match(ROOT_VALUE);
			setState(42);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 536870932L) != 0)) {
				{
				setState(41);
				subscript();
				}
			}

			setState(44);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FunctionContext extends ParserRuleContext {
		public TerminalNode FN_LEN() { return getToken(JSONPathParser.FN_LEN, 0); }
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_function);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(46);
			match(FN_LEN);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FilterargContext extends ParserRuleContext {
		public TerminalNode PAREN_LEFT() { return getToken(JSONPathParser.PAREN_LEFT, 0); }
		public List<FilterargContext> filterarg() {
			return getRuleContexts(FilterargContext.class);
		}
		public FilterargContext filterarg(int i) {
			return getRuleContext(FilterargContext.class,i);
		}
		public TerminalNode PAREN_RIGHT() { return getToken(JSONPathParser.PAREN_RIGHT, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public FilterpathContext filterpath() {
			return getRuleContext(FilterpathContext.class,0);
		}
		public TerminalNode STAR() { return getToken(JSONPathParser.STAR, 0); }
		public TerminalNode DIV() { return getToken(JSONPathParser.DIV, 0); }
		public TerminalNode PLUS() { return getToken(JSONPathParser.PLUS, 0); }
		public TerminalNode MINUS_SP() { return getToken(JSONPathParser.MINUS_SP, 0); }
		public FilterargContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_filterarg; }
	}

	public final FilterargContext filterarg() throws RecognitionException {
		return filterarg(0);
	}

	private FilterargContext filterarg(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		FilterargContext _localctx = new FilterargContext(_ctx, _parentState);
		FilterargContext _prevctx = _localctx;
		int _startState = 4;
		enterRecursionRule(_localctx, 4, RULE_filterarg, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(55);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case PAREN_LEFT:
				{
				setState(49);
				match(PAREN_LEFT);
				setState(50);
				filterarg(0);
				setState(51);
				match(PAREN_RIGHT);
				}
				break;
			case TRUE:
			case FALSE:
			case NULL:
			case BRACE_LEFT:
			case BRACKET_LEFT:
			case NUMBER:
			case STRING:
				{
				setState(53);
				value();
				}
				break;
			case CURRENT_VALUE:
			case ROOT_VALUE:
				{
				setState(54);
				filterpath();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(67);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(65);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
					case 1:
						{
						_localctx = new FilterargContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_filterarg);
						setState(57);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(58);
						_la = _input.LA(1);
						if ( !(_la==STAR || _la==DIV) ) {
						_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(59);
						filterarg(5);
						}
						break;
					case 2:
						{
						_localctx = new FilterargContext(_parentctx, _parentState);
						pushNewRecursionContext(_localctx, _startState, RULE_filterarg);
						setState(60);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(62);
						_errHandler.sync(this);
						_la = _input.LA(1);
						if (_la==MINUS_SP || _la==PLUS) {
							{
							setState(61);
							_la = _input.LA(1);
							if ( !(_la==MINUS_SP || _la==PLUS) ) {
							_errHandler.recoverInline(this);
							}
							else {
								if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
								_errHandler.reportMatch(this);
								consume();
							}
							}
						}

						setState(64);
						filterarg(4);
						}
						break;
					}
					} 
				}
				setState(69);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SubscriptContext extends ParserRuleContext {
		public TerminalNode DOTDOT() { return getToken(JSONPathParser.DOTDOT, 0); }
		public DotdotContentContext dotdotContent() {
			return getRuleContext(DotdotContentContext.class,0);
		}
		public SubscriptContext subscript() {
			return getRuleContext(SubscriptContext.class,0);
		}
		public TerminalNode DOT() { return getToken(JSONPathParser.DOT, 0); }
		public DotContentContext dotContent() {
			return getRuleContext(DotContentContext.class,0);
		}
		public BracketContext bracket() {
			return getRuleContext(BracketContext.class,0);
		}
		public SubscriptContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_subscript; }
	}

	public final SubscriptContext subscript() throws RecognitionException {
		SubscriptContext _localctx = new SubscriptContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_subscript);
		try {
			setState(84);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DOTDOT:
				enterOuterAlt(_localctx, 1);
				{
				setState(70);
				match(DOTDOT);
				setState(71);
				dotdotContent();
				setState(73);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,5,_ctx) ) {
				case 1:
					{
					setState(72);
					subscript();
					}
					break;
				}
				}
				break;
			case DOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(75);
				match(DOT);
				setState(76);
				dotContent();
				setState(78);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,6,_ctx) ) {
				case 1:
					{
					setState(77);
					subscript();
					}
					break;
				}
				}
				break;
			case BRACKET_LEFT:
				enterOuterAlt(_localctx, 3);
				{
				setState(80);
				bracket();
				setState(82);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
				case 1:
					{
					setState(81);
					subscript();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DotdotContentContext extends ParserRuleContext {
		public TerminalNode STAR() { return getToken(JSONPathParser.STAR, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public BracketContext bracket() {
			return getRuleContext(BracketContext.class,0);
		}
		public DotdotContentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dotdotContent; }
	}

	public final DotdotContentContext dotdotContent() throws RecognitionException {
		DotdotContentContext _localctx = new DotdotContentContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_dotdotContent);
		try {
			setState(89);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STAR:
				enterOuterAlt(_localctx, 1);
				{
				setState(86);
				match(STAR);
				}
				break;
			case TRUE:
			case FALSE:
			case NULL:
			case KEY:
			case SPECIAL_KEY:
				enterOuterAlt(_localctx, 2);
				{
				setState(87);
				identifier();
				}
				break;
			case BRACKET_LEFT:
				enterOuterAlt(_localctx, 3);
				{
				setState(88);
				bracket();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DotContentContext extends ParserRuleContext {
		public FunctionContext function() {
			return getRuleContext(FunctionContext.class,0);
		}
		public TerminalNode STAR() { return getToken(JSONPathParser.STAR, 0); }
		public TerminalNode NUMBER() { return getToken(JSONPathParser.NUMBER, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public DotContentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_dotContent; }
	}

	public final DotContentContext dotContent() throws RecognitionException {
		DotContentContext _localctx = new DotContentContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_dotContent);
		try {
			setState(95);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case FN_LEN:
				enterOuterAlt(_localctx, 1);
				{
				setState(91);
				function();
				}
				break;
			case STAR:
				enterOuterAlt(_localctx, 2);
				{
				setState(92);
				match(STAR);
				}
				break;
			case NUMBER:
				enterOuterAlt(_localctx, 3);
				{
				setState(93);
				match(NUMBER);
				}
				break;
			case TRUE:
			case FALSE:
			case NULL:
			case KEY:
			case SPECIAL_KEY:
				enterOuterAlt(_localctx, 4);
				{
				setState(94);
				identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BracketContext extends ParserRuleContext {
		public TerminalNode BRACKET_LEFT() { return getToken(JSONPathParser.BRACKET_LEFT, 0); }
		public BracketContentContext bracketContent() {
			return getRuleContext(BracketContentContext.class,0);
		}
		public TerminalNode BRACKET_RIGHT() { return getToken(JSONPathParser.BRACKET_RIGHT, 0); }
		public BracketContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracket; }
	}

	public final BracketContext bracket() throws RecognitionException {
		BracketContext _localctx = new BracketContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_bracket);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(97);
			match(BRACKET_LEFT);
			setState(98);
			bracketContent();
			setState(99);
			match(BRACKET_RIGHT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class BracketContentContext extends ParserRuleContext {
		public UnionsContext unions() {
			return getRuleContext(UnionsContext.class,0);
		}
		public IndexesContext indexes() {
			return getRuleContext(IndexesContext.class,0);
		}
		public SlicesContext slices() {
			return getRuleContext(SlicesContext.class,0);
		}
		public TerminalNode STAR() { return getToken(JSONPathParser.STAR, 0); }
		public TerminalNode NUMBER() { return getToken(JSONPathParser.NUMBER, 0); }
		public TerminalNode STRING() { return getToken(JSONPathParser.STRING, 0); }
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public FilterExpressionContext filterExpression() {
			return getRuleContext(FilterExpressionContext.class,0);
		}
		public BracketContentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_bracketContent; }
	}

	public final BracketContentContext bracketContent() throws RecognitionException {
		BracketContentContext _localctx = new BracketContentContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_bracketContent);
		try {
			setState(109);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(101);
				unions();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(102);
				indexes();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(103);
				slices();
				}
				break;
			case 4:
				enterOuterAlt(_localctx, 4);
				{
				setState(104);
				match(STAR);
				}
				break;
			case 5:
				enterOuterAlt(_localctx, 5);
				{
				setState(105);
				match(NUMBER);
				}
				break;
			case 6:
				enterOuterAlt(_localctx, 6);
				{
				setState(106);
				match(STRING);
				}
				break;
			case 7:
				enterOuterAlt(_localctx, 7);
				{
				setState(107);
				identifier();
				}
				break;
			case 8:
				enterOuterAlt(_localctx, 8);
				{
				setState(108);
				filterExpression();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FilterExpressionContext extends ParserRuleContext {
		public TerminalNode QUESTION() { return getToken(JSONPathParser.QUESTION, 0); }
		public TerminalNode PAREN_LEFT() { return getToken(JSONPathParser.PAREN_LEFT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode PAREN_RIGHT() { return getToken(JSONPathParser.PAREN_RIGHT, 0); }
		public FilterExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_filterExpression; }
	}

	public final FilterExpressionContext filterExpression() throws RecognitionException {
		FilterExpressionContext _localctx = new FilterExpressionContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_filterExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(111);
			match(QUESTION);
			setState(112);
			match(PAREN_LEFT);
			setState(113);
			expression(0);
			setState(114);
			match(PAREN_RIGHT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IndexesContext extends ParserRuleContext {
		public List<TerminalNode> NUMBER() { return getTokens(JSONPathParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(JSONPathParser.NUMBER, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JSONPathParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JSONPathParser.COMMA, i);
		}
		public IndexesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_indexes; }
	}

	public final IndexesContext indexes() throws RecognitionException {
		IndexesContext _localctx = new IndexesContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_indexes);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(116);
			match(NUMBER);
			setState(119); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(117);
				match(COMMA);
				setState(118);
				match(NUMBER);
				}
				}
				setState(121); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==COMMA );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class UnionsContext extends ParserRuleContext {
		public List<TerminalNode> STRING() { return getTokens(JSONPathParser.STRING); }
		public TerminalNode STRING(int i) {
			return getToken(JSONPathParser.STRING, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(JSONPathParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JSONPathParser.COMMA, i);
		}
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public UnionsContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_unions; }
	}

	public final UnionsContext unions() throws RecognitionException {
		UnionsContext _localctx = new UnionsContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_unions);
		int _la;
		try {
			setState(137);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(123);
				match(STRING);
				setState(126); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(124);
					match(COMMA);
					setState(125);
					match(STRING);
					}
					}
					setState(128); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==COMMA );
				}
				break;
			case TRUE:
			case FALSE:
			case NULL:
			case KEY:
			case SPECIAL_KEY:
				enterOuterAlt(_localctx, 2);
				{
				setState(130);
				identifier();
				setState(133); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(131);
					match(COMMA);
					setState(132);
					identifier();
					}
					}
					setState(135); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==COMMA );
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class SlicesContext extends ParserRuleContext {
		public List<TerminalNode> COLON() { return getTokens(JSONPathParser.COLON); }
		public TerminalNode COLON(int i) {
			return getToken(JSONPathParser.COLON, i);
		}
		public List<TerminalNode> NUMBER() { return getTokens(JSONPathParser.NUMBER); }
		public TerminalNode NUMBER(int i) {
			return getToken(JSONPathParser.NUMBER, i);
		}
		public SlicesContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_slices; }
	}

	public final SlicesContext slices() throws RecognitionException {
		SlicesContext _localctx = new SlicesContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_slices);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(140);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NUMBER) {
				{
				setState(139);
				match(NUMBER);
				}
			}

			setState(142);
			match(COLON);
			setState(144);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==NUMBER) {
				{
				setState(143);
				match(NUMBER);
				}
			}

			setState(150);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==COLON) {
				{
				setState(146);
				match(COLON);
				setState(148);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==NUMBER) {
					{
					setState(147);
					match(NUMBER);
					}
				}

				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class RegexContext extends ParserRuleContext {
		public TerminalNode REGEX_EXPR() { return getToken(JSONPathParser.REGEX_EXPR, 0); }
		public TerminalNode REGEX_OPT() { return getToken(JSONPathParser.REGEX_OPT, 0); }
		public RegexContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_regex; }
	}

	public final RegexContext regex() throws RecognitionException {
		RegexContext _localctx = new RegexContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_regex);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(152);
			match(REGEX_EXPR);
			setState(154);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,20,_ctx) ) {
			case 1:
				{
				setState(153);
				match(REGEX_OPT);
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExpressionContext extends ParserRuleContext {
		public TerminalNode NOT() { return getToken(JSONPathParser.NOT, 0); }
		public TerminalNode PAREN_LEFT() { return getToken(JSONPathParser.PAREN_LEFT, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public TerminalNode PAREN_RIGHT() { return getToken(JSONPathParser.PAREN_RIGHT, 0); }
		public List<FilterargContext> filterarg() {
			return getRuleContexts(FilterargContext.class);
		}
		public FilterargContext filterarg(int i) {
			return getRuleContext(FilterargContext.class,i);
		}
		public TerminalNode EQ() { return getToken(JSONPathParser.EQ, 0); }
		public TerminalNode NE() { return getToken(JSONPathParser.NE, 0); }
		public TerminalNode LT() { return getToken(JSONPathParser.LT, 0); }
		public TerminalNode LE() { return getToken(JSONPathParser.LE, 0); }
		public TerminalNode GT() { return getToken(JSONPathParser.GT, 0); }
		public TerminalNode GE() { return getToken(JSONPathParser.GE, 0); }
		public TerminalNode IN() { return getToken(JSONPathParser.IN, 0); }
		public TerminalNode NIN() { return getToken(JSONPathParser.NIN, 0); }
		public TerminalNode SUB() { return getToken(JSONPathParser.SUB, 0); }
		public TerminalNode ANY() { return getToken(JSONPathParser.ANY, 0); }
		public TerminalNode SIZO() { return getToken(JSONPathParser.SIZO, 0); }
		public TerminalNode NON() { return getToken(JSONPathParser.NON, 0); }
		public TerminalNode SIZ() { return getToken(JSONPathParser.SIZ, 0); }
		public TerminalNode REG() { return getToken(JSONPathParser.REG, 0); }
		public RegexContext regex() {
			return getRuleContext(RegexContext.class,0);
		}
		public TerminalNode EMPT() { return getToken(JSONPathParser.EMPT, 0); }
		public FilterpathContext filterpath() {
			return getRuleContext(FilterpathContext.class,0);
		}
		public TerminalNode TRUE() { return getToken(JSONPathParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(JSONPathParser.FALSE, 0); }
		public TerminalNode NULL() { return getToken(JSONPathParser.NULL, 0); }
		public TerminalNode AND() { return getToken(JSONPathParser.AND, 0); }
		public TerminalNode OR() { return getToken(JSONPathParser.OR, 0); }
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 26;
		enterRecursionRule(_localctx, 26, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(181);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,21,_ctx) ) {
			case 1:
				{
				setState(157);
				match(NOT);
				setState(158);
				match(PAREN_LEFT);
				setState(159);
				expression(0);
				setState(160);
				match(PAREN_RIGHT);
				}
				break;
			case 2:
				{
				setState(162);
				match(PAREN_LEFT);
				setState(163);
				expression(0);
				setState(164);
				match(PAREN_RIGHT);
				}
				break;
			case 3:
				{
				setState(166);
				filterarg(0);
				setState(167);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 2088832L) != 0)) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(168);
				filterarg(0);
				}
				break;
			case 4:
				{
				setState(170);
				filterarg(0);
				setState(171);
				match(REG);
				setState(172);
				regex();
				}
				break;
			case 5:
				{
				setState(174);
				filterarg(0);
				setState(175);
				match(EMPT);
				}
				break;
			case 6:
				{
				setState(177);
				filterpath();
				}
				break;
			case 7:
				{
				setState(178);
				match(TRUE);
				}
				break;
			case 8:
				{
				setState(179);
				match(FALSE);
				}
				break;
			case 9:
				{
				setState(180);
				match(NULL);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(188);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpressionContext(_parentctx, _parentState);
					pushNewRecursionContext(_localctx, _startState, RULE_expression);
					setState(183);
					if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
					setState(184);
					_la = _input.LA(1);
					if ( !(_la==AND || _la==OR) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					setState(185);
					expression(9);
					}
					} 
				}
				setState(190);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,22,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class FilterpathContext extends ParserRuleContext {
		public TerminalNode ROOT_VALUE() { return getToken(JSONPathParser.ROOT_VALUE, 0); }
		public TerminalNode CURRENT_VALUE() { return getToken(JSONPathParser.CURRENT_VALUE, 0); }
		public SubscriptContext subscript() {
			return getRuleContext(SubscriptContext.class,0);
		}
		public FilterpathContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_filterpath; }
	}

	public final FilterpathContext filterpath() throws RecognitionException {
		FilterpathContext _localctx = new FilterpathContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_filterpath);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(191);
			_la = _input.LA(1);
			if ( !(_la==CURRENT_VALUE || _la==ROOT_VALUE) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(193);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,23,_ctx) ) {
			case 1:
				{
				setState(192);
				subscript();
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class IdentifierContext extends ParserRuleContext {
		public TerminalNode KEY() { return getToken(JSONPathParser.KEY, 0); }
		public TerminalNode SPECIAL_KEY() { return getToken(JSONPathParser.SPECIAL_KEY, 0); }
		public TerminalNode TRUE() { return getToken(JSONPathParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(JSONPathParser.FALSE, 0); }
		public TerminalNode NULL() { return getToken(JSONPathParser.NULL, 0); }
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 30, RULE_identifier);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(195);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & 13194256973824L) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ObjContext extends ParserRuleContext {
		public TerminalNode BRACE_LEFT() { return getToken(JSONPathParser.BRACE_LEFT, 0); }
		public List<PairContext> pair() {
			return getRuleContexts(PairContext.class);
		}
		public PairContext pair(int i) {
			return getRuleContext(PairContext.class,i);
		}
		public TerminalNode BRACE_RIGHT() { return getToken(JSONPathParser.BRACE_RIGHT, 0); }
		public List<TerminalNode> COMMA() { return getTokens(JSONPathParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JSONPathParser.COMMA, i);
		}
		public ObjContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_obj; }
	}

	public final ObjContext obj() throws RecognitionException {
		ObjContext _localctx = new ObjContext(_ctx, getState());
		enterRule(_localctx, 32, RULE_obj);
		int _la;
		try {
			setState(210);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,25,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(197);
				match(BRACE_LEFT);
				setState(198);
				pair();
				setState(203);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(199);
					match(COMMA);
					setState(200);
					pair();
					}
					}
					setState(205);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(206);
				match(BRACE_RIGHT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(208);
				match(BRACE_LEFT);
				setState(209);
				match(BRACE_RIGHT);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class PairContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(JSONPathParser.STRING, 0); }
		public TerminalNode COLON() { return getToken(JSONPathParser.COLON, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public PairContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_pair; }
	}

	public final PairContext pair() throws RecognitionException {
		PairContext _localctx = new PairContext(_ctx, getState());
		enterRule(_localctx, 34, RULE_pair);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(212);
			match(STRING);
			setState(213);
			match(COLON);
			setState(214);
			value();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArrayContext extends ParserRuleContext {
		public TerminalNode BRACKET_LEFT() { return getToken(JSONPathParser.BRACKET_LEFT, 0); }
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public TerminalNode BRACKET_RIGHT() { return getToken(JSONPathParser.BRACKET_RIGHT, 0); }
		public List<TerminalNode> COMMA() { return getTokens(JSONPathParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(JSONPathParser.COMMA, i);
		}
		public ArrayContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_array; }
	}

	public final ArrayContext array() throws RecognitionException {
		ArrayContext _localctx = new ArrayContext(_ctx, getState());
		enterRule(_localctx, 36, RULE_array);
		int _la;
		try {
			setState(229);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,27,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(216);
				match(BRACKET_LEFT);
				setState(217);
				value();
				setState(222);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(218);
					match(COMMA);
					setState(219);
					value();
					}
					}
					setState(224);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(225);
				match(BRACKET_RIGHT);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(227);
				match(BRACKET_LEFT);
				setState(228);
				match(BRACKET_RIGHT);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ValueContext extends ParserRuleContext {
		public TerminalNode STRING() { return getToken(JSONPathParser.STRING, 0); }
		public TerminalNode NUMBER() { return getToken(JSONPathParser.NUMBER, 0); }
		public ObjContext obj() {
			return getRuleContext(ObjContext.class,0);
		}
		public ArrayContext array() {
			return getRuleContext(ArrayContext.class,0);
		}
		public TerminalNode TRUE() { return getToken(JSONPathParser.TRUE, 0); }
		public TerminalNode FALSE() { return getToken(JSONPathParser.FALSE, 0); }
		public TerminalNode NULL() { return getToken(JSONPathParser.NULL, 0); }
		public ValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_value; }
	}

	public final ValueContext value() throws RecognitionException {
		ValueContext _localctx = new ValueContext(_ctx, getState());
		enterRule(_localctx, 38, RULE_value);
		try {
			setState(238);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case STRING:
				enterOuterAlt(_localctx, 1);
				{
				setState(231);
				match(STRING);
				}
				break;
			case NUMBER:
				enterOuterAlt(_localctx, 2);
				{
				setState(232);
				match(NUMBER);
				}
				break;
			case BRACE_LEFT:
				enterOuterAlt(_localctx, 3);
				{
				setState(233);
				obj();
				}
				break;
			case BRACKET_LEFT:
				enterOuterAlt(_localctx, 4);
				{
				setState(234);
				array();
				}
				break;
			case TRUE:
				enterOuterAlt(_localctx, 5);
				{
				setState(235);
				match(TRUE);
				}
				break;
			case FALSE:
				enterOuterAlt(_localctx, 6);
				{
				setState(236);
				match(FALSE);
				}
				break;
			case NULL:
				enterOuterAlt(_localctx, 7);
				{
				setState(237);
				match(NULL);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 2:
			return filterarg_sempred((FilterargContext)_localctx, predIndex);
		case 13:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean filterarg_sempred(FilterargContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 4);
		case 1:
			return precpred(_ctx, 3);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 2:
			return precpred(_ctx, 8);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001.\u00f1\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b\u0002"+
		"\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002\u000f\u0007\u000f"+
		"\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002\u0012\u0007\u0012"+
		"\u0002\u0013\u0007\u0013\u0001\u0000\u0001\u0000\u0003\u0000+\b\u0000"+
		"\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0002\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0003\u0002"+
		"8\b\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002"+
		"\u0003\u0002?\b\u0002\u0001\u0002\u0005\u0002B\b\u0002\n\u0002\f\u0002"+
		"E\t\u0002\u0001\u0003\u0001\u0003\u0001\u0003\u0003\u0003J\b\u0003\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0003\u0003O\b\u0003\u0001\u0003\u0001"+
		"\u0003\u0003\u0003S\b\u0003\u0003\u0003U\b\u0003\u0001\u0004\u0001\u0004"+
		"\u0001\u0004\u0003\u0004Z\b\u0004\u0001\u0005\u0001\u0005\u0001\u0005"+
		"\u0001\u0005\u0003\u0005`\b\u0005\u0001\u0006\u0001\u0006\u0001\u0006"+
		"\u0001\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007\u0001\u0007"+
		"\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007n\b\u0007\u0001\b\u0001"+
		"\b\u0001\b\u0001\b\u0001\b\u0001\t\u0001\t\u0001\t\u0004\tx\b\t\u000b"+
		"\t\f\ty\u0001\n\u0001\n\u0001\n\u0004\n\u007f\b\n\u000b\n\f\n\u0080\u0001"+
		"\n\u0001\n\u0001\n\u0004\n\u0086\b\n\u000b\n\f\n\u0087\u0003\n\u008a\b"+
		"\n\u0001\u000b\u0003\u000b\u008d\b\u000b\u0001\u000b\u0001\u000b\u0003"+
		"\u000b\u0091\b\u000b\u0001\u000b\u0001\u000b\u0003\u000b\u0095\b\u000b"+
		"\u0003\u000b\u0097\b\u000b\u0001\f\u0001\f\u0003\f\u009b\b\f\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001"+
		"\r\u0001\r\u0001\r\u0001\r\u0001\r\u0001\r\u0003\r\u00b6\b\r\u0001\r\u0001"+
		"\r\u0001\r\u0005\r\u00bb\b\r\n\r\f\r\u00be\t\r\u0001\u000e\u0001\u000e"+
		"\u0003\u000e\u00c2\b\u000e\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010"+
		"\u0001\u0010\u0001\u0010\u0005\u0010\u00ca\b\u0010\n\u0010\f\u0010\u00cd"+
		"\t\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0001\u0010\u0003\u0010\u00d3"+
		"\b\u0010\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0011\u0001\u0012\u0001"+
		"\u0012\u0001\u0012\u0001\u0012\u0005\u0012\u00dd\b\u0012\n\u0012\f\u0012"+
		"\u00e0\t\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0001\u0012\u0003\u0012"+
		"\u00e6\b\u0012\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013\u0001\u0013"+
		"\u0001\u0013\u0001\u0013\u0003\u0013\u00ef\b\u0013\u0001\u0013\u0000\u0002"+
		"\u0004\u001a\u0014\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014"+
		"\u0016\u0018\u001a\u001c\u001e \"$&\u0000\u0006\u0002\u0000\u0005\u0005"+
		"&&\u0001\u0000$%\u0002\u0000\u0007\f\u000e\u0014\u0002\u0000\u0006\u0006"+
		"\u0017\u0017\u0002\u0000\u0001\u0001\u0003\u0003\u0002\u0000\u0018\u001a"+
		"*+\u0110\u0000(\u0001\u0000\u0000\u0000\u0002.\u0001\u0000\u0000\u0000"+
		"\u00047\u0001\u0000\u0000\u0000\u0006T\u0001\u0000\u0000\u0000\bY\u0001"+
		"\u0000\u0000\u0000\n_\u0001\u0000\u0000\u0000\fa\u0001\u0000\u0000\u0000"+
		"\u000em\u0001\u0000\u0000\u0000\u0010o\u0001\u0000\u0000\u0000\u0012t"+
		"\u0001\u0000\u0000\u0000\u0014\u0089\u0001\u0000\u0000\u0000\u0016\u008c"+
		"\u0001\u0000\u0000\u0000\u0018\u0098\u0001\u0000\u0000\u0000\u001a\u00b5"+
		"\u0001\u0000\u0000\u0000\u001c\u00bf\u0001\u0000\u0000\u0000\u001e\u00c3"+
		"\u0001\u0000\u0000\u0000 \u00d2\u0001\u0000\u0000\u0000\"\u00d4\u0001"+
		"\u0000\u0000\u0000$\u00e5\u0001\u0000\u0000\u0000&\u00ee\u0001\u0000\u0000"+
		"\u0000(*\u0005\u0003\u0000\u0000)+\u0003\u0006\u0003\u0000*)\u0001\u0000"+
		"\u0000\u0000*+\u0001\u0000\u0000\u0000+,\u0001\u0000\u0000\u0000,-\u0005"+
		"\u0000\u0000\u0001-\u0001\u0001\u0000\u0000\u0000./\u0005\'\u0000\u0000"+
		"/\u0003\u0001\u0000\u0000\u000001\u0006\u0002\uffff\uffff\u000012\u0005"+
		"!\u0000\u000023\u0003\u0004\u0002\u000034\u0005\"\u0000\u000048\u0001"+
		"\u0000\u0000\u000058\u0003&\u0013\u000068\u0003\u001c\u000e\u000070\u0001"+
		"\u0000\u0000\u000075\u0001\u0000\u0000\u000076\u0001\u0000\u0000\u0000"+
		"8C\u0001\u0000\u0000\u00009:\n\u0004\u0000\u0000:;\u0007\u0000\u0000\u0000"+
		";B\u0003\u0004\u0002\u0005<>\n\u0003\u0000\u0000=?\u0007\u0001\u0000\u0000"+
		">=\u0001\u0000\u0000\u0000>?\u0001\u0000\u0000\u0000?@\u0001\u0000\u0000"+
		"\u0000@B\u0003\u0004\u0002\u0004A9\u0001\u0000\u0000\u0000A<\u0001\u0000"+
		"\u0000\u0000BE\u0001\u0000\u0000\u0000CA\u0001\u0000\u0000\u0000CD\u0001"+
		"\u0000\u0000\u0000D\u0005\u0001\u0000\u0000\u0000EC\u0001\u0000\u0000"+
		"\u0000FG\u0005\u0002\u0000\u0000GI\u0003\b\u0004\u0000HJ\u0003\u0006\u0003"+
		"\u0000IH\u0001\u0000\u0000\u0000IJ\u0001\u0000\u0000\u0000JU\u0001\u0000"+
		"\u0000\u0000KL\u0005\u0004\u0000\u0000LN\u0003\n\u0005\u0000MO\u0003\u0006"+
		"\u0003\u0000NM\u0001\u0000\u0000\u0000NO\u0001\u0000\u0000\u0000OU\u0001"+
		"\u0000\u0000\u0000PR\u0003\f\u0006\u0000QS\u0003\u0006\u0003\u0000RQ\u0001"+
		"\u0000\u0000\u0000RS\u0001\u0000\u0000\u0000SU\u0001\u0000\u0000\u0000"+
		"TF\u0001\u0000\u0000\u0000TK\u0001\u0000\u0000\u0000TP\u0001\u0000\u0000"+
		"\u0000U\u0007\u0001\u0000\u0000\u0000VZ\u0005\u0005\u0000\u0000WZ\u0003"+
		"\u001e\u000f\u0000XZ\u0003\f\u0006\u0000YV\u0001\u0000\u0000\u0000YW\u0001"+
		"\u0000\u0000\u0000YX\u0001\u0000\u0000\u0000Z\t\u0001\u0000\u0000\u0000"+
		"[`\u0003\u0002\u0001\u0000\\`\u0005\u0005\u0000\u0000]`\u0005-\u0000\u0000"+
		"^`\u0003\u001e\u000f\u0000_[\u0001\u0000\u0000\u0000_\\\u0001\u0000\u0000"+
		"\u0000_]\u0001\u0000\u0000\u0000_^\u0001\u0000\u0000\u0000`\u000b\u0001"+
		"\u0000\u0000\u0000ab\u0005\u001d\u0000\u0000bc\u0003\u000e\u0007\u0000"+
		"cd\u0005\u001e\u0000\u0000d\r\u0001\u0000\u0000\u0000en\u0003\u0014\n"+
		"\u0000fn\u0003\u0012\t\u0000gn\u0003\u0016\u000b\u0000hn\u0005\u0005\u0000"+
		"\u0000in\u0005-\u0000\u0000jn\u0005.\u0000\u0000kn\u0003\u001e\u000f\u0000"+
		"ln\u0003\u0010\b\u0000me\u0001\u0000\u0000\u0000mf\u0001\u0000\u0000\u0000"+
		"mg\u0001\u0000\u0000\u0000mh\u0001\u0000\u0000\u0000mi\u0001\u0000\u0000"+
		"\u0000mj\u0001\u0000\u0000\u0000mk\u0001\u0000\u0000\u0000ml\u0001\u0000"+
		"\u0000\u0000n\u000f\u0001\u0000\u0000\u0000op\u0005#\u0000\u0000pq\u0005"+
		"!\u0000\u0000qr\u0003\u001a\r\u0000rs\u0005\"\u0000\u0000s\u0011\u0001"+
		"\u0000\u0000\u0000tw\u0005-\u0000\u0000uv\u0005 \u0000\u0000vx\u0005-"+
		"\u0000\u0000wu\u0001\u0000\u0000\u0000xy\u0001\u0000\u0000\u0000yw\u0001"+
		"\u0000\u0000\u0000yz\u0001\u0000\u0000\u0000z\u0013\u0001\u0000\u0000"+
		"\u0000{~\u0005.\u0000\u0000|}\u0005 \u0000\u0000}\u007f\u0005.\u0000\u0000"+
		"~|\u0001\u0000\u0000\u0000\u007f\u0080\u0001\u0000\u0000\u0000\u0080~"+
		"\u0001\u0000\u0000\u0000\u0080\u0081\u0001\u0000\u0000\u0000\u0081\u008a"+
		"\u0001\u0000\u0000\u0000\u0082\u0085\u0003\u001e\u000f\u0000\u0083\u0084"+
		"\u0005 \u0000\u0000\u0084\u0086\u0003\u001e\u000f\u0000\u0085\u0083\u0001"+
		"\u0000\u0000\u0000\u0086\u0087\u0001\u0000\u0000\u0000\u0087\u0085\u0001"+
		"\u0000\u0000\u0000\u0087\u0088\u0001\u0000\u0000\u0000\u0088\u008a\u0001"+
		"\u0000\u0000\u0000\u0089{\u0001\u0000\u0000\u0000\u0089\u0082\u0001\u0000"+
		"\u0000\u0000\u008a\u0015\u0001\u0000\u0000\u0000\u008b\u008d\u0005-\u0000"+
		"\u0000\u008c\u008b\u0001\u0000\u0000\u0000\u008c\u008d\u0001\u0000\u0000"+
		"\u0000\u008d\u008e\u0001\u0000\u0000\u0000\u008e\u0090\u0005\u001f\u0000"+
		"\u0000\u008f\u0091\u0005-\u0000\u0000\u0090\u008f\u0001\u0000\u0000\u0000"+
		"\u0090\u0091\u0001\u0000\u0000\u0000\u0091\u0096\u0001\u0000\u0000\u0000"+
		"\u0092\u0094\u0005\u001f\u0000\u0000\u0093\u0095\u0005-\u0000\u0000\u0094"+
		"\u0093\u0001\u0000\u0000\u0000\u0094\u0095\u0001\u0000\u0000\u0000\u0095"+
		"\u0097\u0001\u0000\u0000\u0000\u0096\u0092\u0001\u0000\u0000\u0000\u0096"+
		"\u0097\u0001\u0000\u0000\u0000\u0097\u0017\u0001\u0000\u0000\u0000\u0098"+
		"\u009a\u0005)\u0000\u0000\u0099\u009b\u0005(\u0000\u0000\u009a\u0099\u0001"+
		"\u0000\u0000\u0000\u009a\u009b\u0001\u0000\u0000\u0000\u009b\u0019\u0001"+
		"\u0000\u0000\u0000\u009c\u009d\u0006\r\uffff\uffff\u0000\u009d\u009e\u0005"+
		"\u0016\u0000\u0000\u009e\u009f\u0005!\u0000\u0000\u009f\u00a0\u0003\u001a"+
		"\r\u0000\u00a0\u00a1\u0005\"\u0000\u0000\u00a1\u00b6\u0001\u0000\u0000"+
		"\u0000\u00a2\u00a3\u0005!\u0000\u0000\u00a3\u00a4\u0003\u001a\r\u0000"+
		"\u00a4\u00a5\u0005\"\u0000\u0000\u00a5\u00b6\u0001\u0000\u0000\u0000\u00a6"+
		"\u00a7\u0003\u0004\u0002\u0000\u00a7\u00a8\u0007\u0002\u0000\u0000\u00a8"+
		"\u00a9\u0003\u0004\u0002\u0000\u00a9\u00b6\u0001\u0000\u0000\u0000\u00aa"+
		"\u00ab\u0003\u0004\u0002\u0000\u00ab\u00ac\u0005\r\u0000\u0000\u00ac\u00ad"+
		"\u0003\u0018\f\u0000\u00ad\u00b6\u0001\u0000\u0000\u0000\u00ae\u00af\u0003"+
		"\u0004\u0002\u0000\u00af\u00b0\u0005\u0015\u0000\u0000\u00b0\u00b6\u0001"+
		"\u0000\u0000\u0000\u00b1\u00b6\u0003\u001c\u000e\u0000\u00b2\u00b6\u0005"+
		"\u0018\u0000\u0000\u00b3\u00b6\u0005\u0019\u0000\u0000\u00b4\u00b6\u0005"+
		"\u001a\u0000\u0000\u00b5\u009c\u0001\u0000\u0000\u0000\u00b5\u00a2\u0001"+
		"\u0000\u0000\u0000\u00b5\u00a6\u0001\u0000\u0000\u0000\u00b5\u00aa\u0001"+
		"\u0000\u0000\u0000\u00b5\u00ae\u0001\u0000\u0000\u0000\u00b5\u00b1\u0001"+
		"\u0000\u0000\u0000\u00b5\u00b2\u0001\u0000\u0000\u0000\u00b5\u00b3\u0001"+
		"\u0000\u0000\u0000\u00b5\u00b4\u0001\u0000\u0000\u0000\u00b6\u00bc\u0001"+
		"\u0000\u0000\u0000\u00b7\u00b8\n\b\u0000\u0000\u00b8\u00b9\u0007\u0003"+
		"\u0000\u0000\u00b9\u00bb\u0003\u001a\r\t\u00ba\u00b7\u0001\u0000\u0000"+
		"\u0000\u00bb\u00be\u0001\u0000\u0000\u0000\u00bc\u00ba\u0001\u0000\u0000"+
		"\u0000\u00bc\u00bd\u0001\u0000\u0000\u0000\u00bd\u001b\u0001\u0000\u0000"+
		"\u0000\u00be\u00bc\u0001\u0000\u0000\u0000\u00bf\u00c1\u0007\u0004\u0000"+
		"\u0000\u00c0\u00c2\u0003\u0006\u0003\u0000\u00c1\u00c0\u0001\u0000\u0000"+
		"\u0000\u00c1\u00c2\u0001\u0000\u0000\u0000\u00c2\u001d\u0001\u0000\u0000"+
		"\u0000\u00c3\u00c4\u0007\u0005\u0000\u0000\u00c4\u001f\u0001\u0000\u0000"+
		"\u0000\u00c5\u00c6\u0005\u001b\u0000\u0000\u00c6\u00cb\u0003\"\u0011\u0000"+
		"\u00c7\u00c8\u0005 \u0000\u0000\u00c8\u00ca\u0003\"\u0011\u0000\u00c9"+
		"\u00c7\u0001\u0000\u0000\u0000\u00ca\u00cd\u0001\u0000\u0000\u0000\u00cb"+
		"\u00c9\u0001\u0000\u0000\u0000\u00cb\u00cc\u0001\u0000\u0000\u0000\u00cc"+
		"\u00ce\u0001\u0000\u0000\u0000\u00cd\u00cb\u0001\u0000\u0000\u0000\u00ce"+
		"\u00cf\u0005\u001c\u0000\u0000\u00cf\u00d3\u0001\u0000\u0000\u0000\u00d0"+
		"\u00d1\u0005\u001b\u0000\u0000\u00d1\u00d3\u0005\u001c\u0000\u0000\u00d2"+
		"\u00c5\u0001\u0000\u0000\u0000\u00d2\u00d0\u0001\u0000\u0000\u0000\u00d3"+
		"!\u0001\u0000\u0000\u0000\u00d4\u00d5\u0005.\u0000\u0000\u00d5\u00d6\u0005"+
		"\u001f\u0000\u0000\u00d6\u00d7\u0003&\u0013\u0000\u00d7#\u0001\u0000\u0000"+
		"\u0000\u00d8\u00d9\u0005\u001d\u0000\u0000\u00d9\u00de\u0003&\u0013\u0000"+
		"\u00da\u00db\u0005 \u0000\u0000\u00db\u00dd\u0003&\u0013\u0000\u00dc\u00da"+
		"\u0001\u0000\u0000\u0000\u00dd\u00e0\u0001\u0000\u0000\u0000\u00de\u00dc"+
		"\u0001\u0000\u0000\u0000\u00de\u00df\u0001\u0000\u0000\u0000\u00df\u00e1"+
		"\u0001\u0000\u0000\u0000\u00e0\u00de\u0001\u0000\u0000\u0000\u00e1\u00e2"+
		"\u0005\u001e\u0000\u0000\u00e2\u00e6\u0001\u0000\u0000\u0000\u00e3\u00e4"+
		"\u0005\u001d\u0000\u0000\u00e4\u00e6\u0005\u001e\u0000\u0000\u00e5\u00d8"+
		"\u0001\u0000\u0000\u0000\u00e5\u00e3\u0001\u0000\u0000\u0000\u00e6%\u0001"+
		"\u0000\u0000\u0000\u00e7\u00ef\u0005.\u0000\u0000\u00e8\u00ef\u0005-\u0000"+
		"\u0000\u00e9\u00ef\u0003 \u0010\u0000\u00ea\u00ef\u0003$\u0012\u0000\u00eb"+
		"\u00ef\u0005\u0018\u0000\u0000\u00ec\u00ef\u0005\u0019\u0000\u0000\u00ed"+
		"\u00ef\u0005\u001a\u0000\u0000\u00ee\u00e7\u0001\u0000\u0000\u0000\u00ee"+
		"\u00e8\u0001\u0000\u0000\u0000\u00ee\u00e9\u0001\u0000\u0000\u0000\u00ee"+
		"\u00ea\u0001\u0000\u0000\u0000\u00ee\u00eb\u0001\u0000\u0000\u0000\u00ee"+
		"\u00ec\u0001\u0000\u0000\u0000\u00ee\u00ed\u0001\u0000\u0000\u0000\u00ef"+
		"\'\u0001\u0000\u0000\u0000\u001d*7>ACINRTY_my\u0080\u0087\u0089\u008c"+
		"\u0090\u0094\u0096\u009a\u00b5\u00bc\u00c1\u00cb\u00d2\u00de\u00e5\u00ee";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}