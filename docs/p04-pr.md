# feat(forms): build typed and accessible CLU form controls

Historical phase snapshot. P11 correction (2026-11-10, America/Los_Angeles): package imports in current consumer code use `@shaobangzhu/clu-ui` and its `/styles.css` export. Earlier technical names, private/license/publication and future-phase statements below describe that phase only. See [current readiness](release-readiness.md) and [consumer evidence](consumer-integration.md). Original measurements and logs are preserved.

## Summary

- Add Field, Input, Textarea, Select, Checkbox and SegmentedControl with native React 19 props/refs, explicit labels and predictable controlled/uncontrolled contracts.
- Associate stable labels, descriptions, required/error states; use true checkboxes and single-selection native radios with keyboard and disabled-option behavior.
- Preserve native values, constraints and form submission without datetime coercion, timezone conversion or business validation.
- Add state/controlled stories, a synthetic delivery metadata form, scoped token styles and documented native-control tradeoffs.

## Verification

- [x] Clean npm ci on Node 22.23.4/npm 10.9.0
- [x] Lint / strict typecheck / 36 tests across 15 files / library build
- [x] Static Storybook build and built CSS isolation/contrast checks
- [x] Native FormData, submit/reset, controlled state and exact datetime-string tests
- [x] Keyboard, focus, IDs and description/error association checks
- [x] 1280px desktop / 390px mobile light-dark browser review and native form submission
- [x] Packed public ESM/CSS consumer smoke without Tailwind installed

See `docs/form-controls.md` and `docs/p04-verification.md` for API details, actual results, screenshots and review limits. Existing development-tool audit findings and the Storybook preview chunk-size warning remain documented.

## Boundaries

No DGI source changes, domain types, custom datepicker/select popup, migrated DST/payment validation, network calls, stores or publication. Consumers own validation timing, async duplicate-request prevention and timezone interpretation; CLU preserves native form semantics.
