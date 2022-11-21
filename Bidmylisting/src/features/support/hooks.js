import { After, Before, Status } from '@cucumber/cucumber';
import { TestRailClient } from './testrailClient';

const testrailRunId = process.env.TESTRAIL_RUN_ID
const testrailUrl = 'https://sendoso.testrail.io/'
const testrail = new TestRailClient({
  username: process.env.TESTRAIL_USERNAME,
  password: process.env.TESTRAIL_PASSWORD,
  url: testrailUrl
})

Before(async function () {
  await this.openBrowser();
});

const options = {
  path: 'reports/failedScreenshot.png',
  fullPage: true,
  omitBackground: false
}

After(async function (scenario) {
  if (testrailRunId) {
    for (const tag of scenario.pickle.tags) {
      const tagLowerCase = tag.name.toLowerCase().split(',')[0].trim()
      if (tagLowerCase.match(/^(@c)[0-9]+$/)) {
        const caseId = tagLowerCase.replace(/^(@c)/, '')
        let testResult = 1
        if (scenario.result.status === Status.FAILED) {
          testResult = 5
        }
        testrail.addResultForCase(testrailRunId, caseId, testResult)
      }
    }
  }
  if (scenario.result.status === Status.FAILED) {
    const url = await this.page.url();
    const title = await this.page.title();
    await this.page.on('console', (msg) => console.log('CONSOLE LOGS:' + msg.text()));
    await this.page.waitForTimeout(5000);
    const screenShot = await this.page.screenshot(options);
    this.attach(screenShot, 'image/png')
    this.attach(url)
    this.attach(title)
  }
  //await this.closeBrowser();
});
