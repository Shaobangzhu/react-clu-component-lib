#!/usr/bin/env bash
set -euo pipefail
mkdir -p /work /output
# Explicit input projection; no Git metadata, environment files, reports or local dependencies.
cd /input
tar -cf - package.json package-lock.json tsconfig*.json vite.config.ts vitest*.ts playwright.config.ts eslint.config.js .storybook src tests scripts .ci examples README.md .nvmrc .npmrc | tar -xf - -C /work
cd /work
finish() {
  status=$?
  trap - EXIT
  copy_status=0
  if [[ -d artifacts ]]; then cp -R artifacts/. /output/ || copy_status=$?; fi
  if [[ "$1" == candidates && -d tests/visual/baselines ]]; then mkdir -p /output/candidates; cp -R tests/visual/baselines/. /output/candidates/; fi
  if [[ "$status" == 0 && "$copy_status" != 0 ]]; then exit "$copy_status"; fi
  exit "$status"
}
mode="$1"
trap 'finish "$mode"' EXIT
npm ci --no-fund --no-audit
case "$1" in
  stories) npm run test:stories ;;
  visual) node scripts/verify-baselines.mjs && npm run build-storybook && npm run test:visual ;;
  candidates) npm run build-storybook && CLU_UPDATE_BASELINES=1 npm run test:visual -- --update-snapshots=all ;;
  probe) npm run quality:probe ;;
  *) exit 64 ;;
esac
