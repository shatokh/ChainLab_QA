# Spec 0007: DAO Voting

## Goal

Define the Phase 5 DAO Voting scope for ChainLab QA: a local-only proposal and voting contract, frontend voting workflow, result verification, negative-state coverage, and QA automation on the local Hardhat network.

## Context

Phase 5 follows the roadmap item "DAO Voting". The goal is to add a realistic but safe governance QA workflow where local accounts can view a proposal, cast a valueless vote, and verify vote totals without using real funds, mainnet, paid infrastructure, or testnet deployment.

Earlier phases already provide local wallet connection, local test token faucet practice, and local NFT mint practice. DAO Voting should reuse the same local-first and mocked-provider automation model unless a future implementation spec explicitly approves live local contract wiring.

The repository policy still applies:

- Local Hardhat network is the default environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, and paid tooling are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 5 implementation may include:

- A Solidity local DAO voting contract for QA practice.
- A seeded local proposal or simple proposal creation helper for tests.
- Proposal fields such as ID, title, description, yes votes, no votes, status, and total votes.
- Vote casting for a connected or mocked local account.
- One-vote-per-account protection for a proposal.
- Proposal result calculation for yes/no totals.
- Event emission suitable for verification.
- Local Hardhat Solidity tests for proposal setup, successful voting, duplicate-vote rejection, invalid proposal rejection, result totals, and event emission.
- Node tests for local DAO state helpers if UI state is modeled outside direct contract calls.
- UI for displaying proposal details, voting yes/no, and showing updated totals.
- UI states for idle, voting, success, rejected, failed, wrong chain, missing wallet/provider, duplicate vote, invalid proposal, and closed proposal if closure is implemented.
- Playwright E2E coverage using mocked wallet/provider behavior first.
- Documentation updates for local DAO voting verification and critical path checks.

The implementation must prioritize contract tests and deterministic local tests before UI behavior. Automated tests must run locally and must not require a real wallet.

## Out of Scope

- Mainnet usage.
- Testnet deployment or testnet smoke tests.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Paid RPC, paid hosting, paid analytics, paid governance tooling, or paid wallet tooling.
- Token-weighted governance tied to real assets.
- Snapshot, Tally, Governor, Safe, or off-chain governance integrations.
- Production-grade proposal lifecycle, quorum, delegation, timelocks, treasury execution, or admin permissions.
- Real DAO economics or legal governance behavior.
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
- `docs/specs/0007-dao-voting.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0007-dao-voting.md`
- `docs/ai-change-records/0011-dao-voting-spec.md`

## Expected Behavior

When implemented later, the DAO Voting flow should let a local account view a local proposal, cast a yes or no vote, and see updated local vote totals. The user should see proposal details, vote status, whether the connected account has voted, and the current result.

Contract tests should prove proposal setup, one-vote-per-account behavior, vote totals, event emission, and failure states directly. UI and E2E tests should prove the user-facing flow without requiring a real wallet, real funds, paid RPC, testnet, mainnet, or external governance services.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0007-dao-voting.md` exists.
- `docs/ai-change-records/0011-dao-voting-spec.md` exists.
- The spec clearly states local Hardhat, free-only, no mainnet, no real funds, no production wallet, and no secrets constraints.
- No contracts, DAO code, dependencies, package changes, UI implementation, tests, CI workflows, remote, or commit are created.

For a future Phase 5 implementation task:

- Failing contract tests are written before DAO contract implementation.
- Failing UI or E2E tests are written before frontend implementation.
- Local DAO voting contract exists and is clearly valueless/local-only.
- Proposal setup or seeded proposal behavior is covered by local Hardhat contract tests.
- Successful yes and no votes are covered by tests.
- Duplicate voting is rejected and covered by tests.
- Invalid proposal voting is rejected and covered by tests.
- Vote event emission is covered by tests.
- Vote totals and result display are covered by tests.
- Wrong-chain state is covered by tests.
- Missing wallet/provider state is covered by tests.
- Voting UI displays proposal details, user vote state, and updated totals after success.
- Automated tests do not require a real wallet.
- No mainnet configuration is enabled.
- No testnet validation is required for local verification.
- No real funds, production wallets, paid RPC, paid hosting, paid governance tooling, or paid wallet tooling are required.
- No real secrets are committed.
- Dependency metadata and audit results are checked and recorded if new dependencies are added.
- Documentation explains local DAO voting setup and verification.
- Local app runbook critical path checks are updated.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Check that no out-of-scope implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 5 implementation task:

- Write failing Hardhat Solidity tests first.
- Cover proposal metadata, successful yes vote, successful no vote, duplicate-vote rejection, invalid proposal rejection, event emission, and total/result calculation.
- Cover local integration behavior for proposal display, user vote state, and updated totals.
- Add UI tests or Playwright coverage using mocked wallet/provider behavior before real wallet testing.
- Run `corepack yarn verify`.
- Run `corepack yarn test:e2e`.
- Run Hardhat tests on local Hardhat only.
- Run dependency audit if dependencies are added or changed.
- Verify no mainnet, real-fund, paid-service, production-wallet, external governance-service, or secret requirement was introduced.

## Risks

- DAO voting can become too production-like if quorum, delegation, timelocks, treasuries, or execution are added before they are needed.
- Vote logic can be misleading if local mocked UI state is presented as live contract governance.
- Duplicate-vote and invalid-proposal paths can be missed if tests focus only on the happy path.
- Provider mocks can hide wallet or chain mismatch behavior.
- Adding governance helper libraries can introduce supply-chain risk and must be justified, pinned, and audited.
- Local-only voting success can create false confidence if presented as testnet validation.

## Uncertainty Classification

Medium. The local DAO QA workflow is clear, but the exact contract model, proposal lifecycle, state-helper design, and frontend-to-contract strategy must be verified during implementation.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] Contract tests run on local Hardhat only.
- [x] Automated DAO tests do not require a real wallet.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Testnet is not required for local verification.
- [x] Paid infrastructure requirements are avoided.
- [x] Production wallet assumptions are avoided.
- [x] External governance services are not required.
- [x] Secrets are excluded from files and docs.
- [x] Optional external services are clearly marked optional.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
