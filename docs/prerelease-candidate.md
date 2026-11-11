# CLU rc.2 release candidate and publication contract

P11 status correction (2026-11-10, America/Los_Angeles): P09/P10 DGI integration is now independently verified; the tagged GitHub prerelease exists. See [current consumer evidence](consumer-integration.md) and [readiness](release-readiness.md). The operation-specific statements and measurements below remain historical; they do not describe a new npm publication.

Status: @shaobangzhu/clu-ui@0.1.0-rc.2 is publicly published under the owner-approved MIT license. Registry SHA-512 and independent consumers are verified; next and latest both point to rc.2. See [publication evidence](rc2-publication.md) and [source audit](npm-github-sync.md). The owner separately authorized the metadata/docs synchronization branch, PR and merge after passing checks. Git tags/Releases, Pages, DGI changes and another npm publication are outside that synchronization task.

The procedure below preserves the original candidate/publication contract. It is not an instruction to publish rc.2 again. Any future publication requires a new version and separately approved artifact.

## Approved metadata

| Field | Approved value |
| --- | --- |
| Name | @shaobangzhu/clu-ui |
| Version | 0.1.0-rc.2 |
| License | MIT, Copyright (c) 2026 Chaoran Lu, the existing documented maintainer |
| private | false |
| Registry | https://registry.npmjs.org |
| Tag / access | next / public |

scripts/release-contract.json records the approved fields. Package verification and retention compare source/archive metadata against it, require the MIT LICENSE, preserve all 19 runtime/27 type exports and enforce the 25-member archive allowlist. No coverage, a11y, security or visual check is relaxed. Scope ownership is verified through npm authentication/registry acceptance, never inferred from GitHub association or E404 availability lookups.

The previous react-clu-component-lib@0.1.0-rc.1 private/UNLICENSED tarball and its digest remain historical evidence, unchanged. See [historical rc.1 evidence](prerelease-verification.md). Current measurements/status are in [rc.2 evidence](rc2-verification.md).

## Build, verify and retain exactly once

Use Node 22.23.4 / npm 10.9.0. Finalize package.json, LICENSE, README and the lockfile before packing. Run clean npm ci and npm run quality:all; package:verify builds and performs actual dry-run/pack/archive verification in an external locked consumer. Its report identifies the exact tarball. Do not repack it to publish.

```sh
node scripts/check-candidate-browser.mjs /ABSOLUTE/PACKAGE-REPORT/report.json /ABSOLUTE/NEW-BROWSER-EVIDENCE
# Inspect all eight desktop/mobile light/dark PNGs.
CLU_GIT=/usr/bin/git npm run candidate:retain -- /ABSOLUTE/PACKAGE-REPORT/report.json /ABSOLUTE/BROWSER-EVIDENCE
```

The retained ignored directory contains one authoritative read-only tarball, candidate.json with independently calculated npm-compatible SHA-512 SRI and archive file hashes, npm report, source commit/diff/untracked preparation snapshots, browser receipt/screenshots, and the actual external consumer manifest/lock/fixture. Scope names are converted to a safe directory segment. Read-only mode guards accidents; digest equality identifies bytes. Existing completed directories are never overwritten. Explicit incomplete-evidence recovery can complete only a directory containing the exact untouched tarball and no evidence.

A fresh consumer installs only the exact tarball plus React/ReactDOM and build/type development tools; no Tailwind, source aliases, symlinks or workspace copies. Bundler/NodeNext skipLibCheck=false, public exports/internal rejection, SSR, Vite, React deduplication, native refs, control/keyboard/modal and synthetic host CSS checks remain mandatory. These are not actual ArcGIS/DGI product tests or WCAG certification.

## Authentication and conditional publication

An npm account registered/associated with GitHub is separate from local CLI authentication. The owner completes npm login and any browser/2FA challenge privately. Never put passwords/recovery codes/tokens in source, logs, GitHub variables or chat. For this first package, a local authenticated publish can establish the package; later GitHub Trusted Publishing requires an existing package and an explicitly configured workflow/environment. No GitHub workflow/settings/push is performed here.

The test toolchain stays npm 10.9.0. A separate npm 11.21.2 publisher is prepared outside the repo; its engines accept Node 22.23.4. Publication uses only the retained file after mandatory checks, actual identity/scope checks and a final digest comparison. No source-directory publish, prepublish rebuild or automatic tag/release/push occurs. Use public access and next explicitly:

```sh
# Future/authorized operation only after all checks and authentication succeed.
npm publish /ABSOLUTE/VERIFIED/shaobangzhu-clu-ui-0.1.0-rc.2.tgz --ignore-scripts --registry=https://registry.npmjs.org --tag next --access public
```

The publisher must not publish an existing distributed version with different bytes. If the version already exists, compare registry integrity first. An ambiguous publish response requires registry read-back before any retry. Publication receipt/status is separate from the immutable prepublication manifest, so the tarball/provenance are not rewritten after release.

## Post-publication gate

Read back exact name/version/license/maintainers, dist.integrity, dist.tarball and dist-tags. Download the actual registry tarball to a new external directory. Its actual SHA-512 must equal both registry integrity and the retained tarball SRI. Require next to point to rc.2. For an existing package with an approved stable latest target, confirm that target was preserved. For this first publication, npm also assigned its required latest tag to rc.2; the actual read-back and authenticated deletion rejection are documented in [tag diagnosis](rc2-publication.md). Do not assume latest can be absent, repeatedly request 2FA for deletion, invent a stable version or redirect it to a placeholder. The prerelease is consumed through its exact approved version, and registry tag naming does not establish stable/v1 readiness.

Verify downloaded bytes without a library rebuild/repack:

```sh
npm run package:verify:tarball -- /ABSOLUTE/DOWNLOADED/shaobangzhu-clu-ui-0.1.0-rc.2.tgz
node scripts/check-candidate-browser.mjs /ABSOLUTE/REGISTRY-VERIFY/report.json /ABSOLUTE/NEW-REGISTRY-BROWSER-EVIDENCE
```

This repeats the same strict archive/metadata, locked external consumer, public types/ESM/SSR/Vite/React/CSS and browser assertions. Use the matching published-source checkout for existing-archive metadata equality; see [package contract](package-contract.md). The published rc.2 has satisfied the immutable-distribution and actual-byte consumer prerequisites. This does not implement DGI migration, P09 tests or v1 readiness. Prerelease preparation merged in PR #10 and the [audited master CI run](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42780185648) passed. Branch protection, optional Pages and future Trusted Publishing settings remain separate operations.
