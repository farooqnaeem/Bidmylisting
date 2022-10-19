// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../../playwright.config.js');
const testIds = require('../../testData/testids.js');
const testData = require('../../testData/testData.js');
const auth = require('../../testUtils/api/auth');

test.describe('Homeowner Dashboard Tests', () => {

  var homeownerToken = '';

  test.beforeAll( async ({ request }) => {
    // login as homeowner
    homeownerToken = await auth.getToken(request, testData.login.homeowner.email, testData.login.homeowner.password)
    console.log(`User ${testData.login.homeowner.email} has logged in.`);
  });

  test('Page navigation elements', async ({page}) => {
    
  });
});