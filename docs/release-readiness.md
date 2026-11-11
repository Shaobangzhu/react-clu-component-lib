# Release readiness — P11

Evidence collection began 2026-11-10; local verification completed 2026-11-11 (America/Los_Angeles). Base CLU master: **5328c8db5ff9394169c842ec43b63b40d24c11ce**. This is documentation/readiness work, not stable-release authorization.

## Identity and source of truth

- Canonical compiled distribution: [npm @shaobangzhu/clu-ui@0.1.0-rc.2](https://www.npmjs.com/package/@shaobangzhu/clu-ui/v/0.1.0-rc.2), MIT. npm latest and next both point to rc.2; neither tag establishes stable v1.
- [GitHub v0.1.0-rc.2](https://github.com/Shaobangzhu/react-clu-component-lib/releases/tag/v0.1.0-rc.2) is a prerelease at c8a19783325cbd963a4ff92cb5c7dd8eef46a27c, not current master. GitHub source archives are not precompiled npm packages; GitHub Packages is a separate, unused distribution registry here.
- Frozen npm archive: 16,944 bytes / 25 members. Recorded digest:

```text
sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==
```

The [source audit](npm-github-sync.md) reproduced the entire npm archive from c8a1978 and b193cf0. Later homepage/README documentation differs; no newly packed master/P11 archive may replace rc.2. npm exposes no gitHead/provenance attestation for rc.2. Byte-reproducible source correspondence is not proof of the original producer's commit. Trusted Publishing/provenance is a possible future improvement, not a configured capability claimed here.

## Checklist

| Item | Status / consequence |
| --- | --- |
| P01–P08 implementation | Done; 19 runtime/27 type exports and package boundary inspected |
| Exact CLU master CI | Done; [run 42867225771](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42867225771), all nine jobs success at base SHA above |
| P09/P10 consumer merge + main/PR-head gates | Done; [independently verified inventory](consumer-integration.md), not universal adoption |
| P11 local command ledger | Done; complete pinned quality pipeline and documentation checks recorded below |
| P11 hosted PR-head Quality gate | BLOCKED: branch not pushed/PR not created; not inferred from base master or local tests |
| Owner review / stable release authorization | BLOCKED: 1.0.0 not approved/published; no new version authorized |
| Security advisory follow-up | Open, nonblocking under current npm audit thresholds: report full tree, no “zero vulnerabilities” blanket claim; reconcile earlier GitHub high/critical notification separately |
| Required branch protection | Open: authenticated API currently reports protected=false and rulesets=[]; workflow gate exists but is not enforced by a protection rule |
| Accessibility | Automated axe, contrast, focus and Chromium checks only; manual screen-reader, zoom, forced-color/custom palette and broader browser review remain open |
| Consumer exceptions | Deliberate, documented; no requirement to force incompatible controls into CLU |
| Formal consumer review / live ArcGIS claim | No submitted reviews recorded for P09/P10; contradictory P09 live-review checkbox is not proof. Owner review and live verification remain separate from green synthetic CI |
| DGI public report deployment | Failed separately; not a consumer CI failure and not a verified new public report |
| Storybook deployment | Future/optional: local and static build only, no verified public URL |

An owner/admin should configure GitHub Actions **Quality gate** as a required master status with review/up-to-date/conversation rules as appropriate. This PR does not enable settings or bypass them. See [CI operations](ci-quality.md). Stable readiness remains blocked until outstanding release decisions and review gates are resolved; optional public Storybook hosting is not silently made a mandatory product requirement.

## Current command ledger

Executed on Node **22.23.4** / npm **10.9.0** in a clean temporary projection of the base plus P11 Markdown. The first attempt to copy all documentation stalled while reading cloud-backed historical assets; it was stopped before any quality command started. The projection was restored from Git and only changed text was copied. No test failure, rule, assertion or baseline was bypassed.

The verification projection matches **135 code/config files** against the base, SHA-256 inventory fingerprint `09d5996546318c74ff2caab966abb008c3fef504da35c2b5a0ec82ba38968f61`. The complete `quality:all` output reaches its final successful failure-propagation probe; preceding stages are chained with `&&`. Results below are from this execution and independently read reports, not copied historical counts.

| Command / stage | Measured result |
| --- | --- |
| npm ci | PASS; clean pinned install; dependency graph unchanged |
| npm run quality:all | PASS; includes quality:check, Docker browser suites, security and failure probe |
| npm run quality:check | PASS as the first quality:all stage: lint, strict types, unit coverage, library and Storybook builds, package verification |
| npm run test:coverage | 83 tests / 21 files PASS; statements 93.57%, branches 88.96%, functions 92.64%, lines 96.36% |
| npm run build / build-storybook | PASS; ESM, opt-in CSS, 20 public declarations and static Storybook |
| npm run package:verify | PASS; 25-file archive, outside locked consumer Bundler/NodeNext types, native ESM/SSR, production build, export boundaries and one React |
| npm run browser:stories | 166 tests / 24 files PASS in pinned Linux Chromium, including blocking axe |
| npm run browser:visual | Six tests PASS, desktop/mobile light/dark; 12 existing zero-diff goldens, zero retries and no updates |
| npm run security:check | PASS existing policy: production 0; full development graph 13 moderate, 0 high/critical; both audit exit codes 0 |
| npm run quality:probe | PASS; intentional exit 1 and custom exit 23 preserved through tee; failure/skipped/cancelled/missing aggregates rejected |
| Docs links / Markdown structure / git diff --check | PASS: local destinations, balanced fences and credential-pattern scan; no Markdown lint executable is installed, so no Markdown-linter pass is claimed |
| Synthetic privacy review | New prose/examples reviewed; Quality and synthetic form fixtures inspected; representative desktop/mobile state/dialog baselines visually sampled; no new images or raw logs committed |

The current base hosted [Unit and coverage job](https://github.com/Shaobangzhu/react-clu-component-lib/actions/runs/42867225771/job/130008695427) independently reports the same 83/21 and coverage percentages. All nine base jobs were read through GitHub API. Neither that run nor local results establish a hosted pass for this unpushed P11 branch.

Fresh registry bytes again matched npm and DGI's lockfile SRI. The **local-only P11 pack** is 17,504 bytes with SRI `sha512-frMfOhtBmyysUChMEKY0uzCax52m/g0GKtqINToUM4wzpPaBaFv6tQ9A2WT/hcgKdVSusewlsh9+TPTxpmnCRw==`. Exactly README.md and package.json differ from the immutable registry archive; the latter adds homepage only. All 22 dist files and LICENSE remain byte-identical (23 identical archive members). The final README correction was additionally checked by a fresh successful package:verify. This local pack is not a distributed rc.2 asset and must never be substituted for it.

### Full development advisory findings

The 13 moderate affected package entries are `@eslint/config-array`, `@eslint/js`, `@joshwooding/vite-plugin-react-docgen-typescript`, `@storybook/react-vite`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `@typescript-eslint/type-utils`, `@typescript-eslint/typescript-estree`, `@typescript-eslint/utils`, `eslint`, `glob`, `minimatch` and `typescript-eslint`. These are affected dependency entries, not 13 independent root advisories. The audit identifies [glob cancellation traversal](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [minimatch globparts amplification](https://github.com/advisories/GHSA-g3hv-75wg-m249); other entries inherit through the tool dependency chains. No audit fix, dependency upgrade or exception suppression was applied.

Prior GitHub push notifications advertised a different high/critical alert summary while the authenticated Dependabot view reported inactive alerts. That discrepancy has not been independently reconciled by P11; a successful npm audit policy is not proof those GitHub notifications are resolved. Owner security/dependency-graph review remains open.


## Release and privacy boundaries

Preserve version 0.1.0-rc.2, publishConfig, release-contract.json, dependency graph, MIT attribution, export map and CSS sideEffects. New rc.3/stable artifacts require explicit approval, new version metadata, clean quality checks, exact outside-consumer verification and separately authorized publication. Never npm-publish rc.2 again, mutate dist-tags/tag/Release or bless screenshot diffs here.

No new screenshots, DGI application records, destinations/coordinates, secrets, provider calls or customer/system logs are committed by P11. Existing CLU/DGI tests use synthetic fixtures; their evidence is not proof of live service availability. The documentation privacy check reviews new prose/examples and scans synthetic fixtures; it does not certify all future fixture contributions.

## Storybook showcase / hosting proposal

Run `npm ci`, `npm run storybook`, then browse Foundations → Display → Forms → Data → Overlays → Quality. The existing light/dark toolbar is local to each host; deterministic fixtures remain unchanged. `npm run build-storybook` creates storybook-static for local serving. No navigation code/golden change is needed for this documentation pass.

If hosting is later approved: use a separately reviewed, default-off, trusted-master workflow gated on successful Quality gate; least privilege; no PR secrets; upload only the static Storybook directory after privacy review. Configure Pages/environment approval as an owner action, deploy, and verify the real URL before advertising it. No accounts, tokens, workflow or settings are created by this proposal.
