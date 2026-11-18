---
title: "Session 2026-11-18 #1: Kickoff"
type: session
status: active
updated: 2026-11-18
summary: Brief received. Agreed on minimal scope, TDD, $0 LLM cost and a flat LLM wiki with skills. Researched Alpha Kids and free LLM providers, and created the wiki.
---

# Session 2026-11-18 #1: Kickoff

Back to: [Home](index.md) · [Sessions](index-sessions.md)

## 1. Brief and first proposal
The candidate shared the [practical test brief](source-practical-test-brief.md) and asked to research and plan before building, with everything documented in an LLM wiki.

The agent proposed:
- an LLM wiki
- research topics: requirements, safety and escalation, regional helplines, Urdu/RTL, model and output design, parenting content, stack, testing, and Alpha Kids
- a research order

It asked four questions: time budget, LLM provider, whether to submit the wiki, and whether to research Alpha Kids.

## 2. Candidate's answers
1. **Scope:** *"This is a simple throwaway app … Let's use test-driven development. However, I don't want to implement all the bells and whistles of a full-scale application."* → [ADR-0002](adr-0002-minimal-scope-tdd.md)
2. **Cost:** *"The biggest concern for me is cost. I don't want to pay for the LLM model … Let's research which is the best LLM provider for this purpose."* → [Research](research-free-llm-providers.md), [ADR-0003](adr-0003-llm-provider.md)
3. **Wiki:** It is part of the submission, so interviewers can see the process. It should contain plans, ADRs, decision documents, a Kanban board and tickets, so that *"an LLM should be able to understand the full state of the application via the wiki, including the development process. Everything we talk about, decide, and do should be recorded."* The candidate also asked for:
   - skills to query, update and maintain the wiki, with the root CLAUDE.md nudging agents to use them
   - pages readable by humans
   - a **flat directory**, so hyperlinks work in VS Code and on GitHub
   - index pages that help LLMs find things

   → [ADR-0001](adr-0001-flat-llm-wiki.md), [Conventions](conventions.md)
4. **Alpha Kids:** research them and record the findings → [Research: Alpha Kids](research-alpha-kids.md)

## 3. Work done
- Researched Alpha Kids. The company is alpha.kids, an AI parenting coach on the web, WhatsApp and TikTok DMs, run by Vibbber Tech FZCO in Dubai ([ticket-0002](ticket-0002-research-alpha-kids.md)).
- Researched free LLM tiers and recommended Gemini Flash, with Groq as the fallback ([ticket-0003](ticket-0003-research-llm-providers.md)).
- Created the wiki, the indexes, the Kanban board, the skills and the root CLAUDE.md ([ticket-0001](ticket-0001-set-up-wiki.md)).
- Created the remaining research and planning tickets, 0004 to 0008.

## 4. Decisions
- Accepted: [ADR-0001](adr-0001-flat-llm-wiki.md), [ADR-0002](adr-0002-minimal-scope-tdd.md)
- Proposed (awaiting the candidate): [ADR-0003](adr-0003-llm-provider.md)

## 5. Open at end of session
See [Open questions](open-questions.md), Q1–Q6.
