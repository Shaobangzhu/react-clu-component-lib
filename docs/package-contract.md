# Package contract (P07)

## Local verification

Use Node 22.23.4 and npm 10.9.0, as recorded by .nvmrc/packageManager. From the repository root:

```sh
npm ci
npm run quality:check
```

quality:check includes lint, strict source/test types, unit tests, the library build, static Storybook and package:verify. To run just the distribution checks:

```sh
npm run package:verify
```

This rebuilds first, then runs npm pack --dry-run and npm pack with JSON output into a new OS temporary directory outside the repository. The script prints the absolute report.json and consumer/dist paths. It preserves successful/failing evidence directories for inspection; remove them when no longer needed. No tarball, dependency installation or consumer build is written into the workspace.

The checked-in examples/consumer-smoke directory is a template, not a workspace dependency. Its lockfile pins React/ReactDOM and dev-only TypeScript, React types and Vite. The script copies it outside the repository, adds only the new tarball dependency and its measured SHA-512 integrity to the copied lockfile, and runs npm ci. No lockfile resolution or source alias is generated in the consumer. The library package has React as its only peer and no runtime dependency; ReactDOM is required by the example's renderer, not imported by CLU.

Consumer TypeScript runs both strict Bundler and NodeNext modes with skipLibCheck=false, including all public type names, native refs and expected rejected internal/deep imports. A production Vite build, native Node ESM/SSR checks and React resolution/tree checks follow. The fixture's TypeScript is deliberately excluded from the repository ESLint project because it resolves only against the external installed tarball; it is checked through these two external compiler runs. The scripts themselves remain linted. The script does not infer browser success from a build.

To inspect the rendered consumer, use the printed consumer/dist directory:

```sh
python3 -m http.server 6017 --bind 127.0.0.1 --directory /ABSOLUTE/PRINTED/consumer/dist
```

Open http://127.0.0.1:6017, activate Run browser checks and expect PASS. It checks 12 rendered host-selector cases both outside and inside the CLU theme host, CLU button/numeric styling and five native refs. The fixture deliberately imports host CSS before the one explicit CLU CSS import: generic buttons/inputs, .card/.table and simulated .esri-widget/.calcite-button rules must retain their host presentation. Simulated names test leakage, not ArcGIS/Calcite product compatibility.

Also activate Count, edit Synthetic note, change View, navigate Next, and open the packed dialog. Verify native Tab/Shift+Tab boundaries, Escape, return focus and preserved input on reopen. Review at desktop and 390px. These browser steps are manual unless a separate browser runner executes them; the report explicitly labels browser review NOT RUN until separate evidence is recorded. P08 may automate further browser/CI gates.

For a direct local install into another scratch React 19 app:

```sh
# In CLU: prepack rebuilds both ESM/CSS and declarations.
npm pack --pack-destination /ABSOLUTE/ARTIFACT/DIRECTORY
# In the external app: use the exact resulting file, not a directory/workspace link.
npm install --save-exact /ABSOLUTE/ARTIFACT/DIRECTORY/shaobangzhu-clu-ui-0.1.0-rc.2.tgz react@19.3.1 react-dom@19.3.1
```

```tsx
import { Button, Input, Table, Pagination, Dialog } from '@shaobangzhu/clu-ui';
import '@shaobangzhu/clu-ui/styles.css'; // once, through the consumer's CSS loader

<div data-clu-theme="light"><Button>Example</Button></div>
```

The package is ESM-only. Native Node ESM can import the JS entry and render on the server. CSS must be loaded explicitly by the browser/bundler; it is not executable JS and is not imported implicitly during SSR. Consumer Vite client types supply CSS-import typing for the smoke app. No Tailwind plugin, source scanning or Preflight is required.

## Distribution surface and guards

- Public root: the 19 intentional components and 27 type names recorded in scripts/public-api.json. Only the documented root and ./styles.css are export-map paths. Internal .d.ts paths exist solely to resolve the public type graph and are not deep-import APIs.
- dist/index.js: one ESM entry, with React/JSX runtime imports external. The build rejects any bundled node_modules JS/TS runtime, including React, ReactDOM, Storybook or Tailwind runtime/plugin code.
- dist/index.d.ts and its reachable declarations: generated separately by TypeScript NodeNext with explicit .js relative specifiers. Private implementation-only declarations are pruned. Existing component behavior and public names are preserved.
- dist/styles.css: explicit self-contained compiled CSS, scoped under data-clu-theme and namespaced CLU classes/tokens. Only that file is marked as a side effect. Scoped component rules are intentionally unlayered: ordinary unlayered host element rules would otherwise outrank every layered CLU component rule regardless of specificity. Token and unused authoring-utility layers remain isolated; no !important or generic reset is added. Consumers can customize through documented tokens and deliberate scoped overrides.
- Source-map policy: no JS/CSS/declaration maps, embedded sources or sourceMappingURL references. JS/CSS and .d.ts files are the distribution; TS/TSX sources, stories, tests, fixture, scripts, docs/private notes, lockfiles, local config and generated reports are not archived. npm includes the intentional README, package.json and MIT LICENSE. The current strict archive has 25 members, including 20 public declarations.
- Pack verification compares the dry-run JSON, actual JSON and tar members against the exact reachable-file allowlist, verifies the real tarball SHA-512, rejects links/path escapes and scans allowed text for high-signal credential patterns. This is defense against accidental inclusions, not a universal secret-detection guarantee.
- The packed consumer asserts shared React resolution from its app and CLU entry, one actual React installation, only CLU/React/ReactDOM production roots, native SSR with no render-time callbacks, explicit CSS resolution and blocked deep imports.

The packaging checks use npm's documented [pack JSON/dry-run behavior](https://docs.npmjs.com/cli/v10/commands/npm-pack/) and Node's [ESM package export-map contract](https://nodejs.org/api/packages.html#package-entry-points). The verifier disables lifecycle scripts during its two pack commands because it has already built the artifacts explicitly; ordinary npm pack invokes the prepack build. No dependency peer bypasses are used.

## Version and distribution policy

The owner approved @shaobangzhu/clu-ui@0.1.0-rc.2, MIT, private=false and npm public/next distribution. scripts/release-contract.json pins these exact approved metadata fields, and verification compares both the source and archived package against them. The private rc.1 remains historical and unchanged. Publication is conditionally authorized after all mandatory tests pass; npm authentication/scope rights and registry integrity still need actual verification. See [current rc.2 evidence](rc2-verification.md).

Before publication, the owner must approve distribution, verify registry/scope rights, settle package identity/license/metadata, choose an immutable version, and approve any private flag change. The MIT LICENSE is included following owner authorization; registry rights are verified with the intended npm account. Record the chosen artifact's version and SHA-512 integrity; never replace different bytes at an already distributed version. Consumers pin an exact version or approved immutable tarball URL with a deterministic lockfile. Public API removals/renames or incompatible behavior require the appropriate documented version change; private paths remain unsupported.

P09/P10 DGI integration remains gated on an approved versioned immutable installable artifact. The temporary local verification tarballs and their hashes prove packaging, not an approved distribution channel. Do not bypass that gate through source copying, symlinks, workspace packages or file:../src. DGI remains untouched.

See [P07 executed verification](p07-verification.md) and [PR draft](p07-pr.md).

To verify an existing retained/downloaded tarball without rebuilding or repacking it, use `npm run package:verify:tarball -- /ABSOLUTE/exact.tgz`. This runs the same archive, public metadata/export/type, fresh locked consumer, ESM/SSR, Vite and React deduplication checks. The original tarball is never rewritten. Run the browser harness against that report for rendered validation. Registry dist.integrity and actual downloaded bytes must equal the retained candidate SRI before this mode establishes the P09 artifact prerequisite.
