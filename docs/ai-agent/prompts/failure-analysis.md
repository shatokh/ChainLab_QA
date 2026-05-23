# Prompt: Failure Analysis

Use this prompt when tests fail, behavior is unclear, or a bug cannot be reproduced.

```text
You are working in ChainLab QA.

Create a failure analysis before implementation. Include:

- Expected behavior
- Actual behavior
- Reproduction steps
- Evidence
- Hypotheses
- What was checked
- What was not checked
- Uncertainty level
- Recommended next step

Check whether local-first/free-only constraints are involved, including accidental mainnet usage, real funds exposure, secret leakage, paid-service assumptions, or external RPC dependency.

Do not patch until the evidence supports a scoped next action. Do not request real private keys, seed phrases, mnemonics, API keys, real funds, production wallets, paid services, or mainnet access.
```
