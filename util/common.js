// @ts-check
const { expect } = require('@playwright/test');
const testIds = require('../testData/testids.js');
const testData = require('../testData/testData.js');

async function testHomeownerRegistrationAddressLookup (page) {
  await expect(page).toHaveURL('/registration/homeowner/address-lookup');
  
  // Enter address
  await page.waitForSelector(testIds.homeownerRegistration.address);
  await page.waitForTimeout(1000);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(1000);
  await page.keyboard.type(testData.homeownerRegistration.address);
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter');

  // TODO add tests for zip code input
}

async function testAgentCreateAccount(page) {
  await expect(page).toHaveURL('/registration/agent/create-account');

  const submitBtn = await page.locator(testIds.agentRegistration.createBtn);
  await expect(submitBtn).toBeDisabled();

  // Enter agent details
  await page.locator(testIds.agentRegistration.firstName).fill(testData.agentRegistration.firstName);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.lastName).fill(testData.agentRegistration.lastName);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.email).fill(testData.agentRegistration.email);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.emailConf).fill(testData.agentRegistration.email);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.phoneNumber).fill(testData.agentRegistration.phone);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.zipcode).fill(testData.agentRegistration.zipcode);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.password).fill(testData.agentRegistration.password);
  await expect(submitBtn).toBeDisabled();
  await page.locator(testIds.agentRegistration.termCheckbox).click();
  await page.waitForTimeout(1000);
  await expect(submitBtn).not.toBeDisabled();
}

module.exports = {
  testHomeownerRegistrationAddressLookup,
  testAgentCreateAccount
}