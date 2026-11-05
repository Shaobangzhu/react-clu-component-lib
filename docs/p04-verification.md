# P04 verification — 2026-11-05

Branch: `feat/clu-form-controls`. The clean existing branch matched latest fetched `origin/master` at `08aebf68e269ceb145e8c67d32d8e83dd8da4714` (P03 merge). CLU was the only writable repository; DGI form/filter sources were read for demand only. No commits, pushes, PR creation or publication performed.

Node 22.23.4 / npm 10.9.0. Dependency versions and lockfile unchanged; only the package description was updated. Clean npm ci passed and retained the existing 13 moderate development-tool audit findings. Storybook's existing preview chunk-size warning remains visible.

## Executed checks

- Clean npm ci; lint (warnings fail); strict source/story/test typecheck; 36 tests in 15 files; ESM/declaration/CSS build and static Storybook build all passed.
- Field labels, required attributes, unique stable IDs, external descriptions, errors and native child participation.
- Input exact local datetime strings (including a DST-boundary-shaped string with no interpretation), number empty/zero distinctions and native constraints.
- Input/Textarea/Select/Checkbox refs, uncontrolled editing/reset, controlled rerenders, readOnly and disabled behavior, empty values, select options and maxLength/rows.
- Explicit indeterminate property with React 19 callback-ref cleanup under StrictMode.
- Native radio arrow/Tab behavior, disabled-option skipping, independent groups, fieldset ref and no change callbacks during controlled rerender.
- Native FormData entries, one submit per activation, non-submit buttons, browser required validation and reset behavior.
- Actual composed synthetic Storybook form editing/submission and a local dark theme host.
- Existing built CSS scope/reset tests and 54 token contrast pair checks remain green. No test/lint/type gate was suppressed.

## Real browser review

Static Storybook was reviewed in the in-app Chromium browser at 1280×900 and 390×844 in light/dark. At mobile width, root scroll width was 375px (scrollbar reserved), with no horizontal overflow; IDs were unique. Native date, select, text, number, textarea, checkbox and radio controls were visible and labels readable.

Selecting Category A, moving Summary → Detailed description with ArrowRight, wrapping past the disabled option back to Summary, then pressing Tab focused the submit button. Its computed outline was `rgb(18, 100, 95) solid 3px`. Enter produced the visible Synthetic form submitted message. The local timestamp DOM value stayed `2026-11-05T09:30`.

Dark native picker chrome was reviewed and corrected using a component-only private color-scheme hint. Final browser inspection showed control color-scheme=dark while body remained normal; the calendar icon and keyboard focus were visibly readable. No global theme mutation was introduced.

[Light desktop](evidence/p04/light-desktop.jpg) · [Light mobile](evidence/p04/light-mobile.jpg) · [Dark desktop/focus](evidence/p04/dark-desktop.jpg) · [Dark mobile](evidence/p04/dark-mobile.jpg)

These are review screenshots, not approved golden baselines. This is not a manual screen-reader, exhaustive zoom, OS popup or cross-browser accessibility certification. Native UI variation and consumer validation responsibilities are documented in the API notes.

## Package consumer smoke

A real npm pack tarball was installed offline into a separate temporary consumer with only CLU and React/ReactDOM. All 15 public runtime exports resolved, including exactly six new form components. SSR verified Field/Input/Checkbox/radio semantics and an unchanged datetime string, and public compiled CSS resolved with no Tailwind installation. The original P03 entry exports were preserved. Full P07 package-contract acceptance remains planned.

```text
PASS: 15 total public components, six new form exports, native SSR semantics, unchanged datetime string, compiled CSS, no consumer Tailwind.
```

## Actual command output

Terminal formatting removed; local workspace path normalized.

```text
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


 Test Files  15 passed (15)
      Tests  36 passed (36)
   Start at  09:55:37
   Duration  1.86s (transform 669ms, setup 1.68s, import 1.35s, tests 2.09s, environment 7.63s)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 18 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  10.36 kB │ gzip: 2.39 kB
dist/index.js     7.83 kB │ gzip: 2.21 kB

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
✓ 79 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  18.66 kB │ gzip:   5.27 kB
│  storybook-static/assets/ScaffoldButton-De5he8bX.css               0.12
│  kB │ gzip:   0.13 kB
│  storybook-static/assets/TokenGallery-DA91pU7q.css                 3.80
│  kB │ gzip:   0.97 kB
│  storybook-static/assets/iframe-De7r_8Ea.css                      10.36
│  kB │ gzip:   2.39 kB
│  storybook-static/assets/iframe-CsJKZbeV.js                        0.04
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
│  storybook-static/assets/EmptyState-Hs87_ekd.js                    0.92
│  kB │ gzip:   0.47 kB
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
│  storybook-static/assets/Checkbox-CNZ9bSUj.js                      1.26
│  kB │ gzip:   0.61 kB
│  storybook-static/assets/Button-CnIzXw8u.js                        1.36
│  kB │ gzip:   0.58 kB
│  storybook-static/assets/EmptyState.stories-C47YkWrw.js            1.39
│  kB │ gzip:   0.61 kB
│  storybook-static/assets/Card.stories-Bt60Q9H1.js                  1.44
│  kB │ gzip:   0.64 kB
│  storybook-static/assets/Field-DUTh2PA9.js                         1.49
│  kB │ gzip:   0.65 kB
│  storybook-static/assets/preload-helper-Dt5pTa-y.js                1.74
│  kB │ gzip:   0.90 kB
│  storybook-static/assets/StatCard.stories-D5Hz5fwB.js              1.85
│  kB │ gzip:   0.74 kB
│  storybook-static/assets/SegmentedControl-B8m9Thra.js              2.27
│  kB │ gzip:   0.91 kB
│  storybook-static/assets/StatusIndicator.stories--GbpYOmW.js       2.34
│  kB │ gzip:   0.75 kB
│  storybook-static/assets/Badge.stories-CQSFpk9_.js                 2.42
│  kB │ gzip:   0.80 kB
│  storybook-static/assets/Checkbox.stories-DPIO4y5J.js              2.58
│  kB │ gzip:   0.88 kB
│  storybook-static/assets/Field.stories-Dqdn76M2.js                 2.62
│  kB │ gzip:   0.93 kB
│  storybook-static/assets/Alert.stories-B8ZoWEHS.js                 2.69
│  kB │ gzip:   0.87 kB
│  storybook-static/assets/SegmentedControl.stories-vbrnB07a.js      2.70
│  kB │ gzip:   0.92 kB
│  storybook-static/assets/DeliveryMetadata.stories-Cdax3ILn.js      2.87
│  kB │ gzip:   1.27 kB
│  storybook-static/assets/DisplayReview.stories-CAW80peK.js         3.02
│  kB │ gzip:   1.30 kB
│  storybook-static/assets/Input.stories-DHseNwKK.js                 3.08
│  kB │ gzip:   1.01 kB
│  storybook-static/assets/Textarea.stories-CuU83j3t.js              3.09
│  kB │ gzip:   1.01 kB
│  storybook-static/assets/IconButton.stories-CVKZDFoD.js            3.17
│  kB │ gzip:   0.94 kB
│  storybook-static/assets/Button.stories-CDrZ7EEI.js                3.23
│  kB │ gzip:   0.96 kB
│  storybook-static/assets/Select.stories-CWwS-15u.js                4.35
│  kB │ gzip:   1.09 kB
│  storybook-static/assets/TokenGallery.stories-DOYXiGrh.js          5.85
│  kB │ gzip:   1.77 kB
│  storybook-static/vite-inject-mocker-entry.js                     27.75
│  kB │ gzip:   9.66 kB
│  storybook-static/assets/react-18-DgTGzdum.js                    211.28
│  kB │ gzip:  66.05 kB
│  storybook-static/assets/iframe-C95LhCKW.js                    1,130.59
│  kB │ gzip: 320.89 kB

│
▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 407ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```

## Duplicate snapshot cleanup

During final verification, 16 numbered P02 copies appeared in the workspace. Under the prior explicit cleanup authorization, each was compared against current originals and Git history. Fifteen matched their current originals; `tests/tokens.test 2.ts` matched P02 commit `12f5a39` and had no independent changes. The current P03 universal-reset protection and allowance for scoped box-sizing were retained rather than reverted to the older P02 check. All 16 copies were removed; no unique copy content was lost. The complete quality pipeline above passed again afterward.

## Changed files

- `README.md`
- `docs/evidence/p04/dark-desktop.jpg`
- `docs/evidence/p04/dark-mobile.jpg`
- `docs/evidence/p04/light-desktop.jpg`
- `docs/evidence/p04/light-mobile.jpg`
- `docs/form-controls.md`
- `docs/p04-pr.md`
- `docs/p04-verification.md`
- `package.json`
- `plan.md`
- `src/forms/Checkbox.stories.tsx`
- `src/forms/Checkbox.tsx`
- `src/forms/DeliveryMetadata.stories.tsx`
- `src/forms/Field.stories.tsx`
- `src/forms/Field.tsx`
- `src/forms/Input.stories.tsx`
- `src/forms/Input.tsx`
- `src/forms/SegmentedControl.stories.tsx`
- `src/forms/SegmentedControl.tsx`
- `src/forms/Select.stories.tsx`
- `src/forms/Select.tsx`
- `src/forms/Textarea.stories.tsx`
- `src/forms/Textarea.tsx`
- `src/index.ts`
- `src/styles/forms.css`
- `src/styles/index.css`
- `tests/form-stories.test.tsx`
- `tests/forms.test.tsx`
