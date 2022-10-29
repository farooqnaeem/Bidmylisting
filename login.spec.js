// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('./qa.config.js');
const testIds = require('./qa.testids');

test.describe('Login Page Tests', () => {

  test.beforeEach(async ({ page, browserName }) => {
    await page.goto(bml.url + '/signin');
  });

  test('Login - test page content', async ({ page }) => {
    await expect(page).toHaveTitle('BidMyListing®');
    await expect(page.locator(testIds.login.emailLabel)).toBeVisible();
    await expect(page.locator(testIds.login.emailInput)).toBeVisible();

    await expect(page.locator(testIds.login.pwdLabel)).toBeVisible();
    await expect(page.locator(testIds.login.pwdInput)).toBeVisible();
    await expect(page.locator(testIds.login.pwdInput)).toHaveAttribute('type', 'password')
    await expect(page.locator(testIds.login.showHide)).toBeVisible();
    
    await expect(page.locator(testIds.login.rememberMe)).toBeVisible();
    await expect(page.locator(testIds.login.forgotPwdLink)).toBeVisible();
    //await expect(page.locator(testIds.login.forgotPwdDlg)).toBeVisible();
    await expect(page.locator(testIds.login.submitBtn)).toBeVisible();

    // create account
    await expect(page.locator(testIds.login.createAccount)).toBeVisible();
    //await expect(page.locator(testIds.login.createAgent)).toBeVisible();
    //await expect(page.locator(testIds.login.createSeller)).toBeVisible();

    // header & footer
    // TODO
  });

  test('Login - test page validations', async ({ page }) => {
    // TODO
    test.fail();
  });
  
  test('Login - test Remember Me', async ({ page }) => {
    // TODO
    test.fail();
  });
  
  test('Login - test Forgot Password', async ({ page }) => {
    // TODO
    test.fail();
  });
  
  test('Login - test User Login', async ({ page }) => {
    // TODO
    test.fail();
  });
});
