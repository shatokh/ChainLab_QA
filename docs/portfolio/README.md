# Portfolio Review Guide

Use this guide to review ChainLab QA quickly without requiring a wallet, real funds, paid infrastructure, mainnet, or public testnet deployment.

## Review Path

1. Read `README.md` for the project summary, implemented modules, verification commands, and evidence map.
2. Read `docs/architecture.md` for the local architecture and module boundaries.
3. Read `docs/qa/traceability-matrix.md` to connect specs, files, tests, and evidence commands.
4. Run local verification with `corepack yarn verify`.
5. Run browser E2E with `corepack yarn test:e2e`.
6. Generate the local HTML evidence report with `corepack yarn evidence:local`.
7. Inspect `reports/local-evidence-report.html`.

## What To Inspect

| Area                | Why It Matters                                                            |
| ------------------- | ------------------------------------------------------------------------- |
| Specs               | Shows scope control, acceptance criteria, risks, and uncertainty handling |
| AI Change Records   | Shows implementation evidence and command history                         |
| Failure Analyses    | Shows how uncertain failures are handled before patching                  |
| Traceability Matrix | Maps implemented behavior to automated evidence                           |
| Local Runbook       | Shows repeatable startup and verification commands                        |
| GitHub Workflow     | Shows CI readiness and local evidence artifact generation                 |

## Implemented Local Evidence

- Node tests cover deterministic helper behavior and local policy guardrails.
- Solidity tests cover local contract behavior for faucet, NFT, and DAO flows.
- Playwright tests cover mocked-provider wallet and UI flows.
- CI workflow captures local verification evidence.
- Static HTML report summarizes local verification boundaries.

## Evidence Boundaries

This project intentionally separates evidence types:

- Local Hardhat evidence does not prove public testnet behavior.
- Mocked-provider E2E evidence does not prove live wallet extension behavior.
- CI evidence does not prove production readiness.
- Optional testnet readiness does not mean a public deployment exists.

## Safety Boundaries

- No mainnet.
- No real funds.
- No production wallets.
- No paid RPC, paid hosting, paid dashboards, or paid reporting services.
- No committed private keys, seed phrases, mnemonics, API keys, wallet exports, or RPC tokens.

## Optional Future Work

After portfolio polish, the project may reconsider one optional public testnet deployment in Phase 10. That work requires a new implementation spec, a separate test-only wallet, free faucet funds, configurable public/free-tier RPC, and clearly labeled optional testnet evidence.
