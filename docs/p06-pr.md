# feat(overlays): introduce accessible dialog and confirmation primitives

## Summary

Add controlled Dialog and compositional ConfirmDialog APIs for generic forms and confirmation flows.

- Use native showModal/top-layer isolation, generated heading/description associations, explicit initial/return focus and safe Escape/backdrop policies.
- Preserve child form state and consumer-owned submission; add local Tab-boundary protection and StrictMode-safe close/reopen cleanup.
- Guard overlapping async confirmations, block dismissal while pending, retain safe failure/retry feedback and leave successful closure to the consumer.
- Add synthetic stories, a browser-executed focus/Tab play test, unit regression coverage and documented API/browser limits.

## Verification

- [x] Clean npm ci on Node 22.23.4 / npm 10.9.0
- [x] Entire quality:check: lint, strict types, 82 tests across 20 files, library/CSS and static Storybook builds
- [x] Chromium initial focus, forward/reverse Tab, native Escape and trigger/fallback focus return
- [x] StrictMode repeat reopen, stale native close events and unmount cleanup tests
- [x] Disabled/pending confirm, async success/failure and duplicate callback protection
- [x] 390px long form scrolling, recoverable form error, desktop/mobile light/dark review
- [x] Independent tarball strict types, Vite build, SSR and compiled CSS without consumer Tailwind

See docs/overlays.md and docs/p06-verification.md for contracts, actual output, screenshots and limitations. The existing Storybook preview chunk-size warning remains visible. Firefox/Safari, screen readers and DGI integration were not executed.

## Review focus

- Verify unsaved-change Escape/backdrop choices and surviving return-focus targets.
- Keep business mutations, form validation, async request cancellation and success closure in the consumer.
- Confirm no portal/overlay dependency, global scroll-lock utility or unscoped CSS was introduced.

Removed nine byte-identical untracked P05 duplicate snapshots found during final review; preserved all original files and re-ran the complete quality script.

No DGI source changes, publication, push or merge.
