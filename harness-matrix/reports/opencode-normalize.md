## Normalization summary (`opencode`)

- Applied every blocking fix from `reports/opencode-review.md` (line-accurate refs and exact quote substrings) across `edit.verification`, `tools.*`, `config.*`, `extensions.*`, `providers.*`, `ux.*`, `context.compaction`, `reliability.recovery_loops`, `integration.*`, `customization.prompt_templates`, and `distribution.artifacts`.
- Downgraded `tools.sandbox.confidence` and `reliability.auto_retry.confidence` from `high` to `medium` per reviewer guidance.
- Rewrote `extras.tools.model_conditional_exposure`, `extras.integration.local_rpc_mode`, `extras.reliability.loop_guard_doom_loop`, and `extras.config.variable_substitution` values as factual capability statements.
- Kept all existing claims; no fields were removed for missing evidence.
