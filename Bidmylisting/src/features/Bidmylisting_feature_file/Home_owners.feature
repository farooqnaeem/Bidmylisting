Feature: Add new links.
  Scenario Outline: Selfie pop Add new links.
    Given I read the login file "<filename>" with "<key>"
    When I hit the url
    Then The user click on homeowner button
    Then The user enter the address
    Then The user click on next button
    Then The user enter the zip code
    Then The user click on next button
    Then The user enter the bedrooms
    Then The user enter the baths
    Then The user enter the SquaremFootage
    Then The user click on next button
    Then The user click on yes button of listing agent
    Then The user click on next button
    Then The user click on listing agreement expire
    Then The user click on next button
    Then The user ask for sell his home
    Then The user click on next button
    Then The user ask for condition of home
    Then The user click on next button
    Then The user click on yes button of buy a home
    Then The user click on next button
    Then The user enter the first name
    Then The user enter the last name
    Then The user enter the email address
    Then The user reverify the email address
    Then The user enter the phone number
    Then The user enter the Password
    Then The user click on checkbox
    Then The user click on create my listing button

    Examples:
      |key         |filename|
      |bidmylisting|login   |