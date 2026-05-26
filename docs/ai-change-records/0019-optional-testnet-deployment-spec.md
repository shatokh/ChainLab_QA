# AI Change Record 0019: Optional Testnet Readiness Spec

## Change ID

0019

## Date

2026-05-26

## Goal

Start Phase 8 by documenting optional testnet readiness requirements, manual preconditions, safety boundaries, and verification expectations while deferring any public deployment decision until after portfolio polish.

## Spec Link

`docs/specs/0011-optional-testnet-deployment.md`

## Files Changed

- `docs/specs/0011-optional-testnet-deployment.md`
- `docs/roadmap.md`
- `docs/setup/testnet-deployment-preconditions.md`
- `docs/setup/preconditions.md`
- `docs/ai-change-records/0019-optional-testnet-deployment-spec.md`

## Tests Added Or Updated

None. This task is documentation and governance only.

## Commands Run

- `git status --short`
- `Get-ChildItem docs/specs -Force | Select-Object Name | Sort-Object Name`
- `Get-ChildItem docs/ai-change-records -Force | Select-Object Name | Sort-Object Name`
- `Get-Content docs/setup/preconditions.md`
- `Get-Content docs/roadmap.md`
- `corepack yarn prettier --check docs/specs/0011-optional-testnet-deployment.md docs/setup/testnet-deployment-preconditions.md docs/setup/preconditions.md docs/ai-change-records/0019-optional-testnet-deployment-spec.md`: first run found formatting drift in `docs/setup/preconditions.md`.
- `corepack yarn prettier --write docs/specs/0011-optional-testnet-deployment.md docs/setup/testnet-deployment-preconditions.md docs/setup/preconditions.md docs/ai-change-records/0019-optional-testnet-deployment-spec.md`
- `corepack yarn prettier --check docs/specs/0011-optional-testnet-deployment.md docs/setup/testnet-deployment-preconditions.md docs/setup/preconditions.md docs/ai-change-records/0019-optional-testnet-deployment-spec.md`: passed.
- `Test-Path docs/specs/0011-optional-testnet-deployment.md; Test-Path docs/setup/testnet-deployment-preconditions.md; Test-Path docs/ai-change-records/0019-optional-testnet-deployment-spec.md`
- `rg -n "Local Hardhat|testnet|mainnet|real funds|production wallet|paid|secrets|private key|seed phrase|mnemonic|API key" docs/specs/0011-optional-testnet-deployment.md docs/setup/testnet-deployment-preconditions.md docs/setup/preconditions.md`
- `git diff --stat`

## Verification Evidence

- Expected files exist.
- Scoped Markdown formatting check passed.
- Safety-term search found local Hardhat, optional testnet, mainnet prohibition, real-funds prohibition, production-wallet prohibition, paid-infrastructure prohibition, and secret-handling rules.
- Diff is documentation/governance only.
- No product code, deployment script, dependency, package command, RPC value, wallet value, or generated deployment artifact was created.

## Known Limitations

- No testnet deployment implementation was created.
- No testnet was selected.
- No wallet was created.
- No faucet funds were requested.
- No RPC provider was configured.
- No deployment or smoke test was run.
- Public testnet deployment was moved to a later optional roadmap phase after portfolio polish.

## Uncertainty Classification

Medium. The documentation scope is clear, but future implementation depends on a selected testnet, free faucet availability, RPC reliability, and manual test-wallet setup.

## Follow-Up Items

- Continue to Phase 9 Portfolio Polish.
- Reconsider a single optional public testnet deployment only after Phase 9.
- If reconsidered, ask the user to choose Sepolia or Base Sepolia before implementation.
- If reconsidered, ask the user to create a separate test-only wallet before implementation.
- Add a new implementation spec before creating deployment scripts.
- Keep all secrets outside the repository and outside chat.
