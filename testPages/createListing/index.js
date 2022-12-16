const ids = require('./ids');
const data = require('./data');
const {loginAsHomeowner} = require("../login");

async function createListing (page) {
    await loginAsHomeowner(page)
    await doneButton(page)
    await plusSignButton(page)
    await propertyInformation(page)
    await listingPrice(page)
    await enhanceYourListing(page)

}
async function doneButton (page) {
    await page.waitForTimeout(3000)
    await page.locator(ids.doneButton).click()
}
async function plusSignButton(page) {
    await page.waitForTimeout(2000)
    await page.locator(ids.plusSignButton).click()
}
async function propertyInformation (page) {
    await page.waitForTimeout(3000)
    await page.locator(ids.address).click()
    await page.keyboard.type(data.address);
    await page.waitForTimeout(3000);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000)
    await page.locator(ids.bathrooms).click()
    await page.keyboard.type(data.bathrooms)
    await page.waitForTimeout(3000)
    await page.locator(ids.homeCondition).click()

}
async function listingPrice (page) {
    await page.waitForTimeout(2000)
    await page.locator(ids.listingPrice).click()
    await page.keyboard.type(data.listingPrice)
    await page.waitForTimeout(1000)
    await page.locator(ids.continueButtonOfListingPrice).click()
}
async function enhanceYourListing (page) {
    await page.waitForTimeout(4000)
    const fileInput = await page.$(ids.uploadImage);
    await fileInput.setInputFiles(data.uploadImage)
    await page.waitForTimeout(1000)
    await page.locator(ids.importantToKnow).click()
    await page.keyboard.type(data.importantToKnow)
    await page.waitForTimeout(1000)
    await page.locator(ids.description).click()
    await page.keyboard.type(data.description)
    await page.waitForTimeout(1000)
    await page.locator(ids.finishButton).click()
}
module.exports = {
    createListing,
}