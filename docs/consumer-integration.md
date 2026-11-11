# Verified DGI consumption

Audit date: 2026-11-10 (America/Los_Angeles). DGI is read-only for P11. Its audited main is **711e94ef29b78d9156deb10a0bbe5b97ef7bbd02**; no claim is made about later commits or live production deployment.

## PR and exact-commit CI evidence

| Phase | Merged PR / commit | PR head / successful CI |
| --- | --- | --- |
| P09 Dashboard/Settings | [PR #22](https://github.com/Shaobangzhu/delivery-geo-intelligence/pull/22), 123a6fdd93e1f42b374286c29780940074bd6d7a | 913b62d34b661b5654fb151130ab345ed4e7d93c; [Quality gate](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42928241557/job/130221810806) |
| P10 History/Merchants | [PR #23](https://github.com/Shaobangzhu/delivery-geo-intelligence/pull/23), 711e94ef29b78d9156deb10a0bbe5b97ef7bbd02 | fece4aa41000b28f87b2ea85958c9933bfc321e7; [Quality gate](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42959052861/job/130322194992) |
| Current main | 711e94ef29b78d9156deb10a0bbe5b97ef7bbd02 | [Main CI](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42959727037), including [Quality gate](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42959727037/job/130324348086), all 12 jobs success |

Current-main frontend job logs independently report **257 tests / 24 files**; E2E job logs report **25 passed**. These are DGI counts, not CLU tests, and P11 did not rerun DGI locally.

These statuses were fetched independently through GitHub API, not inferred from local migration notes. [DGI's integration record](https://github.com/Shaobangzhu/delivery-geo-intelligence/blob/711e94ef29b78d9156deb10a0bbe5b97ef7bbd02/docs/clu-integration.md) and [P09 record](https://github.com/Shaobangzhu/delivery-geo-intelligence/blob/711e94ef29b78d9156deb10a0bbe5b97ef7bbd02/docs/p09-clu-integration.md) preserve pre-push checkpoints; their old “hosted pending” text is superseded by the exact runs above. CLU P11 does not edit those DGI records.

**Separate failure:** [Quality report release run 42960121340](https://github.com/Shaobangzhu/delivery-geo-intelligence/actions/runs/42960121340) failed in “Deploy only the audited report directory with locked Wrangler.” The application CI/Quality gate succeeded; public Cloudflare report deployment did not. No latest public Allure report freshness is claimed, and this task does not repair or redeploy DGI.

Review and claim limits: GitHub's submitted-review collections for PRs #22/#23 are empty; merge and passing CI are verified, but an independent formal human approval is not recorded by that API. PR #22 also has a checked live ArcGIS/Calcite review item while its own closing text and committed P09 evidence say live compatibility was not verified. P11 treats that contradictory checkbox as unverified, not as proof of a live cold-start test. PR #23's old unchecked PR-head gate is superseded only by the exact successful run linked above.

## Artifact and React/CSS boundary

At this exact main snapshot, `frontend/package.json` pins `@shaobangzhu/clu-ui` to `0.1.0-rc.2`. The root package-lock entry resolves:

```text
https://registry.npmjs.org/@shaobangzhu/clu-ui/-/clu-ui-0.1.0-rc.2.tgz
sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==
```

The lock graph contains one runtime React and ReactDOM entry, both 19.3.0, with no nested runtime React entries. `frontend/src/test/cluPackage.test.ts` checks exact package/CSS contracts; current-main frontend CI passed. Shared runtime installation is supported here by the single-entry lock graph, not inferred from that CSS test. P11 checks the committed graph and CI, not a live deployed node_modules tree.

`frontend/src/main.tsx` imports CLU CSS exactly once. Dashboard, Settings, History and Merchants each have an explicit light-theme root. DGI's scoped `clu-theme.css` supplies consumer overrides. No theme host is added to html/body or ArcGIS; actual live ArcGIS/WebGL/basemap and screen-reader behavior remain outside this evidence.

## Measured adoption and retained controls

| Surface | Actual CLU use | Intentional local behavior |
| --- | --- | --- |
| Dashboard / Ask DGI | Card, Alert, Table; Ask DGI uses Alert/Button | Native aria-pressed filters, charts/map ownership, business calculations, local summary value nodes and noun-aware Pagination |
| Settings | Alert, Badge, Button, Card, Select, Table | Provider wording/stale/unknown evidence, native articles and metric region; no invented provider health |
| History / Merchants | Button, Input, Select, Table | Page preservation, list identity, formatting and merchant delete protection |
| Payments / Sessions | Table/Button; payment forms also Textarea | Three independent ten-row pagers, datetime-local/minute/DST and settlement rules remain DGI-owned |
| Shared DialogFrame | CLU Dialog with DGI focus/dismissal/busy adapter | DGI handles mouse-down policy, scroll lock, row-removal focus fallback and form state |
| Delete confirmations | Button inside adapted Dialog | ConfirmDelete/ConfirmMerchantDelete retain domain-owned blocked/error/409 flows; not CLU ConfirmDialog |
| Other retained controls | No forced universal adoption | Native wrapping checkboxes/labels, annual specialized views, pagination/pageRange, filter groups, StatCard value markup and custom provider status labels |

Both PR file lists were inspected: P09 changes 15 files and P10 changes 21; neither changes Pagination or pageRange. CLU SegmentedControl, StatCard and StatusIndicator are not substitutes for the consumer contracts above. Compatibility enhancements require a separate CLU API PR and new release version.

## Public API example and rollback

This is a synthetic standalone example using real exported APIs, not copied DGI business source:

```tsx
import { Button, Input, Table } from '@shaobangzhu/clu-ui';
import '@shaobangzhu/clu-ui/styles.css';

<section data-clu-theme="light">
  <label>Reference <Input name="reference" /></label>
  <Button type="submit">Save</Button>
  <Table>
    <Table.Caption>Synthetic observations</Table.Caption>
    <Table.Body><Table.Row><Table.HeadCell scope="row">Sample A</Table.HeadCell><Table.Cell>Not observed</Table.Cell></Table.Row></Table.Body>
  </Table>
</section>
```

DGI regression evidence covers native keyboard/focus and busy/error paths, page-eight edit retention, 10-row independent paging, explicit unknown versus zero, datetime serialization/DST and merchant conflict handling. The linked consumer CI is separate from CLU unit/axe/visual tests; P11 does not reproduce live customer activity or sum suite counts across repositories.

Rollback P10 independently by reverting its presentation/adapter/tests while retaining P09's exact dependency and lockfile, then `npm ci` and the full DGI gate. Reverting P09 too requires deliberate application source and dependency rollback. Neither rollback republishes npm or changes stored data, backend schema or ArcGIS controller policy. No rollback was executed here.
