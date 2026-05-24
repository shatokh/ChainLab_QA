# AI Change Record 0005: Test Token + Faucet Spec

## Change ID

0005

## Date

2026-05-24

## Goal

Create the Phase 3 Test Token + Faucet spec without implementing contracts, UI, tests, or dependencies.

## Spec Link

`docs/specs/0004-test-token-faucet.md`

## Files Changed

- `docs/specs/0004-test-token-faucet.md`
- `docs/ai-change-records/0005-test-token-faucet-spec.md`
- `docs/setup/preconditions.md`

## Tests Added or Updated

None. This is a documentation/spec-authoring change only.

## Commands Run

- `git status --short`
- `Get-Content docs/roadmap.md`
- `rg --files docs/specs docs/ai-change-records`
- `Get-Content docs/specs/0003-wallet-connect.md`
- PowerShell expected-file existence check with `Test-Path`
- `rg -n "Test Token|Faucet|ERC-20|local Hardhat|31337|real wallet|mainnet|testnet|paid|secrets|Acceptance Criteria|Verification Gate" docs/specs/0004-test-token-faucet.md docs/ai-change-records/0005-test-token-faucet-spec.md`
- `git diff -- docs/specs/0004-test-token-faucet.md docs/ai-change-records/0005-test-token-faucet-spec.md`
- `Get-Content docs/setup/preconditions.md`
- `rg -n "Manual Action Timeline|Phase 2|Phase 3|test-only wallet|Optional Testnet|no real money|production wallet" docs/setup/preconditions.md`

## Verification Evidence

- Roadmap review confirmed Phase 3 is Test Token + Faucet.
- Wallet Connect spec review confirmed Phase 2 is specified and local-first constraints remain active.
- Expected-file existence check returned `All expected Test Token + Faucet spec files exist.`
- Targeted content search confirmed the spec includes Test Token + Faucet scope, ERC-20 references, local Hardhat constraints, no real wallet requirement for automation, mainnet/testnet/paid-service/secret exclusions, acceptance criteria, and verification gate content.
- `git status --short` showed only the two new spec-authoring files for this task.
- Current changes were reviewed against `docs/specs/0004-test-token-faucet.md`; this task stayed spec-authoring only and did not implement contracts, UI, tests, package changes, or dependencies.
- Added a manual action timeline to `docs/setup/preconditions.md` so wallet/testnet/manual actions are called out before each phase.

## Known Limitations

- Test Token + Faucet is specified but not implemented.
- No Solidity contracts were added.
- No frontend faucet UI was added.
- No tests were added.
- Exact token/faucet contract design and dependency choices remain deferred to implementation.

## Uncertainty Classification

Medium. The target workflow is clear, but implementation details depend on contract design, library choices, and test harness design.

## Follow-Up Items

- Review and approve the Test Token + Faucet spec before implementation.
- During implementation, write failing Hardhat contract tests before contract code.
- Re-check package versions and audit results before adding dependencies.
- Keep automated verification local-first and wallet-mocked until a separate real-wallet strategy is approved.
