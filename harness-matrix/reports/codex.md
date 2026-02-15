# Codex Harness Collection Report

## What I scanned
- Repo root and metadata: `codex/README.md`, `codex/docs/install.md`, `codex/docs/config.md`, `codex/docs/contributing.md`, `codex/.git/HEAD`, `codex/.git/refs/heads/main`
- Tooling/edit path: `codex/codex-rs/core/src/tools/spec.rs`, `codex/codex-rs/core/src/tools/handlers/apply_patch.rs`, `codex/codex-rs/core/src/tools/handlers/tool_apply_patch.lark`, `codex/codex-rs/apply-patch/src/invocation.rs`, `codex/codex-rs/apply-patch/src/lib.rs`
- Sandbox/approval path: `codex/codex-rs/core/src/sandboxing/mod.rs`, `codex/codex-rs/core/src/tools/sandboxing.rs`, `codex/codex-rs/core/src/exec_policy.rs`
- Config/skills/extensibility: `codex/codex-rs/core/src/config_loader/mod.rs`, `codex/codex-rs/core/src/config_loader/README.md`, `codex/codex-rs/core/src/config/mod.rs`, `codex/codex-rs/core/src/config/types.rs`, `codex/codex-rs/core/src/skills/loader.rs`, `codex/codex-rs/core/src/skills/system.rs`, `codex/codex-rs/core/src/project_doc.rs`, `codex/codex-rs/core/src/custom_prompts.rs`
- Providers/reliability/context: `codex/codex-rs/core/src/model_provider_info.rs`, `codex/codex-rs/core/src/codex.rs`, `codex/codex-rs/core/src/compact.rs`, `codex/codex-rs/codex-client/src/retry.rs`
- Modes/integration/sdk/sessions: `codex/codex-rs/cli/src/main.rs`, `codex/codex-rs/exec/src/cli.rs`, `codex/codex-rs/exec/src/lib.rs`, `codex/codex-rs/app-server/README.md`, `codex/sdk/typescript/README.md`, `codex/codex-rs/core/src/rollout/mod.rs`, `codex/codex-rs/core/src/rollout/recorder.rs`, `codex/codex-rs/core/src/rollout/session_index.rs`

## High-confidence findings
- Codex uses an `apply_patch` edit tool exposed as both freeform grammar and JSON function form (`codex/codex-rs/core/src/tools/handlers/apply_patch.rs:268`, `codex/codex-rs/core/src/tools/handlers/apply_patch.rs:281`, `codex/codex-rs/core/src/tools/handlers/tool_apply_patch.lark:1`).
- Edit anchoring is context-based (`@@` + old lines), with explicit failures when context/expected lines are not found (`codex/codex-rs/apply-patch/src/lib.rs:386`, `codex/codex-rs/apply-patch/src/lib.rs:397`, `codex/codex-rs/apply-patch/src/lib.rs:454`).
- Tool surface is broad: exec, apply_patch, file read/list/search, MCP resource tools, planning/input tools, JS REPL, web search, collab/subagent tools, dynamic tools (`codex/codex-rs/core/src/tools/spec.rs:1458`, `codex/codex-rs/core/src/tools/spec.rs:1484`, `codex/codex-rs/core/src/tools/spec.rs:1516`, `codex/codex-rs/core/src/tools/spec.rs:1562`, `codex/codex-rs/core/src/tools/spec.rs:1581`, `codex/codex-rs/core/src/tools/spec.rs:1610`).
- Sandbox + approval are first-class: platform sandbox backends, policy-driven approvals, and execpolicy allow/prompt/forbid (`codex/codex-rs/core/src/sandboxing/mod.rs:161`, `codex/codex-rs/core/src/tools/sandboxing.rs:160`, `codex/codex-rs/core/src/exec_policy.rs:191`).
- Config layering and precedence are explicit across admin/system/user/project/runtime layers (`codex/codex-rs/core/src/config_loader/mod.rs:83`, `codex/codex-rs/core/src/config_loader/mod.rs:88`, `codex/codex-rs/core/src/config_loader/mod.rs:92`).
- Skills are supported with multiple roots and scope ordering; `SKILL.md` is the primary unit (`codex/codex-rs/core/src/skills/loader.rs:93`, `codex/codex-rs/core/src/skills/loader.rs:188`, `codex/codex-rs/core/src/skills/loader.rs:210`, `codex/codex-rs/core/src/skills/loader.rs:218`).
- MCP is supported in both directions: Codex as MCP client and experimental MCP server (`codex/codex-rs/README.md:33`, `codex/codex-rs/README.md:37`, `codex/codex-rs/cli/src/main.rs:99`).
- Context compaction and reliability loops are implemented: token-threshold auto-compaction, overflow handling in compact loop, stream retries/backoff, fallback transport (`codex/codex-rs/core/src/codex.rs:4426`, `codex/codex-rs/core/src/codex.rs:4520`, `codex/codex-rs/core/src/compact.rs:168`, `codex/codex-rs/core/src/codex.rs:4805`, `codex/codex-rs/core/src/codex.rs:4813`).
- Integration modes are well-defined: interactive default, non-interactive exec, JSONL output, MCP server mode, app-server JSON-RPC transport; TypeScript SDK is supported (`codex/codex-rs/cli/src/main.rs:54`, `codex/codex-rs/exec/src/cli.rs:89`, `codex/codex-rs/app-server/README.md:22`, `codex/sdk/typescript/README.md:5`).
- Session persistence uses JSONL rollouts and session index files under Codex home (`codex/codex-rs/core/src/rollout/recorder.rs:63`, `codex/codex-rs/core/src/rollout/mod.rs:5`, `codex/codex-rs/core/src/rollout/session_index.rs:16`).

## Unknowns and gaps
- No dedicated, documented keybinding customization location was found; shortcuts appear code-defined (`codex/codex-rs/tui/src/bottom_pane/footer.rs:681`).
- No dedicated, documented theme customization location was found in config surfaces scanned; TUI color behavior references terminal palette semantics (`codex/codex-rs/tui/src/terminal_palette.rs:159`).
- `extensions.plugins` is represented as dynamic tools + connector tooling, but no standalone plugin registry/package manager API was identified in scanned sources (`codex/codex-rs/core/src/tools/spec.rs:1610`, `codex/docs/config.md:17`).

## Ambiguous areas and suggested follow-ups
- Default branch evidence is from local git metadata plus docs language around `main`; if strict “docs-only” is required, add a policy note that local git metadata is accepted (`codex/.git/HEAD:1`, `codex/docs/contributing.md:33`).
- `apply_patch` partial-apply behavior is strongly suggested by sequential write flow and fixture naming; adding/pointing to a direct assertion in tests would make this fully explicit (`codex/codex-rs/apply-patch/src/lib.rs:278`, `codex/codex-rs/apply-patch/tests/fixtures/scenarios/015_failure_after_partial_success_leaves_changes/patch.txt:1`).

## Inferences made
- `edit.retry_loop` was marked as no auto-retry based on one-pass handler flow and explicit error returns, not on a doc statement (`codex/codex-rs/core/src/tools/handlers/apply_patch.rs:107`, `codex/codex-rs/core/src/tools/handlers/apply_patch.rs:166`).
- `customization.keybindings` and `customization.themes` were marked medium-confidence “not found” due absence in scanned config surfaces; this is an absence-based inference.

## Extra findings (not yet in DATA_MODEL.md)
- Suggested field: `integration.app_server_protocol_versioning`
  why it matters: Harness pickers embedding Codex need to know transport/message compatibility and generation workflow.
  citations: `codex/codex-rs/app-server/README.md:39`, `codex/codex-rs/app-server/README.md:42`, `codex/codex-rs/cli/src/main.rs:339`
- Suggested field: `reliability.transport_fallbacks`
  why it matters: Automatic fallback from WebSocket streaming to HTTPS can reduce outage impact in unstable networks.
  citations: `codex/codex-rs/core/src/codex.rs:4813`, `codex/codex-rs/core/src/codex.rs:4818`
- Suggested field: `skills.system_skill_cache`
  why it matters: System-skill cache location/install behavior affects reproducibility and policy controls in managed environments.
  citations: `codex/codex-rs/core/src/skills/system.rs:22`, `codex/codex-rs/core/src/skills/system.rs:40`
- Suggested field: `ux.event_opt_out_controls`
  why it matters: Clients integrating event streams may need fine-grained event suppression for performance/noise control.
  citations: `codex/codex-rs/app-server/README.md:526`, `codex/codex-rs/app-server/README.md:530`
