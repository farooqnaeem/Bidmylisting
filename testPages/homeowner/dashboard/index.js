// @ts-check
const { expect } = require('@playwright/test');
const ids = require('./ids.js');
const data = require('./data.js');
const {loginAsHomeowner} = require("../../login");


// gets the information presented by the currently displayed listing
async function getCurrentListing(page) {
  const selector = await page.locator(ids.listingToggle);
}

// publishes the current listing on the homeowner dashboard
async function publishCurrentListing(page) {
  await page.locator(ids.publishBtn).click();
  /*
    verify checkbox appears
    check all the check boxes
    click publish button
    verify listing status
  */
}

// selects the listing with the given address on the homeowner dashboard
async function selectListing(address, page) {
  await page.locator(ids.listingToggle).click();
  await page.waitForSelector(ids.listingChoices);
  const listings = await page.locator(ids.listingChoices + ' > li>');
  const dataTestId = listings.find(async it => {
    if (await it.innerText() == address + ' SAVED') {
      return await it.getAttribute('data-testid');
    }
  });
  expect(dataTestId).not.toBeNull;
  await page.locator(dataTestId).click();
  await page.waitForTimeout(1000);
}
async function dashboardListingInfo (page) {
  await loginAsHomeowner(page)
  await doneButton(page)
  await viewBidButton(page)
  await homeButton(page)
  await selectListingInfoFromDropDown(page)

}

async function doneButton (page) {
  await page.waitForTimeout(3000)
  await page.locator(ids.doneButton).click()
}

async function viewBidButton(page) {
  await page.waitForTimeout(2000)
  await page.locator(ids.viewDetailsBtn).click()
  await page.waitForTimeout(3000)
  await page.locator(ids.lowestCommission).click()
  await page.waitForTimeout(3000)
  await page.locator(ids.highestCommission).click()
  await page.waitForTimeout(3000)
  await page.locator(ids.mostRecent).click()
}

async function homeButton(page) {
  await page.waitForTimeout(2000)
  await page.locator(ids.homeButton).click()
}

 async function selectListingInfoFromDropDown(page) {
   await page.waitForTimeout(4000)
   await page.locator(ids.menuToggle).click()
   await page.waitForTimeout(4000)
   await page.locator(ids.selectListingInfoFromDropDown).click()
   await page.locator(ids.editListingBtn).click()
   await page.locator(ids.homeButton).click()
}

module.exports = {
  publishCurrentListing,
  selectListing,
  dashboardListingInfo,
}