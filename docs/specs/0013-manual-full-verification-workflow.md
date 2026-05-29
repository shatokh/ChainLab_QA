# Spec 0013: Manual Full Verification Workflow

## Goal

Add a manual-only GitHub Actions workflow that runs the full local verification stack in separate jobs and uploads local evidence artifacts with a one-day retention period.

## Context

ChainLab QA already has a local verification workflow for push and pull request events. The project also has local commands for static checks, node tests, Solidity contract tests, mocked-provider Playwright E2E tests, and local HTML evidence report generation.

For portfolio and QA review, a manually triggered workflow can provide an explicit "run all checks now" action without changing the normal push/PR CI behavior.

The local-first policy still applies:

- No mainnet.
- No real funds.
- No production wallets.
- No paid RPC, hosting, deployment dashboards, or reporting services.
- No testnet dependency.
- No committed secrets.
- Local Hardhat and mocked-provider evidence only.

## Scope

This task may include:

- New workflow `.github/workflows/manual-full-verification.yml`.
- Manual trigger with `workflow_dispatch` only.
- Separate jobs for:
  - static checks;
  - node tests;
  - Solidity contract tests;
  - mocked-provider Playwright E2E tests;
  - local evidence report generation.
- Artifact upload for local evidence with `retention-days: 1`.
- Documentation updates for runbook, QA docs, traceability matrix, and portfolio guide if needed.
- AI Change Record.

## Out of Scope

- Product code changes.
- Test behavior changes.
- Dependency additions.
- Package script changes.
- Testnet deployment.
- Mainnet usage.
- Real funds.
- Production wallets.
- Paid infrastructure.
- Secret configuration.
- Changing the existing push/PR workflow unless needed for consistency.
- Git commit unless explicitly requested.

## Affected Files

Expected files:

- `.github/workflows/manual-full-verification.yml`
- `docs/specs/0013-manual-full-verification-workflow.md`
- `docs/ai-change-records/0021-manual-full-verification-workflow.md`
- `docs/setup/local-app-runbook.md`
- `docs/qa/traceability-matrix.md`
- `docs/portfolio/README.md`

Optional files if needed:

- `README.md`
- `docs/qa/README.md`

## Expected Behavior

A repository user should be able to open GitHub Actions, select the manual full verification workflow, run it manually, and inspect jobs for each verification layer.

The workflow must not run on push, pull request, schedule, or any automatic event. It must be manual-only.

The evidence artifact should include the local HTML evidence report and a short Markdown summary. Artifact retention must be one day.

## Acceptance Criteria

- Workflow exists at `.github/workflows/manual-full-verification.yml`.
- Workflow uses `workflow_dispatch` and no automatic triggers.
- Workflow has separate jobs for static checks, node tests, contract tests, E2E tests, and evidence generation.
- Static checks run typecheck, lint, and format check.
- Node tests run `corepack yarn test`.
- Contract tests run `corepack yarn test:contracts`.
- E2E tests install Playwright Chromium and run `corepack yarn test:e2e`.
- Evidence job runs `corepack yarn evidence:local`.
- Evidence artifact upload uses `retention-days: 1`.
- Workflow does not require secrets, wallets, testnet, mainnet, real funds, or paid services.
- Docs explain the manual workflow and artifact boundary.
- AI Change Record exists.

## Test Strategy

- Run `git status`.
- Verify workflow file exists.
- Inspect workflow for `workflow_dispatch`.
- Search workflow to confirm no `push`, `pull_request`, or `schedule` trigger is present.
- Search workflow for `retention-days: 1`.
- Run scoped Prettier check for changed YAML and Markdown files.
- Review current diff against this spec.

## Risks

- Manual workflow could accidentally include automatic triggers.
- Evidence artifacts could be retained longer than intended.
- Multi-job setup can duplicate install time.
- E2E browser install can fail due transient network or cache issues.
- Manual GitHub Actions success could be overstated as testnet, mainnet, live wallet, or production validation.

## Uncertainty Classification

Medium. The workflow definition can be checked locally, but GitHub-hosted runtime behavior is only fully verified after a manual run in GitHub Actions.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] No product code is changed.
- [x] No dependencies are added.
- [x] Workflow is manual-only.
- [x] Workflow has separate verification jobs.
- [x] Artifact retention is one day.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Testnet is not required.
- [x] Paid infrastructure requirements are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Documentation is updated.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
