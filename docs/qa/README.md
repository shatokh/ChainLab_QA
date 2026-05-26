# QA Documentation

This directory captures the QA layer for ChainLab QA. It explains what is tested, how local evidence is collected, where coverage is intentionally limited, and how manual exploratory work should be recorded.

## Documents

- `test-plan.md`: project-level QA scope, layers, commands, and local verification boundaries.
- `traceability-matrix.md`: mapping from specs and features to automated checks and evidence commands.
- `exploratory-charters.md`: focused exploratory charters for implemented Web3 flows.
- `defect-examples.md`: realistic defect report examples for Web3 and AI-assisted workflow risks.
- `evidence-report-template.md`: reusable template for local verification evidence.

## Review Navigation

- Start with `README.md` for the project status and command summary.
- Use `docs/portfolio/README.md` for the portfolio review path.
- Use `docs/architecture.md` for module boundaries and evidence scope.
- Use `traceability-matrix.md` to map specs, files, tests, and commands.
- Use `evidence-report-template.md` or `corepack yarn evidence:local` output when recording verification evidence.

## Evidence Boundaries

- Local Hardhat and mocked providers are the default.
- Automated checks do not require real wallets, real funds, paid RPC, paid hosting, testnet, or mainnet.
- Mocked-provider UI evidence is not the same as live wallet or live contract transaction evidence.
- Solidity contract evidence is local Hardhat evidence only.
- Optional testnet validation is later-stage work and needs a separate approved spec.
- Mainnet, real funds, production wallets, and committed secrets are prohibited.
