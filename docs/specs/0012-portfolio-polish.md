# Spec 0012: Portfolio Polish

## Goal

Make ChainLab QA easier to review as a portfolio project by updating high-signal documentation, evidence links, current status, and architecture/readiness summaries while preserving the local-first, free-only policy.

## Context

The project now includes local Web3 flows, Solidity contract tests, mocked-provider Playwright E2E tests, QA documentation, CI evidence design, local HTML evidence reporting, and optional testnet readiness documentation. The README and portfolio-facing docs should reflect the current state instead of earlier planning-only language.

Phase 9 follows the decision to keep public testnet deployment optional and deferred to a later Phase 10. Portfolio polish should make the project reviewable without requiring a real wallet, real funds, paid infrastructure, mainnet, or testnet deployment.

## Scope

This task may include:

- Updating `README.md` with current implemented features, verification commands, evidence locations, and roadmap status.
- Updating `docs/architecture.md` to describe the current local architecture, not only the intended future architecture.
- Adding a portfolio review guide under `docs/portfolio/`.
- Updating QA documentation references if needed.
- Updating local runbook references if needed.
- Creating an AI Change Record.

## Out of Scope

- Product code changes.
- Contract behavior changes.
- Test behavior changes, unless documentation verification requires a docs-only check.
- Dependency additions.
- Package script additions.
- Screenshot capture or generated images in this task.
- Deployment scripts.
- Public testnet deployment.
- Mainnet usage.
- Real funds.
- Production wallets.
- Paid RPC, paid hosting, paid dashboards, or paid reporting services.
- Committed secrets or real credentials.
- Git commit unless explicitly requested.

## Affected Files

Expected files:

- `README.md`
- `docs/architecture.md`
- `docs/portfolio/README.md`
- `docs/specs/0012-portfolio-polish.md`
- `docs/ai-change-records/0020-portfolio-polish.md`

Optional documentation files if needed:

- `docs/qa/README.md`
- `docs/setup/local-app-runbook.md`
- `docs/roadmap.md`

## Expected Behavior

A reviewer should be able to open the README and quickly understand:

- what ChainLab QA is;
- which modules are implemented locally;
- how to run local verification;
- where QA evidence lives;
- what is intentionally not included;
- why testnet deployment is optional and deferred;
- how AI governance is enforced.

The portfolio guide should provide a concise review path through the repository without requiring any external services.

## Acceptance Criteria

- README reflects the current project state and no longer describes the project as Phase 1 only.
- README lists implemented local modules: Wallet Connect, Test Token Faucet, NFT Mint, DAO Voting, QA documentation, CI evidence, and local HTML evidence report.
- README includes local verification commands and evidence report commands.
- README includes a reviewer checklist.
- README clearly states local-first/free-only boundaries and Phase 10 optional public testnet deployment.
- Architecture docs describe the current local architecture and evidence boundaries.
- `docs/portfolio/README.md` exists and gives a reviewer-oriented project walkthrough.
- QA README and local runbook link to portfolio/evidence navigation.
- Documentation keeps public testnet deployment optional and deferred.
- No product code, dependency, deployment script, real wallet, real funds, paid service, mainnet, or secret value is introduced.
- AI Change Record exists.
- Scoped formatting check passes.

## Test Strategy

- Run `git status`.
- Verify expected documentation files exist.
- Run scoped Prettier check for changed Markdown files.
- Search changed docs for local-first/free-only boundaries.
- Review current diff against this spec.

## Risks

- README can overstate local evidence as public testnet or production validation.
- Portfolio wording can drift from actual implemented behavior.
- Optional testnet deployment can appear required if roadmap wording is unclear.
- Documentation can become too broad and obscure the critical verification path.

## Uncertainty Classification

Low. This is a documentation-only polish task based on already implemented local features and verified commands.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] No product code is changed.
- [x] No dependencies are added.
- [x] No deployment is performed.
- [x] README reflects current status.
- [x] Architecture docs reflect current local architecture.
- [x] Portfolio guide exists.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Testnet remains optional and deferred.
- [x] Paid infrastructure requirements are avoided.
- [x] Secrets are excluded from files and docs.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
