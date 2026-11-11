# P08 quality gates and operations

## Commands and scope

Use Node 22.23.4 / npm 10.9.0 and `npm ci`. All direct test dependencies and transitive resolutions are locked. No Allure adapter is added: native Vitest/Playwright JUnit, coverage summaries and PNG diffs provide the required evidence without an extra reporting pipeline or credentialed deployment.

| Command | Scope |
| --- | --- |
| npm run lint / typecheck | Strict source, config, unit and browser type projects |
| npm run test:coverage | All unit/component tests; V8 public implementation coverage |
| npm run package:verify | Build ESM/types/CSS; inspect actual archive; external locked consumer types/build/SSR/React deduplication |
| npm run build-storybook | Static production build |
| npm run browser:stories | All CSF stories with supported Vitest addon, play interactions and blocking axe checks |
| npm run browser:visual | Static Storybook; exact golden comparisons plus native keyboard/focus tests |
| npm run security:check | Registry audit: production moderate+ and full-tree high+ block; all findings reported |
| npm run quality:probe | Disposable intentional test failure, tee exit preservation and aggregate failure/blocked cases |
| npm run quality:check | Lint/types, unit coverage, library/Storybook and package checks |
| npm run quality:all | All the above layers, including canonical Docker browser jobs, audit and probe |

The browser wrappers require an installed/running Docker engine. They stage only a disposable code projection, mount that projection read-only and export bounded diagnostics. The workspace's .git/.env, user directories, credentials and Docker socket are not mounted into the test container. No source or application records from DGI are used.

Coverage applies to src/components, forms, data and overlays, excluding stories and internal/gallery scaffolds. Aggregate floors: lines/statements 90%, functions 85%, branches 80%. Coverage is a regression signal, not a claim about all behaviors or accessibility. Browser and story assertions have separate counts from unit coverage.

## Storybook and accessibility

Storybook core/addon-a11y/addon-vitest are pinned at 10.6.5; Vitest/browser/provider/coverage at 4.1.12, Playwright/test at 1.64.1. The established React-Vite adapter remains 10.3.6: testing 10.6.5 exposed incompatible declarations under the existing strict TypeScript 5.9.3/exactOptionalPropertyTypes contract. Its official peer range accepts the installed core. No legacy peer bypass or skipLibCheck was used. See package-lock.json for the actual graph.

The supported addon discovers all existing CSF stories; no tags, skips or name filters reduce the suite. Since addon 10.3, preview annotations are provisioned automatically; redundant custom setProjectAnnotations setup is unnecessary. Global `parameters.a11y.test = 'error'` blocks violations. No custom story/rule waiver was added. Storybook's own default disabled region rule for component fragments is retained, as documented by the addon; it is not WCAG certification. Synthetic Quality stories and real Chromium tests cover Button activation/focus, native radio arrows, controlled Pagination boundaries and native Dialog Tab/Shift+Tab/Escape/return focus/draft preservation.

Browser and jsdom matcher types are separated by tsconfig projects. Unit runtime assertions retain the RTL jest-dom matchers through expect.extend, while one shared Vitest browser matcher type declaration avoids conflicting global matcher augmentation. No type errors are suppressed.

Axe found dark story labels rendered on an unpainted white canvas and repeated landmark names in the theme comparison. The Storybook-only theme host now paints its own semantic canvas/text, and comparison galleries have distinct accessible names. No global body theme or consumer style reset was introduced. Automated axe checks cannot establish screen-reader quality, cognitive usability or full WCAG conformance.

## Deterministic visual review

Canonical environment: Linux amd64, Playwright 1.64.1 Chromium 156.0.8078.4 / revision 1248, Noble base image pinned by platform manifest digest in .ci/Dockerfile.browser. Node 22.23.4 is checksum-verified; npm 10.9.0 is exact. The image pins installed font files and rasterizer/OS, with no web-font download. Both local and hosted browser jobs build/use this same image/platform; native macOS screenshots are not used as Linux goldens.

Version-label correction observed during prerelease verification: Playwright's browsers.json declares 156.0.8078.4 / revision 1248, but both actual Chrome binaries in the pinned image and browser.version() report **156.0.8078.80**. The image digest/revision and reviewed PNG bytes were unchanged; all twelve zero-diff comparisons still pass. The prerelease receipt records the actual runtime version rather than treating the metadata label as a measurement.

Snapshots pin 1280×800 and 390×844 viewports, DPR 1, en-US, UTC, light browser color scheme and reduced motion. Each story explicitly selects light/dark CLU theme. Synthetic strings are constant; no requests or timers populate the fixture. Screenshots wait for fonts/stable rendering and disable animations/caret. Full-page fixture captures may exceed viewport height; Dialog captures use the viewport.

Twelve reviewed PNGs cover light/dark states (disabled/error/empty/radio/pagination), keyboard focus and open Dialog at both sizes. Normal tests use updateSnapshots=none, threshold=0 and maxDiffPixels=0, and fail on missing goldens. Both native keyboard tests execute on every run; retries are zero. CI rejects update flags and cannot write the read-only baseline input. Baseline file inventory, hashes, dimensions, environment and inspection date are in .ci/visual-baselines.json.

For an intentional UI change, outside CI:

1. Run `npm run visual:candidates`. Candidate screenshots are written only under ignored artifacts/browser/candidates/candidates, not accepted goldens.
2. Inspect every changed PNG alongside the previous golden. Check text, states, focus, clipping and mobile layouts. Do not accept changes solely to make a failing test pass.
3. Copy only inspected candidates into tests/visual/baselines and update the review/hash manifest deliberately. Commit them together for human PR review; the agent does not auto-commit or approve branding.
4. Run `npm run browser:visual` with updates disabled. A second normal run must match exactly before merging.

## CI checks, artifacts and failure propagation

CLU CI triggers for pull requests to master, pushes to master and workflow_dispatch. Required stage jobs are independent; matrix fail-fast is false. Runtime installs use npm ci, pinned Actions SHAs and the shared toolchain. Top-level permission is contents:read, checkout does not persist credentials, and no pull_request_target, repository secrets, paid-provider keys or deployment permissions exist in CI.

Check names:

- Static checks
- Unit and coverage
- Package contract
- Storybook build
- Dependency security
- Failure propagation
- Component interactions and a11y
- Chromium visual and keyboard
- **Quality gate** (recommended branch-required status from GitHub Actions)

Quality gate uses if:always() and depends on the checks matrix, components and visual jobs. It requires each result to equal success; failure, cancelled, skipped and missing results block. The matrix job succeeds only when every matrix stage succeeds. Shell pipefail preserves actual test/audit exit codes through tee. Artifact preparation/upload are separate always steps and cannot turn an earlier failure into success.

Uploads are confined to artifacts/upload after an explicit projection. Only bounded PNG/XML/JSON/log/text files are retained, workspace prefixes/ANSI are normalized and high-signal credential strings are redacted. HTML source bundles, traces/videos, env files, Git metadata, caches and unreviewed candidates are excluded; retention is seven days. Native Playwright HTML remains local only. All test data are synthetic. This projection is defense in depth, not a guarantee that future authors cannot put personal data in a fixture; review fixture content before merge.

Security policy reports both audit trees, fails on audit/network errors, production moderate+ or full high+. Current moderate development-tool findings remain visible and require follow-up; the chosen policy is not a claim of zero vulnerabilities. No npm audit fix --force or audit exception suppression is used.

The disposable failure probe runs a genuinely failing native Node test through tee (exit 1), verifies a nonstandard exit 23 survives tee, and tests the same aggregate script against success/failure/skipped/cancelled/missing inputs. Its expected failures live in a new temporary directory; committed production tests remain passing. Synthetic failure output and status JSON are retained.

## Admin-only enablement and hosted limitations

Read-only public GitHub branch metadata on 2026-11-09 reported master protected=false and required-status enforcement off. This PR does not change repository settings. The unauthenticated Pages endpoint returned 404, which does not establish whether an administrator has private/disabled Pages configuration. No deployment is enabled or attempted.

P08 was subsequently merged in PR #8. Read-only inspection during prerelease preparation confirmed successful [merged-master](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668994812) and [PR](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668975600) runs. All nine master jobs, including Quality gate and artifact-upload steps, succeeded. Downloaded artifact contents and a fork-PR execution were not inspected. At that historical preparation checkpoint the diff had only local verification. Prerelease preparation and presentation subsequently merged; see the current [P11 readiness evidence](release-readiness.md). Confirm artifacts and fork behavior before enabling required checks.

An owner/admin should then use Settings -> Rules -> Rulesets (or branch protection): target master; require PR review and **Quality gate** from the GitHub Actions app; consider requiring branches up to date, one reviewer, resolved conversations, and blocking force pushes/deletion. Keep bypass permissions deliberate. Do not mark the check required before its first hosted context exists. Optional individual stage statuses can also be required, but the aggregate already blocks every mandatory stage. No branch-protection activation is claimed by YAML alone.

## Optional trusted-master Storybook Pages guide

Pages is outside the mandatory quality gate and requires separate owner/admin approval. Keep publication disabled until:

1. An admin chooses GitHub Actions as the Pages source and creates a github-pages environment restricted to master with any required reviewers.
2. A separately reviewed workflow uses workflow_dispatch only (or trusted master push after Quality gate success), checks `github.repository == 'Shaobangzhu/react-clu-component-lib'` and `github.ref == 'refs/heads/master'`, and checks a default-off repository enablement variable.
3. It checks out the exact trusted master SHA, runs pinned npm ci and builds Storybook. It uploads only storybook-static using the official pinned Pages actions; no CI logs, junit, diffs or node_modules are published.
4. Only its deployment job gets pages:write and id-token:write and the github-pages environment. PR jobs never receive these permissions or download PR artifacts into a privileged workflow_run publisher.
5. The owner verifies the actual URL after deployment. Publication failure stays independent of required component/build/a11y/visual/security gates.

No public URL, admin enablement, npm publication or approved DGI distribution is inferred from this PR.

Primary references: [Storybook a11y/Vitest integration](https://storybook.js.org/docs/writing-tests/accessibility-testing), [Playwright visual comparison platform caveat](https://playwright.dev/docs/test-snapshots), [Playwright Docker guidance](https://playwright.dev/docs/docker). Installed addon templates/peer metadata were also inspected directly.
