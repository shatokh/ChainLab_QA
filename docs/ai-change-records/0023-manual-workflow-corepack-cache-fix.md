# AI Change Record 0023: Manual Workflow Corepack Cache Fix

## Change ID

0023

## Date

2026-05-29

## Goal

Fix the manual full verification workflow after `actions/setup-node@v6` failed before Corepack activation by invoking global Yarn 1 cache behavior.

## Spec Link

`docs/specs/0013-manual-full-verification-workflow.md`

## Files Changed

- `.github/workflows/manual-full-verification.yml`
- `docs/failure-analyses/0012-manual-workflow-setup-node-corepack-cache.md`
- `docs/ai-change-records/0023-manual-workflow-corepack-cache-fix.md`

## Tests Added Or Updated

None. This task updates GitHub Actions configuration and records failure analysis.

## Commands Run

- GitHub REST query for the latest manual workflow run.
- GitHub REST query for job step conclusions.
- GitHub connector log fetch for the failed static checks job.

## Verification Evidence

- The second manual workflow run failed after checkout and before project commands.
- Logs showed setup-node invoked global Yarn 1.22.22 cache behavior before `corepack enable`.
- The manual workflow now disables setup-node package-manager cache with `package-manager-cache: false`.
- The explicit `corepack enable` step remains before dependency installation.

## Known Limitations

- The fix must be validated by pushing and rerunning the manual workflow in GitHub Actions.
- Built-in setup-node dependency caching is disabled for the manual workflow. This favors correctness over faster setup.

## Uncertainty Classification

Low. The failure log directly identified the pre-Corepack Yarn cache command as the cause. Runtime verification still requires a GitHub-hosted rerun.

## Follow-Up Items

- Push the fix.
- Rerun `Manual Full Verification`.
- If setup succeeds, inspect any later test failures separately.
