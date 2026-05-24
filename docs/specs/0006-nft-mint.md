# Spec 0006: NFT Mint

## Goal

Define the Phase 4 NFT Mint scope for ChainLab QA: a local-only test NFT contract, minting workflow, ownership verification, metadata display, transaction-state coverage, and QA automation on the local Hardhat network.

## Context

Phase 4 follows the roadmap item "NFT Mint". The goal is to add a realistic Web3 QA workflow where a local account can mint a valueless NFT, see transaction and ownership state, and verify metadata behavior without using real funds, mainnet, paid infrastructure, or testnet deployment.

Phase 2 Wallet Connect and Phase 3 Test Token + Faucet already define local wallet/provider and local token practice flows. Phase 4 must preserve the same local-first model. If Phase 3 implementation is still uncommitted when Phase 4 implementation begins, the implementation task must either commit Phase 3 first or explicitly document how the working tree will remain separated.

The repository policy still applies:

- Local Hardhat network is the default environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, and paid tooling are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 4 implementation may include:

- A Solidity local test NFT contract with ERC-721-like behavior for local QA practice.
- Contract metadata fields such as collection name, symbol, token URI, and total minted count.
- Mint behavior for a connected or mocked local account.
- Ownership checks for minted token IDs.
- Event emission suitable for verification.
- Local Hardhat Solidity tests for mint success, ownership, metadata, events, and revert cases.
- Node tests for local NFT state helpers if UI state is modeled outside direct contract calls.
- UI for minting an NFT from the local app.
- UI states for idle, minting, success, rejected, failed, wrong chain, missing wallet/provider, sold out or max supply reached if a max supply is implemented, and metadata unavailable.
- Playwright E2E coverage using mocked wallet/provider behavior first.
- Documentation updates for local NFT mint verification and critical path checks.

The implementation must prioritize contract tests and deterministic local tests before UI behavior. Automated tests must run locally and must not require a real wallet.

## Out of Scope

- Mainnet usage.
- Testnet deployment or testnet smoke tests.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Paid RPC, paid hosting, paid NFT storage, paid image hosting, or paid wallet tooling.
- IPFS pinning, Arweave upload, or any external metadata hosting requirement.
- Marketplace integration.
- Royalty logic.
- Real NFT economics.
- Production-grade allowlists, CAPTCHA, anti-bot systems, paid rate limiting, or abuse analytics.
- DAO Voting or later modules.
- CI workflows.
- Git commit.

## Affected Files

Expected future implementation files may include:

- `package.json`
- `yarn.lock`
- `contracts/`
- `hardhat.config.ts`
- `tests/`
- `app/`
- `components/`
- `lib/`
- `e2e/`
- `docs/setup/local-app-runbook.md`
- `docs/testing-strategy.md`
- `docs/specs/0006-nft-mint.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0006-nft-mint.md`
- `docs/ai-change-records/0009-nft-mint-spec.md`

## Expected Behavior

When implemented later, the local NFT Mint flow should let a local account mint a valueless NFT on the local Hardhat network. The user should see mint status, minted token ID, owner address or shortened owner address, and metadata such as collection name, symbol, and token URI or local placeholder metadata.

Contract tests should prove minting, ownership assignment, metadata behavior, event emission, and failure states directly. UI and E2E tests should prove the user-facing flow without requiring a real wallet, real funds, paid RPC, testnet, mainnet, or external metadata hosting.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0006-nft-mint.md` exists.
- `docs/ai-change-records/0009-nft-mint-spec.md` exists.
- The spec clearly states local Hardhat, free-only, no mainnet, no real funds, no production wallet, and no secrets constraints.
- No contracts, NFT code, dependencies, package changes, UI implementation, tests, CI workflows, remote, or commit are created.

For a future Phase 4 implementation task:

- Failing contract tests are written before NFT contract implementation.
- Failing UI or E2E tests are written before frontend implementation.
- Local test NFT contract exists and is clearly valueless/local-only.
- Mint behavior is covered by local Hardhat contract tests.
- Mint event emission is covered by tests.
- Successful mint assigns ownership to the local recipient account.
- Token metadata behavior is covered by tests.
- Failed mint states are covered by tests.
- Wrong-chain state is covered by tests.
- Missing wallet/provider state is covered by tests.
- Minting UI displays minted token ID and owner information after success.
- Automated tests do not require a real wallet.
- No mainnet configuration is enabled.
- No testnet validation is required for local verification.
- No real funds, production wallets, paid RPC, paid hosting, paid NFT storage, or paid tooling are required.
- No real secrets are committed.
- Dependency metadata and audit results are checked and recorded if new dependencies are added.
- Documentation explains local NFT mint setup and verification.
- Local app runbook critical path checks are updated.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Check that no out-of-scope implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 4 implementation task:

- Write failing Hardhat Solidity tests first.
- Cover collection metadata, successful mint, ownership assignment, token URI, event emission, and revert cases.
- Cover local integration behavior for minted token ID and owner verification.
- Add UI tests or Playwright coverage using mocked wallet/provider behavior before real wallet testing.
- Run `corepack yarn verify`.
- Run `corepack yarn test:e2e`.
- Run Hardhat tests on local Hardhat only.
- Run dependency audit if dependencies are added or changed.
- Verify no mainnet, real-fund, paid-service, production-wallet, external metadata-hosting, or secret requirement was introduced.

## Risks

- ERC-721 behavior can be under-specified if ownership, approvals, and metadata are not scoped clearly.
- Pulling NFT helper libraries can add supply-chain risk and must be justified, pinned, and audited.
- Metadata tests can become flaky if they rely on external URLs or hosted assets.
- UI transaction states can become misleading if mocked mint behavior is presented as live contract behavior.
- Provider mocks can hide wallet or chain mismatch behavior.
- Local-only mint success can create false confidence if presented as testnet validation.
- Phase 4 work can accidentally mix with uncommitted Phase 3 changes if the working tree is not cleaned or reviewed first.

## Uncertainty Classification

Medium. The local NFT QA workflow is clear, but the exact contract design, metadata model, dependency choice, and frontend-to-contract strategy must be verified during implementation.

## Verification Gate

- [ ] Spec exists.
- [ ] Scope is respected.
- [ ] TDD or verification-first evidence exists where applicable.
- [ ] Relevant documentation checks are run.
- [ ] Contract tests run on local Hardhat only.
- [ ] Automated NFT tests do not require a real wallet.
- [ ] Local-first behavior is preserved.
- [ ] Real funds are avoided.
- [ ] Mainnet is avoided.
- [ ] Testnet is not required for local verification.
- [ ] Paid infrastructure requirements are avoided.
- [ ] Production wallet assumptions are avoided.
- [ ] External metadata hosting is not required.
- [ ] Secrets are excluded from files and docs.
- [ ] Optional external services are clearly marked optional.
- [ ] AI Change Record exists.
- [ ] Known limitations documented.
- [ ] Uncertainty classified.
- [ ] Final report includes evidence.
