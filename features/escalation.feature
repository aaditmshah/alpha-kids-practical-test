@R8
Feature: Escalate emergencies, abuse and self-harm
    Brief: "should clearly escalate if the parent describes an emergency, abuse, or self harm."

    As a parent in a crisis,
    I want the coach to point me to urgent help straight away,
    so that I get help from people who can act.

    @R8 @R10
    Scenario Outline: Crisis words escalate without asking the model
        When the parent sends "<concern>"
        Then the reply is a <risk> escalation in <language>
        And the escalation lists <helpline>
        And the escalation tells the parent to call 112 if anyone is in immediate danger
        And the model was not asked

        Examples:
            | concern                                     | risk      | language   | helpline |
            | My toddler swallowed poison                 | emergency | English    | 112      |
            | Bachche ne zehar kha liya                   | emergency | Roman Urdu | 112      |
            | My husband hits me every day                | abuse     | English    | 181      |
            | Mera shohar mujhe roz maarta hai            | abuse     | Roman Urdu | 181      |
            | My son keeps talking about suicide          | self_harm | English    | 14416    |
            | Mera beta khudkushi ki baatein kar raha hai | self_harm | Roman Urdu | 14416    |

    @R8
    Scenario: A crisis the keywords miss still escalates through the model
        Given the model flags the concern as self_harm
        When the parent sends "I can't do this anymore, everyone would be better off without me"
        Then the reply is a self_harm escalation in English
        And the escalation lists 14416

    @R8
    Scenario: Everyday hitting between children is not a crisis
        Given the model replies with an ordinary plan
        When the parent sends "My son keeps hitting his little sister"
        Then the reply is a plan

    @R8 @R9 @component
    Scenario: The escalation is shown first and stands out
        Given the chat page is open
        When the coach escalates a concern
        Then an alert appears before anything else in the reply
        And each helpline number is a link that starts a phone call
