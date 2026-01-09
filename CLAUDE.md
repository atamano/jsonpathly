# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

jsonpathly is a secure, eval-free TypeScript library for querying JSON documents using JSONPath expressions. It is RFC 9535 compliant and uses Peggy for parsing (zero runtime dependencies).

## Common Commands

```bash
# Run all tests
npm test

# Run a single test file
npx mocha --require ts-node/register --timeout 60000 --exit tests/<filename>.ts

# Build (generates dist/ for node and web, both cjs and mjs)
npm run build

# Lint
npm run lint

# Format code
npm run format

# Regenerate parser (after modifying jsonpath.peggy)
npm run gen
```

## Architecture

### Entry Point
- `src/index.ts` - Exports the public API: `query`, `paths`, `parse`, `stringify`, `JSONPathSyntaxError`

### Parser Layer (`src/parser/`)
- `jsonpath.peggy` - Peggy grammar defining JSONPath syntax (RFC 9535 compliant)
- `generated/parser.js` - Auto-generated parser (do not edit manually)
- `parse.ts` - Converts JSONPath string to AST using Peggy parser
- `types.ts` - TypeScript types for the AST nodes (Root, Subscript, FilterExpression, FunctionCall, etc.)
- `stringify.ts` - Converts AST back to JSONPath string
- `errors.ts` - Custom syntax error class

### Handler Layer (`src/handler/`)
- `Handler.ts` - Core query engine that traverses JSON using the AST. Contains methods for each AST node type and RFC 9535 function implementations (length, count, match, search, value)
- `query.ts` - Public `query()` function wrapping Handler
- `paths.ts` - Public `paths()` function returning matched paths
- `helper.ts` - Type guards and utility functions

### Key Design Patterns
- **AST-based evaluation**: JSONPath is parsed into a typed AST (`Root` -> `Subscript` chain), then the Handler walks both the AST and JSON simultaneously
- **ValuePath tracking**: Handler maintains both values and their JSONPath locations throughout traversal
- **Indefinite results**: Operations like `..` or `*` return arrays, tracked via `isIndefinite` flag
- **RFC 9535 Functions**: `length()`, `count()`, `match()`, `search()`, `value()` implemented in Handler

## RFC 9535 Compliance

The library supports RFC 9535 JSONPath standard features:
- All standard selectors (name, wildcard, index, slice, filter)
- Filter expressions with or without parentheses: `$[?@.price > 10]`
- Required functions: `length()`, `count()`, `match()`, `search()`, `value()`
- Extension operators for backwards compatibility: `in`, `nin`, `subsetof`, `anyof`, `noneof`, `sizeof`, `size`, `empty`, `=~`

## Build Output

Webpack builds 4 variants in `dist/`:
- `index.node.cjs` / `index.node.mjs` - Node.js builds
- `index.web.cjs` / `index.web.mjs` - Browser builds

No runtime dependencies - Peggy generates a standalone parser at build time.
