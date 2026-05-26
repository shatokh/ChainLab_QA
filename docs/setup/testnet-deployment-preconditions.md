# Testnet Deployment Preconditions

Use this document before any future optional public testnet deployment work. Testnet validation is optional, deferred until after portfolio polish, and must remain separate from local Hardhat verification.

## Current Status

Phase 8 is readiness-only. No deployment script, testnet package command, real RPC value, wallet private key, faucet transaction, or public contract address is required for local development.

## Default Environment

- Local Hardhat remains the default environment.
- `corepack yarn verify` and `corepack yarn test:e2e` must not require testnet access.
- CI must not require a wallet, faucet funds, paid RPC, or testnet credentials by default.

## Manual Actions Before Future Optional Deployment

Before a future optional public deployment task starts, the user must:

1. Select one initial testnet, such as Sepolia or Base Sepolia.
2. Create a separate test-only wallet.
3. Fund that wallet only with free faucet funds.
4. Decide whether to use a public RPC endpoint or a free-tier RPC provider.
5. Keep all secrets outside Git and outside chat.

## Explicitly Prohibited

- Mainnet.
- Real funds.
- Production wallets.
- Paid RPC requirements.
- Paid hosting requirements.
- Paid deployment dashboards.
- Paid reporting services.
- Committed `.env` files.
- Committed private keys, seed phrases, mnemonics, API keys, RPC tokens, or wallet exports.
- Asking a user to paste secrets into chat.

## Allowed Later With An Approved Spec

- `.env.example` placeholders, such as `TESTNET_RPC_URL=` and `TESTNET_DEPLOYER_PRIVATE_KEY=`.
- A local deployment script that requires explicit testnet selection.
- Optional public/free-tier RPC configuration.
- Optional free faucet funds.
- Testnet evidence that clearly identifies the network and limitations.

## Evidence Rules

Any future testnet evidence must record:

- selected testnet;
- date;
- commit;
- command used;
- contract address;
- transaction hash if available;
- RPC source category: public or free-tier;
- confirmation that no real funds, mainnet, production wallet, or paid service was used;
- known limitations and uncertainty classification.

Testnet evidence must not replace local evidence. It is additional optional validation only.

## Security Rules

- Never commit real secrets.
- Never commit screenshots that expose wallet secrets, browser extension recovery phrases, API keys, or full private configuration.
- Never store a real private key in docs, specs, AI Change Records, generated reports, or CI artifacts.
- Use a disposable test wallet only.
- Stop and create a failure analysis if network behavior, wallet state, or transaction status is unclear.
