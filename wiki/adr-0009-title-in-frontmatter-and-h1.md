---
title: "ADR-0009: Page Title in Both Frontmatter and H1"
type: adr
status: accepted
updated: 2026-11-18
summary: Every wiki page keeps its title in the frontmatter (for agents) and repeats it as the only H1 (for humans). markdownlint's MD025 is told not to count the frontmatter title, and the wiki linter fails if the two differ.
---

# ADR-0009: Page Title in Both Frontmatter and H1

Back to: [Decisions](index-decisions.md) · Session: [2026-11-18 #4](session-2026-11-18-04-bootstrap.md) · Rules: [Conventions](conventions.md)

## Context

Opening a wiki page in VS Code showed the markdownlint warning _"MD025/single-title/single-h1: Multiple top-level headings in the same document"_. By default, [MD025](https://github.com/DavidAnson/markdownlint/blob/v0.41.1/doc/md025.md) treats a frontmatter `title` as an H1, so the page's own H1 counts as a second one.

The candidate's constraint: _"a human reading the wiki should be able to see the title clearly and prominently."_ Note that VS Code's Markdown preview hides frontmatter, and GitHub shows it only as a small table above the page.

## Options considered

1. **Use an H2 for the title.** The title is no more prominent than the section headings, and the heading hierarchy becomes misleading.
2. **Remove the H1.** VS Code's preview would show no title at all, which fails the constraint.
3. **Remove `title` from the frontmatter.** One source of truth, but agents lose the one-stop frontmatter overview. It also means changing the wiki linter, the conventions, both wiki skills and every page.
4. **Keep both, and configure MD025** with `front_matter_title: ""`, which is the rule's documented switch for turning off the frontmatter check. Add a linter check that the H1 matches the title.

## Decision

**Option 4.**

- `.markdownlint.jsonc` at the repository root sets `"MD025": { "front_matter_title": "" }`.
- The wiki linter (`vp run wiki:lint`, run in CI) requires exactly one H1 per page, matching the frontmatter `title` word for word.

## Consequences

- Titles stay prominent in VS Code and on GitHub, and agents can still triage pages from the frontmatter alone.
- Every other markdownlint rule still applies, except MD010 (hard tabs) and MD013 (line length), which are off. Oxfmt and `.editorconfig` own indentation (tabs) and line length (prose left unwrapped), so those defaults would contradict the formatter. This was added in a follow-up in the same session.
- Generated agent files are not hand-fixed. The Vite+ block in `CLAUDE.md` sits under a scoped `markdownlint-disable MD025 MD034` comment, `AGENTS.md` gets an H1 (`# Next.js Agent Rules`) above Next's managed block. `next dev` replaces only the text between its markers, which was confirmed by running it, so the H1 survives and MD041 is satisfied.
- `.markdownlint.jsonc` has no trailing comma. The [JSONC spec](https://jsonc.org/) only lets parsers accept one, and its reference parser rejects them by default. An Oxfmt override (`trailingComma: "none"` for `**/*.jsonc`) stops the formatter from adding it back.
- The duplication is deliberate and enforced: a title that drifts from its H1 fails CI.

## See also

- [Log](log.md)
