# Testing Strategy

This document defines planned testing layers for future phases. Phase 0 creates documentation only.

Automated tests must run locally by default and must not require real funds, mainnet, paid RPC, paid hosting, paid tooling, or production wallets. The local Hardhat network is the default Web3 verification environment.

## Smart Contract Unit Tests

Smart contract tests will verify contract behavior directly in Hardhat, including state changes, events, permissions, revert cases, and boundary conditions. Contract tests must use a local Hardhat network by default.

## Integration Tests

Integration tests will verify that frontend-facing contract calls, generated artifacts, ABI usage, and local network behavior work together as expected.

## RPC-Level Tests

RPC tests will check chain ID, accounts, balances, block progression, transaction receipts, and error behavior. These tests help isolate infrastructure and network problems from frontend bugs.

## UI Tests

UI tests may cover deterministic rendering and state transitions that do not require full wallet automation.

## Playwright E2E Tests

Playwright tests will validate complete user flows such as wallet connection, faucet usage, NFT minting, and DAO voting. Wallet interaction strategy must be specified before implementation. E2E tests should prefer mocked wallet/provider flows first so local automated verification does not require a real wallet.

Real wallet or testnet smoke tests are optional, later-stage checks only. They must use separate test wallets, free faucet funds, configurable external RPC, and a future approved spec.

## Negative Tests

Negative tests should cover rejected signatures, chain mismatch, failed transactions, pending states, unavailable RPC endpoints, duplicate actions, invalid inputs, and permission failures.

## CI Verification

CI should run repeatable local checks and publish enough evidence to support review. CI must not depend on paid services or unstable external networks by default. Local success must not be presented as testnet validation.

## Manual Exploratory Testing

Manual exploratory testing notes should capture wallet behavior, visual issues, timing problems, and cases not yet automated.
