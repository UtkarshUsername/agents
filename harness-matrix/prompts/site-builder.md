# Prompt: Site Builder Agent (V1)

## Role

You are building the **public website** for Harness Matrix V1. This is not a mock; it must be deployable.

You do the coding. Do not change dataset content except for mechanical build integration needs.

## Inputs

- Dataset: `harness-matrix/agents/*.yaml`
- Reports: `harness-matrix/reports/*.md` and `harness-matrix/reports/*-review.md`
- Data model: `harness-matrix/DATA_MODEL.md`
- Decision guide: `harness-matrix/DECISION_GUIDE.md`

## Output

A static site (Astro) that:

- Loads YAML at build time
- Renders a compare matrix and per-harness detail pages
- Always shows evidence for every displayed claim

## Required Pages

1. `/`
   - What this is + why harness matters (short).
   - A “pick a harness” section: 4-6 questions that filter the matrix (no scoring).
2. `/compare`
   - Matrix table: rows = harnesses; columns = high-signal fields:
     - edit mechanism(s) + default
     - tools available
     - sandbox/approvals summary
     - config locations
     - skills/extensions
     - providers supported
     - compaction/auto-retry
     - integration modes (json/rpc/sdk)
   - Filters: by OS, by edit mechanism, by MCP support, by SDK/RPC, by sandboxing.
3. `/h/<id>`
   - Full field list grouped by section.
   - Each field shows: value, confidence, and expandable evidence list.
4. `/contribute`
   - Render `harness-matrix/CONTRIBUTING.md`.

## Evidence UX Requirements

- Evidence items must display `kind`, `ref`, and `quote`.
- `ref` should be copyable and readable; if it’s a repo file path, link to the file on GitHub at the pinned commit if possible (derive from `repo.url` + `repo.pinned_commit`).
- Keep evidence compact by default; expand on click.

## Data Handling Requirements

- Support `extras.*` and render them under an “Extras” section.
- Treat `edit.mechanism.value` as a list.
- Treat `edit.failure_modes.value` as list of `{mode, detail?}` objects.

## Quality Bar

- Responsive, fast, and readable.
- No broken pages if a field is missing; degrade gracefully.
- No “AI slop” styling; this should look like a credible standards reference.
