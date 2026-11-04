# jsonpathly

<img src="https://user-images.githubusercontent.com/9162276/166061295-a41b7d28-a1e9-4d17-9103-132a1ca20de8.png" width="350">

[![npm version](https://badge.fury.io/js/jsonpathly.svg)](https://badge.fury.io/js/jsonpathly)
[![codecov](https://codecov.io/gh/atamano/jsonpathly/branch/master/graph/badge.svg?token=QSSZGZMULF)](https://codecov.io/gh/atamano/jsonpathly)
[![Node.js](https://img.shields.io/node/v/jsonpathly.svg)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**A secure, expression-evaluation-free JSONPath implementation for TypeScript/JavaScript with RFC 9535 compliance.**

[Live Demo](https://atamano.github.io/jsonpathly-demo/) | [RFC 9535 Specification](https://datatracker.ietf.org/doc/html/rfc9535)

## Features

- **RFC 9535 compliant** - Follows the official JSONPath specification
- **Secure** - No dynamic code execution, no injection vulnerabilities
- **TypeScript native** - Full type definitions included
- **Dual module** - Works with ESM and CommonJS
- **Browser ready** - Works in Node.js and browsers

## Install

```bash
npm install jsonpathly
```

## Quick Start

```typescript
import { query, paths } from "jsonpathly";

const championship = {
  name: "World Chess Championship 2023",
  players: [
    { name: "Ding Liren", rating: 2788, country: "China" },
    { name: "Ian Nepomniachtchi", rating: 2795, country: "Russia" },
  ],
};

// Query values
query(championship, "$.players[*].name");
// => ["Ding Liren", "Ian Nepomniachtchi"]

// Get paths
paths(championship, "$.players[0]");
// => ["$['players'][0]"]

// Filter expressions
query(championship, "$.players[?@.rating > 2790].name");
// => ["Ian Nepomniachtchi"]
```

## JSONPath Syntax

JSONPath expressions start with `$` (root) and can use dot or bracket notation:

```
$.players[0].name
$['players'][0]['name']
```

### Operators

| Operator                  | Description                                                     |
| :------------------------ | :-------------------------------------------------------------- |
| `$`                       | Root element                                                    |
| `@`                       | Current element in filter expressions                           |
| `*`                       | Wildcard - matches all elements                                 |
| `..`                      | Recursive descent                                               |
| `.<name>`                 | Dot-notated child                                               |
| `['<name>']`              | Bracket-notated child                                           |
| `[<index>]`               | Array index                                                     |
| `[start:end:step]`        | Array slice                                                     |
| `[?<expression>]`         | Filter expression                                               |
| `[<expr>, <expr>]`        | Union - multiple selectors                                      |

### Filter Operators

| Operator   | Description                                              | Example                                        |
| :--------- | :------------------------------------------------------- | :--------------------------------------------- |
| `==`       | Equal                                                    | `$[?@.title == 'Grandmaster']`                 |
| `!=`       | Not equal                                                | `$[?@.country != 'Russia']`                    |
| `<`        | Less than                                                | `$[?@.rating < 2700]`                          |
| `<=`       | Less than or equal                                       | `$[?@.rating <= 2700]`                         |
| `>`        | Greater than                                             | `$[?@.rating > 2800]`                          |
| `>=`       | Greater than or equal                                    | `$[?@.rating >= 2800]`                         |
| `&&`       | Logical AND                                              | `$[?@.rating > 2700 && @.active]`              |
| `\|\|`     | Logical OR                                               | `$[?@.champion \|\| @.challenger]`             |
| `!`        | Logical NOT                                              | `$[?!@.retired]`                               |
| `=~`       | Regex match                                              | `$[?@.name =~ /^Magnus/i]`                     |

### RFC 9535 Functions

| Function     | Description                          | Example                                        |
| :----------- | :----------------------------------- | :--------------------------------------------- |
| `length()`   | Length of string, array, or object   | `$[?length(@.name) > 10]`                      |
| `count()`    | Count of elements in a nodelist      | `$[?count(@.titles[*]) > 5]`                   |
| `match()`    | Full string regex match              | `$[?match(@.title, '^GM.*')]`                  |
| `search()`   | Regex search within string           | `$[?search(@.name, 'Kasparov')]`               |
| `value()`    | Extract value from nodelist          | `$[?value(@.achievements[0]) == 'World Champion']` |

### Extension Operators

| Operator   | Description                                  | Example                                             |
| :--------- | :------------------------------------------- | :-------------------------------------------------- |
| `in`       | Value exists in array                        | `$[?@.federation in ['FIDE', 'USCF']]`              |
| `nin`      | Value not in array                           | `$[?@.result nin ['loss']]`                         |
| `subsetof` | Left is subset of right                      | `$[?@.titles subsetof ['GM', 'IM', 'FM']]`          |
| `anyof`    | Any element in common                        | `$[?@.styles anyof ['positional', 'tactical']]`     |
| `noneof`   | No elements in common                        | `$[?@.weaknesses noneof ['time trouble']]`          |
| `size`     | Array/string length equals                   | `$[?@.championships size 5]`                        |
| `empty`    | Array/string is empty                        | `$[?@.losses empty]`                                |

## API

### query(data, path, options?)

Query JSON data and return matching values.

```typescript
import { query } from "jsonpathly";

const legends = {
  champions: [
    { name: "Garry Kasparov", era: "1985-2000", rating: 2851 },
    { name: "Magnus Carlsen", era: "2013-2023", rating: 2882 },
  ],
};

query(legends, "$.champions[*].name");
// => ["Garry Kasparov", "Magnus Carlsen"]

query(legends, "$.champions[0].era");
// => "1985-2000"
```

**Options:**

| Option           | Type      | Description                                                      |
| :--------------- | :-------- | :--------------------------------------------------------------- |
| `hideExceptions` | `boolean` | Return `undefined` instead of throwing (or `[]` if `returnArray` is true) |
| `returnArray`    | `boolean` | Always return results as an array                                |
| `maxSteps`       | `number`  | Evaluation steps allowed before throwing `JSONPathLimitError` (default: the larger of 10,000,000 and 100 per document node or string character, plus a linear regex scan of the document's strings; `Infinity` disables it). Independently, a query may keep at most the larger of 1,000,000 and 100 per document node nodes live at once |

### paths(data, path, options?)

Get normalized paths to matching elements.

```typescript
import { paths } from "jsonpathly";

const tournament = {
  candidates: [
    { player: "Bobby Fischer", year: 1971 },
    { player: "Anatoly Karpov", year: 1974 },
  ],
};

paths(tournament, "$..player");
// => ["$['candidates'][0]['player']", "$['candidates'][1]['player']"]
```

**Options:**

| Option           | Type      | Description                              |
| :--------------- | :-------- | :--------------------------------------- |
| `hideExceptions` | `boolean` | Return empty array instead of throwing   |
| `maxSteps`       | `number`  | Same as for `query()`                    |

### parse(path)

Parse a JSONPath expression into an AST.

```typescript
import { parse } from "jsonpathly";

parse("$.players[0].rating");
// => { type: 'root', next: { type: 'subscript', ... } }
```

### stringify(ast)

Convert an AST back to a JSONPath string.

```typescript
import { parse, stringify } from "jsonpathly";

stringify(parse("$.champions[*].name"));
// => "$.champions[*].name"
```

### JSONPathSyntaxError

Custom error class for syntax errors.

```typescript
import { query, JSONPathSyntaxError } from "jsonpathly";

try {
  query({}, "$[invalid");
} catch (e) {
  if (e instanceof JSONPathSyntaxError) {
    console.log("Invalid JSONPath:", e.message);
  }
}
```

### JSONPathLimitError

Thrown when a query needs more evaluation steps than `maxSteps` allows (a step is a node selected or visited, a selector tried, an expression evaluated, a value compared, or a string character compared or scanned by a regex). Typical queries, linear in the document, stay below the default; nested descendant filters such as `$..[?@..[?@..a]]` grow polynomially and hit it. A heavy but legitimate query (dozens of conditions per element on a large document) may need a higher `maxSteps`.

```typescript
import { query, JSONPathLimitError } from "jsonpathly";

try {
  query(doc, untrustedPath, { maxSteps: 100_000 });
} catch (e) {
  if (e instanceof JSONPathLimitError) {
    console.log("Query too expensive");
  }
}
```

## Security

jsonpathly is designed with security in mind:

- **No dynamic code execution** - Expressions are parsed into an AST and evaluated safely
- **No code injection** - Script expressions `$(...)` are not supported
- **I-Regexp compliance** - Regex patterns in `match()` and `search()` are validated against RFC 9485
- **No ReDoS** - Regex filters (`=~`, `match()`, `search()`) run on a linear-time matcher, never on the backtracking engine, so a pattern like `(a+)+$` cannot hang the event loop. Patterns are limited to 1000 characters, 16 `\p{...}` escapes and 1000 compiled instructions; a larger pattern matches nothing, like an invalid one
- **Bounded evaluation** - Parsing is linear in the query length (filter expressions are memoized, so nesting never makes the parser backtrack exponentially), subqueries on `$` and tests that do not read `@` are evaluated once per query, and evaluation stops with `JSONPathLimitError` past `maxSteps`
- **No stack overflow** - Deeply nested documents and long queries are processed iteratively; an expression nested too deeply to parse is a `JSONPathSyntaxError`
- **Own members only** - Selectors only see the document's own members and array elements: `$.constructor` or `$['__proto__']` never return `Object` or `Object.prototype`, and an index supplied by a non-standard array prototype reads as a hole

These guarantees are for untrusted queries and untrusted JSON documents (the output of `JSON.parse`, or plain objects and arrays). A document made of getters, Proxies or custom prototypes, or a hand-built AST passed to `stringify()`, is the caller's own object: each member is checked and read once, lengths are read once per operation, and a reported length that is not a valid array length, or a string field that is not a string, is a `TypeError`. AST fields are read as JavaScript properties, prototype chain included. Non-enumerable own properties, which `JSON.parse` never produces, are skipped when an object is enumerated (wildcards, descendants, filters, `length()`) and not counted by the budget, although the engine scans them; a name selector or an array index still reads one, as in 3.1.0. Memory use is proportional to the document's size: a string built by concatenation is flattened by the engine the first time a character of it is read, as with any consumer of that string. Member names are limited to 1,000 characters: a longer one in a query is a `JSONPathSyntaxError`, and a query that enumerates or compares an object holding one fails with a `JSONPathLimitError` (V8 hashes very long strings by their length alone, and no real document needs such names). String values have no limit; the budget charges the one-by-one comparisons that very long ones force in `in`, `subsetof`, `anyof` and `noneof`.

## Comparison with Other Libraries

For a comparison with other JSONPath implementations, see [json-path-comparison](https://cburgmer.github.io/json-path-comparison).

**Key differences:**

- Uses a Peggy parser instead of dynamic execution
- Follows RFC 9535 semantics for edge cases
- Normalized paths use single quotes per RFC 9535

## Breaking Changes in v3.0.0

- **Path format changed**: `paths()` now returns RFC 9535 normalized format with single quotes:
  ```
  Before: $["players"][0]["name"]
  After:  $['players'][0]['name']
  ```
- **Node.js 18+ required**

## Requirements

- Node.js >= 18

## License

MIT
