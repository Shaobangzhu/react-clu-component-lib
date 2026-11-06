# build(package): verify CLU ESM, declarations, CSS and independent consumption

## Summary

Make CLU's distribution reproducible and verify the actual tarball in a fresh React 19 application outside the repository.

- Tighten ESM/types/CSS archive contents, add a fresh prepack build and verify dry-run/actual tar members, export paths, integrity and the no-source-map policy.
- Emit a reachable NodeNext-compatible declaration graph with explicit .js paths; guard against bundled React or other development runtime code.
- Add a locked external consumer that checks all public APIs/types, refs, Bundler/NodeNext compilation, Vite/SSR and a single shared React installation without Tailwind or source aliases.
- Fix a rendered consumer CSS defect: generic unlayered host rules previously overrode layered CLU components. Scoped component styles now remain unlayered while unrelated host controls retain their styling.
- Document exact local install commands and the separate immutable-distribution approval gate.

## Verification

- [x] Two clean npm ci + complete quality:check runs on Node 22.23.4/npm 10.9.0
- [x] Lint, strict types, 83 tests across 21 files, library/CSS and static Storybook builds in both rounds
- [x] Dry-run and real pack/archive/export/integrity checks; 24-file archives with identical SHA-512 in both rounds
- [x] Two fresh locked external installs: Bundler/NodeNext public types/refs, Vite production build and native ESM/SSR
- [x] No bundled dependency runtime; one installed React and shared app/library resolution
- [x] Both external apps reviewed in Chromium at desktop and 390px: 12 host-style checks, native refs and Button/Input/SegmentedControl/Table/Pagination/Dialog interactions
- [x] Native Dialog Tab/Shift+Tab, Escape, return focus and preserved draft verified from the installed package

See docs/p07-verification.md for exact measurements, archive members, logs and screenshots. Existing Storybook chunk-size warnings remain visible. Browser steps were executed separately; the CLI does not claim browser success from a build.

## Release boundary

Package name/version remain react-clu-component-lib@0.1.0 with private=true. Registry/scope rights, final identity/license and publication require separate owner approval. Temporary local tarballs are verification evidence; DGI integration still requires an approved versioned immutable installable artifact.

No DGI changes, dependency version/root-lockfile changes, publication, GitHub release or CI secret changes. Firefox/Safari, actual ArcGIS/Calcite and DGI integration were not tested.
