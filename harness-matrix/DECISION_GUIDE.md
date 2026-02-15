# Picking a Harness (V1)

This guide is how we’ll make the matrix immediately useful even before we ship a fancy UI.

## Start With These Questions

1. Do you need a harness that is reliable across *different* models/providers?
2. Do you need strong sandboxing (no network, restricted FS, approvals)?
3. Do you want a rich skills/plugins ecosystem or minimal moving parts?
4. Do you care about a first-class TUI experience (streaming, review UX)?

## High-Signal Fields (What to Look At First)

- `edit.mechanism`: this often dominates “does it actually work”
- `edit.verification` + `edit.failure_modes`: how it fails matters as much as success rate
- `tools.available` + `tools.schema_style`: flexibility vs robustness
- `config.locations` + `extensions.skills.locations`: how painful customization is
- `tools.sandbox`: whether you can safely run it on real codebases

## Practical Heuristics (No Scoring, Just Guidance)

- If you want cross-model reliability:
  - Prefer edit mechanisms that do *not* require perfect reproduction of old text.
  - Prefer mechanisms with explicit verification (reject on mismatch) over “silent partial applies”.
- If you want safety:
  - Prefer harnesses with clear sandbox boundaries and explicit approval flows.
- If you want “easy to customize”:
  - Prefer harnesses with documented config precedence and a simple skills location model.

## Why We Emphasize Edit Mechanism

Per the referenced article that inspired this project, changing only the edit tool can produce large jumps in real-world success without changing the model. That means harness design is not “UI polish”; it’s core reliability engineering.

