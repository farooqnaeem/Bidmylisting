// @ts-check
const { test, expect} = require('@playwright/test');
const testIds = require('../../testData/testids.js');
const homeReg = require('../../testPages/homeowner/registration');

test.describe('Homeowner Registration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Registration', async ({ page }, testInfo) => {
    testInfo.setTimeout(120000);
    await page.locator(testIds.homepage.homeownerRegister).click();

    // page 1
    await homeReg.addressLookup(page);

    // page 2
    await homeReg.propertyInformation(page);

    // page 3
    await homeReg.questionWorkingWithAgent(page);

    // page 4
    await homeReg.questionWhenToSell(page);

    // page 5
    await homeReg.questionPropertyCondition(page);

    // page 6
    await homeReg.questionBuyingHome(page);

    // page 7
    await homeReg.accountInfo(page);

    // page 8
    await homeReg.questionListingPrice(page);

    // page 9
    await homeReg.photoUpload(page);

    // page 10
    await homeReg.listingDescription(page);

    // TODO: Verify homeowner name and property address
    // https://bidmylisting.atlassian.net/browse/BID-1462
    await page.screenshot({ path: 'screenshots/homeowner.png', fullPage: true });
  });

});
