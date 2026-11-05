# CLU Component Library

CLU is a planned React 19 component library for data-dense operational applications. This repository currently implements **P01–P03: the foundation, scoped semantic tokens, and nine public display primitives**. Form, data and overlay components remain planned.

Implemented here: an ESM Vite library build with declarations and an explicit CSS export, strict TypeScript, ESLint, Vitest/React Testing Library, Tailwind CSS v4 build infrastructure, local/static Storybook, and scoped light/dark design tokens. The package is private and unpublished. There is no public Storybook URL yet.

Use Node **22.23.4** and npm **10.9.0**, matching the shared DGI baseline. `.nvmrc`, `packageManager`, and engine requirements record this toolchain; `.npmrc` enforces compatible engines and saves exact dependency versions. Exact development dependencies and transitive resolutions are recorded in `package.json` and `package-lock.json`.

```sh
nvm install
nvm use
# If necessary, select npm 10.9.0 in your Node installation:
npm install --global npm@10.9.0
npm ci
npm run quality:check
npm run storybook
```

Storybook runs locally at http://localhost:6006. `npm run build-storybook` generates `storybook-static/` for local static serving. Hosting, public URLs, browser accessibility checks, and screenshot gates are later work; building Storybook does not establish those capabilities.

| Command | Purpose |
| --- | --- |
| `npm run lint` | Type-aware ESLint and React Hooks checks; warnings fail |
| `npm run typecheck` | Strict checks for source, config, stories, and tests |
| `npm test` | Deterministic jsdom rendering, interaction, and portable-story tests |
| `npm run build` | ESM library, declarations, and compiled CSS in `dist/` |
| `npm run storybook` | Local Storybook development |
| `npm run build-storybook` | Static Storybook production build |
| `npm run quality:check` | Lint, types, tests, library build, and Storybook build in sequence |

The actual tested versions, official compatibility references, and verification output are recorded in [P01 verification](docs/p01-verification.md).

```text
src/index.ts                        public entry; nine display component and prop exports
src/styles/index.css                compiled scoped tokens and opt-in focus styles
src/internal/ScaffoldButton.*        internal proof, excluded from library output
.storybook/                         React + Vite Storybook configuration
tests/                             RTL interaction and portable-story tests
```

The package exposes `.` as ESM with types and `./styles.css` as opt-in compiled CSS. Consumers will import the CSS explicitly when public styles exist; Tailwind will not be a consumer build requirement. CSS side effects are declared so bundlers preserve an explicit CSS import. Theme variables are defined only on explicit `[data-clu-theme]` hosts, with scoped user-preference overrides and no reset. See the [public token contract](docs/design-tokens.md) and [P02 verification](docs/p02-verification.md). The internal scaffold demonstrates Tailwind compilation under a `clu-*` selector, using a reference-only import. No Preflight or default theme is injected into consumers.

React 19 is both a peer and an exact development dependency. React, ReactDOM, and their subpaths (including JSX runtimes) are external in the library build. ReactDOM is development-only because the public entry does not import it. The scaffold is not re-exported or included in the package; it is not the future Button API.

[The v1 blueprint](plan.md) preserves the two-repository scope and all 11 delivery phases. P01 was merged in PR #1. [The P02 PR draft](docs/p02-pr.md) is local review material.

- **CLU:** [Shaobangzhu/react-clu-component-lib](https://github.com/Shaobangzhu/react-clu-component-lib), base `master`. P01–P08 establish the foundation, tokens, components, package contract, and quality gates. Each phase starts from the latest merged `master` on its own branch and is reviewed before the next.
- **First consumer, DGI:** [Shaobangzhu/delivery-geo-intelligence](https://github.com/Shaobangzhu/delivery-geo-intelligence), base `main`. P09–P10 will consume an approved, immutable CLU prerelease while preserving DGI's business contracts. DGI has not been modified or integrated here.
- **Release readiness:** P11 audits real component, package, and consumer evidence. Publication, release tags, and public hosting require owner approval. A namespace such as `@shaobangzhu/clu-ui` is proposed, not verified or reserved. There is no registry installation command yet.
- **SCOC:** a future consumer outside v1 acceptance scope.

The external implementation kit also contains `codex-prompts.md` and `prompts/P01.md` through `P11.md`. They are not included in this repository. The root blueprint records the execution plan; later phase prompts remain separate handoff materials.

CLU owns reusable UI semantics and generic interactions. Delivery, GIS, finance, provider telemetry, APIs, and other business logic stay in consumers. No consumer source is copied here. Complete public components, full independent consumer package validation, CI browser/a11y/visual gates, npm publication, DGI migration, and a hosted Storybook are planned work.

**Maintainer:** [Chaoran Lu](https://github.com/Shaobangzhu)

Review the token gallery under **Foundations / Semantic tokens** in Storybook. Interactive follows the local Theme toolbar; fixed Light/Dark and Compare stories support predictable review. Themes never mutate the document. For a bare consumer check, run `npm run build`, serve the repository with a static server, and open `examples/theme-smoke/`.

Public display exports: Button, IconButton, Card, Badge, StatusIndicator, StatCard, Alert, Skeleton and EmptyState. See [API contracts and accessibility notes](docs/display-primitives.md), [P03 verification](docs/p03-verification.md) and [P03 PR draft](docs/p03-pr.md). Components require explicit CSS import and a theme host; the package remains unpublished.
