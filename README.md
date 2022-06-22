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
- **/tests** - location for all our tests, ideally one spec per page, feature, or component
- **/util** - location of utility functions
- **qa.config.js** - where we will keep our environment specific configs
- **qa.testids.js** - where we store the data-test-id values
