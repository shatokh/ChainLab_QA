# Spec 0000: Repository Foundation

## Goal

Create the initial repository foundation for ChainLab QA with Git initialization, documentation, process rules, AI governance, a first spec, and a first AI Change Record.

## Context

ChainLab QA is intended to become a fullstack Web3 QA Automation playground. The repository must begin with governance and documentation before product code, framework scaffolding, dependencies, smart contracts, or tests are added.

## Scope

- Initialize Git locally.
- Create a `.gitignore` suitable for TypeScript, Node.js, Next.js, Hardhat, and Playwright.
- Create top-level `README.md`.
- Create `AGENTS.md` as the primary AI agent instruction file.
- Create project documentation under `docs/`.
- Create AI governance documentation and reusable prompts under `docs/ai-agent/`.
- Create this spec under `docs/specs/`.
- Create the first AI Change Record under `docs/ai-change-records/`.
- Verify expected files exist.
- Run `git status`.
- Review the current diff against this spec.

## Out of Scope

- Next.js project creation.
- Hardhat project creation.
- Playwright installation or configuration.
- `package.json`.
- Application code.
- Smart contracts.
- Product tests.
- CI workflows.
- Remote repository creation.
- Git commit.

## Affected Files

- `.gitignore`
- `AGENTS.md`
- `README.md`
- `docs/project-overview.md`
- `docs/roadmap.md`
- `docs/architecture.md`
- `docs/testing-strategy.md`
- `docs/risks.md`
- `docs/ai-agent/agent-operating-rules.md`
- `docs/ai-agent/anti-patterns.md`
- `docs/ai-agent/verification-gate.md`
- `docs/ai-agent/failure-analysis-template.md`
- `docs/ai-agent/change-record-template.md`
- `docs/ai-agent/prompts/implement-feature.md`
- `docs/ai-agent/prompts/fix-bug.md`
- `docs/ai-agent/prompts/failure-analysis.md`
- `docs/ai-agent/prompts/review-diff-against-spec.md`
- `docs/specs/0000-repository-foundation.md`
- `docs/ai-change-records/0000-repository-foundation.md`

## Expected Behavior

The repository should contain a clear documentation and governance foundation. Future agents should be able to understand the project purpose, roadmap, architecture intent, testing strategy, risks, required workflow, reusable prompts, and verification requirements.

## Acceptance Criteria

- Git is initialized locally.
- No Git remote is created.
- `.gitignore` exists and covers common TypeScript, Node.js, Next.js, Hardhat, Playwright, environment, log, editor, and OS artifacts.
- `README.md` explains what ChainLab QA is, why it exists, planned Web3 flows, planned testing layers, AI-assisted development workflow, current status, and roadmap summary.
- `docs/project-overview.md` explains product idea, target audience, portfolio value, and the Wallet Login, Test Token Faucet, NFT Mint, and DAO Voting modules.
- `docs/roadmap.md` includes phases 0 through 9.
- `docs/architecture.md` describes intended Next.js, TypeScript, wagmi, viem, Solidity, Hardhat, Playwright, GitHub Actions, local Hardhat network, and optional Sepolia or Base Sepolia architecture.
- `docs/testing-strategy.md` describes planned smart contract unit, integration, RPC-level, UI, Playwright E2E, negative, CI, and manual exploratory testing.
- `docs/risks.md` includes Web3 and AI-assisted development risks.
- `AGENTS.md` defines spec-first workflow, no coding-first rule, forced TDD, scope lock, failure-analysis mode, verification gate, AI Change Record requirement, final report with evidence, uncertainty classification, and anti-patterns.
- `docs/ai-agent/` contains expanded operating rules, anti-patterns, verification gate checklist, failure analysis template, change record template, and reusable prompts.
- `docs/ai-change-records/0000-repository-foundation.md` exists and records this change.
- No product application code, framework scaffold, `package.json`, dependencies, smart contracts, tests, CI workflows, remote, or commit are created.

## Test Strategy

No product code tests are required for Phase 0. Verification is documentation-focused:

- Run `git status`.
- Verify all expected files exist.
- Review the current diff against this spec.
- Confirm no out-of-scope product files were created.

## Risks

- Documentation may describe future architecture before implementation exists.
- Future agents may ignore governance docs unless `AGENTS.md` is clear.
- A `.gitignore` may need refinement after actual tooling is introduced.

## Uncertainty Classification

Medium. The repository foundation can be verified locally, but future tooling choices and implementation details are intentionally deferred.

## Verification Gate

- [ ] Spec exists.
- [ ] Scope is respected.
- [ ] TDD evidence exists where applicable.
- [ ] Relevant checks are defined or run.
- [ ] No unrelated changes.
- [ ] AI Change Record exists.
- [ ] Known limitations documented.
- [ ] Uncertainty classified.
- [ ] Final report includes evidence.

