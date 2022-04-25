import { RuleContext } from 'antlr4ts/RuleContext';

export class JSONPathSyntaxError extends Error {
  line: number;
  charPositionInLine: number;
  msg: string;

  constructor(line: number, charPositionInLine: number, msg: string) {
    super(msg);
    this.line = line;
    this.charPositionInLine = charPositionInLine;
    this.msg = msg;
  }
}

export class JSONPathValidationError extends Error {
  rule: RuleContext | null;

  constructor(msg: string, rule: RuleContext | null) {
    super(msg);
    this.rule = rule;
  }
}
