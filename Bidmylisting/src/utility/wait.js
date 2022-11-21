class Wait {
  static async waitForPageLoad2 (page) {
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    });
  }

  static async waitForElement (page, element) {
    await page.waitForSelector(element)
  }

  static async elementNotExist (page, element) {
    try {
      await page.waitForSelector(element, { hidden: true })
    } catch (errorMessage) {
      throw new Error('Element is visible on the website with locator' + element)
    }
  }

  static async elementExist (page, element) {
    try {
      await page.waitForSelector(element, { visible: true })
    } catch (errorMessage) {
      throw new Error('Element is not visible on the website with locator' + element)
    }
  }

  static async waitForElementWithTime (page, element, time) {
    try {
      await page.waitForSelector(element, { visible: true, timeout: time })
    } catch (errorMessage) {
      throw new Error('Element is not visible on the website with locator' + element)
    }
  }

  static async elementExistXpath (page, element) {
    try {
      await page.waitForTimeout(2000)
      await page.waitForXPath(element, { visible: true })
    } catch (errorMessage) {
      throw new Error(`Element is visible on the website with xpath ${element}, error message ${errorMessage}`)
    }
  }

  static async waitForElementXpath (page, element, time) {
    try {
      await page.waitForXPath(element, { visible: true, timeout: time })
    } catch (errorMessage) {
      throw new Error(`Element is not visible on the website with xpath ${element}, error message ${errorMessage}`)
    }
  }

  static async elementNotExistXpath (page, element) {
    try {
      await page.waitForXPath(element, { hidden: true })
    } catch (errorMessage) {
      throw new Error(`Element is visible on the website with xpath ${element}, error message ${errorMessage}`)
    }
  }

  static async waitForDomContentLoad (page) {
    const url = await page.url();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  static async waitForPageLoad (page) {
    await page.waitForNavigation({
      waitUntil: 'networkidle0'
    });
  }

  static async waitForFunction (page, element) {
    try {
      await page.waitForFunction(
        'document.querySelector("' + element + '")!==null'
      );
    } catch (e) {
      console.log(`waitForFunction method has failed in waitUtility due to ${e}`)
    }
  }
}

export default Wait
