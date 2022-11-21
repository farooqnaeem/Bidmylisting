import clickUtility from "./clickUtility";
class Input {
  // Gets Text from element of any type

  async getElementText(page, element) {
    try {
      await page.waitForSelector(element);
      return await page.$eval(element, (element) => element.textContent);
    } catch (errorMessage) {
      throw new Error("Unable to get the text of element " + errorMessage);
    }
  }

  async getAllElementText(page, element) {
    let linkTexts = await page.$$eval(element, (elements) =>
      elements.map((item) => item.textContent)
    );

    linkTexts = linkTexts
      .toString()
      .trim()
      .replace(/(\r\n|\n|\r)/gm, "");
    linkTexts = linkTexts.replace(/ /g, "");
    return await linkTexts;
  }

  async getElementTextUsingXpath(page, xpath) {
    try {
      await page.waitForXPath(xpath);
      const elementXpath = await page.$x(xpath);
      const xpathTextContent = await elementXpath[0].getProperty("textContent");
      const xpathText = xpathTextContent.jsonValue();
      return xpathText;
    } catch (errorMessage) {
      throw new Error("Unable to get the text of element " + errorMessage);
    }
  }

  async enterTextViaKeyboardUsingXpath(page, elementXpath, text) {
    await clickUtility.clickElementByXpath(page, elementXpath);
    await page.keyboard.type(text);
  }

  async enterText(page, element, value) {
    try {
      await page.waitForSelector(element);
      await page.type(element, value, { delay: 30 });
    } catch (errorMessage) {
      throw new Error(
        `Unable to enter ${value}, Inside locator: ${element}, errorMessage: ${errorMessage}`
      );
    }
  }

  async getFloatValue(page, selector) {
    const element = await page.$(selector);
    const text = await page.evaluate((element) => element.textContent, element);
    return parseFloat(text.replace(/,/g, "").replace("$", ""));
  }

  async enterTextXpath(page, element, value) {
    try {
      await page.waitForXPath(element);
      const elements = await page.$x(element);
      await elements[0].click();
      await elements[0].type(value, { delay: 10 });
    } catch (errorMessage) {
      throw new Error(
        `Unable to enter ${value}, Inside locator: ${element}, errorMessage: ${errorMessage}`
      );
    }
  }

  async getElementTextUsingIndexXpath(page, xpath, index) {
    try {
      await page.waitForXPath(xpath);
      const elementXpath = await page.$x(xpath);
      const xpathTextContent = await elementXpath[index].getProperty(
        "textContent"
      );
      const xpathText = xpathTextContent.jsonValue();
      return xpathText;
    } catch (errorMessage) {
      throw new Error("Unable to get the text of element " + errorMessage);
    }
  }

  async clearInputField(page, element) {
    await page.waitForTimeout(4000);
    await page.waitForSelector(element, { timeout: 40000, visible: true });
    const fieldToClear = await page.$(element);
    fieldToClear.click({ clickCount: 3 });
    await page.waitForTimeout(1500);
    await page.keyboard.press("Backspace");
  }

  async clearXPathInputField(page, element) {
    await page.waitForXPath(element);
    const elements = await page.$x(element);
    await elements[0].click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
  }

  async inputTextInsideIframe(page, iFrame, inputField, message) {
    const iframeHandle = await page.$(iFrame);
    const frame = await iframeHandle.contentFrame();
    await frame.click(inputField, { clickCount: 3 });
    await page.waitForTimeout(1500);
    await page.keyboard.press("Backspace");
    await frame.type(inputField, message);
  }

  async getEelementHrefByXpath(page, xpath, index){
    try {
      await page.waitForXPath(xpath);
      const elementXpath = await page.$x(xpath);
      const xpathTextContent = await elementXpath[index].getProperty("href");
      const xpathText = xpathTextContent.jsonValue();
      return xpathText;
    } catch (errorMessage) {
      throw new Error("Unable to get the href of element " + errorMessage);
    }
  }
}

export default new Input();
