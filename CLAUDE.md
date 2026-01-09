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

# Run tests with coverage
npx c8 npm test

# Build (generates dist/ with cjs and esm)
npm run build

# Lint
npm run lint

# Format code
npm run format

# Regenerate parser (after modifying jsonpath.peggy)
npm run gen

# Release (bumps version, commits, tags, pushes - CI publishes to npm)
npm run release:patch   # 3.0.0 -> 3.0.1
npm run release:minor   # 3.0.0 -> 3.1.0
npm run release:major   # 3.0.0 -> 4.0.0
```

## Architecture

### Entry Point
- `src/index.ts` - Exports the public API: `query`, `paths`, `parse`, `stringify`, `JSONPathSyntaxError`

### Parser Layer (`src/parser/`)
- `jsonpath.peggy` - Peggy grammar defining JSONPath syntax (RFC 9535 compliant)
- `generated/parser.js` - Auto-generated parser (do not edit manually)
- `parse.ts` - Converts JSONPath string to AST using Peggy parser
- `types.ts` - TypeScript types for the AST nodes (Root, Subscript, FilterExpression, FunctionCall, etc.)
- `stringify.ts` - Converts AST back to JSONPath string (with RFC 9535 normalized escaping)
- `errors.ts` - Custom syntax error class

### Handler Layer (`src/handler/`)
- `Handler.ts` - Core query engine that traverses JSON using the AST
- `query.ts` - Public `query()` function wrapping Handler
- `paths.ts` - Public `paths()` function returning matched paths
- `functions.ts` - RFC 9535 function implementations (`length`, `count`, `match`, `search`, `value`)
- `comparators.ts` - Filter comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`, `in`, etc.)
- `helper.ts` - Type guards and utility functions (`isEqual`, `isArray`, `isPlainObject`)

### Key Design Patterns
- **AST-based evaluation**: JSONPath is parsed into a typed AST (`Root` -> `Subscript` chain), then the Handler walks both the AST and JSON simultaneously
- **ValuePath tracking**: Handler maintains both values and their JSONPath locations throughout traversal
- **Indefinite results**: Operations like `..` or `*` return arrays, tracked via `isIndefinite` flag
- **I-Regexp validation**: `match()` and `search()` validate patterns against RFC 9485 I-Regexp subset

## Build Output

tsup builds to `dist/`:
- `index.cjs` - CommonJS build
- `index.mjs` - ES Module build
- `index.d.ts` / `index.d.mts` - Type declarations

Zero runtime dependencies - Peggy generates a standalone parser at build time.

## Testing

Test files in `tests/`:
- `query.test.ts` - Core query functionality
- `paths.test.ts` - Path output formatting
- `parse.test.ts` - Parser and stringify round-trips
- `rfc9535-compliance.test.ts` - RFC 9535 specific tests
- `consensus.test.ts` - Cross-implementation compatibility (uses `data/consensus-tests.ts`)
- `extensions.test.ts` - jsonpathly-specific extensions (in, nin, subsetof, etc.)
- `api.test.ts` - Public API contracts
- `module-resolution.test.ts` - ESM/CJS build verification

**Note:** ~70 consensus tests are intentionally skipped (pending). These represent:
- RFC 9535 semantic differences (jsonpathly follows the RFC strictly)
- Ambiguous syntax with no standard behavior across implementations

## RFC 9535 Compliance

jsonpathly is fully RFC 9535 compliant:
- Normalized path format uses single quotes: `$['key']` not `$["key"]`
- I-Regexp validation (RFC 9485) for `match()` and `search()`
- I-JSON integer range validation
- All 5 function extensions: `length`, `count`, `match`, `search`, `value`
