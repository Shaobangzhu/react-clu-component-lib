# P07 verification — 2026-11-05 (America/Los_Angeles)

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Baseline

A clean existing build/clu-package-contract branch matched latest fetched origin/master at `a90c433b79b894d795de3d8586ea7c6629a677c9` (P06 merge PR #6). No user changes were reset. No DGI access or change was needed for P07. No commit, push, PR creation, release, registry authentication or publication was performed.

Toolchain: Node 22.23.4 / npm 10.9.0. Existing exact versions remained React/ReactDOM 19.3.1, Vite 8.3.6, TypeScript 5.9.3, React types 19.3.0, Vitest 4.1.12 and Storybook 10.6.5. The root dependency lockfile is unchanged; SHA-256 `b2e4cb57169f39ff8d2c2a361e1938f006dd1347a0666c19cf0a443d47d4cc27`. The consumer has its own checked-in exact tooling/peer lock template; only the copied external lock receives the measured CLU tarball version/integrity.

## Two final clean rounds

Each final round began with npm ci, then ran the entire quality:check including package:verify. Each created a different OS temporary consumer outside the repository, installed from its copied lockfile using npm ci and tested its installed tarball. No source aliases, paths mappings, workspace links, Tailwind install or dependency peer bypass was used. Root install reported 346 packages; external install reported 24 packages. Reruns during development followed concrete fixes; no flaky-test retries or weakened assertions were used.

| Round | Vitest start (local) | Vitest duration | Tests / files passed | Lint/types | Library/Storybook | Pack/consumer types/build/SSR | Rendered browser |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 21:10:22 | 3.30s (transform 818ms, setup 2.26s, import 2.94s, tests 5.63s, environment 13.01s) | 83 / 21 | PASS | PASS | PASS | PASS |
| 2 | 21:11:02 | 3.00s (transform 926ms, setup 2.39s, import 2.62s, tests 5.44s, environment 11.17s) | 83 / 21 | PASS | PASS | PASS | PASS |

The 82 pre-existing tests remain included. One new negative real-build test removes React externalization and confirms the library guard rejects bundled dependency runtime. Type-only and package/SSR assertions are separate from the Vitest count. Existing CSS isolation and 54 named token contrast pairs remain green.

Both archives had identical bytes/SHA-512:

```text
name: react-clu-component-lib
version: 0.1.0 (private, unpublished development snapshot)
filename: react-clu-component-lib-0.1.0.tgz
files: 24 (20 reachable declarations, ESM JS, CSS, package.json, README)
compressed bytes: 15160
unpacked bytes: 54880
integrity: sha512-7qOX38YfZZ4bM2dnoNHfAFBzSGFEDxtCrwt8ak1ZJ2NL+Wry1J5p2Ffv/SExCsc/71xrB/NHToWSRgGhZi/AXg==
sha1: cc8e517f531725aa249c05c19c5da214d43d8e04
```

The exact members, external runtime imports, integrity, output names and actual external paths are preserved in [round 1 package report](evidence/p07/round1-package-report.json) and [round 2 package report](evidence/p07/round2-package-report.json). Their browserReview field describes what the CLI does not execute; the browser work below was performed separately after each successful CLI round.

Dry-run JSON, actual npm pack JSON and tar members matched the strict allowlist. The actual gzip archive's SHA-512 matched npm integrity. No links, path escapes, maps, sources, stories, tests, fixture, docs/private notes, lockfiles or credentials matched the archive policy. High-signal credential scanning is not a complete security audit. All archived declarations resolve their relative .js type paths; the internal paginationMath declaration was pruned. Runtime exports are the exact 19 public APIs; all 27 intentional type exports compiled in Bundler and NodeNext with skipLibCheck=false. Expected rejected internal/deep imports were tested in TypeScript and native Node.

React/ReactDOM were externalized. A build-time module-graph guard rejects bundled node_modules JS/TS runtime in library mode; it intentionally does not restrict the separate Storybook application. Installed consumer app/CLU resolve the same React path, one React installation was found, and only CLU/React/ReactDOM were production roots. The Node ESM/SSR probe rendered Button/Input/Table/Pagination/Dialog without invoking callbacks or exposing an open SSR dialog. The consumer uses ReactDOM only as its renderer.

## Rendered browser evidence, both rounds

The in-app Chromium browser served each actual external consumer/dist on its own local static server. At 1280×1000 and 390×844, Run browser checks returned:

```text
PASS: compiled CSS, 12 host selector checks, numeric alignment and 5 native refs
```

The twelve cases are generic button/input, .card/.table and simulated .esri-widget/.calcite-button presentation, repeated outside and inside the theme host. Host CSS loads before the single CLU CSS import. Native host control color/padding/border/box sizing remain intact while CLU button styling and numeric table alignment visibly render. These are simulated integration selectors, not a real ArcGIS/Calcite product test.

In each newly installed app, Count changed 0 -> 1; Synthetic note accepted the round-specific string; SegmentedControl changed Summary -> Detail; Next changed page 1 -> 2, truthful range 11–11 of 11 and disabled Next. Table caption/row values remained visible. Five native refs (button/input/fieldset/table/dialog) resolved to DOM nodes. Mobile document width equaled viewport width at 390px.

In both rounds, opening the native packed Dialog produced :modal=true and focused Modal note. Tab from Cancel wrapped to Close dialog; Shift+Tab wrapped back to Cancel. Actual Escape closed the dialog and restored focus to Open packed dialog. Reopening at 390px retained the edited draft and focused it. Cancel closed successfully. Temporary viewport overrides were reset.

- [Round 1 desktop](evidence/p07/round1-consumer-desktop.png), [mobile](evidence/p07/round1-consumer-mobile.png), [mobile dialog](evidence/p07/round1-dialog-mobile.png)
- [Round 2 desktop](evidence/p07/round2-consumer-desktop.png), [mobile](evidence/p07/round2-consumer-mobile.png), [mobile dialog](evidence/p07/round2-dialog-mobile.png)

## Findings fixed and limits

The external rendered fixture caught a genuine interoperability defect: unlayered generic host button CSS overrode CLU's layered component rules even though selectors were scoped. Scoped component rules now ship unlayered, allowing their specificity to apply. Tokens/authoring utility layers remain; no !important, generic global reset or consumer CSS change was added. The same fixture then passed all twelve host cases and the CLU styling checks in both final rounds.

Relative source import/export paths changed only by adding .js extensions so generated declarations work under NodeNext as well as Bundler. No component logic or public names changed. Declaration generation is separate, with unreachable implementation declarations pruned. Ordinary npm pack now rebuilds through prepack, while package:verify builds explicitly before its two ignore-scripts pack inspections.

During development the initial runtime guard also applied to Storybook's own application bundle. It was restricted to library mode; both final static Storybook builds passed with the existing preview chunk-size warning. The machine's default npm cache was unwritable; task commands used npm_config_cache=/private/tmp/clu-npm-cache without changing global permissions. No fresh audit result was reported by these npm ci runs; earlier P05 audit findings are not claimed resolved or re-audited.

Only available Chromium was exercised. Firefox/Safari, screen readers, real ArcGIS/Calcite, DGI integration and clean installs on other operating systems were not run. Browser steps are not automatically executed by the CLI; P08 CI/browser gates remain future work. Local tarballs and hashes are verification artifacts, not an approved public distribution. Registry name/scope/publish rights, license choice and release approval remain unresolved release prerequisites. The P09/P10 immutable-artifact gate remains in force.

## Actual command output

Both root installs:

```text
$ npm ci --no-fund
added 346 packages in 2s
```

Complete quality output is recorded in [round 1](evidence/p07/round1-quality.txt) and [round 2](evidence/p07/round2-quality.txt); terminal escape sequences/workspace path were normalized, with only the long Storybook asset listing explicitly abbreviated. Representative final external output:

```text
External verification directory: /private/var/folders/26/vbwrm8b50g71_5f05z7mjdr00000gn/T/clu-package-Dy5WgI
added 24 packages in 305ms
> clu-external-consumer-smoke@0.0.0 typecheck
> tsc -p tsconfig.json && tsc -p tsconfig.nodenext.json
> clu-external-consumer-smoke@0.0.0 build
> vite build

vite v8.3.6 building client environment for production...
transforming...
✓ 17 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.35 kB │ gzip:  0.26 kB
dist/assets/index-CaAz2wQg.css   14.63 kB │ gzip:  3.18 kB
dist/assets/index-BxG9VIHz.js   232.83 kB │ gzip: 72.95 kB

✓ built in 170ms
PASS public ESM/SSR, CSS export, blocked deep import, 19 APIs and shared React resolution
PASS archive (24 files), Bundler + NodeNext declarations, external production build, SSR, single React install.
Report: /private/var/folders/26/vbwrm8b50g71_5f05z7mjdr00000gn/T/clu-package-Dy5WgI/report.json
Browser: serve /private/var/folders/26/vbwrm8b50g71_5f05z7mjdr00000gn/T/clu-package-Dy5WgI/consumer/dist with a local static server; no browser pass is inferred by this script.
```

## Review material

[Package contract and local install commands](package-contract.md) · [PR description](p07-pr.md).

Changed areas: package metadata/scripts; deterministic Vite runtime guard; NodeNext declaration build/pruning; explicit .js relative source paths; scoped CSS layer interoperability fix; locked external consumer template; archive/consumer runner and intentional API inventory; one negative build test; README/plan/evidence. No dependency version or root lockfile change, CI secrets, DGI files or publication.

Suggested commit: `build(package): verify CLU ESM, declarations, CSS and independent consumption`.
