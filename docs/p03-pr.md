# feat(components): add accessible CLU display primitives

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Summary

- Add Button, IconButton, Card, Badge, StatusIndicator, StatCard, Alert, Skeleton and EmptyState through the documented public entry, with React 19 props/refs and scoped semantic CSS.
- Preserve native button defaults, loading/disabled safety and accessible names; distinguish zero, unavailable and unobserved values without calculations or provider inference.
- Add per-component Storybook states and RTL tests, a responsive review matrix, and documented accessibility contracts and intentional API omissions.

## Verification

- [x] Clean npm ci on Node 22.23.4/npm 10.9.0
- [x] Lint / strict typecheck / 22 tests across 13 files / library build
- [x] Static Storybook build and scoped CSS/contrast checks
- [x] Packed public ESM/CSS consumer smoke without Tailwind installed
- [x] 1280px desktop and 390px mobile, light/dark matrix and keyboard focus review

See `docs/p03-verification.md` for actual output, screenshots and limits. Existing development-tool audit findings and Storybook chunk-size warning remain documented.

## Boundaries

No DGI modifications, business calculations, provider checks, stores, network calls, new font/icon dependencies, publication or Storybook infrastructure redesign. Static alerts remain silent unless consumers explicitly opt into an announcement.
