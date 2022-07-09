// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('../../qa.config.js');
const testIds = require('../../testData/testids.js');
const testData = require('../../testData/testData.js');
const validations = require('../../util/validations');

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page, browserName }) => {
    await page.goto(bml.url.dev);
  });

  test('Login', async ({ page }) => {
    // await page.goto(bml.url.dev);
    await page.locator(testIds.homepage.signin).click();
    await page.locator(testIds.login.emailInput).fill(testData.homeowner.email);
    await page.locator(testIds.login.pwdInput).fill(testData.homeowner.password);
    await page.locator(testIds.login.submitBtn).click();

  });


});
