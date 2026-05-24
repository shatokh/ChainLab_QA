# Spec 0004: Test Token + Faucet

## Goal

Define the Phase 3 Test Token + Faucet scope for ChainLab QA: a local-only ERC-20 test token, faucet behavior, balance display, and QA coverage on the local Hardhat network.

## Context

Phase 3 follows the roadmap item "Test Token + Faucet". This phase should create a realistic but safe Web3 QA workflow: users can request valueless local test tokens and verify wallet balance changes without using real funds, mainnet, paid infrastructure, or testnet deployment.

Phase 2 Wallet Connect should provide or define the wallet/provider surface used by the faucet UI. If Phase 2 is not implemented yet, Phase 3 implementation must either wait for it or explicitly use a scoped local mocked provider strategy that does not pretend to be production wallet support.

The repository policy still applies:

- Local Hardhat network is the default environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, and paid tooling are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 3 implementation may include:

- A Solidity ERC-20 test token contract for local development.
- A Solidity faucet contract or equivalent local faucet mechanism.
- Local Hardhat deployment or fixture logic for tests.
- Contract unit tests for token and faucet behavior.
- Integration tests that verify local balance changes through contract calls.
- RPC-level checks for local chain ID, account balance, transaction receipt, and event evidence.
- Frontend balance display for the connected or mocked local account.
- Frontend faucet request action.
- UI states for idle, requesting, success, rejected, failed, wrong chain, missing wallet/provider, and faucet empty.
- Negative tests for duplicate or restricted claims if a cooldown or per-account limit is implemented.
- Documentation for local faucet verification.

The implementation must prioritize smart contract unit tests and local integration tests before UI behavior. Automated tests must run on local Hardhat or deterministic mocks and must not require a real wallet.

## Out of Scope

- Mainnet usage.
- Testnet deployment or testnet smoke tests.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Paid RPC, paid hosting, or paid wallet tooling.
- Production faucet protections such as CAPTCHA, anti-bot systems, identity checks, paid rate limiting, or abuse analytics.
- Real token economics.
- NFT Mint, DAO Voting, or other later modules.
- CI workflows.
- Git commit.

## Affected Files

Expected future implementation files may include:

- `package.json`
- `yarn.lock`
- `contracts/`
- `hardhat.config.ts`
- `test/` or `tests/`
- `app/`
- `components/`
- `lib/`
- `e2e/`
- `docs/setup/local-development.md`
- `docs/testing-strategy.md`
- `docs/specs/0004-test-token-faucet.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0004-test-token-faucet.md`
- `docs/ai-change-records/0005-test-token-faucet-spec.md`

## Expected Behavior

When implemented later, the local test token and faucet should let a local account request valueless ERC-20 tokens on the local Hardhat network. The user should see balance before and after a successful faucet request. The app should show clear states for pending request, success, failure, wrong chain, missing wallet/provider, and faucet unavailable or empty.

Contract tests should prove the faucet behavior directly. UI and E2E tests should prove the user-facing flow without requiring a real wallet, real funds, paid RPC, testnet, or mainnet.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0004-test-token-faucet.md` exists.
- `docs/ai-change-records/0005-test-token-faucet-spec.md` exists.
- No contracts, faucet code, dependencies, package changes, UI implementation, tests, CI workflows, remote, or commit are created.

For a future Phase 3 implementation task:

- Failing contract tests are written before contract implementation.
- Failing integration or UI tests are written before frontend implementation.
- ERC-20 test token exists and is clearly valueless/local-only.
- Faucet behavior exists and is covered by contract tests.
- Faucet emits useful events for verification.
- Successful faucet request changes the recipient token balance on local Hardhat.
- Failed faucet request states are covered by tests.
- Wrong-chain state is covered by tests.
- Missing wallet/provider state is covered by tests.
- Faucet-empty or insufficient-balance state is covered by tests if the faucet holds token inventory.
- Balance display updates after a successful local faucet request.
- Automated tests do not require a real wallet.
- No mainnet configuration is enabled.
- No testnet validation is required for local verification.
- No real funds, production wallets, paid RPC, paid hosting, or paid tooling are required.
- No real secrets are committed.
- Dependency metadata and audit results are checked and recorded if new dependencies are added.
- Documentation explains local faucet setup and verification.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Check that no out-of-scope implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 3 implementation task:

- Write failing Hardhat contract tests first.
- Cover token metadata, minting or faucet funding, successful claim, event emission, and revert cases.
- Cover local integration behavior for balance before and after claim.
- Add UI tests or Playwright coverage using mocked wallet/provider behavior before real wallet testing.
- Run `corepack yarn verify`.
- Run Hardhat tests on local Hardhat only.
- Run dependency audit if dependencies are added or changed.
- Verify no mainnet, real-fund, paid-service, production-wallet, or secret requirement was introduced.

## Risks

- Faucet logic can become production-like and expand beyond local QA scope.
- Contract tests can miss important revert paths if only happy-path claims are tested.
- UI balance updates can become flaky if polling or transaction receipt handling is unclear.
- Provider mocks can hide wallet or chain mismatch behavior.
- Adding ERC-20 helper libraries can introduce supply-chain risk and must be audited.
- Local-only faucet success can create false confidence if presented as testnet validation.

## Uncertainty Classification

Medium. The intended local faucet behavior is clear, but exact contract design, token library choices, provider strategy, and UI state model must be verified during implementation.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] Contract tests run on local Hardhat only.
- [x] Automated faucet tests do not require a real wallet.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Testnet is not required for local verification.
- [x] Paid infrastructure requirements are avoided.
- [x] Production wallet assumptions are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Optional external services are clearly marked optional.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
