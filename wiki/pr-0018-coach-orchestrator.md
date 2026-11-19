---
title: "PR #18: Build the Coach Orchestrator"
type: pr
updated: 2026-11-19
summary: respond() applies the safety layers in order and returns one CoachTurn, with executable Gherkin specs for every respond-level scenario. Also adds the approved UI design to the wiki. Closes ticket-0019 and ticket-0025.
---

# PR #18: Build the Coach Orchestrator

Back to: [Pull requests](index-pull-requests.md) · Session: [2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md) · Tickets: [ticket-0019](ticket-0019-coach-orchestrator.md), [ticket-0025](ticket-0025-ui-design.md)

## Facts

|             |                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| GitHub      | [aaditmshah/alpha-kids-practical-test#18](https://github.com/aaditmshah/alpha-kids-practical-test/pull/18) |
| Branch      | `coach-orchestrator` → `main`                                                                              |
| Opened      | 2026-11-19, by Aadit's GitHub account (aaditmshah)                                                         |
| Written by  | Claude Code (Claude Opus 5.5)                                                                              |
| Reviewed by | Aadit                                                                                                      |
| Merge       | Fast-forward of `main`, done locally by Aadit ([ADR-0008](adr-0008-protected-main-linear-history.md))      |

## Why

The orchestrator is where the safety layers of [ADR-0011](adr-0011-layered-safety-escalation.md) come together, and the Server Action and chat page both call it. Aadit has a deadline, so Claude builds it, and the UI design runs alongside.

## Commits

| #   | Commit                                          | What                                                                                    | Why                                                              |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 1   | `♻️ Share the mock models between tests`        | `src/coach/testing.ts`, used by the model adapter's tests                               | The orchestrator's tests and the specs need the same mocks       |
| 2   | `✨ Add the coach orchestrator`                 | `respond`, `turnLanguage` and `turnToText`, with unit tests                             | [ticket-0019](ticket-0019-coach-orchestrator.md)                 |
| 3   | `✅ Run the respond-level Gherkin scenarios`    | Five feature specs; ticket-0019 done; this page and the session                         | The features become executable as the behaviour lands (ADR-0017) |
| 4   | `📝 Record the UI design canvas`                | Design decisions on [ticket-0025](ticket-0025-ui-design.md), now in progress; the log   | The canvas is private, so the wiki holds its decisions           |
| 5   | `🔧 Allow screenshots and mock-ups in the wiki` | The linter accepts `.png` and `.html` assets and reports orphans; conventions updated   | Aadit asked for the artboards in the wiki                        |
| 6   | `📝 Add the approved UI design and the review`  | [UI Design](design.md) with eight screens and their HTML; ticket-0025 done; this review | Aadit approved the design                                        |
| 7   | `🔧 Check asset links written in HTML`          | The linter counts `src` and `href` links to assets and reports broken ones              | The design page sizes its screenshots with HTML                  |
| 8   | `💄 Lay out the design screens in a grid`       | The screens in a four-column table, sized to fit the window                             | Aadit had to scroll to see each full-size screenshot             |
| 9   | `📝 Record the design page review`              | These rows and the review below                                                         | The PR page lists every commit                                   |

## Review

Aadit approved the PR and the design:

- On the design: _"The design looks beautiful. I love it. May we include the artboards, etc. in the wiki?"_ Then: _"you can include the artboards as raw HTML files. They don't have to be embedded in the wiki pages. If you can that's awesome."_ **Resolved:** the [UI Design](design.md) page shows a PNG of every artboard and links its standalone HTML. The wiki linter now allows `.png` and `.html` assets, each linked from a page ([conventions](conventions.md)).
- On the referral heading and other interface strings: _"Don't worry about Intl right now. English is fine. No need for Roman Urdu. This is a practical test, not a full product."_ **Resolved:** the page's own strings stay English.
- On the rest: _"Everything else looks good to me."_
- On the design page: _"Could you lay out the screenshots spatially in the design page? The images are quite large and I have to scroll to see the whole image."_ **Resolved:** the phone screens sit in a four-column grid at 180 px wide, and the desktop page at 640 px, each linking to its HTML.

## See also

- [Log](log.md)
- [PR #19: Add the Server Action](pr-0019-server-action.md)
