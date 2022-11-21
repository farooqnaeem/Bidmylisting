class HoverUtility {
  async hoverElement (page, element) {
    try {
      await page.waitForSelector(element)
      await page.hover(element)
    } catch (errorMessage) {
      throw new Error(`Unable to hover on locator ${element} ${errorMessage}`)
    }
  }
}
export default new HoverUtility()
