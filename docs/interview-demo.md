# One-minute architecture walkthrough

“CLU and DGI are separate repositories. CLU packages 19 generic React 19 components, strict declarations and opt-in scoped CSS. I start the local Storybook gallery, show native form/error/focus and light/dark states, then explain the unit, axe and zero-diff Chromium layers. They are regression evidence, not accessibility certification.

“The package contract packs the built library and installs it outside the repository, checking ESM, NodeNext/Bundler declarations, CSS and one React. DGI pins the actual public npm rc.2 plus registry integrity. Its Dashboard/Settings and History/Merchants integrations merged separately and passed exact-head Quality gates. Pagination wording, dates/DST and merchant conflict handling stayed application-owned instead of being forced into generic APIs.

“The GitHub prerelease points to byte-reproducible source; today's docs are newer than the immutable tarball. There is no stable v1 or public Storybook claim. DGI's report deployment failed separately from its green product CI. The readiness ledger shows those limits explicitly.”

For an offline failure-path demonstration, run `npm run quality:probe`: it creates a disposable intentionally failing synthetic test and confirms tee preserves exit 1/23 and the aggregate rejects failed/skipped/cancelled/missing stages. The probe itself passes when those protections work. Do not break committed tests, call providers or use real deliveries. Follow [consumer evidence](consumer-integration.md) for source/CI; any live DGI demonstration needs its own approved synthetic environment.
