// @ts-check
const { expect } = require('@playwright/test');
const config = require('../../playwright.config.js');

const serverUrl = config.api.url;

/* 
* Functions for calling the Authentication Microservice
*/

// Logs in to the backend to retrieve a Bearer token
async function getToken(request, email, password) {
  const response = await request.post(serverUrl + '/user/login', {
    data: {
      grantType: 'password',
      username: email,
      password: password
    }
  });
  expect(response.ok()).toBeTruthy();  
  const json = await response.json();
  expect(json.accessToken).toBeTruthy();
  return json.accessToken;
}

module.exports = {
  getToken
}