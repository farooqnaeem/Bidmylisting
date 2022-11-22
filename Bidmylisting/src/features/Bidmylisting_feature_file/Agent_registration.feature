Feature: Add new links.
  Scenario Outline: Selfie pop Add new links.
    Given I read the login file "<filename>" with "<key>"
    When I hit the url
    Then The user click on agent registration button
    Then The user enter the First Name
    Then The user enter the last Name for agent
    Then The user enter the email address of agent
    Then The user enter the reverify the address of agent
    Then The user enter the phone number of agent
    Then The user enter the zip code of agent
    Then The user enter the Password of Agent
    Then The user click on checkbox of agent




    Examples:
      |key         |filename|
      |bidmylisting|login   |