# Codex Harness Review (V1)

## Summary
- Scope reviewed: `harness-matrix/agents/codex.yaml`, `harness-matrix/reports/codex.md`, `harness-matrix/DATA_MODEL.md`.
- Citation coverage: pass (`47/47` leaf fields include evidence).
- Report citation paths/lines: pass (all refs in `harness-matrix/reports/codex.md` resolve).
- Publish readiness: **blocked** on evidence quote accuracy and a few overreach/value-shape issues.

## Blocking issues (must fix)
- Quote/ref mismatches: these evidence quotes do not match the cited `path:line` exactly.

| Field | Evidence ref | Issue | Suggested fix |
|---|---|---|---|
| `platforms` | `codex/docs/install.md:7` | Quote omits markdown emphasis around `via WSL2`. | Update quote text to exact source formatting or use an exact substring. |
| `edit.anchoring` | `codex/codex-rs/apply-patch/src/lib.rs:397` | Quote is on line 398, not 397. | Move ref to line 398. |
| `edit.verification` | `codex/codex-rs/core/src/tools/handlers/apply_patch.rs:166` | Quote is on line 168/255, not 166. | Move ref to line 168 (or 255). |
| `edit.failure_modes` | `codex/codex-rs/apply-patch/src/lib.rs:454` | Quote is on line 455, not 454. | Move ref to line 455. |
| `tools.sandbox` | `codex/codex-rs/core/src/sandboxing/mod.rs:204` | Quote is on line 205/208, not 204. | Move ref to line 205 (or 208). |
| `config.locations` | `codex/codex-rs/core/src/config_loader/mod.rs:88` | Quote differs from source spacing (`user      ...`). | Use exact quoted substring from line 88. |
| `config.env_vars` | `codex/codex-rs/core/src/model_provider_info.rs:243` | Quote uses backticks not present in source line. | Remove markdown backticks in quote. |
| `config.env_vars` | `codex/codex-rs/core/src/model_provider_info.rs:245` | Quote uses backticks not present in source line. | Remove markdown backticks in quote. |
| `extensions.mcp` | `codex/codex-rs/core/src/config/types.rs:232` | Quote is on line 234, not 232. | Move ref to line 234. |
| `providers.supported` | `codex/codex-rs/core/src/model_provider_info.rs:5` | Quote spans line break and does not appear exactly on cited line. | Shorten quote to exact line-5 text or move to a single-line exact quote. |
| `reliability.auto_retry` | `codex/codex-rs/core/src/codex.rs:4805` | One-line quote spans two lines in code. | Quote exact line 4805 or 4806 only. |
| `reliability.auto_retry` | `codex/codex-rs/core/src/codex.rs:4827` | Quote is on line 4829, not 4827. | Move ref to line 4829. |
| `reliability.auto_retry` | `codex/codex-rs/core/src/model_provider_info.rs:159` | Quote is on line 160, not 159. | Move ref to line 160. |
| `reliability.recovery_loops` | `codex/codex-rs/core/src/codex.rs:4479` | One-line quote spans lines 4479-4480. | Quote exact line content from 4479 only, or adjust quote to exact substring. |
| `customization.system_prompt` | `codex/codex-rs/core/src/config/mod.rs:908` | Quote text appears elsewhere (line 1653), not at 908. | Repoint ref to 1653 or use exact line-908 text. |
| `customization.system_prompt` | `codex/codex-rs/core/src/project_doc.rs:11` | Quote spans lines 11-12, not exact at one line. | Use exact line-11 substring or adjust quote. |

- `extras.*` value semantics are not evidence-backed facts in multiple entries (values read like “why it matters” commentary, not harness behavior claims), which violates the evidence requirement for leaf values.
  - Affected: `extras.integration.app_server_protocol_versioning`, `extras.reliability.transport_fallbacks`, `extras.skills.system_skill_cache`, `extras.ux.event_opt_out_controls`.

## Non-blocking issues (nice to fix)
- `edit.verification` includes an inferred clause (“no fuzzy merge path”) but is marked `high`; this is safer as `medium` unless directly cited.
- `harness-matrix/reports/codex.md` mostly aligns, but it repeats one inference (`partial-apply`) in a way that would be stronger with a direct assertion test citation.

## Suggested additional sources to cite
- `codex/codex-rs/core/src/config_loader/README.md`
- `codex/docs/config.md`
- `codex/codex-rs/core/src/tools/spec.rs`
- `codex/codex-rs/app-server/README.md`
- `codex/codex-rs/apply-patch/tests/fixtures/scenarios/015_failure_after_partial_success_leaves_changes/`

## Fields to downgrade or remove
- Downgrade to `medium`: `edit.verification`.
- Rewrite (or remove if not rewritten as factual capability statements):
  - `extras.integration.app_server_protocol_versioning`
  - `extras.reliability.transport_fallbacks`
  - `extras.skills.system_skill_cache`
  - `extras.ux.event_opt_out_controls`
