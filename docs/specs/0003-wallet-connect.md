# Spec 0003: Wallet Connect

## Goal

Define the Phase 2 Wallet Connect scope for ChainLab QA: local-first wallet connection, disconnect, account display, chain detection, and basic negative states without using real funds, mainnet, paid infrastructure, or production wallets.

## Context

Phase 1 created a local-first TypeScript, Next.js, Hardhat, and Playwright skeleton. Phase 2 is the first user-facing Web3 workflow. Wallet connection is a high-risk Web3 QA surface because state can be controlled by the browser wallet, provider availability, chain configuration, rejected requests, and stale sessions.

The repository policy still applies:

- Local Hardhat network is the default environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, and paid tooling are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 2 implementation may include:

- Wallet connection UI for a local-only development flow.
- Disconnect action.
- Connected account display with shortened address formatting.
- Active chain display.
- Local Hardhat chain ID handling for `31337`.
- Wrong-chain state when the active chain is not the local development chain.
- Provider-unavailable state when no injected provider or mocked provider is available.
- User-rejected connection state.
- Basic accessibility labels and keyboard-friendly controls.
- Deterministic local tests for connection, disconnection, account display, chain display, wrong chain, rejected request, and missing provider.
- Playwright coverage using a mocked provider strategy first.
- Documentation for local wallet/provider testing.

The implementation should prefer local mocked provider flows for automated verification before any real browser wallet work. A real test wallet may be used later for manual exploratory testing only if documented and kept separate from automated verification.

## Out of Scope

- Mainnet usage.
- Testnet deployment or testnet smoke tests.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Paid RPC, paid hosting, or paid wallet tooling.
- Faucet, NFT Mint, DAO Voting, or other product modules.
- Smart contract deployment or contract behavior.
- Transaction signing beyond a basic connection request.
- Persisted auth/session system.
- CI workflows.
- Git commit.

## Affected Files

Expected future implementation files may include:

- `package.json`
- `yarn.lock`
- `app/`
- `components/`
- `lib/`
- `tests/`
- `e2e/`
- `docs/setup/local-development.md`
- `docs/testing-strategy.md`
- `docs/specs/0003-wallet-connect.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0003-wallet-connect.md`
- `docs/ai-change-records/0004-wallet-connect-spec.md`

## Expected Behavior

When implemented later, the app should expose a local-first wallet connection surface. A user should be able to initiate connection, see the connected account and active chain, disconnect, and see clear states for missing provider, wrong chain, and rejected connection.

Automated verification should not require a real wallet. Tests should use a deterministic mocked provider or equivalent local test harness. Any future manual wallet testing must use a disposable test wallet only and must not require real money.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0003-wallet-connect.md` exists.
- `docs/ai-change-records/0004-wallet-connect-spec.md` exists.
- No wallet code, dependencies, package changes, product implementation, tests, CI workflows, remote, or commit are created.

For a future Phase 2 implementation task:

- A failing test is written before implementation.
- Wallet connection UI exists and remains local-first.
- Connect action handles a successful mocked provider connection.
- Disconnect action clears connected wallet state.
- Connected account is displayed in shortened form.
- Active chain ID or chain label is displayed.
- Local Hardhat chain ID `31337` is treated as the expected local chain.
- Wrong-chain state is covered by tests.
- Missing-provider state is covered by tests.
- User-rejected connection state is covered by tests.
- Automated tests do not require a real wallet.
- Playwright tests use mocked provider behavior before any real wallet strategy.
- No mainnet configuration is enabled.
- No real funds, production wallets, paid RPC, paid hosting, or paid tooling are required.
- No real secrets are committed.
- Dependency metadata and audit results are checked and recorded if new dependencies are added.
- Documentation explains local wallet/provider verification.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Check that no out-of-scope implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 2 implementation task:

- Add or update failing tests first.
- Use deterministic mocked provider tests for wallet connection behavior.
- Cover success, disconnect, wrong chain, missing provider, and rejected connection.
- Add Playwright coverage only with a controlled mocked provider strategy.
- Run `corepack yarn verify`.
- Run dependency audit if dependencies are added or changed.
- Verify no mainnet, real-fund, paid-service, production-wallet, or secret requirement was introduced.

## Risks

- Browser wallet state can make tests flaky if real wallet state is used too early.
- Provider mocks can become meaningless if they do not model important wallet behavior.
- Wallet libraries may add transitive dependencies and supply-chain risk.
- Chain mismatch handling can be incomplete if only the happy path is tested.
- Local-only wallet tests can create false confidence if presented as testnet validation.
- UX can hide important negative states such as missing provider or rejected connection.

## Uncertainty Classification

Medium. The target behavior is clear, but exact library versions, provider mocking strategy, and test harness details must be verified during implementation.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] Automated wallet tests do not require a real wallet.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Paid infrastructure requirements are avoided.
- [x] Production wallet assumptions are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Optional external services are clearly marked optional.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
