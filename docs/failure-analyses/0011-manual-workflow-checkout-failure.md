# Failure Analysis 0011: Manual Workflow Checkout Failure

## Summary

The first `Manual Full Verification` GitHub Actions run failed in every job before tests started. Each job failed during the `Checkout` step.

## Expected Behavior

The manual workflow should check out the repository, set up Node, install dependencies, run each verification layer, generate local evidence, and upload a one-day artifact.

## Actual Behavior

The workflow run completed with failure. Static checks, node tests, Solidity contract tests, mocked-provider E2E tests, and the evidence job all failed at `Checkout`. Later steps were skipped.

## Reproduction Steps

1. Push commit `c811d1b`.
2. Open GitHub Actions.
3. Run `Manual Full Verification` manually through `workflow_dispatch`.
4. Observe that all jobs fail at `Checkout`.

## Evidence

- Run ID: `26662265498`.
- Workflow: `manual-full-verification.yml`.
- Event: `workflow_dispatch`.
- Commit: `c811d1bd3b9e33842cb8221b2c2d3f81636f2ac8`.
- GitHub REST job metadata showed all verification jobs failed at step `Checkout`.
- GitHub UI annotations showed Node.js 20 action deprecation warnings for `actions/checkout@v4`.
- The jobs failed before Node setup, dependency installation, tests, or evidence generation.

## Hypotheses

- `actions/checkout@v4` is no longer reliable in this GitHub Actions environment due the Node.js 20 action runtime deprecation path.
- The repository or runner rejected the checkout action version before project commands could run.
- The issue is workflow action-version related rather than a product, test, dependency, or local-first policy failure.

## What Was Checked

- Latest workflow run metadata through GitHub REST API.
- Per-job step conclusions through GitHub REST API.
- Existing workflow trigger and job structure.
- Current local working tree state before changes.

## What Was Not Checked

- Full raw job logs, because the unauthenticated REST request for job logs returned `403 Must have admin rights to Repository`.
- A rerun after changing action versions, because the fix has not been pushed yet.

## Uncertainty Level

Medium. The failure point is clear, but full checkout logs were not available locally. The most likely fix is updating GitHub-maintained actions to Node 24-compatible major versions.

## Recommended Next Step

Update the manual workflow to use current GitHub-maintained action major versions compatible with the Node 24 action runtime, then push and rerun `Manual Full Verification`.
