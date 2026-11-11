# CLU v1 Blueprint and Delivery Plan

**Status (2026-11-11, America/Los_Angeles):** P01–P08 implemented; public rc.2 prerelease published; P09/P10 DGI consumer integration independently verified. P11 documentation and local quality checks are complete; PR-head verification awaits an authorized push. Stable v1.0.0 is NOT APPROVED / NOT PUBLISHED. See the current ledger below; older phase sections are dated historical snapshots.
**Original planning date:** 2026-11-04 (America/Los_Angeles).
**CLU repository:** https://github.com/Shaobangzhu/react-clu-component-lib (default branch: `master`; original planning audit commit: `f159e7ea6c4dc5ebd0d60e5593a6ec4f8f9d9eb5`).
**First consumer:** https://github.com/Shaobangzhu/delivery-geo-intelligence (default branch: `main`; original planning audit commit: `077ae131c324913823bd793105424c5e00a3b389`).
**Future consumer:** SCOC, outside the v1 acceptance scope.
**Version meaning:** This document defines the v1 product scope. The package may use `0.1.x` prereleases before `1.0.0`; it must not claim v1 is released until all acceptance gates pass.

## Current factual ledger

| Phase / gate | Evidence and status |
| --- | --- |
| P01–P08 | Implemented, PRs #1–#8 merged; [current audited master CI](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42867225771) passed at 5328c8db5ff9394169c842ec43b63b40d24c11ce |
| Prerelease / presentation | PRs #9–#13 merged; public @shaobangzhu/clu-ui@0.1.0-rc.2 and annotated GitHub prerelease v0.1.0-rc.2; [immutable artifact/source distinction](docs/release-readiness.md) |
| P09 | [DGI PR #22](https://github.com/Shaobangzhu/delivery-geo-intelligence/pull/22) merged; exact PR-head Quality gate verified |
| P10 | [DGI PR #23](https://github.com/Shaobangzhu/delivery-geo-intelligence/pull/23) merged; exact PR-head and current main Quality gates verified; [adoption and exceptions](docs/consumer-integration.md) |
| P11 | Local documentation/readiness complete on release/clu-v1-readiness; command results and pending PR-head verification in [readiness](docs/release-readiness.md) |
| Public Storybook | Local/static only; no verified public deployment |
| Stable v1 | Blocked pending owner approval, new version/artifact verification, P11 PR-head gate and outstanding review items; not released |

The original planning references above and phase-era claims below remain historical. Current status takes precedence over earlier “planned/private/unpublished” snapshots. DGI's report deployment failure is separate from its passing consumer CI; no public report freshness is claimed.

## P01 implementation progress (2026-11-04)

P01 is implemented and locally verified in the working tree on `chore/clu-v1-foundation`, based on merged `origin/master` at `f159e7ea6c4dc5ebd0d60e5593a6ec4f8f9d9eb5`. P01 was subsequently merged in PR #1 at `eade7b9`; this remains foundation progress, not a v1 release.

- [x] Exact development dependency pins, lockfile, Node 22.23.4/npm 10.9.0 minimum, and strict peer/engine installation checks.
- [x] Strict TypeScript, type-aware ESLint, deterministic Vitest/RTL tests, and an internal Storybook rendering proof.
- [x] Explicit Vite ESM and declaration output, React peer/external configuration, and opt-in CSS placeholder with Tailwind v4 compilation and no consumer Preflight.
- [x] Clean `npm ci` on Node 22.23.4/npm 10.9.0, then lint, typecheck, four tests, library build, and static Storybook build.
- [x] README distinguishes implemented foundation, planned components, package publication, consumer integration, and a future public Storybook URL.

See [P01 verification](docs/p01-verification.md) for exact versions, actual output, the npm lockfile-generation exception, compatibility choices, and outstanding development-tool audit findings. At P01 verification, P02–P11 remained planned; no public components, registry release, hosted Storybook, or DGI integration have been completed.

## P02 implementation progress (2026-11-04)

Implemented on `feat/clu-design-tokens` from merged `origin/master` at `eade7b9bbe6fd7db748edeed75168e0a0bdf4559`. P02 was subsequently merged in PR #2 at `12f5a39`. All required automated checks were re-run successfully on 2026-11-05 after all 22 duplicate baseline files were analyzed and removed.

- [x] Scoped public semantic tokens, independent light/dark and nested-host defaults, higher contrast, forced colors and reduced motion.
- [x] Documented token meanings and public/private contracts; a Storybook gallery and local Theme toolbar.
- [x] Built CSS isolation and opaque-pair contrast checks, plus theme-story tests.
- [x] Clean install, lint, strict types, 10 tests, ESM/CSS build and Storybook build.
- [x] Real browser review at 1280px and 390px in both themes; keyboard focus and bare HTML consumer isolation checked.

See [token contract](docs/design-tokens.md) and [P02 evidence](docs/p02-verification.md). At P02 verification, P03–P11 remained planned. This does not approve final DGI branding or complete public components, consumer integration, or accessibility certification.

## P03 implementation progress (2026-11-05)

Implemented locally on `feat/clu-display-primitives` from merged `origin/master` at `12f5a39205d705e96b244f5747659bf5162c3e66` (P02 PR #2). P03 was subsequently merged in PR #3 at `08aebf6`.

- [x] Nine public display components and React 19 prop/ref types exported from the package entry.
- [x] Scoped token styles, per-component tests and stories; explicit loading, unknown/unavailable and live announcement contracts.
- [x] Clean install, lint, strict types, 22 tests across 13 files, library/CSS and Storybook builds.
- [x] Packed ESM/CSS consumption without Tailwind; desktop/mobile light/dark browser review and visible keyboard focus.

See [API notes](docs/display-primitives.md) and [P03 verification](docs/p03-verification.md). At P03 verification, P04–P11 remained planned; no DGI integration or release claim is made.

## P04 implementation progress (2026-11-05)

Implemented locally on `feat/clu-form-controls` from merged `origin/master` at `08aebf68e269ceb145e8c67d32d8e83dd8da4714`. P04 was subsequently merged in PR #4 at `8e346d9`.

- [x] Six generic native form primitives and prop types appended to the public entry; existing display exports preserved.
- [x] Explicit stable Field association, native controlled/uncontrolled values and refs, tested mixed checkbox state and single-select radio behavior.
- [x] Per-control states and controlled stories plus a generic synthetic metadata form; no DGI domain imports or date conversion.
- [x] Clean install, lint, strict types, 36 tests across 15 files, CSS/library and Storybook builds.
- [x] Desktop/390px light/dark browser review, radio keyboard navigation and native submission; packed public consumer smoke without Tailwind.

See [form contracts](docs/form-controls.md) and [P04 verification](docs/p04-verification.md). At P04 verification, P05–P11 remained planned; no consumer integration or release claim.

## P05 implementation progress (2026-11-05)

Implemented locally on `feat/clu-data-presentation` from latest merged `origin/master` at `8e346d94a2dccd2c83f5b36ceb7613290093747f`. P05 was subsequently merged in PR #5 at `89dad11`.

- [x] Native compound Table API, captions/header associations, refs, numeric alignment, density, empty/loading rows and named keyboard-scrollable overflow wrapper.
- [x] Controlled Pagination with display-only numeric normalization, truthful empty ranges, bounded page windows, boundary/disabled controls and no state-reconciliation effects.
- [x] Synthetic Delivery History/Merchant Summary and boundary/control stories; 69 tests across 18 files, strict types, safe CSS, library and Storybook builds after clean install.
- [x] Real browser desktop/390px light/dark, horizontal keyboard scrolling, numeric style, empty ranges and total-shrink ownership review.
- [x] Real tarball installed in an independent consumer; strict TypeScript, Vite production build, SSR and precompiled CSS without Tailwind passed.

See [data API contracts](docs/data-presentation.md) and [P05 evidence](docs/p05-verification.md). At P05 verification, P06–P11 remained planned. DGI pagination/edit policies, consumer integration and release approval remain outside this work.

## P06 implementation progress (2026-11-05)

Implemented locally on `feat/clu-dialog-confirmation`; the existing clean branch was verified against latest fetched `origin/master` at `89dad11062a50fd63e2e0116a0e2034033df781f` (P05 merge). P06 was subsequently merged in PR #6 at `a90c433`.

- [x] Controlled native Dialog with heading/description, initial and return/fallback focus, explicit Escape/backdrop policies and preserved child form content.
- [x] Compositional ConfirmDialog with neutral/destructive actions, pending/disabled contracts, overlapping async confirmation guard and safe retry feedback.
- [x] StrictMode reopen/queued-close/unmount tests, callback/association tests and synthetic form/confirmation stories.
- [x] Clean install and complete quality script: lint, strict types, 82 tests across 20 files, scoped CSS/library and static Storybook builds.
- [x] Real Chromium focus/Tab play test plus native keyboard Escape, backdrop, removed-trigger fallback, async confirmation and 390px long-form light/dark review.
- [x] Independent packed consumer strict types, Vite build, closed SSR and precompiled CSS without Tailwind.

See [overlay contracts and reviewer checklist](docs/overlays.md) and [P06 evidence](docs/p06-verification.md). At P06 verification, P07–P11 remained planned. Browser limits are recorded; no DGI integration, publication or accessibility certification is claimed.

## P07 implementation progress (2026-11-05)

Implemented locally on `build/clu-package-contract`; the clean existing branch matched latest fetched `origin/master` at `a90c433b79b894d795de3d8586ea7c6629a677c9` (P06 merge). P07 was subsequently merged in PR #7 at `f617b4a`.

- [x] Explicit ESM/CSS exports, narrow package files and CSS side effect, fresh prepack build, no source maps and React runtime boundary guard.
- [x] Separate NodeNext declaration generation, explicit .js type paths and reachable public type graph only; existing component behavior/API names preserved.
- [x] Real dry-run/pack/archive allowlist/integrity checks and a locked external consumer with 19 runtime APIs, 27 types, strict Bundler/NodeNext refs, Vite production build, SSR and one shared React installation.
- [x] Rendered host CSS isolation fixture caught/fixed the layered-component conflict; no generic selectors or resets introduced.
- [x] Two final clean npm ci/full quality/independent install rounds passed: 83 tests across 21 files, library/Storybook builds and byte-identical 24-file tarballs.
- [x] Both external consumers reviewed in Chromium desktop/390px: host isolation, Button/Input/radio/Table/Pagination, Dialog native focus/Tab/Escape and draft preservation.
- [x] Local install/version/source-map policies and registry/license/immutable-distribution prerequisites documented without claiming publication.

See [package contract](docs/package-contract.md) and [P07 evidence](docs/p07-verification.md). At P07 verification, P08–P11 remained planned. Publication is not authorized; P09/P10 stay blocked on a separately approved immutable installable artifact.

## P08 local implementation progress (2026-11-09)

Implemented on `ci/clu-storybook-quality-gates` from merged master `f617b4a630cda7ffc6f65adae36764e4141d5681` (P07), subsequently merged in PR #8 at `9f08f61102bec757de5107161602d4ac158fe760`. Hosted results were checked read-only during prerelease preparation.

- [x] Least-permission PR/master/manual layered CI and unconditional Quality gate; blocked/cancelled/missing upstream results fail.
- [x] Supported Storybook Vitest/a11y integration with a11y.test=error; all 166 story tests pass without custom exclusions.
- [x] Twelve inspected Linux amd64/Chromium goldens, zero-pixel normal comparison, pinned fonts/environment and 6 native keyboard/visual tests.
- [x] Clean full local pipeline: strict lint/types, 83 unit tests, measured coverage floors, ESM/type/CSS build, external package smoke and Storybook build.
- [x] Production/full audit policies with actual findings, sanitized bounded artifacts, disposable real test-failure/exit-code/aggregate/privacy probes and actionlint validation.
- [x] Actual master protection metadata checked; admin required-check and optional trusted-master Pages enablement instructions documented. No settings/deployment changed.
- [x] Hosted PR and merged-master runs passed; all nine master jobs, including Quality gate and artifact-upload steps, succeeded. See [master run](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668994812) and [PR run](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668975600).
- [ ] Manual review of downloaded hosted artifacts and fork-PR execution. Successful upload steps alone do not establish artifact-content review.

See [operations and limits](docs/ci-quality.md), [original local evidence](docs/p08-verification.md) and [PR draft](docs/p08-pr.md). P09–P11 remain planned and the immutable-distribution gate remains in force. Hosted checks passed; the separate manual follow-ups above remain open.

## Prerelease preparation (2026-11-09)

Local preparation on `release/clu-prerelease-candidate` uses the merged P08 master commit above. The proposed `0.1.0-rc.1` package retains the existing technical name, `private: true` and an explicit `UNLICENSED` no-grant placeholder. It is provisional, not an approved distribution or a v1 release. See [decisions and publication prerequisites](docs/prerelease-candidate.md) and [actual verification](docs/prerelease-verification.md). P09 remains blocked until an approved immutable artifact is distributed and its installed bytes are verified; no DGI work begins here.

## Scoped MIT prerelease preparation (2026-11-09)

The owner approved @shaobangzhu/clu-ui@0.1.0-rc.2, MIT, private=false and public/next publication after all mandatory validation succeeds. Work is on release/clu-0.1.0-rc.2 from latest merged master bce772dce977e41bfe5a065b1d5e0a76ce14cca7 (PR #9). The private rc.1 artifact remains unchanged. See [current rc.2 status](docs/rc2-verification.md) and [release contract](docs/prerelease-candidate.md). Registry authentication, actual release and integrity verification are recorded only when completed. This is not P09 implementation; DGI remains untouched.

Publication update: rc.2 is now publicly available; its actual registry SHA-512 equals the frozen candidate, and downloaded/exact-version consumers plus four browser contexts passed. See [publication evidence and tag diagnosis](docs/rc2-publication.md). Read-only investigation matched npm's first-publication/required-latest behavior: next and latest both point to rc.2, and authenticated latest deletion returned HTTP 400. The required tag is retained; no further deletion or 2FA retry is planned, and no next-only/stable-release claim is made. The immutable exact-version distribution is verified. This completes neither P09 migration nor P11 readiness; DGI is untouched.

## npm-to-GitHub synchronization (2026-11-10)

The prerelease preparation merged in PR #10. A publication audit reproduced the exact npm tarball from c8a19783325cbd963a4ff92cb5c7dd8eef46a27c and audited master b193cf08429746cc1e4d9de6ff6aa2ceebb5e9aa. npm provides neither gitHead nor provenance attestation, so the original producer commit is not independently attested. The synchronization on chore/sync-npm-github-release adds the repository homepage and corrects current publication/docs status while preserving the runtime/type/CSS contract and historical phase evidence. See [audit, differences and validation](docs/npm-github-sync.md). No npm republish, Git tag/Release, DGI integration or public Storybook deployment is part of this change. P09–P11 remain planned.

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
