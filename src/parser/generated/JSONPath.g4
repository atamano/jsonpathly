grammar JSONPath;

CURRENT_VALUE : '@' ;
DOTDOT : '..' ;
ROOT_VALUE : '$' ;
DOT : '.' ;
STAR : '*' ;

AND : '&&' ;
EQ : '==' ;
GE : '>=' ;
GT : '>' ;
LE : '<=' ;
LT : '<' ;
NE : '!=' ;
REG : '=~' ;
IN : ' in ' ;
NIN : ' nin ' ;
SUB : ' subsetof ' ;
ANY : ' anyof ' ;
NON : ' noneof ' ;
SIZO : ' sizeof ' ;
SIZ : ' size ' ;
EMPT : ' empty' ;
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

MINUS_SP: '- ';
PLUS: '+';
DIV: '/';

REGEX_OPT: [gimsuy]*;
REGEX_EXPR: '/'.*?'/';

jsonpath
   : ROOT_VALUE subscript? EOF
   ;

filterarg
   : PAREN_LEFT filterarg PAREN_RIGHT
   | filterarg ( STAR | DIV ) filterarg
   | filterarg ( PLUS | MINUS_SP )? filterarg
   | value
   | filterpath
   ;

subscript
   : DOTDOT dotdotContent subscript?
   | DOT dotContent subscript?
   | bracket subscript?
   ;

dotdotContent
   : STAR
   | IDENTIFIER
   | bracket
   ;

dotContent
   : STAR
   | NUMBER
   | IDENTIFIER
   ;

bracket
   : BRACKET_LEFT bracketContent BRACKET_RIGHT
   ;

bracketContent
   : unions
   | indexes
   | slices
   | STAR
   | NUMBER
   | STRING
   | IDENTIFIER
   | filterExpression
   ;

filterExpression
   : QUESTION PAREN_LEFT expression PAREN_RIGHT
   ;

indexes
   : NUMBER ( COMMA NUMBER )+
   ;

unions
   : STRING ( COMMA STRING )+
   | IDENTIFIER ( COMMA IDENTIFIER )+
   ;

slices
   : NUMBER? COLON NUMBER? ( COLON ( NUMBER )? )?
   ;

regex : REGEX_EXPR REGEX_OPT?;

expression
   : NOT PAREN_LEFT expression PAREN_RIGHT
   | PAREN_LEFT expression PAREN_RIGHT
   | expression ( AND | OR ) expression
   | filterarg ( EQ | NE | LT | LE | GT | GE | IN | NIN | SUB | ANY | SIZO| NON | SIZ ) filterarg
   | filterarg REG regex
   | filterarg EMPT
   | filterpath
   ;

filterpath
   : ( ROOT_VALUE | CURRENT_VALUE ) subscript?
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
