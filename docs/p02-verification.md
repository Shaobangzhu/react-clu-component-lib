# P02 verification

Initial verification: 2026-11-04; final re-verification after duplicate cleanup: 2026-11-05 (America/Los_Angeles). Branch: `feat/clu-design-tokens`; clean starting base `eade7b9bbe6fd7db748edeed75168e0a0bdf4559` (latest merged master, P01 PR #1). The pre-existing P02 branch already matched this base. No DGI writes, commit, push, publication or PR creation were performed.

Node 22.23.4 / npm 10.9.0. Dependencies and lockfile are unchanged from P01; lockfile SHA-256 is `b2e4cb57169f39ff8d2c2a361e1938f006dd1347a0666c19cf0a443d47d4cc27`. Clean installation retained P01's 13 moderate development-tool audit findings.

## Required checks

All passed: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test` (4 files / 10 tests), `npm run build`, and `npm run build-storybook`. The aggregate `quality:check` ran after clean installation. The Storybook preview chunk-size warning remains visible; no threshold or gate was weakened.

CSS tests compile the actual library configuration in memory, check required public tokens, validate every leaf rule's explicit theme scope and namespace, reject global reset/generic selectors and uncompiled imports, verify preference/focus rules, and calculate 54 named opaque color-pair ratios across two themes. Story tests check local fixed themes, nested host composition, unique anchors, and no document/body theme mutation.

## Contrast record

Minimum ratios within each tested group (display values rounded; test comparisons use full precision):

| Theme | Group | Minimum | Pairs |
| --- | --- | --- | --- |
| light | text | 4.654:1 | 12 |
| light | state/accent | 5.460:1 | 7 |
| light | focus/boundary | 3.319:1 | 8 |
| dark | text | 5.466:1 | 12 |
| dark | state/accent | 6.588:1 | 7 |
| dark | focus/boundary | 3.925:1 | 8 |

The test targets follow [W3C text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) (4.5:1 for these samples) and [non-text contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (3:1). Decorative stroke-subtle is intentionally not a control boundary. This is not an accessibility certification: see the token contract for rendering, overrides, opacity, keyboard and system-palette limitations.

## Real browser review

Checked in the in-app Chromium browser against the running Storybook:

- 1280×900 desktop and 390×844 mobile, light and dark galleries. Type and grids reflowed; at 390px the root scroll width was 375px (scrollbar reserved), so no horizontal overflow.
- Interactive toolbar switched Light to Dark; story host changed while body had no theme attribute. Fixed stories are covered separately by RTL.
- Tab reached Focus specimen; computed outline was `rgb(18, 100, 95) solid 3px`, visibly offset without clipping on mobile.
- Bare HTML fixture used only `dist/styles.css`, with no React or Tailwind consumer build. Outside token value remained empty; both unrelated `.card` borders stayed 5px, `.button` padding 11px, `.table` spacing 9px. Light and nested-light text resolved to `rgb(24, 44, 45)`; dark to `rgb(237, 242, 236)`; body theme remained unset.

[Desktop light](evidence/p02/light-desktop.jpg) · [Desktop dark](evidence/p02/dark-desktop.jpg) · [390px light](evidence/p02/light-mobile.jpg) · [390px dark](evidence/p02/dark-mobile.jpg) · [Keyboard focus](evidence/p02/light-mobile-focus.jpg) · [Bare consumer](evidence/p02/bare-consumer.jpg)

These screenshots are review evidence, not approved golden regression baselines. Preference media rules are checked in compiled CSS; OS forced-color and contrast palettes were not manually emulated. Screen-reader and full zoom testing remain future component review. Desktop/mobile visual review is not final branding sign-off.

Reproduce the bare fixture by building, serving the repository root with any static server, then opening `examples/theme-smoke/`. It deliberately uses generic collision-sentinel classes with fixture-owned styles to expose resets.

`npm pack --dry-run --json` also passed: only README, package manifest and the three dist assets are included; gallery, tests and evidence are excluded.

## Duplicate cleanup and final verification (2026-11-05)

All 22 numbered copies were compared against both their current originals and the Git HEAD baseline (`eade7b9`). Nineteen were identical to their originals. The three differing copies—`.storybook/preview 2.ts`, `plan 2.md`, and `src/styles/index 2.css`—were exact P01 baseline snapshots. They contained no independent changes relative to HEAD. A three-way merge therefore retains the current P02 theme toolbar, scoped CSS and progress notes; replacing originals with these snapshots would remove P02 work.

With explicit user authorization, all 22 copies were removed after comparison. No unique copy content was discarded. A subsequent source-tree scan found no remaining numbered copies. Clean installation and all quality stages then passed on Node 22.23.4/npm 10.9.0, with the original lockfile hash unchanged. Browser screenshots above are the original 2026-11-04 visual review; gallery and theme implementation did not change during this cleanup.

| Removed copy | Comparison with current original |
| --- | --- |
| `.npmrc 2` | Identical |
| `.nvmrc 2` | Identical |
| `.storybook/main 2.ts` | Identical |
| `.storybook/preview 2.ts` | P01 baseline; current P02 changes retained |
| `docs/p01-pr 2.md` | Identical |
| `docs/p01-verification 2.md` | Identical |
| `eslint.config 2.js` | Identical |
| `package 2.json` | Identical |
| `plan 2.md` | P01 baseline; current P02 changes retained |
| `src/index 2.ts` | Identical |
| `src/internal/ScaffoldButton 2.css` | Identical |
| `src/internal/ScaffoldButton 2.tsx` | Identical |
| `src/internal/ScaffoldButton.stories 2.tsx` | Identical |
| `src/styles/index 2.css` | P01 baseline; current P02 changes retained |
| `tests/ScaffoldButton.story.test 2.tsx` | Identical |
| `tests/ScaffoldButton.test 2.tsx` | Identical |
| `tests/setup 2.ts` | Identical |
| `tsconfig 2.json` | Identical |
| `tsconfig.build 2.json` | Identical |
| `tsconfig.test 2.json` | Identical |
| `vite.config 2.ts` | Identical |
| `vitest.config 2.ts` | Identical |

## Actual command output

ANSI control codes removed and local workspace path normalized.

```text
$ npm ci
added 346 packages, and audited 353 packages in 4s

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


 Test Files  4 passed (4)
      Tests  10 passed (10)
   Start at  08:46:28
   Duration  779ms (transform 121ms, setup 289ms, import 323ms, tests 290ms, environment 1.35s)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  3.58 kB │ gzip: 1.15 kB
dist/index.js    0.00 kB │ gzip: 0.02 kB

✓ built in 21ms

> react-clu-component-lib@0.1.0 build-storybook
> storybook build --disable-telemetry


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
✓ 46 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  18.66 kB │ gzip:   5.27 kB
│  storybook-static/assets/ScaffoldButton-De5he8bX.css             0.12
│  kB │ gzip:   0.13 kB
│  storybook-static/assets/iframe-BVnPkL6S.css                     3.58
│  kB │ gzip:   1.15 kB
│  storybook-static/assets/TokenGallery-DA91pU7q.css               3.80
│  kB │ gzip:   0.97 kB
│  storybook-static/assets/iframe-DWYwwJWx.js                      0.04
│  kB │ gzip:   0.06 kB
│  storybook-static/assets/jsx-runtime-lyb9smFi.js                 0.39
│  kB │ gzip:   0.28 kB
│  storybook-static/assets/ScaffoldButton.stories-B9c-YXJh.js      0.99
│  kB │ gzip:   0.56 kB
│  storybook-static/assets/rolldown-runtime-sJBDdmOt.js            1.20
│  kB │ gzip:   0.67 kB
│  storybook-static/assets/preload-helper-Dt5pTa-y.js              1.74
│  kB │ gzip:   0.90 kB
│  storybook-static/assets/TokenGallery.stories-B416gKSr.js        5.85
│  kB │ gzip:   1.76 kB
│  storybook-static/vite-inject-mocker-entry.js                   27.75
│  kB │ gzip:   9.66 kB
│  storybook-static/assets/react-18-D7PuZXnR.js                  211.28
│  kB │ gzip:  66.05 kB
│  storybook-static/assets/iframe-BWfklNVy.js                  1,127.27
│  kB │ gzip: 320.07 kB

│
▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 299ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```

## Changed files

- `.storybook/preview.ts`
- `README.md`
- `docs/design-tokens.md`
- `docs/evidence/p02/bare-consumer.jpg`
- `docs/evidence/p02/dark-desktop.jpg`
- `docs/evidence/p02/dark-mobile.jpg`
- `docs/evidence/p02/light-desktop.jpg`
- `docs/evidence/p02/light-mobile-focus.jpg`
- `docs/evidence/p02/light-mobile.jpg`
- `docs/p02-pr.md`
- `docs/p02-verification.md`
- `examples/theme-smoke/index.html`
- `plan.md`
- `src/foundations/TokenGallery.stories.tsx`
- `src/foundations/TokenGallery.tsx`
- `src/foundations/gallery.css`
- `src/styles/index.css`
- `src/styles/tokens.css`
- `tests/TokenGallery.test.tsx`
- `tests/tokens.test.ts`
