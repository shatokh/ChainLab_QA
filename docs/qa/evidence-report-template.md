# Evidence Report Template

Use this template for local verification runs. Store completed reports only when a future spec asks for generated or archived evidence. Until Phase 7, this file is a manual template, not a CI artifact requirement.

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
