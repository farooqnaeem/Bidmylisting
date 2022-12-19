const { test } = require('@playwright/test');
const dashboard = require('../../testPages/homeowner/dashboard');
test.describe('Login Tests', () => {

  test('The user automate the complete scenario of create listings', async ({page}) => {
    await dashboard.dashboardListingInfo(page);
  });
});