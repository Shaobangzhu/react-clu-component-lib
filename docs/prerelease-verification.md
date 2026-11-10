# CLU provisional prerelease verification

Historical private rc.1 record. The owner subsequently approved the scoped MIT rc.2 plan and conditional publication; see [current rc.2 evidence](rc2-verification.md). This historical artifact/digest is unchanged.

Verified locally on 2026-11-09 on `release/clu-prerelease-candidate`, based on freshly fetched merged `origin/master` at `9f08f61102bec757de5107161602d4ac158fe760` (P08 PR #8). The initial worktree was clean. No commit, publication, upload/distribution, remote release/tag, push or merge was performed. DGI was not read or changed.

## Candidate identity and provenance

- Package: `react-clu-component-lib@0.1.0-rc.1`.
- Status: **provisional, private=true, UNLICENSED; publication blocked**. No license grant or npm ownership is inferred.
- Exact retained tarball: `/Users/luchaora/Documents/Projects/react-clu-component-lib/artifacts/prerelease/react-clu-component-lib-0.1.0-rc.1-7e401afd3d44/react-clu-component-lib-0.1.0-rc.1.tgz`.
- Size: **15,832 bytes**, unpacked **57,255 bytes**, **24 archive members**.
- Actual-byte SHA-512 SRI, independently equal to npm pack's reported integrity:

```text
sha512-KdoDvUdVrCwUTy31YggrFaJ+qth6OKGwxQXJGqgXSTx2BVTi/7Tb0E2Tkr3R0DBEpnarhZh/vikH+jypF3Ebdg==
```

The ignored candidate directory contains candidate.json (full per-member size/SHA-256 manifest, SRI and provenance), npm-pack-verification.json, the tracked release-preparation.patch, untracked-preparation/ source snapshots with hashes, browser/ receipts/screenshots and consumer/ with the actual generated manifest/lock/fixture. The tarball is copied from the successful npm pack report, not repacked; its mode is read-only. This is local preservation, not WORM storage or approved distribution.

Archive allowlist: README.md, package.json, dist/index.js, dist/styles.css and 20 reachable public declarations. Actual tar listing and npm dry-run/pack agree. No source, embedded sources/maps, stories, tests, credentials, configuration, fixtures, node_modules, reports or symlinks are shipped. Emitted JS imports only external react and react/jsx-runtime; no React/ReactDOM runtime is embedded. The intentional public surface remains 19 runtime exports and 27 types.

The recorded base commit alone does not contain this preparation. Its exact uncommitted tracked diff and new preparation files are saved next to the tarball. Full local command logs and machine-readable metrics are also under ignored artifacts/prerelease-preparation. The digest above identifies only the final candidate; earlier trial packs are not approved artifacts.

## Executed checks

Toolchain: Node **22.23.4**, npm **10.9.0**; React/ReactDOM **19.3.1**, TypeScript **5.9.3**, Vite **8.3.6**, Vitest **4.1.12**, Tailwind **4.3.4**, Storybook/core/a11y/Vitest addons **10.6.5**, existing React-Vite adapter **10.3.6**, Playwright **1.64.1**. Dependency versions/coverage floors/peer policy were not changed.

| Check | Actual final result |
| --- | --- |
| npm ci --no-fund | Exit 0; clean locked root install, no peer bypass |
| npm run quality:all | Exit 0; every mandatory layer below executed |
| lint and strict type projects | Passed; final preparation-script lint also passed |
| unit/component coverage | **83 tests / 21 files passed**; lines 96.36%, statements 93.57%, functions 92.64%, branches 88.96%; existing floors unchanged |
| ESM/declarations/CSS build | Passed; 18.49 kB JS, 14.04 kB compiled CSS, 20 public declaration files |
| Storybook production build | Passed; existing large-chunk advisory remains non-fatal, without suppression |
| package:verify (included in quality:all) | Passed actual dry-run/pack/archive inspection and fresh outside consumer |
| Storybook Chromium + blocking a11y | **166 tests / 24 files passed**, a11y.test=error, no new waiver/filter/skip |
| Chromium visual/keyboard | **6 tests passed**, all **12 existing goldens** matched at zero-pixel tolerance; no baseline updated, retries zero |
| dependency audit | Passed existing policy: production **0** findings; full tree **13 moderate, 0 high/critical**, all in development tooling |
| disposable failure probe | Expected real failure exit 1 and custom exit 23 survive tee; failure/skipped/cancelled/missing upstream results all reject the aggregate |
| final exact-archive Linux consumer | Passed fresh strict npm ci, Bundler + NodeNext typechecks with skipLibCheck=false, Vite production build, ESM/SSR and all four browser contexts |

The first attempted full check stopped on unbound browser globals in the new Node-side harness; browser callbacks now use their element's ownerDocument. Preliminary compiled-CSS checks also exposed the verifier's incorrect comma splitting of minifier-generated :is(...) and rejection of a theme-host compound focus selector. The corrected checker handles nested selector lists, requires every branch to be scoped and explicitly rejects global/sibling escapes. No library selector, assertion, test, golden, coverage floor or security policy was disabled to obtain a pass.

After correcting stale packed README claims about P08, the final clean install/full pipeline generated a new candidate. Only that final archive was used for the retained result. Subsequent evidence/provenance work did not rebuild/repack it. The final retention utility was linted and exercised against the real archive, consumer lock and successful browser receipt.

The first evidence-retention attempt copied and verified the final read-only tarball, then local /usr/local/bin/git failed to spawn from Node with an incompatible-architecture error. System /usr/bin/git worked. The utility now checks Git provenance before creating a normal candidate directory and reports spawn errors. Its explicit incomplete-evidence recovery verifies that the directory contains only the already retained tarball and that its bytes are identical; it completes evidence without replacing/repacking the archive. Final retention used CLU_GIT=/usr/bin/git with that recovery, recorded in candidate.json.

## Independent consumer and browser evidence

The pack verifier creates a temporary directory outside the repository, installs an exact file tarball with a deterministic lock, rejects source/workspace symlinks and unsupported deep/internal imports, enumerates all 19 runtime/27 type exports and checks Node ESM/SSR. The production dependency graph is only packed CLU, React and ReactDOM, with a single shared React installation. Development tools are Vite/TypeScript/React types; Tailwind is absent. The application imports the public compiled CSS exactly once, with no aliases/source scanning.

The additional Linux run stages only the packed tarball, generated manifest/lock and synthetic app plus separate root browser tooling. It performs another clean strict-peer npm ci, both strict type modes, production build and SSR before Chromium. No host credential/environment files, Git metadata, node_modules, source aliases or Docker socket are mounted. The consumer lock's SHA-256 is `ea06c5b7fb0af84edd04751decc9c2b54caf73db831c7bd4e8b181188bf93c27`; the browser receipt records this and the same tarball SRI.

All **four** contexts passed: **1280×1000** and **390×844**, each with light and dark CLU themes. Each context checks 12 host selector sentinels inside/outside the host, five native refs, numeric alignment, controlled string `0` and empty value, disabled/loading controls and tab exclusion, explicit error/unknown states, Button Enter, native radio arrows, controlled pagination boundary, modal initial focus/Tab/Shift+Tab/Escape/return and preserved draft. No page errors or document horizontal overflow were observed.

Eight synthetic screenshots were inspected: each context has consumer and open-dialog captures under browser/. CLU text, error states, numeric columns, responsive controls and visible dialog focus remained legible/unclipped. Full-page consumer images exceed viewport height; dialog images use the viewport. Host sentinel styling is deliberately owned by the fixture; for example, its dark-text table retains that text on the dark inherited canvas. These sentinels verify absence of overriding generic selectors, not automatic theming/contrast of arbitrary host markup. They are **not a real ArcGIS/Calcite integration test**.

Canonical container: Linux amd64, Noble image digest `sha256:ee15712262f017b8157421b212b12099146645f44b1bc5c0514cbbe6a229b1d0`, checksum-verified Node, exact npm and image-provided fonts. Playwright metadata declares Chromium 156.0.8078.4 / revision 1248, but browser.version() and both actual image binaries report **156.0.8078.80**. This actual runtime is recorded; no browser/image/golden change was made. Automated contrast/axe and Chromium tests do not establish WCAG certification, screen-reader quality or Firefox/WebKit compatibility.

## Hosted evidence and remaining decisions

The merged P08 base has successful [master](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668994812) and [PR](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42668975600) hosted runs. All nine master jobs and artifact-upload steps were confirmed successful read-only. Downloaded hosted artifacts/fork-PR behavior were not reviewed. These base runs do not test the current unpushed preparation diff; no hosted run, branch protection change or Pages deployment is claimed for it.

38 untracked ` 2` copies encountered during preparation were compared byte-for-byte to originals, all identical, and removed under the standing cleanup authorization. No independent edits were discarded; the local duplicate-cleanup receipt lists every file.

Owner decisions still needed: final package identity/npm scope, license and licensing rights, explicit private=false change, registry/channel/access (proposed npm public / next / public) and verified npm authentication/publish rights. No npm account was authenticated; E404 name lookups do not establish reservation or scope ownership. If any metadata changes, create and fully verify a **new** candidate and request approval for its actual digest. The current private candidate cannot be published as-is. P09 remains blocked until a separately approved immutable artifact is distributed and registry bytes match the approved SRI.

See [exact proposed publication/post-publication procedure](prerelease-candidate.md) and [PR draft](prerelease-pr.md). No publication, push or merge approval is inferred from this local preparation.
