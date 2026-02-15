# Harness Matrix

A source-backed comparison dataset for open-source CLI agent harnesses, starting with:

- Codex CLI (`codex/`)
- Pi mono (`pi-mono/`)
- OpenCode (`opencode/`)

Goal: help developers pick a harness by comparing the parts that actually make agents reliable in practice (tools, edit mechanism, sandboxing, config, skills/plugins), not just “which model is best”.

## What “Harness” Means Here

This project treats the *harness* as everything between:

- the user (CLI/TUI UX, workflow, session state), and
- the model (provider adapters, prompts/context building), and
- the workspace (read/edit/write/run tools, sandbox, verification, retries, error shaping).

Concretely, the harness includes:

- Tooling layer: which tools exist, tool schemas, tool I/O formatting, error messages
- Edit application: diff/patch vs replace vs rewrite vs anchored edits (and how edits are verified)
- Execution layer: shell/runtime access, sandbox boundaries, network policy, filesystem policy
- Context building: what gets sent to the model, retrieval/indexing, truncation/packing strategies
- State: memory, caches, project awareness, “plans”, multi-agent orchestration (if any)
- Extensibility: config locations, skills/plugins, where they load from, how they’re sandboxed

## Version 1 Deliverable

V1 is a dataset + simple comparison UI (later) that answers:

- “If I want to use model X and value reliability, which harness should I try first?”
- “What edit tool does it use, and what failure modes does that imply?”
- “Where is config stored and how do I customize behavior?”
- “How do skills/plugins work and where are they loaded from?”

Everything in the dataset must be source-backed with citations to docs and/or code.

## Repo Layout

- `harness-matrix/V1_SPEC.md`: what we’re building in v1
- `harness-matrix/DATA_MODEL.md`: canonical fields + evidence rules
- `harness-matrix/DECISION_GUIDE.md`: how to use the matrix to pick a harness
- `harness-matrix/prompts/`: prompts for collection + verification agents

