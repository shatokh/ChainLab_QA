# Spec 0008: QA Documentation

## Goal

Define the Phase 6 QA Documentation scope for ChainLab QA: structured test plans, traceability notes, exploratory testing charters, defect examples, and reusable QA evidence templates that document the already implemented local Web3 workflows.

## Context

Phase 6 follows the roadmap item "QA Documentation". The project now has local-first Wallet Connect, Test Token Faucet, NFT Mint, and DAO Voting flows. The next step is to make the QA value explicit through clear test planning and evidence documentation without adding product code, dependencies, CI workflows, testnet deployment, or paid services.

The repository policy still applies:

- Local Hardhat network is the default environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, and paid tooling are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 6 implementation may include:

- A QA documentation index.
- A project-level test plan covering local Web3 QA goals.
- A traceability matrix mapping specs, features, tests, and evidence.
- Exploratory testing charters for Wallet Connect, Faucet, NFT Mint, and DAO Voting.
- Defect report examples for realistic Web3 failure modes.
- Manual test case notes for critical paths that complement `docs/setup/local-app-runbook.md`.
- Evidence report templates for local verification runs.
- Risk-based testing notes for wallet/provider state, local Hardhat behavior, mocked-provider limitations, and contract/UI separation.
- Documentation that clearly distinguishes local automated verification from optional future testnet validation.

The implementation must stay documentation-only unless a future spec separately approves test or tooling changes.

## Out of Scope

- Product code changes.
- Contract changes.
- UI changes.
- Test implementation changes.
- Package script changes.
- Dependency changes.
- CI workflows or GitHub Actions.
- Generated evidence artifacts from CI.
- Testnet deployment or testnet smoke tests.
- Mainnet usage.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Paid RPC, paid hosting, paid reporting tools, paid test management systems, or paid wallet tooling.
- Git commit.

## Affected Files

Expected future documentation files may include:

- `docs/qa/README.md`
- `docs/qa/test-plan.md`
- `docs/qa/traceability-matrix.md`
- `docs/qa/exploratory-charters.md`
- `docs/qa/defect-examples.md`
- `docs/qa/evidence-report-template.md`
- `docs/setup/local-app-runbook.md`
- `docs/testing-strategy.md`
- `docs/risks.md`
- `docs/specs/0008-qa-documentation.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0008-qa-documentation.md`
- `docs/ai-change-records/0013-qa-documentation-spec.md`

## Expected Behavior

When implemented later, Phase 6 should give contributors and portfolio reviewers a clear QA documentation layer. A reader should be able to understand what is tested, why it matters, which automated checks cover each feature, what manual/exploratory checks remain useful, and what evidence should be collected locally.

The documentation should preserve the distinction between:

- verified local behavior;
- mocked-provider UI behavior;
- Solidity contract behavior;
- optional future testnet validation;
- prohibited mainnet/real-fund behavior.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0008-qa-documentation.md` exists.
- `docs/ai-change-records/0013-qa-documentation-spec.md` exists.
- The spec clearly states documentation-only scope.
- The spec clearly states local-first, free-only, no mainnet, no real funds, no production wallet, and no secrets constraints.
- No QA documentation implementation files, product code, dependencies, package changes, tests, CI workflows, remote, or commit are created.

For a future Phase 6 implementation task:

- QA documentation index exists.
- Test plan exists and covers Wallet Connect, Test Token Faucet, NFT Mint, and DAO Voting.
- Traceability matrix maps implemented specs to critical tests and verification commands.
- Exploratory charters exist for implemented Web3 flows.
- Defect examples include wallet/provider, RPC/local-chain, contract/UI mismatch, transaction-state, and AI-assisted workflow examples.
- Evidence report template exists and uses local verification commands.
- Documentation clearly states automated checks do not require real wallets, real funds, paid RPC, paid hosting, testnet, or mainnet.
- Documentation distinguishes mocked-provider UI evidence from Solidity contract evidence.
- Documentation does not introduce real secrets, real wallet setup requirements, paid services, or mainnet assumptions.
- Local app runbook is updated only if critical path wording needs to link to the QA documentation.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Search the spec for documentation-only scope and local-first/free-only constraints.
- Check that no out-of-scope implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 6 implementation task:

- Verify expected QA documentation files exist.
- Search documentation for all implemented modules and required local verification commands.
- Run Prettier checks on changed documentation files.
- Run `git status`.
- Review current changes against this spec.
- Run product verification only if documentation changes alter commands, test references, or critical path claims.

## Risks

- QA docs can drift from implemented behavior if commands or test coverage change.
- Documentation can overstate local mocked-provider evidence as live wallet or live contract integration.
- Defect examples can imply real-fund, mainnet, or production-wallet workflows if boundaries are not explicit.
- Traceability can become too broad and hard to maintain.
- Evidence templates can imply CI or paid reporting tools before Phase 7 approves CI/CD work.
- Generated examples can accidentally include secrets or realistic private key formats.

## Uncertainty Classification

Low. This is a documentation-only phase based on already implemented local workflows, but exact document structure and traceability granularity must be validated during implementation.

## Verification Gate

- [ ] Spec exists.
- [ ] Scope is respected.
- [ ] TDD or verification-first evidence exists where applicable.
- [ ] Relevant documentation checks are run.
- [ ] Documentation-only scope is preserved.
- [ ] Local-first behavior is preserved.
- [ ] Real funds are avoided.
- [ ] Mainnet is avoided.
- [ ] Testnet is not required for local verification.
- [ ] Paid infrastructure requirements are avoided.
- [ ] Production wallet assumptions are avoided.
- [ ] Secrets are excluded from files and docs.
- [ ] Optional external services are clearly marked optional.
- [ ] AI Change Record exists.
- [ ] Known limitations documented.
- [ ] Uncertainty classified.
- [ ] Final report includes evidence.
