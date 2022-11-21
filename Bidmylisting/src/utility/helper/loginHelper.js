import login from '../../src/features/../locators/signIn.json';
import waitUtility from '../wait';

class LoginHelper {
  async getLoggedInUserName (page) {
    await waitUtility.waitForElementWithTime(page, login.sendoso.loggedInUser)
    let LoggedInUser = await page.evaluate(el => el.textContent, (await page.$(login.sendoso.loggedInUser)))
    LoggedInUser = LoggedInUser.replace(/\s+/g, ' ').trim()
    return LoggedInUser
  }
}

export default new LoginHelper()
