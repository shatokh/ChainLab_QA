# Spec 0002: Phase 1 Project Skeleton

## Goal

Define the approved scope for a future Phase 1 project skeleton that prepares ChainLab QA for TypeScript, Next.js, Hardhat, and Playwright development without implementing product features.

## Context

Phase 0 established repository governance and AI agent rules. Spec 0001 locked the project to a local-first, free-only model. Phase 1 should introduce the minimum technical skeleton needed for future Web3 QA work while preserving that model.

This spec is documentation-only until a separate implementation task explicitly asks to execute it. Creating this spec does not install dependencies, initialize frameworks, create product code, or run package managers.

## Scope

Future Phase 1 implementation may include:

- Package manager baseline using Yarn via Corepack.
- `package.json` with project metadata and local scripts.
- `yarn.lock` committed for reproducible installs.
- `.yarnrc.yml` if needed to make Yarn behavior explicit.
- TypeScript configuration.
- Next.js configuration and minimal framework files required for a non-product placeholder app.
- Hardhat configuration for local Hardhat network only.
- Playwright configuration prepared for local execution only.
- Basic linting and formatting configuration if supported by selected dependencies.
- Placeholder directories for future app, contract, test, and QA evidence work.
- `.env.example` with placeholder variable names only, if needed by tooling.
- Documentation updates that explain local setup and verification commands.

Phase 1 must remain skeleton-only. It must not implement Wallet Login, Faucet, NFT Mint, DAO Voting, smart contract behavior, E2E user flows, CI workflows, deployment scripts, or testnet validation.

## Package Manager and Dependency Policy

Phase 1 must use Yarn, not npm, as the project package manager.

The implementation should use modern Yarn through Corepack:

- `package.json` must include a `packageManager` field pinned to an exact Yarn 4 stable version.
- The implementation task must re-check the current Yarn stable version before writing `packageManager`.
- `yarn.lock` must be committed.
- `package-lock.json` must not be created.
- Installs should be verified with immutable lockfile behavior, such as `yarn install --immutable`.
- Yarn should use `nodeLinker: node-modules` unless the implementation spec proves Plug'n'Play works cleanly with Next.js, Hardhat, Playwright, and editor tooling.

Dependency selection must reduce supply-chain risk without pretending that "newest" automatically means "safe":

- Prefer current stable releases of actively maintained packages.
- Pin exact direct dependency versions instead of broad ranges.
- Do not use canary, beta, alpha, release-candidate, nightly, or Git URL dependencies.
- Avoid packages with unclear maintainership, very low adoption, or unnecessary transitive footprint.
- Re-check package metadata during implementation before installing dependencies.
- Do not add dependencies that are not needed for the Phase 1 skeleton.
- Run an audit command supported by Yarn or npm registry metadata during implementation and record the result.
- Treat any severe supply-chain concern as a blocker or failure-analysis item, not as something to patch around silently.

## Version Targets

Version targets must be re-verified during the future Phase 1 implementation task because package versions change.

As of 2026-05-23, the npm registry reports `next@16.2.6` as the `latest` release. Phase 1 should target the latest stable Next.js 16 patch release available at implementation time, unless an incompatibility is documented in the implementation spec.

Next.js requirements for Phase 1:

- Use Next.js App Router.
- Use TypeScript.
- Keep the app as a neutral placeholder only.
- Do not implement product UI, wallet flows, RPC calls, contracts, or Web3 behavior.
- Pin `next`, `react`, and `react-dom` to exact stable versions compatible with each other.
- Configure the Node.js engine to satisfy the selected Next.js version.

Other baseline packages should use latest stable compatible versions at implementation time:

- TypeScript.
- Hardhat and TypeScript-related Hardhat tooling.
- Playwright.
- ESLint and formatting tools if included.
- Web3 libraries such as `wagmi` and `viem` only if the Phase 1 implementation spec decides they are needed for skeleton wiring; otherwise defer them to Wallet Connect.

Version references checked while updating this spec on 2026-05-23:

- Next.js package metadata: `https://registry.npmjs.org/next/latest`
- Yarn documentation: `https://yarnpkg.com/`

## Out of Scope

- Product application features.
- Wallet connection implementation.
- Solidity contracts with product behavior.
- Faucet, NFT, or DAO functionality.
- Playwright E2E flows.
- RPC integration beyond local Hardhat defaults.
- Testnet deployment.
- Mainnet usage.
- Real funds.
- Production wallets.
- Paid RPC, paid hosting, or paid tooling requirements.
- Real private keys, seed phrases, mnemonics, or API keys.
- GitHub Actions workflows.
- Git remote creation.
- Git commit.
- npm as the package manager.
- `package-lock.json`.
- Canary, beta, alpha, release-candidate, nightly, or Git URL dependencies.

## Affected Files

Expected future implementation files may include:

- `package.json`
- `yarn.lock`
- `.yarnrc.yml`
- `tsconfig.json`
- `next.config.ts` or `next.config.js`
- `hardhat.config.ts`
- `playwright.config.ts`
- `.env.example`
- `.eslintrc.*` or equivalent lint configuration
- `.prettierrc` or equivalent formatting configuration
- `app/` or another Next.js app directory
- `contracts/`
- `test/` or `tests/`
- `e2e/`
- `docs/setup/`
- `docs/specs/`
- `docs/ai-change-records/`

Files affected by this spec-authoring task:

- `docs/specs/0002-phase-1-project-skeleton.md`
- `docs/ai-change-records/0002-phase-1-project-skeleton-spec.md`

## Expected Behavior

When implemented later, Phase 1 should produce a minimal, local-only project skeleton that can install and run baseline checks without requiring real wallets, real funds, mainnet, paid infrastructure, or testnet access.

The skeleton should make future phases possible but should not contain product behavior. Any UI should be a neutral placeholder only. Any contract setup should be local-network scaffolding only. Any tests should verify the skeleton and configuration, not product flows.

## Acceptance Criteria

For this spec-authoring task:

- `docs/specs/0002-phase-1-project-skeleton.md` exists.
- `docs/ai-change-records/0002-phase-1-project-skeleton-spec.md` exists.
- No product code, dependencies, package files, framework scaffold, tests, CI workflows, remote, or commit are created.

For a future Phase 1 implementation task:

- A failing or initially absent verification check is established before implementation, such as `yarn test`, `yarn lint`, `yarn typecheck`, or another documented baseline check.
- Yarn is used as the package manager through Corepack.
- `package.json` includes an exact `packageManager` pin for Yarn 4 stable.
- `yarn.lock` exists and is committed.
- `package-lock.json` is not created.
- Direct dependencies are pinned to exact stable versions.
- No canary, beta, alpha, release-candidate, nightly, or Git URL dependencies are used.
- Dependency metadata and audit results are checked and recorded.
- `package.json` exists with local-only scripts.
- TypeScript configuration exists.
- Next.js skeleton exists without product features.
- Next.js targets the latest stable Next.js 16 patch release at implementation time unless a documented incompatibility requires a different stable version.
- Next.js uses App Router and TypeScript.
- Hardhat config defaults to local Hardhat network only.
- Playwright config is prepared for local execution and does not require a real wallet.
- `.env.example`, if created, contains placeholders only.
- No real secrets are committed.
- No mainnet configuration is enabled.
- No paid RPC, paid hosting, or paid tooling is required.
- No testnet validation is required for local verification.
- Documentation explains how to run local baseline checks.
- AI Change Record for the implementation lists commands run and verification evidence.

## Test Strategy

For this spec-authoring task:

- Run `git status`.
- Verify the spec and AI Change Record files exist.
- Check that no out-of-scope product, package, tooling, test, or CI files were created.
- Review current changes against this spec.

For a future Phase 1 implementation task:

- Use TDD or verification-first workflow by defining a baseline check before implementation.
- Run local install only when explicitly approved if dependencies must be downloaded.
- Use Yarn commands, not npm commands, for package installation and scripts.
- Run `yarn install --immutable` after lockfile creation or update.
- Run dependency audit or metadata checks supported by the selected Yarn/npm registry workflow and record the result.
- Run local typecheck, lint, unit or smoke checks as defined by the implementation spec.
- Verify Hardhat configuration targets local network by default.
- Verify Playwright configuration does not require real wallets, real funds, paid services, or testnet.

## Risks

- Skeleton setup can accidentally become product implementation.
- Dependency choices can expand scope or introduce paid-service assumptions.
- New package versions may reduce known-vulnerability exposure but can also introduce regressions or supply-chain risk if adopted immediately after release.
- Exact pinning improves reproducibility but requires intentional upgrade work later.
- Framework defaults may include telemetry, generated files, or commands that should be documented.
- Test tooling can appear to validate Web3 behavior before actual wallet, contract, or RPC flows exist.
- Local-only skeleton checks can create false confidence if presented as product or testnet validation.

## Uncertainty Classification

Medium. The desired skeleton scope is clear, but exact dependency versions, framework defaults, generated files, and package-manager behavior must be verified during a future implementation task.

## Verification Gate

- [x] Spec exists.
- [x] Scope is respected.
- [x] TDD or verification-first evidence exists where applicable.
- [x] Relevant documentation checks are run.
- [x] No product features are implemented.
- [x] Local-first behavior is preserved.
- [x] Real funds are avoided.
- [x] Mainnet is avoided.
- [x] Paid infrastructure requirements are avoided.
- [x] Secrets are excluded from files and docs.
- [x] Optional external services are clearly marked optional.
- [x] AI Change Record exists.
- [x] Known limitations documented.
- [x] Uncertainty classified.
- [x] Final report includes evidence.
