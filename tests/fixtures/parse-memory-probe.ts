/**
 * Parses a 900,000-character filter in a child process whose heap is capped
 * (see tests/hardening.test.ts). The parser memoizes a few rules per input
 * position; memoizing every filter rule needed several times the memory.
 */
import { parse } from '../../src';

parse('$[?' + '@&&'.repeat(300_000) + '@]');
process.stdout.write('ok\n');
