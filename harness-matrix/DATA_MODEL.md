# Data Model (V1)

V1 data is “facts with sources”. We are not ranking models. We are documenting harness behavior and knobs so users can pick a harness.

## Entity: Harness

Each harness entry has:

- Stable `id` (kebab-case)
- Display `name`
- `repo` metadata (URL, default branch, pinned commit for the scan)
- Fields grouped by category
- Per-field evidence + confidence

### Evidence Object

Each claim must carry at least one evidence item:

- `kind`: `code | docs | issue | benchmark`
- `ref`: a pointer that a human can open
  - code: `path:line` within the repo at the pinned commit
  - docs: `path:line` (within repo) or a stable URL
  - issue: URL + short context
  - benchmark: URL + method summary
- `quote`: short excerpt (max ~200 chars)
- `notes`: optional clarifications

### Confidence Levels

- `high`: directly supported by code and/or explicit docs, unambiguous
- `medium`: supported but involves inference (we explain the inference)
- `low`: weak/indirect support; included only if useful and clearly labeled

## Canonical Fields (V1)

### Core Metadata

- `id`
- `name`
- `repo.url`
- `repo.default_branch`
- `repo.pinned_commit` (SHA used for the scan)
- `license`
- `primary_language`
- `platforms` (linux/macos/windows)

### Edit Mechanism

- `edit.mechanism`:
  - `apply_patch` (diff-like blob)
  - `str_replace` (exact replace)
  - `rewrite_file` (full rewrite)
  - `anchored` (hashline/ID anchored edits)
  - `custom` (describe)
- `edit.anchoring` (free text + evidence)
- `edit.verification` (reject/merge/partial apply)
- `edit.retry_loop` (auto-retry? how?)
- `edit.failure_modes[]` (each with evidence)

### Tools

- `tools.available[]` (e.g., read, write, edit, exec, search, web, etc.)
- `tools.schema_style` (json schema, string protocol, mcp, etc.)
- `tools.sandbox` (what boundaries exist)

### Config & Extensibility

- `config.locations[]` (paths, precedence)
- `config.env_vars[]` (name + meaning)
- `extensions.skills`:
  - `supported` (bool)
  - `locations[]` (where skills are stored/loaded from)
  - `format` (markdown, yaml, json, code, etc.)
- `extensions.plugins` (if any)
- `extensions.mcp` (if any)

### Providers

- `providers.supported[]` (names)
- `providers.auth` (env/login)
- `providers.model_selection` (flags/config/interactive)

### UX & Workflow

- `ux.interface` (cli/tui)
- `ux.streaming` (yes/no + notes)
- `ux.review_controls` (approval modes, confirmations)
- `ux.sessions` (where state is stored, if any)

### Context & Reliability (V1)

These often determine whether a harness stays usable after the first 20 minutes.

- `context.compaction` (summarization/compaction strategy, triggers, configurability)
- `context.overflow_handling` (what happens on context overflow: fail, compact+retry, etc.)
- `reliability.auto_retry` (retry on transient provider errors: rate limit/5xx/overloaded)
- `reliability.recovery_loops` (any automated “repair loop” behavior)

### Integration (V1)

Important for people embedding a harness into other tooling.

- `integration.sdk` (is there a supported SDK? language/package)
- `integration.modes` (interactive, JSON event stream, RPC, etc.)
- `integration.protocol` (if RPC exists: transport + message framing + events)

### Customization Surface (V1)

This captures “how do I make it behave the way I want”.

- `customization.system_prompt` (override/append locations + precedence)
- `customization.prompt_templates` (locations + format)
- `customization.keybindings` (locations + format, if applicable)
- `customization.themes` (locations + format, if applicable)

### Packaging & Distribution (V1, optional)

- `distribution.artifacts` (npm, standalone binary, bun compile, etc.)
- `packages.install_locations` (global vs project-local install dirs, if it has a package system)

## Minimal YAML Shape (Collector Output)

Collector agents should produce YAML roughly like this:

```yaml
id: codex
name: Codex CLI
repo:
  url: https://github.com/openai/codex
  default_branch: main
  pinned_commit: "<sha>"
edit:
  mechanism:
    value: apply_patch
    confidence: high
    evidence:
      - kind: docs
        ref: codex/README.md:123
        quote: "..."
tools:
  available:
    value: ["read", "edit", "write", "exec"]
    confidence: medium
    evidence: []
```

Notes:

- Every leaf field is a `{ value, confidence, evidence[] }` triple.
- Arrays are the `value` of a leaf field; each element can optionally carry its own evidence if needed.

## Non-Goals for V1 Data

- No “overall score”
- No unverifiable behavioral claims
- No “best model” claims
