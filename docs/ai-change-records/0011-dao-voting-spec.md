# AI Change Record 0011: DAO Voting Spec

## Change ID

0011

## Date

2026-05-24

## Goal

Create the Phase 5 DAO Voting spec without implementing contracts, UI, tests, dependencies, or package changes.

## Spec Link

`docs/specs/0007-dao-voting.md`

## Files Changed

- `docs/specs/0007-dao-voting.md`
- `docs/ai-change-records/0011-dao-voting-spec.md`

## Tests Added or Updated

None. This is a documentation/spec-authoring change only.

## Commands Run

- `git status --short`
- `Get-Content docs/roadmap.md`
- `Get-Content docs/specs/0006-nft-mint.md`
- `Get-ChildItem docs/specs,docs/ai-change-records | Sort-Object Name | Select-Object Name,Length,LastWriteTime`
- PowerShell expected-file existence check with `Test-Path`
- `rg -n "DAO Voting|local Hardhat|mainnet|real funds|production wallets|paid|secrets|proposal|duplicate|invalid proposal|Acceptance Criteria|Verification Gate|Out of Scope" docs/specs/0007-dao-voting.md docs/ai-change-records/0011-dao-voting-spec.md`
- `corepack yarn prettier --check docs/specs/0007-dao-voting.md docs/ai-change-records/0011-dao-voting-spec.md`
- `git status --short`
- `git diff -- next-env.d.ts`

## Verification Evidence

- `git status --short` confirmed the working tree was clean before this spec-authoring task.
- Roadmap review confirmed Phase 5 is DAO Voting.
- Existing NFT Mint spec was reviewed for local-first, free-only, and spec-authoring patterns.
- The new spec keeps implementation, dependencies, package changes, testnet, mainnet, real funds, production wallets, paid infrastructure, external governance services, and secrets out of scope for this task.
- Expected-file existence check returned `OK` for `docs/specs/0007-dao-voting.md` and `docs/ai-change-records/0011-dao-voting-spec.md`.
- Targeted content search confirmed DAO Voting scope, local Hardhat constraints, proposal/voting coverage, duplicate and invalid proposal negative states, mainnet/real-funds/paid-service exclusions, acceptance criteria, out-of-scope section, and verification gate content.
- Prettier check passed for the new spec and AI Change Record.
- `git status --short` showed the two new Phase 5 spec-authoring files plus an unrelated generated `next-env.d.ts` route-type import change. The generated file was not part of this task and was not added to the spec-authoring file list.

## Known Limitations

- DAO Voting is specified but not implemented.
- No Solidity DAO contract was added.
- No frontend voting UI was added.
- No tests were added.
- Exact DAO contract model, proposal lifecycle, dependency choices, state-helper design, and frontend-to-contract wiring remain deferred to implementation.

## Uncertainty Classification

Medium. The target DAO voting workflow is clear, but implementation details depend on contract design, proposal lifecycle, UI state strategy, and test harness design.

## Follow-Up Items

- Review and approve the DAO Voting spec before implementation.
- During implementation, write failing Hardhat contract tests before DAO contract code.
- Re-check package versions and audit results before adding dependencies.
- Keep automated verification local-first and wallet-mocked until a separate real-wallet strategy is approved.
