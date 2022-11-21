import inputUtility from '../input'
import clickUtility from '../clickUtility'
import signInLocators from '../../src/locators/signIn.json'
import readUtility from '../readFile';
import applicationData from '../../src/data/authorizationParams.json'
import authorizationLocator from '../../src/locators/adminDashboard.json'
import apiData from '../../src/data/apiData.json'
import apiRequest from '../../pages/actions/apiRequest'

let authCode;

class AccessToken {
  async fetch (page, file, user) {
    const loginData = await readUtility.readFileWithKey(file, user);
    const url = `${apiData.oauthUrl}/authorize?client_id=${applicationData.clientId}&response_type=code&redirect_uri=${applicationData.redirectURI}`
    await page.goto(url)
    await page.waitForTimeout(3000)
    if (await page.$(signInLocators.sendoso.userName) !== null) {
      await inputUtility.enterText(page, signInLocators.sendoso.userName, loginData.username)
      await page.waitForTimeout(1000)
      await inputUtility.enterText(page, signInLocators.sendoso.password, loginData.password)
      await clickUtility.clickElement(page, signInLocators.sendoso.login)
      await page.waitForSelector(authorizationLocator.authorizationCode)
    }

    if (await page.$(authorizationLocator.authorizeButton) !== null) {
      await clickUtility.clickElement(page, authorizationLocator.authorizeButton)
      await page.waitForSelector(authorizationLocator.authorizationCode)
    } else {
      await page.waitForSelector(authorizationLocator.authorizationCode)
    }
    authCode = await page.url().split('=')[1]
    const oauthUrl = `${apiData.oauthUrl}/token`
    return await this.getAccessToken(oauthUrl, authCode)
  }

  async getAccessToken (oauthUrl, authCode) {
    const body = {
      client_id: applicationData.clientId,
      client_secret: applicationData.clientSecret,
      code: authCode,
      redirect_uri: applicationData.redirectURI,
      grant_type: 'authorization_code'
    }
    const accessToken = await apiRequest.postData(oauthUrl, body).then(function (response) {
      return response.data.access_token
    }).catch(function (error) {
      console.error(error);
    })
    return accessToken;
  }
}
export default new AccessToken()
