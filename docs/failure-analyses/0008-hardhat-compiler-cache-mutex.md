# Failure Analysis 0008: Hardhat Compiler Cache Mutex

## Summary

During Phase 3 verification, `corepack yarn verify` temporarily failed while running `yarn test:contracts` because Hardhat timed out while waiting for a compiler cache mutex.

## Expected Behavior

`corepack yarn verify` should complete type generation, typecheck, lint, node tests, Solidity tests, and format checks against the local Hardhat environment.

## Actual Behavior

The first full verification attempt completed the earlier checks but failed during `test:contracts` with a Hardhat `MultiProcessMutexTimeoutError` while waiting for the compiler download-list lock under the local Hardhat compiler cache.

## Reproduction Steps

1. Run `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify`.
2. Wait for the command to reach `yarn test:contracts`.
3. Observe the Hardhat compiler cache mutex timeout.

## Evidence

- `corepack yarn test:e2e` passed 2 Playwright tests before the full verification retry.
- `Get-Process -Name node` showed two local `node` processes while diagnosing the timeout.
- The Hardhat compiler cache contained compiler metadata and compiler binaries, with no visible stale lock file in the inspected cache directory.
- A later retry of `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn test:contracts` passed 4 Solidity tests.
- A later retry of `$env:NODE_OPTIONS='--use-system-ca'; corepack yarn verify` passed.

## Hypotheses

- A previous Node or Hardhat process temporarily held the compiler cache mutex.
- Hardhat's compiler metadata cache was being initialized or refreshed during a prior command.
- The timeout was environmental and transient because the same command passed without code changes.

## What Was Checked

- Current git status.
- Running `node` processes.
- Hardhat compiler cache directory contents.
- Direct `test:contracts` retry.
- Full `verify` retry.

## What Was Not Checked

- Exact command line for the two `node` processes, because process command-line access was not available.
- Hardhat internal mutex implementation details.
- Behavior on a clean machine with an empty Hardhat compiler cache.

## Uncertainty Level

Low. The failure was reproduced once, investigated, and cleared by a retry without code changes. The final verification passed locally.

## Recommended Next Step

If this recurs, stop any stale local Node processes only after identifying them as project-owned, then rerun `corepack yarn test:contracts`. Do not change contract code unless the Solidity test output identifies a contract failure.
