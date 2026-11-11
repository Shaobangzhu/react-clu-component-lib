# P06 verification — 2026-11-05

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Baseline and scope

A clean existing `feat/clu-dialog-confirmation` branch matched the latest fetched `origin/master` at `89dad11062a50fd63e2e0116a0e2034033df781f`, merged P05 PR #5. The working tree had no user changes at the start. No commit, push, PR creation, merge or registry publication was performed.

DGI DialogFrame, DeliveryModal, SessionModal, ConfirmDelete, MerchantModal and ConfirmMerchantDelete were read only as demand signals for focus restoration and save/cancel/pending flows. No DGI source was modified or copied. No dependency or lockfile changes were needed; only the package description changed. Existing exports remain intact, with Dialog/ConfirmDialog appended to the public entry.

Node 22.23.4 / npm 10.9.0; React 19.3.1, Vite 8.3.6, Vitest 4.1.12 and Storybook 10.6.5 from the existing lockfile. Lockfile SHA-256: `b2e4cb57169f39ff8d2c2a361e1938f006dd1347a0666c19cf0a443d47d4cc27`.

## Results

Clean npm ci and the entire quality:check passed: lint (zero warnings), strict source/config/story/test types, **82 tests across 20 files**, ESM/declarations/scoped CSS and static Storybook. After the final duplicate cleanup, the full quality script passed again. The 69 existing tests remain included; 13 new tests cover overlay contracts. Test reruns followed concrete code/test-stub fixes; no flaky-test retries or weakened gates were used. jsdom stubs are explicitly local to overlay tests and restored after RTL cleanup.

The existing Storybook preview chunk-size warning remains visible. No dependency-audit remediation was attempted in P06; the 13 moderate development-tool findings recorded in P05 remain an earlier baseline, not a fresh P06 audit result. The P06 npm ci output below did not report an audit result.

## Real Chromium interactions

The available in-app Chromium browser loaded the built Storybook directly. The actual checks were:

- Trigger -> showModal (`:modal=true`) -> initial Note input; background trigger/fallback controls were absent from the modal accessibility tree.
- Save note + native Tab -> Close dialog; Close dialog + native Shift+Tab -> Save note. Escape -> no open dialog, focus on Open editor, Successful saves: 0.
- Initial native Chromium behavior allowed a document-focus stop after the last control. The final component adds local boundary protection; both directions were then rechecked successfully. Pending controls also transfer focus to the heading, where Tab remains inside the modal.
- FocusContract Storybook play executed opening, aria description, initial focus, forward/reverse Tab and Cancel return-focus assertions. It finished closed with focus on Open editor and no browser warning/error logs. The play uses real browser DOM geometry; native Escape was exercised separately with actual key input.
- BackdropDismissal: a heading/content click left the dialog open; a complete outside pointer gesture dismissed it and returned focus. ExplicitDismissal: Escape and outside click left it open. No submit/confirm ran from either policy.
- RemovedTrigger: the original button was removed while open; Escape restored focus to the explicit Workspace fallback button.
- At 390×844, long-form dialog width=358px, top=16px, clientHeight=810px and scrollHeight=2360px. Document width=390px, with no horizontal page overflow. Submitting “fail” scrolled to the lower form/error area (scrollTop=1550px), kept input=fail and the dialog open. Escape left saves=0. Reopening preserved the value; correcting/submitting closed it with saves=1 and focus on the trigger.
- Confirmation initially focused Cancel. During the synthetic async operation every action was disabled, aria-busy=true, Tab stayed on the heading and Escape left the native modal open. Rejection displayed a safe alert and retained review content. Cancel returned focus with exactly one consumer confirmation. Unit tests separately asserted overlapping activation invokes one callback and intentional retry invokes the next one.
- Async destructive success closed only through the story consumer callback, returned focus and displayed Consumer confirmations: 1.
- Desktop 1280×900 and mobile 390×844 light/dark layouts were inspected. Dark overlay surface computed rgb(34,53,56); body had no theme attribute. Temporary viewport override was reset.

Screenshots:

- [Long form / mobile](evidence/p06/dialog-long-mobile.jpg)
- [Recoverable form error / mobile](evidence/p06/dialog-error-mobile.jpg)
- [Confirmation failure / mobile](evidence/p06/confirm-failure-mobile.jpg)
- [Dark confirmation / desktop](evidence/p06/confirm-dark-desktop.jpg)
- [Dark long form / desktop](evidence/p06/dialog-dark-desktop.jpg)
- [Dark long form / mobile](evidence/p06/dialog-dark-mobile.jpg)

Screenshots are review evidence, not approved golden baselines. Native inertness is browser-owned; the unit-test stub does not implement it. Firefox, Safari, screen readers, touch-specific gestures, full zoom/forced colors, nested/shadow-root focus scenarios and DGI/ArcGIS integration were not executed. A modal only isolates its own document when embedded. No accessibility certification or browser-wide support matrix is claimed.

## Independent packed consumer

A fresh temporary consumer installed an actual npm pack tarball with React/ReactDOM 19.3.1 and dev-only TypeScript 5.9.3/Vite 8.3.6/React types 19.3.0. Imports used only public APIs and the CSS export, with no workspace alias, copied source or Tailwind installation. Native Dialog ref/initial focus and ConfirmDialog callback prop declarations passed strict TypeScript (exit 0, no diagnostics). Vite build and closed SSR assertions also passed. The consumer checks are P06 smoke evidence; P07 full package-contract gates remain planned.

The first pack attempt hit the machine's unwritable default npm cache; using the existing task-specific cache resolved it without changing system ownership or configuration. The failed attempt produced no tarball; the successful one was the artifact installed and tested.

```text
PASS: packed 19 public APIs, closed SSR/associations, no render callbacks, compiled overlay CSS, no consumer Tailwind.

vite v8.3.6 building client environment for production...
transforming...
✓ 16 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.32 kB │ gzip:  0.24 kB
dist/assets/index-Dnc0OTYM.css   14.06 kB │ gzip:  3.01 kB
dist/assets/index-C6H6jSTj.js   226.78 kB │ gzip: 71.07 kB

✓ built in 137ms
```

## Actual root output

Terminal control sequences removed; workspace path normalized. The long Storybook asset listing is explicitly abbreviated.

```text
$ npm ci --cache /private/tmp/clu-npm-cache --no-fund
added 346 packages in 3s

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


 Test Files  20 passed (20)
      Tests  82 passed (82)
   Start at  20:24:06
   Duration  2.73s (transform 758ms, setup 2.42s, import 2.22s, tests 3.88s, environment 11.45s)


> react-clu-component-lib@0.1.0 build
> vite build && tsc -p tsconfig.build.json

vite v8.3.6 building client environment for production...
transforming...
✓ 23 modules transformed.
rendering chunks...
computing gzip size...
dist/styles.css  14.06 kB │ gzip: 3.01 kB
dist/index.js    18.49 kB │ gzip: 5.38 kB

✓ built in 32ms

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
✓ 88 modules transformed.
rendering chunks...
[Storybook asset-size listing omitted]

▲  Vite [plugin builtin:vite-reporter]
│  (!) Some chunks are larger than 500 kB after minification. Consider:
│  - Using dynamic import() to code-split the application
│  - Use build.rolldownOptions.output.codeSplitting to improve chunking:
│  https://rolldown.rs/reference/OutputOptions.codeSplitting
│  - Adjust chunk size limit for this warning via
│  build.chunkSizeWarningLimit.
│  Vite ✓ built in 478ms
│
◇  Output directory:
│  <repository>/storybook-static
│
└  Storybook build completed successfully
```

## Duplicate cleanup at final review

Nine untracked P05 files with a ` 2` suffix appeared during the resumed final review. Each was compared byte-for-byte to its corresponding original and was identical: the five files under src/data, src/styles/data.css and the three P05 data test files. No independent diff existed. Only those redundant copies were deleted under the earlier cleanup authorization; original files and P06 changes were preserved. The complete quality script above was re-run after removal (82 tests, 20 files).

## Changed files and review material

- `src/overlays/Dialog.tsx`, `ConfirmDialog.tsx` and their individual story files.
- `src/styles/overlays.css`, CSS entry and public export additions.
- `tests/Dialog.test.tsx`, `ConfirmDialog.test.tsx` and an explicit native-dialog jsdom stub.
- README, plan progress, package description, overlay contracts, this evidence, PR draft and six screenshots.

See [API contract / reviewer checklist](overlays.md) and [PR draft](p06-pr.md). Suggested commit: `feat(overlays): introduce accessible dialog and confirmation primitives`.
