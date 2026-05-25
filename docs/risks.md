# Risks

## Web3 Risks

- Accidental mainnet usage: incorrect network configuration could send a transaction to a prohibited environment.
- Real funds exposure: use of funded wallets could create financial risk during testing or demos.
- Secret leakage: private keys, seed phrases, mnemonics, or API keys could be accidentally committed or pasted into docs.
- Paid infrastructure creep: future work could quietly become dependent on paid RPC, hosting, or tooling.
- Testnet faucet instability: optional testnet work may be blocked by unavailable faucets or rate limits.
- RPC provider dependency: external RPC providers may introduce outages, rate limits, latency, or configuration drift.
- False confidence from local-only testing: local Hardhat success is useful but must not be presented as testnet or production validation.
- Wallet state instability: browser wallet state may persist across tests and produce non-deterministic results.
- RPC and testnet flakiness: public RPC endpoints and testnets may be slow, unavailable, or inconsistent.
- Chain mismatch: users or tests may connect to the wrong chain and send transactions to the wrong environment.
- Transaction pending and failure states: transactions may be delayed, dropped, reverted, or rejected by the user.
- Contract/frontend ABI mismatch: frontend code may call stale or incorrect contract interfaces.
- Local/testnet mismatch: behavior verified on a local Hardhat network may not fully represent deployed testnet behavior.
- Real-fund risk: mainnet and real funds must stay out of this project.

## QA Risks

- Over-mocking: tests can become meaningless if wallet, RPC, or contract behavior is mocked too heavily.
- Flaky E2E tests: wallet and network timing can make end-to-end tests unstable without careful isolation.
- Missing negative coverage: happy-path-only testing can hide the most important Web3 failure modes.
- Evidence overstatement: local Hardhat or mocked-provider evidence can be incorrectly described as live wallet, testnet, or production validation.
- Documentation drift: QA docs can become stale if feature tests or commands change without updating the traceability matrix.

## AI-Assisted Development Risks

- AI scope creep: agents may add tools, dependencies, or code outside the approved spec.
- AI hallucinated test results: agents may claim verification without command evidence.
- Unverified assumptions: agents may infer framework behavior, network behavior, or requirements without checking.
- Coding-first implementation: agents may create product code before specs, tests, and acceptance criteria exist.
