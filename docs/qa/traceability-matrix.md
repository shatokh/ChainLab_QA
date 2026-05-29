# Traceability Matrix

This matrix maps implemented specs to features, checks, and evidence commands. It intentionally separates mocked-provider UI evidence from local Solidity contract evidence.

| Spec                                                   | Feature                            | Primary Files                                                                                                     | Automated Evidence                                                                                    | Commands                                                                       |
| ------------------------------------------------------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `docs/specs/0002-phase-1-project-skeleton.md`          | Project skeleton and local tooling | `package.json`, `tests/skeleton.test.mjs`, config files                                                           | package manager, exact versions, local-only config, secret guardrails                                 | `corepack yarn test`, `corepack yarn verify`                                   |
| `docs/specs/0003-wallet-connect.md`                    | Wallet Connect                     | `lib/wallet.ts`, `components/wallet-connect-panel.tsx`, `tests/wallet.test.ts`, `e2e/wallet-connect.spec.ts`      | mocked provider connect, wrong chain, missing provider, rejected request, disconnect, address display | `corepack yarn test`, `corepack yarn test:e2e`                                 |
| `docs/specs/0004-test-token-faucet.md`                 | Test Token Faucet                  | `contracts/ChainLabTestToken.sol`, `contracts/ChainLabFaucet.sol`, `lib/faucet.ts`, `components/faucet-panel.tsx` | local token metadata, claim behavior, inventory reduction, empty faucet, UI balance update            | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0006-nft-mint.md`                          | NFT Mint                           | `contracts/ChainLabLocalNft.sol`, `lib/nft.ts`, `components/nft-mint-panel.tsx`                                   | local metadata, ownership, token URI, missing token, UI mint display                                  | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0007-dao-voting.md`                        | DAO Voting                         | `contracts/ChainLabDaoVoting.sol`, `lib/dao.ts`, `components/dao-voting-panel.tsx`                                | seeded proposal, yes/no votes, duplicate vote, invalid proposal, UI vote totals                       | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0008-qa-documentation.md`                  | QA Documentation                   | `docs/qa/`                                                                                                        | documentation coverage, local evidence template, exploratory and defect examples                      | `corepack yarn prettier --check docs/qa/*.md`                                  |
| `docs/specs/0009-ci-cd-evidence-reports.md`            | CI/CD and Evidence Reports         | `.github/workflows/local-verification.yml`, `docs/qa/evidence-report-template.md`                                 | local CI verification, mocked-provider E2E, generated evidence boundary artifact                      | `corepack yarn verify`, `corepack yarn test:e2e`                               |
| `docs/specs/0010-local-html-evidence-report.md`        | Local HTML Evidence Report         | `scripts/write-local-evidence-report.mjs`, `tests/evidence-report.test.mjs`, `reports/local-evidence-report.html` | static browser-friendly local evidence report, command coverage, local-only boundary wording          | `corepack yarn test`, `corepack yarn evidence:local`                           |
| `docs/specs/0013-manual-full-verification-workflow.md` | Manual Full Verification Workflow  | `.github/workflows/manual-full-verification.yml`                                                                  | manual-only layered CI checks and one-day local evidence artifact retention                           | `workflow_dispatch`                                                            |

## Evidence Types

| Evidence Type                     | What It Proves                                            | What It Does Not Prove                                            |
| --------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Node tests                        | deterministic local helper behavior and policy guardrails | live wallet extension behavior                                    |
| Solidity tests                    | local Hardhat contract behavior, events, and reverts      | deployed testnet or mainnet behavior                              |
| Playwright mocked-provider tests  | browser UI flow with controlled provider behavior         | real wallet popups, real signatures, public RPC behavior          |
| Manual exploratory notes          | human observations and usability risks                    | repeatable automated coverage unless converted into tests         |
| CI evidence artifact              | workflow command list and local verification boundaries   | testnet, mainnet, live wallet, or production validation           |
| Manual workflow evidence artifact | manually triggered layered local verification evidence    | automatic CI coverage, testnet, mainnet, or production validation |
| Local HTML evidence report        | readable local verification summary and evidence scope    | live wallet, public RPC, hosted app, or production proof          |
| Evidence report template          | structured record of a verification run                   | proof beyond the commands and boundaries recorded                 |

## Maintenance Rules

- Add one row when a new feature spec is implemented.
- Update command references when package scripts change.
- Do not mark optional testnet validation as covered unless a future spec approves and documents it.
- Do not use real private keys, seed phrases, mnemonics, API keys, production wallets, mainnet, or real funds as evidence.
