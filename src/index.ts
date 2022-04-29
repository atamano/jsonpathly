import { query } from './handler/query';
import { JSONPathSyntaxError } from './parser/errors';
import { parse } from './parser/parse';
import { stringify } from './parser/stringify';

export { query, JSONPathSyntaxError, parse, stringify };

Object.assign(module.exports, { query, JSONPathSyntaxError, parse, stringify });
