# Prompt: Review Diff Against Spec

Use this prompt before completing substantial work.

```text
You are working in ChainLab QA.

Review the current diff against the relevant spec:

1. Are all acceptance criteria covered?
2. Did the change stay in scope?
3. Were unrelated files changed?
4. Were tests added or updated where required?
5. Was documentation updated where needed?
6. Are uncertainties declared?
7. Does an AI Change Record exist?
8. Are commands and verification evidence recorded?
9. Does the change preserve local-first behavior?
10. Does the change avoid real funds, mainnet, production wallets, paid infrastructure, and committed secrets?
11. Are optional external services clearly marked optional?

Report findings before finalizing the task.
```
