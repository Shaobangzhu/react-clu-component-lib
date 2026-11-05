# chore: bootstrap CLU React 19 component library foundation

## Summary

- Initialize a private standalone React 19 + strict TypeScript + Vite 8 ESM library foundation, declaration output, opt-in CSS placeholder, and Tailwind CSS v4 build infrastructure without consumer Preflight.
- Establish type-aware ESLint, Vitest/RTL interaction tests, and a working React + Vite Storybook with one internal scaffold story. No public component is exported yet.
- Commit the v1 blueprint with its two-repository boundaries and 11-PR sequence; document P01 progress separately from planned components, publication, hosting, and consumer integration.

## Verification

All required checks passed after a clean installation on Node 22.23.4/npm 10.9.0.

- [x] `npm ci` — strict peer/engine checks; lockfile unchanged
- [x] `npm run lint`
- [x] `npm run typecheck` — full strict declaration checking
- [x] `npm test` — 4 tests in 2 files
- [x] `npm run build`
- [x] `npm run build-storybook`
- [x] `npm run quality:check`
- [x] Storybook development-server smoke test on localhost
- [x] `npm pack --dry-run --json` — public assets only; scaffold excluded
- [x] In-memory proof build — JSX runtime external; scoped Tailwind output; public ESM/CSS exports resolve

See [actual output and exact versions](p01-verification.md).

## Compatibility and review notes

- Tested pins include React 19.3.1, Vite 8.3.6, Vitest 4.1.12, Tailwind 4.3.4, Storybook core 10.6.5, and its peer-compatible React/Vite framework 10.3.6. The selected renderer passes full strict declaration checking; the newest renderer did not. The selected Vitest version preserves RTL matcher compatibility.
- npm 10.9.0 and 10.9.10 crashed when resolving a fresh dependency graph. npm 11.17.0 generated the lockfile; clean installation and every required check subsequently passed with npm 10.9.0. The shared minimum remains unchanged.
- The static Storybook build retains its upstream chunk-size warning. The verification record also retains the restricted-shell global-settings warning.
- npm audit reports 13 moderate development-tool findings in transitive glob/minimatch chains; zero high/critical findings and zero production-only findings. These remain a documented tooling limitation.

## Boundaries

No DGI production changes, copied consumer source, business logic, public npm release, public Storybook URL, or claim that the v1 component inventory is complete. React is a peer and external; CSS is explicitly imported. Full consumer validation and hosted browser/a11y/visual quality gates remain later phases.
