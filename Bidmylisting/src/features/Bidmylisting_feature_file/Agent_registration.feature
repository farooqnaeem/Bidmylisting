Feature: Add new links.
  Scenario Outline: Selfie pop Add new links.
    Given I read the login file "<filename>" with "<key>"
    When I hit the url
    Then The user click on agent registration button


    Examples:
      |key         |filename|
      |bidmylisting|login   |