# Defect Examples

These examples show the level of detail expected for Web3 QA defects. They are examples only and must not include real private keys, seed phrases, mnemonics, API keys, real funds, production wallets, mainnet transactions, or paid-service requirements.

## Example 1: Missing Wallet Provider Message Is Not Clear

Title:

- Missing provider state does not tell user the check is local-only.

Environment:

- Local Next.js app.
- Mocked-provider E2E disabled.
- No browser wallet required.

Expected behavior:

- When no provider is available, the app shows a clear missing-provider message and keeps Web3 actions disabled.

Actual behavior:

- The app shows a generic failure message or leaves action buttons enabled.

Reproduction steps:

1. Run `corepack yarn test:e2e`.
2. Inspect the missing-provider scenario.
3. Confirm Wallet Connect, Faucet, NFT Mint, and DAO Voting actions are disabled.

Evidence:

- Playwright failure output.
- Screenshot if available.

Risk:

- Users can misunderstand a local QA playground as requiring a production wallet.

Uncertainty:

- Low if reproduced locally with Playwright.

## Example 2: Contract And UI State Diverge

Title:

- Faucet UI shows successful CLT balance update while contract test fails claim behavior.

Environment:

- Local Hardhat.
- Mocked-provider UI flow.

Expected behavior:

- UI messaging clearly represents mocked local state, and Solidity tests independently prove contract behavior.

Actual behavior:

- UI passes while `corepack yarn test:contracts` fails the faucet claim test.

Reproduction steps:

1. Run `corepack yarn test:e2e`.
2. Run `corepack yarn test:contracts`.
3. Compare UI result with Solidity test output.

Evidence:

- Playwright output.
- Hardhat Solidity test failure.

Risk:

- Mocked-provider UI evidence can be overstated as live contract evidence.

Uncertainty:

- Medium until the contract failure is isolated.

## Example 3: DAO Duplicate Vote Not Blocked

Title:

- DAO voting allows the same local account to vote twice.

Environment:

- Local Hardhat.
- Local DAO voting contract.

Expected behavior:

- A second vote from the same local account is rejected.

Actual behavior:

- Vote totals increase after a duplicate vote.

Reproduction steps:

1. Run `corepack yarn test:contracts`.
2. Inspect `contracts/ChainLabDaoVoting.t.sol` duplicate-vote coverage.
3. If needed, add a focused failing test before changing contract code.

Evidence:

- Hardhat Solidity test output.

Risk:

- Governance result verification becomes meaningless if duplicate votes are accepted.

Uncertainty:

- Low if reproduced in Solidity tests.

## Example 4: Generated Evidence Overstates Testnet Coverage

Title:

- Evidence report describes local verification as testnet validation.

Environment:

- Local documentation review.

Expected behavior:

- Evidence reports label local Hardhat, mocked-provider UI, and optional testnet validation separately.

Actual behavior:

- A local `corepack yarn verify` run is described as testnet coverage.

Reproduction steps:

1. Review a completed evidence report.
2. Search for `testnet`, `mainnet`, and `production`.
3. Compare claims with commands actually run.

Evidence:

- Evidence report excerpt.
- Command list.

Risk:

- Portfolio or reviewer evidence becomes misleading.

Uncertainty:

- Low if the report text and commands are available.

## Example 5: AI-Assisted Change Lacks Verification Evidence

Title:

- AI Change Record claims tests passed without commands or output summary.

Environment:

- Documentation review.

Expected behavior:

- AI Change Record lists commands run and verification evidence.

Actual behavior:

- The record says verification passed but does not list commands.

Reproduction steps:

1. Open the relevant AI Change Record.
2. Check `Commands Run` and `Verification Evidence`.
3. Compare with final report.

Evidence:

- File path and section names.

Risk:

- The repository loses auditability and violates the agent workflow.

Uncertainty:

- Low if the record is missing evidence sections.
