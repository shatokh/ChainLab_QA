# AI Change Record 0022: Manual Workflow Checkout Fix

## Change ID

0022

## Date

2026-05-29

## Goal

Fix the manual full verification workflow after every GitHub Actions job failed during checkout.

## Spec Link

`docs/specs/0013-manual-full-verification-workflow.md`

## Files Changed

- `.github/workflows/manual-full-verification.yml`
- `docs/failure-analyses/0011-manual-workflow-checkout-failure.md`
- `docs/ai-change-records/0022-manual-workflow-checkout-fix.md`

## Tests Added Or Updated

None. This task updates GitHub Actions configuration and records failure analysis.

## Commands Run

- GitHub REST query for workflow runs: found failed run `26662265498`.
- GitHub REST query for workflow jobs: found every job failed at `Checkout`.
- GitHub REST query for job logs: returned `403 Must have admin rights to Repository`.
- `corepack yarn prettier --check .github/workflows/manual-full-verification.yml docs/failure-analyses/0011-manual-workflow-checkout-failure.md docs/ai-change-records/0022-manual-workflow-checkout-fix.md`: passed.
- `rg -n "actions/checkout@v5|actions/setup-node@v6|workflow_dispatch|push:|pull_request:|schedule:|retention-days: 1" .github/workflows/manual-full-verification.yml`
- `git status --short`
- `git diff --stat`

## Verification Evidence

- GitHub job metadata shows failure before any project command ran.
- The workflow now uses `actions/checkout@v5`.
- The workflow now uses `actions/setup-node@v6`.
- The workflow still uses `workflow_dispatch`.
- Search found no automatic trigger lines for `push`, `pull_request`, or `schedule`.
- Artifact upload still uses `retention-days: 1`.
- Scoped formatting check passed.
- No product code, dependency, package script, testnet, mainnet, real wallet, real funds, paid service, or secret configuration was introduced.

## Known Limitations

- Full GitHub Actions job logs were not available through the unauthenticated REST API.
- The fix must be validated by pushing and rerunning the manual workflow in GitHub Actions.

## Uncertainty Classification

Medium. Job metadata proves the failure occurred at checkout before tests ran, but the corrected workflow still needs a GitHub-hosted rerun.

## Follow-Up Items

- Push the fix.
- Rerun `Manual Full Verification` manually in GitHub Actions.
- If checkout still fails, inspect authenticated job logs in GitHub UI and update the failure analysis before further changes.
