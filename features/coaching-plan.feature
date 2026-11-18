@R1 @R3 @R4 @R5
Feature: Get a short, practical plan
    Brief: "Build a small app in either Next.js or Node with a simple web UI."
    Brief: "The user of the app, who is a parent, should be able to type a concern"
    Brief: "An LLM coach should reply with a short, structured, and safe plan along with a follow-up check-in, i.e. either a question or a time to come back."
    Brief: "The replies should be brief and practical."

    As a parent with an everyday worry about my child,
    I want a short plan I can act on today and a reason to check back in,
    so that I know what to try and when.

    @R1 @component
    Scenario: A parent types a concern on the page
        Given the chat page is open
        When the parent types "My daughter cries at school drop-off" and sends it
        Then the concern appears in the conversation

    @R3 @R5
    Scenario: The coach replies with a structured plan
        Given the model replies with an ordinary plan
        When the parent sends "My 3-year-old refuses to sleep at bedtime"
        Then the reply has a one-sentence summary
        And the reply has between 2 and 4 steps
        And the reply ends with a check-in

    @R4
    Scenario Outline: The check-in is a question or a time to come back
        Given the model's check-in is a <kind>
        When the parent sends "My son won't brush his teeth"
        Then the reply ends with a check-in that is a <kind>

        Examples:
            | kind     |
            | question |
            | time     |
