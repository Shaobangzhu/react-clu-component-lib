# feat(data): add semantic table primitives and controlled pagination

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Summary

- Add a composable native Table API with captions/header associations, numeric alignment, compact/comfortable density, row hover, message rows and a named keyboard-scrollable overflow region.
- Add externally controlled Pagination with truthful empty ranges, display-only safe calculations, bounded page windows and accessible current/disabled controls.
- Add synthetic Delivery History/Merchant Summary stories, boundary matrices, keyboard and callback tests, and documented consumer ownership.

## Verification

- [x] Clean npm ci on Node 22.23.4/npm 10.9.0
- [x] Lint / strict typecheck / 69 tests across 18 files / library build
- [x] Static Storybook build and scoped CSS/numeric/contrast checks
- [x] Pagination matrix: 0/1/10/11/large totals, first/middle/last, invalid values, shrinking totals and bounded rendering
- [x] Keyboard focus, native activation, labels, active/disabled controls and no render-time callbacks
- [x] 1280px desktop / 390px mobile, light/dark and responsive table overflow review
- [x] Independent packed-consumer strict TypeScript, Vite build, SSR and compiled CSS without Tailwind

See `docs/data-presentation.md` and `docs/p05-verification.md` for contracts, actual output, screenshots and limitations. Existing development-tool audit findings and Storybook preview chunk-size warning remain documented.

## Review focus and boundaries

Sorting, filtering, row slicing, API pagination, page size, edit-page preservation and total-shrink reconciliation stay in the consuming application. Pagination clamps display only and never changes consumer state or calls onPageChange during rendering.

No DGI modifications, domain types, financial formatting, data-fetching/grid framework, network calls, stores, publication or final accessibility certification.
