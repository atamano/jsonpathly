grammar JSONPath;

CURRENT_VALUE : '@' ;
RECURSIVE_DESCENT : '..' ;
ROOT_VALUE : '$' ;
SUBSCRIPT : '.' ;
WILDCARD : '*' ;

AND : '&&' ;
EQ : '==' ;
GE : '>=' ;
GT : '>' ;
LE : '<=' ;
LT : '<' ;
NE : '!=' ;
IN : 'in' ;
NIN : 'nin' ;
NOT : '!' ;
OR : '||' ;

TRUE : 'true' ;
FALSE : 'false' ;
NULL : 'null' ;

BRACE_LEFT : '{' ;
BRACE_RIGHT : '}' ;
BRACKET_LEFT : '[' ;
BRACKET_RIGHT : ']' ;
COLON : ':' ;
COMMA : ',' ;
PAREN_LEFT : '(' ;
PAREN_RIGHT : ')' ;
QUESTION : '?' ;

jsonpath
   : ROOT_VALUE subscript? EOF
   ;

filterpath
   : ( ROOT_VALUE | CURRENT_VALUE ) subscript?
   ;

filterarg
   : filterpath
   | value
   ;

subscript
   : RECURSIVE_DESCENT ( subscriptableBareword | subscriptables ) subscript?
   | SUBSCRIPT subscriptableBareword subscript?
   | subscriptables subscript?
   ;

subscriptables
   : BRACKET_LEFT subscriptable ( COMMA subscriptable )* BRACKET_RIGHT
   ;

subscriptableBareword
   : IDENTIFIER
   | WILDCARD
   ;

subscriptable
   : STRING
   | NUMBER sliceable?
   | sliceable
   | WILDCARD
   | PAREN_LEFT filterarg ( filterarg )? PAREN_RIGHT
   | QUESTION PAREN_LEFT expression PAREN_RIGHT
   | IDENTIFIER
   ;

sliceable
   : COLON ( NUMBER )? ( COLON ( NUMBER )? )?
   ;

expression
   : NOT expression
   | expression AND expression
   | expression OR expression
   | PAREN_LEFT expression PAREN_RIGHT
   | filterarg ( EQ | NE | LT | LE | GT | GE | IN | NIN ) filterarg
   | filterpath
   ;

IDENTIFIER
   :  [a-zA-Z_][a-zA-Z0-9_]*
   ;


/* c.f., https://github.com/antlr/grammars-v4/blob/master/json/JSON.g4 */

json
   : value
   ;

obj
   : BRACE_LEFT pair ( COMMA pair )* BRACE_RIGHT
   | BRACE_LEFT BRACE_RIGHT
   ;

pair
   : STRING COLON value
   ;

array
   : BRACKET_LEFT value ( COMMA value )* BRACKET_RIGHT
   | BRACKET_LEFT BRACKET_RIGHT
   ;

value
   : STRING
   | NUMBER
   | obj
   | array
   | TRUE
   | FALSE
   | NULL
   ;


STRING
   : '"' (ESC_DOUBLE | SAFECODEPOINT_DOUBLE)* '"'
   | '\'' (ESC_SINGLE | SAFECODEPOINT_SINGLE)* '\''
   ;


fragment ESC_SINGLE
   : '\\' (['\\/bfnrt] | UNICODE)
   ;

fragment ESC_DOUBLE
   : '\\' (["\\/bfnrt] | UNICODE)
   ;

fragment UNICODE
   : 'u' HEX HEX HEX HEX
   ;

fragment HEX
   : [0-9a-fA-F]
   ;

fragment SAFECODEPOINT_SINGLE
   : ~ ['\\\u0000-\u001F]
   ;

fragment SAFECODEPOINT_DOUBLE
   : ~ ["\\\u0000-\u001F]
   ;

NUMBER
   : '-'? INT ('.' [0-9] +)? EXP?
   ;

fragment INT
   : '0' | [1-9] [0-9]*
   ;

// no leading zeros

fragment EXP
   : [Ee] [+\-]? INT
   ;

// \- since - means "range" inside [...]

WS
   : [ \t\n\r] + -> skip
   ;
