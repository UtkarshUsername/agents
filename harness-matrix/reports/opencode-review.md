# OpenCode Harness Review (V1)

## Summary
- Scope reviewed: `harness-matrix/agents/opencode.yaml`, `harness-matrix/reports/opencode.md`, `harness-matrix/DATA_MODEL.md`.
- Citation coverage: pass (`48/48` leaf fields include evidence).
- Report citation paths/lines: pass (all refs in `harness-matrix/reports/opencode.md` resolve).
- Publish readiness: **blocked** on evidence quote accuracy and a few confidence/overreach issues.

## Blocking issues (must fix)
- Quote/ref mismatches: these evidence quotes do not match the cited `path:line` exactly.

| Field | Evidence ref | Issue | Suggested fix |
|---|---|---|---|
| `edit.verification` | `opencode/packages/opencode/src/tool/edit.ts:650` | Quote appears on line 651, not 650. | Move ref to line 651. |
| `tools.available` | `opencode/packages/opencode/src/tool/registry.ts:107` | Quote combines multiple entries that are split across lines 107-114. | Use a shorter exact quote from one line, or split evidence items. |
| `tools.sandbox` | `opencode/packages/web/src/content/docs/permissions.mdx:16` | Quote omits markdown backticks around `allow`. | Use exact source substring. |
| `config.env_vars` | `opencode/packages/web/src/content/docs/config.mdx:120` | Quote omits backticks around env var. | Use exact source substring. |
| `config.env_vars` | `opencode/packages/web/src/content/docs/config.mdx:133` | Quote omits backticks around env var. | Use exact source substring. |
| `config.env_vars` | `opencode/packages/opencode/src/flag/flag.ts:44` | Quote spans multiline assignment. | Quote exact line content or cite a line with exact snippet. |
| `extensions.skills.locations` | `opencode/packages/opencode/src/skill/skill.ts:136` | Quote appears on line 138, not 136. | Move ref to line 138. |
| `extensions.plugins` | `opencode/packages/web/src/content/docs/plugins.mdx:48` | Quote misses markdown emphasis (`**npm plugins**`). | Use exact source substring. |
| `providers.supported` | `opencode/packages/web/src/content/docs/providers.mdx:9` | Quote drops bold markdown around `75+ LLM providers`. | Use exact source substring. |
| `providers.auth` | `opencode/packages/web/src/content/docs/providers.mdx:20` | Quote text is on wrapped lines 20-21. | Use exact line-level quote or adjust ref/quote. |
| `providers.model_selection` | `opencode/packages/opencode/src/provider/provider.ts:1231` | Quote appears on line 1232. | Move ref to line 1232. |
| `ux.interface` | `opencode/packages/web/src/content/docs/cli.mdx:8` | Quote omits markdown link around `TUI`. | Use exact source substring. |
| `ux.review_controls` | `opencode/packages/web/src/content/docs/permissions.mdx:16` | Same quote-format issue as `tools.sandbox`. | Use exact source substring. |
| `ux.sessions` | `opencode/packages/opencode/src/cli/cmd/run.ts:240` | Quote spans line-wrapped `.option(...)` block. | Use exact line quote from 240 or 241. |
| `context.compaction` | `opencode/packages/opencode/src/session/compaction.ts:43` | Quote includes `const reserved =` not present on line 43. | Use exact line 42/43 text. |
| `reliability.auto_retry` | `opencode/packages/opencode/src/session/retry.ts:31` | Quote appears on line 32. | Move ref to line 32. |
| `reliability.recovery_loops` | `opencode/packages/opencode/src/session/processor.ts:165` | Quote spans two lines. | Use exact one-line quote. |
| `integration.modes` | `opencode/packages/web/src/content/docs/cli.mdx:8` | Quote omits source wording and markdown link text. | Use exact source substring. |
| `integration.protocol` | `opencode/packages/web/src/content/docs/server.mdx:50` | Quote spans wrapped lines 50-51. | Use exact line-level quote. |
| `customization.prompt_templates` | `opencode/packages/opencode/src/config/config.ts:656` | Quote spans line 656-657. | Use exact one-line quote or add second evidence item. |
| `distribution.artifacts` | `opencode/README.md:65` | Quote omits markdown link syntax present in source. | Use exact source substring. |

- `extras.*` values are frequently “why it matters” commentary rather than direct harness facts; this makes value-to-evidence linkage weak.
  - Affected: `extras.tools.model_conditional_exposure`, `extras.integration.local_rpc_mode`, `extras.reliability.loop_guard_doom_loop`, `extras.config.variable_substitution`.

## Non-blocking issues (nice to fix)
- Confidence overreach (absence-based inference marked `high`):
  - `tools.sandbox` (“No hard OS sandbox is implemented...”).
  - `reliability.auto_retry` clause (“no explicit user-facing disable switch was found...”).
- `harness-matrix/reports/opencode.md` labels these as high-confidence; either tighten evidence or explicitly classify as inference.

## Suggested additional sources to cite
- `opencode/packages/opencode/src/tool/bash.ts`
- `opencode/packages/opencode/src/permission/next.ts`
- `opencode/packages/opencode/src/session/retry.ts`
- `opencode/packages/opencode/src/tool/registry.ts`
- `opencode/packages/web/src/content/docs/tools.mdx`

## Fields to downgrade or remove
- Downgrade to `medium`:
  - `tools.sandbox`
  - `reliability.auto_retry`
- Rewrite (or remove if not rewritten as factual capability statements):
  - `extras.tools.model_conditional_exposure`
  - `extras.integration.local_rpc_mode`
  - `extras.reliability.loop_guard_doom_loop`
  - `extras.config.variable_substitution`
