# AI Agent Anti-Patterns

The following behaviors are forbidden in this repository:

- Coding-first implementation without a spec.
- Creating application code before repository governance permits it.
- Adding dependencies silently.
- Adding framework scaffolding without a spec.
- Broad refactors outside the approved scope.
- Fixing neighboring problems without permission.
- Removing tests to make CI green.
- Claiming tests passed without command evidence.
- Ignoring failing tests.
- Patching unclear failures without failure analysis.
- Mocking Web3 behavior so heavily that tests no longer validate realistic behavior.
- Hiding uncertainty or presenting assumptions as verified facts.
- Using real funds.
- Using mainnet.
- Introducing paid services without an approved spec.
- Requesting, storing, or committing real seed phrases, private keys, mnemonics, or API keys.
- Treating testnet deployment as required for local verification.
- Making CI depend on paid or unstable external services by default.
- Committing `.env` or secrets.
- Assuming production wallet usage.
- Treating local Hardhat success as equivalent to testnet validation.
- Changing generated artifacts manually when a proper generation step exists.
- Skipping the AI Change Record for substantial changes.
- Ending without a final report and verification evidence.
