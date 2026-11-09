# P08 verification — 2026-11-09

## Outcome and baseline

Local implementation and the complete clean-install pipeline passed on `ci/clu-storybook-quality-gates`, based on latest fetched origin/master `f617b4a630cda7ffc6f65adae36764e4141d5681` (P07 merge). The worktree was clean. The requested branch already existed at that same base when work resumed; no user changes were reset.

No commit, push, merge, hosted P08 run, deployment, repository setting change or DGI modification was performed. DGI CI and quality-report workflows were read only to extract least-permission, exit-preservation and aggregate-gate principles. CLU does not adopt its Cloudflare/Allure release pipeline.

## Executed local checks

Final command: clean `npm ci`, then `npm run quality:all` (exit 0). After tightening artifact redaction, lint and the dedicated privacy projection were also rerun successfully. [Full local output](evidence/p08/quality-all.txt) retains command/test/audit results with terminal escapes and workspace prefixes normalized.

| Layer | Actual result |
| --- | --- |
| ESLint / strict TypeScript | PASS; source/unit/browser projects, no skipLibCheck or peer bypass |
| Vitest unit/component | 83 passed across 21 files; 2.98s |
| Library ESM/declarations/scoped CSS | PASS; React remains external |
| npm archive / external consumer | PASS; 24-file allowlist, Bundler+NodeNext, production build/SSR/single React |
| Storybook production build | PASS; existing preview chunk-size warning retained |
| Vitest addon Chromium interactions + axe | 166 passed across 24 story files; 22.62s; a11y.test=error |
| Playwright visual + native keyboard | 6 passed; 24.8s; 12 inspected PNGs matched with zero allowed differing pixels |
| Production audit | 0 findings, blocking at moderate+ |
| Full dependency audit | 13 moderate development-tool findings, 0 high/critical; blocking at high+ |
| Failure propagation | Real disposable failing test exit 1; nonstandard exit 23 preserved through tee; aggregate rejects failure/skipped/cancelled/missing |
| Artifact privacy projection | Synthetic token/private-key body redacted; env/HTML excluded |
| Workflow/static shell validation | actionlint 1.7.7 and bash -n passed |

V8 implementation coverage (stories/internal scaffolds excluded): lines **96.36% (159/165)**, statements **93.57% (204/218)**, functions **92.64% (63/68)**, branches **88.96% (274/308)**. These exceed the committed aggregate floors 90/90/85/80 respectively. [Coverage summary](evidence/p08/coverage-summary.json). Data primitives are included; coverage is not a claim of full behavioral or accessibility coverage.

## Canonical environment and baseline inspection

Node 22.23.4, npm 10.9.0, Storybook core/a11y/Vitest addon 10.6.5; established React-Vite adapter 10.3.6; Vitest/browser/provider/coverage 4.1.12; Playwright/test 1.64.1. Registry peer metadata and installed official addon templates were checked. All direct additions have exact versions and the package lock was regenerated and verified through clean install.

An attempted adapter 10.6.5 alignment exposed upstream declaration errors under strict TypeScript 5.9.3. The previously tested adapter 10.3.6 was retained with compatible official peer ranges; the new addons/core pass the actual full suite. Browser and unit matcher type declarations were separated/shared deliberately while keeping RTL runtime matchers. No node_modules patch, ignore rule or type-check suppression was introduced.

Browser tests ran in Linux amd64, Chromium 156.0.8078.4 revision 1248 using the official Playwright Noble image pinned to `sha256:ee15712262f017b8157421b212b12099146645f44b1bc5c0514cbbe6a229b1d0`. The Node Linux gzip archive was SHA-256 verified. Installed fonts and rasterizer are fixed by this image; no web font asset is fetched. Local Docker uses the same architecture/image recipe as CI. DPR/locale/timezone/reduced motion and explicit CLU light/dark theme are pinned.

All twelve candidate images were inspected: desktop/mobile light and dark state matrices, focus states and open dialogs. Inspection found inadequate spacing between the fixture input focus ring and Cancel action; the fixture was corrected, the four changed dialog images re-inspected, then the twelve candidates were copied to the accepted baseline directory. No git commit was made. The review inventory, dimensions and SHA-256 hashes are in [.ci/visual-baselines.json](../.ci/visual-baselines.json). The subsequent normal compare ran with updateSnapshots=none, threshold=0, maxDiffPixels=0 and retries=0.

Representative reviewed images: [desktop light](../tests/visual/baselines/desktop/light-states.png), [desktop dark focus](../tests/visual/baselines/desktop/dark-focus.png), [mobile light](../tests/visual/baselines/mobile/light-states.png), [mobile dark dialog](../tests/visual/baselines/mobile/dark-dialog.png). Full-page images can be taller than the pinned viewport; Dialog captures use the viewport. These are regression baselines, not final branding approval.

The browser keyboard tests use actual Chromium Enter/ArrowRight/Tab/Shift+Tab/Escape. They confirm button focus/activation, native radio selection, the 11-item final-page range and disabled Next, dialog initial/return focus, both Tab boundaries and preserved draft on reopen. All values are explicitly synthetic. No production addresses, business figures, APIs or records are involved.

## Genuine issues detected and fixed

Blocking axe evaluation initially found nine failing stories: dark labels were painted over an unthemed white canvas, and the paired token gallery repeated landmark names. Local Storybook hosts now paint semantic canvas/text and comparison galleries have distinct accessible names. The entire 166-story suite then passed, without custom a11y exceptions or excluding stories. Storybook's default region-rule setting for isolated fragments remains documented in [operations](ci-quality.md); automated evaluation does not certify WCAG compliance.

The source/public component API is unchanged. Gallery/quality specimens and Storybook canvas changes are developer documentation/test scope. No generic consumer selectors, business logic or global body theme were introduced. The original 83 unit tests remain included.

## Failure/privacy evidence and security limits

[Failure probe](evidence/p08/failure-probe.json) and [actual intentional failing test output](evidence/p08/intentional-failure.txt) demonstrate that failed tests remain failed through logging. The probe's wrapper succeeds only because the expected failure codes and aggregate outcomes were verified in a disposable directory; committed defaults remain passing.

[Privacy probe](evidence/p08/privacy-probe.json) and the final artifact projection passed. Eight bounded diagnostic files were prepared locally. Upload paths are restricted to the projected artifacts/upload tree; PNG/XML/JSON/text/log only, seven-day retention, no HTML bundles, traces/videos, caches, env/Git metadata or candidates. Synthetic fixtures and image inspection are still essential: a text scrubber cannot remove personal content someone deliberately inserts into a future screenshot.

[Security summary](evidence/p08/security-summary.json) retains all thirteen moderate findings, principally the minimatch advisory propagated through ESLint/TypeScript/Storybook development tooling. The full-tree high+ policy passes honestly with these warnings; it does not claim a zero-vulnerability tree. Audit/network failures block, and no audit downgrade/allowlist/force fix was used.

## Hosted and administrator boundary

The [public master branch metadata](https://api.github.com/repos/Shaobangzhu/react-clu-component-lib/branches/master) reported protected=false and required-status enforcement off on 2026-11-09. The unauthenticated Pages endpoint returned 404; that does not establish administrator-side Pages settings. [Normalized settings observation](evidence/p08/github-settings.json). Settings were not changed.

Hosted CLU CI has **not** been run for these local unpushed changes. A green hosted PR gate cannot be claimed before the user's review/push authorization. Actionlint/local tests validate the implementation, not GitHub's scheduler, cancellation behavior, artifact service or fork settings. After push, inspect all hosted jobs and artifacts before requiring **Quality gate** from GitHub Actions on master. [Required check names, admin instructions and optional trusted-master Pages guide](ci-quality.md).

No Pages workflow/deployment or public URL was enabled. Firefox/Safari, screen readers, real ArcGIS/Calcite and DGI integration were not run. P09/P10 still require a separately approved immutable package artifact. P08 hosted acceptance remains pending.

[PR draft](p08-pr.md). Suggested commit: `ci: establish CLU Storybook quality gates`.
