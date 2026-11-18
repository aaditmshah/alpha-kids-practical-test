@R2 @R10
Feature: Reply in the parent's language
    Brief: "should be able to type a concern in English or Urdu"

    As a parent who writes in English or Roman Urdu,
    I want the coach to answer in the language I used,
    so that I can understand the plan easily.

    Urdu means Roman Urdu, written in Latin letters (ADR-0004).

    @R2 @R10
    Scenario Outline: The coach's reply keeps the parent's language
        Given the model replies in <language>
        When the parent sends "<concern>"
        Then the reply is in <language>

        Examples:
            | concern                                          | language   |
            | My son throws food at dinner                     | English    |
            | Mera beta screen time pe bohat tantrum karta hai | Roman Urdu |

    @R2 @R10
    Scenario Outline: Fixed messages follow the parent's language
        Given the model is unavailable
        When the parent sends "<concern>"
        Then the reply is in <language>

        Examples:
            | concern                                    | language   |
            | My daughter won't eat vegetables           | English    |
            | Meri beti sabziyan nahi khati, kya karoon? | Roman Urdu |
