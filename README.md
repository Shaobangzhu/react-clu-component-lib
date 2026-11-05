# CLU Component Library

CLU is a planned React 19 component library for data-dense operational applications. This repository currently implements **P01: the library foundation**, with an internal rendering scaffold. None of the 19 planned public components is complete or exported.

Implemented here: an ESM Vite library build with declarations and an explicit CSS export, strict TypeScript, ESLint, Vitest/React Testing Library, Tailwind CSS v4 build infrastructure, and local/static Storybook. The package is private and unpublished. There is no public Storybook URL yet.

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
src/index.ts                        public entry; no component exports yet
src/styles/index.css                explicit CSS placeholder; no reset or theme
src/internal/ScaffoldButton.*        internal proof, excluded from library output
.storybook/                         React + Vite Storybook configuration
tests/                             RTL interaction and portable-story tests
```

The package exposes `.` as ESM with types and `./styles.css` as opt-in compiled CSS. Consumers will import the CSS explicitly when public styles exist; Tailwind will not be a consumer build requirement. CSS side effects are declared so bundlers preserve an explicit CSS import. The placeholder supplies no design tokens or global reset. The internal scaffold demonstrates Tailwind compilation under a `clu-*` selector, using a reference-only import. No Preflight or default theme is injected into consumers.

React 19 is both a peer and an exact development dependency. React, ReactDOM, and their subpaths (including JSX runtimes) are external in the library build. ReactDOM is development-only because the public entry does not import it. The scaffold is not re-exported or included in the package; it is not the future Button API.

[The v1 blueprint](plan.md) preserves the two-repository scope and all 11 delivery phases. [The P01 PR draft](docs/p01-pr.md) is local review material; no PR has been opened by this work.

- **CLU:** [Shaobangzhu/react-clu-component-lib](https://github.com/Shaobangzhu/react-clu-component-lib), base `master`. P01–P08 establish the foundation, tokens, components, package contract, and quality gates. Each phase starts from the latest merged `master` on its own branch and is reviewed before the next.
- **First consumer, DGI:** [Shaobangzhu/delivery-geo-intelligence](https://github.com/Shaobangzhu/delivery-geo-intelligence), base `main`. P09–P10 will consume an approved, immutable CLU prerelease while preserving DGI's business contracts. DGI has not been modified or integrated here.
- **Release readiness:** P11 audits real component, package, and consumer evidence. Publication, release tags, and public hosting require owner approval. A namespace such as `@shaobangzhu/clu-ui` is proposed, not verified or reserved. There is no registry installation command yet.
- **SCOC:** a future consumer outside v1 acceptance scope.

The external implementation kit also contains `codex-prompts.md` and `prompts/P01.md` through `P11.md`. They are not included in this repository. The root blueprint records the execution plan; later phase prompts remain separate handoff materials.

CLU owns reusable UI semantics and generic interactions. Delivery, GIS, finance, provider telemetry, APIs, and other business logic stay in consumers. No consumer source is copied here. Complete public components, semantic tokens/themes, independent consumer validation, CI browser/a11y/visual gates, npm publication, DGI migration, and a hosted Storybook are planned work.

**Maintainer:** [Chaoran Lu](https://github.com/Shaobangzhu)
