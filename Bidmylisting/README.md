![](https://raw.githubusercontent.com/patheard/cucumber-puppeteer/master/test/screenshots/ref/cucumber-puppeteer-full.png)

# Automation Suite - Getting Started

Selfie pop Automation suite setup with puppeteer

## Prerequisites

1. NodeJS installed globally in the system - https://nodejs.org/en/download/
2. Git (version > 2.29.2)

## Setting up the automation suite

1. Clone the Sendoso test-automation locally into a folder - (https://github.com/Selfie-Pop-Inc/Web-Automation-suite.git
)
   - Use the following command inside the desired folder - git clone https://github.com/Selfie-Pop-Inc/Web-Automation-suite.git

2. Go inside the folder and run the following command from the terminal/command prompt - npm install
3. All the dependencies from package.json and ambient typings would be installed in the node_modules folder

## Pre-requisite

In order to run locally, you need to install all node packages by running below command:
`npm install`

## Running tests(locally) + Generating Cucumber reports

1. In order to run the tests locally just run the following command - npm run localExecution
   - The above command would trigger tests in chrome browser mode and generate cucumber JSON & HTML reports automatically!
2. In order to view/generate the test reports locally just run the following command - npm run report
   - This project has been integrated with cucumber-html-reporter, these cucumber reports are automatically generated in the reports folder when you run the tests. The reports can be customized according to the user's specific needs.

# Automation suite structure and proceedings

## Writing Feature files

- A common file which stores feature, scenarios, and feature description to be tested.

```@login
  Feature: Selfie pop login scenario
   Scenario: To login from extension on Cameo site
   Given I have opened Selfie pop URL

```

## Writing Step Definitions

- A Steps definition file stores the mapping between each step of the scenario defined in the feature file with a code of function to be executed.
  - Steps should be written in the steps folder of the project.

```
import {Given, Then} from "@cucumber/cucumber";
import cameoIntegration from '../pages/actions/selfiepop'

Given(/^I have opened cameo url$/,async function () {
   await selfiepopIntegration.hitselfiepopUrl(this.page)

```

## Action files

- An action file contains the methods to perform actions that would correspond to a step definition.
  - Should be written in the actions folder.

```
import click_utility from '../../../utilities/click_utility'
import selfiepopLocators from '../../locators/cameoLocators.json'

class CameoIntegration {
  async hitCameoUrl(page){
    await page.goto("https://www.cameo.com/gabbydouglas")
  }



## Identifiers/Locators

- A separate identifier file would be created which would contain all the required locators for a scenario.
  - This file should exist in your locator folders.

```
{
  "cameoSite":{
    "closeBtn": "._1PS9LZFlhC2Amzp6S8ZxqR",
    "celebLink":"a[title='Gabby Douglas']",
    "selfiepopExtension": "#sendoso-extension-cameo-button"
  }
}
```

## Data files

- A separate data file would be created which would contain all the required data that the script needs to use in order to run the scenario.
  - This file should exist in your data folders.

```
{
    "email": "Any sample email inside",
    "recipient": "Any test name inside",
    "mailingAddress":"Any sample address",
    "city": "Los Angeles",
    "state": "CA",
    "postalCode": "90020",
    "country": "United States"
}
```
