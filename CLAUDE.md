# Alpha Kids Practical Test

A small bilingual (English and Roman Urdu) LLM parenting coach, built as an interview practical test for [Alpha Kids](https://alpha.kids/). The brief is in `wiki/source-practical-test-brief.md`.

## The wiki comes first

`wiki/` is the project's memory and is **submitted with the code**. It records all research, decisions (ADRs), plans, tickets, the Kanban board and a record of every session. **Everything we discuss, decide and do must be recorded there.**

Use the project skills. Prefer them over ad-hoc reading and editing:

| When | Skill |
|---|---|
| Starting a session, answering a project question, or before researching something | **`wiki-query`**. Start at `wiki/index.md` |
| Something was learned, decided, discussed or done, and **always before ending a session** | **`wiki-update`** |
| After many edits, before committing or submitting, or when something seems inconsistent | **`wiki-maintain`** (runs `node .claude/skills/wiki-maintain/scripts/lint.mjs wiki`) |
| Committing anything | **`git-commit`**: atomic commits, Unicode gitmoji, imperative subject, body with *what* in the imperative and *why* in the indicative (`wiki/adr-0006-gitmoji-atomic-commits.md`) |

Wiki rules (full detail in `wiki/conventions.md`):
- Keep it flat: no subdirectories. Filename prefixes give the type: `source-`, `research-`, `adr-NNNN-`, `ticket-NNNN-`, `session-YYYY-MM-DD-NN-`, `index-`.
- Use relative Markdown links (`[Text](page.md)`), never `[[wikilinks]]`. Links must work in VS Code and on GitHub.
- Every page has frontmatter (`title`, `type`, `status`, `updated`, `summary`) and appears in its category index.
- No secrets or real personal data in the wiki.

## How we work

- **Minimal scope.** Throwaway-sized: implement the brief well, with no extras (`wiki/adr-0002-minimal-scope-tdd.md`).
- **TDD.** Write a failing test first. The LLM is mocked in unit tests; live calls happen only in an opt-in smoke test.
- **$0 LLM cost.** Gemini free tier (`wiki/adr-0003-llm-provider.md`). Never commit API keys.
- **Urdu means Roman Urdu (Latin script) only.** No Urdu script and no right-to-left work (`wiki/adr-0004-roman-urdu-only.md`).
- **Local only.** No deployment; the README explains how to build and run it (`wiki/adr-0005-local-only.md`).
- **Work from tickets.** Pick work from `wiki/kanban.md`, and move tickets as their status changes.
- **Safety is the core requirement.** No diagnosis, no medical or legal instructions, and clear escalation for emergencies, abuse or self-harm.
