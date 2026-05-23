# Architecture

This document describes the intended future architecture. No application code has been created in Phase 0.

## Frontend

The planned frontend is a Next.js application written in TypeScript. It will provide wallet-aware Web3 flows for login, faucet use, NFT minting, and DAO voting.

## Web3 Integration

The planned Web3 integration layer will use `wagmi` and `viem` for wallet connection, contract reads and writes, chain configuration, and typed interaction with deployed contracts.

## Smart Contracts

Smart contracts will be written in Solidity. Planned contracts include a test token, a faucet, an NFT minting contract, and a simple DAO voting contract.

## Contract Development

Hardhat is the planned development and testing environment for Solidity contracts. The local Hardhat network is the default chain for implementation and automated verification so development and QA can run without real funds, production wallets, paid RPC, or unstable public networks.

## E2E Testing

Playwright is the planned E2E framework. Future tests should cover user-visible flows, wallet interaction strategy, transaction state behavior, negative paths, and regression coverage.

## CI/CD

GitHub Actions is the planned CI provider. Future workflows should run formatting, linting, unit tests, smart contract tests, integration checks, Playwright tests where practical, and evidence collection.

## Network Strategy

The project will use a local Hardhat network first. Optional Sepolia or Base Sepolia deployment may be added later only with explicit specs, free faucet funds, documented risks, and separate verification evidence. Mainnet is prohibited.

Paid RPC providers are not required. Any external RPC used later must be optional, configurable, and documented through placeholders only. `.env.example` may document variable names, but real private keys, seed phrases, mnemonics, API keys, or RPC credentials must not be stored in the repository.
