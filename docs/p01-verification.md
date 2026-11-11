# P01 verification — 2026-11-04

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

Branch: `chore/clu-v1-foundation`. Fetched base: `origin/master` at `f159e7ea6c4dc5ebd0d60e5593a6ec4f8f9d9eb5`; the existing local foundation branch already pointed to that exact base. The original uncommitted README change was incorporated with explicit user authorization. No DGI files were touched. No commit, push, registry publication, or PR creation was performed.

## Tested toolchain and compatibility

All final installation and quality checks used **Node 22.23.4 and npm 10.9.0**, on macOS arm64. The official Node archive matched SHA-256 `c9e1dbc748b33ed2d14f42445191ecaf14c56259c7a9a26d0042c49ec2b66428`. Tools downloaded for verification stayed in a temporary toolchain; no global Node/npm installation was changed.

The lockfile was generated with **npm 11.17.0**, under Node 22.23.4. Both npm 10.9.0 and 10.9.10 reproducibly crashed during fresh dependency resolution with `Cannot read properties of null (reading 'edgesOut')` in npm Arborist. This is a documented exception for lockfile generation. The resulting lockfile then installed successfully with a clean npm 10.9.0 `npm ci`, strict peer checks enabled, and no lockfile mutation. The shared minimum remains Node 22.23.4/npm 10.9.0.

The official registry metadata was checked before installation, then the complete graph was tested:

- Vite 8.3.6 and `@vitejs/plugin-react` 6.2.1 accept this Node version; the React plugin specifically peers on Vite 8.
- Vitest 4.1.12 accepts Vite 8 and Node 22. It retains the assertion interface accepted by `@testing-library/jest-dom` 7.0.1. Vitest 5.1.0's changed assertion generic parameters failed full declaration checking with those matchers.
- Storybook core 10.6.5 is paired with `@storybook/react-vite` 10.3.6 and its 10.3.6 renderer/builder. The framework's declared peers accept React 19, Vite 8, and Storybook `^10.3.6`; its docgen plugin also accepts Vite 8. This deliberately tested minor-version combination preserves the patched core. The 10.6.5 renderer's declarations failed `exactOptionalPropertyTypes` checking; the selected renderer passes without suppressing declaration errors. Earlier unpatched core candidates were rejected after audit inspection.
- Tailwind CSS and its Vite plugin are both 4.3.4; the plugin accepts Vite 8. Public CSS imports only utilities with source auto-detection disabled. The internal scaffold uses reference-only `@apply` under a `clu-*` selector.
- jsdom 30.1.3 requires Node `^22.22.2 || ^24.15.0 || >=26.0.0`; Node 22.23.4 satisfies it. TypeScript 5.9.3, ESLint 10.14.0, and typescript-eslint 8.72.1 are mutually compatible with the tested Node version.

There is no `skipLibCheck`, type-error suppression, peer override, `--force`, or `--legacy-peer-deps` workaround in the project. `.npmrc` enables `engine-strict`, `strict-peer-deps`, and exact saves. `npm ls react react-dom vite vitest storybook @storybook/react-vite` exits 0; React/ReactDOM and Vite are deduplicated.

Official sources:

- [Node 22.23.4 release and checksums](https://nodejs.org/en/blog/release/v22.23.4/)
- [Vite 8 Node requirements](https://vite.dev/blog/announcing-vite8.html)
- [React releases](https://react.dev/versions)
- [Storybook React + Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)
- [Selected framework metadata](https://registry.npmjs.org/@storybook/react-vite/10.3.6), [selected core metadata](https://registry.npmjs.org/storybook/10.6.5)
- [Selected Vitest metadata](https://registry.npmjs.org/vitest/4.1.12), [RTL matcher metadata](https://registry.npmjs.org/@testing-library/jest-dom/7.0.1)
- [Tailwind Vite installation](https://tailwindcss.com/docs/installation/using-vite), [omitting Preflight](https://tailwindcss.com/docs/preflight)

## Exact development versions

| Package | Tested pin |
| --- | --- |
| `@eslint/js` | `10.0.1` |
| `@storybook/react-vite` | `10.3.6` |
| `@tailwindcss/vite` | `4.3.4` |
| `@testing-library/dom` | `10.4.2` |
| `@testing-library/jest-dom` | `7.0.1` |
| `@testing-library/react` | `16.3.3` |
| `@testing-library/user-event` | `14.6.8` |
| `@types/node` | `22.20.5` |
| `@types/react` | `19.3.0` |
| `@types/react-dom` | `19.3.0` |
| `@vitejs/plugin-react` | `6.2.1` |
| `eslint` | `10.14.0` |
| `eslint-plugin-react-hooks` | `7.1.1` |
| `globals` | `17.14.0` |
| `jsdom` | `30.1.3` |
| `react` | `19.3.1` |
| `react-dom` | `19.3.1` |
| `storybook` | `10.6.5` |
| `tailwindcss` | `4.3.4` |
| `typescript` | `5.9.3` |
| `typescript-eslint` | `8.72.1` |
| `vite` | `8.3.6` |
| `vitest` | `4.1.12` |

React is also a `^19.0.0` peer. ReactDOM is development-only because the public entry does not import it. `vite.config.ts` externalizes React, ReactDOM, and their subpaths, including JSX runtimes.

## Required verification

| Command | Result |
| --- | --- |
| `npm ci` | Pass; clean dependency replacement; strict peers; unchanged lockfile |
| `npm run lint` | Pass; warnings fail |
| `npm run typecheck` | Pass; source, stories, configuration, tests, and dependency declarations |
| `npm test` | Pass; 2 files, 4 tests |
| `npm run build` | Pass; ESM, declaration, explicit CSS output |
| `npm run build-storybook` | Pass; manager, story index, and preview assets |
| `npm run quality:check` | Pass; all five stages above in sequence after clean installation |

Lockfile SHA-256 before and after clean installation: `b2e4cb57169f39ff8d2c2a361e1938f006dd1347a0666c19cf0a443d47d4cc27`.

Actual command output follows. ANSI terminal formatting was removed and machine-local paths replaced with `<repository>` and `<home>`; the output otherwise retains the measured results and warnings.

```text
$ node --version
v22.23.4
$ npm --version
10.9.0
$ npm ci
added 346 packages, and audited 353 packages in 3s

13 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

$ npm run quality:check
> react-clu-component-lib@0.1.0 quality:check
> npm run lint && npm run typecheck && npm test && npm run build && npm run build-storybook


> react-clu-component-lib@0.1.0 lint
> eslint . --max-warnings 0


> react-clu-component-lib@0.1.0 typecheck
> tsc --noEmit -p tsconfig.json && tsc --noEmit -p tsconfig.test.json


> react-clu-component-lib@0.1.0 test
> vitest run


 RUN  v4.1.12 <repository>


 Test Files  2 passed (2)
      Tests  4 passed (4)
   Start at  23:21:09
   Duration  791ms (transform 49ms, setup 228ms, import 135ms, tests 127ms, environment 913ms)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  0.08 kB │ gzip: 0.09 kB
dist/index.js    0.00 kB │ gzip: 0.02 kB

✓ built in 19ms

> react-clu-component-lib@0.1.0 build-storybook
> storybook build --disable-telemetry

Unable to save global settings file to <home>/.storybook/settings.json
Reason: EPERM: operation not permitted, mkdir '<home>/.storybook'

┌  Building storybook v10.6.5
│
◇  Cleaning outputDir: storybook-static
│
◇  Loading presets
│
◇  Building manager..
│
●  Building open services..
│
●  Building preview..
│  Vite vite v8.3.6 building client environment for production...
transforming...
✓ 43 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  18.66 kB │ gzip:   5.27 kB
│  storybook-static/assets/iframe-BY4oVURM.css                     0.08
│  kB │ gzip:   0.09 kB
│  storybook-static/assets/ScaffoldButton-De5he8bX.css             0.12
│  kB │ gzip:   0.13 kB
│  storybook-static/assets/iframe-DlBi1JE8.js                      0.04
│  kB │ gzip:   0.06 kB
│  storybook-static/assets/rolldown-runtime-sJBDdmOt.js            1.20
│  kB │ gzip:   0.67 kB
│  storybook-static/assets/ScaffoldButton.stories-B2KxSeCx.js      1.27
│  kB │ gzip:   0.72 kB
│  storybook-static/assets/preload-helper-Dt5pTa-y.js              1.74
│  kB │ gzip:   0.90 kB
│  storybook-static/vite-inject-mocker-entry.js                   27.75
│  kB │ gzip:   9.66 kB
│  storybook-static/assets/react-18-5KBNvDq1.js                  211.28
│  kB │ gzip:  66.05 kB
│  storybook-static/assets/iframe-C_XEV5RE.js                  1,126.63
│  kB │ gzip: 319.78 kB

│
▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 254ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```

The static build emitted a chunk-size warning from Storybook's own preview bundle. The restricted shell also prevented Storybook from saving optional global onboarding settings; this did not prevent the static build. No warning threshold was increased. Browser accessibility, visual regression, and hosted CI gates remain P08 work.

## Additional foundation checks

The RTL tests cover native React 19 refs under StrictMode, keyboard activation without accidental form submission, disabled/re-enabled interactions, and rendering the actual composed Storybook story with its args. These are jsdom tests.

An in-memory build of the internal proof used the actual library config with a temporary entry override and `write: false`. Assertions checked the external `react/jsx-runtime` import, compiled scoped CSS, absence of global reset selectors, an empty public module namespace, and resolution of the explicit CSS export:

```text
vite v8.3.6 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
✓ built in 22ms
PASS: actual React JSX runtime import remains external in the proof bundle.
PASS: Tailwind compiled scoped scaffold CSS without global reset selectors.
PASS: public ESM entry exports no scaffold; explicit CSS export resolves.
```

`npm pack --dry-run --json` exits 0 and lists only `README.md`, `package.json`, `dist/index.js`, `dist/index.d.ts`, and `dist/styles.css`, with `bundled: []`. The internal scaffold and stories are excluded. The public JS entry is intentionally empty; the CSS placeholder contains only the Tailwind license comment and reserved layer declaration. The types entry has no dangling CSS import. Full independent-consumer/package-contract acceptance remains P07.

The development server also passed `npm run storybook -- --ci --smoke-test --host 127.0.0.1` after local-port binding was allowed for the check. Its initial restricted-shell attempt could not bind a port. The successful run reported the older builder's unavailable optional change-detection feature:

```text
> react-clu-component-lib@0.1.0 storybook
> storybook dev -p 6006 --disable-telemetry --ci --smoke-test --host 127.0.0.1


┌  storybook v10.6.5
│
●  Starting...
│
▲  Change detection unavailable: builder does not support change
│  detection
│
◇  Smoke tests passed, exiting.
│
└
```

## Audit findings

The final `npm audit --json` reports **13 moderate development-tool dependency findings**, representing the transitive `glob`/`minimatch` advisory chains; it reports zero high or critical findings. This audit is not a passing zero-vulnerability gate. `npm audit --omit=dev --json` exits 0 with **zero findings**. The required foundation commands above all pass.

The remaining upstream advisories are [glob cancellation traversal](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [minimatch globparts amplification](https://github.com/advisories/GHSA-g3hv-75wg-m249). They affect development file-pattern processing. Resolving them through upstream-compatible dependency updates remains follow-up work; no speculative major-version overrides were added.

## Changed files

- `.gitignore`
- `.npmrc`
- `.nvmrc`
- `.storybook/main.ts`
- `.storybook/preview.ts`
- `README.md`
- `docs/p01-pr.md`
- `docs/p01-verification.md`
- `eslint.config.js`
- `package-lock.json`
- `package.json`
- `plan.md`
- `src/index.ts`
- `src/internal/ScaffoldButton.css`
- `src/internal/ScaffoldButton.stories.tsx`
- `src/internal/ScaffoldButton.tsx`
- `src/styles/index.css`
- `tests/ScaffoldButton.story.test.tsx`
- `tests/ScaffoldButton.test.tsx`
- `tests/setup.ts`
- `tsconfig.build.json`
- `tsconfig.json`
- `tsconfig.test.json`
- `vite.config.ts`
- `vitest.config.ts`

Suggested commit: `chore: bootstrap CLU React 19 component library foundation`.
