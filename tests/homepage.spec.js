// @ts-check
const { test, expect } = require('@playwright/test');

// import { test, expect } from '@playwright/test';

test('BidMyListing Homepage', async ({ page, browserName }) => {
  await page.goto('https://www.bidmylisting.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/BidMyListing/);

  // 
  await page.locator('.button:has-text("Sign In")').click();

  await page.screenshot({ path: 'homepage-'+browserName+'.png', fullPage: true });
});