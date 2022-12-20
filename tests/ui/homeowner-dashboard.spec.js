const { test } = require('@playwright/test');
const dashboard = require('../../testPages/homeowner/dashboard');
test.describe('Login Tests', () => {

  test('Dashboard Listing Info ', async ({page}) => {
    await dashboard.dashboardListingInfo(page);
  });
});