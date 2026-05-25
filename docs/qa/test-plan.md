# Test Plan

## Goal

Define the local QA approach for ChainLab QA across implemented Web3 practice flows: Wallet Connect, Test Token Faucet, NFT Mint, and DAO Voting.

## Scope

- Local automated verification.
- Mocked-provider Playwright E2E flows.
- Node tests for deterministic local state helpers.
- Hardhat Solidity tests for local contract behavior.
- Manual exploratory charters for behavior that is useful to inspect but not yet automated.
- Documentation evidence for local verification runs.

## Out of Scope

- Mainnet validation.
- Real funds.
- Production wallets.
- Paid RPC, paid hosting, paid reporting tools, or paid test management systems.
- Testnet validation unless a future approved spec explicitly adds it.
- CI-generated artifacts until Phase 7.

## Test Layers

### Smart Contract Tests

Command:

```bash
corepack yarn test:contracts
```

Purpose:

- Verify local contract metadata, state changes, events, and revert paths.
- Cover Faucet, NFT Mint, and DAO Voting contracts on local Hardhat only.

Evidence boundary:

- Passing contract tests prove local Solidity behavior.
- They do not prove deployed testnet behavior or browser-to-contract transaction wiring.

### Node Tests

Command:

```bash
corepack yarn test
```

Purpose:

- Verify deterministic wallet, faucet, NFT, DAO, and project-skeleton helper behavior.
- Keep automated checks independent from real browser wallet state.

Evidence boundary:

- Passing node tests prove local logic and guardrails.
- They do not prove live wallet extension behavior.

### Playwright E2E Tests

Command:

```bash
corepack yarn test:e2e
```

Purpose:

- Verify the user-facing local flow through the browser with a mocked wallet provider.
- Cover wallet connection, faucet request, NFT mint, DAO voting, and missing-provider state.

Evidence boundary:

- Passing E2E tests prove mocked-provider UI behavior.
- They do not prove real wallet popups, real signatures, public RPC behavior, or testnet transactions.

### Full Local Verification

Command:

```bash
corepack yarn verify
```

Purpose:

- Run type generation, typecheck, lint, node tests, Solidity tests, and format checks.

Evidence boundary:

- This is the default local verification gate.
- It must not be described as testnet, mainnet, production, or paid-infrastructure validation.

## Feature Coverage

### Wallet Connect

Primary checks:

- Mocked local provider connects successfully.
- Local Hardhat chain ID is recognized.
- Missing provider, wrong chain, rejected request, disconnect, and address formatting are covered.

Primary evidence:

- `tests/wallet.test.ts`
- `e2e/wallet-connect.spec.ts`

### Test Token Faucet

Primary checks:

- Local token metadata is stable.
- Faucet claim transfers local CLT and reduces faucet inventory.
- Zero-address and empty-faucet paths fail.
- UI displays local balance updates through mocked state.

Primary evidence:

- `contracts/TestTokenFaucet.t.sol`
- `tests/faucet.test.ts`
- `e2e/wallet-connect.spec.ts`

### NFT Mint

Primary checks:

- Local NFT metadata is stable.
- Mint assigns ownership and token URI.
- Zero-address and missing-token paths fail.
- UI displays minted token ID, owner, and token URI through mocked state.

Primary evidence:

- `contracts/ChainLabLocalNft.t.sol`
- `tests/nft.test.ts`
- `e2e/wallet-connect.spec.ts`

### DAO Voting

Primary checks:

- Seeded proposal metadata is stable.
- Yes and no votes update totals.
- Duplicate votes, invalid proposals, and zero-address voters fail.
- UI displays proposal details, user vote state, and vote totals through mocked state.

Primary evidence:

- `contracts/ChainLabDaoVoting.t.sol`
- `tests/dao.test.ts`
- `e2e/wallet-connect.spec.ts`

## Manual Exploratory Testing

Manual exploratory work should follow `exploratory-charters.md`. Record observations with:

- environment;
- build or commit;
- steps;
- expected behavior;
- actual behavior;
- evidence;
- uncertainty classification.

Manual checks must remain local-first unless a future approved spec adds optional testnet validation.

## Entry And Exit Criteria

Entry criteria:

- Dependencies installed with `corepack yarn install --immutable`.
- Local commands documented in `docs/setup/local-app-runbook.md`.
- No real wallet, real funds, paid RPC, testnet, or mainnet dependency.

Exit criteria:

- `corepack yarn verify` passes.
- `corepack yarn test:e2e` passes when UI flow evidence is required.
- Evidence is recorded with command output summaries.
- Known limitations and uncertainty are documented.
