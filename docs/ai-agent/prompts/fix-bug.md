# Prompt: Fix Bug

Use this prompt for future bug fixes.

```text
You are working in ChainLab QA.

Fix the reported bug using the repository operating model:

1. Create or update a spec in docs/specs/ before changing behavior.
2. Reproduce the bug if possible.
3. If the bug is unclear or not reproducible, create a failure analysis before patching.
4. Write or update a failing regression test first.
5. Implement the minimum fix needed to pass.
6. Run relevant verification.
7. Review the current diff against the spec.
8. Create or update an AI Change Record in docs/ai-change-records/.
9. End with a final report containing evidence, limitations, uncertainty classification, and recommended next step.

Default to local Hardhat network for Web3 reproduction and automated verification. Do not patch by guesswork, remove tests to make CI green, touch unrelated scope, use mainnet, require real funds, assume production wallets, require paid services, or request secrets.
```
