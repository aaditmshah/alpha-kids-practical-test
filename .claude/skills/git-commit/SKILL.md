---
name: git-commit
description: Commit changes in this repo as atomic commits with Gitmoji-style messages (emoji + imperative subject, a body that states what changed in the imperative and why in the indicative, wrapped at 72). Use whenever the user asks to commit, or a coherent unit of work (a ticket, a TDD cycle, a wiki update) is finished and the user has asked for commits.
---

# git-commit

The full rationale is on the wiki pages `wiki/research-commit-messages.md` and `wiki/adr-0006-gitmoji-atomic-commits.md`.

## 0. Work on a branch

`main` is protected (`wiki/adr-0008-protected-main-linear-history.md`). Direct pushes are rejected,
even for admins. So:

1. Start from an up-to-date `main`: `git switch main && git pull --ff-only`.
2. Create a short kebab-case branch named after the work, for example `git switch -c safety-precheck`.
3. Commit on the branch (sections 1 to 3).
4. Before pushing, run the CI checks locally: `vp run typegen`, `vp check`, `vp test --run`,
   `vp run wiki:lint` and `vp run build`.
5. Push with `git push -u origin <branch>`, then open a pull request with
   `gh pr create --base main`. Give it a gitmoji title and a body that says what changes and why.
6. If `main` moves, rebase the branch onto it (`git rebase origin/main`) and push with
   `--force-with-lease`. Never create merge commits.
7. Merging is the user's call: rebase merges only (`gh pr merge --rebase`), and only after `ci`
   passes. Squash and merge commits are disabled.

## 1. Plan atomic commits

An atomic commit is **one logical change** that is **complete**: the linter and tests pass at that commit, and it can be reverted on its own.

1. Run `git status` and `git diff` (and `git diff --staged`). Read everything that will be committed.
2. Group the changes by intent. Separate groups go in separate commits, for example:
   - a feature versus an unrelated refactor
   - a dependency or config change versus the code that uses it, when each makes sense alone
   - a typo fix versus new content
3. **Wiki updates travel with the change they record.** The ADR, ticket status, Kanban move and session notes for a change go in the same commit as the change. A pure wiki change (research, a session record) is its own commit.
4. **TDD cycles:** commit when the cycle is green, with the test and the implementation together, using ✨, 🐛 or ✅ as appropriate. Use 🧪 only when you deliberately commit a failing test on its own.
5. Stage explicitly by path (`git add <paths>`) or by hunk. Never use `git add -A` or `git add .` blindly.
6. Before each commit:
   - run `node .claude/skills/wiki-maintain/scripts/lint.mjs wiki` (and the test suite, once one exists)
   - never commit secrets (`.env*`, API keys) or `.claude/settings.local.json`

## 2. Write the message

```text
<emoji> <Subject in imperative mood>

<What: imperative sentences or bullets describing the change.>

<Why: indicative sentences explaining the reason, the problem, or
the trade-off.>

Co-Authored-By: ...   (trailers last, when attribution applies)
```

### Subject line

- Start with **one Unicode gitmoji** (✨, not `:sparkles:`), then a space. Unicode renders in the terminal and in every tool; shortcodes render only on some websites.
- Use the **imperative mood**, which completes the sentence _"If applied, this commit will …"_. For example: `✨ Add safety pre-check`, not `Added …` or `Adds …`.
- Capitalise the first word after the emoji. **No trailing period.**
- Keep the text after the emoji to **50 characters or fewer**. 72 is the hard limit.
- No scope prefix; the repo is small.

### Body

- Separate it from the subject with **one blank line**. Wrap lines at **72 characters**.
- **What changed: imperative mood**, for example "Add a Roman Urdu keyword list to the pre-check."
- **Why: indicative mood.** State facts and reasons, for example "Spelling varies widely in Roman Urdu, so exact matching misses crisis messages."
- Explain _what_ and _why_, not _how_; the diff shows how. Include the previous behaviour or problem, and why this approach was chosen.
- Reference wiki pages or ticket IDs when relevant, for example "Closes ticket-0004."
- A trivial change (such as a typo) may have no body.

### Choosing the gitmoji

Choose the emoji for the commit's **main intent**. Common choices in this repo:

| Emoji        | Use for                                                |
| ------------ | ------------------------------------------------------ |
| 🎉           | Begin a project (first commit only)                    |
| ✨           | Introduce a feature                                    |
| 🐛           | Fix a bug                                              |
| 🩹           | Simple fix for a non-critical issue                    |
| ✅           | Add, update or pass tests                              |
| 🧪           | Add a failing test (deliberately red commit)           |
| ♻️           | Refactor code                                          |
| 🎨           | Improve structure or format                            |
| 📝           | Add or update documentation (including the wiki)       |
| 💬           | Add or update text and literals (prompts, UI copy)     |
| 🌐           | Internationalisation and localisation (Roman Urdu)     |
| 💄           | Add or update the UI and style files                   |
| 🚸           | Improve user experience or usability                   |
| 🦺           | Add or update validation code (reply-schema checks)    |
| 🥅           | Catch errors (for example, 429 handling)               |
| 👔           | Add or update business logic (coach rules, escalation) |
| 🤡           | Mock things                                            |
| 🔧           | Add or update configuration files                      |
| 🔨           | Add or update development scripts                      |
| 🧑‍💻           | Improve developer experience (skills, tooling)         |
| ➕ / ➖ / ⬆️ | Add, remove or upgrade a dependency                    |
| 🙈           | Add or update `.gitignore`                             |
| 🔥           | Remove code or files                                   |
| 🚚           | Move or rename files                                   |
| ✏️           | Fix typos                                              |
| 🔒️           | Fix security or privacy issues                         |
| ⏪️           | Revert changes                                         |

The full list is at [gitmoji.dev](https://gitmoji.dev/). If two emoji fit, the change is probably not atomic; consider splitting it.

## 3. Commit and verify

```bash
git commit -F - <<'EOF'
✨ Add safety pre-check for crisis keywords

Add a deterministic check that flags emergency, abuse and self-harm
phrases in English and Roman Urdu before the model is called.

Escalation must not depend on the model remembering to flag risk,
and a keyword pass costs nothing and is easy to unit test.

Co-Authored-By: ...
EOF
git log -1 --stat
```

- Follow any attribution-trailer instructions given by the harness or the user.
- Commit only when the user has asked. Never push unless asked, and never push to `main`.
- Never amend or rewrite published history.
- Don't log individual commits in `wiki/log.md`; git history is that record. Log milestones only.
