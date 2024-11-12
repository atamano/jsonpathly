// Generated from ./src/parser/generated/JSONPath.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONPathListener from './JSONPathListener.js';
const serializedATN = [4,1,46,241,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,1,
0,1,0,3,0,43,8,0,1,0,1,0,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,56,8,2,
1,2,1,2,1,2,1,2,1,2,3,2,63,8,2,1,2,5,2,66,8,2,10,2,12,2,69,9,2,1,3,1,3,1,
3,3,3,74,8,3,1,3,1,3,1,3,3,3,79,8,3,1,3,1,3,3,3,83,8,3,3,3,85,8,3,1,4,1,
4,1,4,3,4,90,8,4,1,5,1,5,1,5,1,5,3,5,96,8,5,1,6,1,6,1,6,1,6,1,7,1,7,1,7,
1,7,1,7,1,7,1,7,1,7,3,7,110,8,7,1,8,1,8,1,8,1,8,1,8,1,9,1,9,1,9,4,9,120,
8,9,11,9,12,9,121,1,10,1,10,1,10,4,10,127,8,10,11,10,12,10,128,1,10,1,10,
1,10,4,10,134,8,10,11,10,12,10,135,3,10,138,8,10,1,11,3,11,141,8,11,1,11,
1,11,3,11,145,8,11,1,11,1,11,3,11,149,8,11,3,11,151,8,11,1,12,1,12,3,12,
155,8,12,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,3,13,182,8,13,
1,13,1,13,1,13,5,13,187,8,13,10,13,12,13,190,9,13,1,14,1,14,3,14,194,8,14,
1,15,1,15,1,16,1,16,1,16,1,16,5,16,202,8,16,10,16,12,16,205,9,16,1,16,1,
16,1,16,1,16,3,16,211,8,16,1,17,1,17,1,17,1,17,1,18,1,18,1,18,1,18,5,18,
221,8,18,10,18,12,18,224,9,18,1,18,1,18,1,18,1,18,3,18,230,8,18,1,19,1,19,
1,19,1,19,1,19,1,19,1,19,3,19,239,8,19,1,19,0,2,4,26,20,0,2,4,6,8,10,12,
14,16,18,20,22,24,26,28,30,32,34,36,38,0,6,2,0,5,5,38,38,1,0,36,37,2,0,7,
12,14,20,2,0,6,6,23,23,2,0,1,1,3,3,2,0,24,26,42,43,272,0,40,1,0,0,0,2,46,
1,0,0,0,4,55,1,0,0,0,6,84,1,0,0,0,8,89,1,0,0,0,10,95,1,0,0,0,12,97,1,0,0,
0,14,109,1,0,0,0,16,111,1,0,0,0,18,116,1,0,0,0,20,137,1,0,0,0,22,140,1,0,
0,0,24,152,1,0,0,0,26,181,1,0,0,0,28,191,1,0,0,0,30,195,1,0,0,0,32,210,1,
0,0,0,34,212,1,0,0,0,36,229,1,0,0,0,38,238,1,0,0,0,40,42,5,3,0,0,41,43,3,
6,3,0,42,41,1,0,0,0,42,43,1,0,0,0,43,44,1,0,0,0,44,45,5,0,0,1,45,1,1,0,0,
0,46,47,5,39,0,0,47,3,1,0,0,0,48,49,6,2,-1,0,49,50,5,33,0,0,50,51,3,4,2,
0,51,52,5,34,0,0,52,56,1,0,0,0,53,56,3,38,19,0,54,56,3,28,14,0,55,48,1,0,
0,0,55,53,1,0,0,0,55,54,1,0,0,0,56,67,1,0,0,0,57,58,10,4,0,0,58,59,7,0,0,
0,59,66,3,4,2,5,60,62,10,3,0,0,61,63,7,1,0,0,62,61,1,0,0,0,62,63,1,0,0,0,
63,64,1,0,0,0,64,66,3,4,2,4,65,57,1,0,0,0,65,60,1,0,0,0,66,69,1,0,0,0,67,
65,1,0,0,0,67,68,1,0,0,0,68,5,1,0,0,0,69,67,1,0,0,0,70,71,5,2,0,0,71,73,
3,8,4,0,72,74,3,6,3,0,73,72,1,0,0,0,73,74,1,0,0,0,74,85,1,0,0,0,75,76,5,
4,0,0,76,78,3,10,5,0,77,79,3,6,3,0,78,77,1,0,0,0,78,79,1,0,0,0,79,85,1,0,
0,0,80,82,3,12,6,0,81,83,3,6,3,0,82,81,1,0,0,0,82,83,1,0,0,0,83,85,1,0,0,
0,84,70,1,0,0,0,84,75,1,0,0,0,84,80,1,0,0,0,85,7,1,0,0,0,86,90,5,5,0,0,87,
90,3,30,15,0,88,90,3,12,6,0,89,86,1,0,0,0,89,87,1,0,0,0,89,88,1,0,0,0,90,
9,1,0,0,0,91,96,3,2,1,0,92,96,5,5,0,0,93,96,5,45,0,0,94,96,3,30,15,0,95,
91,1,0,0,0,95,92,1,0,0,0,95,93,1,0,0,0,95,94,1,0,0,0,96,11,1,0,0,0,97,98,
5,29,0,0,98,99,3,14,7,0,99,100,5,30,0,0,100,13,1,0,0,0,101,110,3,20,10,0,
102,110,3,18,9,0,103,110,3,22,11,0,104,110,5,5,0,0,105,110,5,45,0,0,106,
110,5,46,0,0,107,110,3,30,15,0,108,110,3,16,8,0,109,101,1,0,0,0,109,102,
1,0,0,0,109,103,1,0,0,0,109,104,1,0,0,0,109,105,1,0,0,0,109,106,1,0,0,0,
109,107,1,0,0,0,109,108,1,0,0,0,110,15,1,0,0,0,111,112,5,35,0,0,112,113,
5,33,0,0,113,114,3,26,13,0,114,115,5,34,0,0,115,17,1,0,0,0,116,119,5,45,
0,0,117,118,5,32,0,0,118,120,5,45,0,0,119,117,1,0,0,0,120,121,1,0,0,0,121,
119,1,0,0,0,121,122,1,0,0,0,122,19,1,0,0,0,123,126,5,46,0,0,124,125,5,32,
0,0,125,127,5,46,0,0,126,124,1,0,0,0,127,128,1,0,0,0,128,126,1,0,0,0,128,
129,1,0,0,0,129,138,1,0,0,0,130,133,3,30,15,0,131,132,5,32,0,0,132,134,3,
30,15,0,133,131,1,0,0,0,134,135,1,0,0,0,135,133,1,0,0,0,135,136,1,0,0,0,
136,138,1,0,0,0,137,123,1,0,0,0,137,130,1,0,0,0,138,21,1,0,0,0,139,141,5,
45,0,0,140,139,1,0,0,0,140,141,1,0,0,0,141,142,1,0,0,0,142,144,5,31,0,0,
143,145,5,45,0,0,144,143,1,0,0,0,144,145,1,0,0,0,145,150,1,0,0,0,146,148,
5,31,0,0,147,149,5,45,0,0,148,147,1,0,0,0,148,149,1,0,0,0,149,151,1,0,0,
0,150,146,1,0,0,0,150,151,1,0,0,0,151,23,1,0,0,0,152,154,5,41,0,0,153,155,
5,40,0,0,154,153,1,0,0,0,154,155,1,0,0,0,155,25,1,0,0,0,156,157,6,13,-1,
0,157,158,5,22,0,0,158,159,5,33,0,0,159,160,3,26,13,0,160,161,5,34,0,0,161,
182,1,0,0,0,162,163,5,33,0,0,163,164,3,26,13,0,164,165,5,34,0,0,165,182,
1,0,0,0,166,167,3,4,2,0,167,168,7,2,0,0,168,169,3,4,2,0,169,182,1,0,0,0,
170,171,3,4,2,0,171,172,5,13,0,0,172,173,3,24,12,0,173,182,1,0,0,0,174,175,
3,4,2,0,175,176,5,21,0,0,176,182,1,0,0,0,177,182,3,28,14,0,178,182,5,24,
0,0,179,182,5,25,0,0,180,182,5,26,0,0,181,156,1,0,0,0,181,162,1,0,0,0,181,
166,1,0,0,0,181,170,1,0,0,0,181,174,1,0,0,0,181,177,1,0,0,0,181,178,1,0,
0,0,181,179,1,0,0,0,181,180,1,0,0,0,182,188,1,0,0,0,183,184,10,8,0,0,184,
185,7,3,0,0,185,187,3,26,13,9,186,183,1,0,0,0,187,190,1,0,0,0,188,186,1,
0,0,0,188,189,1,0,0,0,189,27,1,0,0,0,190,188,1,0,0,0,191,193,7,4,0,0,192,
194,3,6,3,0,193,192,1,0,0,0,193,194,1,0,0,0,194,29,1,0,0,0,195,196,7,5,0,
0,196,31,1,0,0,0,197,198,5,27,0,0,198,203,3,34,17,0,199,200,5,32,0,0,200,
202,3,34,17,0,201,199,1,0,0,0,202,205,1,0,0,0,203,201,1,0,0,0,203,204,1,
0,0,0,204,206,1,0,0,0,205,203,1,0,0,0,206,207,5,28,0,0,207,211,1,0,0,0,208,
209,5,27,0,0,209,211,5,28,0,0,210,197,1,0,0,0,210,208,1,0,0,0,211,33,1,0,
0,0,212,213,5,46,0,0,213,214,5,31,0,0,214,215,3,38,19,0,215,35,1,0,0,0,216,
217,5,29,0,0,217,222,3,38,19,0,218,219,5,32,0,0,219,221,3,38,19,0,220,218,
1,0,0,0,221,224,1,0,0,0,222,220,1,0,0,0,222,223,1,0,0,0,223,225,1,0,0,0,
224,222,1,0,0,0,225,226,5,30,0,0,226,230,1,0,0,0,227,228,5,29,0,0,228,230,
5,30,0,0,229,216,1,0,0,0,229,227,1,0,0,0,230,37,1,0,0,0,231,239,5,46,0,0,
232,239,5,45,0,0,233,239,3,32,16,0,234,239,3,36,18,0,235,239,5,24,0,0,236,
239,5,25,0,0,237,239,5,26,0,0,238,231,1,0,0,0,238,232,1,0,0,0,238,233,1,
0,0,0,238,234,1,0,0,0,238,235,1,0,0,0,238,236,1,0,0,0,238,237,1,0,0,0,239,
39,1,0,0,0,29,42,55,62,65,67,73,78,82,84,89,95,109,121,128,135,137,140,144,
148,150,154,181,188,193,203,210,222,229,238];


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
                            "','", "'('", "')'", "'?'", "'- '", "'+'", "'/'", 
                            "'length()'" ];
    static symbolicNames = [ null, "CURRENT_VALUE", "DOTDOT", "ROOT_VALUE", 
                             "DOT", "STAR", "AND", "EQ", "GE", "GT", "LE", 
                             "LT", "NE", "REG", "IN", "NIN", "SUB", "ANY", 
                             "NON", "SIZO", "SIZ", "EMPT", "NOT", "OR", 
                             "TRUE", "FALSE", "NULL", "BRACE_LEFT", "BRACE_RIGHT", 
                             "BRACKET_LEFT", "BRACKET_RIGHT", "COLON", "COMMA", 
                             "PAREN_LEFT", "PAREN_RIGHT", "QUESTION", "MINUS_SP", 
                             "PLUS", "DIV", "FN_LEN", "REGEX_OPT", "REGEX_EXPR", 
                             "KEY", "SPECIAL_KEY", "WS", "NUMBER", "STRING" ];
    static ruleNames = [ "jsonpath", "function", "filterarg", "subscript", 
                         "dotdotContent", "dotContent", "bracket", "bracketContent", 
                         "filterExpression", "indexes", "unions", "slices", 
                         "regex", "expression", "filterpath", "identifier", 
                         "obj", "pair", "array", "value" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = JSONPathParser.ruleNames;
        this.literalNames = JSONPathParser.literalNames;
        this.symbolicNames = JSONPathParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 2:
    	    		return this.filterarg_sempred(localctx, predIndex);
    	case 13:
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
    			return this.precpred(this._ctx, 8);
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



	function_() {
	    let localctx = new FunctionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, JSONPathParser.RULE_function);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 46;
	        this.match(JSONPathParser.FN_LEN);
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
	    const _startState = 4;
	    this.enterRecursionRule(localctx, 4, JSONPathParser.RULE_filterarg, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 33:
	            this.state = 49;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 50;
	            this.filterarg(0);
	            this.state = 51;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 27:
	        case 29:
	        case 45:
	        case 46:
	            this.state = 53;
	            this.value();
	            break;
	        case 1:
	        case 3:
	            this.state = 54;
	            this.filterpath();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 67;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 65;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,3,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 57;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 58;
	                    _la = this._input.LA(1);
	                    if(!(_la===5 || _la===38)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 59;
	                    this.filterarg(5);
	                    break;

	                case 2:
	                    localctx = new FilterargContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
	                    this.state = 60;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 62;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    if(_la===36 || _la===37) {
	                        this.state = 61;
	                        _la = this._input.LA(1);
	                        if(!(_la===36 || _la===37)) {
	                        this._errHandler.recoverInline(this);
	                        }
	                        else {
	                        	this._errHandler.reportMatch(this);
	                            this.consume();
	                        }
	                    }

	                    this.state = 64;
	                    this.filterarg(4);
	                    break;

	                } 
	            }
	            this.state = 69;
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
	    this.enterRule(localctx, 6, JSONPathParser.RULE_subscript);
	    try {
	        this.state = 84;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 2:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 70;
	            this.match(JSONPathParser.DOTDOT);
	            this.state = 71;
	            this.dotdotContent();
	            this.state = 73;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	            if(la_===1) {
	                this.state = 72;
	                this.subscript();

	            }
	            break;
	        case 4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 75;
	            this.match(JSONPathParser.DOT);
	            this.state = 76;
	            this.dotContent();
	            this.state = 78;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	            if(la_===1) {
	                this.state = 77;
	                this.subscript();

	            }
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 80;
	            this.bracket();
	            this.state = 82;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	            if(la_===1) {
	                this.state = 81;
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
	    this.enterRule(localctx, 8, JSONPathParser.RULE_dotdotContent);
	    try {
	        this.state = 89;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 5:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 86;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 42:
	        case 43:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 87;
	            this.identifier();
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 88;
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
	    this.enterRule(localctx, 10, JSONPathParser.RULE_dotContent);
	    try {
	        this.state = 95;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 39:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 91;
	            this.function_();
	            break;
	        case 5:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 92;
	            this.match(JSONPathParser.STAR);
	            break;
	        case 45:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 93;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 42:
	        case 43:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 94;
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
	    this.enterRule(localctx, 12, JSONPathParser.RULE_bracket);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 97;
	        this.match(JSONPathParser.BRACKET_LEFT);
	        this.state = 98;
	        this.bracketContent();
	        this.state = 99;
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
	    this.enterRule(localctx, 14, JSONPathParser.RULE_bracketContent);
	    try {
	        this.state = 109;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 101;
	            this.unions();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 102;
	            this.indexes();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 103;
	            this.slices();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 104;
	            this.match(JSONPathParser.STAR);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 105;
	            this.match(JSONPathParser.NUMBER);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 106;
	            this.match(JSONPathParser.STRING);
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 107;
	            this.identifier();
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 108;
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
	    this.enterRule(localctx, 16, JSONPathParser.RULE_filterExpression);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 111;
	        this.match(JSONPathParser.QUESTION);
	        this.state = 112;
	        this.match(JSONPathParser.PAREN_LEFT);
	        this.state = 113;
	        this.expression(0);
	        this.state = 114;
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
	    this.enterRule(localctx, 18, JSONPathParser.RULE_indexes);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 116;
	        this.match(JSONPathParser.NUMBER);
	        this.state = 119; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 117;
	            this.match(JSONPathParser.COMMA);
	            this.state = 118;
	            this.match(JSONPathParser.NUMBER);
	            this.state = 121; 
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
	    this.enterRule(localctx, 20, JSONPathParser.RULE_unions);
	    var _la = 0;
	    try {
	        this.state = 137;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 46:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 123;
	            this.match(JSONPathParser.STRING);
	            this.state = 126; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 124;
	                this.match(JSONPathParser.COMMA);
	                this.state = 125;
	                this.match(JSONPathParser.STRING);
	                this.state = 128; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===32);
	            break;
	        case 24:
	        case 25:
	        case 26:
	        case 42:
	        case 43:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 130;
	            this.identifier();
	            this.state = 133; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 131;
	                this.match(JSONPathParser.COMMA);
	                this.state = 132;
	                this.identifier();
	                this.state = 135; 
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
	    this.enterRule(localctx, 22, JSONPathParser.RULE_slices);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 140;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===45) {
	            this.state = 139;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 142;
	        this.match(JSONPathParser.COLON);
	        this.state = 144;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===45) {
	            this.state = 143;
	            this.match(JSONPathParser.NUMBER);
	        }

	        this.state = 150;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===31) {
	            this.state = 146;
	            this.match(JSONPathParser.COLON);
	            this.state = 148;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===45) {
	                this.state = 147;
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
	    this.enterRule(localctx, 24, JSONPathParser.RULE_regex);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 152;
	        this.match(JSONPathParser.REGEX_EXPR);
	        this.state = 154;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        if(la_===1) {
	            this.state = 153;
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
	    const _startState = 26;
	    this.enterRecursionRule(localctx, 26, JSONPathParser.RULE_expression, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 181;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 157;
	            this.match(JSONPathParser.NOT);
	            this.state = 158;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 159;
	            this.expression(0);
	            this.state = 160;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 2:
	            this.state = 162;
	            this.match(JSONPathParser.PAREN_LEFT);
	            this.state = 163;
	            this.expression(0);
	            this.state = 164;
	            this.match(JSONPathParser.PAREN_RIGHT);
	            break;

	        case 3:
	            this.state = 166;
	            this.filterarg(0);
	            this.state = 167;
	            _la = this._input.LA(1);
	            if(!((((_la) & ~0x1f) === 0 && ((1 << _la) & 2088832) !== 0))) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 168;
	            this.filterarg(0);
	            break;

	        case 4:
	            this.state = 170;
	            this.filterarg(0);
	            this.state = 171;
	            this.match(JSONPathParser.REG);
	            this.state = 172;
	            this.regex();
	            break;

	        case 5:
	            this.state = 174;
	            this.filterarg(0);
	            this.state = 175;
	            this.match(JSONPathParser.EMPT);
	            break;

	        case 6:
	            this.state = 177;
	            this.filterpath();
	            break;

	        case 7:
	            this.state = 178;
	            this.match(JSONPathParser.TRUE);
	            break;

	        case 8:
	            this.state = 179;
	            this.match(JSONPathParser.FALSE);
	            break;

	        case 9:
	            this.state = 180;
	            this.match(JSONPathParser.NULL);
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 188;
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
	                this.state = 183;
	                if (!( this.precpred(this._ctx, 8))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                }
	                this.state = 184;
	                _la = this._input.LA(1);
	                if(!(_la===6 || _la===23)) {
	                this._errHandler.recoverInline(this);
	                }
	                else {
	                	this._errHandler.reportMatch(this);
	                    this.consume();
	                }
	                this.state = 185;
	                this.expression(9); 
	            }
	            this.state = 190;
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
	    this.enterRule(localctx, 28, JSONPathParser.RULE_filterpath);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
	        _la = this._input.LA(1);
	        if(!(_la===1 || _la===3)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 193;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 192;
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
	    this.enterRule(localctx, 30, JSONPathParser.RULE_identifier);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 195;
	        _la = this._input.LA(1);
	        if(!(((((_la - 24)) & ~0x1f) === 0 && ((1 << (_la - 24)) & 786439) !== 0))) {
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
	    this.enterRule(localctx, 32, JSONPathParser.RULE_obj);
	    var _la = 0;
	    try {
	        this.state = 210;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 197;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 198;
	            this.pair();
	            this.state = 203;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===32) {
	                this.state = 199;
	                this.match(JSONPathParser.COMMA);
	                this.state = 200;
	                this.pair();
	                this.state = 205;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 206;
	            this.match(JSONPathParser.BRACE_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 208;
	            this.match(JSONPathParser.BRACE_LEFT);
	            this.state = 209;
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
	        this.state = 212;
	        this.match(JSONPathParser.STRING);
	        this.state = 213;
	        this.match(JSONPathParser.COLON);
	        this.state = 214;
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
	        this.state = 229;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,27,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 216;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 217;
	            this.value();
	            this.state = 222;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===32) {
	                this.state = 218;
	                this.match(JSONPathParser.COMMA);
	                this.state = 219;
	                this.value();
	                this.state = 224;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 225;
	            this.match(JSONPathParser.BRACKET_RIGHT);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 227;
	            this.match(JSONPathParser.BRACKET_LEFT);
	            this.state = 228;
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
	        this.state = 238;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 46:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 231;
	            this.match(JSONPathParser.STRING);
	            break;
	        case 45:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 232;
	            this.match(JSONPathParser.NUMBER);
	            break;
	        case 27:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 233;
	            this.obj();
	            break;
	        case 29:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 234;
	            this.array();
	            break;
	        case 24:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 235;
	            this.match(JSONPathParser.TRUE);
	            break;
	        case 25:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 236;
	            this.match(JSONPathParser.FALSE);
	            break;
	        case 26:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 237;
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
JSONPathParser.FN_LEN = 39;
JSONPathParser.REGEX_OPT = 40;
JSONPathParser.REGEX_EXPR = 41;
JSONPathParser.KEY = 42;
JSONPathParser.SPECIAL_KEY = 43;
JSONPathParser.WS = 44;
JSONPathParser.NUMBER = 45;
JSONPathParser.STRING = 46;

JSONPathParser.RULE_jsonpath = 0;
JSONPathParser.RULE_function = 1;
JSONPathParser.RULE_filterarg = 2;
JSONPathParser.RULE_subscript = 3;
JSONPathParser.RULE_dotdotContent = 4;
JSONPathParser.RULE_dotContent = 5;
JSONPathParser.RULE_bracket = 6;
JSONPathParser.RULE_bracketContent = 7;
JSONPathParser.RULE_filterExpression = 8;
JSONPathParser.RULE_indexes = 9;
JSONPathParser.RULE_unions = 10;
JSONPathParser.RULE_slices = 11;
JSONPathParser.RULE_regex = 12;
JSONPathParser.RULE_expression = 13;
JSONPathParser.RULE_filterpath = 14;
JSONPathParser.RULE_identifier = 15;
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



class FunctionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = JSONPathParser.RULE_function;
    }

	FN_LEN() {
	    return this.getToken(JSONPathParser.FN_LEN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.enterFunction(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof JSONPathListener ) {
	        listener.exitFunction(this);
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

	function_() {
	    return this.getTypedRuleContext(FunctionContext,0);
	};

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

	TRUE() {
	    return this.getToken(JSONPathParser.TRUE, 0);
	};

	FALSE() {
	    return this.getToken(JSONPathParser.FALSE, 0);
	};

	NULL() {
	    return this.getToken(JSONPathParser.NULL, 0);
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

	SPECIAL_KEY() {
	    return this.getToken(JSONPathParser.SPECIAL_KEY, 0);
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
JSONPathParser.FunctionContext = FunctionContext; 
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
