// Generated from src/parser/generated/JSONPath.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import JSONPathListener from './JSONPathListener';

const serializedATN = [
  '\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786',
  '\u5964\u0003.\u00e8\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004',
  '\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007',
  '\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f',
  '\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010',
  '\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014',
  '\t\u0014\u0003\u0002\u0003\u0002\u0005\u0002+\n\u0002\u0003\u0002\u0003',
  '\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003',
  '\u0003\u0003\u0003\u0005\u00036\n\u0003\u0003\u0003\u0003\u0003\u0003',
  '\u0003\u0003\u0003\u0003\u0003\u0005\u0003=\n\u0003\u0003\u0003\u0007',
  '\u0003@\n\u0003\f\u0003\u000e\u0003C\u000b\u0003\u0003\u0004\u0003\u0004',
  '\u0003\u0004\u0005\u0004H\n\u0004\u0003\u0004\u0003\u0004\u0003\u0004',
  '\u0005\u0004M\n\u0004\u0003\u0004\u0003\u0004\u0005\u0004Q\n\u0004\u0005',
  '\u0004S\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005X\n\u0005',
  '\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007',
  '\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0003\b\u0005',
  '\bh\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003',
  '\n\u0006\nr\n\n\r\n\u000e\ns\u0003\u000b\u0003\u000b\u0003\u000b\u0006',
  '\u000by\n\u000b\r\u000b\u000e\u000bz\u0003\u000b\u0003\u000b\u0003\u000b',
  '\u0006\u000b\u0080\n\u000b\r\u000b\u000e\u000b\u0081\u0005\u000b\u0084',
  '\n\u000b\u0003\f\u0005\f\u0087\n\f\u0003\f\u0003\f\u0005\f\u008b\n\f',
  '\u0003\f\u0003\f\u0005\f\u008f\n\f\u0005\f\u0091\n\f\u0003\r\u0003\r',
  '\u0005\r\u0095\n\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003',
  '\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003',
  '\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003',
  '\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0005',
  '\u000e\u00ad\n\u000e\u0003\u000e\u0003\u000e\u0003\u000e\u0007\u000e',
  '\u00b2\n\u000e\f\u000e\u000e\u000e\u00b5\u000b\u000e\u0003\u000f\u0003',
  '\u000f\u0005\u000f\u00b9\n\u000f\u0003\u0010\u0003\u0010\u0003\u0011',
  '\u0003\u0011\u0003\u0011\u0003\u0011\u0007\u0011\u00c1\n\u0011\f\u0011',
  '\u000e\u0011\u00c4\u000b\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003',
  '\u0011\u0005\u0011\u00ca\n\u0011\u0003\u0012\u0003\u0012\u0003\u0012',
  '\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0007\u0013',
  '\u00d4\n\u0013\f\u0013\u000e\u0013\u00d7\u000b\u0013\u0003\u0013\u0003',
  '\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00dd\n\u0013\u0003\u0014',
  '\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014',
  '\u0005\u0014\u00e6\n\u0014\u0003\u0014\u0002\u0004\u0004\u001a\u0015',
  '\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c',
  '\u001e "$&\u0002\b\u0004\u0002\u0007\u0007((\u0003\u0002&\'\u0005\u0002',
  '\u0007\u0007++--\u0004\u0002\t\u000e\u0010\u0016\u0004\u0002\b\b\u0019',
  '\u0019\u0004\u0002\u0003\u0003\u0005\u0005\u0002\u0102\u0002(\u0003',
  '\u0002\u0002\u0002\u00045\u0003\u0002\u0002\u0002\u0006R\u0003\u0002',
  '\u0002\u0002\bW\u0003\u0002\u0002\u0002\nY\u0003\u0002\u0002\u0002\f',
  '[\u0003\u0002\u0002\u0002\u000eg\u0003\u0002\u0002\u0002\u0010i\u0003',
  '\u0002\u0002\u0002\u0012n\u0003\u0002\u0002\u0002\u0014\u0083\u0003',
  '\u0002\u0002\u0002\u0016\u0086\u0003\u0002\u0002\u0002\u0018\u0092\u0003',
  '\u0002\u0002\u0002\u001a\u00ac\u0003\u0002\u0002\u0002\u001c\u00b6\u0003',
  '\u0002\u0002\u0002\u001e\u00ba\u0003\u0002\u0002\u0002 \u00c9\u0003',
  '\u0002\u0002\u0002"\u00cb\u0003\u0002\u0002\u0002$\u00dc\u0003\u0002',
  '\u0002\u0002&\u00e5\u0003\u0002\u0002\u0002(*\u0007\u0005\u0002\u0002',
  ')+\u0005\u0006\u0004\u0002*)\u0003\u0002\u0002\u0002*+\u0003\u0002\u0002',
  '\u0002+,\u0003\u0002\u0002\u0002,-\u0007\u0002\u0002\u0003-\u0003\u0003',
  '\u0002\u0002\u0002./\b\u0003\u0001\u0002/0\u0007#\u0002\u000201\u0005',
  '\u0004\u0003\u000212\u0007$\u0002\u000226\u0003\u0002\u0002\u000236',
  '\u0005&\u0014\u000246\u0005\u001c\u000f\u00025.\u0003\u0002\u0002\u0002',
  '53\u0003\u0002\u0002\u000254\u0003\u0002\u0002\u00026A\u0003\u0002\u0002',
  '\u000278\f\u0006\u0002\u000289\t\u0002\u0002\u00029@\u0005\u0004\u0003',
  '\u0007:<\f\u0005\u0002\u0002;=\t\u0003\u0002\u0002<;\u0003\u0002\u0002',
  '\u0002<=\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>@\u0005\u0004',
  '\u0003\u0006?7\u0003\u0002\u0002\u0002?:\u0003\u0002\u0002\u0002@C\u0003',
  '\u0002\u0002\u0002A?\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002\u0002',
  'B\u0005\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002DE\u0007\u0004',
  '\u0002\u0002EG\u0005\b\u0005\u0002FH\u0005\u0006\u0004\u0002GF\u0003',
  '\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HS\u0003\u0002\u0002\u0002',
  'IJ\u0007\u0006\u0002\u0002JL\u0005\n\u0006\u0002KM\u0005\u0006\u0004',
  '\u0002LK\u0003\u0002\u0002\u0002LM\u0003\u0002\u0002\u0002MS\u0003\u0002',
  '\u0002\u0002NP\u0005\f\u0007\u0002OQ\u0005\u0006\u0004\u0002PO\u0003',
  '\u0002\u0002\u0002PQ\u0003\u0002\u0002\u0002QS\u0003\u0002\u0002\u0002',
  'RD\u0003\u0002\u0002\u0002RI\u0003\u0002\u0002\u0002RN\u0003\u0002\u0002',
  '\u0002S\u0007\u0003\u0002\u0002\u0002TX\u0007\u0007\u0002\u0002UX\u0007',
  '+\u0002\u0002VX\u0005\f\u0007\u0002WT\u0003\u0002\u0002\u0002WU\u0003',
  '\u0002\u0002\u0002WV\u0003\u0002\u0002\u0002X\t\u0003\u0002\u0002\u0002',
  'YZ\t\u0004\u0002\u0002Z\u000b\u0003\u0002\u0002\u0002[\\\u0007\u001f',
  '\u0002\u0002\\]\u0005\u000e\b\u0002]^\u0007 \u0002\u0002^\r\u0003\u0002',
  '\u0002\u0002_h\u0005\u0014\u000b\u0002`h\u0005\u0012\n\u0002ah\u0005',
  '\u0016\f\u0002bh\u0007\u0007\u0002\u0002ch\u0007-\u0002\u0002dh\u0007',
  ',\u0002\u0002eh\u0007+\u0002\u0002fh\u0005\u0010\t\u0002g_\u0003\u0002',
  '\u0002\u0002g`\u0003\u0002\u0002\u0002ga\u0003\u0002\u0002\u0002gb\u0003',
  '\u0002\u0002\u0002gc\u0003\u0002\u0002\u0002gd\u0003\u0002\u0002\u0002',
  'ge\u0003\u0002\u0002\u0002gf\u0003\u0002\u0002\u0002h\u000f\u0003\u0002',
  '\u0002\u0002ij\u0007%\u0002\u0002jk\u0007#\u0002\u0002kl\u0005\u001a',
  '\u000e\u0002lm\u0007$\u0002\u0002m\u0011\u0003\u0002\u0002\u0002nq\u0007',
  '-\u0002\u0002op\u0007"\u0002\u0002pr\u0007-\u0002\u0002qo\u0003\u0002',
  '\u0002\u0002rs\u0003\u0002\u0002\u0002sq\u0003\u0002\u0002\u0002st\u0003',
  '\u0002\u0002\u0002t\u0013\u0003\u0002\u0002\u0002ux\u0007,\u0002\u0002',
  'vw\u0007"\u0002\u0002wy\u0007,\u0002\u0002xv\u0003\u0002\u0002\u0002',
  'yz\u0003\u0002\u0002\u0002zx\u0003\u0002\u0002\u0002z{\u0003\u0002\u0002',
  '\u0002{\u0084\u0003\u0002\u0002\u0002|\u007f\u0007+\u0002\u0002}~\u0007',
  '"\u0002\u0002~\u0080\u0007+\u0002\u0002\u007f}\u0003\u0002\u0002\u0002',
  '\u0080\u0081\u0003\u0002\u0002\u0002\u0081\u007f\u0003\u0002\u0002\u0002',
  '\u0081\u0082\u0003\u0002\u0002\u0002\u0082\u0084\u0003\u0002\u0002\u0002',
  '\u0083u\u0003\u0002\u0002\u0002\u0083|\u0003\u0002\u0002\u0002\u0084',
  '\u0015\u0003\u0002\u0002\u0002\u0085\u0087\u0007-\u0002\u0002\u0086',
  '\u0085\u0003\u0002\u0002\u0002\u0086\u0087\u0003\u0002\u0002\u0002\u0087',
  '\u0088\u0003\u0002\u0002\u0002\u0088\u008a\u0007!\u0002\u0002\u0089',
  '\u008b\u0007-\u0002\u0002\u008a\u0089\u0003\u0002\u0002\u0002\u008a',
  '\u008b\u0003\u0002\u0002\u0002\u008b\u0090\u0003\u0002\u0002\u0002\u008c',
  '\u008e\u0007!\u0002\u0002\u008d\u008f\u0007-\u0002\u0002\u008e\u008d',
  '\u0003\u0002\u0002\u0002\u008e\u008f\u0003\u0002\u0002\u0002\u008f\u0091',
  '\u0003\u0002\u0002\u0002\u0090\u008c\u0003\u0002\u0002\u0002\u0090\u0091',
  '\u0003\u0002\u0002\u0002\u0091\u0017\u0003\u0002\u0002\u0002\u0092\u0094',
  '\u0007*\u0002\u0002\u0093\u0095\u0007)\u0002\u0002\u0094\u0093\u0003',
  '\u0002\u0002\u0002\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u0019\u0003',
  '\u0002\u0002\u0002\u0096\u0097\b\u000e\u0001\u0002\u0097\u0098\u0007',
  '\u0018\u0002\u0002\u0098\u0099\u0007#\u0002\u0002\u0099\u009a\u0005',
  '\u001a\u000e\u0002\u009a\u009b\u0007$\u0002\u0002\u009b\u00ad\u0003',
  '\u0002\u0002\u0002\u009c\u009d\u0007#\u0002\u0002\u009d\u009e\u0005',
  '\u001a\u000e\u0002\u009e\u009f\u0007$\u0002\u0002\u009f\u00ad\u0003',
  '\u0002\u0002\u0002\u00a0\u00a1\u0005\u0004\u0003\u0002\u00a1\u00a2\t',
  '\u0005\u0002\u0002\u00a2\u00a3\u0005\u0004\u0003\u0002\u00a3\u00ad\u0003',
  '\u0002\u0002\u0002\u00a4\u00a5\u0005\u0004\u0003\u0002\u00a5\u00a6\u0007',
  '\u000f\u0002\u0002\u00a6\u00a7\u0005\u0018\r\u0002\u00a7\u00ad\u0003',
  '\u0002\u0002\u0002\u00a8\u00a9\u0005\u0004\u0003\u0002\u00a9\u00aa\u0007',
  '\u0017\u0002\u0002\u00aa\u00ad\u0003\u0002\u0002\u0002\u00ab\u00ad\u0005',
  '\u001c\u000f\u0002\u00ac\u0096\u0003\u0002\u0002\u0002\u00ac\u009c\u0003',
  '\u0002\u0002\u0002\u00ac\u00a0\u0003\u0002\u0002\u0002\u00ac\u00a4\u0003',
  '\u0002\u0002\u0002\u00ac\u00a8\u0003\u0002\u0002\u0002\u00ac\u00ab\u0003',
  '\u0002\u0002\u0002\u00ad\u00b3\u0003\u0002\u0002\u0002\u00ae\u00af\f',
  '\u0007\u0002\u0002\u00af\u00b0\t\u0006\u0002\u0002\u00b0\u00b2\u0005',
  '\u001a\u000e\b\u00b1\u00ae\u0003\u0002\u0002\u0002\u00b2\u00b5\u0003',
  '\u0002\u0002\u0002\u00b3\u00b1\u0003\u0002\u0002\u0002\u00b3\u00b4\u0003',
  '\u0002\u0002\u0002\u00b4\u001b\u0003\u0002\u0002\u0002\u00b5\u00b3\u0003',
  '\u0002\u0002\u0002\u00b6\u00b8\t\u0007\u0002\u0002\u00b7\u00b9\u0005',
  '\u0006\u0004\u0002\u00b8\u00b7\u0003\u0002\u0002\u0002\u00b8\u00b9\u0003',
  '\u0002\u0002\u0002\u00b9\u001d\u0003\u0002\u0002\u0002\u00ba\u00bb\u0005',
  '&\u0014\u0002\u00bb\u001f\u0003\u0002\u0002\u0002\u00bc\u00bd\u0007',
  '\u001d\u0002\u0002\u00bd\u00c2\u0005"\u0012\u0002\u00be\u00bf\u0007',
  '"\u0002\u0002\u00bf\u00c1\u0005"\u0012\u0002\u00c0\u00be\u0003\u0002',
  '\u0002\u0002\u00c1\u00c4\u0003\u0002\u0002\u0002\u00c2\u00c0\u0003\u0002',
  '\u0002\u0002\u00c2\u00c3\u0003\u0002\u0002\u0002\u00c3\u00c5\u0003\u0002',
  '\u0002\u0002\u00c4\u00c2\u0003\u0002\u0002\u0002\u00c5\u00c6\u0007\u001e',
  '\u0002\u0002\u00c6\u00ca\u0003\u0002\u0002\u0002\u00c7\u00c8\u0007\u001d',
  '\u0002\u0002\u00c8\u00ca\u0007\u001e\u0002\u0002\u00c9\u00bc\u0003\u0002',
  '\u0002\u0002\u00c9\u00c7\u0003\u0002\u0002\u0002\u00ca!\u0003\u0002',
  '\u0002\u0002\u00cb\u00cc\u0007,\u0002\u0002\u00cc\u00cd\u0007!\u0002',
  '\u0002\u00cd\u00ce\u0005&\u0014\u0002\u00ce#\u0003\u0002\u0002\u0002',
  '\u00cf\u00d0\u0007\u001f\u0002\u0002\u00d0\u00d5\u0005&\u0014\u0002',
  '\u00d1\u00d2\u0007"\u0002\u0002\u00d2\u00d4\u0005&\u0014\u0002\u00d3',
  '\u00d1\u0003\u0002\u0002\u0002\u00d4\u00d7\u0003\u0002\u0002\u0002\u00d5',
  '\u00d3\u0003\u0002\u0002\u0002\u00d5\u00d6\u0003\u0002\u0002\u0002\u00d6',
  '\u00d8\u0003\u0002\u0002\u0002\u00d7\u00d5\u0003\u0002\u0002\u0002\u00d8',
  '\u00d9\u0007 \u0002\u0002\u00d9\u00dd\u0003\u0002\u0002\u0002\u00da',
  '\u00db\u0007\u001f\u0002\u0002\u00db\u00dd\u0007 \u0002\u0002\u00dc',
  '\u00cf\u0003\u0002\u0002\u0002\u00dc\u00da\u0003\u0002\u0002\u0002\u00dd',
  '%\u0003\u0002\u0002\u0002\u00de\u00e6\u0007,\u0002\u0002\u00df\u00e6',
  '\u0007-\u0002\u0002\u00e0\u00e6\u0005 \u0011\u0002\u00e1\u00e6\u0005',
  '$\u0013\u0002\u00e2\u00e6\u0007\u001a\u0002\u0002\u00e3\u00e6\u0007',
  '\u001b\u0002\u0002\u00e4\u00e6\u0007\u001c\u0002\u0002\u00e5\u00de\u0003',
  '\u0002\u0002\u0002\u00e5\u00df\u0003\u0002\u0002\u0002\u00e5\u00e0\u0003',
  '\u0002\u0002\u0002\u00e5\u00e1\u0003\u0002\u0002\u0002\u00e5\u00e2\u0003',
  '\u0002\u0002\u0002\u00e5\u00e3\u0003\u0002\u0002\u0002\u00e5\u00e4\u0003',
  "\u0002\u0002\u0002\u00e6'\u0003\u0002\u0002\u0002\u001e*5<?AGLPRWg",
  'sz\u0081\u0083\u0086\u008a\u008e\u0090\u0094\u00ac\u00b3\u00b8\u00c2',
  '\u00c9\u00d5\u00dc\u00e5',
].join('');

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4.dfa.DFA(ds, index));

const sharedContextCache = new antlr4.PredictionContextCache();

export default class JSONPathParser extends antlr4.Parser {
  static grammarFileName = 'JSONPath.g4';
  static literalNames = [
    null,
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
  static symbolicNames = [
    null,
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
  static ruleNames = [
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

  constructor(input) {
    super(input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = JSONPathParser.ruleNames;
    this.literalNames = JSONPathParser.literalNames;
    this.symbolicNames = JSONPathParser.symbolicNames;
  }

  get atn() {
    return atn;
  }

  sempred(localctx, ruleIndex, predIndex) {
    switch (ruleIndex) {
      case 1:
        return this.filterarg_sempred(localctx, predIndex);
      case 12:
        return this.expression_sempred(localctx, predIndex);
      default:
        throw 'No predicate with index:' + ruleIndex;
    }
  }

  filterarg_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 4);
      case 1:
        return this.precpred(this._ctx, 3);
      default:
        throw 'No predicate with index:' + predIndex;
    }
  }

  expression_sempred(localctx, predIndex) {
    switch (predIndex) {
      case 2:
        return this.precpred(this._ctx, 5);
      default:
        throw 'No predicate with index:' + predIndex;
    }
  }

  jsonpath() {
    let localctx = new JsonpathContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, JSONPathParser.RULE_jsonpath);
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 38;
      this.match(JSONPathParser.ROOT_VALUE);
      this.state = 40;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (
        (_la & ~0x1f) == 0 &&
        ((1 << _la) &
          ((1 << JSONPathParser.DOTDOT) | (1 << JSONPathParser.DOT) | (1 << JSONPathParser.BRACKET_LEFT))) !==
          0
      ) {
        this.state = 39;
        this.subscript();
      }

      this.state = 42;
      this.match(JSONPathParser.EOF);
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    if (_p === undefined) {
      _p = 0;
    }
    const _parentctx = this._ctx;
    const _parentState = this.state;
    let localctx = new FilterargContext(this, this._ctx, _parentState);
    let _prevctx = localctx;
    const _startState = 2;
    this.enterRecursionRule(localctx, 2, JSONPathParser.RULE_filterarg, _p);
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 51;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.PAREN_LEFT:
          this.state = 45;
          this.match(JSONPathParser.PAREN_LEFT);
          this.state = 46;
          this.filterarg(0);
          this.state = 47;
          this.match(JSONPathParser.PAREN_RIGHT);
          break;
        case JSONPathParser.TRUE:
        case JSONPathParser.FALSE:
        case JSONPathParser.NULL:
        case JSONPathParser.BRACE_LEFT:
        case JSONPathParser.BRACKET_LEFT:
        case JSONPathParser.STRING:
        case JSONPathParser.NUMBER:
          this.state = 49;
          this.value();
          break;
        case JSONPathParser.CURRENT_VALUE:
        case JSONPathParser.ROOT_VALUE:
          this.state = 50;
          this.filterpath();
          break;
        default:
          throw new antlr4.error.NoViableAltException(this);
      }
      this._ctx.stop = this._input.LT(-1);
      this.state = 63;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
      while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent();
          }
          _prevctx = localctx;
          this.state = 61;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 3, this._ctx);
          switch (la_) {
            case 1:
              localctx = new FilterargContext(this, _parentctx, _parentState);
              this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_filterarg);
              this.state = 53;
              if (!this.precpred(this._ctx, 4)) {
                throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 4)');
              }
              this.state = 54;
              _la = this._input.LA(1);
              if (!(_la === JSONPathParser.STAR || _la === JSONPathParser.DIV)) {
                this._errHandler.recoverInline(this);
              } else {
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
              if (!this.precpred(this._ctx, 3)) {
                throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 3)');
              }
              this.state = 58;
              this._errHandler.sync(this);
              _la = this._input.LA(1);
              if (_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS) {
                this.state = 57;
                _la = this._input.LA(1);
                if (!(_la === JSONPathParser.MINUS_SP || _la === JSONPathParser.PLUS)) {
                  this._errHandler.recoverInline(this);
                } else {
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
        _alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
      }
    } catch (error) {
      if (error instanceof antlr4.error.RecognitionException) {
        localctx.exception = error;
        this._errHandler.reportError(this, error);
        this._errHandler.recover(this, error);
      } else {
        throw error;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }

  subscript() {
    let localctx = new SubscriptContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, JSONPathParser.RULE_subscript);
    try {
      this.state = 80;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.DOTDOT:
          this.enterOuterAlt(localctx, 1);
          this.state = 66;
          this.match(JSONPathParser.DOTDOT);
          this.state = 67;
          this.dotdotContent();
          this.state = 69;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 5, this._ctx);
          if (la_ === 1) {
            this.state = 68;
            this.subscript();
          }
          break;
        case JSONPathParser.DOT:
          this.enterOuterAlt(localctx, 2);
          this.state = 71;
          this.match(JSONPathParser.DOT);
          this.state = 72;
          this.dotContent();
          this.state = 74;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
          if (la_ === 1) {
            this.state = 73;
            this.subscript();
          }
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(localctx, 3);
          this.state = 76;
          this.bracket();
          this.state = 78;
          this._errHandler.sync(this);
          var la_ = this._interp.adaptivePredict(this._input, 7, this._ctx);
          if (la_ === 1) {
            this.state = 77;
            this.subscript();
          }
          break;
        default:
          throw new antlr4.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      switch (this._input.LA(1)) {
        case JSONPathParser.STAR:
          this.enterOuterAlt(localctx, 1);
          this.state = 82;
          this.match(JSONPathParser.STAR);
          break;
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(localctx, 2);
          this.state = 83;
          this.match(JSONPathParser.IDENTIFIER);
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(localctx, 3);
          this.state = 84;
          this.bracket();
          break;
        default:
          throw new antlr4.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 87;
      _la = this._input.LA(1);
      if (!(_la === JSONPathParser.STAR || _la === JSONPathParser.IDENTIFIER || _la === JSONPathParser.NUMBER)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 89;
      this.match(JSONPathParser.BRACKET_LEFT);
      this.state = 90;
      this.bracketContent();
      this.state = 91;
      this.match(JSONPathParser.BRACKET_RIGHT);
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 101;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 10, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 93;
          this.unions();
          break;

        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 94;
          this.indexes();
          break;

        case 3:
          this.enterOuterAlt(localctx, 3);
          this.state = 95;
          this.slices();
          break;

        case 4:
          this.enterOuterAlt(localctx, 4);
          this.state = 96;
          this.match(JSONPathParser.STAR);
          break;

        case 5:
          this.enterOuterAlt(localctx, 5);
          this.state = 97;
          this.match(JSONPathParser.NUMBER);
          break;

        case 6:
          this.enterOuterAlt(localctx, 6);
          this.state = 98;
          this.match(JSONPathParser.STRING);
          break;

        case 7:
          this.enterOuterAlt(localctx, 7);
          this.state = 99;
          this.match(JSONPathParser.IDENTIFIER);
          break;

        case 8:
          this.enterOuterAlt(localctx, 8);
          this.state = 100;
          this.filterExpression();
          break;
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 103;
      this.match(JSONPathParser.QUESTION);
      this.state = 104;
      this.match(JSONPathParser.PAREN_LEFT);
      this.state = 105;
      this.expression(0);
      this.state = 106;
      this.match(JSONPathParser.PAREN_RIGHT);
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 108;
      this.match(JSONPathParser.NUMBER);
      this.state = 111;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      do {
        this.state = 109;
        this.match(JSONPathParser.COMMA);
        this.state = 110;
        this.match(JSONPathParser.NUMBER);
        this.state = 113;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
      } while (_la === JSONPathParser.COMMA);
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.state = 129;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(localctx, 1);
          this.state = 115;
          this.match(JSONPathParser.STRING);
          this.state = 118;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          do {
            this.state = 116;
            this.match(JSONPathParser.COMMA);
            this.state = 117;
            this.match(JSONPathParser.STRING);
            this.state = 120;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          } while (_la === JSONPathParser.COMMA);
          break;
        case JSONPathParser.IDENTIFIER:
          this.enterOuterAlt(localctx, 2);
          this.state = 122;
          this.match(JSONPathParser.IDENTIFIER);
          this.state = 125;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          do {
            this.state = 123;
            this.match(JSONPathParser.COMMA);
            this.state = 124;
            this.match(JSONPathParser.IDENTIFIER);
            this.state = 127;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          } while (_la === JSONPathParser.COMMA);
          break;
        default:
          throw new antlr4.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 132;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === JSONPathParser.NUMBER) {
        this.state = 131;
        this.match(JSONPathParser.NUMBER);
      }

      this.state = 134;
      this.match(JSONPathParser.COLON);
      this.state = 136;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === JSONPathParser.NUMBER) {
        this.state = 135;
        this.match(JSONPathParser.NUMBER);
      }

      this.state = 142;
      this._errHandler.sync(this);
      _la = this._input.LA(1);
      if (_la === JSONPathParser.COLON) {
        this.state = 138;
        this.match(JSONPathParser.COLON);
        this.state = 140;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === JSONPathParser.NUMBER) {
          this.state = 139;
          this.match(JSONPathParser.NUMBER);
        }
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 144;
      this.match(JSONPathParser.REGEX_EXPR);
      this.state = 146;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 19, this._ctx);
      if (la_ === 1) {
        this.state = 145;
        this.match(JSONPathParser.REGEX_OPT);
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    if (_p === undefined) {
      _p = 0;
    }
    const _parentctx = this._ctx;
    const _parentState = this.state;
    let localctx = new ExpressionContext(this, this._ctx, _parentState);
    let _prevctx = localctx;
    const _startState = 24;
    this.enterRecursionRule(localctx, 24, JSONPathParser.RULE_expression, _p);
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 170;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 20, this._ctx);
      switch (la_) {
        case 1:
          this.state = 149;
          this.match(JSONPathParser.NOT);
          this.state = 150;
          this.match(JSONPathParser.PAREN_LEFT);
          this.state = 151;
          this.expression(0);
          this.state = 152;
          this.match(JSONPathParser.PAREN_RIGHT);
          break;

        case 2:
          this.state = 154;
          this.match(JSONPathParser.PAREN_LEFT);
          this.state = 155;
          this.expression(0);
          this.state = 156;
          this.match(JSONPathParser.PAREN_RIGHT);
          break;

        case 3:
          this.state = 158;
          this.filterarg(0);
          this.state = 159;
          _la = this._input.LA(1);
          if (
            !(
              (_la & ~0x1f) == 0 &&
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
            this._errHandler.reportMatch(this);
            this.consume();
          }
          this.state = 160;
          this.filterarg(0);
          break;

        case 4:
          this.state = 162;
          this.filterarg(0);
          this.state = 163;
          this.match(JSONPathParser.REG);
          this.state = 164;
          this.regex();
          break;

        case 5:
          this.state = 166;
          this.filterarg(0);
          this.state = 167;
          this.match(JSONPathParser.EMPT);
          break;

        case 6:
          this.state = 169;
          this.filterpath();
          break;
      }
      this._ctx.stop = this._input.LT(-1);
      this.state = 177;
      this._errHandler.sync(this);
      var _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
      while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
        if (_alt === 1) {
          if (this._parseListeners !== null) {
            this.triggerExitRuleEvent();
          }
          _prevctx = localctx;
          localctx = new ExpressionContext(this, _parentctx, _parentState);
          this.pushNewRecursionContext(localctx, _startState, JSONPathParser.RULE_expression);
          this.state = 172;
          if (!this.precpred(this._ctx, 5)) {
            throw new antlr4.error.FailedPredicateException(this, 'this.precpred(this._ctx, 5)');
          }
          this.state = 173;
          _la = this._input.LA(1);
          if (!(_la === JSONPathParser.AND || _la === JSONPathParser.OR)) {
            this._errHandler.recoverInline(this);
          } else {
            this._errHandler.reportMatch(this);
            this.consume();
          }
          this.state = 174;
          this.expression(6);
        }
        this.state = 179;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 21, this._ctx);
      }
    } catch (error) {
      if (error instanceof antlr4.error.RecognitionException) {
        localctx.exception = error;
        this._errHandler.reportError(this, error);
        this._errHandler.recover(this, error);
      } else {
        throw error;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }

  filterpath() {
    let localctx = new FilterpathContext(this, this._ctx, this.state);
    this.enterRule(localctx, 26, JSONPathParser.RULE_filterpath);
    var _la = 0; // Token type
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 180;
      _la = this._input.LA(1);
      if (!(_la === JSONPathParser.CURRENT_VALUE || _la === JSONPathParser.ROOT_VALUE)) {
        this._errHandler.recoverInline(this);
      } else {
        this._errHandler.reportMatch(this);
        this.consume();
      }
      this.state = 182;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 22, this._ctx);
      if (la_ === 1) {
        this.state = 181;
        this.subscript();
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    this.enterRule(localctx, 28, JSONPathParser.RULE_json);
    try {
      this.enterOuterAlt(localctx, 1);
      this.state = 184;
      this.value();
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.state = 199;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 24, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 186;
          this.match(JSONPathParser.BRACE_LEFT);
          this.state = 187;
          this.pair();
          this.state = 192;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === JSONPathParser.COMMA) {
            this.state = 188;
            this.match(JSONPathParser.COMMA);
            this.state = 189;
            this.pair();
            this.state = 194;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          this.state = 195;
          this.match(JSONPathParser.BRACE_RIGHT);
          break;

        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 197;
          this.match(JSONPathParser.BRACE_LEFT);
          this.state = 198;
          this.match(JSONPathParser.BRACE_RIGHT);
          break;
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 201;
      this.match(JSONPathParser.STRING);
      this.state = 202;
      this.match(JSONPathParser.COLON);
      this.state = 203;
      this.value();
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
    var _la = 0; // Token type
    try {
      this.state = 218;
      this._errHandler.sync(this);
      var la_ = this._interp.adaptivePredict(this._input, 26, this._ctx);
      switch (la_) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          this.state = 205;
          this.match(JSONPathParser.BRACKET_LEFT);
          this.state = 206;
          this.value();
          this.state = 211;
          this._errHandler.sync(this);
          _la = this._input.LA(1);
          while (_la === JSONPathParser.COMMA) {
            this.state = 207;
            this.match(JSONPathParser.COMMA);
            this.state = 208;
            this.value();
            this.state = 213;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
          }
          this.state = 214;
          this.match(JSONPathParser.BRACKET_RIGHT);
          break;

        case 2:
          this.enterOuterAlt(localctx, 2);
          this.state = 216;
          this.match(JSONPathParser.BRACKET_LEFT);
          this.state = 217;
          this.match(JSONPathParser.BRACKET_RIGHT);
          break;
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
      this.state = 227;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case JSONPathParser.STRING:
          this.enterOuterAlt(localctx, 1);
          this.state = 220;
          this.match(JSONPathParser.STRING);
          break;
        case JSONPathParser.NUMBER:
          this.enterOuterAlt(localctx, 2);
          this.state = 221;
          this.match(JSONPathParser.NUMBER);
          break;
        case JSONPathParser.BRACE_LEFT:
          this.enterOuterAlt(localctx, 3);
          this.state = 222;
          this.obj();
          break;
        case JSONPathParser.BRACKET_LEFT:
          this.enterOuterAlt(localctx, 4);
          this.state = 223;
          this.array();
          break;
        case JSONPathParser.TRUE:
          this.enterOuterAlt(localctx, 5);
          this.state = 224;
          this.match(JSONPathParser.TRUE);
          break;
        case JSONPathParser.FALSE:
          this.enterOuterAlt(localctx, 6);
          this.state = 225;
          this.match(JSONPathParser.FALSE);
          break;
        case JSONPathParser.NULL:
          this.enterOuterAlt(localctx, 7);
          this.state = 226;
          this.match(JSONPathParser.NULL);
          break;
        default:
          throw new antlr4.error.NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof antlr4.error.RecognitionException) {
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
JSONPathParser.IDENTIFIER = 41;
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
JSONPathParser.RULE_json = 14;
JSONPathParser.RULE_obj = 15;
JSONPathParser.RULE_pair = 16;
JSONPathParser.RULE_array = 17;
JSONPathParser.RULE_value = 18;

class JsonpathContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_jsonpath;
  }

  ROOT_VALUE() {
    return this.getToken(JSONPathParser.ROOT_VALUE, 0);
  }

  EOF() {
    return this.getToken(JSONPathParser.EOF, 0);
  }

  subscript() {
    return this.getTypedRuleContext(SubscriptContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterJsonpath(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitJsonpath(this);
    }
  }
}

class FilterargContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_filterarg;
  }

  PAREN_LEFT() {
    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
  }

  filterarg = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(FilterargContext);
    } else {
      return this.getTypedRuleContext(FilterargContext, i);
    }
  };

  PAREN_RIGHT() {
    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
  }

  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }

  filterpath() {
    return this.getTypedRuleContext(FilterpathContext, 0);
  }

  STAR() {
    return this.getToken(JSONPathParser.STAR, 0);
  }

  DIV() {
    return this.getToken(JSONPathParser.DIV, 0);
  }

  PLUS() {
    return this.getToken(JSONPathParser.PLUS, 0);
  }

  MINUS_SP() {
    return this.getToken(JSONPathParser.MINUS_SP, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterFilterarg(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitFilterarg(this);
    }
  }
}

class SubscriptContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_subscript;
  }

  DOTDOT() {
    return this.getToken(JSONPathParser.DOTDOT, 0);
  }

  dotdotContent() {
    return this.getTypedRuleContext(DotdotContentContext, 0);
  }

  subscript() {
    return this.getTypedRuleContext(SubscriptContext, 0);
  }

  DOT() {
    return this.getToken(JSONPathParser.DOT, 0);
  }

  dotContent() {
    return this.getTypedRuleContext(DotContentContext, 0);
  }

  bracket() {
    return this.getTypedRuleContext(BracketContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterSubscript(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitSubscript(this);
    }
  }
}

class DotdotContentContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_dotdotContent;
  }

  STAR() {
    return this.getToken(JSONPathParser.STAR, 0);
  }

  IDENTIFIER() {
    return this.getToken(JSONPathParser.IDENTIFIER, 0);
  }

  bracket() {
    return this.getTypedRuleContext(BracketContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterDotdotContent(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitDotdotContent(this);
    }
  }
}

class DotContentContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_dotContent;
  }

  STAR() {
    return this.getToken(JSONPathParser.STAR, 0);
  }

  NUMBER() {
    return this.getToken(JSONPathParser.NUMBER, 0);
  }

  IDENTIFIER() {
    return this.getToken(JSONPathParser.IDENTIFIER, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterDotContent(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitDotContent(this);
    }
  }
}

class BracketContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_bracket;
  }

  BRACKET_LEFT() {
    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
  }

  bracketContent() {
    return this.getTypedRuleContext(BracketContentContext, 0);
  }

  BRACKET_RIGHT() {
    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterBracket(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitBracket(this);
    }
  }
}

class BracketContentContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_bracketContent;
  }

  unions() {
    return this.getTypedRuleContext(UnionsContext, 0);
  }

  indexes() {
    return this.getTypedRuleContext(IndexesContext, 0);
  }

  slices() {
    return this.getTypedRuleContext(SlicesContext, 0);
  }

  STAR() {
    return this.getToken(JSONPathParser.STAR, 0);
  }

  NUMBER() {
    return this.getToken(JSONPathParser.NUMBER, 0);
  }

  STRING() {
    return this.getToken(JSONPathParser.STRING, 0);
  }

  IDENTIFIER() {
    return this.getToken(JSONPathParser.IDENTIFIER, 0);
  }

  filterExpression() {
    return this.getTypedRuleContext(FilterExpressionContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterBracketContent(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitBracketContent(this);
    }
  }
}

class FilterExpressionContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_filterExpression;
  }

  QUESTION() {
    return this.getToken(JSONPathParser.QUESTION, 0);
  }

  PAREN_LEFT() {
    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
  }

  expression() {
    return this.getTypedRuleContext(ExpressionContext, 0);
  }

  PAREN_RIGHT() {
    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterFilterExpression(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitFilterExpression(this);
    }
  }
}

class IndexesContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_indexes;
  }

  NUMBER = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.NUMBER);
    } else {
      return this.getToken(JSONPathParser.NUMBER, i);
    }
  };

  COMMA = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.COMMA);
    } else {
      return this.getToken(JSONPathParser.COMMA, i);
    }
  };

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterIndexes(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitIndexes(this);
    }
  }
}

class UnionsContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_unions;
  }

  STRING = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.STRING);
    } else {
      return this.getToken(JSONPathParser.STRING, i);
    }
  };

  COMMA = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.COMMA);
    } else {
      return this.getToken(JSONPathParser.COMMA, i);
    }
  };

  IDENTIFIER = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.IDENTIFIER);
    } else {
      return this.getToken(JSONPathParser.IDENTIFIER, i);
    }
  };

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterUnions(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitUnions(this);
    }
  }
}

class SlicesContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_slices;
  }

  COLON = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.COLON);
    } else {
      return this.getToken(JSONPathParser.COLON, i);
    }
  };

  NUMBER = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.NUMBER);
    } else {
      return this.getToken(JSONPathParser.NUMBER, i);
    }
  };

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterSlices(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitSlices(this);
    }
  }
}

class RegexContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_regex;
  }

  REGEX_EXPR() {
    return this.getToken(JSONPathParser.REGEX_EXPR, 0);
  }

  REGEX_OPT() {
    return this.getToken(JSONPathParser.REGEX_OPT, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterRegex(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitRegex(this);
    }
  }
}

class ExpressionContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_expression;
  }

  NOT() {
    return this.getToken(JSONPathParser.NOT, 0);
  }

  PAREN_LEFT() {
    return this.getToken(JSONPathParser.PAREN_LEFT, 0);
  }

  expression = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ExpressionContext);
    } else {
      return this.getTypedRuleContext(ExpressionContext, i);
    }
  };

  PAREN_RIGHT() {
    return this.getToken(JSONPathParser.PAREN_RIGHT, 0);
  }

  filterarg = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(FilterargContext);
    } else {
      return this.getTypedRuleContext(FilterargContext, i);
    }
  };

  EQ() {
    return this.getToken(JSONPathParser.EQ, 0);
  }

  NE() {
    return this.getToken(JSONPathParser.NE, 0);
  }

  LT() {
    return this.getToken(JSONPathParser.LT, 0);
  }

  LE() {
    return this.getToken(JSONPathParser.LE, 0);
  }

  GT() {
    return this.getToken(JSONPathParser.GT, 0);
  }

  GE() {
    return this.getToken(JSONPathParser.GE, 0);
  }

  IN() {
    return this.getToken(JSONPathParser.IN, 0);
  }

  NIN() {
    return this.getToken(JSONPathParser.NIN, 0);
  }

  SUB() {
    return this.getToken(JSONPathParser.SUB, 0);
  }

  ANY() {
    return this.getToken(JSONPathParser.ANY, 0);
  }

  SIZO() {
    return this.getToken(JSONPathParser.SIZO, 0);
  }

  NON() {
    return this.getToken(JSONPathParser.NON, 0);
  }

  SIZ() {
    return this.getToken(JSONPathParser.SIZ, 0);
  }

  REG() {
    return this.getToken(JSONPathParser.REG, 0);
  }

  regex() {
    return this.getTypedRuleContext(RegexContext, 0);
  }

  EMPT() {
    return this.getToken(JSONPathParser.EMPT, 0);
  }

  filterpath() {
    return this.getTypedRuleContext(FilterpathContext, 0);
  }

  AND() {
    return this.getToken(JSONPathParser.AND, 0);
  }

  OR() {
    return this.getToken(JSONPathParser.OR, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterExpression(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitExpression(this);
    }
  }
}

class FilterpathContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_filterpath;
  }

  ROOT_VALUE() {
    return this.getToken(JSONPathParser.ROOT_VALUE, 0);
  }

  CURRENT_VALUE() {
    return this.getToken(JSONPathParser.CURRENT_VALUE, 0);
  }

  subscript() {
    return this.getTypedRuleContext(SubscriptContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterFilterpath(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitFilterpath(this);
    }
  }
}

class JsonContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_json;
  }

  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterJson(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitJson(this);
    }
  }
}

class ObjContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_obj;
  }

  BRACE_LEFT() {
    return this.getToken(JSONPathParser.BRACE_LEFT, 0);
  }

  pair = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(PairContext);
    } else {
      return this.getTypedRuleContext(PairContext, i);
    }
  };

  BRACE_RIGHT() {
    return this.getToken(JSONPathParser.BRACE_RIGHT, 0);
  }

  COMMA = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.COMMA);
    } else {
      return this.getToken(JSONPathParser.COMMA, i);
    }
  };

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterObj(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitObj(this);
    }
  }
}

class PairContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_pair;
  }

  STRING() {
    return this.getToken(JSONPathParser.STRING, 0);
  }

  COLON() {
    return this.getToken(JSONPathParser.COLON, 0);
  }

  value() {
    return this.getTypedRuleContext(ValueContext, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterPair(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitPair(this);
    }
  }
}

class ArrayContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_array;
  }

  BRACKET_LEFT() {
    return this.getToken(JSONPathParser.BRACKET_LEFT, 0);
  }

  value = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTypedRuleContexts(ValueContext);
    } else {
      return this.getTypedRuleContext(ValueContext, i);
    }
  };

  BRACKET_RIGHT() {
    return this.getToken(JSONPathParser.BRACKET_RIGHT, 0);
  }

  COMMA = function (i) {
    if (i === undefined) {
      i = null;
    }
    if (i === null) {
      return this.getTokens(JSONPathParser.COMMA);
    } else {
      return this.getToken(JSONPathParser.COMMA, i);
    }
  };

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterArray(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.exitArray(this);
    }
  }
}

class ValueContext extends antlr4.ParserRuleContext {
  constructor(parser, parent, invokingState) {
    if (parent === undefined) {
      parent = null;
    }
    if (invokingState === undefined || invokingState === null) {
      invokingState = -1;
    }
    super(parent, invokingState);
    this.parser = parser;
    this.ruleIndex = JSONPathParser.RULE_value;
  }

  STRING() {
    return this.getToken(JSONPathParser.STRING, 0);
  }

  NUMBER() {
    return this.getToken(JSONPathParser.NUMBER, 0);
  }

  obj() {
    return this.getTypedRuleContext(ObjContext, 0);
  }

  array() {
    return this.getTypedRuleContext(ArrayContext, 0);
  }

  TRUE() {
    return this.getToken(JSONPathParser.TRUE, 0);
  }

  FALSE() {
    return this.getToken(JSONPathParser.FALSE, 0);
  }

  NULL() {
    return this.getToken(JSONPathParser.NULL, 0);
  }

  enterRule(listener) {
    if (listener instanceof JSONPathListener) {
      listener.enterValue(this);
    }
  }

  exitRule(listener) {
    if (listener instanceof JSONPathListener) {
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
JSONPathParser.JsonContext = JsonContext;
JSONPathParser.ObjContext = ObjContext;
JSONPathParser.PairContext = PairContext;
JSONPathParser.ArrayContext = ArrayContext;
JSONPathParser.ValueContext = ValueContext;
