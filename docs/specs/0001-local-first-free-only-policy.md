# Spec 0001: Local-First Free-Only Policy

## Goal

Update ChainLab QA documentation and AI agent governance to explicitly require a local-first, free-only development model.

## Context

ChainLab QA is a Web3 QA Automation playground intended for learning, portfolio evidence, and safe experimentation. Web3 projects can accidentally drift toward paid RPC providers, hosted infrastructure, real wallets, real funds, or mainnet references. This repository must make those choices explicitly out of scope unless a future spec separately approves them.

## Scope

- Add a local-first and free-only policy to project documentation.
- Update AI agent governance so future agents default to local Hardhat network and avoid real funds, mainnet, production wallets, paid services, and secrets.
- Clarify that local Hardhat is the default implementation and automated verification environment.
- Clarify that testnet deployment is optional, late-stage, and must use free faucet funds only.
- Create `docs/setup/preconditions.md`.
- Update reusable agent prompts with local-first and free-only constraints.
- Create an AI Change Record for this change.
- Verify expected files exist.
- Run `git status`.
- Review the current diff against this spec.

## Out of Scope

- Product application code.
- Next.js setup.
- Hardhat setup.
- Playwright setup.
- `package.json`.
- Dependencies.
- Smart contracts.
- Tests.
- CI workflows.
- Remote creation.
- Git commit.
- Paid services.
- Mainnet usage.

## Affected Files

- `README.md`
- `AGENTS.md`
- `docs/project-overview.md`
- `docs/roadmap.md`
- `docs/architecture.md`
- `docs/testing-strategy.md`
- `docs/risks.md`
- `docs/setup/preconditions.md`
- `docs/ai-agent/agent-operating-rules.md`
- `docs/ai-agent/anti-patterns.md`
- `docs/ai-agent/verification-gate.md`
- `docs/ai-agent/prompts/implement-feature.md`
- `docs/ai-agent/prompts/fix-bug.md`
- `docs/ai-agent/prompts/failure-analysis.md`
- `docs/ai-agent/prompts/review-diff-against-spec.md`
- `docs/specs/0001-local-first-free-only-policy.md`
- `docs/ai-change-records/0001-local-first-free-only-policy.md`

## Expected Behavior

The repository documentation should make it clear that ChainLab QA is developed and verified locally by default, using the local Hardhat network for Web3 implementation and automated checks. The project must not require real funds, mainnet, production wallets, paid RPC providers, paid hosting, paid tooling, or committed secrets. Optional testnet validation may be added in later phases only through a future spec and free faucet funds.

## Acceptance Criteria

- `README.md` contains a "Local-first and free-only policy" section.
- `AGENTS.md` instructs future agents not to use mainnet, real funds, production wallets, real secrets, or paid services.
- `docs/roadmap.md` places local Hardhat implementation before optional testnet work and states mainnet deployment is out of scope.
- `docs/architecture.md` defaults to local Hardhat and says paid RPC providers are not required.
- `docs/testing-strategy.md` does not require real wallets, real funds, paid RPC, paid hosting, or testnet.
- `docs/risks.md` includes accidental mainnet usage, real funds exposure, secret leakage, paid infrastructure creep, testnet faucet instability, RPC provider dependency, and false confidence from local-only testing.
- `docs/setup/preconditions.md` exists and explains what is required and not required for documentation work, local development, Web3 manual testing, and optional testnet validation.
- `docs/ai-agent/verification-gate.md` includes local-first and free-only checks.
- Reusable prompts include local-first, free-only, no-mainnet, and no-secret constraints where relevant.
- AI Change Record `docs/ai-change-records/0001-local-first-free-only-policy.md` exists.
- No product code, framework scaffold, package manager files, dependencies, tests, CI workflows, remote, or commit are created.

## Test Strategy

No product tests are required because this is a documentation and governance change only. Verification is documentation-focused:

- Run `git status`.
- Verify all expected files exist.
- Confirm `docs/setup/preconditions.md` exists.
- Check that no out-of-scope product, tooling, test, or CI files were created.
- Review the current diff against this spec.

## Risks

- Policy wording may be duplicated across documents.
- Future agents may still need to interpret optional testnet boundaries carefully.
- Local-only verification can create false confidence if later presented as testnet or production evidence.

## Uncertainty Classification

Medium. The documentation policy can be verified locally, but future implementation, wallet automation, testnet validation, and infrastructure choices remain deferred.

## Verification Gate

- [ ] Spec exists.
- [ ] Scope is respected.
- [ ] TDD evidence exists where applicable.
- [ ] Relevant documentation checks are run.
- [ ] No product code, dependencies, package files, tests, CI workflows, remote, or commit are created.
- [ ] Local-first behavior is preserved.
- [ ] Real funds are avoided.
- [ ] Mainnet is avoided.
- [ ] Paid infrastructure requirements are avoided.
- [ ] Secrets are excluded from files and docs.
- [ ] Optional external services are clearly marked optional.
- [ ] AI Change Record exists.
- [ ] Known limitations documented.
- [ ] Uncertainty classified.
- [ ] Final report includes evidence.

