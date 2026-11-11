# ci: establish CLU Storybook quality gates

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Summary

Make CLU quality independently testable in GitHub Actions with layered PR/master/manual checks and an unconditional aggregate Quality gate.

- Add supported Storybook Vitest/a11y addons with blocking accessibility evaluation for all stories, plus representative native Chromium interactions.
- Add twelve inspected Linux/Chromium golden screenshots for desktop/mobile light/dark, disabled/error/empty/focus/dialog states. CI never updates goldens and allows zero differing pixels.
- Preserve test exit codes through logging, prepare bounded synthetic diagnostics, and verify failure/blocked aggregation using disposable intentional failures.
- Retain external package-consumer checks, add measured coverage floors and explicit production/full dependency audit policies.
- Document required-check administration and default-disabled, trusted-master-only Pages enablement without adding a privileged reporting pipeline.

## Verification

- [x] Clean npm ci and full local quality:all
- [x] Lint / strict source, unit and browser types
- [x] 83 unit tests across 21 files; coverage lines 96.36%, statements 93.57%, functions 92.64%, branches 88.96%
- [x] 166 Chromium Storybook interaction/a11y tests across 24 files
- [x] 6 Playwright visual/native keyboard tests; 12 inspected baselines matched exactly
- [x] Library/Storybook builds and archive/external consumer compatibility
- [x] Production audit: zero findings; full audit: 13 moderate development-tool findings, zero high/critical
- [x] Disposable failing-test/tee/aggregate probe, artifact privacy projection and actionlint
- [ ] Hosted PR Quality gate and artifact inspection after review/push

See docs/p08-verification.md for executed output, baseline review and methodological limits. Automated accessibility is not WCAG certification; local results do not establish hosted success.

## Operations

Require **Quality gate** from GitHub Actions after the first hosted context exists. Public master metadata currently reports protection disabled; admin enablement is documented in docs/ci-quality.md. Pages status was not established, and publication remains optional and disabled.

No DGI production changes, push/merge, publication, paid-provider keys, PR-secret exposure or CI secret changes. DGI integration remains gated on separately approved immutable package distribution.
