# Launch Plan (V1)

V1 dataset for `codex`, `pi`, and `opencode` is now review-clean (publish ready).

## Goal

Ship a public website that helps users pick a harness by comparing the highest-signal harness properties, with every claim source-backed.

## Deliverables

- Dataset: `harness-matrix/agents/*.yaml`
- Evidence reports: `harness-matrix/reports/*.md` and `harness-matrix/reports/*-review.md`
- Website (static): matrix + detail pages + evidence viewer + contribution docs

## Decisions (Product Owner)

1. Public name: site title + repo name.
2. Hosting: GitHub Pages vs Vercel (static).
3. UI stance: no “overall score” in V1 (recommended), only filters + picker rubric.

## Build Steps

1. Freeze dataset snapshot
   - Tag a “v1 dataset” commit hash (no automation required yet).
2. Build the website
   - Static build that reads YAML at build time.
   - Pages:
     - Home: “why harness” + quick picker + compare matrix.
     - Compare: table view with filters.
     - Harness detail: sections + evidence list per field.
     - Contribute: how to add a new harness entry.
3. Add validation
   - CI check that every leaf has evidence and that refs resolve to files/lines.
4. Deploy
   - `main` branch auto-deploy.
5. Announce
   - Short post + “how to contribute” CTA.

