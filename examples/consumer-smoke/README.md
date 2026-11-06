# External consumer template

Run `npm run package:verify` from the CLU root. The runner copies this template to an OS temporary directory outside the repository, injects the verified tarball and integrity into its copied manifest/lockfile, then runs npm ci, strict Bundler/NodeNext types, Vite production build and ESM/SSR checks. Do not install this directory as a workspace or alias CLU source into it.

Production roots: installed CLU tarball, React and ReactDOM. Development-only tooling: TypeScript, React types and Vite. The single CLU CSS import follows deliberately conflicting host styles. Use Run browser checks in the served production build and the interaction checklist in [the package contract](../../docs/package-contract.md).
