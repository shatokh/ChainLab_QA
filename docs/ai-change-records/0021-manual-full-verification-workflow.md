# AI Change Record 0021: Manual Full Verification Workflow

## Change ID

0021

## Date

2026-05-29

## Goal

Add a manual-only GitHub Actions workflow that runs verification layers in separate jobs and uploads local evidence artifacts with one-day retention.

## Spec Link

`docs/specs/0013-manual-full-verification-workflow.md`

## Files Changed

- `.github/workflows/manual-full-verification.yml`
- `docs/specs/0013-manual-full-verification-workflow.md`
- `docs/ai-change-records/0021-manual-full-verification-workflow.md`
- `docs/setup/local-app-runbook.md`
- `docs/qa/traceability-matrix.md`
- `docs/portfolio/README.md`

## Tests Added Or Updated

None. This task adds CI workflow configuration and documentation only.

## Commands Run

- `git status --short`
- `Get-Content package.json`
- `Get-Content .github/workflows/local-verification.yml`
- `Get-Content docs/qa/traceability-matrix.md`
- `Get-Content docs/setup/local-app-runbook.md`
- `corepack yarn prettier --check .github/workflows/manual-full-verification.yml docs/specs/0013-manual-full-verification-workflow.md docs/ai-change-records/0021-manual-full-verification-workflow.md docs/setup/local-app-runbook.md docs/qa/traceability-matrix.md docs/portfolio/README.md`: first run found formatting drift in `docs/qa/traceability-matrix.md`.
- `corepack yarn prettier --write .github/workflows/manual-full-verification.yml docs/specs/0013-manual-full-verification-workflow.md docs/ai-change-records/0021-manual-full-verification-workflow.md docs/setup/local-app-runbook.md docs/qa/traceability-matrix.md docs/portfolio/README.md`
- `corepack yarn prettier --check .github/workflows/manual-full-verification.yml docs/specs/0013-manual-full-verification-workflow.md docs/ai-change-records/0021-manual-full-verification-workflow.md docs/setup/local-app-runbook.md docs/qa/traceability-matrix.md docs/portfolio/README.md`: passed.
- `rg -n "workflow_dispatch|push:|pull_request:|schedule:|retention-days: 1|static-checks|node-tests|contract-tests|e2e-tests|evidence:" .github/workflows/manual-full-verification.yml`
- `Test-Path .github/workflows/manual-full-verification.yml; Test-Path docs/specs/0013-manual-full-verification-workflow.md; Test-Path docs/ai-change-records/0021-manual-full-verification-workflow.md`
- `rg -n "No real wallet|No real funds|No mainnet|No testnet validation|No paid RPC|No committed secrets|workflow_dispatch|one day|retention" .github/workflows/manual-full-verification.yml docs/specs/0013-manual-full-verification-workflow.md docs/setup/local-app-runbook.md docs/qa/traceability-matrix.md docs/portfolio/README.md`
- `git diff --stat`

## Verification Evidence

- Workflow file exists.
- Spec and AI Change Record exist.
- Workflow contains `workflow_dispatch`.
- Workflow search found no `push:`, `pull_request:`, or `schedule:` trigger.
- Workflow has separate jobs for static checks, node tests, Solidity contract tests, mocked-provider E2E tests, and local evidence generation.
- Evidence artifact upload uses `retention-days: 1`.
- Documentation describes the manual workflow and local-only evidence boundary.
- Scoped formatting check passed.
- No product code, dependency, package script, testnet, mainnet, real wallet, real funds, paid service, or secret configuration was introduced.

## Known Limitations

- The workflow file can be inspected locally, but actual GitHub-hosted runtime behavior must be verified by manually running the workflow in GitHub Actions.
- Each job installs dependencies separately, which improves layer visibility but increases total setup work.
- Playwright browser installation may fail on GitHub-hosted runners due transient external download issues.

## Uncertainty Classification

Medium. The YAML and documentation can be checked locally, but the manual workflow itself has not run on GitHub Actions in this task.

## Follow-Up Items

- Manually run `Manual Full Verification` in GitHub Actions after this change is committed and pushed.
- Inspect `manual-full-verification-evidence` before it expires after one day.
