// @ts-check
const { test, expect } = require('@playwright/test');
const testIds = require('../../testData/testids.js');
const testData = require('../../testData/testData.js');
const common = require('../../util/common.js');

test.describe('Homeowner Registration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Registration', async ({ page }) => {
    await page.locator(testIds.homepage.homeownerRegister).click();

    // page 1 - /registration/homeowner/address-lookup
    await common.testHomeownerRegistrationAddressLookup(page);
    await page.locator(testIds.homeownerRegistration.nextButton).click();

    // page 2 - /registration/homeowner/property-information
    await expect(page).toHaveURL('/registration/homeowner/property-information');

    // Verify entered address is correct
    await expect(page.locator(testIds.homeownerRegistration.enteredAddress)).toHaveText(testData.homeownerRegistration.address);
    // Corelogic failure - no data populated which cause failure - button is visible but not enabled
    await page.locator(testIds.homeownerRegistration.nextButton).click();

    // Listing agent ?
    await page.locator(testIds.homeownerRegistration.listingAgentNo).click();
    // await page.locator(testIds.homeownerRegistration.nextButton).click();

    // When to sell home ?
    await page.locator(testIds.homeownerRegistration.whenToSellBrowsing).click();
    // await page.locator(testIds.homeownerRegistration.nextButton).click();

    // Buying home ?
    await page.locator(testIds.homeownerRegistration.buyingHomeNo).click();
    // await page.locator(testIds.homeownerRegistration.nextButton).click();

    // Homeowner details
    await page.locator(testIds.homeownerRegistration.firstName).fill(testData.homeownerRegistration.firstName);
    await page.locator(testIds.homeownerRegistration.lastName).fill(testData.homeownerRegistration.lastName);
    await page.locator(testIds.homeownerRegistration.emailInput).fill(testData.homeownerRegistration.email);
    await page.locator(testIds.homeownerRegistration.emailInputConf).fill(testData.homeownerRegistration.email);
    await page.locator(testIds.homeownerRegistration.phoneNumber).fill(testData.homeownerRegistration.phone);
    await page.locator(testIds.homeownerRegistration.password).fill(testData.homeownerRegistration.password);
    await page.locator(testIds.homeownerRegistration.termCheckbox).click();
    await page.waitForTimeout(1000);
    await page.locator(testIds.homeownerRegistration.nextButton).click();

    // Home price ?
    await page.locator(testIds.homeownerRegistration.homePrice).fill(testData.homeownerRegistration.homePrice);
    await page.locator(testIds.homeownerRegistration.nextButton).click();

    // Condition ?
    await page.locator(testIds.homeownerRegistration.homeVeryGood).click();
    await page.locator(testIds.homeownerRegistration.description).fill(testData.homeownerRegistration.description);
    await page.locator(testIds.homeownerRegistration.nextButton).click();

    // TODO: Verify Pending Approval status text or something else on Dashboard to validate registration completion

  });


});
