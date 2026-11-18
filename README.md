# Alpha Kids Practical Test

A small parenting coach for the [Alpha Kids](https://alpha.kids/) practical test. A parent types a
concern in English or Roman Urdu, and an LLM coach replies with a short, structured, safe plan and a
follow-up check-in. It escalates clearly when the parent describes an emergency, abuse or self-harm.

> **Status:** the app is scaffolded and the coach is not built yet. The [project wiki](wiki/index.md)
> records the current state, the plan and every decision.

## Run it locally

The app runs locally only; there is no hosted demo ([why](wiki/adr-0005-local-only.md)).

### Prerequisites

- [Vite+](https://viteplus.dev/guide/), the `vp` command. It provides the pinned Node.js and pnpm
  versions; see `vp env` for runtime management.

### Install and start

```bash
vp install          # install dependencies with the pinned pnpm
vp run build        # production build (Next.js)
vp run start        # serve it at http://localhost:3000
```

For development, run `vp run dev` instead. Use `vp run <script>` for this project's scripts: the
built-in `vp dev` and `vp build` run Vite, not Next.js.

## Checks

```bash
vp run typegen      # generate Next.js route types (needed once on a fresh clone)
vp check            # format, lint and type check
vp test             # unit tests (Vitest)
vp run wiki:lint    # check the wiki's links, indexes and frontmatter
```

CI runs these checks and the build on every pull request. They must pass before anything merges into
`main`.

## Project wiki

The [`wiki/`](wiki/index.md) directory is the project's memory. It holds the research, architectural
decision records, tickets, a Kanban board and a record of every working session. Start at the
[home page](wiki/index.md).
