# Pi Harness Review (V1)

## Summary
- Scope reviewed: `harness-matrix/agents/pi.yaml`, `harness-matrix/reports/pi.md`, `harness-matrix/DATA_MODEL.md`.
- Citation coverage: pass (`46/46` leaf fields include evidence).
- Report citation paths/lines: pass (all refs in `harness-matrix/reports/pi.md` resolve).
- Publish readiness: **blocked** on evidence quote accuracy and confidence overreach in a few inferred fields.

## Blocking issues (must fix)
- Quote/ref mismatches: these evidence quotes do not match the cited `path:line` exactly.

| Field | Evidence ref | Issue | Suggested fix |
|---|---|---|---|
| `name` | `pi-mono/packages/coding-agent/README.md:26` | Quote text is not present in this file; line 26 is blank. | Replace with correct source: `pi-mono/README.md:26`, or use a quote from `pi-mono/packages/coding-agent/README.md` that supports the value. |
| `platforms` | `pi-mono/packages/coding-agent/docs/terminal-setup.md:32` | Quote omits markdown backticks around path. | Use exact source substring. |
| `platforms` | `pi-mono/packages/coding-agent/docs/terminal-setup.md:33` | Quote omits markdown backticks around path. | Use exact source substring. |
| `edit.retry_loop` | `pi-mono/packages/coding-agent/src/core/tools/edit.ts:217` | One-line quote does not exist exactly on line 217. | Use exact line text or repoint to exact occurrence. |
| `tools.available` | `pi-mono/packages/coding-agent/docs/extensions.md:10` | Quote omits markdown emphasis (`**Custom tools**`). | Use exact source substring. |
| `extensions.skills.format` | `pi-mono/packages/coding-agent/docs/skills.md:104` | Quote appears at line 102, not 104. | Move ref to line 102. |
| `ux.sessions` | `pi-mono/packages/coding-agent/src/core/session-manager.ts:420` | Quote appears in nearby comment on line 417. | Move ref to line 417 or use exact line-420 quote. |
| `context.compaction` | `pi-mono/packages/coding-agent/docs/compaction.md:31` | Quote appears on line 32, not 31. | Move ref to line 32. |
| `context.overflow_handling` | `pi-mono/packages/coding-agent/src/core/agent-session.ts:1728` | Quote appears on line 1729 (inside callback), not 1728. | Move ref to line 1729. |
| `reliability.recovery_loops` | `pi-mono/packages/coding-agent/src/core/agent-session.ts:2129` | Quote appears on line 2130. | Move ref to line 2130. |
| `integration.protocol` | `pi-mono/packages/coding-agent/docs/rpc.md:21` | Quote omits markdown emphasis (`**Commands**`). | Use exact source substring. |
| `integration.protocol` | `pi-mono/packages/coding-agent/docs/rpc.md:23` | Quote omits markdown emphasis (`**Events**`). | Use exact source substring. |
| `customization.system_prompt` | `pi-mono/packages/coding-agent/src/core/resource-loader.ts:745` | Quote appears on line 746, not 745. | Move ref to line 746. |
| `distribution.artifacts` | `pi-mono/packages/coding-agent/package.json:10` | Quote is multi-line object, not exact single-line text. | Use exact line-level quote(s) across line 10/11. |
| `distribution.artifacts` | `pi-mono/packages/coding-agent/package.json:35` | Quote omits trailing command fragment from source line. | Use exact source substring from line 35. |

## Non-blocking issues (nice to fix)
- Confidence overreach (inference marked `high`):
  - `extensions.mcp`: phrase “MCP integration is expected via extensions” is inferred from philosophy docs and should be `medium` unless directly stated.
  - `ux.review_controls`: phrase “confirmation gates can be added by extensions” is inferred and should be `medium` unless directly stated.
- `edit.verification` includes “no partial merge” language; this is likely true, but cite a direct transactional/non-transactional behavior statement if available.

## Suggested additional sources to cite
- `pi-mono/README.md` (for top-level project naming/reference)
- `pi-mono/packages/coding-agent/src/core/tools/index.ts`
- `pi-mono/packages/coding-agent/src/core/agent-session.ts`
- `pi-mono/packages/coding-agent/docs/session.md`
- `pi-mono/packages/coding-agent/docs/providers.md`

## Fields to downgrade or remove
- Downgrade to `medium`:
  - `extensions.mcp`
  - `ux.review_controls`
- Keep `name` at `high` only after fixing the broken citation path.
