// JSONPath Grammar for Peggy
// RFC 9535 compliant with backwards-compatible extensions

{{
  // Helper to build a linked list of subscripts
  function buildSubscriptChain(segments) {
    if (!segments || segments.length === 0) return null;

    let result = null;
    for (let i = segments.length - 1; i >= 0; i--) {
      result = {
        type: 'subscript',
        value: segments[i],
        next: result
      };
    }
    return result;
  }

  // Helper to build left-associative binary expressions
  function buildBinaryExpr(head, tail, makeNode) {
    return tail.reduce((left, item) => makeNode(left, item), head);
  }
}}

// ===================
// Entry Point
// ===================

jsonpath
  = _ ROOT_VALUE segments:segment* _ EOF {
      return {
        type: 'root',
        next: buildSubscriptChain(segments)
      };
    }

// ===================
// Segments
// ===================

segment
  = descendantSegment
  / childSegment

childSegment
  = DOT content:dotContent { return { type: 'dot', value: content }; }
  / bracket:bracket { return bracket; }

descendantSegment
  = DOTDOT content:dotdotContent { return { type: 'dotdot', value: content }; }

// ===================
// Dot Notation Content
// ===================

dotContent
  = STAR { return { type: 'wildcard' }; }
  / n:NUMBER { return { type: 'numericLiteral', value: n }; }
  / id:identifier { return { type: 'identifier', value: id }; }

dotdotContent
  = STAR { return { type: 'wildcard' }; }
  / id:identifier { return { type: 'identifier', value: id }; }
  / bracket:bracket { return bracket; }

// ===================
// Bracket Notation
// ===================

bracket
  = BRACKET_LEFT _ content:bracketContent _ BRACKET_RIGHT { return content; }

bracketContent
  = filterExpression
  / slices
  / selectorList
  / STAR { return { type: 'bracketExpression', value: { type: 'wildcard' } }; }
  / n:NUMBER { return { type: 'bracketMember', value: { type: 'numericLiteral', value: n } }; }
  / s:STRING { return { type: 'bracketMember', value: { type: 'stringLiteral', value: s } }; }
  / id:identifier { return { type: 'bracketMember', value: { type: 'identifier', value: id } }; }

// ===================
// Filter Expression
// ===================

filterExpression
  = QUESTION _ PAREN_LEFT _ expr:expression _ PAREN_RIGHT {
      return { type: 'bracketExpression', value: { type: 'filterExpression', value: expr } };
    }
  / QUESTION _ expr:filterExprContent {
      // RFC 9535 style without parens
      return { type: 'bracketExpression', value: { type: 'filterExpression', value: expr } };
    }

filterExprContent
  = orExpression

// ===================
// Logical Expressions (for filters)
// ===================

expression
  = orExpression

orExpression
  = head:andExpression tail:(_ OR _ andExpression)* {
      return buildBinaryExpr(head, tail, (left, item) => ({
        type: 'logicalExpression',
        operator: 'or',
        left: left,
        right: item[3]
      }));
    }

andExpression
  = head:notExpression tail:(_ AND _ notExpression)* {
      return buildBinaryExpr(head, tail, (left, item) => ({
        type: 'logicalExpression',
        operator: 'and',
        left: left,
        right: item[3]
      }));
    }

notExpression
  = NOT _ PAREN_LEFT _ expr:expression _ PAREN_RIGHT {
      return { type: 'notExpression', value: expr };
    }
  / NOT _ expr:primaryExpression {
      return { type: 'notExpression', value: expr };
    }
  / comparisonExpression

comparisonExpression
  = left:filterarg _ op:comparisonOperator _ right:filterarg {
      return { type: 'comparator', operator: op, left: left, right: right };
    }
  / left:filterarg _ REG _ regex:regex {
      return { type: 'comparator', operator: 'reg', left: left, right: regex };
    }
  / left:filterarg _ EMPT {
      return { type: 'comparator', operator: 'empty', left: left, right: null };
    }
  / primaryExpression

comparisonOperator
  = EQ { return 'eq'; }
  / NE { return 'ne'; }
  / LE { return 'le'; }
  / LT { return 'lt'; }
  / GE { return 'ge'; }
  / GT { return 'gt'; }
  / IN { return 'in'; }
  / NIN { return 'nin'; }
  / SUB { return 'subsetof'; }
  / ANY { return 'anyof'; }
  / NON { return 'noneof'; }
  / SIZO { return 'sizeof'; }
  / SIZ { return 'size'; }

primaryExpression
  = PAREN_LEFT _ expr:expression _ PAREN_RIGHT {
      return { type: 'groupExpression', value: expr };
    }
  / functionCall
  / filterpath
  / TRUE { return { type: 'value', value: true, subtype: 'boolean' }; }
  / FALSE { return { type: 'value', value: false, subtype: 'boolean' }; }
  / NULL { return { type: 'value', value: null, subtype: 'null' }; }

// ===================
// RFC 9535 Functions
// ===================

functionCall
  = name:functionName _ PAREN_LEFT _ args:functionArgs? _ PAREN_RIGHT {
      return { type: 'functionCall', name: name, args: args || [] };
    }

functionName
  = "length"i { return 'length'; }
  / "count"i { return 'count'; }
  / "match"i { return 'match'; }
  / "search"i { return 'search'; }
  / "value"i { return 'value'; }

functionArgs
  = head:functionArg tail:(_ COMMA _ functionArg)* {
      return [head, ...tail.map(t => t[3])];
    }

functionArg
  = filterarg
  / stringLiteral

// ===================
// Filter Arguments (operands)
// ===================

filterarg
  = head:filterargMulti tail:(_ (PLUS / MINUS) _ filterargMulti)* {
      if (tail.length === 0) return head;
      return buildBinaryExpr(head, tail, (left, item) => ({
        type: 'operation',
        operator: item[1] === '+' ? 'plus' : 'minus',
        left: left,
        right: item[3]
      }));
    }

filterargMulti
  = head:filterargUnary tail:(_ (STAR / DIV) _ filterargUnary)* {
      if (tail.length === 0) return head;
      return buildBinaryExpr(head, tail, (left, item) => ({
        type: 'operation',
        operator: item[1] === '*' ? 'multi' : 'div',
        left: left,
        right: item[3]
      }));
    }

filterargUnary
  = PAREN_LEFT _ arg:filterarg _ PAREN_RIGHT {
      return { type: 'groupOperation', value: arg };
    }
  / functionCall
  / value
  / filterpath

// ===================
// Filter Path (@ or $ with optional subscripts)
// ===================

filterpath
  = ROOT_VALUE segments:segment* {
      return {
        type: 'root',
        next: buildSubscriptChain(segments)
      };
    }
  / CURRENT_VALUE segments:segment* {
      return {
        type: 'current',
        next: buildSubscriptChain(segments)
      };
    }

// ===================
// Slices, Indexes, Unions
// ===================

slices
  = start:NUMBER? COLON end:NUMBER? step:(COLON NUMBER?)? {
      return {
        type: 'bracketExpression',
        value: {
          type: 'slices',
          start: start !== null ? start : null,
          end: end !== null ? end : null,
          step: step ? (step[1] !== null ? step[1] : null) : null
        }
      };
    }

// RFC 9535: Selector list allows mixed types (strings, numbers, wildcards)
selectorList
  = head:selector tail:(_ COMMA _ selector)+ {
      const values = [head, ...tail.map(t => t[3])];
      return { type: 'bracketExpression', value: { type: 'unions', values: values } };
    }

selector
  = STAR { return { type: 'wildcard' }; }
  / n:NUMBER { return { type: 'numericLiteral', value: n }; }
  / s:STRING { return { type: 'stringLiteral', value: s }; }
  / id:identifier { return { type: 'identifier', value: id }; }

// ===================
// Regex
// ===================

regex
  = expr:REGEX_EXPR opts:REGEX_OPT? {
      return { type: 'value', subtype: 'regex', value: expr, opts: opts || '' };
    }

// ===================
// Values
// ===================

value
  = s:stringLiteral { return { type: 'value', subtype: 'string', value: s }; }
  / n:NUMBER { return { type: 'value', subtype: 'number', value: n }; }
  / obj
  / array
  / TRUE { return { type: 'value', value: true, subtype: 'boolean' }; }
  / FALSE { return { type: 'value', value: false, subtype: 'boolean' }; }
  / NULL { return { type: 'value', value: null, subtype: 'null' }; }

stringLiteral "string"
  = s:STRING { return s; }

obj
  = BRACE_LEFT _ pairs:pairList? _ BRACE_RIGHT {
      const obj = {};
      if (pairs) {
        for (const [key, val] of pairs) {
          obj[key] = val;
        }
      }
      return { type: 'value', subtype: 'object', value: obj };
    }

pairList
  = head:pair tail:(_ COMMA _ pair)* {
      return [head, ...tail.map(t => t[3])];
    }

pair
  = key:STRING _ COLON _ val:value {
      return [key, val.value];
    }

array
  = BRACKET_LEFT _ items:valueList? _ BRACKET_RIGHT {
      return { type: 'value', subtype: 'array', value: items || [] };
    }

valueList
  = head:value tail:(_ COMMA _ value)* {
      return [head.value, ...tail.map(t => t[3].value)];
    }

// ===================
// Identifier
// ===================

identifier
  = chars:KEY { return chars; }
  / chars:SPECIAL_KEY { return chars; }
  / TRUE { return 'true'; }
  / FALSE { return 'false'; }
  / NULL { return 'null'; }

// ===================
// Tokens
// ===================

ROOT_VALUE = "$"
CURRENT_VALUE = "@"
DOTDOT = ".."
DOT = "."
STAR = "*"

AND = "&&"
OR = "||"
NOT = "!"

EQ = "=="
NE = "!="
GE = ">="
GT = ">"
LE = "<="
LT = "<"
REG = "=~"

// Extension operators (keywords, whitespace handled by grammar)
IN = "in" !identifierChar
NIN = "nin" !identifierChar
SUB = "subsetof" !identifierChar
ANY = "anyof" !identifierChar
NON = "noneof" !identifierChar
SIZO = "sizeof" !identifierChar
SIZ = "size" !identifierChar
EMPT = "empty" !identifierChar

TRUE = "true" !identifierChar
FALSE = "false" !identifierChar
NULL = "null" !identifierChar

BRACE_LEFT = "{"
BRACE_RIGHT = "}"
BRACKET_LEFT = "["
BRACKET_RIGHT = "]"
COLON = ":"
COMMA = ","
PAREN_LEFT = "("
PAREN_RIGHT = ")"
QUESTION = "?"

PLUS = "+"
MINUS = "-"
DIV = "/"

REGEX_EXPR "regex"
  = "/" chars:([^/\\] / "\\" .)* "/" { return "/" + chars.map(c => Array.isArray(c) ? c.join('') : c).join('') + "/"; }

REGEX_OPT
  = opts:[gimsuy]* { return opts.join(''); }

KEY
  = first:[a-zA-Z_] rest:keyChar* { return first + rest.join(''); }

keyChar
  = [a-zA-Z0-9_]
  / "-" !([0-9@$\-]) { return "-"; }

SPECIAL_KEY
  = chars:[\u0080-\uFFFF_]+ { return chars.join(''); }

NUMBER "number"
  = "-"? INT frac:("." [0-9]+)? exp:EXP? {
      const num = parseFloat(text());
      // RFC 9535: Integer literals (no decimal, no exponent) must be within I-JSON range
      if (!frac && !exp && (num < -9007199254740991 || num > 9007199254740991)) {
        error('Integer out of I-JSON range [-(2^53)+1, (2^53)-1]');
      }
      return num;
    }

INT
  = [0-9]+

EXP
  = [eE] [+-]? [0-9]+

STRING "string"
  = '"' chars:doubleStringChar* '"' { return chars.join(''); }
  / "'" chars:singleStringChar* "'" { return chars.join(''); }

doubleStringChar
  = !["\\] char:. { return char; }
  / "\\" seq:escapeSequence { return seq; }

singleStringChar
  = !['\\] char:. { return char; }
  / "\\" seq:escapeSequence { return seq; }

escapeSequence
  = '"' { return '"'; }
  / "'" { return "'"; }
  / "\\" { return "\\"; }
  / "/" { return "/"; }
  / "b" { return "\b"; }
  / "f" { return "\f"; }
  / "n" { return "\n"; }
  / "r" { return "\r"; }
  / "t" { return "\t"; }
  / "u" digits:$(HEX HEX HEX HEX) { return String.fromCharCode(parseInt(digits, 16)); }

HEX
  = [0-9a-fA-F]

identifierChar
  = [a-zA-Z0-9_]

_ "whitespace"
  = [ \t\n\r]*

EOF
  = !.
