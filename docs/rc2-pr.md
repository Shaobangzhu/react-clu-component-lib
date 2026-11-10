# chore(release): prepare scoped MIT CLU 0.1.0-rc.2

## Summary

- Apply owner-approved @shaobangzhu/clu-ui@0.1.0-rc.2, MIT LICENSE, private=false and npm public/next metadata; preserve the frozen private rc.1.
- Enforce approved release metadata and the 25-member archive, update scoped consumer imports/CSS checks, and retain exact-archive provenance/evidence.
- Add no-repack verification for downloaded/retained tarballs, and exclude generated evidence copies from source lint.

## Verification

- [x] Clean npm ci and complete quality:all, strict lint/types, 83 unit tests and unchanged coverage floors
- [x] Library/type/CSS and Storybook builds; 166 blocking Storybook/a11y tests
- [x] Six Chromium tests, 12 unchanged zero-diff goldens; retries zero
- [x] Two clean outside-consumer installs/types/ESM/SSR/Vite/React checks using exact archive bytes
- [x] Four desktop/390px light/dark packed-consumer browser contexts and eight inspected synthetic screenshots
- [x] Archive/LICENSE/public exports/CSS isolation and publisher dry-run integrity checks
- [x] Production security zero findings; 13 moderate dev findings remain visible, no high/critical; failure propagation passed
- [x] Owner-authenticated public npm publication, downloaded registry SHA-512, clean exact-version consumer and browser verification
- [x] Registry tag read-back and primary-source diagnosis: npm retains required latest on first publication; next/latest both point to rc.2, deletion returned HTTP 400, and consumers pin the exact prerelease. No tag-removal success is claimed.
- [ ] Hosted validation of this unpushed diff

Actual prepublication evidence and exact tarball/SHA-512: [rc.2 verification](rc2-verification.md).

## Boundaries

The owner authorized publication after all mandatory checks succeed; npm authentication and any 2FA challenge still require the owner's account. No GitHub push/merge/tag/release, Pages or DGI work. P09 stays gated until actual distributed bytes equal the tested SRI and pass the independent consumer checks. MIT/name/private flag decisions are approved; no duplicate approval is required for those decisions.

Suggested commit: chore(release): prepare scoped MIT CLU 0.1.0-rc.2.

Publication and registry consumer details: [release evidence](rc2-publication.md).
