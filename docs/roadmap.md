# Roadmap

## Phase 0: Repository Governance & AI Agent Rules

Create the documentation-first foundation, AI operating rules, initial spec, and initial AI Change Record.

## Phase 1: Project Skeleton

Create the TypeScript project structure, package management setup, linting, formatting, baseline test commands, and framework placeholders only after a spec is approved. Keep all defaults local and free.

## Phase 2: Wallet Connect

Implement wallet connection, disconnect, account display, chain detection, and basic negative states.

## Phase 3: Test Token + Faucet

Implement a test ERC-20 contract, faucet behavior, balance display, and related tests on a local Hardhat network first.

## Phase 4: NFT Mint

Implement a test NFT contract, minting UI, transaction status, ownership checks, and metadata display on a local Hardhat network first.

## Phase 5: DAO Voting

Implement a simple voting contract and frontend flow for proposal display, voting, and result verification on a local Hardhat network first.

## Phase 6: QA Documentation

Create test plans, traceability notes, exploratory testing charters, and defect examples.

## Phase 7: CI/CD and Evidence Reports

Add GitHub Actions workflows, automated verification gates, and generated evidence artifacts.

## Phase 8: Optional Testnet Readiness

Document optional testnet deployment requirements, manual preconditions, risks, and evidence boundaries while keeping the project maximally local-first. No public deployment is required in this phase.

Mainnet deployment is explicitly out of scope for this project.

## Phase 9: Portfolio Polish

Improve README evidence, screenshots, architecture diagrams, and review-ready documentation.

## Phase 10: Optional Public Testnet Deployment

After portfolio polish, reconsider whether a single public testnet deployment is worth adding. If approved by a future spec, deploy one selected contract to one selected public testnet, such as Sepolia or Base Sepolia, using a separate test-only wallet, free faucet funds only, configurable public/free-tier RPC, and clearly labeled optional testnet evidence. This phase remains optional and must not become required for local development, CI, or automated verification.
