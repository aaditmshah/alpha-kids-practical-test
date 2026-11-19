---
title: "ticket-0025: Design the UI in Claude Design"
type: ticket
status: in-progress
updated: 2026-11-19
summary: Design the chat UI in Claude Design from the Gherkin scenarios, in a fun, pastel, child-friendly style with a loud escalation banner, and record the decisions in the wiki.
---

# ticket-0025: Design the UI in Claude Design

Back to: [Tickets](index-tickets.md) · [Kanban](kanban.md) · [Plan](plan.md)

|              |                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------- |
| Requirements | R1, R2, R4, R8, R9 in [Requirements](requirements.md)                                              |
| Decisions    | [ADR-0018](adr-0018-ui-design-claude-design.md), [ADR-0011](adr-0011-layered-safety-escalation.md) |
| Depends on   | [ticket-0024](ticket-0024-gherkin-features.md) (scenarios to design for)                           |
| Files        | Claude Design artifact; `wiki/design-…` notes                                                      |

## Acceptance criteria

- [x] One artboard per scenario state: empty chat, plan reply, Roman Urdu reply, escalation banner, referral, fail-safe, waiting, on mobile and desktop
- [x] Pastel palette and friendly fonts; [alpha.kids](https://alpha.kids/) used as inspiration only
- [x] Escalation banner meets WCAG AA contrast, comes first and has tappable `tel:` links
- [ ] Aadit approves the design before [ticket-0021](ticket-0021-chat-ui.md) starts
- [x] Decisions recorded in the wiki (palette, fonts, layout, banner, accessibility), with the artifact link and exported images if possible

## Draft design (2026-11-19)

Claude drafted the canvas in [session 2026-11-19 #2](session-2026-11-19-02-orchestrator-and-design.md): [Parenting Coach UI](https://claude.ai/artifact/3ogSy4QAkZg9U3nQpTJ5x5). It is a private claude.ai page, so only Aadit can open it until he shares it. It waits for his review.

### Artboards

Seven phone screens (390×844), one per state, and one desktop page:

1. Empty chat, with three suggestion chips (two English, one Roman Urdu)
2. Waiting: the parent's message, and a status bubble saying "The coach is replying…" with the Send button disabled
3. Plan reply in English: summary, numbered steps, check-in (a time)
4. Plan reply in Roman Urdu: the same card, with a question check-in
5. Escalation (abuse): the red alert with 1098, 181 and 112 as large `tel:` buttons
6. Referral to a doctor
7. Fail-safe, with 112 as a `tel:` link
8. Desktop: two exchanges in a centred column (R9), the second with a referral line

The text in each artboard is the real wording from `src/coach/messages.ts` and the system prompt's examples.

### Decisions

- **Fonts:** Fredoka (rounded, playful) for headings, step numbers and buttons; Nunito (rounded, very readable) for body text. Both come from Google Fonts, so `next/font` can self-host them ([ADR-0018](adr-0018-ui-design-claude-design.md)).
- **Palette:** a pale lavender page (`#FBF7FF`) with dark plum text (`#2A2140`) and a violet accent (`#5A3CC4`) for Send and links. Pastels give each part a role: mint (`#CDEFE0`) for the parent's bubbles, lavender, peach and mint for the step numbers, butter yellow (`#FFF1C9`) for the check-in, sky blue (`#DDEBFF`) for doctor referrals, and a paler, dashed butter card for the fail-safe.
- **Layout:** a header with the name and "Short, safe plans in English or Roman Urdu", the conversation, and a composer pinned at the bottom with a visible label, a placeholder that names both languages, and a standing line: "Not a doctor or a lawyer. In an emergency, call 112." Parent messages are right-aligned bubbles; coach replies are full-width cards. Desktop keeps the same column, at most 800 px wide.
- **Check-in:** a clock icon for a time and a question-bubble icon for a question, with no label text, so the card needs no translated chrome.
- **Escalation:** it breaks the pastel palette on purpose: a solid red card (`#B42318`) with white text, a warning icon and `role="alert"`. It comes first in the reply, with "call 112 now" in bold, then the helplines as big white buttons (`tel:` links, at least 64 px tall), then the guidance, the trusted-person line, the safety check-in and the "if it's something else" line.
- **Accessibility:** every text and background pair was checked against WCAG AA (4.5:1). The lowest is the escalation's "if it's something else" line at 5.5:1; white on the red card is 6.6:1. Touch targets are at least 44 px. The form uses a real `<label>`, `<button>` and `<textarea>`, the icon-only Send button has an `aria-label`, decorative icons are `aria-hidden`, and each reply card carries a `lang` attribute (`en` or `ur-Latn`).
- **No AI tropes:** no gradients, no emoji; inline stroke icons only.

### Open for the chat page

- The new interface strings ("Your concern", the placeholder, the disclaimer, "The coach is replying…", the referral card's heading "A doctor is the right person", and the suggestion chips) are English only. The page chrome can stay English, since the parent picks the language by writing. The referral heading belongs to a reply, so it needs a Roman Urdu version, or it can be dropped.

## See also

- [Alpha Kids Practical Test Wiki](index.md)
- [Session 2026-11-18 #11: Implementation Plan](session-2026-11-18-11-implementation-plan.md)
- [Session 2026-11-18 #12: Build Setup](session-2026-11-18-12-build-setup.md)
- [PR #18: Build the Coach Orchestrator](pr-0018-coach-orchestrator.md)
- [Session 2026-11-19 #2: Orchestrator and Design](session-2026-11-19-02-orchestrator-and-design.md)
- [Log](log.md)
