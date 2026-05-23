# ChainLab QA Agent Instructions

This repository uses a controlled AI-assisted engineering workflow. Future agents must follow these rules before making substantial changes.

## Required Workflow

1. Start with a spec.
   - Create or update a spec in `docs/specs/` before feature work, bug fixes, behavior changes, or tooling changes.
   - Every spec must include goal, context, scope, out of scope, affected files, expected behavior, acceptance criteria, test strategy, risks, and uncertainty classification.

2. Do not code first.
   - Do not create application code, tests, dependencies, or framework scaffolding without a relevant spec.
   - Documentation and governance updates may be made as repository foundation work when covered by a spec.

3. Use forced TDD for behavior changes.
   - Write or update a failing test first.
   - Implement the minimum code needed to pass.
   - Run relevant verification.
   - Refactor only when needed and still within scope.

4. Use failure-analysis mode when blocked.
   - If behavior is unclear, tests fail unexpectedly, or a bug is not reproducible, do not patch immediately.
   - Create a failure analysis with expected behavior, actual behavior, reproduction steps, evidence, hypotheses, checked items, unchecked items, uncertainty level, and recommended next step.

5. Lock scope.
   - Do not fix neighboring problems.
   - Do not refactor unrelated files.
   - Record adjacent issues as follow-up items.

6. Preserve the local-first and free-only model.
   - Default Web3 implementation and automated verification to a local Hardhat network.
   - Do not use mainnet except to name it as prohibited scope.
   - Do not require real funds, production wallets, paid RPC, paid hosting, or paid tooling.
   - Do not ask for real private keys, seed phrases, mnemonics, or API keys.
   - Use `.env.example` only for placeholders; never commit real secrets.
   - Treat any real key, seed phrase, mnemonic, committed API key, paid-service requirement, mainnet dependency, or production wallet assumption as a security and process violation.
   - Record any possible need for external services as a follow-up item, not as an implementation step, unless a future spec explicitly approves it.

7. Review the diff against the spec.
   - Before finishing substantial work, compare the current diff to the approved spec.
   - Confirm acceptance criteria, scope, tests, documentation, unrelated changes, and declared uncertainties.

8. Create an AI Change Record.
   - Every substantial change requires a record in `docs/ai-change-records/`.
   - Include change ID, date, goal, spec link, files changed, tests added or updated, commands run, verification evidence, known limitations, uncertainty classification, and follow-up items.

9. Finish with evidence.
   - Final reports must include what changed, what did not change, files changed, commands run, verification results, known limitations, uncertainty classification, and a recommended next step.

## Uncertainty Classification

- Low: verified locally, covered by tests or documentation checks, no major assumptions.
- Medium: partially verified or dependent on future implementation.
- High: external dependency, unclear behavior, flaky environment, or unverified assumption.

## Anti-Patterns

Forbidden behaviors include coding-first implementation, broad unspec'd refactors, silent dependency additions, claiming tests passed without evidence, removing tests to make CI green, meaningless over-mocking, hiding uncertainty, touching unrelated scope, using real funds or mainnet, requiring paid infrastructure without an approved spec, committing secrets, assuming production wallet use, and treating local Hardhat success as testnet validation.
