# Evidence Report Template

Use this template for local verification runs and for interpreting CI evidence summaries. The Phase 7 workflow uploads a generated `local-verification.md` artifact with the command list and evidence boundaries. The local HTML report command writes `reports/local-evidence-report.html` for browser-friendly review.

## Report ID

`YYYY-MM-DD-local-verification-short-name`

## Date

`YYYY-MM-DD`

## Commit Or Branch

- Commit:
- Branch:
- Working tree status:

## Scope

- Feature or documentation area:
- Spec:
- AI Change Record:

## Environment

- OS:
- Node version:
- Yarn version:
- Browser used for E2E:
- Network: Local Hardhat or mocked provider.

## Commands Run

```bash
corepack yarn verify
corepack yarn test:e2e
corepack yarn evidence:local
```

Add optional local commands only when used:

```bash
corepack yarn test
corepack yarn test:contracts
corepack yarn typecheck
corepack yarn lint
corepack yarn format:check
```

## Results

| Command                  | Result       | Evidence Summary |
| ------------------------ | ------------ | ---------------- |
| `corepack yarn verify`   | Pass or fail | Summary          |
| `corepack yarn test:e2e` | Pass or fail | Summary          |

## Local HTML Evidence Report

- Command: `corepack yarn evidence:local`
- Local file: `reports/local-evidence-report.html`
- Open command: `corepack yarn evidence:open`
- Reviewed for local-only boundaries: Yes or no.
- Reviewed for credential values: Yes or no.

## CI Artifact

- Workflow:
- Run ID:
- Artifact name: `local-verification-evidence`
- Artifact file: `local-verification.md`
- HTML artifact file: `local-evidence-report.html`
- Artifact reviewed for secrets: Yes or no.
- Artifact reviewed for local/testnet/mainnet boundary wording: Yes or no.

## Evidence Boundaries

- Local Hardhat evidence:
- Mocked-provider UI evidence:
- Manual exploratory evidence:
- Not validated:

## Known Limitations

- No real wallet required unless a future approved spec says otherwise.
- No real funds.
- No mainnet.
- No paid RPC, paid hosting, or paid tooling.
- No testnet validation unless separately approved.

## Defects Or Follow-Ups

| ID  | Summary | Severity | Next Step |
| --- | ------- | -------- | --------- |
| TBD | TBD     | TBD      | TBD       |

## Uncertainty Classification

Low, Medium, or High.

Reason:

## Reviewer Notes

- Notes:
