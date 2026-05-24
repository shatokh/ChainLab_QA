# AI Change Record 0009: NFT Mint Spec

## Change ID

0009

## Date

2026-05-24

## Goal

Create the Phase 4 NFT Mint spec without implementing contracts, UI, tests, dependencies, or package changes.

## Spec Link

`docs/specs/0006-nft-mint.md`

## Files Changed

- `docs/specs/0006-nft-mint.md`
- `docs/ai-change-records/0009-nft-mint-spec.md`

## Tests Added or Updated

None. This is a documentation/spec-authoring change only.

## Commands Run

- `git status --short`
- `Get-Content docs/roadmap.md`
- `Get-ChildItem docs/specs -Force | Sort-Object Name | Select-Object Name,Length,LastWriteTime`
- `Get-ChildItem docs/ai-change-records -Force | Sort-Object Name | Select-Object Name,Length,LastWriteTime`
- `Get-Content docs/specs/0004-test-token-faucet.md`
- `Get-Content docs/specs/0005-local-app-runbook.md`
- `Get-Content docs/ai-change-records/0005-test-token-faucet-spec.md`
- `Get-Content docs/ai-change-records/0007-local-app-runbook.md`
- PowerShell expected-file existence check with `Test-Path`
- `rg -n "NFT Mint|local Hardhat|mainnet|real funds|production wallets|paid|secrets|metadata|ERC-721|Acceptance Criteria|Verification Gate|Out of Scope" docs/specs/0006-nft-mint.md docs/ai-change-records/0009-nft-mint-spec.md`
- `corepack yarn prettier --check docs/specs/0006-nft-mint.md docs/ai-change-records/0009-nft-mint-spec.md`
- `git status --short`

## Verification Evidence

- Roadmap review confirmed Phase 4 is NFT Mint.
- Existing Phase 3 and runbook specs were reviewed for local-first, free-only, and spec-authoring patterns.
- The new spec keeps implementation, dependencies, package changes, testnet, mainnet, real funds, production wallets, paid infrastructure, and secrets out of scope for this task.
- Expected-file existence check returned `OK` for `docs/specs/0006-nft-mint.md` and `docs/ai-change-records/0009-nft-mint-spec.md`.
- Targeted content search confirmed NFT Mint scope, local Hardhat constraints, mainnet/real-funds/paid-service exclusions, metadata coverage, ERC-721-like scope, acceptance criteria, out-of-scope section, and verification gate content.
- Prettier check passed for the new spec and AI Change Record.
- `git status --short` showed only the two new Phase 4 spec-authoring files were added by this task on top of the existing Phase 3 working tree.

## Known Limitations

- NFT Mint is specified but not implemented.
- No Solidity NFT contract was added.
- No frontend mint UI was added.
- No tests were added.
- Exact NFT contract design, metadata model, dependency choices, and frontend-to-contract wiring remain deferred to implementation.
- Phase 3 implementation changes are still present in the working tree and should be committed or otherwise separated before Phase 4 implementation begins.

## Uncertainty Classification

Medium. The target NFT mint workflow is clear, but implementation details depend on contract design, metadata strategy, library choices, and test harness design.

## Follow-Up Items

- Review and approve the NFT Mint spec before implementation.
- Commit or otherwise separate Phase 3 implementation changes before starting Phase 4 implementation.
- During implementation, write failing Hardhat contract tests before NFT contract code.
- Re-check package versions and audit results before adding dependencies.
- Keep automated verification local-first and wallet-mocked until a separate real-wallet strategy is approved.
