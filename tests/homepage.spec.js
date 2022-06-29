// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('../qa.config.js');


// import { test, expect } from '@playwright/test';

test('BidMyListing Homepage', async ({ page, browserName }) => {
  await page.goto(bml.url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BidMyListing/);

  await page.screenshot({ path: 'screenshots/homepage-'+browserName+'.png', fullPage: true });

});