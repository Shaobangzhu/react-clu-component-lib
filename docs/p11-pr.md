# docs(release): finalize CLU v1 readiness and verified DGI integration evidence

Proposed base: master. Branch: release/clu-v1-readiness from 5328c8db5ff9394169c842ec43b63b40d24c11ce. PR URL/head CI: not available until owner-authorized push and PR creation. Suggested commit: `docs(release): reconcile CLU prerelease, DGI adoption and v1 readiness evidence`.

## Summary

- Reconcile the original roadmap with merged P01–P08, published MIT @shaobangzhu/clu-ui@0.1.0-rc.2, its GitHub prerelease and actual 19 runtime / 27 type exports.
- Independently verify DGI P09/P10 PRs #22/#23, exact main/PR-head Quality gates, immutable package lock and actual Dashboard/Settings/History/Merchants imports. Document retained pagination, native labels/checkboxes, provider/summary markup and domain-specific dialog adapters.
- Add changelog, architecture, consumer integration, release-readiness and interview walkthrough. Correct public package-name examples and current README/plan status; annotate historical evidence instead of replacing old measurements.

## Source of truth and boundaries

npm rc.2 remains immutable at sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==. A fresh download matched npm and DGI's lockfile. The GitHub prerelease points to c8a19783325cbd963a4ff92cb5c7dd8eef46a27c. npm provides neither gitHead nor provenance attestation; reproducible source matches are not original-upload attestations.

P11's local pack differs only in README and package.json (homepage) from frozen npm; 22 dist files and LICENSE are byte-identical. It is not a replacement npm artifact. No package/version/dependency/API/license/workflow/baseline changes, npm publish/dist-tag action, Git tag/Release mutation, DGI edit, external deployment or remote security-setting change.

## Verification

- [x] Clean Node 22.23.4 / npm 10.9.0 install; full quality:all including quality:check, library/Storybook builds and package:verify in a code-matched clean projection
- [x] 83 unit tests / 21 files; statements 93.57%, branches 88.96%, functions 92.64%, lines 96.36%
- [x] 166 Storybook/a11y tests / 24 files; six pinned Chromium tests / 12 unchanged zero-diff goldens; zero retries
- [x] Outside package consumer types/ESM/SSR/Vite/React checks and archive metadata/allowlist
- [x] Production security 0; full dev tree 13 moderate, 0 high/critical; failure-propagation probes passed
- [x] DGI exact heads/main and Quality gates verified: [P09](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42928241557), [P10](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42959052861), [main](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42959727037)
- [x] Current CLU [base master CI](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42867225771) read independently; no P11-head pass inferred
- [x] Local Markdown destinations/fences, credential-pattern scan, synthetic examples and representative unchanged screenshots reviewed; no Markdown-linter executable available
- [ ] P11 PR-head Quality gate: requires authorized push/PR; not independently verified

Full command ledger, measurements and limits: [release readiness](release-readiness.md). DGI's separately triggered [report deployment](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42960121340) failed in Cloudflare deployment despite passing product CI; no new public report freshness is claimed. Its frontend 257/24 and E2E 25 passing results are separate from CLU counts.

## Remaining decisions

Stable 1.0.0 is not approved/published. Any rc.3/stable version, public API enhancement, required-branch status settings, Trusted Publishing or hosted Storybook needs separate scope/approval and verification. Current master protected=false and rulesets=[]; Quality gate is available, not claimed enforced. Reconcile outstanding security signals and manual accessibility limits; do not force universal component adoption or hide the report deployment failure.
