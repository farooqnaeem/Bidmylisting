// @ts-check
const { test, expect } = require('@playwright/test');
const urls = require('../../testUtils/urls');
const loginPage = require('../../testPages/login');

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(urls.SIGN_IN);
  });

  test('Login as an agent', async ({ page }) => {
      await loginPage.loginAsAgent(page);
  });

  test('Login as a homeowner', async ({ page }) => {
    await loginPage.loginAsHomeowner(page);
  });

  test('Login as an admin', async ({ page }) => {
    await loginPage.loginAsAdmin(page);
  });

  test.skip('Test Forgot Password', async ({ page }) => {
    // TODO
  });

  test.skip('Test Remember Me', async ({ page }) => {
    // TODO
  });

  test.skip('Do login page validations', async ({ page }) => {
    // TODO
  });
});
