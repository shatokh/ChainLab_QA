# Spec 0005: Local App Runbook

## Goal

Create a dedicated local app runbook that explains how to start ChainLab QA locally, run verification commands, and maintain a short set of critical path test cases as the app evolves.

## Context

The project now has a local-first Next.js skeleton and Wallet Connect flow. Existing setup docs describe baseline development, but there is no single operator-facing runbook that lists startup commands, test commands, E2E setup, and critical path checks.

## Scope

- Create `docs/setup/local-app-runbook.md`.
- Include local install, app startup, verification, E2E, audit, Hardhat, and troubleshooting commands.
- Include critical path test cases in concise manual-test style.
- State that the document must be updated as features evolve.
- Link the runbook from `docs/setup/local-development.md`.
- Create an AI Change Record for this documentation change.

## Out of Scope

- Product code changes.
- Test implementation changes.
- Dependency changes.
- Package script changes.
- CI workflows.
- Real wallet setup.
- Testnet setup.
- Mainnet usage.
- Git commit.

## Affected Files

- `docs/specs/0005-local-app-runbook.md`
- `docs/setup/local-app-runbook.md`
- `docs/setup/local-development.md`
- `docs/ai-change-records/0007-local-app-runbook.md`

## Expected Behavior

Future contributors should have a single short document for local app startup and verification. The runbook should make clear which checks are automated, which are optional, and which critical paths must stay updated as the app grows.

## Acceptance Criteria

- `docs/setup/local-app-runbook.md` exists.
- The runbook lists local app startup commands.
- The runbook lists verification and test commands.
- The runbook explains Playwright Chromium setup.
- The runbook includes critical path test cases.
- The runbook states it must be updated as the app evolves.
- `docs/setup/local-development.md` links to the runbook.
- AI Change Record `docs/ai-change-records/0007-local-app-runbook.md` exists.
- No product code, dependencies, package scripts, CI workflows, wallet setup, testnet setup, remote, or commit are created.

## Test Strategy

- Run `git status`.
- Verify expected files exist.
- Search the runbook for startup commands, verification commands, and critical path test cases.
- Review current changes against this spec.

## Risks

- The runbook can become stale if new features add commands or critical paths.
- Manual test cases can become too broad if they are not kept critical-path only.
- E2E setup may require local Playwright browser binaries that are not present on a fresh machine.

## Uncertainty Classification

Low. This is a documentation-only change based on current package scripts and verified local workflow.

## Verification Gate

- [ ] Spec exists.
- [ ] Scope is respected.
- [ ] Relevant documentation checks are run.
- [ ] Local-first behavior is preserved.
- [ ] Real funds are avoided.
- [ ] Mainnet is avoided.
- [ ] Paid infrastructure requirements are avoided.
- [ ] Secrets are excluded from files and docs.
- [ ] AI Change Record exists.
- [ ] Known limitations documented.
- [ ] Uncertainty classified.
- [ ] Final report includes evidence.
