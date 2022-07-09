// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('../qa.config.js');
const testIds = require('../testData/testids.js');
const testData = require('../testData/testData.js');

test.describe('Agent Registration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(bml.url.dev);
  });

  test('Registration', async ({ page }) => {
    await page.locator(testIds.homepage.agentRegister).click();


    // Enter agent details
    await page.locator(testIds.agentRegistration.firstName).fill(testData.agentRegistration.firstName);
    await page.locator(testIds.agentRegistration.lastName).fill(testData.agentRegistration.lastName);
    await page.locator(testIds.agentRegistration.email).fill(testData.agentRegistration.email);
    await page.locator(testIds.agentRegistration.emailConf).fill(testData.agentRegistration.email);
    await page.locator(testIds.agentRegistration.phoneNumber).fill(testData.agentRegistration.phone);
    await page.locator(testIds.agentRegistration.zipcode).fill(testData.agentRegistration.zipcode);
    await page.locator(testIds.agentRegistration.password).fill(testData.agentRegistration.password);
    await page.locator(testIds.agentRegistration.termCheckbox).click();
    await page.waitForTimeout(1000);
    await page.locator(testIds.agentRegistration.createBtn).click();

    // Skip phone verification
    await page.locator(testIds.agentRegistration.skipPhoneVer).click();

    // Complete profile


    // TODO: Verify Pending Approval status text or something else on Dashboard to validate registration completion

  });


});
