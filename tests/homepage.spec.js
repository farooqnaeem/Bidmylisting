// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('../qa.config.js');


// import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
//test('BidMyListing Homepage', async ({ page, browserName }) => {
  test.beforeEach(async ({ page }) => {
    await page.goto(bml.url.dev);
  });

  test('Homepage', async ({ page, browserName }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BidMyListing/);

  await page.screenshot({ path: 'screenshots/homepage-'+browserName+'.png', fullPage: true });

  });



});


