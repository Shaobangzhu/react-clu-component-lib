# CLU v1 Blueprint and Delivery Plan

**Status:** Proposed implementation plan, not a statement that the library is already shipped.
**Planning date:** 2026-11-04 (America/Los_Angeles).
**CLU repository:** https://github.com/Shaobangzhu/react-clu-component-lib (default branch: `master`; audited commit: `f159e7ea6c4dc5ebd0d60e5593a6ec4f8f9d9eb5`).
**First consumer:** https://github.com/Shaobangzhu/delivery-geo-intelligence (default branch: `main`; audited commit: `077ae131c324913823bd793105424c5e00a3b389`).
**Future consumer:** SCOC, outside the v1 acceptance scope.
**Version meaning:** This document defines the v1 product scope. The package may use `0.1.x` prereleases before `1.0.0`; it must not claim v1 is released until all acceptance gates pass.

## P01 implementation progress (2026-11-04)

P01 is implemented and locally verified in the working tree on `chore/clu-v1-foundation`, based on merged `origin/master` at `f159e7ea6c4dc5ebd0d60e5593a6ec4f8f9d9eb5`. P01 was subsequently merged in PR #1 at `eade7b9`; this remains foundation progress, not a v1 release.

- [x] Exact development dependency pins, lockfile, Node 22.23.4/npm 10.9.0 minimum, and strict peer/engine installation checks.
- [x] Strict TypeScript, type-aware ESLint, deterministic Vitest/RTL tests, and an internal Storybook rendering proof.
- [x] Explicit Vite ESM and declaration output, React peer/external configuration, and opt-in CSS placeholder with Tailwind v4 compilation and no consumer Preflight.
- [x] Clean `npm ci` on Node 22.23.4/npm 10.9.0, then lint, typecheck, four tests, library build, and static Storybook build.
- [x] README distinguishes implemented foundation, planned components, package publication, consumer integration, and a future public Storybook URL.

See [P01 verification](docs/p01-verification.md) for exact versions, actual output, the npm lockfile-generation exception, compatibility choices, and outstanding development-tool audit findings. At P01 verification, P02–P11 remained planned; no public components, registry release, hosted Storybook, or DGI integration have been completed.

## P02 implementation progress (2026-11-04)

Implemented on `feat/clu-design-tokens` from merged `origin/master` at `eade7b9bbe6fd7db748edeed75168e0a0bdf4559`. Local work is ready for review; commit/PR remain pending. All required automated checks were re-run successfully on 2026-11-05 after all 22 duplicate baseline files were analyzed and removed.

- [x] Scoped public semantic tokens, independent light/dark and nested-host defaults, higher contrast, forced colors and reduced motion.
- [x] Documented token meanings and public/private contracts; a Storybook gallery and local Theme toolbar.
- [x] Built CSS isolation and opaque-pair contrast checks, plus theme-story tests.
- [x] Clean install, lint, strict types, 10 tests, ESM/CSS build and Storybook build.
- [x] Real browser review at 1280px and 390px in both themes; keyboard focus and bare HTML consumer isolation checked.

See [token contract](docs/design-tokens.md) and [P02 evidence](docs/p02-verification.md). P03–P11 remain planned. This does not approve final DGI branding or complete public components, consumer integration, or accessibility certification.

## 1. Product thesis

CLU is an independently versioned, accessible, type-safe React 19 design system and component library for data-dense operational applications. DGI is the first real consuming application. CLU owns visual semantics and generic interaction behavior, but never owns delivery/GIS/finance/provider logic.

**Portfolio claim to earn:** "I designed and distributed a reusable React 19 component library, documented it in Storybook, quality-gated its accessible interactions and visual changes, and integrated its immutable version into a separately tested MERN application."

## 2. Verified baseline: do not invent implemented features

- CLU's current `master` contains `README.md`, `.gitignore`, and `.vscode/settings.json`, not a React 19 package, Storybook, or exported component source. The current README accurately describes React 19, Vite, Tailwind v4, Storybook, npm distribution, and SCOC integration as planned.
- DGI uses React 19, TypeScript, Vite, Express, MongoDB, ArcGIS and its own plain CSS. Its current routes are Dashboard, History, Merchants, and Data & Settings. The main DGI repository uses the native MongoDB driver, not Mongoose.
- DGI already has a reusable local `Pagination` and `pageRange` helper, several Add/Edit dialogs, status displays, forms, tables, filters, and KPI cards. These are candidates for API research, not source files to paste into CLU.
- DGI has tested business contracts and quality gates. At audited `main`, CI ran 244 backend tests (189 unit + 55 integration), 254 frontend tests, 14 Chromium E2E cases, and 40 offline AI evaluation scenarios; coverage checks passed. These are baseline execution observations, not targets to reproduce as CLU test counts.
- DGI's Vite ArcGIS external-font and cached Calcite stylesheet allowances are real reliability protections; preserve them. DGI's LA timezone/DST and minute-level Session datetime semantics, 10-row pagination, page preservation after edits, platform attribution, privacy controls, and money/settlement calculations are protected consumer contracts.

### DGI UI inventory => CLU extraction map

| Existing DGI source | Reusable need in CLU | Explicit DGI-owned boundary |
| --- | --- | --- |
| `frontend/src/styles.css`, `dashboard/dashboard.css` | semantic tokens, Button, Card, StatCard, Badge | charts, layout composition, MapView, geospatial renderers |
| `frontend/src/pages/Dashboard.tsx` | SegmentedControl, Select, Table, Pagination, EmptyState | period/category/year resolution and analytics |
| `frontend/src/pages/Settings.tsx`, `settings/settings.css` | StatusIndicator, Alert, Card, Select, Skeleton | Mongo/ArcGIS/OpenAI telemetry interpretation and refresh logic |
| `frontend/src/pages/History.tsx`, `history/history.css` | Field, Input, Select, Table, Pagination, Dialog | search, sorting, API requests, linked records, settlement semantics |
| `frontend/src/history/SessionModal.tsx` | Dialog, Field, Input, Select, Checkbox | LA DST fold/gap conversion, minute precision and linked delivery rules |
| `frontend/src/history/DeliveryModal.tsx`, `PaymentModal.tsx` | Dialog, form controls, Alert | platform attribution, geocoding, Prop 22 completeness |
| `frontend/src/pages/Merchants.tsx` | Table, Input, Select, Dialog, ConfirmDialog | merchant CRUD/reference protection, address geocoding |
| `frontend/src/components/Pagination.tsx`, `pageRange.ts` | controlled Pagination with accessible page navigation | API page-size policy, current-page preservation, refresh/clamp logic |
| `frontend/src/dashboard/AskDgi.tsx` | Button, Textarea, Alert, Skeleton | AI request orchestration, privacy, cancellation, evidence display |

## 3. Architectural boundaries

```
react-clu-component-lib / master
  src/
    index.ts                         # only public component and type exports
    components/
      Button/  Card/  Badge/ ...      # per-component TSX, styles, tests, stories
    styles/
      tokens.css                     # semantic light/dark custom properties
      components.css                 # compiled, CLU-prefixed component styling
      index.css                      # explicit consumer CSS entry
  .storybook/
  tests/                             # browser/consumer and package contracts
  examples/consumer-smoke/           # isolated, non-DGI package consumer
  docs/adr/                          # why each public contract exists
  .github/workflows/ci.yml
  package.json                       # ESM, types, CSS exports, peer deps
  plan.md
  CHANGELOG.md

Delivery Geo Intelligence / main
  frontend/src/**                    # imports published CLU package and CSS
  backend/**                         # unchanged by CLU migration
  e2e/**                             # existing tests extended, not replaced
```

- **No direct cross-repo source imports.** DGI consumes a pinned, immutable CLU package version, not a symlink or copied component source in the final CI workflow. During development, `npm pack` is an acceptable pre-publication contract test.
- **React as peer dependency** (React 19). Add ReactDOM as a peer only if the actual implementation imports it; externalize both from bundling. Never ship a second React runtime.
- **ESM + `.d.ts` + precompiled CSS** from Vite library mode and TypeScript declaration generation. `package.json` exports both code and the public CSS entry, and declares CSS side effects where appropriate.
- **Tailwind CSS v4 is a library authoring/build-time tool, not a required DGI build tool.** Use semantic `--clu-*` variables and prefixed/scoped component CSS. Do not ship a global Tailwind preflight, a global `button` reset, or generic `.card`/`.button` rules that alter ArcGIS/Calcite widgets. If build-time Tailwind cannot be isolated reliably, document the choice and keep compiled scoped CSS as the consumer contract.
- **Theme ownership:** a scoped theme root (`data-clu-theme="light|dark"`) or similarly isolated mechanism, with safe light defaults. DGI controls placement, composition, and theme selection. No runtime global document/body mutation merely from package import.
- **Business boundary:** no DGI domain enums/types, API calls, MongoDB, geocoding, ArcGIS, OpenAI, date conversions, money formatting, authentication or business pagination in CLU.
- **Accessibility:** native HTML first; keyboard interaction, visible focus, labels, error text associations, `aria-live` only where appropriate; WCAG 2.2 AA is a design goal, not a guarantee derived solely from axe.

## 4. Visual direction and tokens

Working direction: **Cartographic Operations**: warm-neutral background, white raised work surfaces, dark-ink text, restrained blue-green accent, sparse alert colors, strong tabular numbers, subtle separators, purposeful density, deliberate empty/loading/error states. This is an initial brief; align actual colors and spacing with the user-approved DGI redesign before locking tokens. The image at `DGI/docs/ui.ux.design.png` is an available reference, not proof of final design approval.

Tokens should define: canvas/surface/elevated; text/secondary/muted; stroke/subtle/strong; accent/hover/focus; success/warning/error/unknown; 4px-based spacing scale; radii; elevation; typography, font weights, numeric styling; motion duration and reduced-motion fallback. Validate contrast and dark/high-contrast presentations. Use CSS custom properties as the stable consumer interface; namespaced internal utilities may change without a semver major release.

## 5. Public v1 component inventory (19 conceptual exports)

**Display (9):** Button, IconButton, Card, Badge, StatusIndicator, StatCard, Alert, Skeleton, EmptyState.

**Form (6):** Field, Input, Textarea, Select, Checkbox, SegmentedControl.

**Data (2):** Table (semantic subcomponents, no fetching/sorting), Pagination (controlled page navigation, not a data source).

**Overlay (2):** Dialog, ConfirmDialog (controlled state and generic action callbacks).

These are conceptual exports; compound `Table` parts are allowed. `StatCard` displays a passed value/label rather than calculating revenue; `StatusIndicator` renders an explicit status, never probes providers. `Pagination` receives `page`, `totalItems`, `pageSize`, and `onPageChange`; consumer owns sorting, filtering, API calls, clamping and page preservation. `SegmentedControl` should use native radio semantics or a tested fully accessible equivalent. Avoid a custom date picker in v1: DGI's existing `datetime-local` and DST logic remain in DGI.

**Explicitly out of scope for v1:** charts, GIS map wrappers, arbitrary generic server data grids, virtualized tables, toast stack framework, nested menu systems, calendar picker, form state framework, drag-and-drop, i18n engine, animations library, Tailwind theme plugin requirement for consumers, and SCOC integration.

## 6. Definition of done for every component

1. Public TypeScript props documented; native attributes and React 19 `ref` behavior supported wherever applicable. Correct default button type avoids accidental form submits.
2. Storybook stories: default, variants, disabled, error/empty/loading where meaningful, long text, compact viewport, dark theme where meaningful.
3. Tests: controlled/uncontrolled behavior as appropriate, keyboard/focus, semantics, errors, rerenders, non-regression and no accidental data/domain side effects.
4. No raw `innerHTML`, no ambient network/credentials, no unstable generated IDs, no direct writes to `document.body` on import.
5. Styles consume tokens, are namespaced, support user zoom/reduced motion, and do not alter ArcGIS/Calcite or existing DGI global CSS.
6. Exports and bundled files work from `npm pack` in an independent consumer with only public exports installed.

## 7. Versioned delivery strategy

- Start at `0.1.0` as a pre-v1 release candidate. A proposed npm name such as `@shaobangzhu/clu-ui` is NOT a verified or reserved registry namespace; verify publishing rights/name availability before using a public registry. No need to publish during bootstrap.
- First, prove `npm pack`, ESM/type/CSS exports and React deduplication in `examples/consumer-smoke` or an isolated external test fixture.
- Before DGI integration PR P09, choose and publish/host an immutable installable prerelease artifact (public npm package or another publicly reproducible immutable tarball). Ask the maintainer to perform any necessary registry login/approval; do not silently copy library source or commit generated tarballs into DGI.
- DGI pins the exact prerelease version and commits a deterministic lockfile. It does not import CLU's Storybook source, dev dependencies, or internal CSS paths.
- Only after P09 and P10 pass in DGI and CLU gates are green should CLU be declared v1-ready. A `1.0.0` tag/release or npm publish requires explicit owner approval; a documentation PR by itself is not a release.

## 8. Quality strategy

**Each CLU PR:** `npm ci`, lint, strict typecheck, unit/component tests, ESM/declaration build, `npm pack` integrity/exports smoke, Storybook production build (once installed), no secret scans/obvious accidental credentials. Pin tested toolchain versions in lockfile; verify Storybook/Vite/Vitest compatibility rather than assuming README's future dependency versions work together.

**CI hardening P08:** real Chromium Storybook interaction assertions, `@storybook/addon-a11y` + `@storybook/addon-vitest`, a11y violations fail CI, deterministic screenshot golden fixtures after explicit human review, both 1280px and ~390px viewports, light/dark/hover/focus/empty/error stories as relevant, an aggregate quality check that fails if any mandatory stage fails, and uploaded diagnostic artifacts on failure. Do not confuse story visual checks with E2E consumer regression or claim automated accessibility equals manual screen-reader verification.

**Consumer gates:** DGI `npm run lint`, `npm run typecheck`, `npm run build:quality`, `npm run test:coverage`, `npm run coverage:check`, `npm run eval:ai`, `npm run security:check`, and `npm run test:e2e` must remain green; run its full hosted `Quality gate`. New CLU-specific smoke must cover interaction and style isolation. Preserve the original measured coverage floors and DO NOT weaken tests.

**Report and publication:** minimal secure static Storybook build; optionally publish to GitHub Pages using a trusted-default-branch-only workflow after Pages settings are enabled. Do not provision speculative Cloudflare tokens, paid visual services or public personal data. Quality results, not publishing status, decide PR merge readiness.

## 9. Codex PR sequencing (11 prompts, 9 CLU + 2 DGI)

Each prompt begins from the *latest merged target default branch*, not the initial snapshot, and gets one independent branch/PR. Merge and review each phase before the next. Do not stack unrelated PRs or merge automatically.

| ID | Repo / base | Branch | Scope | Model / effort | Gate |
| --- | --- | --- | --- | --- | --- |
| P01 | CLU / master | `chore/clu-v1-foundation` | project scaffold, tooling, plan and Storybook | GPT-6.1 Sol / High | install, typecheck, unit, Storybook build |
| P02 | CLU / master | `feat/clu-design-tokens` | isolated theme tokens and visual spec | GPT-6.1 Sol / High | CSS isolation, contrast and story tests |
| P03 | CLU / master | `feat/clu-display-primitives` | nine display primitives | GPT-6.1 Sol / Medium | variants, refs, semantics and tests |
| P04 | CLU / master | `feat/clu-form-controls` | six accessible form primitives | GPT-6.1 Sol / High | keyboard, labels, invalid/required, controlled |
| P05 | CLU / master | `feat/clu-data-presentation` | Table compounds and Pagination | GPT-6.1 Sol / Extra High | boundaries, a11y, numeric pages, isolation |
| P06 | CLU / master | `feat/clu-dialog-confirmation` | Dialog and ConfirmDialog | GPT-6.1 Sol / Extra High | focus/escape/backdrop/StrictMode tests |
| P07 | CLU / master | `build/clu-package-contract` | ESM/types/CSS package contract; isolated consumer | GPT-6.1 Sol / Extra High | `npm pack` / no duplicate React / clean CSS |
| P08 | CLU / master | `ci/clu-storybook-quality-gates` | CI, Storybook test/a11y/visual evidence, optional Pages | GPT-6.1 Sol / Extra High | hosted jobs all green; blocked failing stages |
| P09 | DGI / main | `feat/dgi-clu-dashboard-settings` | first pinned CLU consumer on Dashboard/Settings | GPT-6.1 Sol / Extra High | DGI CI, ArcGIS cold-start untouched |
| P10 | DGI / main | `feat/dgi-clu-history-merchants` | form/table/dialog migration | GPT-6.1 Sol / Extra High | DGI CI, DST/minutes/pagination/Prop22 preserved |
| P11 | CLU / master | `release/clu-v1-readiness` | docs, real consumer evidence, release checklist | GPT-6.1 Sol / High | evidence audit; release only with approval |

Read `codex-prompts.md` or `prompts/P01.md` through `prompts/P11.md` for complete self-contained Codex tasks and PR bodies.

## 10. Acceptance criteria (v1 ready)

- All 19 conceptual component exports have working typed code, documentation, tests and stories.
- Package resolves in a *separate* consumer with no CLU workspace alias, with CSS imported once and React external/peer.
- DGI includes an **immutable, reproducible CLU dependency** and actually uses its components on all four routes without changes to backend/domain/API/GIS/AI contracts.
- All mandatory CLU and DGI quality gates pass. CLU UI quality includes keyboard/a11y plus reviewed deterministic screenshots.
- Reviewer can open an accessible Storybook showcase (public if Pages was enabled; otherwise a reproducible local build). README distinguishes implemented facts, measured results and future work.
- Do not claim cross-team adoption, reduced regressions, accessibility compliance certification, or productivity gains without evidence. Don't claim npm publication until the package exists in a registry.

## 11. Risks and stop/go decisions

| Risk | Mitigation / stop condition |
| --- | --- |
| Unavailable npm namespace / package artifact | P07 must pass `npm pack`; pause P09 until a reproducible immutable installable version is approved. Never vendor CLU into DGI. |
| Tailwind preflight or selectors break ArcGIS/Calcite | Enforce `--clu-*` and `clu-*` scope, test MapView CSS/layout after integration. |
| Accessibility differs in real browser | Browser tests and manual keyboard review for Dialog/SegmentedControl; no false WCAG certification. |
| DGI business regression during redesign | Small route-by-route PRs, unchanged APIs/tests, representative synthetic fixtures, full CI checks. |
| Old baseline coverage misquoted | Include run SHA and measured numbers in README; do not copy old counts or invent after-migration metrics. |
| Visual snapshots too flaky | Freeze browser/version/fonts/viewport/data/time; review baseline first, never blindly `update-snapshots` in CI. |
| Excessive component scope | Freeze v1 inventory; queue Toast/Charts/DatePicker/DataGrid for v1.1+ only with consumer demand. |

## 12. Technical references

- React 19 refs: https://react.dev/reference/react/forwardRef
- Storybook React + Vite: https://storybook.js.org/docs/get-started/frameworks/react-vite
- Storybook Vitest addon: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
- Storybook accessibility: https://storybook.js.org/docs/writing-tests/accessibility-testing
- Tailwind v4 token primitives: https://tailwindcss.com/docs/theme
- Vite library-mode CSS entry: https://vite.dev/config/build-options.html
