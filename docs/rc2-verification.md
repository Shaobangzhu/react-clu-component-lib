# CLU 0.1.0-rc.2 verification and release status

Post-publication update: rc.2 is publicly available and downloaded registry SHA-512 plus independent registry-consumer/browser checks passed. Follow-up diagnosis matched the retained latest tag and deletion HTTP 400 to npm's required-latest/first-publication behavior. Both next and latest point to rc.2; the release remains a prerelease, and consumers pin the exact version. No further deletion/2FA attempt is needed. See [actual publication evidence and primary references](rc2-publication.md). The prepublication record below remains historical evidence.

Local mandatory verification completed on 2026-11-09 on release/clu-0.1.0-rc.2, from freshly fetched merged origin/master bce772dce977e41bfe5a065b1d5e0a76ce14cca7 (PR #9). The initial worktree was clean. The owner approved @shaobangzhu/clu-ui, MIT, 0.1.0-rc.2, private=false and the public/next publication plan, and authorized publication if all mandatory checks pass. No GitHub push/merge/release/tag or DGI change is part of that authorization.

## Immutable candidate

- Name/version: @shaobangzhu/clu-ui@0.1.0-rc.2.
- License: MIT, Copyright (c) 2026 Chaoran Lu (the existing documented maintainer), following owner approval.
- Registry/tag/access: https://registry.npmjs.org / next / public.
- Tarball: `/Users/luchaora/Documents/Projects/react-clu-component-lib/artifacts/prerelease/shaobangzhu-clu-ui-0.1.0-rc.2-9ce0b0b960cc/shaobangzhu-clu-ui-0.1.0-rc.2.tgz`.
- Size: **16,944 bytes**; unpacked **59,432 bytes**; **25 members**, including MIT LICENSE and 20 public declarations.
- Actual-byte SHA-512 SRI, equal to npm 10.9.0 pack and npm 11.21.2 publisher dry-run:

```text
sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==
```

The ignored candidate directory retains the exact tested archive read-only, candidate.json (full archive hashes/sizes, source commit and preparation provenance), npm pack report, tracked preparation patch and new source snapshots, browser receipt/eight inspected PNGs, and the actual external consumer manifest/lock/fixture. It is not a registry release receipt. Metadata/file changes or repacking require another candidate and renewed verification; no source rebuild occurs during publication.

All 22 dist files (JS, CSS and 20 declarations) are byte-identical to rc.1. Public APIs and behavior did not change. The original rc.1 archive remains read-only and its actual SHA-512 still equals its recorded digest. This rc.2 changes package identity/version/license/visibility, documentation and verification tooling; the synthetic host table now paints its own background for dark-theme readability.

## Actual local verification

Toolchain: Node 22.23.4/npm 10.9.0, React/ReactDOM 19.3.1, TypeScript 5.9.3, Vite 8.3.6, Vitest 4.1.12, Tailwind 4.3.4, Storybook/core/a11y/Vitest addons 10.6.5, existing React-Vite adapter 10.3.6, Playwright 1.64.1. No dependency resolution changed. Publishing CLI npm 11.21.2 is installed separately outside the repository; its engines accept this Node version.

| Check | Actual result |
| --- | --- |
| Clean npm ci --no-fund | Exit 0, pinned lockfile, strict peers/engines, no bypass |
| npm run quality:all | Exit 0; all mandatory layers ran |
| ESLint / strict TypeScript projects | Passed, zero lint warnings |
| Unit/component coverage | 83 tests / 21 files passed; lines 96.36%, statements 93.57%, functions 92.64%, branches 88.96%; floors unchanged |
| Library build | Passed: ESM 18.49 kB, CSS 14.04 kB, 20 public declarations |
| Static Storybook build | Passed; existing chunk-size advisory remains visible |
| npm pack dry-run and actual pack | Both agree on strict 25-file allowlist and integrity |
| External consumer via package:verify | Clean locked install, strict Bundler + NodeNext with skipLibCheck=false, Vite production build, native Node ESM/SSR, public/internal import contracts passed |
| package:verify:tarball existing archive mode | Passed a second fresh locked outside consumer using identical bytes; no CLU rebuild/repack |
| Public API/runtime boundary | All 19 runtime/27 type exports, one shared React, only external react/jsx-runtime + react JS imports; no bundled React/ReactDOM |
| Storybook Chromium/a11y | 166 tests / 24 files passed; blocking a11y.test=error, no new waivers/skips/filters |
| Chromium visual/keyboard | 6 tests passed; 12 unchanged reviewed goldens matched with zero-pixel tolerance, retries zero |
| Security | Passed existing policy: production zero findings; full tree 13 moderate development findings, zero high/critical |
| Disposable failure propagation | Expected exit 1 and custom exit 23 preserved; failure/skipped/cancelled/missing upstream results reject aggregate |
| Exact installed tarball browser contract | Four desktop/mobile light/dark contexts passed; eight synthetic screenshots inspected |
| Pinned npm 11.21.2 publisher dry-run | Exit 0; name/version/public/next, 25 members and same exact SRI; authentication warning remains explicit |

The first quality attempt exposed that ESLint scanned the generated frozen rc.1 consumer's TS copies under artifacts/, outside the source type projects. artifacts/ is already ignored/generated evidence; a narrow ESLint global ignore now excludes it alongside dist/coverage. Source/test lint, strict types and all other assertions remain intact. The successful full pipeline ran after this fix. No audit policy, baseline, coverage floor, public API or accessibility rule was weakened.

The archived package.json is required to equal current approved source metadata, and archived LICENSE must equal the approved full MIT file. The package contains only README/package.json/LICENSE plus public dist output: no sources/maps, stories/tests, environment/credentials/config, node_modules or reports. The new existing-archive mode enforces the same checks and is intended for actual registry bytes after publication.

## Rendered consumer evidence and limits

A fresh Linux amd64 container installs only the tarball/React/ReactDOM for the app, plus Vite/TypeScript/React types for development. Separate browser tooling does not alias or inject CLU source. No Tailwind package/config/source scan is required. The public compiled CSS is imported exactly once. No host credentials, Git metadata, real source checkout or Docker socket is mounted.

Contexts: 1280x1000 and 390x844, each in light/dark, DPR 1, en-US/UTC/reduced motion. Each passed 12 generic/synthetic ArcGIS/Calcite host sentinels inside/outside the theme root, five native refs, numeric table alignment, controlled string 0/empty/text, disabled/loading/tab exclusion, explicit error/unknown states, Button Enter, native radio arrows, pagination boundary navigation, modal initial focus/Tab/Shift+Tab/Escape/return and preserved draft. No page errors or horizontal document overflow. All eight consumer/dialog PNGs were inspected for CLU text, states, focus, clipping and responsive layout. Host sentinel layout/styles remain host-owned; these tests do not guarantee arbitrary host markup theming.

Actual Chromium runtime is 156.0.8078.80 in the pinned Noble Linux image (revision directory 1248); Playwright metadata labels it 156.0.8078.4. No image or golden was changed. The consumer lock SHA-256 is cb85e055f6ff1b9e142feca984e450d6de29405a4a47846b49d2f07a07e13b77, bound in the browser receipt to the same tarball SRI. These synthetic checks are not actual ArcGIS/DGI product verification, multi-browser coverage, screen-reader review or WCAG certification.

## Authentication/publication status

The owner reports a registered npm account associated with GitHub. Local npm whoami still returned ENEEDAUTH during preparation; GitHub association is not CLI authentication or proof of scope permissions. A public read of @shaobangzhu/clu-ui returned E404 before publication, which does not establish ownership. Official npm browser login has been started for the owner to complete privately. No password/token/2FA value is requested in chat or stored in repository artifacts.

At this prepublication evidence snapshot, **no registry publication/upload has occurred**. Metadata and conditional publication approval are already granted; the remaining prerequisite is successful npm authentication/scope validation and any owner-only 2FA challenge. Publisher dry-run success is not authentication proof. The immutable candidate manifest records this prepublication state; any actual publish/read-back result will be recorded separately, without modifying the tarball.

After authenticated publication, download the exact registry tarball, compare actual SHA-512 and dist.integrity to this SRI, verify next/public metadata, then run package:verify:tarball and the same browser harness against downloaded bytes. Until that passes, the P09 distribution gate remains open. This local diff has no hosted run because it has not been pushed; no branch-protection, Pages or Trusted Publishing setting is claimed. DGI was not accessed or changed.

See [approved release procedure](prerelease-candidate.md) and [rc.2 PR draft](rc2-pr.md).
