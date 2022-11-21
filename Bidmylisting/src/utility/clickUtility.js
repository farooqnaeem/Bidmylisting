import waitUtility from "./wait";

class ClickUtility {
  async clickElement(page, element) {
    try {
      await page.waitForSelector(element);
      await page.click(element);
    } catch (errorMessage) {
      throw new Error(`Unable to click on locator ${element} ${errorMessage}`);
    }
  }

  async clickElementByXpath(page, element) {
    try {
      await page.waitForXPath(element, { visible: true });
      const elements = await page.$x(element, { visible: true });
      await elements[0].click();
    } catch (e) {
      throw new Error(`Unable to click element with xpath ${element} , ${e}`);
    }
  }

  async selectDropDownValue(page, element, value) {
    try {
      await page.waitForSelector(element);
      await page.select(element, value);
    } catch (e) {
      throw new Error(`Unable to click the dropdown value ${value}` + e);
    }
  }

  async selectDropDownValueByXpath(page, element, value) {
    try {
      await page.waitForXPath(element);
      const elements = await page.$x(element);
      await elements[0].click();
      await page.select(elements[0], value);
    } catch (e) {
      throw new Error("Unable to click the dropdown value " + value);
    }
  }

  async clickLinkText(page, text) {
    const xpath = "//a[contains(text(),'" + text + "')]";
    await this.clickElementByXpath(page, xpath);
  }

  async getAttributeValue(page, element, attribute) {
    await page.waitForSelector(element);
    const linkElement = await page.$(element);
    return await (await linkElement.getProperty(attribute)).jsonValue();
  }

  async getAttributeValueByXpath(page, element, attribute) {
    await page.waitForXPath(element);
    const targetElement = (await page.$x(element))[0];
    return await (await targetElement.getProperty(attribute)).jsonValue();
  }

  async getAttributeValueUsingCss(page, element, attribute) {
    await page.waitForFunction(
      (selector) => !!document.querySelector(selector),
      {},
      element
    );
    return await page.$$eval(element, (el) =>
      el.map((x) => x.getAttribute(attribute))
    );
  }

  async selectWholeText(page, element, count) {
    await page.click(element, { clickCount: count });
  }

  async clearField(page, element) {
    await page.click(element, { clickCount: 3 });
    await page.keyboard.press("Backspace");
  }

  async clearFieldByXpath(page, element) {
    const elements = await page.$x(element, { visible: true });
    await elements[0].click({ clickCount: 3 });
    await page.keyboard.press("Backspace");
  }

  async clickElementUsingIndexXpath(page, xpath, index) {
    try {
      await page.waitForXPath(xpath);
      const elementXpath = await page.$x(xpath);
      await elementXpath[index].click();
    } catch (errorMessage) {
      throw new Error("Unable to click the element " + errorMessage);
    }
  }

  async clickElementUsingIndexCss(page, cssPath, index) {
    try {
      await waitUtility.waitForElement(page, cssPath);
      const elementsCss = await page.$$(cssPath);
      await elementsCss[index].click();
    } catch (errorMessage) {
      throw new Error("Unable to click the element " + errorMessage);
    }
  }

  async focusAndClickWithID(page, id) {
    await page.evaluate((id) => {
      const element = document.getElementById(id);
      element.focus();
      element.click();
    }, id);
  }

  async focusAndClickWithCss(page, element) {
    await page.evaluate((ele) => {
      const element = document.querySelector(ele);
      element.focus();
      element.click();
    }, element);
  }

  async focusAndClickWithClassName(page, className) {
    try {
      await page.evaluate((className) => {
        const element = document.getElementsByClassName(className);
        element[0].focus();
        element[0].click();
      }, className);
    } catch (errorMessage) {
      throw new Error("Unable to click the element " + errorMessage);
    }
  }

  async clickElementAndAcceptDialogue(page, element) {
    element.click();
    await page.keyboard.press("Enter");
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  async clickViaJavascript(page, element) {
    await page.waitForSelector(element);
    await page.evaluate((el) => document.querySelector(el).click(), element);
  }

  async clickXpathViaJavaScript(page, xpath) {
    await page.waitForXPath(xpath);
    const elementToClick = (await page.$x(xpath))[0];
    await page.evaluate((el) => {
      el.click();
    }, elementToClick);
  }

  async acceptDialogBox(page) {
    try {
      await page.on("dialog", async (dialog) => {
        dialog.accept();
      });
    } catch (errorMessage) {
      throw new Error("Unable to accept dialog box " + errorMessage);
    }
  }
}
export default new ClickUtility();
