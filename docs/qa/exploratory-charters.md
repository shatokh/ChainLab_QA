# Exploratory Testing Charters

Use these charters for short, focused manual sessions. Keep sessions local-first and record findings with evidence. No real wallet, real funds, mainnet, paid RPC, or paid hosting is required.

## Charter 1: Wallet Provider States

Mission:

- Explore wallet connection states and messaging.

Areas:

- Initial disconnected state.
- Mocked local provider connected state.
- Missing provider state.
- Wrong-chain state through test helper changes only.
- Rejected request state through mocked provider behavior.

Risks:

- UI can imply a real wallet is connected when only a mocked provider is used.
- Chain labels can hide local/testnet/mainnet boundaries.

Evidence:

- Browser screenshot or short notes.
- Command used, usually `corepack yarn test:e2e`.
- Commit SHA or local branch.

## Charter 2: Test Token Faucet

Mission:

- Explore faucet balance and user balance display after local token requests.

Areas:

- Initial zero user balance.
- One successful faucet request.
- Repeated requests if UI allows them.
- Missing-provider disabled state.
- Empty-faucet behavior at state-helper level.

Risks:

- UI can overstate mocked state as a live on-chain transfer.
- Balance labels can be unclear about CLT being valueless and local-only.

Evidence:

- `corepack yarn test`
- `corepack yarn test:contracts`
- `corepack yarn test:e2e`
- Notes on display text and disabled actions.

## Charter 3: NFT Mint

Mission:

- Explore local NFT mint display, ownership, and metadata messaging.

Areas:

- Initial collection metadata.
- Minted token ID.
- Owner address display.
- Local token URI display.
- Missing-provider disabled state.

Risks:

- Local token URI can be mistaken for external metadata hosting.
- Mocked UI mint can be mistaken for a live browser-to-contract transaction.

Evidence:

- `corepack yarn test`
- `corepack yarn test:contracts`
- `corepack yarn test:e2e`
- Notes on token ID, owner, and token URI display.

## Charter 4: DAO Voting

Mission:

- Explore local DAO proposal display, vote action, and result totals.

Areas:

- Seeded proposal title and description.
- Yes vote path.
- No vote path through unit tests or a scoped UI variation.
- Duplicate-vote state through unit tests.
- Missing-provider disabled state.

Risks:

- Local vote totals can be mistaken for real governance.
- Duplicate-vote protection can be hidden if only happy path is inspected.

Evidence:

- `corepack yarn test`
- `corepack yarn test:contracts`
- `corepack yarn test:e2e`
- Notes on vote state and total display.

## Charter 5: Documentation And Evidence Integrity

Mission:

- Check whether docs accurately describe local verification evidence.

Areas:

- README and runbook command references.
- Traceability matrix coverage.
- Evidence report template completeness.
- Known limitations and uncertainty classification.

Risks:

- Docs can claim broader validation than local tests provide.
- Generated examples can accidentally look like real secrets.

Evidence:

- File references.
- `corepack yarn prettier --check docs/qa/*.md`
- Notes on unclear wording or stale references.
