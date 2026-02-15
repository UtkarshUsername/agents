# Pi Harness Collection Report

## What I scanned

### Repo and revision metadata
- `pi-mono/.git/refs/heads/main:1`
- `pi-mono/.git/refs/remotes/origin/HEAD:1`
- `pi-mono/packages/coding-agent/package.json:2`
- `pi-mono/packages/coding-agent/package.json:90`

### Top-level and user docs
- `pi-mono/packages/coding-agent/README.md`
- `pi-mono/packages/coding-agent/docs/providers.md`
- `pi-mono/packages/coding-agent/docs/settings.md`
- `pi-mono/packages/coding-agent/docs/skills.md`
- `pi-mono/packages/coding-agent/docs/prompt-templates.md`
- `pi-mono/packages/coding-agent/docs/themes.md`
- `pi-mono/packages/coding-agent/docs/keybindings.md`
- `pi-mono/packages/coding-agent/docs/compaction.md`
- `pi-mono/packages/coding-agent/docs/json.md`
- `pi-mono/packages/coding-agent/docs/rpc.md`
- `pi-mono/packages/coding-agent/docs/sdk.md`
- `pi-mono/packages/coding-agent/docs/session.md`
- `pi-mono/packages/coding-agent/docs/extensions.md`
- `pi-mono/packages/coding-agent/docs/packages.md`
- `pi-mono/packages/coding-agent/docs/windows.md`
- `pi-mono/packages/coding-agent/docs/terminal-setup.md`

### Core implementation files
- Tool definitions and dispatch:
  - `pi-mono/packages/coding-agent/src/core/tools/index.ts`
  - `pi-mono/packages/agent/src/agent-loop.ts`
  - `pi-mono/packages/agent/src/types.ts`
- Edit mechanism:
  - `pi-mono/packages/coding-agent/src/core/tools/edit.ts`
  - `pi-mono/packages/coding-agent/src/core/tools/edit-diff.ts`
- Execution wrapper / boundaries:
  - `pi-mono/packages/coding-agent/src/core/tools/bash.ts`
  - `pi-mono/packages/coding-agent/src/core/tools/path-utils.ts`
- Config and resource loading:
  - `pi-mono/packages/coding-agent/src/config.ts`
  - `pi-mono/packages/coding-agent/src/core/settings-manager.ts`
  - `pi-mono/packages/coding-agent/src/core/resource-loader.ts`
  - `pi-mono/packages/coding-agent/src/core/skills.ts`
  - `pi-mono/packages/coding-agent/src/core/prompt-templates.ts`
  - `pi-mono/packages/coding-agent/src/core/keybindings.ts`
- Providers/auth:
  - `pi-mono/packages/coding-agent/src/core/model-registry.ts`
  - `pi-mono/packages/coding-agent/src/core/auth-storage.ts`
  - `pi-mono/packages/ai/src/env-api-keys.ts`
- Reliability/context recovery:
  - `pi-mono/packages/coding-agent/src/core/agent-session.ts`
- Integration modes/protocols:
  - `pi-mono/packages/coding-agent/src/modes/print-mode.ts`
  - `pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts`
  - `pi-mono/packages/coding-agent/src/modes/rpc/rpc-types.ts`
- Sessions and packaging:
  - `pi-mono/packages/coding-agent/src/core/session-manager.ts`
  - `pi-mono/packages/coding-agent/src/core/package-manager.ts`

## High-confidence findings
- Edit mechanism is string replacement (`oldText` -> `newText`) with exact-first, fuzzy-fallback matching and strict rejection for missing/non-unique/no-op edits (`pi-mono/packages/coding-agent/src/core/tools/edit.ts:16`, `pi-mono/packages/coding-agent/src/core/tools/edit.ts:149`, `pi-mono/packages/coding-agent/src/core/tools/edit-diff.ts:73`).
- Built-in tools are `read`, `bash`, `edit`, `write`, `grep`, `find`, `ls`; extensions can register additional LLM-callable tools (`pi-mono/packages/coding-agent/README.md:483`, `pi-mono/packages/coding-agent/docs/extensions.md:10`).
- Tool schemas are TypeBox/structured parameters validated before execution (`pi-mono/packages/ai/src/types.ts:196`, `pi-mono/packages/agent/src/agent-loop.ts:322`).
- Config precedence is global + project (`~/.pi/agent/settings.json` then `.pi/settings.json` override) with deep merge (`pi-mono/packages/coding-agent/docs/settings.md:7`, `pi-mono/packages/coding-agent/src/core/settings-manager.ts:95`).
- Skills are supported via Agent Skills-style `SKILL.md`, loaded from global/project/package/settings/CLI locations (`pi-mono/packages/coding-agent/docs/skills.md:24`, `pi-mono/packages/coding-agent/docs/skills.md:89`).
- Built-in providers and auth flow are explicit; auth resolution order is implemented in code (`pi-mono/packages/ai/src/types.ts:18`, `pi-mono/packages/coding-agent/docs/providers.md:183`, `pi-mono/packages/coding-agent/src/core/auth-storage.ts:277`).
- Context reliability includes auto-compaction and overflow recovery that compacts then auto-continues (`pi-mono/packages/coding-agent/src/core/agent-session.ts:1598`, `pi-mono/packages/coding-agent/src/core/agent-session.ts:1728`).
- Transient error auto-retry exists with exponential backoff and configurable settings (`pi-mono/packages/coding-agent/src/core/agent-session.ts:2091`, `pi-mono/packages/coding-agent/src/core/agent-session.ts:2127`, `pi-mono/packages/coding-agent/docs/settings.md:77`).
- Supported integration surfaces are interactive CLI/TUI, print/json mode, RPC over stdio JSON lines, and SDK embedding (`pi-mono/packages/coding-agent/README.md:29`, `pi-mono/packages/coding-agent/docs/rpc.md:21`, `pi-mono/packages/coding-agent/docs/sdk.md:3`).
- System prompt override/append supports project and global files with project-first discovery (`pi-mono/packages/coding-agent/README.md:263`, `pi-mono/packages/coding-agent/src/core/resource-loader.ts:745`).

## Unknowns / gaps
- No explicit built-in web browsing tool was found in core built-in tool list; web-style behavior appears to be expected through skills/extensions (`pi-mono/packages/coding-agent/README.md:483`, `pi-mono/packages/coding-agent/docs/skills.md:199`).
- No built-in MCP client/server subsystem exists in core harness; docs explicitly state "No MCP" and point to extension-based additions (`pi-mono/packages/coding-agent/README.md:413`).
- No built-in sub-agent orchestration exists in core harness; docs explicitly state "No sub-agents" (`pi-mono/packages/coding-agent/README.md:415`).

## Ambiguities and suggested follow-ups
- Sandbox semantics are intentionally minimal in core (no permission popups), but "sandbox" can still be implemented externally via extensions/containers.
  - Evidence: `pi-mono/packages/coding-agent/README.md:417`, `pi-mono/packages/coding-agent/docs/extensions.md:19`.
  - Follow-up: add a field separating "core sandbox" vs "extension-enforced policy patterns".
- Default branch was taken from local git metadata (`refs/remotes/origin/HEAD`).
  - Evidence: `pi-mono/.git/refs/remotes/origin/HEAD:1`.
  - Follow-up: optionally cross-check with GitHub API in a network-enabled pass.
- "No edit retry loop" is based on tool and agent-loop behavior (errors returned; no dedicated edit-specific repair pass).
  - Evidence: `pi-mono/packages/coding-agent/src/core/tools/edit.ts:217`, `pi-mono/packages/agent/src/agent-loop.ts:333`.
  - Follow-up: inspect model-facing prompts/tests to see whether retries are expected at prompt level.

## Optional advanced capabilities scan
- MCP support: not in core; extension path only (`pi-mono/packages/coding-agent/README.md:413`, `pi-mono/packages/coding-agent/README.md:320`).
- Multi-agent/subagent orchestration: not in core; extension/workflow path only (`pi-mono/packages/coding-agent/README.md:415`).
- External plugin ecosystem: present via extensions + pi packages (`pi-mono/packages/coding-agent/docs/extensions.md:5`, `pi-mono/packages/coding-agent/docs/packages.md:5`).
- Web browsing tools: not found as built-in core tools (`pi-mono/packages/coding-agent/README.md:483`).

## Extra findings (not yet in DATA_MODEL.md)

### Suggested field: `messaging.queue_controls`
- Why it matters: Harnesses differ significantly in how they handle user steering during long tool runs.
- Finding: Pi has explicit steering vs follow-up queue semantics and modes.
- Citations:
  - `pi-mono/packages/coding-agent/README.md:191` (steering/follow-up behavior)
  - `pi-mono/packages/coding-agent/src/core/agent-session.ts:916` (`steer()` semantics)
  - `pi-mono/packages/coding-agent/src/core/agent-session.ts:936` (`followUp()` semantics)

### Suggested field: `extensions.ui_bridge_modes`
- Why it matters: Extension portability depends on what UI primitives survive outside interactive mode.
- Finding: RPC mode maps extension UI calls into protocol messages; some UI capabilities are unavailable in RPC.
- Citations:
  - `pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts:118`
  - `pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts:164`
  - `pi-mono/packages/coding-agent/src/modes/rpc/rpc-mode.ts:201`

### Suggested field: `packages.filtering_controls`
- Why it matters: Resource filtering granularity affects safety and reproducibility when consuming third-party packages.
- Finding: Pi supports include/exclude and exact force include/exclude patterns (`!`, `+`, `-`) for package resources.
- Citations:
  - `pi-mono/packages/coding-agent/docs/packages.md:190`
  - `pi-mono/packages/coding-agent/src/core/package-manager.ts:537`
  - `pi-mono/packages/coding-agent/src/core/package-manager.ts:544`

