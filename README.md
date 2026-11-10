# CLU Component Library

[![npm version](https://img.shields.io/npm/v/%40shaobangzhu%2Fclu-ui/latest)](https://www.npmjs.com/package/@shaobangzhu/clu-ui)

[npm package](https://www.npmjs.com/package/@shaobangzhu/clu-ui) · [GitHub Releases](https://github.com/Shaobangzhu/react-clu-component-lib/releases) · [Source code](https://github.com/Shaobangzhu/react-clu-component-lib)

CLU is a React 19 component library for data-dense operational applications. This repository implements **P01–P08: the foundation, scoped semantic tokens, nine display primitives, six form primitives, two data APIs, two overlay components, a verified package contract and layered quality gates**. Consumer integration and v1 release readiness remain planned.

Implemented here: an ESM Vite library build with declarations and an explicit CSS export, strict TypeScript, ESLint, Vitest/React Testing Library, Tailwind CSS v4 build infrastructure, local/static Storybook, and scoped light/dark design tokens. [`@shaobangzhu/clu-ui@0.1.0-rc.2`](https://www.npmjs.com/package/@shaobangzhu/clu-ui/v/0.1.0-rc.2) is publicly available on npm under MIT. Both `next` and `latest` currently resolve to this prerelease; it is not a stable or v1 release. See [publication evidence](docs/rc2-publication.md) and the [npm-to-GitHub audit](docs/npm-github-sync.md). There is no public Storybook URL yet.

Install the immutable version explicitly:

```sh
npm install --save-exact @shaobangzhu/clu-ui@0.1.0-rc.2
```

React `^19.0.0` is required as a peer dependency. Browser applications also need ReactDOM 19; the verified consumer uses React/ReactDOM 19.3.1. Import `@shaobangzhu/clu-ui/styles.css` once and render CLU inside a `data-clu-theme="light"` or `"dark"` host. No Tailwind installation or source scanning is required. An unversioned npm install currently selects rc.2 through `latest`; use the exact version for reproducible consumption.

The **npm Registry** is the canonical channel for the compiled package. **GitHub Releases** records source/version history, including the verified [v0.1.0-rc.2 prerelease](https://github.com/Shaobangzhu/react-clu-component-lib/releases/tag/v0.1.0-rc.2); its source archives are not the compiled npm distribution. **GitHub Packages** is a separate registry and is not required for this project. GitHub account linking alone does not configure Trusted Publishing.

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

Storybook runs locally at http://localhost:6006. `npm run build-storybook` generates `storybook-static/` for local static serving. Automated browser, accessibility and visual checks run separately through `npm run quality:all`; desktop/mobile reviews and their limits are recorded in phase verification notes. Public hosting and its URL remain planned.

| Command | Purpose |
| --- | --- |
| `npm run lint` | Type-aware ESLint and React Hooks checks; warnings fail |
| `npm run typecheck` | Strict checks for source, config, stories, and tests |
| `npm test` | Deterministic jsdom rendering, interaction, and portable-story tests |
| `npm run build` | ESM library, declarations, and compiled CSS in `dist/` |
| `npm run storybook` | Local Storybook development |
| `npm run build-storybook` | Static Storybook production build |
| `npm run package:verify` | Real archive checks and an external locked consumer: Bundler/NodeNext types, Vite, SSR and React deduplication |
| `npm run quality:check` | Lint, types, tests, library, Storybook and package verification in sequence |
| `npm run quality:all` | Complete local quality pipeline, including pinned Linux Chromium stories/a11y/visuals, security and failure-propagation probes |

The actual tested versions, official compatibility references, and verification output are recorded in [P01 verification](docs/p01-verification.md).

```text
src/index.ts                        public entry; display, form, data and overlay APIs/types
src/styles/index.css                compiled scoped tokens and opt-in focus styles
src/internal/ScaffoldButton.*        internal proof, excluded from library output
.storybook/                         React + Vite Storybook configuration
tests/                             RTL interaction and portable-story tests
```

The package exposes `.` as ESM with types and `./styles.css` as opt-in compiled CSS. Consumers import the CSS explicitly and place components under a theme host; Tailwind is not a consumer build requirement. CSS side effects are declared so bundlers preserve an explicit CSS import. Theme variables are defined only on explicit `[data-clu-theme]` hosts, with scoped user-preference overrides and no reset. See the [public token contract](docs/design-tokens.md) and [P02 verification](docs/p02-verification.md). The internal scaffold demonstrates Tailwind compilation under a `clu-*` selector, using a reference-only import. No Preflight or default theme is injected into consumers.

React 19 is both a peer and an exact development dependency. React, ReactDOM, and their subpaths (including JSX runtimes) are external in the library build. ReactDOM is development-only because the public entry does not import it. The internal scaffold is not exported or packaged; the public Button is documented below.

[The v1 blueprint](plan.md) preserves the two-repository scope and all 11 delivery phases. P01 was merged in PR #1. [The P02 PR draft](docs/p02-pr.md) is local review material.

- **CLU:** [Shaobangzhu/react-clu-component-lib](https://github.com/Shaobangzhu/react-clu-component-lib), base `master`. P01–P08 establish the foundation, tokens, components, package contract, and quality gates. Each phase starts from the latest merged `master` on its own branch and is reviewed before the next.
- **First consumer, DGI:** [Shaobangzhu/delivery-geo-intelligence](https://github.com/Shaobangzhu/delivery-geo-intelligence), base `main`. P09–P10 will consume an approved, immutable CLU prerelease while preserving DGI's business contracts. DGI has not been modified or integrated here.
- **Release readiness:** P11 audits real component, package, and consumer evidence. The owner-approved MIT rc.2 prerelease is published and its registry bytes and independent consumers are verified. GitHub tags/Releases, public hosting and v1 readiness remain separate steps.
- **SCOC:** a future consumer outside v1 acceptance scope.

The external implementation kit also contains `codex-prompts.md` and `prompts/P01.md` through `P11.md`. They are not included in this repository. The root blueprint records the execution plan; later phase prompts remain separate handoff materials.

CLU owns reusable UI semantics and generic interactions. Delivery, GIS, finance, provider telemetry, APIs, and other business logic stay in consumers. No consumer source is copied here. Admin enablement, DGI migration, and a hosted Storybook remain separate work. Phase verification notes preserve the project history and distinguish completed package/CI checks from those later gates.

**Maintainer:** [Chaoran Lu](https://github.com/Shaobangzhu)

Review the token gallery under **Foundations / Semantic tokens** in Storybook. Interactive follows the local Theme toolbar; fixed Light/Dark and Compare stories support predictable review. Themes never mutate the document. For a bare consumer check, run `npm run build`, serve the repository with a static server, and open `examples/theme-smoke/`.

Public display exports: Button, IconButton, Card, Badge, StatusIndicator, StatCard, Alert, Skeleton and EmptyState. See [API contracts and accessibility notes](docs/display-primitives.md), [P03 verification](docs/p03-verification.md) and [P03 PR draft](docs/p03-pr.md). Components require explicit CSS import and a theme host.

Public form exports: Field, Input, Textarea, Select, Checkbox and SegmentedControl. Read the [native form API and accessibility contract](docs/form-controls.md), [P04 verification](docs/p04-verification.md) and [PR draft](docs/p04-pr.md). The Forms stories include a synthetic delivery metadata example; DGI integration and domain validation remain consumer work.

Public data APIs: composable `Table` and controlled `Pagination`. See [data API contracts](docs/data-presentation.md), [P05 verification](docs/p05-verification.md) and [PR draft](docs/p05-pr.md). The Data stories include synthetic Delivery History and Merchant Summary examples. Page size, row slicing, filtering, sorting and page reconciliation remain application responsibilities.

Public overlay exports: controlled `Dialog` and compositional `ConfirmDialog`. Read the [focus, dismissal and async confirmation contracts](docs/overlays.md), [P06 verification](docs/p06-verification.md) and [PR draft](docs/p06-pr.md). Overlays use native modal isolation; consuming applications own form state, business callbacks and successful closure.

The [P07 package contract](docs/package-contract.md) documents exact local tarball install commands, the isolated consumer template, archive/source-map rules and the version/distribution gate. `npm pack` rebuilds first. [P07 evidence](docs/p07-verification.md) distinguishes automated package checks from rendered browser checks. DGI integration requires a registry artifact whose bytes match the tested candidate; local pack verification alone does not meet that gate.

P08 adds local/CI component, accessibility, visual and security gates. Read [commands, baseline review and admin operations](docs/ci-quality.md), [original local evidence](docs/p08-verification.md) and [PR draft](docs/p08-pr.md). `npm run quality:all` uses the pinned Linux Docker browser environment. P08 merged in PR #8, and the prerelease preparation merged in PR #10. The [audited master CI run](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42780185648) passed at `b193cf0`; it does not validate later changes. Downloaded hosted artifact/fork-PR review and admin-only required-check enablement remain follow-ups; no Pages publication is enabled.

Current prerelease: `@shaobangzhu/clu-ui@0.1.0-rc.2`, MIT, publicly published with both `next` and `latest` pointing to rc.2. Read [candidate decisions](docs/prerelease-candidate.md), [publication evidence](docs/rc2-publication.md) and [source correspondence](docs/npm-github-sync.md). The frozen private rc.1 remains historical evidence. Post-publication metadata/docs changes do not change the npm artifact; a future publication requires a new version and verified artifact.

Consumers use only public exports and import the compiled CSS once:

```tsx
import { Button, Input, SegmentedControl, Table, Pagination, Dialog } from '@shaobangzhu/clu-ui';
import '@shaobangzhu/clu-ui/styles.css';
// Render CLU elements inside <section data-clu-theme="light"> or "dark".
```

For an application that also needs the verified React versions, use `npm install --save-exact @shaobangzhu/clu-ui@0.1.0-rc.2 react@19.3.1 react-dom@19.3.1`. See [MIT license](LICENSE).
