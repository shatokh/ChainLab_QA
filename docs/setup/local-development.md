# Local Development

## Scope

This page describes the Phase 1 skeleton only. It does not document product features, smart contract behavior, wallet flows, testnet deployment, or CI.

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

## Local Web3 Defaults

The default Web3 target is a local Hardhat simulated network. Optional testnet validation is out of scope for Phase 1 and must be specified separately before use.
