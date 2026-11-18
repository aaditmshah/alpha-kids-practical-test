@R9
Feature: Keep a simple conversation history
    Brief: "A simple conversation history on the page is enough."

    As a parent,
    I want to see what I asked and what the coach said,
    so that I can follow the advice over several messages.

    @R9 @component
    Scenario: Messages and replies stay on the page in order
        Given the chat page is open
        When the parent sends "My son won't sleep"
        And the parent sends "He is 4 years old"
        Then the conversation shows both concerns and both replies in order

    @R9 @component
    Scenario: The page shows the coach is working
        Given the chat page is open
        When the parent sends a concern
        Then the page shows that the coach is replying until the reply arrives
