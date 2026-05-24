# ChainLab QA

ChainLab QA is a planned fullstack Web3 QA Automation playground built with TypeScript and a controlled AI-assisted development workflow. The repository is designed to demonstrate Web3 development basics, test automation, smart contract testing, Playwright E2E testing, RPC and integration testing, CI/CD readiness, and disciplined AI engineering governance.

## Why This Project Exists

Web3 applications combine frontend state, wallet state, RPC behavior, smart contracts, transaction lifecycles, and chain configuration. ChainLab QA exists to provide a focused portfolio project where those flows can be built and tested in a repeatable, evidence-driven way.

This repository intentionally starts with documentation, specs, and agent rules before any application code. The goal is to make future implementation auditable instead of ad hoc.

## Planned Web3 Flows

- Wallet Login: connect a browser wallet, display account and network state, and handle disconnect and chain mismatch cases.
- Test Token Faucet: request local or testnet ERC-20 test tokens and verify balances.
- NFT Mint: mint a test NFT and validate transaction, ownership, metadata, and UI state.
- DAO Voting: create or participate in simple governance proposals and test voting eligibility and results.

## Planned Testing Layers

- Solidity smart contract unit tests.
- Contract and frontend integration tests.
- RPC-level tests for chain ID, block, balance, and transaction behavior.
- UI component and state tests where appropriate.
- Playwright E2E tests for wallet and Web3 user flows.
- Negative tests for rejected signatures, wrong chain, failed transactions, and unavailable RPC.
- CI verification and evidence reports.
- Manual exploratory testing notes.

## Local-first and free-only policy

ChainLab QA is designed to run without real money. The default Web3 environment for implementation and automated verification is a local Hardhat network.

Mainnet usage is prohibited. Real funds and production wallets must not be used. Testnet usage is optional, later-stage work only, and must use free faucet funds.

Paid RPC, paid hosting, and paid tooling are not required by default. Public or free-tier RPC providers may be introduced later only for optional testnet validation through a separate approved spec. Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## AI-Assisted Development Workflow

All substantial changes must follow the repository governance model:

- Spec first.
- No coding-first implementation.
- Forced TDD for behavior changes.
- Failure analysis before uncertain patches.
- Scope lock.
- Diff review against the spec.
- AI Change Record.
- Final report with verification evidence.
- Explicit uncertainty classification.

See `AGENTS.md` and `docs/ai-agent/` for the operating rules.

## Current Project Status

Status: Phase 1, Project Skeleton.

This repository currently contains documentation, process rules, templates, a Yarn-based TypeScript skeleton, a neutral Next.js placeholder app, local-only Hardhat configuration, Playwright configuration, and skeleton verification checks.

It does not yet contain product Web3 features, smart contract behavior, wallet flows, testnet deployment, CI workflows, or production code.

Local baseline checks:

```bash
corepack yarn verify
```

## Roadmap Summary

1. Repository governance and AI agent rules.
2. Project skeleton.
3. Wallet connect.
4. Test token and faucet.
5. NFT mint.
6. DAO voting.
7. QA documentation.
8. CI/CD and evidence reports.
9. Testnet deployment.
10. Portfolio polish.
