// @ts-check
const { expect } = require('@playwright/test');
const ids = require('./ids');
const data = require('./data');
const urls = require('../../../testUtils/urls');

const pageURLs = [
  'dummy page',
  urls.HOMEOWNER_REG_ADDRES_LOOKUP,
  urls.HOMEOWNER_REG_PROPERTY_INFO,
  urls.HOMEOWNER_REG_WORKING_WITH_AGENT,
  urls.HOMEOWNER_REG_SELLING_PERIOD,
  urls.HOMEOWNER_REG_PROPERTY_CONDITION,
  urls.HOMEOWNER_REG_BUY_HOME,
  urls.HOMEOWNER_REG_ACCOUNT_INFO,
  urls.HOMEOWNER_REG_PROPERTY_PRICE,
  urls.HOMEOWNER_REG_PROPERTY_PHOTO,
  urls.HOMEOWNER_REG_LISTING_DESCRIPTION
]

// Note: this function is for happy path and it just fills in the form
async function addressLookup (page) {
  await expect(page).toHaveURL(pageURLs[1]);
  
  // Enter address
  await page.locator(ids.addressLookup.address).click()
  await page.waitForSelector(ids.addressLookup.address);
  await page.waitForTimeout(1000);
  await page.keyboard.type(data.address);
  await page.waitForTimeout(1000);
  await page.keyboard.press('ArrowDown'); 
  await page.waitForTimeout(1000);
  await page.keyboard.press('Enter'); 
  await page.locator(ids.next).click();
}

async function addressLookupNoZipCode(page) {
  // TODO - do tests when selected address has no zip
}

async function propertyInformation(page) {
  await expect(page).toHaveURL(pageURLs[2]);
  await testGoBack(page, 2);
  await testCorrectAddress(page);

  // ensure map is loaded
  // TODO

  // fill in data if missing from Corelogic
  const beds = await page.locator(ids.propertyInformation.beds).inputValue();
  const baths = await page.locator(ids.propertyInformation.baths).inputValue();
  const squareFeet = await page.locator(ids.propertyInformation.squareFeet).inputValue();

  if (beds == '' || baths == '' || squareFeet == '') {
    console.log(`WARNING: Some CoreLogic data missing for ${data.address} - 
      beds: ${beds}, baths: ${baths}, sqft: ${squareFeet}`);
  }

  await page.locator(ids.propertyInformation.beds).fill(data.beds);
  await page.locator(ids.propertyInformation.baths).fill(data.baths);
  await page.locator(ids.propertyInformation.squareFeet).fill(data.squareFeet);

  await page.locator(ids.next).click();
}

async function questionWorkingWithAgent(page) {
  await expect(page).toHaveURL(pageURLs[3]);
  await testGoBack(page, 3);
  await testCorrectAddress(page);

  await page.locator(ids.workingWithAnAgent.no).click();
}

async function questionWhenToSell(page) {
  await expect(page).toHaveURL(pageURLs[4]);
  await testGoBack(page, 4);
  await testCorrectAddress(page);

  await page.locator(ids.whenToSell.asap).click();
}

async function questionPropertyCondition(page) {
  await expect(page).toHaveURL(pageURLs[5]);
  await testGoBack(page, 5);
  await testCorrectAddress(page);

  await page.locator(ids.propertyCondition.good).click();
}

async function questionBuyingHome(page) {
  await expect(page).toHaveURL(pageURLs[6]);
  await testGoBack(page, 6);
  await testCorrectAddress(page);

  await page.locator(ids.buyingHome.no).click();
}

// Note: this function is for happy path and it just fills in the form
async function accountInfo(page) {
  await expect(page).toHaveURL(pageURLs[7]);
  await testGoBack(page, 7);
  await testCorrectAddress(page);

  await page.locator(ids.accountInfo.firstName).fill(data.firstName);
  await page.locator(ids.accountInfo.lastName).fill(data.lastName);
  await page.locator(ids.accountInfo.email).fill(data.email);
  await page.locator(ids.accountInfo.confirmEmail).fill(data.email);
  await page.locator(ids.accountInfo.phoneNumber).fill(data.phone);
  await page.locator(ids.accountInfo.password).fill(data.password);
  await page.locator(ids.accountInfo.agreeCheckbox).click();
  await page.waitForTimeout(1000);
  await expect(page.locator(ids.next)).toBeEnabled();
  await page.locator(ids.next).click();

  console.log(`Account ${data.email} - ${data.address} created.`);
}

async function testAccountInfoForm(page) {
  // TODO - this should do form validation testing
}

async function questionListingPrice(page) {
  await expect(page).toHaveURL(pageURLs[8]);
  await testCorrectAddress(page);

  await page.locator(ids.listingPrice).fill(data.homePrice);
  await page.locator(ids.next).click();
  await page.waitForTimeout(1000);
}

// Note: happy path photo upload only
async function photoUpload(page) {
  await expect(page).toHaveURL(pageURLs[9]);
  await testGoBack(page, 9);
  await testCorrectAddress(page);
  // TODO - upload a picture here
  await page.locator(ids.next).click();
  await page.waitForTimeout(1000);
}

async function testPhotoUpload(page) {
  // TODO - this function will test edge cases and overall 
  // functionality of the photo upload page
}

// Note: happy path, put in text only and checks all checkboxes
async function listingDescription(page) {
  await page.waitForTimeout(1000);
  await expect(page).toHaveURL(pageURLs[10]);
  await testGoBack(page, 10);
  await testCorrectAddress(page);

  await page.locator(ids.listingDescription.important).fill(data.importantInfo);
  await page.locator(ids.listingDescription.description).fill(data.description);
  await page.locator(ids.listingDescription.agreeCheckbox).click();

  await page.locator(ids.next).click();

  // confirm checklist.  
  await expect(page.locator(ids.checklist.dialog)).toBeVisible();
  
  // get checkboxes dynamically
  const checkboxes = await page.locator(ids.checklist.dialog).locator('input[type=checkbox]');
  await page.waitForTimeout(1000);
  const count = await checkboxes.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).click();
  }

  await page.locator(ids.checklist.confirm).click();
  await page.waitForTimeout(1000);
}

async function testListingDescription(page) {
  // TODO - test edge cases and limits to important info and description text fields
  // also verify that User Agreement pops up in a new tab and that close button works
}

async function testNoActivate(page) {
  // TODO - test edge case where user doesn't check all the checkboxes 
  // and warning message pops up about the approval process
}

// Verifies that the user can click on Back link 
// then returns the user to the next page
async function testGoBack(page, curPageNum) {
  const curPage = page.url();
  await page.locator(ids.goBack).click();

  const errorMsg = `Go Back from ${pageURLs[curPageNum]} goes to wrong page`;
  expect(page, errorMsg).toHaveURL(pageURLs[curPageNum-1]);

  await page.locator(ids.next).click();
}

// Verifies the address on top of the page 
async function testCorrectAddress(page) {
  const addressTitle = await page.locator(ids.addressTitle);
  const errorMsg = 'Incorrect address is displayed';
  expect(addressTitle, errorMsg).toHaveText(data.address);
}

async function testSkip(page) {
  // TODO - test skip function on listing price, photo upload, and listing description pages
  // don't do it for happy paths
}

module.exports = {
  addressLookup,
  addressLookupNoZipCode,
  propertyInformation,
  questionWorkingWithAgent,
  questionWhenToSell,
  questionPropertyCondition,
  questionBuyingHome,
  accountInfo,
  questionListingPrice,
  photoUpload,
  listingDescription
};