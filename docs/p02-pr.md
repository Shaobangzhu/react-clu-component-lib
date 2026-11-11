# feat(design): establish CLU semantic tokens and isolated themes

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Summary

Establish the CLU semantic design-token system for data-dense operational interfaces, with explicitly scoped light/dark themes and a responsive Storybook foundation gallery.

- Define public `--clu-*` tokens for surfaces, text, borders, accent, semantic states, spacing, typography, radii, focus, shadows and motion.
- Keep theme variables on explicit `[data-clu-theme]` hosts, including independent nested themes, higher-contrast preferences, forced colors and reduced motion.
- Ship precompiled, opt-in CSS without global resets, Tailwind Preflight or consumer source scanning.
- Add a local Storybook theme toolbar, fixed Light/Dark and Compare stories, token documentation, and a bare HTML consumer fixture.

## Verification

Final automated checks passed on 2026-11-05 using Node 22.23.4/npm 10.9.0:

- [x] `npm ci` — dependency manifest and lockfile unchanged
- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm test` — 10 tests across 4 files
- [x] `npm run build`
- [x] `npm run build-storybook`
- [x] Built CSS scope/reset checks and 54 named opaque color-pair contrast checks

Browser review completed on 2026-11-04 covered 1280px desktop and 390px mobile in both themes, keyboard focus, local theme switching, nested themes, and bare-consumer style isolation. The implementation remained unchanged during final cleanup.

See `docs/design-tokens.md` for the public contract and `docs/p02-verification.md` for measured ratios, command output, screenshots and review limitations.

## Review notes and boundaries

Preference media rules have static coverage; custom OS palettes, screen readers and full accessibility compliance need further review. The existing 13 moderate development-tool audit findings and Storybook preview chunk-size warning remain documented.

No DGI changes, public component implementation, external font/icon dependency, registry publication or final DGI branding approval.
