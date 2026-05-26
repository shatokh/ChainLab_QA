# Spec 0010: Local HTML Evidence Report

## Goal

Define a local HTML evidence report extension for ChainLab QA that can be generated after local verification and opened in a browser as a clean, portfolio-friendly summary of QA evidence.

## Context

Phase 7 introduced CI/CD and evidence report scope. The repository now has a manual evidence report template and a local CI evidence artifact design. A local HTML report would make the evidence easier to inspect visually while preserving the same local-first, free-only, no-mainnet policy.

This spec documents the desired behavior before implementation. The implementation should be a small local script with no new dependencies unless a future amendment explicitly justifies them.

The repository policy still applies:

- Local Hardhat network is the default Web3 verification environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, paid reporting tools, and paid CI services are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future implementation may include:

- A Node script that writes a static HTML report.
- A generated local report path such as `reports/local-evidence-report.html`.
- A report summary with project name, date, commit or working-tree note, and local verification scope.
- Sections for command evidence:
  - `corepack yarn verify`;
  - `corepack yarn test`;
  - `corepack yarn test:contracts`;
  - `corepack yarn test:e2e`;
  - `corepack yarn typecheck`;
  - `corepack yarn lint`;
  - `corepack yarn format:check`.
- Status cards for typecheck, lint, node tests, Solidity contract tests, Playwright E2E, and formatting.
- Links or references to QA docs, specs, and AI Change Records.
- A local-first/free-only boundary section.
- Known limitations and uncertainty classification.
- Optional package scripts such as `evidence:local` and `evidence:open` if they do not add dependencies or external-service requirements.
- Optional CI upload of the HTML report as an artifact if it contains no secrets and clearly labels local evidence boundaries.

The report must be static, inspectable, and safe to open locally. It must not require a server, paid reporting service, network access, external assets, telemetry, or secrets.

## Out of Scope

- Product code changes.
- Contract changes.
- UI feature changes.
- Test behavior changes.
- Dependency additions.
- Paid reporting services.
- Paid hosting.
- External dashboards.
- External images, fonts, scripts, telemetry, or analytics.
- Real wallets.
- Real funds.
- Mainnet usage.
- Testnet deployment or testnet smoke tests.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Publishing reports publicly by default.
- Git commit.

## Affected Files

Expected future implementation files may include:

- `scripts/write-local-evidence-report.mjs`
- `reports/`
- `package.json`
- `.gitignore`
- `.github/workflows/local-verification.yml`
- `docs/qa/evidence-report-template.md`
- `docs/qa/traceability-matrix.md`
- `docs/setup/local-app-runbook.md`
- `docs/specs/0010-local-html-evidence-report.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0010-local-html-evidence-report.md`
- `docs/ai-change-records/0017-local-html-evidence-report-spec.md`

## Expected Behavior

When implemented later, a contributor should be able to run a local command that generates `reports/local-evidence-report.html`. Opening the file in a browser should show a readable evidence summary with command coverage, local verification boundaries, known limitations, and uncertainty classification.

The report should make it clear that:

- local Hardhat evidence is not testnet or mainnet evidence;
- mocked-provider E2E evidence is not live wallet evidence;
- no real funds were used;
- no paid infrastructure was required;
- no secrets should appear in the report.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0010-local-html-evidence-report.md` exists.
- `docs/ai-change-records/0017-local-html-evidence-report-spec.md` exists.
- The spec clearly states local-first, free-only, no mainnet, no real funds, no production wallet, no paid reporting, and no secrets constraints.
- The spec clearly keeps report implementation, package scripts, generated reports, CI changes, product code, dependencies, remote, and commit out of scope for this task.

For a future implementation task:

- A local report generation script exists.
- The script uses only Node built-ins unless a separately approved spec allows dependencies.
- A local command generates `reports/local-evidence-report.html`.
- The report is static and opens directly in a browser.
- The report includes command sections for local verification and E2E evidence.
- The report includes status cards or equivalent summaries for typecheck, lint, node tests, contract tests, E2E, and formatting.
- The report links or references relevant QA docs/specs.
- The report clearly states local-first/free-only evidence boundaries.
- The report contains no secrets, wallet private data, real keys, real funds, mainnet data, paid-service data, or external asset dependencies.
- Generated reports are either ignored by default or explicitly scoped if checked in.
- If CI uploads the report, the artifact is clearly labeled as local evidence only.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Search the spec for local-first/free-only constraints and implementation out-of-scope boundaries.
- Check that no script, package command, generated report, CI change, product code, dependency, remote, or commit was created by this task.
- Review current changes against this spec.

For a future implementation task:

- Write or update a failing verification check first where practical. For a pure generator, this can be a node test or script-output existence/content check.
- Generate the report locally.
- Verify the HTML file exists and contains required headings, command labels, evidence boundaries, known limitations, and uncertainty classification.
- Verify generated HTML contains no secret-like placeholders or real credentials.
- Run `corepack yarn verify`.
- Run `corepack yarn test:e2e`.
- Open the generated HTML locally or document the file path if browser launch is not available.
- Review generated output against this spec before completion.

## Risks

- Reports can overstate local evidence as live wallet, testnet, mainnet, or production validation.
- Generated HTML can accidentally include environment variables, secrets, or machine-specific private paths.
- External assets can introduce network, privacy, or paid-service dependencies.
- A polished report can hide uncertainty if limitations are not explicit.
- CI artifacts can be mistaken for public deployment evidence.
- Generated reports can create noisy commits if not ignored or scoped.

## Uncertainty Classification

Medium. The desired report is clear, but the exact script design, generated file handling, CI artifact integration, and browser-opening behavior should be validated during implementation.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] Report implementation is not created during spec-authoring.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Testnet is not required for local verification.
- [x] Paid infrastructure and paid reporting requirements are avoided.
- [x] Production wallet assumptions are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Optional external services are clearly marked optional.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
