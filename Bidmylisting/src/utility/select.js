class Select {
  // Gets Text from element of any type

  async selectFromDropDown(page, locator, value) {
    const selectElem = await page.$(locator);
    await selectElem.type(value);
  }

  async selectFromDropDownUsingIndex(page, locator, index, value) {
    const selectElem = await page.$$(locator);
    await selectElem[index].type(value);
  }

  async selectDropDownValueUsingIndex(page, element, index, value) {
    try {
      await page.waitForSelector(element);
      await page.select(element[index], value);
    } catch (e) {
      throw new Error(`Unable to click the dropdown value ${value}` + e);
    }
  }

  async copyContentUsingButton(page, browser) {
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(page.url(), ["clipboard-read"]);
    return await page.evaluate(
      "(async () => await navigator.clipboard.readText())()"
    );
  }
}
export default new Select();
