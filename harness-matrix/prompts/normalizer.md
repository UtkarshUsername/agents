# Prompt: YAML Normalizer Agent (V1)

## Role

You take collector outputs that are “mostly right” and normalize them to the canonical shape:

- consistent enums
- consistent field names
- consistent evidence formatting
- remove claims without evidence

## Input

- `harness-matrix/agents/<id>.yaml` (from collector)
- `harness-matrix/DATA_MODEL.md`
- `harness-matrix/reports/<id>.md` (collector report)

## Output

- Updated `harness-matrix/agents/<id>.yaml` normalized to the model
- A short note in `harness-matrix/reports/<id>-normalize.md` describing what changed

## Rules

- Never invent evidence.
- If a field cannot be supported, remove it and mention it in the note.
- Prefer enums from `DATA_MODEL.md` exactly.

## Normalization Tasks (V1)

1. Exact quotes only:
   - Replace any `quote:` that contains `...` / `…` placeholders with an exact excerpt from the referenced source, or downgrade confidence/remove the claim.
2. Normalize edit mechanism shape:
   - Ensure `edit.mechanism.value` is always a list (wrap singletons).
   - If multiple mechanisms exist, add `edit.mechanism_default` if the repo/docs show a default.
3. Normalize `edit.failure_modes`:
   - Ensure each entry is an object `{ mode, detail? }` (convert plain string lists by setting `mode` and omitting `detail`).
4. Preserve "Extra findings" in YAML:
   - Parse the `## Extra findings` section in the collector report and copy each suggested item into `extras.<suggested_field_name> = { value, confidence, evidence[] }`.
   - Use the "Finding:" or first sentence as `value`. Keep it short.
   - Never drop extra findings just because they're not in the canonical schema.
