// @ts-check
const { test, expect } = require('@playwright/test');
const testIds = require('../../testData/testids');
const testData = require('../../testData/testData');
const common = require('../../testPages/common');

test.describe('Agent Registration Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Registration', async ({ page }) => {
    await page.locator(testIds.homepage.agentRegister).click();

    // page 1 - agent information
    await common.testAgentCreateAccount(page);
    await page.locator(testIds.agentRegistration.createBtn).click();

    // Skip phone verification
    await page.locator(testIds.agentRegistration.skipPhoneVer).click();

    // Complete profile
    await page.locator(testIds.agentRegistration.license).fill(testData.agentRegistration.license);
    await page.waitForTimeout(1000);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.locator(testIds.agentRegistration.brokerage).fill(testData.agentRegistration.brokerage);
    await page.locator(testIds.agentRegistration.address).click();
    await page.keyboard.type(testData.homeownerRegistration.address);
    await page.waitForTimeout(1000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.locator(testIds.agentRegistration.submitBtn).click();

    // TODO Add credit card
    await page.locator(testIds.agentRegistration.skipPhoneVer).click();


    // TODO: something on Dashboard to validate registration completion

  });


});
