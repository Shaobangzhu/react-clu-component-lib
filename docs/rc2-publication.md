# CLU rc.2 publication and registry verification

@shaobangzhu/clu-ui@0.1.0-rc.2 was accepted by npm after owner security-key verification. Registry publication time: 2026-11-10T03:02:46.313Z (2026-11-09 America/Los_Angeles). The exact retained read-only tarball was published with npm 11.21.2 on Node 22.23.4, --ignore-scripts, --tag next and --access public. No rebuild/repack, GitHub push/merge/release/tag or DGI change occurred.

## Actual registry bytes

Public exact-version metadata and tarball are accessible without credentials. Name/version/MIT license and public access were verified. The registry tarball was downloaded to a fresh outside directory and actual SHA-512 matches both dist.integrity and the original frozen candidate:

```text
sha512-hUiMBqXdzu6OUtRZoLN8PqV3ekp2yAz3y5QCtgo4KzYmKYJSWCI+cjuZf0ciyhzcWEpF2I3uhvq+VtigDX7doA==
```

Size: 16,944 bytes. Strict archive: 25 members, including LICENSE and 20 reachable public declarations. Public runtime/type surface remains 19/27; no React runtime, sources/maps, stories/tests, credentials/config or reports are bundled.

- Metadata: https://registry.npmjs.org/@shaobangzhu%2fclu-ui/0.1.0-rc.2
- Registry tarball: https://registry.npmjs.org/@shaobangzhu/clu-ui/-/clu-ui-0.1.0-rc.2.tgz
- Retained source artifact: artifacts/prerelease/shaobangzhu-clu-ui-0.1.0-rc.2-9ce0b0b960cc/shaobangzhu-clu-ui-0.1.0-rc.2.tgz

The initial public packument returned 404 during npm's announced processing delay. Publication was not repeated. Public exact-version metadata subsequently appeared and the byte checks succeeded.

## Independent consumer verification

- Existing-tarball mode passed using the actual downloaded registry archive: strict archive/LICENSE/metadata, clean locked outside install, Bundler/NodeNext skipLibCheck=false, public export/internal rejection, native Node ESM/SSR, Vite production build and one shared React.
- A separate new consumer uses the exact registry dependency @shaobangzhu/clu-ui=0.1.0-rc.2 and resolved public registry URL/SRI, rather than file/source/workspace aliases. Clean strict-peer npm ci, both type modes, production build and ESM/SSR passed with empty npm user/global authentication configs.
- The pinned Linux Docker run independently installed that exact registry lock without credentials and passed strict types/build/SSR and all four 1280x1000 / 390x844 light/dark browser contexts. It checked controls/ref/keyboard/modal/CSS-isolation contracts. All eight registry screenshots are byte-identical to the already inspected local candidate screenshots.
- Registry consumer lock SHA-256: fe505d1f528a3e69d29e75105c663adb937251f1646ff2641434fc8adb80841f. Actual Chromium 156.0.8078.80, Playwright 1.64.1, pinned Linux amd64 image; no baselines changed.

These supplement the successful full prepublication quality:all (83 unit tests, 166 Storybook/a11y tests, 6 Chromium tests/12 zero-diff goldens, unchanged coverage/security policies). They do not establish actual ArcGIS/DGI integration, WCAG certification or full v1 readiness.

Install the immutable prerelease explicitly:

```sh
npm install --save-exact @shaobangzhu/clu-ui@0.1.0-rc.2
```

React 19 is a peer; import @shaobangzhu/clu-ui/styles.css once and use an explicit data-clu-theme host. No consumer Tailwind installation/source scan is needed.

## Registry tag diagnosis and operations

The public registry exposes both next and latest pointing to rc.2 despite the explicit --tag next publication command. Follow-up investigation established that this is consistent with npm's first-publication behavior and its required latest tag, rather than an unfinished package publication. The [official registry API package model](https://github.com/npm/registry/blob/main/docs/REGISTRY-API.md#package) specifies that dist-tags includes latest. The [npm CLI issue #8490](https://github.com/npm/cli/issues/8490) records the same first-publication extra tag and HTTP 400 on removal; an npm contributor confirms that a first publish with another tag also receives latest. This does not mean the prerelease has become a stable version.

The earlier attempt also encountered a separate client callback defect: the installed npm CLI passed DELETE into its GET authentication done-check, causing a callback 404. An adapter using the same official libraries corrected polling and preserved owner security-key 2FA. The actual authenticated latest deletion then returned HTTP 400. These failures remain recorded; no tag was deleted and no version/tarball was changed or republished. A further read-only check confirmed the same tags and original integrity. No further deletion or authentication attempt is planned for this required tag.

Do not describe this release as next-only or stable. Consumers must pin @shaobangzhu/clu-ui@0.1.0-rc.2 explicitly; the immutable registry version and its bytes/consumer checks are verified. Do not publish a placeholder or an unapproved stable version merely to move latest, and do not redirect latest to the registry's 0.0.0-stage placeholder. A future real, verified and owner-approved stable release can become the latest target through the normal release process. Until then, retain the actual registry tags and identify rc.2 as a prerelease. No support message, new release, security-setting change or additional mutation was performed during the follow-up diagnosis.

The immutable candidate.json is the prepublication snapshot and is not rewritten. Current release status is separate in the retained directory's publication-status.json. Its publication/ subdirectory contains registry integrity/version receipts, clean consumer logs, exact registry consumer manifest/lock/fixture and browser evidence. All remain ignored local evidence. Post-publication documentation does not change the published tarball or its recorded build provenance.

No GitHub push/merge, hosted run of this diff, branch-protection setting, Pages deployment or Trusted Publishing configuration was performed. This was authenticated local CLI publication with owner 2FA. GitHub-linked account identity is not an OIDC release workflow. DGI migration remains a separate task.
