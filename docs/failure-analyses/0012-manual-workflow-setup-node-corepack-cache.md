# Failure Analysis 0012: Manual Workflow Setup Node Corepack Cache

## Summary

After the checkout action fix, the second `Manual Full Verification` run failed in every job during `Setup Node`.

## Expected Behavior

Each job should check out the repository, set up Node 22.17.0, enable Corepack, install dependencies with Yarn 4.11.0, and then run its verification command.

## Actual Behavior

Checkout succeeded in each job. `actions/setup-node@v6` then failed before the `Enable Corepack` step. The action attempted to run the global Yarn 1.22.22 cache command against a project that declares `packageManager: "yarn@4.11.0"`, and Yarn rejected the mismatch because Corepack had not yet been enabled.

## Reproduction Steps

1. Push commit `e90efca`.
2. Run `Manual Full Verification` manually.
3. Observe that every job passes `Checkout` and fails at `Setup Node`.

## Evidence

- Run ID: `26662927770`.
- Workflow: `manual-full-verification.yml`.
- Commit: `e90efca600e53d5ee400f304801620b952dadb5b`.
- GitHub job metadata showed all jobs failed at `Setup Node`.
- Authenticated job logs showed:
  - `actions/setup-node@v6` downloaded Node `22.17.0`;
  - global `yarn` was `1.22.22`;
  - setup-node ran `yarn cache dir`;
  - Yarn failed because the project requires `yarn@4.11.0` through Corepack.

## Hypotheses

- `actions/setup-node@v6` package-manager cache runs before project-specific Corepack activation.
- The workflow should not use setup-node's built-in Yarn cache for this Yarn 4/Corepack project.
- Disabling setup-node package-manager cache should allow the explicit `corepack enable` step to run before dependency installation.

## What Was Checked

- Latest manual workflow run metadata.
- Per-job failed step conclusions.
- Static check job logs through the GitHub connector.
- Current workflow setup-node configuration.

## What Was Not Checked

- A rerun after disabling setup-node package-manager cache, because the fix has not been pushed yet.
- Whether a separate post-Corepack cache strategy is worthwhile.

## Uncertainty Level

Low. The failure log directly identifies setup-node's pre-Corepack Yarn cache command as the failing operation.

## Recommended Next Step

Disable setup-node package-manager caching in the manual workflow, keep the explicit `corepack enable` step, push the fix, and rerun the manual workflow.
