---
name: wiki-query
description: Answer questions about this project (requirements, research, decisions, plan, tickets, history, current state) from the project's LLM wiki in wiki/. Use before answering any project question, before starting work, and before searching the web for something we may already have researched.
---

# wiki-query

The wiki in `wiki/` is the project's memory. Answer from it first. Go to code or the web only for what it doesn't cover.

## Procedure

1. **Orient.** Read `wiki/index.md` (home and current state). For "what's next or what's in flight", also read `wiki/kanban.md`.
2. **Narrow.** Open the relevant category index:
   - `index-research.md` for "what do we know about X"
   - `index-decisions.md` for "why did we choose X"
   - `index-tickets.md` for "what's the status of X"
   - `index-sessions.md` for "when or how did we discuss X"
   - `index-sources.md` for "what did the brief say"

   The `summary` column is usually enough to pick pages.

3. **Search when unsure.** `grep -ril "<term>" wiki/` finds mentions. The frontmatter `summary:` lines are a quick overview: `grep -h "^summary:" wiki/*.md`.
4. **Read the pages you picked** and follow their links one level deep if needed.
5. **Answer with citations.** Link the wiki pages you relied on, for example `wiki/adr-0003-llm-provider.md`. Say what is **decided**, what is **proposed**, and what is **unknown**. Check ADR and ticket `status`, and never present a proposed ADR as decided.
6. **Write back.** If answering needed new research, or you found a gap or contradiction, use the `wiki-update` skill to record it. A question that came up is useful too: add it to `open-questions.md` if it is unresolved.

## Rules

- `source-*` pages are the ground truth for what Alpha Kids asked for. Research and ADR pages are our interpretation.
- If the wiki and the code disagree, say so and flag it for `wiki-maintain`.
