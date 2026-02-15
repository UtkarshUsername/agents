## Normalization summary (`pi`)

- Normalized `edit.mechanism.value` to list shape (`[str_replace]`).
- Normalized `edit.failure_modes.value` from string list to object list (`{ mode, detail? }`), preserving each original mode.
- Replaced placeholder-style `quote:` snippets with exact source excerpts for all affected evidence items.
- Added `extras.*` entries from `reports/pi.md`: `messaging.queue_controls`, `extensions.ui_bridge_modes`, and `packages.filtering_controls`.
- Kept all existing claims; no fields were removed for missing evidence.
