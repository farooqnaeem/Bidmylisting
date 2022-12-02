// @ts-check
const { test } = require('@playwright/test');
const login = require('../../testPages/login');

test.describe('Homeowner Dashboard Tests', () => {

  var homeownerToken = '';

  test.beforeEach( async ({page}) => {
    await login.loginAsHomeowner(page);
  });

  test('Page navigation elements', async ({page}) => {
    // TODO
  });
});