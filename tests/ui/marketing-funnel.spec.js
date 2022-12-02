// @ts-check
const { test, expect } = require('@playwright/test');
const testIds = require('../../testData/testids.js');
const testData = require('../../testData/testData.js');
const homeReg = require('../../testPages/homeowner/registration');
const common = require('../../testPages/common');
const URL = require('url');

/* 
 * These are the pages that Marketing links in their ad and email campaigns,
* so we need to make sure these pages are always up and running.
*/
test.describe('Marketing Funnel Tests', () => {

  test('Homeowner Registration Page 1', async ({ page }) => {
    await page.goto('/registration/homeowner/address-lookup');
    await homeReg.addressLookup(page);
    await expect(page).toHaveURL('/registration/homeowner/property-information');
  });

  test('Agent Registration Page 1', async ({ page }) => {
    await page.goto('/registration/agent/create-account');
    await common.testAgentCreateAccount(page);
  });

  test('Agents Get Started Free', async ({ page }, testInfo ) => {
    testInfo.setTimeout(90000); // adding extra timeout for the page
    await page.goto('/agents-get-started-free.html');

    // frame
    const getStartedTestIds = testIds.marketingFunnel.getStarted;
    const formFrame = await page.frameLocator('id=hs-form-iframe-0');
    expect(formFrame, 'form should exist').not.toBeNull();
    await formFrame.locator(getStartedTestIds.email).fill(testData.agentRegistration.email);
    await formFrame.locator(getStartedTestIds.zip).fill(testData.agentRegistration.zipcode);
    await formFrame.locator(getStartedTestIds.firstName).fill(testData.agentRegistration.firstName);
    await formFrame.locator(getStartedTestIds.lastName).fill(testData.agentRegistration.lastName);
    await formFrame.locator(getStartedTestIds.phoneNumber).fill(testData.agentRegistration.phone);
    await formFrame.locator(getStartedTestIds.submit).click();       
    await expect(page, 'form should redirect to correct URL').toHaveURL(/^https:\/\/www.bidmylisting.com/);
    const url = await page.url();
    const queryString = URL.parse(url, true).search;
    expect(queryString?.indexOf('utm'), 'url should contain utm in querystring').toBeGreaterThan(0);
  });

  test('Agent Recruitment Opt In', async ({ page }, testInfo ) => {
    testInfo.setTimeout(120000); // adding extra timeout for the page
    await page.goto('/agent-recruitment-optin.html');

    const optinTestIds = testIds.marketingFunnel.recruitmentOptin;
    const formDiv = await page.locator(optinTestIds.formDiv);
    expect(formDiv, 'form container should exist').not.toBeNull();
    expect(formDiv, 'form should not be visible yet').not.toBeVisible();
    
    const formFrame = await page.frame({ url: /.\/marketing-signup\?step=create-account&role=agent/ });
    expect(formFrame, 'agent form should exist').not.toBeNull();

    const closeBtn = await page.locator(optinTestIds.closeBtn);
    expect(closeBtn, 'form close button should exist').not.toBeNull();

    for (var i = 1; i < 5; i++) {
      const btn = await page.locator(optinTestIds[`registerBtn${i}`]); 
      expect(btn, `register button ${i} should exist`).toBeVisible();
      await testButtonClick(page, btn, closeBtn, formDiv);
    }
  });

  async function testButtonClick( page, btn, closeBtn, formDiv) {
    await btn.click();  // open form popup
    await page.waitForTimeout(1000);
    await expect(formDiv).toBeVisible();
    await closeBtn.click();  // close it
    await page.waitForTimeout(1000);
    await expect(formDiv).not.toBeVisible();
  }
});