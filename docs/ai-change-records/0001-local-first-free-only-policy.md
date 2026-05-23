# AI Change Record 0001: Local-First Free-Only Policy

## Change ID

0001

## Date

2026-05-23

## Goal

Update ChainLab QA documentation and AI agent governance to explicitly require local-first, free-only development and verification.

## Spec Link

`docs/specs/0001-local-first-free-only-policy.md`

## Files Changed

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

## Tests Added or Updated

None. This is a documentation and governance-only change. Product code tests are out of scope.

## Commands Run

- `git status --short`
- `rg --files`
- `Get-ChildItem docs -Recurse -Force | Select-Object FullName`
- PowerShell expected-file existence check with `Test-Path`
- PowerShell out-of-scope file check with `Test-Path`
- `rg -n "Local-first and free-only policy|local Hardhat|Mainnet|paid|secret|production wallet|free faucet|Verification Gate|No automated test should|Local-First and Free-Only" README.md AGENTS.md docs`

## Verification Evidence

- Initial `git status --short` showed only the existing untracked Phase 0 foundation files.
- Initial file listing confirmed no setup/preconditions document existed before this change.
- Post-change `git status --short` showed only untracked repository foundation and documentation files.
- Expected-file existence check returned `All expected 0001 files exist.`
- Out-of-scope file check returned `No out-of-scope product, package, tooling, test, or CI files found.`
- Targeted content search found the local-first/free-only policy in `README.md`, local Hardhat defaults in governance and architecture docs, mainnet prohibition, paid infrastructure constraints, secret handling rules, setup preconditions, verification gate checks, and prompt updates.
- Current changes were reviewed against `docs/specs/0001-local-first-free-only-policy.md`; the acceptance criteria are covered, the change stayed documentation/governance-only, and no product code or dependencies were created.

## Known Limitations

- No application code exists yet.
- No local Hardhat network exists yet.
- No automated tests exist yet.
- No testnet validation exists yet.
- This change defines policy only; enforcement through tooling is deferred.

## Uncertainty Classification

Medium. The documentation policy can be verified locally, but future implementation and testnet validation details remain deferred.

## Follow-Up Items

- Create a Phase 1 spec before adding project skeleton files.
- Define local Hardhat network setup in a future implementation spec.
- Define `.env.example` placeholders only after tooling needs are specified.
- Define optional testnet validation separately, including wallet, RPC, faucet, and evidence requirements.
