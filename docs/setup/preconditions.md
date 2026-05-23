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

