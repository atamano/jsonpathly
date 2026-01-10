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

## Security

jsonpathly is designed with security in mind:

- **No dynamic code execution** - Expressions are parsed into an AST and evaluated safely
- **No code injection** - Script expressions `$(...)` are not supported
- **I-Regexp compliance** - Regex patterns in `match()` and `search()` are validated against RFC 9485

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
