# Agent Operating Rules

## Spec-First Workflow

Before substantial work, create or update a spec in `docs/specs/`. The spec is the source of truth for scope, acceptance criteria, tests, risks, and uncertainty.

Every spec must include:

- Goal
- Context
- Scope
- Out of scope
- Affected files
- Expected behavior
- Acceptance criteria
- Test strategy
- Risks
- Uncertainty classification

## No Coding-First Rule

Agents must not start with product implementation. Framework scaffolding, application files, contracts, tests, dependencies, and CI workflows require a spec first.

## Forced TDD

For feature work, bug fixes, and behavior changes:

1. Write or update a failing test.
2. Confirm the failure is meaningful.
3. Implement the minimum change needed to pass.
4. Run relevant verification.
5. Refactor only when it improves the scoped change.
6. Review the diff against the spec.

## Failure-Analysis Mode

If tests fail unexpectedly, behavior is unclear, or a defect cannot be reproduced, stop implementation and create a failure analysis. Do not patch based on guesses.

## Scope Lock

Agents must stay inside the approved spec. Adjacent improvements, broad cleanup, dependency upgrades, and refactors belong in follow-up items unless they are required by the current spec.

## Local-First and Free-Only Policy

Agents must default Web3 implementation and automated verification to a local Hardhat network. The project must not require real funds, production wallets, mainnet, paid RPC, paid hosting, or paid tooling.

Mainnet may only be mentioned as prohibited scope. Optional testnet validation may be proposed only as late-stage work, using free faucet funds and a future approved spec.

Agents must not request real private keys, seed phrases, mnemonics, or API keys. `.env.example` may contain placeholder variable names only. Any real secret, paid-service requirement, production wallet assumption, or mainnet dependency is a security and process violation.

External services should be recorded as follow-up items unless a future spec explicitly approves them.

## Verification Gate

Before completing substantial work, agents must verify:

- Spec exists.
- Scope is respected.
- TDD evidence exists where applicable.
- Relevant tests or checks are run or explicitly deferred.
- No unrelated files changed.
- Local-first behavior is preserved.
- Real funds, mainnet, production wallets, paid infrastructure, and committed secrets are avoided.
- Optional external services are marked optional.
- AI Change Record exists.
- Known limitations are documented.
- Uncertainty is classified.
- Final report includes evidence.

## AI Change Record

Every substantial change requires a change record in `docs/ai-change-records/`. The record must be specific enough for another reviewer to understand what changed and how it was verified.

## Final Report

Final reports must include what changed, what was intentionally not changed, files changed, commands run, verification results, known limitations, uncertainty classification, and recommended next step.
