# ChainLab QA

ChainLab QA is a local-first Web3 QA Automation playground built with TypeScript, Next.js, Solidity, Hardhat, Playwright, and a controlled AI-assisted engineering workflow.

The project demonstrates how a small Web3 product surface can be specified, implemented, tested, documented, and reviewed with explicit evidence boundaries.

## Why This Project Exists

Web3 applications combine frontend state, wallet state, RPC behavior, smart contracts, transaction lifecycles, and chain configuration. ChainLab QA exists to make those risks inspectable in a portfolio-sized project.

The repository uses a spec-first workflow so changes are auditable instead of ad hoc. Every substantial implementation is expected to have a spec, tests, verification evidence, an AI Change Record, and documented uncertainty.

## Implemented Local Modules

- Wallet Connect: mocked local wallet connection, disconnect, account display, chain detection, wrong-chain handling, missing-provider handling, and rejected-request handling.
- Test Token Faucet: local ERC-20-style test token behavior, faucet inventory, faucet claims, balance display, empty-faucet handling, and zero-address contract rejection.
- NFT Mint: local NFT metadata, minting behavior, ownership checks, token URI display, missing-token handling, and UI state updates.
- DAO Voting: seeded proposal display, yes/no voting, duplicate-vote rejection, invalid-proposal handling, local vote totals, and UI state updates.
- QA Documentation: test plan, traceability matrix, exploratory charters, defect examples, and evidence report template.
- Evidence Reports: local CI evidence artifact design and static local HTML evidence report generation.

## Local-first And Free-only Policy

ChainLab QA is designed to run without real money. The default Web3 environment for implementation and automated verification is local Hardhat behavior plus mocked-provider browser flows.

Mainnet usage is prohibited. Real funds and production wallets must not be used. Testnet usage is optional, deferred, and must use free faucet funds only if a future spec approves it.

Paid RPC, paid hosting, paid deployment dashboards, and paid tooling are not required. Public or free-tier RPC providers may be considered later only for optional public testnet validation through a separate approved spec. Real private keys, seed phrases, mnemonics, and API keys must never be committed or shared with agents.

## Verification

Install from the committed Yarn lockfile:

```bash
corepack yarn install --immutable
```

Run the local verification gate:

```bash
corepack yarn verify
```

Run mocked-provider browser E2E:

```bash
corepack yarn test:e2e
```

Run checks individually:

```bash
corepack yarn typecheck
corepack yarn lint
corepack yarn test
corepack yarn test:contracts
corepack yarn format:check
```

Generate the local HTML evidence report:

```bash
corepack yarn evidence:local
```

Open the generated report:

```bash
corepack yarn evidence:open
```

The report is written to:

```text
reports/local-evidence-report.html
```

Generated reports are ignored by Git.

## Evidence Map

- QA overview: `docs/qa/README.md`
- Test plan: `docs/qa/test-plan.md`
- Traceability matrix: `docs/qa/traceability-matrix.md`
- Evidence template: `docs/qa/evidence-report-template.md`
- Local runbook: `docs/setup/local-app-runbook.md`
- Portfolio review guide: `docs/portfolio/README.md`
- AI change records: `docs/ai-change-records/`
- Failure analyses: `docs/failure-analyses/`

## Reviewer Checklist

- Read the portfolio guide: `docs/portfolio/README.md`.
- Confirm local-first boundaries in this README and `docs/architecture.md`.
- Inspect implemented coverage in `docs/qa/traceability-matrix.md`.
- Run `corepack yarn verify`.
- Run `corepack yarn test:e2e`.
- Generate local evidence with `corepack yarn evidence:local`.
- Confirm any evidence is labeled as local Hardhat or mocked-provider evidence.
- Confirm no mainnet, real funds, production wallets, paid services, or secrets are required.

## AI-Assisted Development Workflow

All substantial changes follow the repository governance model:

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

Status: Phase 9, Portfolio Polish.

Completed local phases:

1. Repository governance and AI agent rules.
2. Project skeleton.
3. Wallet Connect.
4. Test Token and Faucet.
5. NFT Mint.
6. DAO Voting.
7. QA documentation.
8. CI/CD and evidence reports.
9. Optional testnet readiness documentation.

In progress:

- Portfolio polish: README evidence, architecture clarity, and reviewer-facing documentation.

Deferred:

- Optional public testnet deployment is Phase 10 and may be reconsidered after portfolio polish. It is not required for local development, CI, or automated verification.

## What This Project Does Not Claim

- Local Hardhat evidence is not public testnet evidence.
- Mocked-provider E2E evidence is not live wallet extension evidence.
- CI evidence is not production validation.
- Optional testnet readiness is not a deployed public contract.
- No mainnet validation is planned.
- No real funds or production wallet are used.
