# AI Change Record 0007: Local App Runbook

## Change ID

0007

## Date

2026-05-24

## Goal

Create a dedicated local app runbook with startup commands, verification commands, and critical path test cases.

## Spec Link

`docs/specs/0005-local-app-runbook.md`

## Files Changed

- `docs/specs/0005-local-app-runbook.md`
- `docs/setup/local-app-runbook.md`
- `docs/setup/local-development.md`
- `docs/ai-change-records/0007-local-app-runbook.md`

## Tests Added or Updated

None. This is a documentation-only change.

## Commands Run

- `git status --short`
- `rg --files docs/setup docs/specs docs/ai-change-records`
- `Get-Content docs/setup/local-development.md`
- `Get-Content package.json`
- PowerShell expected-file existence check with `Test-Path`
- `rg -n "corepack yarn dev|corepack yarn verify|corepack yarn test:e2e|corepack yarn test|corepack yarn npm audit|playwright install chromium|Critical Path Test Cases|CP-001|CP-002|CP-003|CP-004|CP-005|When To Update" docs/setup/local-app-runbook.md`
- `rg -n "local-app-runbook" docs/setup/local-development.md`

## Verification Evidence

- Current package scripts were reviewed before documenting commands.
- Existing setup documentation was reviewed before adding the dedicated runbook.
- Expected-file existence check returned `All expected local app runbook files exist.`
- Targeted content search confirmed the runbook includes app startup, verification, E2E, audit, Playwright setup, critical path cases `CP-001` through `CP-005`, and update guidance.
- `docs/setup/local-development.md` now links to `docs/setup/local-app-runbook.md`.
- `git status --short` confirmed this task changed documentation only on top of the existing working tree.

## Known Limitations

- The runbook documents current local commands only.
- Future phases must update critical path cases as new modules are implemented.

## Uncertainty Classification

Low. The runbook is based on current package scripts and local workflow.

## Follow-Up Items

- Add faucet critical path checks after Phase 3 implementation.
- Add NFT critical path checks after Phase 4 implementation.
- Add DAO voting critical path checks after Phase 5 implementation.
