# chore(release): prepare scoped MIT CLU 0.1.0-rc.2

Historical PR #10 draft: the preparation was merged, and [master CI](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42780185648) passed at b193cf0. The checklist and boundaries below include subsequent status updates; current publication/source correspondence is recorded in the [synchronization audit](npm-github-sync.md).

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
- [x] Subsequent hosted validation: PR #10 merged and master CI passed at b193cf0

Actual prepublication evidence and exact tarball/SHA-512: [rc.2 verification](rc2-verification.md).

## Boundaries

The original publication used owner authentication/2FA and did not perform GitHub tag/Release, Pages or DGI work. The preparation subsequently merged in PR #10. Actual distributed bytes match the tested SRI and independent consumer checks passed, satisfying the P09 artifact prerequisite. DGI migration and v1 readiness remain separate work; MIT/name/private flag decisions remain approved.

Suggested commit: chore(release): prepare scoped MIT CLU 0.1.0-rc.2.

Publication and registry consumer details: [release evidence](rc2-publication.md).
