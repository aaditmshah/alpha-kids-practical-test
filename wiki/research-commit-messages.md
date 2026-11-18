---
title: "Research: Commit Messages (Gitmoji and the Seven Rules)"
type: research
status: active
updated: 2026-11-18
summary: How to write good commit messages, from cbeams' seven rules and the Gitmoji convention, plus how we combine them with the candidate's mood rule (imperative for what, indicative for why).
---

# Research: Commit Messages (Gitmoji and the Seven Rules)

Back to: [Research](index-research.md) · Decision: [ADR-0006](adr-0006-gitmoji-atomic-commits.md) · Ticket: [ticket-0009](ticket-0009-commit-conventions.md)

Accessed 2026-11-18.

## The seven rules (cbeams, "How to Write a Git Commit Message")

Source: [cbea.ms/git-commit](https://cbea.ms/git-commit/). The premise is that a diff shows _what_ changed, but only the message can explain _why_.

| #   | Rule                                                 | Reason                                                                                                                                |
| --- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Separate the subject from the body with a blank line | `log`, `shortlog` and `rebase` use the blank line to find the subject                                                                 |
| 2   | Limit the subject line to 50 characters              | It keeps subjects readable and forces concision. 72 is the hard limit, because GitHub truncates longer subjects                       |
| 3   | Capitalise the subject line                          | It keeps the log consistent                                                                                                           |
| 4   | Do not end the subject line with a period            | The period is unnecessary and space is limited                                                                                        |
| 5   | Use the imperative mood in the subject line          | It matches Git's own messages ("Merge branch …"). Test: _"If applied, this commit will …"_, so "Fix bug" passes and "Fixed bug" fails |
| 6   | Wrap the body at 72 characters                       | Git doesn't wrap text, and 72 leaves room for indentation within 80 columns                                                           |
| 7   | Use the body to explain what and why rather than how | The code shows how. The body records the problem, the previous behaviour and why this approach was chosen                             |

## Gitmoji

Source: [gitmoji.dev](https://gitmoji.dev/), and the [gitmoji README](https://github.com/carloscuesta/gitmoji).

- **What it is:** a shared vocabulary of 74 emoji, each with one meaning, such as ✨ "Introduce new features", 🐛 "Fix a bug", 📝 "Add or update documentation" and 🎉 "Begin a project".
- **Format** from the README: `<intention> [scope?][:?] <message>`. The emoji comes first, then an optional scope, then a brief message.
- **Not specified:** whether to write the Unicode character or the `:shortcode:`. We chose Unicode; see [ADR-0006](adr-0006-gitmoji-atomic-commits.md).
- **Benefit:** the intent of each commit is visible at a glance in `git log --oneline`. Choosing an emoji also acts as an atomicity check: if two fit, the commit probably does two things.

## Atomic commits

Combined from the rules above and common practice:

- **One logical change per commit.** It is complete, and the linter and tests pass at that commit.
- **Easy to work with later:** each commit can be reviewed, reverted and searched with `git bisect` on its own.
- **Don't mix intents:** keep refactors, features, fixes, dependency changes and formatting in separate commits.

## The candidate's mood rule

The candidate added: _"use the imperative mood in the subject body to describe the changes we made. Use the indicative mood for why we made those changes."_ We read this as follows:

- **Subject and the "what" part of the body:** imperative ("Add …", "Rename …").
- **The "why" part of the body:** indicative ("Reviewers need …", "Spelling varies …, so …").

This extends rule 5 into the body, and gives rule 7's what/why split a grammatical marker for each part.

## Applied

All of this is encoded in the [`git-commit` skill](../.claude/skills/git-commit/SKILL.md).

## See also

- [Log](log.md)
- [Session 2026-11-18 #3: Commit Conventions](session-2026-11-18-03-commit-conventions.md)
