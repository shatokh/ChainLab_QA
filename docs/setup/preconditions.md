# Preconditions

## Phase 0: Documentation Only

Phase 0 requires only a local Git repository and the ability to edit Markdown files. A test wallet is not required for documentation work. No real wallet, real money, paid infrastructure, RPC provider, hosting provider, or application runtime is required.

## Phase 1: Local Project Skeleton

Phase 1 may introduce local project tooling only after a separate approved spec. Any project skeleton must remain local-first and free-only by default.

## Local Development Requirements

Future local development is expected to use:

- A local machine.
- Node.js and a package manager only after a future spec approves the project skeleton.
- Local Hardhat network as the default Web3 chain.
- Local automated verification that does not require real funds, production wallets, paid RPC, paid hosting, or paid tooling.

## Web3 Manual Testing Requirements

Manual Web3 testing should use local or disposable test-only accounts. A real wallet is not required for local automated testing. A browser wallet strategy must be specified before wallet-dependent manual or E2E work.

## Manual Action Timeline

Use this timeline to know when a manual action may be needed.

| Phase                                | Manual action needed?                                                                                      | Advance notice                                                                                                                                                             |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Phase 0: Documentation               | No.                                                                                                        | No wallet, funds, RPC, hosting, or runtime needed.                                                                                                                         |
| Phase 1: Project Skeleton            | No.                                                                                                        | Local tooling only. No wallet needed.                                                                                                                                      |
| Phase 2: Wallet Connect              | Not for automated tests. Optional later for manual exploratory checks.                                     | If manual wallet testing is requested, create a separate disposable browser profile and a test-only wallet before the manual test session. Do not use a production wallet. |
| Phase 3: Test Token + Faucet         | Not for contract or automated local tests. Optional only if manually testing the UI with a browser wallet. | If manual UI testing is requested, use the same disposable test-only wallet on local Hardhat only. No real money or testnet funds needed.                                  |
| Phase 4: NFT Mint                    | Not for automated local tests. Optional for manual UI checks.                                              | If manual UI testing is requested, use a disposable test-only wallet on local Hardhat only.                                                                                |
| Phase 5: DAO Voting                  | Not for automated local tests. Optional for manual multi-account checks.                                   | If manual checks require multiple voters, create disposable local/test-only accounts. Do not use production wallets.                                                       |
| Phase 6: QA Documentation            | Possibly, only for screenshots or exploratory notes.                                                       | Any screenshot or manual note must identify whether evidence is local, mocked, or optional testnet.                                                                        |
| Phase 7: CI/CD                       | No wallet by default.                                                                                      | CI must not require a real wallet, mainnet, paid RPC, paid hosting, or committed secrets.                                                                                  |
| Phase 8: Optional Testnet Deployment | Yes, only if a future spec approves testnet validation.                                                    | Create a separate test wallet, use free faucet funds only, use configurable public/free-tier RPC, and never commit secrets.                                                |
| Phase 9: Portfolio Polish            | Maybe, only for evidence capture.                                                                          | Keep local/testnet evidence clearly labeled. Mainnet remains prohibited.                                                                                                   |

Before any task that needs a manual wallet, the agent must warn the user before implementation starts and must state:

- why the wallet is needed;
- whether it is for local manual testing or optional testnet validation;
- what network will be used;
- that no real money, production wallet, seed phrase, private key, mnemonic, or API key should be shared or committed.

## Optional Testnet Requirements

Optional testnet validation may be added later only through a future approved spec. It must use:

- A separate test wallet.
- Free faucet funds only.
- Configurable public or free-tier RPC.
- No committed secrets.
- Documentation that separates local verification from testnet evidence.

## Explicitly Not Required

- Real money.
- Mainnet access.
- Production wallets.
- Paid RPC.
- Paid hosting.
- Paid tooling.
- Real private keys, seed phrases, mnemonics, or API keys in the repository.
- Testnet deployment for local verification.

## Security Rules

- Mainnet is prohibited.
- Real funds must not be used.
- Production wallets must not be used.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.
- `.env.example` may document placeholder variable names only.
- Any paid service must be explicitly out of scope unless a future spec separately approves it.
