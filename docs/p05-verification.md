# P05 verification — 2026-11-05

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

Branch `feat/clu-data-presentation`; clean existing branch matched latest fetched `origin/master` at `8e346d94a2dccd2c83f5b36ceb7613290093747f` (P04 merge). DGI was read-only. No commit, push, PR creation, merge or registry publication performed.

Node 22.23.4 / npm 10.9.0. Dependency versions and lockfile are unchanged. The package description was updated to include data APIs. The lockfile SHA-256 remains `b2e4cb57169f39ff8d2c2a361e1938f006dd1347a0666c19cf0a443d47d4cc27`.

## Results

Clean npm ci, lint, strict typecheck, 69 tests across 18 files, ESM/declaration/CSS build and static Storybook build all passed. Every pre-existing test remains included. There were no flaky-test retries, weakened gates or dependency bypasses. Clean install retained the existing 13 moderate development-tool audit findings; the upstream Storybook preview chunk-size warning remains visible.

Changed files: `src/data/Table.tsx`, `Pagination.tsx`, private `paginationMath.ts` and their two story files; `src/styles/data.css`, the CSS/public entries; three new test files and an added built-CSS assertion in `tests/tokens.test.ts`; README, plan progress and the package description; data contracts, this verification, the PR draft and eight browser screenshots under `docs/evidence/p05/`. No dependency, lockfile, Storybook infrastructure or DGI file changed.

Suggested commit: `feat(data): add semantic table primitives and controlled pagination`.

New coverage includes:

- Semantic table caption, native sections/rows/cells, column and row header scopes, IDs/headers, React 19 refs, density/hover flags and native message spans.
- Explicitly named/focusable table scroll regions; built CSS numeric end alignment/tabular figures and overflow rules, under the existing selector-isolation guard.
- Pagination totals 0, 1, 10, 11 and larger; first/middle/last pages; short final ranges; disabled/tab/native activation behavior and no form submission.
- No callbacks during StrictMode mounting, rerenders, active-page clicks, total shrinkage or display clamping; independent named pagers.
- Bounded sorted unique page windows, endpoints and noninteractive ellipses. An invariant check exercises 385 total/size/page combinations, including maximum safe integer and oversized finite totals; these are assertions within one test, not extra test-count claims.
- Seven explicit invalid/fractional/clamped calculation cases, plus actual composed Delivery History, Merchant Summary, empty/loading and shrinking-total stories.
- Existing 54 named token contrast-pair checks remain green.

## Real browser review

The in-app Chromium browser reviewed static Storybook at 1280×900 and 390×844 in light and dark:

- Mobile table scroll container measured 325px client width with 928px content; document width was 375px inside a 390px viewport (scrollbar reserved). Wide content stayed inside the table region.
- ArrowRight on the focused scroll region moved scrollLeft to 29px; the region displayed a 3px token outline. Native column headers had scope=col. Numeric cells computed text-align=end and font-variant-numeric=lining-nums tabular-nums.
- Dark row hover computed `rgb(41, 61, 64)`. The synthetic story rendered ten body rows. Next displayed records 11–20; keyboard Enter on Page 4 displayed the final 31–37 range.
- Header wrapping and message alignment were reviewed: headers retain natural word boundaries, and No records to display remains readable at the left edge of the empty mobile table. Empty pagination shows 0 of 0, disabled Previous/Next, and no invented active page.
- Large-total pagination at 390px used seven buttons total (including Previous/Next), two noninteractive ellipses and current page 500000. Document width equalled viewport width with no horizontal page overflow.
- Dark standalone pagination painted only its local story canvas. The controlled shrink example retained consumer page 8 while displaying page 2 after total fell to 11; only an explicit Previous activation changed consumer state to 1. Body had no theme attribute.

[Table light desktop](evidence/p05/table-light-desktop.jpg) · [Table dark desktop](evidence/p05/table-dark-desktop.jpg) · [Table light mobile](evidence/p05/table-light-mobile.jpg) · [Table dark mobile](evidence/p05/table-dark-mobile.jpg) · [Empty mobile](evidence/p05/table-empty-mobile.jpg) · [Large pagination mobile](evidence/p05/pagination-large-mobile.jpg) · [Dark pagination mobile](evidence/p05/pagination-dark-mobile.jpg) · [Controlled shrink](evidence/p05/pagination-shrinking-total.jpg)

Screenshots are review evidence, not approved golden regression baselines. Manual screen-reader, full zoom, RTL, forced/custom palettes and real DGI/ArcGIS integration were not executed. Semantic markup and token contrast do not establish complete accessibility compliance. DGI's edit-page preservation, ten-row policy and filter reset/backend behavior remain app-owned and were not migrated here.

## Independent packed consumer

An actual npm pack tarball was installed offline in a fresh temporary consumer with CLU, React/ReactDOM 19.3.1 and dev-only TypeScript 5.9.3/Vite 8.3.6/React types 19.3.0. It imported only public package exports and the explicit CSS export. There was no workspace alias, source copy or Tailwind installation.

Strict TypeScript checked native Table props/ref and Pagination props from the packed declarations, including the compiled CSS import through Vite's client types. A Vite production build emitted JS and self-contained CSS. SSR assertions checked all 17 public runtime exports, all nine Table members, caption/header/numeric markup, clamped/empty ranges and zero callbacks during rendering. This is a P05 consumer smoke; full P07 package-contract acceptance remains planned.

```text
PASS: 17 public runtime exports; compound Table members; semantic SSR; clamped and empty Pagination without callbacks; compiled CSS; no consumer Tailwind.
PASS: independent consumer strict TypeScript and Vite production build (public package imports only).

$ consumer tsc -p tsconfig.json
(exit 0; no diagnostics)

$ consumer vite build
vite v8.3.6 building client environment for production...
transforming...
✓ 16 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.32 kB │ gzip:  0.24 kB
dist/assets/index-CTMqnqUc.css   12.69 kB │ gzip:  2.76 kB
dist/assets/index-BeJxSWyd.js   224.24 kB │ gzip: 70.19 kB

✓ built in 178ms
```

## Actual root command output

Terminal control formatting removed and local workspace path normalized.

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


 Test Files  18 passed (18)
      Tests  69 passed (69)
   Start at  15:06:22
   Duration  2.28s (transform 697ms, setup 2.15s, import 1.83s, tests 3.34s, environment 9.65s)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 21 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  12.69 kB │ gzip: 2.76 kB
dist/index.js    12.62 kB │ gzip: 3.50 kB

✓ built in 28ms

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
✓ 84 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  18.66 kB │ gzip:   5.27 kB
│  storybook-static/assets/ScaffoldButton-De5he8bX.css               0.12
│  kB │ gzip:   0.13 kB
│  storybook-static/assets/TokenGallery-DA91pU7q.css                 3.80
│  kB │ gzip:   0.97 kB
│  storybook-static/assets/iframe-CTMqnqUc.css                      12.69
│  kB │ gzip:   2.76 kB
│  storybook-static/assets/iframe-FMZaafCM.js                        0.04
│  kB │ gzip:   0.06 kB
│  storybook-static/assets/jsx-runtime-lyb9smFi.js                   0.39
│  kB │ gzip:   0.28 kB
│  storybook-static/assets/Input-qcow6mpj.js                         0.40
│  kB │ gzip:   0.29 kB
│  storybook-static/assets/Select-B6wCyY8n.js                        0.40
│  kB │ gzip:   0.29 kB
│  storybook-static/assets/Textarea-DbEvKGyi.js                      0.41
│  kB │ gzip:   0.29 kB
│  storybook-static/assets/Skeleton-D-QLGw1V.js                      0.41
│  kB │ gzip:   0.30 kB
│  storybook-static/assets/IconButton-DddOeVaN.js                    0.66
│  kB │ gzip:   0.42 kB
│  storybook-static/assets/Card-C7CKiECV.js                          0.74
│  kB │ gzip:   0.38 kB
│  storybook-static/assets/Badge-BrvtwzDY.js                         0.84
│  kB │ gzip:   0.43 kB
│  storybook-static/assets/StatusIndicator-BDNyGvSg.js               0.92
│  kB │ gzip:   0.48 kB
│  storybook-static/assets/EmptyState-BIOQocAM.js                    0.92
│  kB │ gzip:   0.46 kB
│  storybook-static/assets/ScaffoldButton.stories-B9c-YXJh.js        0.99
│  kB │ gzip:   0.56 kB
│  storybook-static/assets/StatCard-DkRA0Vgk.js                      1.01
│  kB │ gzip:   0.50 kB
│  storybook-static/assets/Alert-DfmcyP9b.js                         1.08
│  kB │ gzip:   0.48 kB
│  storybook-static/assets/Skeleton.stories-D2WRMOly.js              1.18
│  kB │ gzip:   0.54 kB
│  storybook-static/assets/rolldown-runtime-sJBDdmOt.js              1.20
│  kB │ gzip:   0.67 kB
│  storybook-static/assets/Checkbox-BFr0Z14H.js                      1.26
│  kB │ gzip:   0.61 kB
│  storybook-static/assets/Button-CnIzXw8u.js                        1.36
│  kB │ gzip:   0.58 kB
│  storybook-static/assets/EmptyState.stories-rw9gf_u0.js            1.39
│  kB │ gzip:   0.61 kB
│  storybook-static/assets/Card.stories-Bt60Q9H1.js                  1.44
│  kB │ gzip:   0.64 kB
│  storybook-static/assets/Field-DgoD78BU.js                         1.49
│  kB │ gzip:   0.64 kB
│  storybook-static/assets/preload-helper-Dt5pTa-y.js                1.74
│  kB │ gzip:   0.90 kB
│  storybook-static/assets/StatCard.stories-D5Hz5fwB.js              1.85
│  kB │ gzip:   0.74 kB
│  storybook-static/assets/SegmentedControl-CiGqqMGr.js              2.27
│  kB │ gzip:   0.91 kB
│  storybook-static/assets/StatusIndicator.stories--GbpYOmW.js       2.34
│  kB │ gzip:   0.75 kB
│  storybook-static/assets/Badge.stories-CQSFpk9_.js                 2.42
│  kB │ gzip:   0.80 kB
│  storybook-static/assets/Checkbox.stories-RY_ksu4-.js              2.58
│  kB │ gzip:   0.87 kB
│  storybook-static/assets/Field.stories--Bq_C-fp.js                 2.62
│  kB │ gzip:   0.93 kB
│  storybook-static/assets/Alert.stories-B8ZoWEHS.js                 2.69
│  kB │ gzip:   0.87 kB
│  storybook-static/assets/SegmentedControl.stories-Dyf8AWiv.js      2.70
│  kB │ gzip:   0.93 kB
│  storybook-static/assets/Pagination-Dj0duqjM.js                    2.79
│  kB │ gzip:   1.18 kB
│  storybook-static/assets/DeliveryMetadata.stories-tdb_3oYI.js      2.87
│  kB │ gzip:   1.27 kB
│  storybook-static/assets/DisplayReview.stories-BvsIa0H-.js         3.02
│  kB │ gzip:   1.30 kB
│  storybook-static/assets/Input.stories-B4d7Vxow.js                 3.08
│  kB │ gzip:   1.01 kB
│  storybook-static/assets/Textarea.stories-CIucBXej.js              3.09
│  kB │ gzip:   1.01 kB
│  storybook-static/assets/IconButton.stories-CVKZDFoD.js            3.17
│  kB │ gzip:   0.94 kB
│  storybook-static/assets/Button.stories-CDrZ7EEI.js                3.23
│  kB │ gzip:   0.96 kB
│  storybook-static/assets/Pagination.stories-Dr9R_r3o.js            3.88
│  kB │ gzip:   1.27 kB
│  storybook-static/assets/Select.stories-DWvVkcZF.js                4.35
│  kB │ gzip:   1.10 kB
│  storybook-static/assets/TokenGallery.stories-D-NX2uha.js          5.85
│  kB │ gzip:   1.76 kB
│  storybook-static/assets/Table.stories-2iXSRNub.js                 6.20
│  kB │ gzip:   2.13 kB
│  storybook-static/vite-inject-mocker-entry.js                     27.75
│  kB │ gzip:   9.66 kB
│  storybook-static/assets/react-18-CbG_cmX5.js                    211.28
│  kB │ gzip:  66.05 kB
│  storybook-static/assets/iframe-BvZKIkOj.js                    1,130.95
│  kB │ gzip: 320.96 kB

│
▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 440ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```
