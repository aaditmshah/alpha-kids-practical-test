# Proves the Gherkin runner works. Replaced by the real features in ticket-0024.
Feature: Test setup
    Scenario: Gherkin scenarios run as Vitest tests
        Given a feature file
        When its scenario runs
        Then each step is called
