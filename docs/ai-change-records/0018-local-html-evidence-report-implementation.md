# AI Change Record 0018: Local HTML Evidence Report Implementation

## Change ID

0018

## Date

2026-05-26

## Goal

Implement the local static HTML evidence report defined by Spec 0010 without adding dependencies, external assets, paid services, mainnet usage, real wallets, real funds, or testnet requirements.

## Spec Link

`docs/specs/0010-local-html-evidence-report.md`

## Files Changed

- `.gitignore`
- `.github/workflows/local-verification.yml`
- `package.json`
- `scripts/write-local-evidence-report.mjs`
- `tests/evidence-report.test.mjs`
- `docs/qa/evidence-report-template.md`
- `docs/qa/traceability-matrix.md`
- `docs/setup/local-app-runbook.md`
- `docs/specs/0010-local-html-evidence-report.md`
- `docs/failure-analyses/0010-hardhat-compiler-cache-mutex-recurrence.md`
- `docs/ai-change-records/0018-local-html-evidence-report-implementation.md`

## Tests Added Or Updated

- Added `tests/evidence-report.test.mjs`.
- The test verifies required HTML report sections, local verification command labels, evidence boundaries, uncertainty classification, file writing, and absence of secret-like placeholders in generated output.

## Commands Run

- `corepack yarn test` before implementation: failed as expected with `ERR_MODULE_NOT_FOUND` for `scripts/write-local-evidence-report.mjs`.
- `corepack yarn test`: passed 27 node tests after implementation.
- `corepack yarn evidence:local`: generated `reports/local-evidence-report.html`.
- `corepack yarn prettier --check .gitignore ...`: failed because Prettier could not infer a parser for `.gitignore`; `.gitignore` was excluded from the scoped Prettier check.
- `corepack yarn prettier --write scripts/write-local-evidence-report.mjs tests/evidence-report.test.mjs docs/qa/evidence-report-template.md docs/qa/traceability-matrix.md docs/setup/local-app-runbook.md docs/specs/0010-local-html-evidence-report.md .github/workflows/local-verification.yml package.json`
- `corepack yarn prettier --check .github/workflows/local-verification.yml package.json scripts/write-local-evidence-report.mjs tests/evidence-report.test.mjs docs/qa/evidence-report-template.md docs/qa/traceability-matrix.md docs/setup/local-app-runbook.md docs/specs/0010-local-html-evidence-report.md`: passed.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify` inside the workspace sandbox: failed during Hardhat compiler cache mutex acquisition after passing 27 node tests.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn test:contracts` inside the workspace sandbox: failed with the same Hardhat compiler cache mutex timeout.
- `Get-Process node -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,CPU,StartTime,Path`
- `Get-NetTCPConnection -State Listen -ErrorAction SilentlyContinue`
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn test:contracts` outside the workspace sandbox: passed 15 Solidity tests.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify` outside the workspace sandbox: passed route type generation, typecheck, lint, 27 node tests, 15 Solidity tests, and format check.
- `corepack yarn test:e2e`: passed 2 Playwright tests.
- `Test-Path reports/local-evidence-report.html`: returned `True`.
- `rg -n "ChainLab QA Local Evidence Report|corepack yarn verify|No real wallet|No real funds|No mainnet|No paid infrastructure|Uncertainty Classification" reports/local-evidence-report.html`: found required report content.
- `Select-String -Path reports/local-evidence-report.html -Pattern 'PRIVATE_KEY|MNEMONIC|API_KEY|seed phrase' -AllMatches`: found no secret-like placeholders.

## Verification Evidence

- TDD evidence exists: `corepack yarn test` first failed because the report generator did not exist, then passed after the minimal implementation.
- `corepack yarn test` passed 27 node tests.
- `corepack yarn test:contracts` passed 15 Solidity tests when run with approved access to the Hardhat compiler cache.
- `corepack yarn verify` passed after approved cache access.
- `corepack yarn test:e2e` passed 2 Playwright mocked-provider tests.
- `corepack yarn evidence:local` wrote `reports/local-evidence-report.html`.
- Generated report includes command evidence, status cards, local-first/free-only boundaries, known limitations, references, and uncertainty classification.
- Generated report was scanned for secret-like placeholders with no matches.
- `reports/` is ignored so local generated reports do not create noisy commits.

## Known Limitations

- The HTML report is a static summary and does not automatically capture command stdout.
- The report is local evidence only; it is not live wallet, public test network, mainnet, hosted app, or production validation.
- `corepack yarn evidence:open` launches the platform browser and was not run during automated verification.
- Hardhat contract verification may require approved access outside the workspace sandbox because Hardhat uses a compiler cache under `%LOCALAPPDATA%`.

## Uncertainty Classification

Low. The generator, tests, local report creation, secret-placeholder scan, E2E tests, contract tests, and full verification gate were run locally. The only residual uncertainty is browser launch behavior for `evidence:open`, which is intentionally manual.

## Follow-Up Items

- Optionally open `reports/local-evidence-report.html` manually with `corepack yarn evidence:open`.
- Keep the report content updated when new QA commands, specs, or evidence types are added.
- If Hardhat cache mutex failures recur inside the sandbox, follow `docs/failure-analyses/0010-hardhat-compiler-cache-mutex-recurrence.md`.
