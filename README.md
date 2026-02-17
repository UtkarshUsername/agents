# Agents Repository



This repository contains an evidence-backed agent harness dataset and a static website that renders side-by-side comparisons.

Only two folders are active project targets:
- `harness-matrix/`
- `website/`

Other top-level folders (`codex/`, `opencode/`, `pi-mono/`) are local reference clones used as research inputs.

## Repository Layout

- `harness-matrix/agents/*.yaml`: canonical harness entries (facts + confidence + evidence).
- `harness-matrix/reports/*.md`: collection and review reports.
- `harness-matrix/DATA_MODEL.md`: schema and evidence rules.
- `harness-matrix/V1_SPEC.md`: v1 scope and goals.
- `website/src/data/loader.ts`: loads YAML data for site pages.
- `website/src/pages/`: Astro routes (`/` and `/h/[id]`).

## Quick Start

Run all commands from `website/`:

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run astro -- check   # Astro/type checks
npm run build            # production build
npm run preview          # preview built site
```

## Data Workflow

1. Update or add harness entries in `harness-matrix/agents/`.
2. Ensure each leaf field follows:
   - `value`
   - `confidence` (`high|medium|low`)
   - `evidence[]` (`kind`, `ref`, `quote`, optional `notes`)
3. Add or update supporting analysis in `harness-matrix/reports/`.
4. Run `npm run astro -- check` and `npm run build` in `website/`.
5. Validate pages locally (`/` and `/h/<id>`).

## Contributing

- Prefer opening/taking up an issue before making a PR.
- Follow Conventional Commits (for example, `feat(website): ...`, `docs(reports): ...`).
- Keep commits scoped to one concern.
- For UI changes, include screenshots in PRs.
- For data-model changes, explain citation rationale and affected fields.
