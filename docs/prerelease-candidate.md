# Provisional CLU prerelease for review

The candidate is prepared only in CLU. DGI is untouched. No registry publication, package upload/distribution, remote tag/release, push or merge is authorized.

## Proposed decisions and precise blockers

| Field | Local candidate | Proposal for a later owner-approved release |
| --- | --- | --- |
| Name | react-clu-component-lib | Retain this technical identity unless the owner chooses @shaobangzhu/clu-ui; a rename requires another candidate |
| Version | 0.1.0-rc.1 | Exact prerelease; never replace distributed bytes at this version |
| License | UNLICENSED | Safety placeholder, grants no license; owner must approve retaining this restriction or supply an actual license and rights |
| private | true | Change to false only after owner approval; changed bytes require another verified candidate |
| Registry | No distribution performed | https://registry.npmjs.org |
| Channel / access | Not published | next / public, subject to owner approval and verified npm rights |

On 2026-11-09, public npm queries for both react-clu-component-lib and @shaobangzhu/clu-ui returned E404; npm whoami returned ENEEDAUTH. These observations neither reserve a name nor establish scope ownership or publishing rights. No namespace ownership, license grant or publication URL is invented. Repository docs and PR #8 discussion did not contain an additional owner identity/license decision. GitHub releases and tags lists were empty when checked.

The current candidate is therefore **provisional and deliberately publication-blocked**. Its metadata is concrete and reviewable, but it is not a final publishable package. The existing package:verify private=true assertion remains intact. Public components/APIs, coverage floors, a11y rules, golden screenshots and audit policies remain unchanged.

## Account and credential placement

Local build/pack/verification requires no npm account. Before public npm publication, the owner needs an npm account with verified publishing rights and should enable 2FA. A GitHub username does not establish an npm account or ownership of the similarly named npm scope. The npm username is non-secret and may be recorded in a normal variable if needed; it does not authenticate a publish.

For later GitHub-hosted automation, prefer [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/): bind the npm package to the exact GitHub owner/repository/workflow and a protected release environment, with id-token:write only on the publishing job. No NPM_TOKEN secret is needed for OIDC. This currently requires npm CLI >=11.5.1 and Node >=22.14.0; a separately approved, pinned publish CLI would be needed alongside this repository's unchanged npm 10.9.0 test toolchain. Account/package bootstrap and trust configuration remain owner actions; none is performed here.

If token authentication is necessary, put a narrowly scoped, expiring granular NPM_TOKEN in the protected publishing environment's **Secret**, not in a repository/environment variable. A repository secret is a less isolated fallback. Keep passwords and 2FA recovery codes in a personal password manager, never in this repository, GitHub variables or chat. Local npm login is an owner-terminal action; do not commit its user-level authentication configuration. See [GitHub environment secrets](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets). No credential or publishing workflow is added by this preparation.

## Immutable local artifact procedure

1. Finalize the provisional package metadata and README, then run clean npm ci and npm run quality:all. package:verify is part of that command and inspects a real npm pack archive in a fresh external consumer.
2. Preserve the exact archive from that successful report. Do not repack it to add evidence, change license/private/name or regenerate a nicer filename.
3. Run the installed archive's browser verification in the pinned Linux environment using the report and the independent consumer lockfile. Root tooling is separate from the application and does not alias library source into it.
4. Inspect synthetic desktop/390px light/dark screenshots. Finalize unpacked review/evidence documents.
5. Run `npm run candidate:retain -- /ABSOLUTE/PACKAGE-VERIFY/report.json /ABSOLUTE/BROWSER-EVIDENCE`. The retention utility compares actual SHA-512 with npm's reported integrity and the successful browser receipt, checks archive members/metadata, copies those same bytes once into ignored artifacts/prerelease, marks the tarball read-only, and saves its manifest, browser evidence and full source-preparation provenance. It refuses an existing candidate directory. Read-only permissions are an accidental-overwrite guard, not WORM storage; the digest is the identity.

The retained location, SRI, file hashes, sizes, source commit, tracked preparation patch and untracked preparation snapshot are in candidate.json and sibling files. The generated external consumer manifest/lock and synthetic fixture are retained under consumer/, without node_modules/dist or a second authoritative tarball; their lock hash must match the browser receipt. Scratch tarball copies used by npm ci are verification copies with the same digest, not additional approved releases. The retained file is outside the tracked source tree and is not committed or uploaded. Back it up only after explicit distribution approval if durable off-machine storage is desired; ignored local files are not a public distribution channel.

The source commit plus the saved release-preparation diff/snapshot identifies the tested local state. Later documentation that describes the digest does not rewrite archive bytes. A rebuild/repack, including any metadata change, must be treated as a new candidate, reverified and explicitly approved by digest. Do not silently overwrite this tarball.

The browser and retention commands, after the full quality run produces its report, are:

```sh
# The evidence directory must be new; Docker must be running.
node scripts/check-candidate-browser.mjs /ABSOLUTE/PACKAGE-VERIFY/report.json /ABSOLUTE/NEW-BROWSER-EVIDENCE
# Inspect all eight PNGs before retention.
npm run candidate:retain -- /ABSOLUTE/PACKAGE-VERIFY/report.json /ABSOLUTE/NEW-BROWSER-EVIDENCE
```

CLU_GIT may select a working Git executable when the user's PATH resolves an incompatible binary. Ordinary retention refuses any existing directory. Only if an earlier interrupted attempt left exactly the tarball and no evidence, `--resume-incomplete` can complete evidence after verifying the existing bytes; it never replaces the tarball. A directory with completed/partial evidence is rejected rather than overwritten.

To recheck the frozen archive without rebuilding/repacking it, with Node 22.23.4/npm 10.9.0:

```sh
clu_candidate_dir=/Users/luchaora/Documents/Projects/react-clu-component-lib/artifacts/prerelease/react-clu-component-lib-0.1.0-rc.1-7e401afd3d44
clu_consumer_dir=$(mktemp -d)
cp "$clu_candidate_dir"/consumer/* "$clu_consumer_dir"/
cp "$clu_candidate_dir"/react-clu-component-lib-0.1.0-rc.1.tgz "$clu_consumer_dir"/clu.tgz
cd "$clu_consumer_dir"
npm ci --strict-peer-deps --no-fund --no-audit
npm run typecheck
npm run build
node verify.mjs
```

Compare the tarball SRI with candidate.json before rechecking. The production build above is the independent application build; it does not rebuild CLU or alter the retained archive. These are local review commands, not distribution approval. Root package:verify intentionally rebuilds/packs and would create another candidate instead of verifying only frozen bytes.

## Exact proposed publication sequence — not executed

The current private/UNLICENSED candidate cannot be approved as though it were already public and licensed. First the owner must decide name, license/rights, registry, public access, next channel and the private-flag change. Npm authentication and actual publish rights must be checked with the intended account. No login or permission change is performed here.

After those decisions, prepare a **new** candidate with approved metadata and any required license file. Intentionally review the release metadata/archive policy change; do not disable the package gate to publish. Repeat all quality, exact-archive/consumer/browser checks and retain the new bytes. Obtain explicit approval for that new candidate's absolute path, name/version, full SHA-512 SRI, registry, tag and access. This preparation task is not that approval.

Only after that later explicit approval, use the frozen tarball rather than publishing/rebuilding the source directory:

```sh
# Verify account and rights again; do not infer npm identity from GitHub identity.
npm whoami --registry=https://registry.npmjs.org
npm access list packages --registry=https://registry.npmjs.org
# Check the selected exact version has not been distributed in the meantime.
npm view APPROVED_NAME@APPROVED_VERSION dist.integrity --registry=https://registry.npmjs.org
# Recompute the approved file's sha512-BASE64 SRI and compare with the approved manifest.
# E404 above is expected for a first release; network/auth failures are not availability proof.
npm publish /ABSOLUTE/APPROVED/EXACT-TESTED.tgz --ignore-scripts \
  --registry=https://registry.npmjs.org --tag next --access public
```

The placeholders intentionally refer to the newly approved publishable candidate, not this provisional private tarball. A first-package publish may require additional registry/account/2FA steps owned by the maintainer. Do not publish `.`; do not automatically create Git tags/releases or push/merge in response to npm approval.

After publication:

```sh
npm view APPROVED_NAME@APPROVED_VERSION name version license dist.integrity dist.tarball --json --registry=https://registry.npmjs.org
npm view APPROVED_NAME dist-tags --json --registry=https://registry.npmjs.org
npm pack APPROVED_NAME@APPROVED_VERSION --ignore-scripts --pack-destination /NEW/EXTERNAL/REGISTRY-CHECK --json --registry=https://registry.npmjs.org
```

Compute npm-compatible SHA-512 SRI from the **downloaded registry tarball bytes** and require equality with both registry dist.integrity and the explicitly approved local tarball SRI. Confirm metadata and file manifest, next points to the exact version and latest was not unintentionally changed. Repeat independent locked consumer checks against registry bytes. If any digest/metadata differs, stop: P09 remains blocked. Only approved immutable distribution plus registry-artifact integrity verification satisfies the P09 prerequisite. No successful publish command alone establishes that gate.

See [actual verification and blockers](prerelease-verification.md).
