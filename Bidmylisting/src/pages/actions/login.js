import readUtility from '../../utility/readFile'


class Login {
  async visitUrl (page) {
    await page.goto(this.loginData.url, { waitUntil: 'domcontentloaded', timeout: 100000 })
  }

  async hitUrl (page) {
    await page.goto(this.loginData.url, {
      waitUntil: 'load',
      timeout: 0
    });
  }

  async readFile (filename, key) {
    const loginData = await readUtility.readFileWithKey(filename, key);
    this.loginData = loginData;
  }

}
export default new Login()
