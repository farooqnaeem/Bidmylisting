import inputUtility from '../input';
import waitUtility from '../wait';
import { expect } from 'chai';
import * as sendosoChoice from '../../src/locators/sendLocators/sendosoChoice.json';
import * as createTouchLocator from '../../src/locators/sendLocators/createTouch.json';

class SendHelper {
  async compareResultByXpath (page, element, expectedResult) {
    await waitUtility.waitForElementXpath(page, element, 7000);
    let actualResult = await inputUtility.getElementTextUsingXpath(
      page,
      element
    );
    actualResult = actualResult.replace(/\s+/g, ' ').trim();
    await expect(actualResult).to.contains(expectedResult);
  }

  async enterDisplayName (page, displayName) {
    await waitUtility.waitForElement(
      page,
      sendosoChoice.sendoso_choice_redesign.displayName
    );
    await (
      await page.$(sendosoChoice.sendoso_choice_redesign.displayName)
    ).click({ clickCount: 3 });
    await inputUtility.enterText(
      page,
      sendosoChoice.sendoso_choice_redesign.displayName,
      displayName
    );
  }

  async compareResult (page, element, expectedResult) {
    await waitUtility.waitForElementWithTime(page, element, 7000);
    let actualResult = await inputUtility.getElementText(page, element);
    actualResult = actualResult.replace(/\s+/g, ' ').trim();
    await expect(actualResult).to.contains(expectedResult);
  }

  async searchEgiftCard (page, egift) {
    await page.$eval(createTouchLocator.touchCreate.egiftCardsSearch, (el) => {
      el.value = '';
    });
    await inputUtility.enterText(
      page,
      createTouchLocator.touchCreate.egiftCardsSearch,
      egift
    );
  }
}

export default new SendHelper();
