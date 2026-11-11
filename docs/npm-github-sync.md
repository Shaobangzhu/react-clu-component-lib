# npm-to-GitHub release synchronization

P11 status correction (2026-11-10, America/Los_Angeles): P09/P10 DGI integration is now independently verified; the tagged GitHub prerelease exists. See [current consumer evidence](consumer-integration.md) and [readiness](release-readiness.md). The operation-specific statements and measurements below remain historical; they do not describe a new npm publication.

## Verified publication audit — 2026-11-10

The public npm package is [@shaobangzhu/clu-ui@0.1.0-rc.2](https://www.npmjs.com/package/@shaobangzhu/clu-ui/v/0.1.0-rc.2), licensed MIT. Published versions are 0.0.0-stage and 0.1.0-rc.2. Both latest and next point to rc.2, so an unversioned install currently selects the prerelease. Prefer `npm install --save-exact @shaobangzhu/clu-ui@0.1.0-rc.2`. No npm version or tag is changed by this synchronization.

The [registry tarball](https://registry.npmjs.org/@shaobangzhu/clu-ui/-/clu-ui-0.1.0-rc.2.tgz) is 16,944 bytes, unpacked 59,432 bytes, with 25 files: package.json, README, MIT LICENSE, ESM JavaScript, compiled CSS and 20 declaration files. Its independently downloaded SHA-512 matches registry dist.integrity:

```text
sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==
```

Name/version/repository/license/private=false and exports were verified. Registry homepage points to the repository #readme, while the archived package.json has no explicit homepage. The package exports ESM/types at `.` and opt-in `./styles.css`; React ^19.0.0 is the only runtime peer, with no runtime dependencies. No React implementation, sources/maps, stories/tests or credentials/config files are archived. Consumers need no Tailwind installation. The public entry does not import ReactDOM; browser apps supply ReactDOM themselves.

## Source correspondence and limits

Clean Node 22.23.4 / npm 10.9.0 builds and packs from both commits produced a tarball byte-for-byte identical to the registry download:

- Prerelease preparation: c8a19783325cbd963a4ff92cb5c7dd8eef46a27c.
- Audited master: b193cf08429746cc1e4d9de6ff6aa2ceebb5e9aa.

All 25 package files matched. The only source difference between these commits is lockfile field ordering; parsed lockfiles are equal. These are verified reproducible source matches, not an inference from version strings. npm exposes neither gitHead nor provenance attestation for rc.2. Registry signatures are present but do not attest the source commit. The original upload's producer commit therefore remains unproven by registry metadata.

The audit also passed the downloaded-archive external consumer (strict Bundler/NodeNext declarations, ESM/SSR, production Vite build, blocked deep imports and one shared React), plus 83 unit tests in 21 files. The [audited master CI run](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42780185648) passed. These audit results do not attest later commits.

## Intentional post-publication differences

This synchronization retains the published name/version, public flag, MIT license, exports, files, sideEffects, scripts and React peer settings. It adds only the explicit package homepage and updates README among files included in a tarball. Documentation outside the archive records current status and preserves historical evidence. The supported npm lockfile workflow must leave dependency versions and resolutions unchanged.

A newly packed synchronization checkout is expected to differ from npm in package.json and README, and consequently in tarball SHA-512/size. It is a local verification artifact, not the frozen rc.2 release. JS, CSS, all 20 declarations and LICENSE must remain byte-identical to npm. Do not republish this checkout at 0.1.0-rc.2. Any future npm publication needs a new version and separately verified artifact.

## Synchronization validation

Executed locally with Node 22.23.4 / npm 10.9.0:

| Check | Actual result |
| --- | --- |
| npm install --package-lock-only --ignore-scripts --no-audit --no-fund | Passed; complete lockfile unchanged, no dependency upgrades |
| npm ci | Passed |
| npm run lint / npm run typecheck | Passed |
| npm run test:coverage | 83 tests, 21 files passed; statements 93.57%, branches 88.96%, functions 92.64%, lines 96.36% |
| npm run build / npm run build-storybook | Passed |
| npm run package:verify | Passed; 25-member archive, strict outside consumer Bundler/NodeNext types, ESM/SSR, Vite, exports and single React |
| npm run quality:all | Passed in full, including the checks above and pinned Linux Chromium component/a11y and visual suites |
| npm run browser:stories | 166 Storybook interaction/a11y tests in 24 files passed |
| npm run browser:visual | Six Chromium tests passed across desktop/mobile light/dark states; 12 existing screenshot baselines unchanged, retries zero |
| npm run security:check | Passed existing policy: production zero vulnerabilities; full development tree 13 moderate, zero high/critical |
| npm run quality:probe | Passed; intentional failure stayed exit 1 through tee, exit 23 preserved, aggregate rejected failure/skipped/cancelled/missing |
| Local Markdown links / git diff --check | Passed |

Registry version/tags/SRI were read back unchanged. The new local verification tarball is 17,232 bytes with SRI sha512-7OrTqoI7OiPb6wLjfVzZh42kNv9ePmdF1ny42lF/HgTNBfXnaUSWszwW8OtbpMsyHgj042mSfeON+wehuFRsBw==. Comparison verified exactly two changed members (README.md and package.json's added homepage) and 23 identical members, including all 22 public dist files and LICENSE. This local digest must not be substituted for the published SRI above.

The source/component tests and browser checks do not establish actual DGI/ArcGIS integration or WCAG certification. Hosted synchronization checks must independently pass for the PR head before merge; the earlier master run is not a substitute. No npm publication, tag mutation, Git tag/Release or baseline update is performed by this change.

## GitHub release handoff

At audit time the repository had no Git tags or GitHub Releases. Its description was “Building a Component Library from Scratch with React 19 and TypeScript” and homepage setting was empty; this change does not alter repository settings. GitHub Releases and GitHub Packages are separate from the existing public npm publication. There is no release/Trusted Publishing workflow, public Storybook deployment or DGI integration established by this change.

Prompt 3 must explicitly select the tag target. c8a19783325cbd963a4ff92cb5c7dd8eef46a27c is a verified byte-reproducible candidate for v0.1.0-rc.2; the synchronization commit contains later metadata/docs and must not be described as the original published source. Preserve the absent gitHead/provenance finding in release notes. Creating a tag/Release is outside this PR; the npm artifact must not be republished or rebuilt as a replacement release asset.
