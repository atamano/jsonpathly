# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/atamano/jsonpathly/compare/v3.0.0...HEAD
[3.0.0]: https://github.com/atamano/jsonpathly/compare/v2.0.2...v3.0.0
[2.0.2]: https://github.com/atamano/jsonpathly/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/atamano/jsonpathly/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/atamano/jsonpathly/releases/tag/v2.0.0
