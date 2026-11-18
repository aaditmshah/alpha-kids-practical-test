---
title: "ticket-0006: Design the Coach Reply Schema and Prompt"
type: ticket
status: todo
updated: 2026-11-18
summary: Define the structured reply schema (plan, check-in, risk and escalation, language) and the system prompt that enforces brevity, scope and safety.
---

# ticket-0006: Design the Coach Reply Schema and Prompt

Back to: [Home](index.md) · [Tickets](index-tickets.md) · [Kanban](kanban.md) · Requirements: R3–R8, R10 in [Requirements](requirements.md)

Depends on: [ticket-0004](ticket-0004-research-safety-escalation.md), [ticket-0005](ticket-0005-research-roman-urdu.md)

## Starting sketch (not decided)
```ts
type CoachReply = {
  language: "en" | "ur";
  risk: "none" | "emergency" | "abuse" | "self_harm";
  summary: string;              // one line reflecting the concern back
  plan: string[];               // 2–4 short, practical steps
  checkIn:
    | { type: "question"; text: string }
    | { type: "time"; text: string };   // e.g. "Come back in 3 days and tell me…"
};
```

## Output
An ADR for the schema, and the prompt's design rationale recorded in the wiki.
