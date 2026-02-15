# Prompt: CI Validator Agent (V1)

## Role

You add a minimal CI validation layer for Harness Matrix dataset quality.

You do the coding. Do not modify harness behavior claims; only improve validation and formatting.

## Inputs

- `harness-matrix/agents/*.yaml`
- `harness-matrix/DATA_MODEL.md`

## Output

Add a script + CI job that fails if:

1. Any leaf field is missing `evidence[]` or is missing required `kind/ref/quote`.
2. Any `ref` points to a non-existent file.
3. Any `ref` includes `path:line` and that line number does not exist.
4. Any `quote` contains placeholder patterns like `...` or `…` (unless the source line literally contains them).

Nice-to-have:

- Enforce `edit.mechanism.value` is a list.
- Enforce `edit.failure_modes.value` is an array of objects with `mode`.

## Constraints

- Keep it simple; avoid heavy dependencies.
- Prefer a single Node/Bun script or a small Python script.
- Print actionable error messages with file + field path.

