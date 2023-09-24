// Generated from src/parser/generated/JSONPath.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONPathListener from './JSONPathListener.js';
const serializedATN = [4,1,45,234,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,1,0,1,0,3,0,
41,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,52,8,1,1,1,1,1,1,1,1,1,1,
1,3,1,59,8,1,1,1,5,1,62,8,1,10,1,12,1,65,9,1,1,2,1,2,1,2,3,2,70,8,2,1,2,
1,2,1,2,3,2,75,8,2,1,2,1,2,3,2,79,8,2,3,2,81,8,2,1,3,1,3,1,3,3,3,86,8,3,
1,4,1,4,1,4,3,4,91,8,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,6,1,
6,3,6,106,8,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,4,8,116,8,8,11,8,12,8,117,
1,9,1,9,1,9,4,9,123,8,9,11,9,12,9,124,1,9,1,9,1,9,4,9,130,8,9,11,9,12,9,
131,3,9,134,8,9,1,10,3,10,137,8,10,1,10,1,10,3,10,141,8,10,1,10,1,10,3,10,
145,8,10,3,10,147,8,10,1,11,1,11,3,11,151,8,11,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,3,12,175,8,12,1,12,1,12,1,12,5,12,180,8,12,10,12,12,12,183,
9,12,1,13,1,13,3,13,187,8,13,1,14,1,14,1,15,1,15,1,15,1,15,5,15,195,8,15,
10,15,12,15,198,9,15,1,15,1,15,1,15,1,15,3,15,204,8,15,1,16,1,16,1,16,1,
16,1,17,1,17,1,17,1,17,5,17,214,8,17,10,17,12,17,217,9,17,1,17,1,17,1,17,
1,17,3,17,223,8,17,1,18,1,18,1,18,1,18,1,18,1,18,1,18,3,18,232,8,18,1,18,
0,2,2,24,19,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,0,6,2,0,
6,6,39,39,1,0,37,38,2,0,8,13,15,21,2,0,7,7,24,24,2,0,2,2,4,4,2,0,25,27,42,
42,263,0,38,1,0,0,0,2,51,1,0,0,0,4,80,1,0,0,0,6,85,1,0,0,0,8,90,1,0,0,0,
10,92,1,0,0,0,12,105,1,0,0,0,14,107,1,0,0,0,16,112,1,0,0,0,18,133,1,0,0,
0,20,136,1,0,0,0,22,148,1,0,0,0,24,174,1,0,0,0,26,184,1,0,0,0,28,188,1,0,
0,0,30,203,1,0,0,0,32,205,1,0,0,0,34,222,1,0,0,0,36,231,1,0,0,0,38,40,5,
4,0,0,39,41,3,4,2,0,40,39,1,0,0,0,40,41,1,0,0,0,41,42,1,0,0,0,42,43,5,0,
0,1,43,1,1,0,0,0,44,45,6,1,-1,0,45,46,5,34,0,0,46,47,3,2,1,0,47,48,5,35,
0,0,48,52,1,0,0,0,49,52,3,36,18,0,50,52,3,26,13,0,51,44,1,0,0,0,51,49,1,
0,0,0,51,50,1,0,0,0,52,63,1,0,0,0,53,54,10,4,0,0,54,55,7,0,0,0,55,62,3,2,
1,5,56,58,10,3,0,0,57,59,7,1,0,0,58,57,1,0,0,0,58,59,1,0,0,0,59,60,1,0,0,
0,60,62,3,2,1,4,61,53,1,0,0,0,61,56,1,0,0,0,62,65,1,0,0,0,63,61,1,0,0,0,
63,64,1,0,0,0,64,3,1,0,0,0,65,63,1,0,0,0,66,67,5,3,0,0,67,69,3,6,3,0,68,
70,3,4,2,0,69,68,1,0,0,0,69,70,1,0,0,0,70,81,1,0,0,0,71,72,5,5,0,0,72,74,
3,8,4,0,73,75,3,4,2,0,74,73,1,0,0,0,74,75,1,0,0,0,75,81,1,0,0,0,76,78,3,
10,5,0,77,79,3,4,2,0,78,77,1,0,0,0,78,79,1,0,0,0,79,81,1,0,0,0,80,66,1,0,
0,0,80,71,1,0,0,0,80,76,1,0,0,0,81,5,1,0,0,0,82,86,5,6,0,0,83,86,3,28,14,
0,84,86,3,10,5,0,85,82,1,0,0,0,85,83,1,0,0,0,85,84,1,0,0,0,86,7,1,0,0,0,
87,91,5,6,0,0,88,91,5,44,0,0,89,91,3,28,14,0,90,87,1,0,0,0,90,88,1,0,0,0,
90,89,1,0,0,0,91,9,1,0,0,0,92,93,5,30,0,0,93,94,3,12,6,0,94,95,5,31,0,0,
95,11,1,0,0,0,96,106,3,18,9,0,97,106,3,16,8,0,98,106,3,20,10,0,99,106,5,
6,0,0,100,106,5,44,0,0,101,106,5,45,0,0,102,106,5,1,0,0,103,106,3,28,14,
0,104,106,3,14,7,0,105,96,1,0,0,0,105,97,1,0,0,0,105,98,1,0,0,0,105,99,1,
0,0,0,105,100,1,0,0,0,105,101,1,0,0,0,105,102,1,0,0,0,105,103,1,0,0,0,105,
104,1,0,0,0,106,13,1,0,0,0,107,108,5,36,0,0,108,109,5,34,0,0,109,110,3,24,
12,0,110,111,5,35,0,0,111,15,1,0,0,0,112,115,5,44,0,0,113,114,5,33,0,0,114,
116,5,44,0,0,115,113,1,0,0,0,116,117,1,0,0,0,117,115,1,0,0,0,117,118,1,0,
0,0,118,17,1,0,0,0,119,122,5,45,0,0,120,121,5,33,0,0,121,123,5,45,0,0,122,
120,1,0,0,0,123,124,1,0,0,0,124,122,1,0,0,0,124,125,1,0,0,0,125,134,1,0,
0,0,126,129,3,28,14,0,127,128,5,33,0,0,128,130,3,28,14,0,129,127,1,0,0,0,
130,131,1,0,0,0,131,129,1,0,0,0,131,132,1,0,0,0,132,134,1,0,0,0,133,119,
1,0,0,0,133,126,1,0,0,0,134,19,1,0,0,0,135,137,5,44,0,0,136,135,1,0,0,0,
136,137,1,0,0,0,137,138,1,0,0,0,138,140,5,32,0,0,139,141,5,44,0,0,140,139,
1,0,0,0,140,141,1,0,0,0,141,146,1,0,0,0,142,144,5,32,0,0,143,145,5,44,0,
0,144,143,1,0,0,0,144,145,1,0,0,0,145,147,1,0,0,0,146,142,1,0,0,0,146,147,
1,0,0,0,147,21,1,0,0,0,148,150,5,41,0,0,149,151,5,40,0,0,150,149,1,0,0,0,
150,151,1,0,0,0,151,23,1,0,0,0,152,153,6,12,-1,0,153,154,5,23,0,0,154,155,
5,34,0,0,155,156,3,24,12,0,156,157,5,35,0,0,157,175,1,0,0,0,158,159,5,34,
0,0,159,160,3,24,12,0,160,161,5,35,0,0,161,175,1,0,0,0,162,163,3,2,1,0,163,
164,7,2,0,0,164,165,3,2,1,0,165,175,1,0,0,0,166,167,3,2,1,0,167,168,5,14,
0,0,168,169,3,22,11,0,169,175,1,0,0,0,170,171,3,2,1,0,171,172,5,22,0,0,172,
175,1,0,0,0,173,175,3,26,13,0,174,152,1,0,0,0,174,158,1,0,0,0,174,162,1,
0,0,0,174,166,1,0,0,0,174,170,1,0,0,0,174,173,1,0,0,0,175,181,1,0,0,0,176,
177,10,5,0,0,177,178,7,3,0,0,178,180,3,24,12,6,179,176,1,0,0,0,180,183,1,
0,0,0,181,179,1,0,0,0,181,182,1,0,0,0,182,25,1,0,0,0,183,181,1,0,0,0,184,
186,7,4,0,0,185,187,3,4,2,0,186,185,1,0,0,0,186,187,1,0,0,0,187,27,1,0,0,
0,188,189,7,5,0,0,189,29,1,0,0,0,190,191,5,28,0,0,191,196,3,32,16,0,192,
193,5,33,0,0,193,195,3,32,16,0,194,192,1,0,0,0,195,198,1,0,0,0,196,194,1,
0,0,0,196,197,1,0,0,0,197,199,1,0,0,0,198,196,1,0,0,0,199,200,5,29,0,0,200,
204,1,0,0,0,201,202,5,28,0,0,202,204,5,29,0,0,203,190,1,0,0,0,203,201,1,
0,0,0,204,31,1,0,0,0,205,206,5,45,0,0,206,207,5,32,0,0,207,208,3,36,18,0,
208,33,1,0,0,0,209,210,5,30,0,0,210,215,3,36,18,0,211,212,5,33,0,0,212,214,
3,36,18,0,213,211,1,0,0,0,214,217,1,0,0,0,215,213,1,0,0,0,215,216,1,0,0,
0,216,218,1,0,0,0,217,215,1,0,0,0,218,219,5,31,0,0,219,223,1,0,0,0,220,221,
5,30,0,0,221,223,5,31,0,0,222,209,1,0,0,0,222,220,1,0,0,0,223,35,1,0,0,0,
224,232,5,45,0,0,225,232,5,44,0,0,226,232,3,30,15,0,227,232,3,34,17,0,228,
232,5,25,0,0,229,232,5,26,0,0,230,232,5,27,0,0,231,224,1,0,0,0,231,225,1,
0,0,0,231,226,1,0,0,0,231,227,1,0,0,0,231,228,1,0,0,0,231,229,1,0,0,0,231,
230,1,0,0,0,232,37,1,0,0,0,29,40,51,58,61,63,69,74,78,80,85,90,105,117,124,
131,133,136,140,144,146,150,174,181,186,196,203,215,222,231];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class JSONPathParser extends antlr4.Parser {

    static grammarFileName = "JSONPath.g4";
    static literalNames = [ null, "'\\''", "'@'", "'..'", "'$'", "'.'", 
                            "'*'", "'&&'", "'=='", "'>='", "'>'", "'<='", 
                            "'<'", "'!='", "'=~'", "' in '", "' nin '", 
                            "' subsetof '", "' anyof '", "' noneof '", "' sizeof '", 
                            "' size '", "' empty'", "'!'", "'||'", "'true'", 
                            "'false'", "'null'", "'{'", "'}'", "'['", "']'", 
                            "':'", "','", "'('", "')'", "'?'", "'- '", "'+'", 
                            "'/'" ];
    static symbolicNames = [ null, null, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", 
                             "DOT", "STAR", "AND", "EQ", "GE", "GT", "LE", 
                             "LT", "NE", "REG", "IN", "NIN", "SUB", "ANY", 
                             "NON", "SIZO", "SIZ", "EMPT", "NOT", "OR", 
                             "TRUE", "FALSE", "NULL", "BRACE_LEFT", "BRACE_RIGHT", 
                             "BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", 
                             "PAREN_LEFT", "PAREN_RIGHT", "QUESTION", "MINUS_SP", 
                             "PLUS", "DIV", "REGEX_OPT", "REGEX_EXPR", "KEY", 
                             "WS", "NUMBER", "STRING" ];
    static ruleNames = [ "jsonpath", "filterarg", "subscript", "dotdotContent", 
                         "dotContent", "bracket", "bracketContent", "filterExpression", 
                         "indexes", "unions", "slices", "regex", "expression", 
                         "filterpath", "identifier", "obj", "pair", "array", 
                         "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JSONPathParser.ruleNames;
        this.literalNames = JSONPathParser.literalNames;
        this.symbolicNames = JSONPathParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 1:
    	    		return this.filterarg_sempred(localctx, predIndex);
    	case 12:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    filterarg_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 4);
    		case 1:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 2:
    			return this.precpred(this._ctx, 5);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	jsonpath() {
	    let localctx = new JsonpathContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, JSONPathParser.RULE_jsonpath);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 38;
	        this.match(JSONPathParser.ROOT_VALUE);
	        this.state = 40;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 1073741864) !== 0)) {
	            this.state = 39;
	            this.subscript();
	        }

	        this.state = 42;
	        this.match(JSONPathParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	filterarg(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new FilterargContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, JSONPathParser.RULE_filterarg, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 34:
	            this.state = 45;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 46;
	            this.filterarg(0);
	            this.state = 47;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;
	        case 25:
	        case 26:
	        case 27:
	        case 28:
	        case 30:
	        case 44:
	        case 45:
	            this.state = 49;
	            this.value();
	            break;
	        case 2:
	        case 4:
	            this.state = 50;
	            this.filterpath();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 63;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 61;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 53;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 54;
	                    _la = this._input.LA(1);
	                    if(!(_la===6 || _la===39)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 55;
	                    this.filterarg(5);
	                    break;

	                case 2:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 56;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 58;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===37 || _la===38) {
	                        this.state = 57;
	                        _la = this._input.LA(1);
	                        if(!(_la===37 || _la===38)) {
	                        this._errHandler.recoverInline(this);
	                        }
	                        else {
	                        	this._errHandler.reportMatch(this);
	                            this.consume();
	                        }
	                    }

	                    this.state = 60;
	                    this.filterarg(4);
	                    break;

	                } 
	            }
	            this.state = 65;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	subscript() {
	    let localctx = new SubscriptContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, JSONPathParser.RULE_subscript);
	    try {
	        this.state = 80;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 3:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 66;
	            this.match(JSONPathParser.DOTDOT);
	            this.state = 67;
	            this.dotdotContent();
	            this.state = 69;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	            if(la_===1) {
	                this.state = 68;
	                this.subscript();

	            }
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 71;
	            this.match(JSONPathParser.DOT);
	            this.state = 72;
	            this.dotContent();
	            this.state = 74;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	            if(la_===1) {
	                this.state = 73;
	                this.subscript();

	            }
	            break;
	        case 30:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 76;
	            this.bracket();
	            this.state = 78;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	            if(la_===1) {
	                this.state = 77;
	                this.subscript();

	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	dotdotContent() {
	    let localctx = new DotdotContentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, JSONPathParser.RULE_dotdotContent);
	    try {
	        this.state = 85;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 6:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 82;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 25:
	        case 26:
	        case 27:
	        case 42:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 83;
	            this.identifier();
	            break;
	        case 30:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 84;
	            this.bracket();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	dotContent() {
	    let localctx = new DotContentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, JSONPathParser.RULE_dotContent);
	    try {
	        this.state = 90;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 6:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 87;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 44:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 88;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 25:
	        case 26:
	        case 27:
	        case 42:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 89;
	            this.identifier();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bracket() {
	    let localctx = new BracketContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, JSONPathParser.RULE_bracket);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 92;
	        this.match(JSONPathParser.BRACKET_LEFT);
	        this.state = 93;
	        this.bracketContent();
	        this.state = 94;
	        this.match(JSONPathParser.BRACKET_RIGHT);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	bracketContent() {
	    let localctx = new BracketContentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, JSONPathParser.RULE_bracketContent);
	    try {
	        this.state = 105;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 96;
	            this.unions();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 97;
	            this.indexes();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 98;
	            this.slices();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 99;
	            this.match(JSONPathParser.STAR);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 100;
	            this.match(JSONPathParser.NUMBER);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 101;
	            this.match(JSONPathParser.STRING);
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 102;
	            this.match(JSONPathParser.T__0);
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 103;
	            this.identifier();
	            break;

	        case 9:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 104;
	            this.filterExpression();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	filterExpression() {
	    let localctx = new FilterExpressionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, JSONPathParser.RULE_filterExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 107;
	        this.match(JSONPathParser.QUESTION);
	        this.state = 108;
	        this.match(JSONPathParser.PAREN_LEFT);
	        this.state = 109;
	        this.expression(0);
	        this.state = 110;
	        this.match(JSONPathParser.PAREN_RIGHT);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	indexes() {
	    let localctx = new IndexesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, JSONPathParser.RULE_indexes);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        this.match(JSONPathParser.NUMBER);
	        this.state = 115; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 113;
	            this.match(JSONPathParser.COMMA);
	            this.state = 114;
	            this.match(JSONPathParser.NUMBER);
	            this.state = 117; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===33);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	unions() {
	    let localctx = new UnionsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, JSONPathParser.RULE_unions);
	    var _la = 0;
	    try {
	        this.state = 133;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 45:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 119;
	            this.match(JSONPathParser.STRING);
	            this.state = 122; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 120;
	                this.match(JSONPathParser.COMMA);
	                this.state = 121;
	                this.match(JSONPathParser.STRING);
	                this.state = 124; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===33);
	            break;
	        case 25:
	        case 26:
	        case 27:
	        case 42:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 126;
	            this.identifier();
	            this.state = 129; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 127;
	                this.match(JSONPathParser.COMMA);
	                this.state = 128;
	                this.identifier();
	                this.state = 131; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===33);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	slices() {
	    let localctx = new SlicesContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, JSONPathParser.RULE_slices);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 136;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===44) {
	            this.state = 135;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 138;
	        this.match(JSONPathParser.COLON);
	        this.state = 140;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===44) {
	            this.state = 139;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 146;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===32) {
	            this.state = 142;
	            this.match(JSONPathParser.COLON);
	            this.state = 144;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===44) {
	                this.state = 143;
	                this.match(JSONPathParser.NUMBER);
	            }

	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	regex() {
	    let localctx = new RegexContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, JSONPathParser.RULE_regex);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 148;
	        this.match(JSONPathParser.REGEX_EXPR);
	        this.state = 150;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        if(la_===1) {
	            this.state = 149;
	            this.match(JSONPathParser.REGEX_OPT);

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, JSONPathParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 153;
	            this.match(JSONPathParser.NOT);
	            this.state = 154;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 155;
	            this.expression(0);
	            this.state = 156;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 2:
	            this.state = 158;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 159;
	            this.expression(0);
	            this.state = 160;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 3:
	            this.state = 162;
	            this.filterarg(0);
	            this.state = 163;
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 4177664) !== 0))) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 164;
	            this.filterarg(0);
	            break;

	        case 4:
	            this.state = 166;
	            this.filterarg(0);
	            this.state = 167;
	            this.match(JSONPathParser.REG);
	            this.state = 168;
	            this.regex();
	            break;

	        case 5:
	            this.state = 170;
	            this.filterarg(0);
	            this.state = 171;
	            this.match(JSONPathParser.EMPT);
	            break;

	        case 6:
	            this.state = 173;
	            this.filterpath();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 181;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,22,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new ExpressionContext(this, _parentctx, _parentState);
	                this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_expression);
	                this.state = 176;
	                if (!( this.precpred(this._ctx, 5))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                }
	                this.state = 177;
	                _la = this._input.LA(1);
	                if(!(_la===7 || _la===24)) {
	                this._errHandler.recoverInline(this);
	                }
	                else {
	                	this._errHandler.reportMatch(this);
	                    this.consume();
	                }
	                this.state = 178;
	                this.expression(6); 
	            }
	            this.state = 183;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,22,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	filterpath() {
	    let localctx = new FilterpathContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, JSONPathParser.RULE_filterpath);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 184;
	        _la = this._input.LA(1);
	        if(!(_la===2 || _la===4)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 186;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 185;
	            this.subscript();

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	identifier() {
	    let localctx = new IdentifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, JSONPathParser.RULE_identifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 188;
	        _la = this._input.LA(1);
	        if(!(((((_la - 25)) & ~0x1f) === 0 && ((1 << (_la - 25)) & 131079) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	obj() {
	    let localctx = new ObjContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, JSONPathParser.RULE_obj);
	    var _la = 0;
	    try {
	        this.state = 203;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 190;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 191;
	            this.pair();
	            this.state = 196;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===33) {
	                this.state = 192;
	                this.match(JSONPathParser.COMMA);
	                this.state = 193;
	                this.pair();
	                this.state = 198;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 199;
	            this.match(JSONPathParser.BRACE_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 201;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 202;
	            this.match(JSONPathParser.BRACE_RIGHT);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	pair() {
	    let localctx = new PairContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, JSONPathParser.RULE_pair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 205;
	        this.match(JSONPathParser.STRING);
	        this.state = 206;
	        this.match(JSONPathParser.COLON);
	        this.state = 207;
	        this.value();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	array() {
	    let localctx = new ArrayContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, JSONPathParser.RULE_array);
	    var _la = 0;
	    try {
	        this.state = 222;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 209;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 210;
	            this.value();
	            this.state = 215;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===33) {
	                this.state = 211;
	                this.match(JSONPathParser.COMMA);
	                this.state = 212;
	                this.value();
	                this.state = 217;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 218;
	            this.match(JSONPathParser.BRACKET_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 220;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 221;
	            this.match(JSONPathParser.BRACKET_RIGHT);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, JSONPathParser.RULE_value);
	    try {
	        this.state = 231;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 45:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 224;
	            this.match(JSONPathParser.STRING);
	            break;
	        case 44:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 225;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 28:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 226;
	            this.obj();
	            break;
	        case 30:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 227;
	            this.array();
	            break;
	        case 25:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 228;
	            this.match(JSONPathParser.TRUE);
	            break;
	        case 26:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 229;
	            this.match(JSONPathParser.FALSE);
	            break;
	        case 27:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 230;
	            this.match(JSONPathParser.NULL);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

JSONPathParser.EOF = antlr4.Token.EOF;
JSONPathParser.T__0 = 1;
JSONPathParser.CURRENT_VALUE = 2;
JSONPathParser.DOTDOT = 3;
JSONPathParser.ROOT_VALUE = 4;
JSONPathParser.DOT = 5;
JSONPathParser.STAR = 6;
JSONPathParser.AND = 7;
JSONPathParser.EQ = 8;
JSONPathParser.GE = 9;
JSONPathParser.GT = 10;
JSONPathParser.LE = 11;
JSONPathParser.LT = 12;
JSONPathParser.NE = 13;
JSONPathParser.REG = 14;
JSONPathParser.IN = 15;
JSONPathParser.NIN = 16;
JSONPathParser.SUB = 17;
JSONPathParser.ANY = 18;
JSONPathParser.NON = 19;
JSONPathParser.SIZO = 20;
JSONPathParser.SIZ = 21;
JSONPathParser.EMPT = 22;
JSONPathParser.NOT = 23;
JSONPathParser.OR = 24;
JSONPathParser.TRUE = 25;
JSONPathParser.FALSE = 26;
JSONPathParser.NULL = 27;
JSONPathParser.BRACE_LEFT = 28;
JSONPathParser.BRACE_RIGHT = 29;
JSONPathParser.BRACKET_LEFT = 30;
JSONPathParser.BRACKET_RIGHT = 31;
JSONPathParser.COLON = 32;
JSONPathParser.COMMA = 33;
JSONPathParser.PAREN_LEFT = 34;
JSONPathParser.PAREN_RIGHT = 35;
JSONPathParser.QUESTION = 36;
JSONPathParser.MINUS_SP = 37;
JSONPathParser.PLUS = 38;
JSONPathParser.DIV = 39;
JSONPathParser.REGEX_OPT = 40;
JSONPathParser.REGEX_EXPR = 41;
JSONPathParser.KEY = 42;
JSONPathParser.WS = 43;
JSONPathParser.NUMBER = 44;
JSONPathParser.STRING = 45;

JSONPathParser.RULE_jsonpath = 0;
JSONPathParser.RULE_filterarg = 1;
JSONPathParser.RULE_subscript = 2;
JSONPathParser.RULE_dotdotContent = 3;
JSONPathParser.RULE_dotContent = 4;
JSONPathParser.RULE_bracket = 5;
JSONPathParser.RULE_bracketContent = 6;
JSONPathParser.RULE_filterExpression = 7;
JSONPathParser.RULE_indexes = 8;
JSONPathParser.RULE_unions = 9;
JSONPathParser.RULE_slices = 10;
JSONPathParser.RULE_regex = 11;
JSONPathParser.RULE_expression = 12;
JSONPathParser.RULE_filterpath = 13;
JSONPathParser.RULE_identifier = 14;
JSONPathParser.RULE_obj = 15;
JSONPathParser.RULE_pair = 16;
JSONPathParser.RULE_array = 17;
JSONPathParser.RULE_value = 18;

class JsonpathContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_jsonpath;
    }

	ROOT_VALUE() {
	    return this.getToken(JSONPathParser.ROOT_VALUE, 0);
	};

	EOF() {
	    return this.getToken(JSONPathParser.EOF, 0);
	};

	subscript() {
	    return this.getTypedRuleContext(SubscriptContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterJsonpath(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitJsonpath(this);
		}
	}


}



class FilterargContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_filterarg;
    }

	PAREN_LEFT() {
	    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
	};

	filterarg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FilterargContext);
	    } else {
	        return this.getTypedRuleContext(FilterargContext,i);
	    }
	};

	PAREN_RIGHT() {
	    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	filterpath() {
	    return this.getTypedRuleContext(FilterpathContext,0);
	};

	STAR() {
	    return this.getToken(JSONPathParser.STAR, 0);
	};

	DIV() {
	    return this.getToken(JSONPathParser.DIV, 0);
	};

	PLUS() {
	    return this.getToken(JSONPathParser.PLUS, 0);
	};

	MINUS_SP() {
	    return this.getToken(JSONPathParser.MINUS_SP, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterFilterarg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitFilterarg(this);
		}
	}


}



class SubscriptContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_subscript;
    }

	DOTDOT() {
	    return this.getToken(JSONPathParser.DOTDOT, 0);
	};

	dotdotContent() {
	    return this.getTypedRuleContext(DotdotContentContext,0);
	};

	subscript() {
	    return this.getTypedRuleContext(SubscriptContext,0);
	};

	DOT() {
	    return this.getToken(JSONPathParser.DOT, 0);
	};

	dotContent() {
	    return this.getTypedRuleContext(DotContentContext,0);
	};

	bracket() {
	    return this.getTypedRuleContext(BracketContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterSubscript(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitSubscript(this);
		}
	}


}



class DotdotContentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_dotdotContent;
    }

	STAR() {
	    return this.getToken(JSONPathParser.STAR, 0);
	};

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	bracket() {
	    return this.getTypedRuleContext(BracketContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterDotdotContent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitDotdotContent(this);
		}
	}


}



class DotContentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_dotContent;
    }

	STAR() {
	    return this.getToken(JSONPathParser.STAR, 0);
	};

	NUMBER() {
	    return this.getToken(JSONPathParser.NUMBER, 0);
	};

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterDotContent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitDotContent(this);
		}
	}


}



class BracketContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_bracket;
    }

	BRACKET_LEFT() {
	    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
	};

	bracketContent() {
	    return this.getTypedRuleContext(BracketContentContext,0);
	};

	BRACKET_RIGHT() {
	    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterBracket(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitBracket(this);
		}
	}


}



class BracketContentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_bracketContent;
    }

	unions() {
	    return this.getTypedRuleContext(UnionsContext,0);
	};

	indexes() {
	    return this.getTypedRuleContext(IndexesContext,0);
	};

	slices() {
	    return this.getTypedRuleContext(SlicesContext,0);
	};

	STAR() {
	    return this.getToken(JSONPathParser.STAR, 0);
	};

	NUMBER() {
	    return this.getToken(JSONPathParser.NUMBER, 0);
	};

	STRING() {
	    return this.getToken(JSONPathParser.STRING, 0);
	};

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	filterExpression() {
	    return this.getTypedRuleContext(FilterExpressionContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterBracketContent(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitBracketContent(this);
		}
	}


}



class FilterExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_filterExpression;
    }

	QUESTION() {
	    return this.getToken(JSONPathParser.QUESTION, 0);
	};

	PAREN_LEFT() {
	    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	PAREN_RIGHT() {
	    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterFilterExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitFilterExpression(this);
		}
	}


}



class IndexesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_indexes;
    }

	NUMBER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.NUMBER);
	    } else {
	        return this.getToken(JSONPathParser.NUMBER, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.COMMA);
	    } else {
	        return this.getToken(JSONPathParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterIndexes(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitIndexes(this);
		}
	}


}



class UnionsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_unions;
    }

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.STRING);
	    } else {
	        return this.getToken(JSONPathParser.STRING, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.COMMA);
	    } else {
	        return this.getToken(JSONPathParser.COMMA, i);
	    }
	};


	identifier = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(IdentifierContext);
	    } else {
	        return this.getTypedRuleContext(IdentifierContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterUnions(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitUnions(this);
		}
	}


}



class SlicesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_slices;
    }

	COLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.COLON);
	    } else {
	        return this.getToken(JSONPathParser.COLON, i);
	    }
	};


	NUMBER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.NUMBER);
	    } else {
	        return this.getToken(JSONPathParser.NUMBER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterSlices(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitSlices(this);
		}
	}


}



class RegexContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_regex;
    }

	REGEX_EXPR() {
	    return this.getToken(JSONPathParser.REGEX_EXPR, 0);
	};

	REGEX_OPT() {
	    return this.getToken(JSONPathParser.REGEX_OPT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterRegex(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitRegex(this);
		}
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_expression;
    }

	NOT() {
	    return this.getToken(JSONPathParser.NOT, 0);
	};

	PAREN_LEFT() {
	    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
	};

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	PAREN_RIGHT() {
	    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
	};

	filterarg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FilterargContext);
	    } else {
	        return this.getTypedRuleContext(FilterargContext,i);
	    }
	};

	EQ() {
	    return this.getToken(JSONPathParser.EQ, 0);
	};

	NE() {
	    return this.getToken(JSONPathParser.NE, 0);
	};

	LT() {
	    return this.getToken(JSONPathParser.LT, 0);
	};

	LE() {
	    return this.getToken(JSONPathParser.LE, 0);
	};

	GT() {
	    return this.getToken(JSONPathParser.GT, 0);
	};

	GE() {
	    return this.getToken(JSONPathParser.GE, 0);
	};

	IN() {
	    return this.getToken(JSONPathParser.IN, 0);
	};

	NIN() {
	    return this.getToken(JSONPathParser.NIN, 0);
	};

	SUB() {
	    return this.getToken(JSONPathParser.SUB, 0);
	};

	ANY() {
	    return this.getToken(JSONPathParser.ANY, 0);
	};

	SIZO() {
	    return this.getToken(JSONPathParser.SIZO, 0);
	};

	NON() {
	    return this.getToken(JSONPathParser.NON, 0);
	};

	SIZ() {
	    return this.getToken(JSONPathParser.SIZ, 0);
	};

	REG() {
	    return this.getToken(JSONPathParser.REG, 0);
	};

	regex() {
	    return this.getTypedRuleContext(RegexContext,0);
	};

	EMPT() {
	    return this.getToken(JSONPathParser.EMPT, 0);
	};

	filterpath() {
	    return this.getTypedRuleContext(FilterpathContext,0);
	};

	AND() {
	    return this.getToken(JSONPathParser.AND, 0);
	};

	OR() {
	    return this.getToken(JSONPathParser.OR, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterExpression(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitExpression(this);
		}
	}


}



class FilterpathContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_filterpath;
    }

	ROOT_VALUE() {
	    return this.getToken(JSONPathParser.ROOT_VALUE, 0);
	};

	CURRENT_VALUE() {
	    return this.getToken(JSONPathParser.CURRENT_VALUE, 0);
	};

	subscript() {
	    return this.getTypedRuleContext(SubscriptContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterFilterpath(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitFilterpath(this);
		}
	}


}



class IdentifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_identifier;
    }

	KEY() {
	    return this.getToken(JSONPathParser.KEY, 0);
	};

	TRUE() {
	    return this.getToken(JSONPathParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(JSONPathParser.FALSE, 0);
	};

	NULL() {
	    return this.getToken(JSONPathParser.NULL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitIdentifier(this);
		}
	}


}



class ObjContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_obj;
    }

	BRACE_LEFT() {
	    return this.getToken(JSONPathParser.BRACE_LEFT, 0);
	};

	pair = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(PairContext);
	    } else {
	        return this.getTypedRuleContext(PairContext,i);
	    }
	};

	BRACE_RIGHT() {
	    return this.getToken(JSONPathParser.BRACE_RIGHT, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.COMMA);
	    } else {
	        return this.getToken(JSONPathParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterObj(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitObj(this);
		}
	}


}



class PairContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_pair;
    }

	STRING() {
	    return this.getToken(JSONPathParser.STRING, 0);
	};

	COLON() {
	    return this.getToken(JSONPathParser.COLON, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterPair(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitPair(this);
		}
	}


}



class ArrayContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_array;
    }

	BRACKET_LEFT() {
	    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
	};

	value = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ValueContext);
	    } else {
	        return this.getTypedRuleContext(ValueContext,i);
	    }
	};

	BRACKET_RIGHT() {
	    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(JSONPathParser.COMMA);
	    } else {
	        return this.getToken(JSONPathParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterArray(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitArray(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_value;
    }

	STRING() {
	    return this.getToken(JSONPathParser.STRING, 0);
	};

	NUMBER() {
	    return this.getToken(JSONPathParser.NUMBER, 0);
	};

	obj() {
	    return this.getTypedRuleContext(ObjContext,0);
	};

	array() {
	    return this.getTypedRuleContext(ArrayContext,0);
	};

	TRUE() {
	    return this.getToken(JSONPathParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(JSONPathParser.FALSE, 0);
	};

	NULL() {
	    return this.getToken(JSONPathParser.NULL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitValue(this);
		}
	}


}




JSONPathParser.JsonpathContext = JsonpathContext; 
JSONPathParser.FilterargContext = FilterargContext; 
JSONPathParser.SubscriptContext = SubscriptContext; 
JSONPathParser.DotdotContentContext = DotdotContentContext; 
JSONPathParser.DotContentContext = DotContentContext; 
JSONPathParser.BracketContext = BracketContext; 
JSONPathParser.BracketContentContext = BracketContentContext; 
JSONPathParser.FilterExpressionContext = FilterExpressionContext; 
JSONPathParser.IndexesContext = IndexesContext; 
JSONPathParser.UnionsContext = UnionsContext; 
JSONPathParser.SlicesContext = SlicesContext; 
JSONPathParser.RegexContext = RegexContext; 
JSONPathParser.ExpressionContext = ExpressionContext; 
JSONPathParser.FilterpathContext = FilterpathContext; 
JSONPathParser.IdentifierContext = IdentifierContext; 
JSONPathParser.ObjContext = ObjContext; 
JSONPathParser.PairContext = PairContext; 
JSONPathParser.ArrayContext = ArrayContext; 
JSONPathParser.ValueContext = ValueContext; 
