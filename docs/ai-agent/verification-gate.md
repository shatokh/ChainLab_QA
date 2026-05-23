# Verification Gate

Use this checklist before finishing any substantial task.

## Spec

- [ ] A spec exists in `docs/specs/`.
- [ ] The spec includes required sections.
- [ ] The current work maps to the spec goal and acceptance criteria.

## Scope

- [ ] Files changed are listed in the spec or justified by the spec.
- [ ] No unrelated files were changed.
- [ ] Neighboring issues are recorded as follow-up items instead of being fixed silently.

## Local-First and Free-Only

- [ ] Does this change preserve local-first behavior?
- [ ] Does this change avoid real funds?
- [ ] Does this change avoid mainnet?
- [ ] Does this change avoid paid infrastructure requirements?
- [ ] Are secrets excluded from files and docs?
- [ ] Are optional external services clearly marked optional?

## TDD and Tests

- [ ] A failing test was written or updated first for feature, bug fix, or behavior change work.
- [ ] Relevant verification commands were run.
- [ ] Test output or check results are recorded.
- [ ] Deferred tests are explicitly explained.

## Documentation

- [ ] Documentation was updated where needed.
- [ ] Failure analysis was created if behavior was unclear or not reproducible.
- [ ] Known limitations are documented.

## AI Change Record

- [ ] AI Change Record exists.
- [ ] Commands run are listed.
- [ ] Verification evidence is included.
- [ ] Uncertainty classification is included.
- [ ] Follow-up items are included.

## Final Report

- [ ] Summary is provided.
- [ ] Files changed are listed.
- [ ] Commands run are listed.
- [ ] Verification evidence is included.
- [ ] Scope compliance is stated.
- [ ] What was not implemented is stated.
- [ ] Known limitations are stated.
- [ ] Uncertainty classification is stated.
- [ ] Recommended next step is stated.
