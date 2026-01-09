# Contributing to jsonpathly

Thank you for your interest in contributing to jsonpathly! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/jsonpathly.git
   cd jsonpathly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run tests**
   ```bash
   npm test
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── index.ts              # Public API exports
├── handler/
│   ├── Handler.ts        # Core query engine
│   ├── query.ts          # query() function
│   ├── paths.ts          # paths() function
│   ├── comparators.ts    # Filter comparators (==, <, in, etc.)
│   ├── functions.ts      # RFC 9535 functions (length, match, etc.)
│   └── helper.ts         # Type guards and utilities
└── parser/
    ├── jsonpath.peggy    # Peggy grammar (source of truth)
    ├── parse.ts          # parse() function
    ├── stringify.ts      # stringify() function
    ├── types.ts          # AST type definitions
    ├── errors.ts         # JSONPathSyntaxError
    └── generated/        # Auto-generated parser (do not edit)
```

## Development Workflow

### Making Changes

1. Create a feature branch from `master`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. If you modified the grammar (`jsonpath.peggy`), regenerate the parser:
   ```bash
   npm run gen
   ```

4. Run tests and linting:
   ```bash
   npm test
   npm run lint
   ```

5. Commit your changes with a descriptive message

### Commit Messages

We follow conventional commit style:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add support for custom functions
fix: handle empty arrays in slice expressions
docs: update API documentation
```

### Pull Requests

1. Push your branch to your fork
2. Open a PR against `master`
3. Fill in the PR template
4. Wait for CI checks to pass
5. Address any review feedback

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npx mocha --require ts-node/register tests/query.test.ts

# Run with coverage
npx c8 npm test
```

### Writing Tests

- Add tests for any new functionality
- Place tests in the appropriate file in `tests/`
- Follow existing test patterns and naming conventions
- Ensure edge cases are covered

## Code Style

- We use Prettier for formatting
- We use ESLint for linting
- Run `npm run format` before committing

## RFC 9535 Compliance

jsonpathly aims to be RFC 9535 compliant. When making changes:

1. Reference the RFC for expected behavior
2. Add tests that verify RFC compliance
3. Document any intentional deviations

## Reporting Issues

- Use GitHub Issues for bug reports and feature requests
- Include a minimal reproduction case for bugs
- Check existing issues before creating new ones

## Questions?

Feel free to open a GitHub Discussion or Issue if you have questions about contributing.
