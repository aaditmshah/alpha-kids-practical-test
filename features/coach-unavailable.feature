@R5 @R8
Feature: Stay safe when the coach is unavailable
    Brief: "The replies should be brief and practical."
    Brief: "should clearly escalate if the parent describes an emergency, abuse, or self harm."

    As a parent,
    I want a clear message even when the coach can't answer,
    so that I am never left with an error, and I still know where to get urgent help.

    @R5 @R8
    Scenario Outline: A model failure shows the fail-safe message
        Given the model fails because it is <failure>
        When the parent sends "My son won't sleep"
        Then the reply is the fail-safe message in English
        And the fail-safe message tells the parent to call 112 if anyone is in danger

        Examples:
            | failure        |
            | rate limited   |
            | unavailable    |
            | invalid output |
