# Local App Runbook

Use this document when starting the app locally, running checks, or doing quick critical path verification. Keep it updated when new phases add commands, modules, or critical flows.

## Safety Rules

- Local Hardhat and mocked providers are the default.
- Do not use mainnet.
- Do not use real funds.
- Do not use a production wallet.
- Do not commit `.env`, private keys, seed phrases, mnemonics, or API keys.
- Do not introduce paid RPC, paid hosting, or paid tooling as a requirement.

## First-Time Setup

Check Node and Corepack:

```bash
node --version
corepack --version
corepack yarn --version
```

Install dependencies from the committed lockfile:

```bash
corepack yarn install --immutable
```

If registry or browser downloads fail with certificate verification errors on this machine, retry with Node's system CA store:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
corepack yarn install --immutable
```

## Start The App

Start the local Next.js app:

```bash
corepack yarn dev
```

Open:

```text
http://127.0.0.1:3000
```

Stop the app with `Ctrl+C` in the terminal that started it.

## Local Verification Commands

Run the full local verification gate:

```bash
corepack yarn verify
```

Run individual checks:

```bash
corepack yarn typecheck
corepack yarn lint
corepack yarn test
corepack yarn test:contracts
corepack yarn format:check
```

Run E2E checks:

```bash
corepack yarn test:e2e
```

Generate the browser-friendly local evidence report:

```bash
corepack yarn evidence:local
```

Open the generated report locally:

```bash
corepack yarn evidence:open
```

Run dependency audit:

```bash
corepack yarn npm audit --all --recursive
```

If audit hits local certificate verification issues, keep TLS verification enabled and use the system CA store:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
corepack yarn npm audit --all --recursive
```

For QA planning, traceability, exploratory testing, defect examples, portfolio review navigation, and local evidence templates, see `docs/qa/README.md` and `docs/portfolio/README.md`.

## CI Evidence

The GitHub Actions workflow `.github/workflows/local-verification.yml` runs the same local verification gate with `corepack yarn verify`, installs Playwright Chromium, runs `corepack yarn test:e2e`, generates `reports/local-evidence-report.html`, and uploads `local-verification-evidence`.

Treat this artifact as local CI evidence only. It is not testnet, mainnet, live wallet, production, paid RPC, or paid hosting validation.

## Manual Full Verification Workflow

The GitHub Actions workflow `.github/workflows/manual-full-verification.yml` is manual-only and uses `workflow_dispatch`. It does not run on push, pull request, schedule, or any automatic trigger.

It separates verification into jobs for static checks, node tests, Solidity contract tests, mocked-provider E2E tests, and local evidence generation. The uploaded `manual-full-verification-evidence` artifact is retained for one day.

Treat this artifact as local evidence only. It is not testnet, mainnet, live wallet, production, paid RPC, or paid hosting validation.

## Playwright Browser Setup

If E2E tests report a missing browser binary, install Chromium locally:

```bash
corepack yarn playwright install chromium
```

If the browser download hits local certificate verification issues:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
corepack yarn playwright install chromium
```

## Hardhat Commands

Check Hardhat is available:

```bash
corepack yarn hardhat --help
```

Run local Solidity contract tests:

```bash
corepack yarn test:contracts
```

Start a local Hardhat node only when a future feature requires it:

```bash
corepack yarn hardhat node --network localHardhat
```

Do not connect this project to mainnet.

## Critical Path Test Cases

Keep this list short and update it as features are added.

### CP-001: App Starts Locally

- Preconditions: dependencies installed with `corepack yarn install --immutable`.
- Steps:
  1. Run `corepack yarn dev`.
  2. Open `http://127.0.0.1:3000`.
- Expected result: the ChainLab QA page loads and shows the Wallet Connect panel.
- Automation: covered indirectly by `corepack yarn test:e2e`.

### CP-002: Wallet Connect With Mocked Local Provider

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test:e2e`.
- Expected result: mocked provider connects, account is displayed as `0x1234...5678`, and chain is `Local Hardhat (31337)`.
- Automation: `e2e/wallet-connect.spec.ts`.

### CP-003: Missing Wallet Provider State

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test:e2e`.
- Expected result: the app shows `No wallet provider found.` when no provider is injected.
- Automation: `e2e/wallet-connect.spec.ts`.

### CP-004: Wallet State Unit Coverage

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test`.
- Expected result: mocked wallet unit tests cover connect, disconnect, wrong chain, missing provider, rejected request, and address formatting.
- Automation: `tests/wallet.test.ts`.

### CP-005: Local Verification Gate

- Preconditions: dependencies installed.
- Steps:
  1. Run `corepack yarn verify`.
- Expected result: typecheck, lint, node tests, Solidity contract tests, and format check pass.
- Automation: package script `verify`.

### CP-006: Local HTML Evidence Report

- Preconditions: dependencies installed.
- Steps:
  1. Run `corepack yarn evidence:local`.
  2. Open `reports/local-evidence-report.html`.
- Expected result: the static report shows command evidence, status cards, local-first boundaries, known limitations, and uncertainty classification.
- Automation: `tests/evidence-report.test.mjs`.

### CP-007: Test Token Faucet Contract

- Preconditions: dependencies installed.
- Steps:
  1. Run `corepack yarn test:contracts`.
- Expected result: local Solidity tests prove token metadata, faucet claim, faucet inventory reduction, zero-address rejection, and empty-faucet rejection.
- Automation: `contracts/TestTokenFaucet.t.sol`.

### CP-008: Test Token Faucet UI

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test:e2e`.
- Expected result: mocked local wallet connects, `Request 100 CLT` updates the user balance to `100 CLT`, and faucet balance becomes `900 CLT`.
- Automation: `e2e/wallet-connect.spec.ts`.

### CP-009: Local NFT Mint

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test:contracts`.
  2. Run `corepack yarn test:e2e`.
- Expected result: local Solidity tests prove NFT metadata, ownership assignment, token URI, zero-address rejection, and missing-token rejection. E2E proves mocked local wallet minting shows `CLNFT #1`, owner address, and `chainlab://local-nft/1`.
- Automation: `contracts/ChainLabLocalNft.t.sol` and `e2e/wallet-connect.spec.ts`.

### CP-010: Local DAO Voting

- Preconditions: no real wallet required.
- Steps:
  1. Run `corepack yarn test:contracts`.
  2. Run `corepack yarn test:e2e`.
- Expected result: local Solidity tests prove seeded proposal metadata, yes/no votes, duplicate-vote rejection, invalid-proposal rejection, and zero-address rejection. E2E proves mocked local wallet voting records a yes vote and updates yes/total counts.
- Automation: `contracts/ChainLabDaoVoting.t.sol` and `e2e/wallet-connect.spec.ts`.

## When To Update This Runbook

Update this document whenever a phase adds:

- a new startup command;
- a new test command;
- a new required local service;
- a new critical user flow;
- a new manual precondition;
- a new troubleshooting step;
- a new local/testnet boundary.

Add only critical path cases here. Detailed test cases belong in feature specs, test plans, or QA evidence docs.
