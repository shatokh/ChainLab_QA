# Failure Analysis 0010: Hardhat Compiler Cache Mutex Recurrence

## Summary

During local HTML evidence report implementation verification, `corepack yarn verify` failed inside the workspace sandbox while entering `test:contracts` because Hardhat timed out waiting for the local compiler cache mutex.

## Expected Behavior

`corepack yarn verify` should complete type generation, typecheck, lint, node tests, Solidity contract tests, and format checks against local-only project tooling.

## Actual Behavior

The command completed route type generation and the node test suite, including the new evidence report tests. It then failed during Hardhat contract verification with `MultiProcessMutexTimeoutError` for the compiler download-list lock under `C:\Users\User\AppData\Local\hardhat-nodejs\Cache\compilers-v3\compiler-download-list`.

A direct `test:contracts` retry inside the workspace sandbox failed the same way. Running the same contract command outside the workspace sandbox passed, which indicates the failure was caused by Hardhat cache access outside the workspace rather than a contract defect.

## Reproduction Steps

1. Run `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify`.
2. Wait for node tests to complete.
3. Observe the Hardhat mutex timeout during contract test startup.

## Evidence

- `corepack yarn test` passed 27 tests before the full verification attempt.
- `corepack yarn evidence:local` generated `reports/local-evidence-report.html`.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify` passed route type generation and 27 node tests inside the workspace sandbox.
- The same command failed before Solidity assertions ran with `MultiProcessMutexTimeoutError`.
- A direct sandboxed retry of `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn test:contracts` failed with the same mutex timeout.
- `Get-Process node` found one `node.exe`; after approval it was stopped, but the sandboxed contract command still failed.
- No listeners were found on ports `3000`, `3001`, or `8545`.
- No explicit `compiler-download-list` lock file was visible under the Hardhat compiler cache.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn test:contracts` passed outside the workspace sandbox with 15 Solidity tests.
- `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify` passed outside the workspace sandbox.
- A similar transient cache mutex issue was previously documented in `docs/failure-analyses/0008-hardhat-compiler-cache-mutex.md`.

## Hypotheses

- The workspace sandbox prevented Hardhat from creating or linking its mutex file in `%LOCALAPPDATA%`, and Hardhat retried the permission error until timeout.
- A local Hardhat or Node process temporarily held the compiler cache mutex during the first failure.
- Hardhat compiler metadata cache access collided with a prior verification command.

## What Was Checked

- The failing command output.
- The point of failure in the verification chain.
- Prior failure analysis for the same Hardhat compiler cache mutex class.
- Active Node processes.
- Local listening ports for the app and Hardhat node.
- Hardhat compiler cache directory contents.
- Direct contract test retry inside and outside the workspace sandbox.

## What Was Not Checked

- Hardhat internal cache lock state beyond inspecting the visible compiler cache files.
- Behavior after deleting or modifying the Hardhat cache, because that would be outside the scoped implementation.

## Uncertainty Level

Low. The same contract verification passed outside the workspace sandbox without code changes, and the full verification gate passed afterward.

## Recommended Next Step

When Hardhat reports this mutex timeout in the workspace sandbox, rerun contract verification with approval outside the sandbox so Hardhat can access its compiler cache. Do not change contract code unless Solidity test assertions fail.
