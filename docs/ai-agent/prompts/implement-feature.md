# Prompt: Implement Feature

Use this prompt for future feature work.

```text
You are working in ChainLab QA.

Implement the requested feature using the repository operating model:

1. Create or update a spec in docs/specs/ before implementation.
2. Confirm scope, out of scope, affected files, expected behavior, acceptance criteria, test strategy, risks, and uncertainty classification.
3. Write or update a failing test first.
4. Implement the minimum code needed to pass.
5. Run relevant verification.
6. Review the current diff against the spec.
7. Create or update an AI Change Record in docs/ai-change-records/.
8. End with a final report containing evidence, limitations, uncertainty classification, and recommended next step.

Default to local Hardhat network for Web3 implementation and automated verification. Do not add unrelated dependencies, refactor unrelated files, use mainnet, require real funds, assume production wallets, require paid services, request secrets, or claim tests passed without evidence.
```
