// Generated from src/parser/generated/JSONPath.g4 by ANTLR 4.13.1
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONPathListener from './JSONPathListener.js';
const serializedATN = [4,1,44,237,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,
0,1,0,3,0,43,8,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,54,8,1,1,1,1,1,
1,1,1,1,1,1,3,1,61,8,1,1,1,5,1,64,8,1,10,1,12,1,67,9,1,1,2,1,2,1,2,3,2,72,
8,2,1,2,1,2,1,2,3,2,77,8,2,1,2,1,2,3,2,81,8,2,3,2,83,8,2,1,3,1,3,1,3,3,3,
88,8,3,1,4,1,4,1,4,3,4,93,8,4,1,5,1,5,1,5,1,5,1,6,1,6,1,6,1,6,1,6,1,6,1,
6,1,6,3,6,107,8,6,1,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,4,8,117,8,8,11,8,12,8,
118,1,9,1,9,1,9,4,9,124,8,9,11,9,12,9,125,1,9,1,9,1,9,4,9,131,8,9,11,9,12,
9,132,3,9,135,8,9,1,10,3,10,138,8,10,1,10,1,10,3,10,142,8,10,1,10,1,10,3,
10,146,8,10,3,10,148,8,10,1,11,1,11,3,11,152,8,11,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,3,12,176,8,12,1,12,1,12,1,12,5,12,181,8,12,10,12,12,12,184,
9,12,1,13,1,13,3,13,188,8,13,1,14,1,14,1,15,1,15,1,16,1,16,1,16,1,16,5,16,
198,8,16,10,16,12,16,201,9,16,1,16,1,16,1,16,1,16,3,16,207,8,16,1,17,1,17,
1,17,1,17,1,18,1,18,1,18,1,18,5,18,217,8,18,10,18,12,18,220,9,18,1,18,1,
18,1,18,1,18,3,18,226,8,18,1,19,1,19,1,19,1,19,1,19,1,19,1,19,3,19,235,8,
19,1,19,0,2,2,24,20,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
38,0,6,2,0,5,5,38,38,1,0,36,37,2,0,7,12,14,20,2,0,6,6,23,23,2,0,1,1,3,3,
2,0,24,26,41,41,264,0,40,1,0,0,0,2,53,1,0,0,0,4,82,1,0,0,0,6,87,1,0,0,0,
8,92,1,0,0,0,10,94,1,0,0,0,12,106,1,0,0,0,14,108,1,0,0,0,16,113,1,0,0,0,
18,134,1,0,0,0,20,137,1,0,0,0,22,149,1,0,0,0,24,175,1,0,0,0,26,185,1,0,0,
0,28,189,1,0,0,0,30,191,1,0,0,0,32,206,1,0,0,0,34,208,1,0,0,0,36,225,1,0,
0,0,38,234,1,0,0,0,40,42,5,3,0,0,41,43,3,4,2,0,42,41,1,0,0,0,42,43,1,0,0,
0,43,44,1,0,0,0,44,45,5,0,0,1,45,1,1,0,0,0,46,47,6,1,-1,0,47,48,5,33,0,0,
48,49,3,2,1,0,49,50,5,34,0,0,50,54,1,0,0,0,51,54,3,38,19,0,52,54,3,26,13,
0,53,46,1,0,0,0,53,51,1,0,0,0,53,52,1,0,0,0,54,65,1,0,0,0,55,56,10,4,0,0,
56,57,7,0,0,0,57,64,3,2,1,5,58,60,10,3,0,0,59,61,7,1,0,0,60,59,1,0,0,0,60,
61,1,0,0,0,61,62,1,0,0,0,62,64,3,2,1,4,63,55,1,0,0,0,63,58,1,0,0,0,64,67,
1,0,0,0,65,63,1,0,0,0,65,66,1,0,0,0,66,3,1,0,0,0,67,65,1,0,0,0,68,69,5,2,
0,0,69,71,3,6,3,0,70,72,3,4,2,0,71,70,1,0,0,0,71,72,1,0,0,0,72,83,1,0,0,
0,73,74,5,4,0,0,74,76,3,8,4,0,75,77,3,4,2,0,76,75,1,0,0,0,76,77,1,0,0,0,
77,83,1,0,0,0,78,80,3,10,5,0,79,81,3,4,2,0,80,79,1,0,0,0,80,81,1,0,0,0,81,
83,1,0,0,0,82,68,1,0,0,0,82,73,1,0,0,0,82,78,1,0,0,0,83,5,1,0,0,0,84,88,
5,5,0,0,85,88,3,28,14,0,86,88,3,10,5,0,87,84,1,0,0,0,87,85,1,0,0,0,87,86,
1,0,0,0,88,7,1,0,0,0,89,93,5,5,0,0,90,93,5,43,0,0,91,93,3,28,14,0,92,89,
1,0,0,0,92,90,1,0,0,0,92,91,1,0,0,0,93,9,1,0,0,0,94,95,5,29,0,0,95,96,3,
12,6,0,96,97,5,30,0,0,97,11,1,0,0,0,98,107,3,18,9,0,99,107,3,16,8,0,100,
107,3,20,10,0,101,107,5,5,0,0,102,107,5,43,0,0,103,107,5,42,0,0,104,107,
3,28,14,0,105,107,3,14,7,0,106,98,1,0,0,0,106,99,1,0,0,0,106,100,1,0,0,0,
106,101,1,0,0,0,106,102,1,0,0,0,106,103,1,0,0,0,106,104,1,0,0,0,106,105,
1,0,0,0,107,13,1,0,0,0,108,109,5,35,0,0,109,110,5,33,0,0,110,111,3,24,12,
0,111,112,5,34,0,0,112,15,1,0,0,0,113,116,5,43,0,0,114,115,5,32,0,0,115,
117,5,43,0,0,116,114,1,0,0,0,117,118,1,0,0,0,118,116,1,0,0,0,118,119,1,0,
0,0,119,17,1,0,0,0,120,123,5,42,0,0,121,122,5,32,0,0,122,124,5,42,0,0,123,
121,1,0,0,0,124,125,1,0,0,0,125,123,1,0,0,0,125,126,1,0,0,0,126,135,1,0,
0,0,127,130,3,28,14,0,128,129,5,32,0,0,129,131,3,28,14,0,130,128,1,0,0,0,
131,132,1,0,0,0,132,130,1,0,0,0,132,133,1,0,0,0,133,135,1,0,0,0,134,120,
1,0,0,0,134,127,1,0,0,0,135,19,1,0,0,0,136,138,5,43,0,0,137,136,1,0,0,0,
137,138,1,0,0,0,138,139,1,0,0,0,139,141,5,31,0,0,140,142,5,43,0,0,141,140,
1,0,0,0,141,142,1,0,0,0,142,147,1,0,0,0,143,145,5,31,0,0,144,146,5,43,0,
0,145,144,1,0,0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,143,1,0,0,0,147,148,
1,0,0,0,148,21,1,0,0,0,149,151,5,40,0,0,150,152,5,39,0,0,151,150,1,0,0,0,
151,152,1,0,0,0,152,23,1,0,0,0,153,154,6,12,-1,0,154,155,5,22,0,0,155,156,
5,33,0,0,156,157,3,24,12,0,157,158,5,34,0,0,158,176,1,0,0,0,159,160,5,33,
0,0,160,161,3,24,12,0,161,162,5,34,0,0,162,176,1,0,0,0,163,164,3,2,1,0,164,
165,7,2,0,0,165,166,3,2,1,0,166,176,1,0,0,0,167,168,3,2,1,0,168,169,5,13,
0,0,169,170,3,22,11,0,170,176,1,0,0,0,171,172,3,2,1,0,172,173,5,21,0,0,173,
176,1,0,0,0,174,176,3,26,13,0,175,153,1,0,0,0,175,159,1,0,0,0,175,163,1,
0,0,0,175,167,1,0,0,0,175,171,1,0,0,0,175,174,1,0,0,0,176,182,1,0,0,0,177,
178,10,5,0,0,178,179,7,3,0,0,179,181,3,24,12,6,180,177,1,0,0,0,181,184,1,
0,0,0,182,180,1,0,0,0,182,183,1,0,0,0,183,25,1,0,0,0,184,182,1,0,0,0,185,
187,7,4,0,0,186,188,3,4,2,0,187,186,1,0,0,0,187,188,1,0,0,0,188,27,1,0,0,
0,189,190,7,5,0,0,190,29,1,0,0,0,191,192,3,38,19,0,192,31,1,0,0,0,193,194,
5,27,0,0,194,199,3,34,17,0,195,196,5,32,0,0,196,198,3,34,17,0,197,195,1,
0,0,0,198,201,1,0,0,0,199,197,1,0,0,0,199,200,1,0,0,0,200,202,1,0,0,0,201,
199,1,0,0,0,202,203,5,28,0,0,203,207,1,0,0,0,204,205,5,27,0,0,205,207,5,
28,0,0,206,193,1,0,0,0,206,204,1,0,0,0,207,33,1,0,0,0,208,209,5,42,0,0,209,
210,5,31,0,0,210,211,3,38,19,0,211,35,1,0,0,0,212,213,5,29,0,0,213,218,3,
38,19,0,214,215,5,32,0,0,215,217,3,38,19,0,216,214,1,0,0,0,217,220,1,0,0,
0,218,216,1,0,0,0,218,219,1,0,0,0,219,221,1,0,0,0,220,218,1,0,0,0,221,222,
5,30,0,0,222,226,1,0,0,0,223,224,5,29,0,0,224,226,5,30,0,0,225,212,1,0,0,
0,225,223,1,0,0,0,226,37,1,0,0,0,227,235,5,42,0,0,228,235,5,43,0,0,229,235,
3,32,16,0,230,235,3,36,18,0,231,235,5,24,0,0,232,235,5,25,0,0,233,235,5,
26,0,0,234,227,1,0,0,0,234,228,1,0,0,0,234,229,1,0,0,0,234,230,1,0,0,0,234,
231,1,0,0,0,234,232,1,0,0,0,234,233,1,0,0,0,235,39,1,0,0,0,29,42,53,60,63,
65,71,76,80,82,87,92,106,118,125,132,134,137,141,145,147,151,175,182,187,
199,206,218,225,234];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class JSONPathParser extends antlr4.Parser {

    static grammarFileName = "JSONPath.g4";
    static literalNames = [ null, "'@'", "'..'", "'$'", "'.'", "'*'", "'&&'", 
                            "'=='", "'>='", "'>'", "'<='", "'<'", "'!='", 
                            "'=~'", "' in '", "' nin '", "' subsetof '", 
                            "' anyof '", "' noneof '", "' sizeof '", "' size '", 
                            "' empty'", "'!'", "'||'", "'true'", "'false'", 
                            "'null'", "'{'", "'}'", "'['", "']'", "':'", 
                            "','", "'('", "')'", "'?'", "'- '", "'+'", "'/'" ];
    static symbolicNames = [ null, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", 
                             "DOT", "STAR", "AND", "EQ", "GE", "GT", "LE", 
                             "LT", "NE", "REG", "IN", "NIN", "SUB", "ANY", 
                             "NON", "SIZO", "SIZ", "EMPT", "NOT", "OR", 
                             "TRUE", "FALSE", "NULL", "BRACE_LEFT", "BRACE_RIGHT", 
                             "BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", 
                             "PAREN_LEFT", "PAREN_RIGHT", "QUESTION", "MINUS_SP", 
                             "PLUS", "DIV", "REGEX_OPT", "REGEX_EXPR", "KEY", 
                             "STRING", "NUMBER", "WS" ];
    static ruleNames = [ "jsonpath", "filterarg", "subscript", "dotdotContent", 
                         "dotContent", "bracket", "bracketContent", "filterExpression", 
                         "indexes", "unions", "slices", "regex", "expression", 
                         "filterpath", "identifier", "json", "obj", "pair", 
                         "array", "value" ];

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
	        this.state = 40;
	        this.match(JSONPathParser.ROOT_VALUE);
	        this.state = 42;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 536870932) !== 0)) {
	            this.state = 41;
	            this.subscript();
	        }

	        this.state = 44;
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
	        this.state = 53;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 33:
	            this.state = 47;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 48;
	            this.filterarg(0);
	            this.state = 49;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 29:
	        case 42:
	        case 43:
	            this.state = 51;
	            this.value();
	            break;
	        case 1:
	        case 3:
	            this.state = 52;
	            this.filterpath();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 65;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 63;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 55;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 56;
	                    _la = this._input.LA(1);
	                    if(!(_la===5 || _la===38)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 57;
	                    this.filterarg(5);
	                    break;

	                case 2:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 58;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 60;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===36 || _la===37) {
	                        this.state = 59;
	                        _la = this._input.LA(1);
	                        if(!(_la===36 || _la===37)) {
	                        this._errHandler.recoverInline(this);
	                        }
	                        else {
	                        	this._errHandler.reportMatch(this);
	                            this.consume();
	                        }
	                    }

	                    this.state = 62;
	                    this.filterarg(4);
	                    break;

	                } 
	            }
	            this.state = 67;
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
	        this.state = 82;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 2:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 68;
	            this.match(JSONPathParser.DOTDOT);
	            this.state = 69;
	            this.dotdotContent();
	            this.state = 71;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	            if(la_===1) {
	                this.state = 70;
	                this.subscript();

	            }
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 73;
	            this.match(JSONPathParser.DOT);
	            this.state = 74;
	            this.dotContent();
	            this.state = 76;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	            if(la_===1) {
	                this.state = 75;
	                this.subscript();

	            }
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 78;
	            this.bracket();
	            this.state = 80;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	            if(la_===1) {
	                this.state = 79;
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
	        this.state = 87;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 5:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 84;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 41:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 85;
	            this.identifier();
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 86;
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
	        this.state = 92;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 5:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 89;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 43:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 90;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 41:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 91;
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
	        this.state = 94;
	        this.match(JSONPathParser.BRACKET_LEFT);
	        this.state = 95;
	        this.bracketContent();
	        this.state = 96;
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
	        this.state = 106;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 98;
	            this.unions();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 99;
	            this.indexes();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 100;
	            this.slices();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 101;
	            this.match(JSONPathParser.STAR);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 102;
	            this.match(JSONPathParser.NUMBER);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 103;
	            this.match(JSONPathParser.STRING);
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 104;
	            this.identifier();
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 105;
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
	        this.state = 108;
	        this.match(JSONPathParser.QUESTION);
	        this.state = 109;
	        this.match(JSONPathParser.PAREN_LEFT);
	        this.state = 110;
	        this.expression(0);
	        this.state = 111;
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
	        this.state = 113;
	        this.match(JSONPathParser.NUMBER);
	        this.state = 116; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 114;
	            this.match(JSONPathParser.COMMA);
	            this.state = 115;
	            this.match(JSONPathParser.NUMBER);
	            this.state = 118; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===32);
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
	        this.state = 134;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 42:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 120;
	            this.match(JSONPathParser.STRING);
	            this.state = 123; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 121;
	                this.match(JSONPathParser.COMMA);
	                this.state = 122;
	                this.match(JSONPathParser.STRING);
	                this.state = 125; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===32);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 41:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 127;
	            this.identifier();
	            this.state = 130; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 128;
	                this.match(JSONPathParser.COMMA);
	                this.state = 129;
	                this.identifier();
	                this.state = 132; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===32);
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
	        this.state = 137;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===43) {
	            this.state = 136;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 139;
	        this.match(JSONPathParser.COLON);
	        this.state = 141;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===43) {
	            this.state = 140;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 147;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===31) {
	            this.state = 143;
	            this.match(JSONPathParser.COLON);
	            this.state = 145;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===43) {
	                this.state = 144;
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
	        this.state = 149;
	        this.match(JSONPathParser.REGEX_EXPR);
	        this.state = 151;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        if(la_===1) {
	            this.state = 150;
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
	        this.state = 175;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 154;
	            this.match(JSONPathParser.NOT);
	            this.state = 155;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 156;
	            this.expression(0);
	            this.state = 157;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 2:
	            this.state = 159;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 160;
	            this.expression(0);
	            this.state = 161;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 3:
	            this.state = 163;
	            this.filterarg(0);
	            this.state = 164;
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 2088832) !== 0))) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 165;
	            this.filterarg(0);
	            break;

	        case 4:
	            this.state = 167;
	            this.filterarg(0);
	            this.state = 168;
	            this.match(JSONPathParser.REG);
	            this.state = 169;
	            this.regex();
	            break;

	        case 5:
	            this.state = 171;
	            this.filterarg(0);
	            this.state = 172;
	            this.match(JSONPathParser.EMPT);
	            break;

	        case 6:
	            this.state = 174;
	            this.filterpath();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 182;
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
	                this.state = 177;
	                if (!( this.precpred(this._ctx, 5))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                }
	                this.state = 178;
	                _la = this._input.LA(1);
	                if(!(_la===6 || _la===23)) {
	                this._errHandler.recoverInline(this);
	                }
	                else {
	                	this._errHandler.reportMatch(this);
	                    this.consume();
	                }
	                this.state = 179;
	                this.expression(6); 
	            }
	            this.state = 184;
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
	        this.state = 185;
	        _la = this._input.LA(1);
	        if(!(_la===1 || _la===3)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 187;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 186;
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
	        this.state = 189;
	        _la = this._input.LA(1);
	        if(!(((((_la - 24)) & ~0x1f) === 0 && ((1 << (_la - 24)) & 131079) !== 0))) {
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



	json() {
	    let localctx = new JsonContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, JSONPathParser.RULE_json);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
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



	obj() {
	    let localctx = new ObjContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, JSONPathParser.RULE_obj);
	    var _la = 0;
	    try {
	        this.state = 206;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 193;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 194;
	            this.pair();
	            this.state = 199;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===32) {
	                this.state = 195;
	                this.match(JSONPathParser.COMMA);
	                this.state = 196;
	                this.pair();
	                this.state = 201;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 202;
	            this.match(JSONPathParser.BRACE_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 204;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 205;
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
	    this.enterRule(localctx, 34, JSONPathParser.RULE_pair);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 208;
	        this.match(JSONPathParser.STRING);
	        this.state = 209;
	        this.match(JSONPathParser.COLON);
	        this.state = 210;
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
	    this.enterRule(localctx, 36, JSONPathParser.RULE_array);
	    var _la = 0;
	    try {
	        this.state = 225;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 212;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 213;
	            this.value();
	            this.state = 218;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===32) {
	                this.state = 214;
	                this.match(JSONPathParser.COMMA);
	                this.state = 215;
	                this.value();
	                this.state = 220;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 221;
	            this.match(JSONPathParser.BRACKET_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 223;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 224;
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
	    this.enterRule(localctx, 38, JSONPathParser.RULE_value);
	    try {
	        this.state = 234;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 42:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 227;
	            this.match(JSONPathParser.STRING);
	            break;
	        case 43:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 228;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 27:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 229;
	            this.obj();
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 230;
	            this.array();
	            break;
	        case 24:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 231;
	            this.match(JSONPathParser.TRUE);
	            break;
	        case 25:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 232;
	            this.match(JSONPathParser.FALSE);
	            break;
	        case 26:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 233;
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
JSONPathParser.CURRENT_VALUE = 1;
JSONPathParser.DOTDOT = 2;
JSONPathParser.ROOT_VALUE = 3;
JSONPathParser.DOT = 4;
JSONPathParser.STAR = 5;
JSONPathParser.AND = 6;
JSONPathParser.EQ = 7;
JSONPathParser.GE = 8;
JSONPathParser.GT = 9;
JSONPathParser.LE = 10;
JSONPathParser.LT = 11;
JSONPathParser.NE = 12;
JSONPathParser.REG = 13;
JSONPathParser.IN = 14;
JSONPathParser.NIN = 15;
JSONPathParser.SUB = 16;
JSONPathParser.ANY = 17;
JSONPathParser.NON = 18;
JSONPathParser.SIZO = 19;
JSONPathParser.SIZ = 20;
JSONPathParser.EMPT = 21;
JSONPathParser.NOT = 22;
JSONPathParser.OR = 23;
JSONPathParser.TRUE = 24;
JSONPathParser.FALSE = 25;
JSONPathParser.NULL = 26;
JSONPathParser.BRACE_LEFT = 27;
JSONPathParser.BRACE_RIGHT = 28;
JSONPathParser.BRACKET_LEFT = 29;
JSONPathParser.BRACKET_RIGHT = 30;
JSONPathParser.COLON = 31;
JSONPathParser.COMMA = 32;
JSONPathParser.PAREN_LEFT = 33;
JSONPathParser.PAREN_RIGHT = 34;
JSONPathParser.QUESTION = 35;
JSONPathParser.MINUS_SP = 36;
JSONPathParser.PLUS = 37;
JSONPathParser.DIV = 38;
JSONPathParser.REGEX_OPT = 39;
JSONPathParser.REGEX_EXPR = 40;
JSONPathParser.KEY = 41;
JSONPathParser.STRING = 42;
JSONPathParser.NUMBER = 43;
JSONPathParser.WS = 44;

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
JSONPathParser.RULE_json = 15;
JSONPathParser.RULE_obj = 16;
JSONPathParser.RULE_pair = 17;
JSONPathParser.RULE_array = 18;
JSONPathParser.RULE_value = 19;

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



class JsonContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_json;
    }

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterJson(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitJson(this);
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
JSONPathParser.JsonContext = JsonContext; 
JSONPathParser.ObjContext = ObjContext; 
JSONPathParser.PairContext = PairContext; 
JSONPathParser.ArrayContext = ArrayContext; 
JSONPathParser.ValueContext = ValueContext; 
