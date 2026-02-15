# OpenCode Harness Review (V1)

## Summary
- Scope reviewed: `harness-matrix/agents/opencode.yaml`, `harness-matrix/reports/opencode.md`, `harness-matrix/DATA_MODEL.md`.
- Citation coverage: pass (`48/48` leaf fields have evidence).
- Citation integrity: pass (all refs resolve; quotes match cited `path:line`; no placeholder `...` / `…` quotes).
- Type checks: pass (`edit.mechanism` is a list with valid enums; confidence values valid).
- Publish readiness: **ready**.

## Blocking issues (must fix)
- None.

## Non-blocking issues (nice to fix)
- None identified in this pass.

## Suggested additional sources to cite
- Optional hardening only (not required):
  - `opencode/packages/opencode/src/tool/registry.ts`
  - `opencode/packages/opencode/src/session/retry.ts`

## Fields to downgrade or remove
- None recommended in this pass.
