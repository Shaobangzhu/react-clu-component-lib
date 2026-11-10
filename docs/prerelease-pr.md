# chore(release): prepare a verified provisional CLU prerelease candidate

Historical private rc.1 record. The owner subsequently approved the scoped MIT rc.2 plan and conditional publication; see [current rc.2 evidence](rc2-verification.md). This historical artifact/digest is unchanged.

## Summary

- Prepare `react-clu-component-lib@0.1.0-rc.1` for owner review, retaining `private: true` and an explicit `UNLICENSED` no-grant placeholder until identity/license/distribution decisions are approved.
- Preserve one exact tested npm tarball locally with independent SHA-512 verification, strict archive manifest, source-preparation provenance, consumer lock and synthetic browser evidence.
- Extend the independent public-package consumer with controlled/empty/zero values, disabled/loading/error/unknown states and automated desktop/mobile light/dark keyboard/modal/CSS-isolation checks. Correct stale P08 documentation using verified merged-base hosted results.

## Verification

- [x] Clean npm ci and complete quality:all, with final preparation-script lint
- [x] Strict types, **83 unit tests**, coverage floors unchanged
- [x] ESM/declaration/scoped CSS and static Storybook builds
- [x] **166 Storybook/a11y tests**; **6 Chromium tests / 12 unchanged zero-diff goldens**
- [x] Actual package:verify archive inspection: **24 files**, **19 runtime exports / 27 types**, no embedded React, source/maps/tests/secrets
- [x] Fresh external consumer npm ci, strict Bundler/NodeNext, Vite production build, Node ESM/SSR, blocked internal imports and shared React
- [x] Final exact tarball browser checks in four desktop/390px light/dark contexts; eight synthetic screenshots inspected
- [x] Audit/failure propagation: production zero findings; 13 moderate dev findings remain visible; no high/critical; expected exits 1/23 preserved
- [ ] Hosted verification of this preparation diff after separately authorized push; merged P08 base runs are green
- [ ] Owner approval of final identity/license/private flag and npm publishing rights; final publishable candidate + distribution approval

Actual measurements, failure fixes, provenance and limitations: [verification record](prerelease-verification.md). Proposed publishing/authentication/post-publication procedure: [candidate decisions](prerelease-candidate.md).

## Retained local artifact

`artifacts/prerelease/react-clu-component-lib-0.1.0-rc.1-7e401afd3d44/react-clu-component-lib-0.1.0-rc.1.tgz` — **15,832 bytes**, ignored local evidence, not committed or distributed.

```text
sha512-KdoDvUdVrCwUTy31YggrFaJ+qth6OKGwxQXJGqgXSTx2BVTi/7Tb0E2Tkr3R0DBEpnarhZh/vikH+jypF3Ebdg==
```

## Release boundary

This is review preparation, not an npm release or P09-ready distribution. No DGI read/change, public API change, package upload, remote release/tag, push or merge. Any metadata change or repack requires renewed candidate verification and explicit approval; later registry bytes must match the approved tarball SRI before P09 begins. Licensing/namespace rights and final release metadata remain owner decisions.

Suggested local commit: `chore(release): prepare provisional CLU 0.1.0-rc.1 candidate`.
