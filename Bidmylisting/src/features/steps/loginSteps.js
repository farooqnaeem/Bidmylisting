import { Given, When, Then } from "@cucumber/cucumber";
import login from '../../pages/actions/login'
When('I hit the url', async function () {
  await login.visitUrl(this.page);
});

When('I hit url', async function () {
  await login.hitUrl(this.page);
});

When('user hits the login url', { timeout: 50000 }, async function () {
  await login.visitUrl(this.page);
});

When('I hit the url for incognito window', async function () {
  await login.visitUrl(this.page2);
});

Given(/^script loads data from "([^"]*)" with "([^"]*)"$/, async function (filename, key) {
  const data = process.argv
  if (data.includes('dev')) {
    await login.readFile('dev_login', key);
  } else if (data.includes('staging')) {
    await login.readFile(filename, key);
  }
});
// TODO remove method below and use above method instead
Given(/^I read the login file "([^"]*)" with "([^"]*)"$/, async function (filename, key) {
  const data = process.argv
  if (data.includes('dev')) {
    await login.readFile('dev_login', key);
    console.log('i came in the dev')
  } else if (data.includes('staging')) {
    await login.readFile(filename, key);
  }
});
When(/^user opens incognito window/, async function () {
  await this.openCognitoWindow();
});

When(/^user closes incognito window/, async function () {
  await this.closeCognitoWindow();
});
Given(/^script loads test data from "([^"]*)" with "([^"]*)"$/, async function (filename, key) {
  await login.readFile(filename, key);
});