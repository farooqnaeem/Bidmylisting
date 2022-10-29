# Web automation for BidMyListing website

Hello, this is the automation project for the Bid My Listing website.  This project is based on the Playwright automation framework

## Requirements

- NodeJS
- Playwright Test

## Running automation locally

```
npx playwright test
```

To see all the browser interactions quickly, run it in `headed` mode

```
npx playwright test --headed
```

## Project structure
- `/tests`
  - Location for all our tests, ideally one spec per page, feature, or component
  - `<feature>.spec.js`
    - Playwright spec file containing a test suite around a feature.  Examples of "features" include dashboard, profile, search
    - Example: `homeowner-registration.spec.js`
    - There shouldn't be that much code in these files.  These specs should really only contain the skeleton code that calls the functions locaed in `/testPages/`
  - Example: `/tests/ui/homeowner-registration.spec.js`

- `/testPages/<user>/<feature>`
  - Centralized location for all common functions, `data-testid`s, and test data used in a feature of the site
  - `<user>` is a user type, such as homeowner or agent
  - `<feature>` is a feature of the app, such as dashboard, profile, or search
  - Example: `/testPages/homeowner/registration`

  - In this directory we have the following files.  Please follow this convention:
    - `index.js` - functions that run 
    - `ids.js`
    - `data.js`
  

- `/testUtils` 
  - Contains utility functions such as calling the backend, parsing, etc.

- `/testData` 
  - *THIS FOLDER WILL BE REMOVED*, since test data will now be in `/testPages/<user>/<feature>/data.js`.


- `/screenshots`
  - Location of screenshots taken by Playwright during automation runs

