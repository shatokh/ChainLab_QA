# AI Change Record 0017: Local HTML Evidence Report Spec

## Change ID

0017

## Date

2026-05-25

## Goal

Create the Local HTML Evidence Report spec without implementing scripts, package commands, generated reports, CI changes, product code, tests, or dependencies.

## Spec Link

`docs/specs/0010-local-html-evidence-report.md`

## Files Changed

- `docs/specs/0010-local-html-evidence-report.md`
- `docs/ai-change-records/0017-local-html-evidence-report-spec.md`

## Tests Added or Updated

None. This is a documentation/spec-authoring change only.

## Commands Run

- `git status --short`
- `Get-Content docs/specs/0009-ci-cd-evidence-reports.md`
- `Get-Content docs/qa/evidence-report-template.md`
- `Get-ChildItem docs/specs,docs/ai-change-records | Sort-Object Name | Select-Object Name,Length,LastWriteTime`
- PowerShell expected-file existence check with `Test-Path`
- `rg -n "HTML evidence|local HTML|reports/local-evidence-report.html|evidence:local|evidence:open|local-first|mainnet|real funds|paid reporting|secrets|Out of Scope|Acceptance Criteria|Verification Gate" docs/specs/0010-local-html-evidence-report.md docs/ai-change-records/0017-local-html-evidence-report-spec.md`
- `corepack yarn prettier --check docs/specs/0010-local-html-evidence-report.md docs/ai-change-records/0017-local-html-evidence-report-spec.md`
- `git status --short`

## Verification Evidence

- Existing CI/CD and Evidence Reports spec was reviewed before creating the HTML report extension spec.
- Existing evidence report template was reviewed to align terminology and evidence boundaries.
- `git status --short` showed existing uncommitted Phase 7 implementation changes before this spec-authoring task.
- The new spec keeps report implementation, package scripts, generated reports, CI changes, product code, tests, dependencies, testnet, mainnet, real funds, production wallets, paid reporting, and secrets out of scope for this task.
- Expected-file existence check returned `OK` for `docs/specs/0010-local-html-evidence-report.md` and `docs/ai-change-records/0017-local-html-evidence-report-spec.md`.
- Targeted content search confirmed local HTML evidence report scope, `reports/local-evidence-report.html`, optional command names, local-first/no-mainnet/no-real-funds/no-paid-reporting/no-secret boundaries, out-of-scope section, acceptance criteria, and verification gate content.
- Prettier check passed for the new spec and AI Change Record.
- Final `git status --short` showed existing uncommitted Phase 7 implementation changes plus the two new HTML evidence report spec-authoring files.

## Known Limitations

- Local HTML evidence report is specified but not implemented.
- No script was added.
- No package script was added.
- No generated report was created.
- No CI artifact behavior was changed by this spec-authoring task.
- Phase 7 implementation changes are still uncommitted in the working tree.

## Uncertainty Classification

Medium. The desired local HTML report behavior is clear, but script design, generated file handling, and CI artifact integration must be verified during implementation.

## Follow-Up Items

- Review and approve the Local HTML Evidence Report spec before implementation.
- During implementation, keep the report static and dependency-free unless a future spec approves otherwise.
- Ensure generated reports contain no secrets, real wallet data, mainnet/testnet claims, or paid-service dependencies.
