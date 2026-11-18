---
name: wiki-update
description: Record new information in the project's LLM wiki (wiki/), including research findings, decisions (ADRs), tickets and Kanban moves, session records, sources, log entries and open questions. Use whenever something is learned, decided, discussed or done, and always before ending a working session.
---

# wiki-update

The standing rule: **everything we discuss, decide and do is recorded in the wiki.** Read `wiki/conventions.md` first if you haven't this session.

## What goes where

| Event                                                       | Action                                                                                                                                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New raw input (brief, email, pasted doc, reviewer feedback) | Create `source-<slug>.md` with the content verbatim. Never edit it later                                                                                                               |
| Learned something (web, docs, experiment)                   | Create or extend `research-<topic>.md` with inline source links and the date accessed. Label inferences                                                                                |
| Decision with real alternatives                             | Create `adr-NNNN-<slug>.md` (next free number) with Context, Options considered, Decision and Consequences. Status starts as `proposed` until the user agrees, then becomes `accepted` |
| Decision reversed                                           | Set the old ADR to `superseded`, link it to the new ADR, and link the new ADR back                                                                                                     |
| New piece of work                                           | Create `ticket-NNNN-<slug>.md` with acceptance criteria and its requirement IDs                                                                                                        |
| Work started or finished                                    | Update the ticket's `status` and checkboxes, **and** move it on `kanban.md`, **and** update its row in `index-tickets.md`                                                              |
| Unresolved question                                         | Add a row to `open-questions.md`. When answered, strike it through (`~~Qn~~`) and link the answer                                                                                      |
| Working conversation                                        | Create or extend `session-YYYY-MM-DD-NN-<slug>.md`: requests (quoted when wording matters), options discussed, decisions, work done, what is still open                                |
| Anything notable                                            | Append one line to `log.md`: `YYYY-MM-DD: [type] what (links)`                                                                                                                         |

## Every update must also

1. Set `updated:` in the frontmatter of every page you touch.
2. Add or refresh the page's row in its category index (`index-*.md`) with the current `summary` and `status`.
3. Refresh the **Current state** section of `wiki/index.md` if the phase, the key decisions or "next" changed.
4. Link generously: new pages link to related pages, and related pages link back.
5. Run the linter and fix anything it reports:

   ```bash
   node .claude/skills/wiki-maintain/scripts/lint.mjs wiki
   ```

## Rules

- Flat directory only. No subfolders. Use relative links like `[Text](page.md)`, never `[[wikilinks]]`.
- Write for humans too: headings, short paragraphs, tables.
- No secrets (API keys) and no real personal data. The wiki is submitted to Alpha Kids.
- Don't rewrite history. `log.md` is append-only, and `source-*` pages are frozen.
