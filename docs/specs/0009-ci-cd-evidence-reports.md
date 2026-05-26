# Spec 0009: CI/CD And Evidence Reports

## Goal

Define the Phase 7 CI/CD and Evidence Reports scope for ChainLab QA: local-first GitHub Actions verification, repeatable evidence capture, and review-ready reporting without requiring paid infrastructure, testnet, mainnet, real funds, production wallets, or secrets.

## Context

Phase 7 follows the roadmap item "CI/CD and Evidence Reports". Phase 6 added QA documentation and a manual evidence report template. The next implementation phase should turn the local verification workflow into a CI-ready process while preserving the repository's local-first and free-only policy.

The repository policy still applies:

- Local Hardhat network is the default Web3 verification environment.
- Real funds are prohibited.
- Mainnet is prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, paid reporting tools, and paid CI services are not required.
- Testnet validation is optional and later only.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed.

## Scope

Future Phase 7 implementation may include:

- A GitHub Actions workflow that runs local verification commands on pull requests and main branch pushes.
- A CI job for dependency installation with `corepack yarn install --immutable`.
- A CI job or steps for `corepack yarn verify`.
- Optional CI execution of `corepack yarn test:e2e` if browser setup remains stable and free.
- Local-only Hardhat Solidity test execution through existing scripts.
- Evidence report generation or checked-in templates that summarize command results.
- Uploading local verification artifacts from CI if they contain no secrets and require no paid services.
- Documentation that explains how CI evidence differs from local manual evidence.
- Runbook updates for reading CI results and collecting local fallback evidence.

The implementation must keep CI self-contained, local-first, and free-tier compatible.

## Out of Scope

- Product code changes.
- Contract changes.
- UI changes.
- Feature test behavior changes.
- Dependency additions unless a future implementation spec justifies them.
- Paid CI runners or paid reporting services.
- Paid RPC, paid hosting, paid browser services, or paid test management systems.
- Testnet deployment or testnet smoke tests.
- Mainnet usage.
- Real funds.
- Production wallets.
- Real private keys, seed phrases, mnemonics, or API keys.
- Public artifact uploads that include secrets, wallet data, private environment values, or misleading production claims.
- Git commit.

## Affected Files

Expected future implementation files may include:

- `.github/workflows/`
- `docs/qa/evidence-report-template.md`
- `docs/qa/traceability-matrix.md`
- `docs/setup/local-app-runbook.md`
- `docs/testing-strategy.md`
- `docs/risks.md`
- `docs/specs/0009-ci-cd-evidence-reports.md`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0009-ci-cd-evidence-reports.md`
- `docs/ai-change-records/0015-ci-cd-evidence-reports-spec.md`

## Expected Behavior

When implemented later, CI should run the same local verification commands that contributors can run on their machines. A reviewer should be able to inspect the workflow result and understand:

- which commands ran;
- whether local typecheck, lint, node tests, Solidity tests, and format checks passed;
- whether Playwright E2E was included;
- which evidence artifacts were produced;
- which validations were intentionally not performed.

CI evidence must not be described as testnet, mainnet, live wallet, production, or paid-infrastructure validation.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0009-ci-cd-evidence-reports.md` exists.
- `docs/ai-change-records/0015-ci-cd-evidence-reports-spec.md` exists.
- The spec clearly states local-first, free-only, no mainnet, no real funds, no production wallet, and no secrets constraints.
- The spec clearly keeps workflow implementation out of scope for this task.
- No `.github/workflows`, product code, dependencies, package changes, tests, CI implementation, generated evidence artifacts, remote, or commit are created.

For a future Phase 7 implementation task:

- CI workflow exists and uses free GitHub-hosted runner defaults or another free approved runner strategy.
- CI installs dependencies with `corepack yarn install --immutable`.
- CI runs `corepack yarn verify`.
- CI does not require real wallets, real funds, paid RPC, paid hosting, paid reporting tools, testnet, or mainnet.
- CI does not require committed secrets.
- If Playwright E2E runs in CI, browser setup is documented and uses free local browser binaries.
- Evidence output clearly labels local Hardhat, mocked-provider UI, and not-validated areas.
- Evidence artifacts, if uploaded, contain no secrets and no misleading production/testnet claims.
- Docs explain how to interpret CI results and collect local fallback evidence.
- AI Change Record for implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Search the spec for local-first/free-only constraints and CI out-of-scope boundaries.
- Check that no workflow or implementation files were created by this task.
- Review current changes against this spec.

For a future Phase 7 implementation task:

- Add or update workflow files only after this spec is approved.
- Validate workflow syntax where possible.
- Run `corepack yarn verify` locally before relying on CI.
- Run `corepack yarn test:e2e` locally if CI includes E2E.
- Review generated evidence output for secrets and misleading claims.
- Confirm no mainnet, real-fund, paid-service, production-wallet, external RPC, or secret requirement was introduced.

## Risks

- CI can drift from local verification if it uses different commands.
- Playwright browser installation can become flaky in CI if browser setup is not pinned to free local binaries.
- Evidence artifacts can overstate local mocked-provider evidence as live wallet, testnet, or production validation.
- CI can accidentally require secrets, paid services, or external RPC if future changes are not scoped.
- Artifact uploads can expose environment values or misleading reports if not reviewed.
- CI failures can be misdiagnosed as product bugs when they are runner or cache issues.

## Uncertainty Classification

Medium. The intended local CI workflow is clear, but GitHub Actions runtime behavior, browser setup stability, and artifact strategy must be verified during implementation.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] Workflow implementation is not created during spec-authoring.
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
