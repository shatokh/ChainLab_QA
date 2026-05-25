# Traceability Matrix

This matrix maps implemented specs to features, checks, and evidence commands. It intentionally separates mocked-provider UI evidence from local Solidity contract evidence.

| Spec                                          | Feature                            | Primary Files                                                                                                     | Automated Evidence                                                                                    | Commands                                                                       |
| --------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `docs/specs/0002-phase-1-project-skeleton.md` | Project skeleton and local tooling | `package.json`, `tests/skeleton.test.mjs`, config files                                                           | package manager, exact versions, local-only config, secret guardrails                                 | `corepack yarn test`, `corepack yarn verify`                                   |
| `docs/specs/0003-wallet-connect.md`           | Wallet Connect                     | `lib/wallet.ts`, `components/wallet-connect-panel.tsx`, `tests/wallet.test.ts`, `e2e/wallet-connect.spec.ts`      | mocked provider connect, wrong chain, missing provider, rejected request, disconnect, address display | `corepack yarn test`, `corepack yarn test:e2e`                                 |
| `docs/specs/0004-test-token-faucet.md`        | Test Token Faucet                  | `contracts/ChainLabTestToken.sol`, `contracts/ChainLabFaucet.sol`, `lib/faucet.ts`, `components/faucet-panel.tsx` | local token metadata, claim behavior, inventory reduction, empty faucet, UI balance update            | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0006-nft-mint.md`                 | NFT Mint                           | `contracts/ChainLabLocalNft.sol`, `lib/nft.ts`, `components/nft-mint-panel.tsx`                                   | local metadata, ownership, token URI, missing token, UI mint display                                  | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0007-dao-voting.md`               | DAO Voting                         | `contracts/ChainLabDaoVoting.sol`, `lib/dao.ts`, `components/dao-voting-panel.tsx`                                | seeded proposal, yes/no votes, duplicate vote, invalid proposal, UI vote totals                       | `corepack yarn test`, `corepack yarn test:contracts`, `corepack yarn test:e2e` |
| `docs/specs/0008-qa-documentation.md`         | QA Documentation                   | `docs/qa/`                                                                                                        | documentation coverage, local evidence template, exploratory and defect examples                      | `corepack yarn prettier --check docs/qa/*.md`                                  |

## Evidence Types

| Evidence Type                    | What It Proves                                            | What It Does Not Prove                                    |
| -------------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Node tests                       | deterministic local helper behavior and policy guardrails | live wallet extension behavior                            |
| Solidity tests                   | local Hardhat contract behavior, events, and reverts      | deployed testnet or mainnet behavior                      |
| Playwright mocked-provider tests | browser UI flow with controlled provider behavior         | real wallet popups, real signatures, public RPC behavior  |
| Manual exploratory notes         | human observations and usability risks                    | repeatable automated coverage unless converted into tests |
| Evidence report template         | structured record of a verification run                   | CI artifact generation before Phase 7                     |

## Maintenance Rules

- Add one row when a new feature spec is implemented.
- Update command references when package scripts change.
- Do not mark optional testnet validation as covered unless a future spec approves and documents it.
- Do not use real private keys, seed phrases, mnemonics, API keys, production wallets, mainnet, or real funds as evidence.
