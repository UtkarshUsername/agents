# OpenCode Harness Collection Report

## What I scanned

Primary repo metadata and commit pin:
- `opencode/.git/config`
- `opencode/.git/HEAD`
- `opencode/.git/refs/heads/dev`
- `opencode/README.md`
- `opencode/AGENTS.md`

Core implementation:
- Tool registry/dispatch and schema conversion:
  - `opencode/packages/opencode/src/tool/registry.ts`
  - `opencode/packages/opencode/src/tool/tool.ts`
  - `opencode/packages/opencode/src/session/prompt.ts`
- Edit mechanisms:
  - `opencode/packages/opencode/src/tool/edit.ts`
  - `opencode/packages/opencode/src/tool/write.ts`
  - `opencode/packages/opencode/src/tool/apply_patch.ts`
  - `opencode/packages/opencode/src/patch/index.ts`
  - `opencode/packages/opencode/src/tool/apply_patch.txt`
- Execution/permissions boundaries:
  - `opencode/packages/opencode/src/tool/bash.ts`
  - `opencode/packages/opencode/src/tool/external-directory.ts`
  - `opencode/packages/opencode/src/permission/next.ts`
- Config/extensibility:
  - `opencode/packages/opencode/src/config/config.ts`
  - `opencode/packages/opencode/src/flag/flag.ts`
  - `opencode/packages/opencode/src/global/index.ts`
- Skills/plugins/MCP:
  - `opencode/packages/opencode/src/skill/skill.ts`
  - `opencode/packages/opencode/src/skill/discovery.ts`
  - `opencode/packages/opencode/src/tool/skill.ts`
  - `opencode/packages/opencode/src/plugin/index.ts`
  - `opencode/packages/opencode/src/mcp/index.ts`
- Reliability/context/session:
  - `opencode/packages/opencode/src/session/processor.ts`
  - `opencode/packages/opencode/src/session/retry.ts`
  - `opencode/packages/opencode/src/session/compaction.ts`
  - `opencode/packages/opencode/src/session/message-v2.ts`
  - `opencode/packages/opencode/src/provider/error.ts`
  - `opencode/packages/opencode/src/storage/db.ts`
- Integration/modes:
  - `opencode/packages/opencode/src/cli/cmd/run.ts`
  - `opencode/packages/opencode/src/cli/cmd/acp.ts`
  - `opencode/packages/opencode/src/cli/cmd/tui/thread.ts`
- Providers/auth/model loading:
  - `opencode/packages/opencode/src/provider/provider.ts`
  - `opencode/packages/opencode/src/auth/index.ts`

Docs scanned (English docs):
- `opencode/packages/web/src/content/docs/config.mdx`
- `opencode/packages/web/src/content/docs/tools.mdx`
- `opencode/packages/web/src/content/docs/permissions.mdx`
- `opencode/packages/web/src/content/docs/providers.mdx`
- `opencode/packages/web/src/content/docs/skills.mdx`
- `opencode/packages/web/src/content/docs/plugins.mdx`
- `opencode/packages/web/src/content/docs/mcp-servers.mdx`
- `opencode/packages/web/src/content/docs/server.mdx`
- `opencode/packages/web/src/content/docs/sdk.mdx`
- `opencode/packages/web/src/content/docs/cli.mdx`
- `opencode/packages/web/src/content/docs/acp.mdx`
- `opencode/packages/web/src/content/docs/rules.mdx`
- `opencode/packages/web/src/content/docs/commands.mdx`
- `opencode/packages/web/src/content/docs/keybinds.mdx`
- `opencode/packages/web/src/content/docs/themes.mdx`
- `opencode/packages/web/src/content/docs/agents.mdx`

## High-confidence findings

- Harness identity and pin:
  - repo URL is `https://github.com/anomalyco/opencode.git` (`opencode/.git/config:7`)
  - default branch is `dev` (`opencode/.git/HEAD:1`, `opencode/AGENTS.md:3`)
  - pinned commit: `eb553f53ac9689ab2056fceea0c7b0504f642101` (`opencode/.git/refs/heads/dev:1`)

- Edit mechanism is hybrid:
  - `apply_patch` tool (`opencode/packages/opencode/src/tool/registry.ts:114`) with explicit patch envelope/docs (`opencode/packages/opencode/src/tool/apply_patch.txt:3`)
  - `edit` string replacement tool (`opencode/packages/opencode/src/tool/registry.ts:105`)
  - `write` full-file rewrite (`opencode/packages/opencode/src/tool/registry.ts:106`)

- Apply-patch verification is strict/fail-fast:
  - parse failures and empty/no-hunk patches are rejected (`opencode/packages/opencode/src/tool/apply_patch.ts:35`, `:41`, `:43`)
  - update hunks fail on missing file/context (`opencode/packages/opencode/src/tool/apply_patch.ts:96`, `opencode/packages/opencode/src/patch/index.ts:392`)

- Edit anchoring/fallback behavior exists but still rejects ambiguity:
  - replacer chain includes block/context/whitespace/indentation strategies (`opencode/packages/opencode/src/tool/edit.ts:625`)
  - explicit missing and multiple-match errors (`opencode/packages/opencode/src/tool/edit.ts:650`, `:654`)

- Tool surface includes built-ins + dynamic sources:
  - built-ins in registry (`opencode/packages/opencode/src/tool/registry.ts:99-117`)
  - custom tools from config dirs (`opencode/packages/opencode/src/tool/registry.ts:36-47`)
  - plugin-provided tools (`opencode/packages/opencode/src/tool/registry.ts:50-54`)
  - MCP tools injected into toolset (`opencode/packages/opencode/src/session/prompt.ts:815`)

- Tool schema style is JSON-schema based:
  - zod -> JSON schema in prompt assembly (`opencode/packages/opencode/src/session/prompt.ts:781`, `:785`)
  - MCP JSON schema conversion (`opencode/packages/opencode/src/mcp/index.ts:124-134`)

- “Sandbox” is permission-policy based, not hard process isolation:
  - permissions action model (`opencode/packages/web/src/content/docs/permissions.mdx:16-18`)
  - default fallback action is ask when no rule matches (`opencode/packages/opencode/src/permission/next.ts:242`)
  - external directory guard (`opencode/packages/opencode/src/tool/external-directory.ts:24`)
  - shell commands run with local `spawn(..., { shell, cwd, env })` (`opencode/packages/opencode/src/tool/bash.ts:167`)

- Config precedence/discovery is explicit and merged:
  - documented order (`opencode/packages/web/src/content/docs/config.mdx:43-50`)
  - matching code comments/implementation (`opencode/packages/opencode/src/config/config.ts:71-78`)
  - env-driven config overrides (`opencode/packages/opencode/src/config/config.ts:105`, `:147`, `:180`)

- Skills supported with multi-location discovery and on-demand loading:
  - docs locations include `.opencode`, `.claude`, `.agents` + global variants (`opencode/packages/web/src/content/docs/skills.mdx:16-21`)
  - code scans external + opencode + config paths + URL indexes (`opencode/packages/opencode/src/skill/skill.ts:106-169`)
  - skill tool emits `<available_skills>` and loads by name (`opencode/packages/opencode/src/tool/skill.ts:37-46`, `:62-67`)

- Plugin system is first-class:
  - local + npm plugin docs (`opencode/packages/web/src/content/docs/plugins.mdx:22-37`)
  - Bun auto-install docs (`opencode/packages/web/src/content/docs/plugins.mdx:48-50`, `:86`)
  - runtime hook/event trigger pipeline (`opencode/packages/opencode/src/plugin/index.ts:101-116`, `:129-136`)

- MCP support is rich:
  - local + remote docs (`opencode/packages/web/src/content/docs/mcp-servers.mdx:6`, `:72`, `:131`)
  - OAuth handling docs and implementation (`opencode/packages/web/src/content/docs/mcp-servers.mdx:168-173`, `opencode/packages/opencode/src/mcp/index.ts:304-390`, `:709-850`)
  - MCP tools/prompts/resources exposed (`opencode/packages/opencode/src/mcp/index.ts:566`, `:608`, `:629`)

- Reliability and context management loops are present:
  - auto-retry loop in processor (`opencode/packages/opencode/src/session/processor.ts:359-370`)
  - retry delay/backoff + Retry-After parsing (`opencode/packages/opencode/src/session/retry.ts:31-59`)
  - context overflow excluded from retry (`opencode/packages/opencode/src/session/retry.ts:62-64`)
  - auto-compaction trigger/check (`opencode/packages/opencode/src/session/prompt.ts:535-547`, `opencode/packages/opencode/src/session/compaction.ts:32-48`)
  - doom-loop guard at repeated identical tool calls (`opencode/packages/opencode/src/session/processor.ts:20`, `:152-176`)

- Integration modes and protocols:
  - TUI default (`opencode/packages/web/src/content/docs/cli.mdx:8`)
  - non-interactive run + JSON event output (`opencode/packages/opencode/src/cli/cmd/run.ts:216`, `:429-433`)
  - HTTP server with OpenAPI and SSE (`opencode/packages/web/src/content/docs/server.mdx:50-51`, `:95`)
  - ACP mode with JSON-RPC over stdio and NDJSON stream (`opencode/packages/web/src/content/docs/acp.mdx:20`, `opencode/packages/opencode/src/cli/cmd/acp.ts:55`)
  - JS/TS SDK package and usage (`opencode/packages/web/src/content/docs/sdk.mdx:21`, `:31-34`, `:75-79`)

## Unknowns / gaps

- No hard OS-level sandboxing primitive was found in this scan for tool execution; behavior appears policy-gated rather than isolated.
- No explicit user-facing setting to disable provider auto-retry was found in docs/code scanned.
- Full provider ID set is dynamic (models.dev + config/plugins), so `providers.supported[]` is necessarily partial/summarized unless enumerated at runtime.

## Ambiguities and suggested follow-ups

- `primary_language` is inferred as TypeScript (medium confidence) from package/scripts/exports and `.ts` source layout, not from an explicit “written in X” statement.
  - Follow-up: add a maintainer-facing statement in README/docs or compute language stats in collection pipeline.

- Edit partial-apply semantics for multi-file `apply_patch` are inferred from sequential write flow and lack of rollback code.
  - Follow-up: add explicit transactional guarantee (or non-guarantee) to docs.

- Provider support breadth is broad and evolving.
  - Follow-up: capture `opencode config providers` runtime output in future collectors for exact point-in-time provider/model sets.

## Extra findings (not in current schema)

- Suggested field: `tools.model_conditional_exposure`
  - Why it matters: tool strategy changes by model family, which can affect patch/edit reliability and prompt behavior.
  - Evidence:
    - `opencode/packages/opencode/src/tool/registry.ts:143-147` (GPT-family models use `apply_patch`; others use `edit`/`write`)

- Suggested field: `integration.local_rpc_mode`
  - Why it matters: TUI can run without local HTTP by using worker RPC, useful for embedding and reduced network surface.
  - Evidence:
    - `opencode/packages/opencode/src/cli/cmd/tui/thread.ts:156-160` (direct RPC mode, no HTTP)
    - `opencode/packages/opencode/src/cli/cmd/tui/thread.ts:20-35` (worker fetch bridge)

- Suggested field: `reliability.loop_guard_doom_loop`
  - Why it matters: explicit repeated-tool-call guard can prevent runaway loops and cost blowups.
  - Evidence:
    - `opencode/packages/opencode/src/session/processor.ts:20` (`DOOM_LOOP_THRESHOLD = 3`)
    - `opencode/packages/opencode/src/session/processor.ts:165-176` (permission ask on loop detection)

- Suggested field: `config.variable_substitution`
  - Why it matters: `{env:...}` and `{file:...}` substitution materially changes portability and secret handling.
  - Evidence:
    - `opencode/packages/opencode/src/config/config.ts:1246-1248` (`{env:...}`)
    - `opencode/packages/opencode/src/config/config.ts:1250-1284` (`{file:...}`)
