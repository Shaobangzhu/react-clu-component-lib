# P03 verification — 2026-11-05

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

Branch `feat/clu-display-primitives`; clean base/latest fetched master `12f5a39205d705e96b244f5747659bf5162c3e66`. Existing requested branch matched that base. No DGI changes, commits, pushes or PR creation.

Node 22.23.4 / npm 10.9.0. Dependency pins and lockfile unchanged; package description updated to reflect actual exports.

## Results

Clean npm ci, lint, strict typecheck, 22 tests in 13 files, ESM/declarations/CSS build and static Storybook build passed. Tests cover each public primitive, native React 19 refs, keyboard activation without form submission, disabled/loading transitions, accessible icon names, explicit state labels, distinct 0/null/undefined/formatted values, static/polite/urgent announcement roles, decorative skeletons and unique empty-state labels. Existing 54 token contrast pair checks remain green.

The CSS guard now allows box-sizing inside explicitly scoped components; all leaf selectors must still start at a theme host, and a separate assertion rejects universal global resets. No lint warnings or type gates were suppressed. Existing 13 moderate development-tool audit findings and Storybook preview chunk-size warning remain.

An actual npm pack tarball was installed in an independent temporary fixture with only React/ReactDOM and CLU. All nine public ESM exports resolved; React SSR rendered default button type, zero and not-yet-verified state; compiled CSS resolved from the public export. Tailwind was absent from that fixture. No package source aliases or consumer source copies were used. This is a focused P03 smoke check; full P07 package acceptance remains planned.

```text
PASS: packed public exports, React SSR, explicit compiled component CSS, no consumer Tailwind installation.
```

## Browser review

The static Storybook Review matrix rendered all nine components together at 1280×900 and 390×844 in light and dark. Controls wrapped, text remained readable, and mobile scroll width was 375px inside a 390px viewport (scrollbar reserved), with no horizontal overflow. Tab reached Primary action and showed a 3px dark-theme focus outline (`rgb(142, 217, 201)`). Disabled/loading controls were visually distinct and preserved their labels. Individual stories cover variants/sizes, fixed dark, compact and long content; fixed status vocabulary and decorative skeletons intentionally have no arbitrary long-label API.

[Light desktop](evidence/p03/light-desktop.jpg) · [Dark desktop](evidence/p03/dark-desktop.jpg) · [Light mobile](evidence/p03/light-mobile.jpg) · [Dark mobile/focus](evidence/p03/dark-mobile.jpg)

Screenshots are review evidence, not approved golden baselines. Manual screen-reader, full zoom, custom palette and final consumer workflow verification remain necessary. No final branding or accessibility certification is claimed.

## Actual output

Local workspace path normalized; terminal control codes removed.

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


 Test Files  13 passed (13)
      Tests  22 passed (22)
   Start at  09:29:37
   Duration  1.56s (transform 512ms, setup 1.61s, import 972ms, tests 1.41s, environment 6.35s)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 12 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  7.75 kB │ gzip: 1.97 kB
dist/index.js    3.90 kB │ gzip: 1.22 kB

✓ built in 26ms

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
✓ 66 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  18.66 kB │ gzip:   5.27 kB
│  storybook-static/assets/ScaffoldButton-De5he8bX.css              0.12
│  kB │ gzip:   0.13 kB
│  storybook-static/assets/TokenGallery-DA91pU7q.css                3.80
│  kB │ gzip:   0.97 kB
│  storybook-static/assets/iframe-D9QvDEDS.css                      7.75
│  kB │ gzip:   1.97 kB
│  storybook-static/assets/iframe-CC-2jKy5.js                       0.04
│  kB │ gzip:   0.06 kB
│  storybook-static/assets/jsx-runtime-lyb9smFi.js                  0.39
│  kB │ gzip:   0.28 kB
│  storybook-static/assets/Skeleton-D-QLGw1V.js                     0.41
│  kB │ gzip:   0.30 kB
│  storybook-static/assets/IconButton-DddOeVaN.js                   0.66
│  kB │ gzip:   0.42 kB
│  storybook-static/assets/Card-C7CKiECV.js                         0.74
│  kB │ gzip:   0.38 kB
│  storybook-static/assets/Badge-BrvtwzDY.js                        0.84
│  kB │ gzip:   0.43 kB
│  storybook-static/assets/StatusIndicator-BDNyGvSg.js              0.92
│  kB │ gzip:   0.48 kB
│  storybook-static/assets/EmptyState-CYM5CKHF.js                   0.92
│  kB │ gzip:   0.46 kB
│  storybook-static/assets/ScaffoldButton.stories-B9c-YXJh.js       0.99
│  kB │ gzip:   0.56 kB
│  storybook-static/assets/StatCard-DkRA0Vgk.js                     1.01
│  kB │ gzip:   0.50 kB
│  storybook-static/assets/Alert-DfmcyP9b.js                        1.08
│  kB │ gzip:   0.48 kB
│  storybook-static/assets/Skeleton.stories-D2WRMOly.js             1.18
│  kB │ gzip:   0.54 kB
│  storybook-static/assets/rolldown-runtime-sJBDdmOt.js             1.20
│  kB │ gzip:   0.67 kB
│  storybook-static/assets/Button-CnIzXw8u.js                       1.36
│  kB │ gzip:   0.58 kB
│  storybook-static/assets/EmptyState.stories-B8_r4rwF.js           1.39
│  kB │ gzip:   0.61 kB
│  storybook-static/assets/Card.stories-Bt60Q9H1.js                 1.44
│  kB │ gzip:   0.64 kB
│  storybook-static/assets/preload-helper-Dt5pTa-y.js               1.74
│  kB │ gzip:   0.90 kB
│  storybook-static/assets/StatCard.stories-D5Hz5fwB.js             1.85
│  kB │ gzip:   0.74 kB
│  storybook-static/assets/StatusIndicator.stories--GbpYOmW.js      2.34
│  kB │ gzip:   0.75 kB
│  storybook-static/assets/Badge.stories-CQSFpk9_.js                2.42
│  kB │ gzip:   0.80 kB
│  storybook-static/assets/Alert.stories-B8ZoWEHS.js                2.69
│  kB │ gzip:   0.87 kB
│  storybook-static/assets/DisplayReview.stories-FtaHkIDq.js        3.02
│  kB │ gzip:   1.30 kB
│  storybook-static/assets/IconButton.stories-CVKZDFoD.js           3.17
│  kB │ gzip:   0.94 kB
│  storybook-static/assets/Button.stories-CDrZ7EEI.js               3.23
│  kB │ gzip:   0.96 kB
│  storybook-static/assets/TokenGallery.stories-CPvSHtPE.js         5.85
│  kB │ gzip:   1.76 kB
│  storybook-static/vite-inject-mocker-entry.js                    27.75
│  kB │ gzip:   9.66 kB
│  storybook-static/assets/react-18-CMP4gNYJ.js                   211.28
│  kB │ gzip:  66.05 kB
│  storybook-static/assets/iframe-VznNfcIy.js                   1,129.23
│  kB │ gzip: 320.56 kB

│
▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 366ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```

## Changed files

- `README.md`
- `docs/display-primitives.md`
- `docs/evidence/p03/dark-desktop.jpg`
- `docs/evidence/p03/dark-mobile.jpg`
- `docs/evidence/p03/light-desktop.jpg`
- `docs/evidence/p03/light-mobile.jpg`
- `docs/p03-pr.md`
- `docs/p03-verification.md`
- `package.json`
- `plan.md`
- `src/components/Alert.stories.tsx`
- `src/components/Alert.tsx`
- `src/components/Badge.stories.tsx`
- `src/components/Badge.tsx`
- `src/components/Button.stories.tsx`
- `src/components/Button.tsx`
- `src/components/Card.stories.tsx`
- `src/components/Card.tsx`
- `src/components/DisplayReview.stories.tsx`
- `src/components/EmptyState.stories.tsx`
- `src/components/EmptyState.tsx`
- `src/components/IconButton.stories.tsx`
- `src/components/IconButton.tsx`
- `src/components/Skeleton.stories.tsx`
- `src/components/Skeleton.tsx`
- `src/components/StatCard.stories.tsx`
- `src/components/StatCard.tsx`
- `src/components/StatusIndicator.stories.tsx`
- `src/components/StatusIndicator.tsx`
- `src/index.ts`
- `src/styles/components.css`
- `src/styles/index.css`
- `tests/Alert.test.tsx`
- `tests/Badge.test.tsx`
- `tests/Button.test.tsx`
- `tests/Card.test.tsx`
- `tests/EmptyState.test.tsx`
- `tests/IconButton.test.tsx`
- `tests/Skeleton.test.tsx`
- `tests/StatCard.test.tsx`
- `tests/StatusIndicator.test.tsx`
- `tests/tokens.test.ts`
