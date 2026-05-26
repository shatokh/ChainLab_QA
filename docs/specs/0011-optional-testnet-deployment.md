# Spec 0011: Optional Testnet Readiness

## Goal

Define the Phase 8 path for optional testnet readiness while preserving ChainLab QA's local-first, free-only, no-mainnet, no-real-funds policy. Actual public testnet deployment is deferred to a later optional phase after portfolio polish.

## Context

ChainLab QA has local Web3 flows for Wallet Connect, Test Token Faucet, NFT Mint, DAO Voting, QA documentation, CI evidence, and a local HTML evidence report. Phase 8 should keep the project maximally local-first and document what would be needed before any later external blockchain work.

This phase must not weaken the existing safety model:

- Local Hardhat remains the default implementation and automated verification environment.
- Testnet validation is optional, late-stage evidence only, and deferred beyond Phase 9 unless a future spec approves it.
- Mainnet is prohibited.
- Real funds are prohibited.
- Production wallets are prohibited.
- Paid RPC, paid hosting, paid deployment dashboards, and paid reporting tools are not required.
- Real private keys, seed phrases, mnemonics, and API keys must never be committed or shared with agents.

## Scope

This spec-authoring task may include:

- A Phase 8 spec.
- A testnet deployment preconditions document.
- Updates to setup documentation that warn about manual actions before implementation.
- An AI Change Record for the spec/documentation work.

Future optional public deployment may include, only after Phase 9 and a separate approved spec:

- A local-only deployment script or Hardhat task for one approved testnet.
- `.env.example` placeholders only, with no real values.
- Configuration that keeps local Hardhat as the default network.
- A testnet verification checklist.
- A testnet evidence template section or report update.
- Documentation for how to distinguish local evidence from optional testnet evidence.

## Out of Scope

- Product feature changes.
- Contract behavior changes.
- Frontend behavior changes.
- Dependency additions.
- Package manager changes.
- Deployment during this spec-authoring task.
- Mainnet usage.
- Real funds.
- Production wallet usage.
- Paid RPC, paid hosting, paid dashboards, paid deployment tools, or paid reporting tools.
- Committed `.env` files or real secret values.
- Asking the user to paste a private key, seed phrase, mnemonic, or API key.
- Treating testnet success as production validation.
- Treating local Hardhat success as testnet validation.
- Git commit unless explicitly requested.

## Affected Files

Files affected by this spec-authoring task:

- `docs/specs/0011-optional-testnet-deployment.md`
- `docs/setup/testnet-deployment-preconditions.md`
- `docs/setup/preconditions.md`
- `docs/ai-change-records/0019-optional-testnet-deployment-spec.md`

Expected future implementation files may include:

- `.env.example`
- `hardhat.config.ts`
- `scripts/`
- `docs/setup/local-app-runbook.md`
- `docs/qa/evidence-report-template.md`
- `docs/qa/traceability-matrix.md`
- `docs/ai-change-records/`

## Expected Behavior

Before any later testnet implementation starts, the repository must clearly warn the contributor that manual preparation is required:

- choose one approved public testnet, such as Sepolia or Base Sepolia;
- create a separate test-only wallet;
- fund it only with free faucet funds;
- use only public/free-tier RPC access;
- keep all secrets outside Git;
- keep local Hardhat as the default environment;
- label all evidence as local or optional testnet evidence.

If reconsidered after portfolio polish, testnet deployment must be opt-in. Local development, CI, and automated verification must continue to pass without testnet credentials, paid services, real wallets, or real funds.

## Acceptance Criteria

For this spec-authoring task:

- Spec `docs/specs/0011-optional-testnet-deployment.md` exists.
- AI Change Record `docs/ai-change-records/0019-optional-testnet-deployment-spec.md` exists.
- A testnet preconditions document exists.
- Setup documentation warns that Phase 8 is readiness-only and manual preparation is required only if a later optional public testnet deployment is approved.
- The spec prohibits mainnet, real funds, production wallets, committed secrets, and paid infrastructure.
- The spec keeps deployment code, dependency changes, package scripts, and actual testnet deployment out of scope for this task.
- The spec states that local Hardhat remains the default environment.
- The spec states that testnet evidence must be separate from local evidence.
- Verification confirms expected files exist and scope is respected.

For a future implementation task:

- A failing test or verification check is added before deployment implementation where practical.
- Local Hardhat remains the default network.
- No command requires testnet credentials by default.
- `.env.example` contains placeholders only.
- Real `.env` files remain ignored.
- Deployment script refuses or avoids mainnet.
- Deployment script requires explicit testnet selection.
- Documentation explains manual wallet, faucet, and RPC setup without requesting secrets.
- Verification includes local checks and clearly labeled optional testnet checks.
- AI Change Record includes command evidence and known limitations.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify expected files exist.
- Search the new docs for required safety terms: local Hardhat, optional testnet, no mainnet, no real funds, no production wallet, no paid infrastructure, no committed secrets.
- Run scoped Markdown formatting check if practical.
- Review current diff against this spec.

For a future implementation task:

- Add a failing verification check before deployment implementation where practical.
- Run `corepack yarn verify`.
- Run `corepack yarn test:e2e`.
- Run any deployment-script unit checks locally without external network calls.
- Only after manual approval and setup, run one optional testnet deployment or smoke check.
- Capture evidence that clearly labels the network, transaction hashes, contract addresses, and limitations.
- Verify no secret values were written to Git-tracked files or generated reports.

## Manual Action Required Before Future Implementation

The user must be warned before implementation starts and must complete or approve these items:

- Select exactly one optional testnet for the later implementation: Sepolia or Base Sepolia.
- Create a separate test-only wallet.
- Fund the test wallet with free faucet funds only.
- Decide whether to use a public RPC endpoint or a free-tier RPC provider.
- Keep any private key, seed phrase, mnemonic, API key, or RPC token outside the repository.
- Confirm that no mainnet, real funds, production wallet, or paid infrastructure will be used.

No secret value should be pasted into chat or committed to the repository.

## Risks

- Accidental mainnet configuration.
- Real funds exposure.
- Production wallet usage.
- Secret leakage through `.env`, logs, generated reports, screenshots, shell history, or CI artifacts.
- Paid infrastructure creep.
- Public/free-tier RPC instability.
- Faucet unavailability or rate limits.
- Testnet transaction delays or failed transactions.
- Contract address or ABI mismatch between local and testnet.
- Overstating optional testnet evidence as production readiness.
- Treating local-only evidence as public network evidence.

## Uncertainty Classification

Medium. The safety model and documentation scope are clear, but future implementation depends on user-selected testnet, free faucet availability, public/free RPC reliability, and manual wallet setup.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] No product code is changed.
- [x] No dependencies are added.
- [x] No deployment is performed.
- [x] Local Hardhat remains the default environment.
- [x] Testnet validation is optional and later only.
- [x] Mainnet is avoided.
- [x] Real funds are avoided.
- [x] Production wallet assumptions are avoided.
- [x] Paid infrastructure requirements are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Manual action requirements are documented.
- [x] Testnet evidence boundaries are documented.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
