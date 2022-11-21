import waitUtility from "../../utility/wait";
import * as bidmylisting from "../../locators/Home_Owner.json";
import clickUtility from "../../utility/clickUtility";
import input from "../../utility/input";



class Homeowner {
    async homeownerButton(page) {
        await page.waitForTimeout(2000)
        await waitUtility.waitForElement(page, bidmylisting.homeownerButton)
        await clickUtility.clickElement(page, bidmylisting.homeownerButton)
    }

    async enterAddress(page) {
        await page.waitForTimeout(2000)
        await waitUtility.waitForElement(page, bidmylisting.enterAddress)
        await clickUtility.clickElement(page, bidmylisting.enterAddress)
        await input.enterText(page, bidmylisting.enterAddress, 'İstanbul, Turkey')
        const selectValue = bidmylisting.istanbul;
        await page.waitForTimeout(5000)
        await waitUtility.waitForElement(page, selectValue);
        await Promise.all([
            page.evaluate((selector) => {
                return document.querySelector(selector).click();
            }, selectValue)
        ]);
    }

    async nextButton(page) {
        await waitUtility.waitForElement(page, bidmylisting.nextButton)
        await clickUtility.clickElement(page, bidmylisting.nextButton)
    }

    async zipCode(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.zipCode, 30000)
        await clickUtility.clickElement(page, bidmylisting.zipCode)
        await input.enterText(page, bidmylisting.zipCode, '344523')
    }

    async numberofBedrooms(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.numberofBedrooms, 30000)
        await clickUtility.clickElement(page, bidmylisting.numberofBedrooms)
        await input.enterText(page, bidmylisting.numberofBedrooms, '1')

    }

    async numberofBaths(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.numberofBaths, 40000)
        await clickUtility.clickElement(page, bidmylisting.numberofBaths)
        await input.enterText(page, bidmylisting.numberofBaths, '1')


    }

    async squareFootage(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.squareFootage, 30000)
        await clickUtility.clickElement(page, bidmylisting.squareFootage)
        await input.enterText(page, bidmylisting.squareFootage, '2500')

    }

    async listingAgent(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.listingAgent, 30000)
        await clickUtility.clickElement(page, bidmylisting.listingAgent)

    }

    async expireMonth(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.expireMonth, 30000)
        await clickUtility.clickElement(page, bidmylisting.expireMonth)

    }

    async sellYourHome(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.sellYourHome, 30000)
        await clickUtility.clickElement(page, bidmylisting.sellYourHome)

    }

    async conditionofHome(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.conditionofHome, 30000)
        await clickUtility.clickElement(page, bidmylisting.conditionofHome)

    }

    async yesButtonofBuyaHome(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.yesButtonofBuyaHome, 30000)
        await clickUtility.clickElement(page, bidmylisting.yesButtonofBuyaHome)

    }

    async enterFirstName(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.enterFirstName, 40000)
        await clickUtility.clickElement(page, bidmylisting.enterFirstName)
        await input.enterText(page, bidmylisting.enterFirstName, 'Test')

    }

    async enterLastName(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.enterLastName, 40000)
        await clickUtility.clickElement(page, bidmylisting.enterLastName)
        await input.enterText(page, bidmylisting.enterLastName, 'Test')
    }

    async emailAddress(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.emailAddress, 40000)
        await clickUtility.clickElement(page, bidmylisting.emailAddress)
        await input.enterText(page, bidmylisting.emailAddress, 'itsfarooqnaeem+3@gmail.com')
    }

    async reverifyEmailAddress(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.reverifyEmailAddress, 40000)
        await clickUtility.clickElement(page, bidmylisting.reverifyEmailAddress)
        await input.enterText(page, bidmylisting.reverifyEmailAddress, 'itsfarooqnaeem+3@gmail.com')
    }

    async phoneNumber(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.phoneNumber, 40000)
        await clickUtility.clickElement(page, bidmylisting.phoneNumber)
        await input.enterText(page, bidmylisting.phoneNumber, '03234345667')
    }

    async Password(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.Password, 40000)
        await clickUtility.clickElement(page, bidmylisting.Password)
        await input.enterText(page, bidmylisting.Password, 'Pikes1122@')
    }

    async clickonCheckbox(page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.clickonCheckbox, 40000)
        await clickUtility.clickElement(page, bidmylisting.clickonCheckbox)
    }
    async createMyListing (page) {
        await waitUtility.waitForElementWithTime(page, bidmylisting.createMyListing, 40000)
        await clickUtility.clickElement(page, bidmylisting.createMyListing)
    }
}

export default new Homeowner();