# Local Development

## Scope

This page summarizes local development requirements. For the command-by-command local app workflow, use `docs/setup/local-app-runbook.md`.

## Requirements

- Node.js `>=22.12.0 <23`.
- Corepack.
- Yarn from the `packageManager` field in `package.json`.
- Local machine access only.

No real funds, production wallets, mainnet, paid RPC, paid hosting, or paid tooling are required.

## Install

Use Yarn through Corepack:

```bash
corepack yarn install --immutable
```

If the lockfile is intentionally updated during a scoped dependency change, run a normal Yarn install first, review the lockfile, then run the immutable install check.

## Local Checks

The canonical command list lives in `docs/setup/local-app-runbook.md`.

```bash
corepack yarn typecheck
corepack yarn lint
corepack yarn test
corepack yarn format:check
corepack yarn verify
```

## Local App

```bash
corepack yarn dev
```

The placeholder app starts locally and does not connect to a wallet, RPC provider, testnet, or mainnet.

## Wallet Connect Checks

Wallet Connect automated checks use mocked providers first. They do not require a real browser wallet.

```bash
corepack yarn test
corepack yarn test:e2e
```

The E2E command starts the local Next.js app, runs Playwright against a mocked wallet provider, and stops the app process after the run.

If Playwright browser binaries are missing, install Chromium locally:

```bash
corepack yarn playwright install chromium
```

In this environment, browser downloads may need Node's system certificate store:

```bash
$env:NODE_OPTIONS='--use-system-ca'; corepack yarn playwright install chromium
```

Do not use a production wallet for manual checks. Manual wallet testing is optional and must use a disposable test-only wallet on local Hardhat only.

## Local Web3 Defaults

The default Web3 target is a local Hardhat simulated network. Optional testnet validation is out of scope for Phase 1 and must be specified separately before use.
