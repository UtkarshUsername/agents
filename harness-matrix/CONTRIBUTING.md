# Contributing (V1)

V1 contributions are about adding or improving **source-backed harness entries**.

## What We Accept

- New harness entry for an open-source CLI/TUI harness
- Better citations and higher-confidence fields for an existing entry
- New canonical fields (only if they help users pick a harness)

## What We Don’t Accept (V1)

- Unsourced claims
- Rankings without a transparent, reproducible methodology
- Proprietary/closed-source internal behavior claims

## Workflow

1. Run the collector agent using `harness-matrix/prompts/collector.md`.
2. Run the reviewer agent using `harness-matrix/prompts/reviewer.md`.
3. Fix collector YAML until reviewer has no blocking issues.

## Citation Style

- Code refs: `path/to/file.ext:123`
- Doc refs: repo doc paths preferred over external URLs when possible
- Quotes are short excerpts, exact text

## Publishing Standard

An entry is publishable when:

- All leaf fields have evidence
- “High confidence” is reserved for direct support
- Open questions are listed in the report

