// @ts-check
const { test, expect} = require('@playwright/test');
const homeReg = require('../../testPages/homeowner/registration');
const urls = require('../../testUtils/urls');

test.describe('Homeowner Registration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { timeout: 100000 });
  });

  test('Registration', async ({ page }, testInfo) => {
    testInfo.setTimeout(120000);
    await homeReg.registerHomeowner(page);
    
    // TODO: Verify homeowner name and property address
    // https://bidmylisting.atlassian.net/browse/BID-1462
    await page.screenshot({ path: 'screenshots/homeowner.png', fullPage: true });
  });

});