// @ts-check
const { expect } = require('@playwright/test');
const ids = require('./ids');
const data = require('./data');
const urls = require('../../testUtils/urls');
const config = require('../../testUtils/conf');
const env = config.getEnv();

async function loginAsAgent(page) {
  await login(page, data[env].agent[0], data[env].agent[1]);
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(urls.AGENT_DASHBOARD);
}

async function loginAsHomeowner(page) {
  await login(page, data[env].homeowner[0], data[env].homeowner[1]);
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(urls.HOMEOWNER_DASHBOARD);
}

async function loginAsAdmin(page) {
  await login(page, data[env].admin[0], data[env].admin[1]);
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(urls.ADMIN_DASHBOARD);
}

async function login(page, email, password) {
  await page.goto(urls.SIGN_IN);
  const submitBtn = page.locator(ids.submit);
  await expect(submitBtn).not.toBeEnabled();
  await page.locator(ids.email).fill(email);
  await expect(submitBtn).not.toBeEnabled();
  await page.locator(ids.password).fill(password);
  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();
  console.log(`Logged in ${email}`);
}

module.exports = {
  loginAsAdmin,
  loginAsAgent,
  loginAsHomeowner
}
