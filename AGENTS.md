# Repository Guidelines

## Project Structure & Module Organization
- `src/index.ts` exposes the public API; `src/handler/` contains runtime helpers for `query`/`paths` operations; `src/parser/` holds grammar types, parsing utilities, and stringification.
- `src/parser/generated/JSONPath.g4` is the ANTLR source; the other files in that folder are generated—do not hand-edit them.
- Built artifacts live in `dist/` (Node + browser bundles, type declarations). Tests are in `tests/*.test.ts` and mirror core features (`query`, `paths`, `parse`, consensus cases).

## Build, Test, and Development Commands
- `npm run build` — bundle with webpack into `dist/` (Node and web outputs).
- `npm test` — run the Mocha suite via ts-node against `tests/*.ts`; default timeout 60s.
- `npm run lint` — TypeScript ESLint (no console, limited `any`) using the recommended preset.
- `npm run format` — Prettier across `src/**/*.ts` (120 char line limit, single quotes, trailing commas).
- `npm run gen` — regenerate parser artifacts from `src/parser/generated/JSONPath.g4`; run this after grammar edits.
- Release hooks: `npm prepublishOnly` runs tests + lint; `npm version` formats and stages `src/` before tagging.

## Coding Style & Naming Conventions
- TypeScript throughout; prefer `camelCase` for functions/variables and `PascalCase` for types/classes.
- Two-space indentation; keep imports sorted logically by module path, separating std/libs from locals.
- Avoid `console` usage (lint error) and minimize `any`; add narrow type helpers in `src/parser/types.ts` or `src/handler/helper.ts` when needed.
- Generated parser files stay untouched; adjust only the `.g4` grammar and re-run `npm run gen`.

## Testing Guidelines
- Add or extend `*.test.ts` under `tests/`; mirror the feature under test (e.g., new path operator → `paths.test.ts`).
- Use Mocha + Chai assertions; prefer deterministic fixtures over random data.
- When introducing parsing or handler changes, add both positive and negative cases to guard regressions and edge behaviors.

## Commit & Pull Request Guidelines
- Follow the existing short, imperative style with lightweight scopes (e.g., `fix: ...`, `core: ...`, `publish vX.Y.Z`); keep subject lines under ~72 characters.
- PRs should describe the change, rationale, and test coverage; link related issues. For grammar or build pipeline adjustments, note any required regeneration or bundle updates.
- Do not commit hand-edited `dist/` output; rebuild as part of a release or when explicitly required.
