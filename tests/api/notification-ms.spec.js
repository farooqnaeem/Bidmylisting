// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../../playwright.config.js');
const apiUrl = config.api.notificationMsUrl;

/* Endpoints under test
  getUserSettings GET /bml/v1/settings/user/:userId
  setUserSettings PUT /bml/v1/settings/user/:userId
  sendEmail       POST /bml/v1/email
  sendSMS         POST /bml/v1/sms
*/

test.describe('Notification Microservice API Tests - ' + apiUrl, () => {

  test('Verify service', async ({ request }) => {
    const info = await request.get(apiUrl + '/info');
    expect(info.ok()).toBeTruthy();
    
    const json = await info.json();
    expect(json.routes).toBeTruthy();
    console.log(json.routes);
  });
});