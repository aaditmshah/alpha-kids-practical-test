---
title: "Session 2026-11-18 #2: Decisions"
type: session
status: active
updated: 2026-11-18
summary: The candidate confirmed the Alpha Kids website (https://alpha.kids/), accepted the Gemini free tier, limited Urdu to Roman Urdu, and chose a local-only app with no deployment.
---

# Session 2026-11-18 #2: Decisions

Back to: [Home](index.md) · [Sessions](index-sessions.md) · Previous: [Session #1](session-2026-11-18-01-kickoff.md)

The candidate answered the open questions left at the end of [session #1](session-2026-11-18-01-kickoff.md).

## 1. Company website confirmed

The candidate confirmed the company's website is **https://alpha.kids/**. They asked to remove the other companies listed in the research, because there is _"no need to keep it around"_ (the pink elephant paradox: mentioning unrelated companies only invites confusion). → [Research: Alpha Kids](research-alpha-kids.md) updated.

## 2. LLM provider accepted

_"Yes, let's go with Gemini free tier for now. We can visit this decision later if it doesn't work out for us."_ → [ADR-0003](adr-0003-llm-provider.md) is now accepted.

## 3. Roman Urdu only

_"Let's only support Roman Urdu in this application, i.e. latin alphabet."_ The candidate gave two reasons:

- it is a throwaway app, and Urdu script is high effort and low value
- they know Hindi but can't read the Arabic alphabet

→ [ADR-0004](adr-0004-roman-urdu-only.md). [ticket-0005](ticket-0005-research-roman-urdu.md) was renamed and rescoped from "Urdu/RTL" to "Roman Urdu handling".

## 4. Local only

_"I don't want to deploy the application anywhere. Keep it completely local for now. The interviewer can create a production build and run it locally … Deploying the application on Vercel is too much effort for an interview test."_ → [ADR-0005](adr-0005-local-only.md), and new requirement R13 in [Requirements](requirements.md).

## Work done

- Updated the research, requirements, plan, indexes, board and [Open questions](open-questions.md) (Q1, Q2 and Q5 answered), plus the root CLAUDE.md.

## Open at end of session

Q3 (helpline regions), Q4 (Next.js or Node) and Q6 (actual Gemini quota) in [Open questions](open-questions.md). Next up: [ticket-0004](ticket-0004-research-safety-escalation.md) and [ticket-0005](ticket-0005-research-roman-urdu.md).
