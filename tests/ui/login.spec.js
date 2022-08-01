// @ts-check
const { test, expect } = require('@playwright/test');
const testIds = require('../../testData/testids.js');
const testData = require('../../testData/testData.js');

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Login', async ({ page }) => {
    // await page.goto(bml.url.dev);
    await page.locator(testIds.homepage.signin).click();
    await page.locator(testIds.login.emailInput).fill(testData.homeowner.email);
    await page.locator(testIds.login.pwdInput).fill(testData.homeowner.password);
    await page.locator(testIds.login.submitBtn).click();

    // validate after login, check for logout button


  });


});
