# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.1] - 2026-11-04

### Fixed

- 3.2.0 raised the default step budget floor to 10,000,000, which let a hostile query allocate ten times more (paths, membership indexes, traversal frames) before `JSONPathLimitError` and exhaust the heap on a small document. The floor is back to 1,000,000; the document is now weighed incrementally, as far as the budget needs, so a query that stops soon after the floor no longer pays a full pass over a large document, and ordinary queries keep the speed of 3.2.0.
- The bound on retained nodes allows 20 per document node (10 rejected `$..*..*` results that fit the step budget) and is documented as covered by `maxSteps` when one is given.

## [3.2.0] - 2026-11-04

### Security

- Name selectors used the `in` operator, which also sees inherited members: `$.constructor` returned `Object`, `$['__proto__']` returned `Object.prototype` itself (a caller modifying that result changed every object in the process), and `$[?@.toString]` matched every object. Only the document's own members are now visible, array elements included: an index supplied by a non-standard array prototype reads as a hole.
- Fractional slice steps and indices were accepted: `$[1:2:1e-100]` never advanced and looped forever, filling memory. Indices and slice parameters, in brackets or after a dot (`$.0`), must now be integers, as RFC 9535 requires; anything else is a `JSONPathSyntaxError`.
- Nested filters took exponential time to parse (each level reparsed its operand four times): `$[?$[?$[?...@]]]` 12 levels deep took 10 seconds, even when invalid. The parser now memoizes the two filter rules that alternatives retry at the same position (filter operands, and the bodies of groups and negations), which makes parsing linear in the query length while plain paths parse as fast as before and memory stays close to 3.1.0.
- Subqueries on `$` inside a filter were re-evaluated for every candidate node, so `$[?$..x]` was quadratic in the document and nested `$` filters exponential in the nesting depth. They are now evaluated once per query, as is any comparison, function call, logical chain, group or negation that does not read `@` (`$.a == $.b`, `length($) > 0`, `!($.flag)`, the `true && ...` prefix of a longer condition). The right operand of `subsetof`, `anyof` and `noneof` is likewise indexed once per query when it does not read `@` (`@.tags subsetof $.allowed`).
- Some queries remain polynomial by nature (`$..[?@..[?@..a]]`, `$..*..*..*`, repeated unions such as `$[0,0][0,0]...`). Evaluation now stops with the new `JSONPathLimitError` after `maxSteps` steps (default: the larger of 10,000,000 and 100 per document node or string character, plus a linear scan of the document's strings by the largest regex used). Steps count nodes selected, selectors tried, expressions evaluated, values compared, and string characters compared or scanned by a regex. A query may also place at most the larger of 1,000,000 and 10 per document node nodes in its nodelists, so repeated unions cannot exhaust memory on a small document. `&&` and `||` now short-circuit.
- Deeply nested documents (around 5,000 levels), long `&&`/`+` chains, long paths and deeply nested parentheses threw `RangeError: Maximum call stack size exceeded`. Descendant segments, equality, segment chains, operator chains and `stringify()` are now iterative, and a parser stack overflow is reported as a `JSONPathSyntaxError`.
- `{"__proto__": ...}` in an object literal of a filter set the literal's prototype instead of defining a member, so `@ == {"__proto__":{"x":1}}` matched `{}`.

### Added

- `maxSteps` option for `query()` and `paths()`, and the `JSONPathLimitError` class.

### Changed

- A query that used to run for very long now throws `JSONPathLimitError`. A heavy but legitimate query, such as a filter with thousands of conditions over a large document, may need a higher `maxSteps`.
- Expressions can be nested slightly less deeply before the parser reports "Expression is nested too deeply": about 950 parentheses instead of 1,150 on Node 20 and 22.
- Member names are limited to 1,000 characters, in queries and documents alike: a longer name in a query is a `JSONPathSyntaxError`, and a query that enumerates or compares an object holding one fails with a `JSONPathLimitError`. V8 hashes strings longer than 16,383 characters by their length alone, which made every lookup of such names compare them one by one; no real document needs such names.
- A document array (necessarily a Proxy) reporting a length that is not a valid array length, or a hand-built AST holding a non-string where a string is expected, is a `TypeError` instead of an endless loop. Getters in a document run once per read and in the order of the recursive traversal, as in 3.1.0.

## [3.1.0] - 2026-11-03

### Changed

- Node.js 18 (end of life since April 2025) is no longer supported: `engines.node` is now `>=20` and CI tests on Node 20, 22 and 24. The library code itself is unchanged.
- Development tooling updated (mocha 12, c8 12, eslint 10); `npm audit` reports no known vulnerabilities in the development dependencies.

## [3.0.2] - 2026-11-03

### Security

- Filter regexes (`=~`, `match()`, `search()`) ran the query's pattern on V8's backtracking engine, so a pattern such as `(a+)+$` against a long string could block the event loop for minutes (ReDoS, [GHSA-3v46-5wmv-g87p](https://github.com/atamano/jsonpathly/security/advisories/GHSA-3v46-5wmv-g87p)). Patterns are now evaluated by a linear-time automaton: matching takes time proportional to the string length times the pattern size, whatever the pattern. Reported by [NotAFlightRisk](https://github.com/NotAFlightRisk).

### Fixed

- `\\\\1` (an escaped backslash followed by a digit) was rejected as a backreference by the I-Regexp validation; it is now accepted as the literal it is.

### Changed

- Filter regexes now match nothing, like an invalid pattern, when they exceed one of these limits: 1000 characters, 16 `\p{...}`/`\P{...}` escapes, or 1000 instructions once compiled (for example `[a-z]{1,600}` or `(a{100}){100}`). Flags other than `d`, `g`, `i`, `m`, `s`, `u` and `y` are rejected.

## [3.0.1] - 2026-09-21

### Security

- Queries returning many nodes (`$.a[*]`, `$.a[*].b`, `$..b`, ...) took time quadratic in the number of results, so a large untrusted document could block the event loop for tens of seconds (denial of service). Results are now accumulated in place and these queries run in linear time. Reported and fixed by Alexi Turcotte (CISPA).

### Fixed

- A union containing a wildcard (`$.a[*,0]`) over a very large array no longer throws `RangeError: Maximum call stack size exceeded`.
- Wildcards skip the holes of sparse JavaScript arrays instead of throwing (`$[*].x`).

### Added

- `SECURITY.md` describing how to report vulnerabilities privately.

## [3.0.0] - 2025-01-09

### Breaking Changes

- **Path format**: Changed from double quotes to single quotes per RFC 9535
  - Before: `$["store"]["book"][0]`
  - After: `$['store']['book'][0]`

### Added

- RFC 9535 compliant functions: `length()`, `count()`, `match()`, `search()`, `value()`
- I-Regexp validation for `match()` and `search()` patterns
- Filter expressions without parentheses: `$[?@.price > 10]`
- Empty nodelist comparison support
- Integer range validation (I-JSON bounds)
- Comprehensive JSDoc documentation for all public APIs

### Changed

- Replaced ANTLR4 parser with Peggy for smaller bundle size
- Replaced webpack with tsup for faster builds
- Zero runtime dependencies (removed fast-deep-equal)
- Modularized codebase (extracted comparators, functions)

### Fixed

- Nested filter expressions in boolean context (Issue #14)
- Filters on primitive arrays (Issue #12)

## [2.0.2] - 2024-XX-XX

### Fixed

- Incorrect module import

## [2.0.1] - 2024-XX-XX

### Fixed

- GitHub Actions cache version

## [2.0.0] - 2024-XX-XX

### Changed

- Updated ANTLR4 version
- NodeJS webpack config fix

[Unreleased]: https://github.com/atamano/jsonpathly/compare/v3.0.1...HEAD
[3.0.1]: https://github.com/atamano/jsonpathly/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/atamano/jsonpathly/compare/v2.0.2...v3.0.0
[2.0.2]: https://github.com/atamano/jsonpathly/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/atamano/jsonpathly/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/atamano/jsonpathly/releases/tag/v2.0.0
