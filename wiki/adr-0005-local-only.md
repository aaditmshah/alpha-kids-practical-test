---
title: "ADR-0005: Local Only, No Deployment"
type: adr
status: accepted
updated: 2026-11-18
summary: The app is never deployed. Reviewers create a production build and run it locally with their own free Gemini API key, following the README.
---

# ADR-0005: Local Only, No Deployment

Back to: [Home](index.md) · [Decisions](index-decisions.md) · Session: [2026-11-18 #2](session-2026-11-18-02-decisions.md)

## Context

The options were a public demo (for example, a free Vercel deployment) or a local-only app. The candidate said: _"I don't want to deploy the application anywhere. Keep it completely local for now. The interviewer can create a production build and run it locally when he wants to test it. Deploying the application on Vercel is too much effort for an interview test."_

## Options considered

1. **Free hosted deployment.** Reviewers can click a link, but it needs setup, a hosted secret, and protection against strangers using up the free quota.
2. **Local only.** Nothing to host or secure. Reviewers run a couple of commands.

## Decision

**Local only.** No deployment configuration, hosting or CI deploy steps.

## Consequences

- The README must make running locally easy:
  - prerequisites (Node version)
  - how to get a free Gemini API key
  - copying `.env.example` to `.env.local`
  - building and starting the app (for example `npm run build && npm start`)
  - running the tests
- Each reviewer uses their own free API key, so nobody's quota is shared and rate limiting is unnecessary. This fits [ADR-0002](adr-0002-minimal-scope-tdd.md).
- The production build must work with no setup beyond the API key.

## See also

- [Log](log.md)
- [Open Questions](open-questions.md)
- [Plan](plan.md)
- [Requirements](requirements.md)
- [Research: The Candidate's Website Conventions](research-website-conventions.md)
- [ticket-0010: Bootstrap the Next.js App with Vite+](ticket-0010-bootstrap-app.md)
