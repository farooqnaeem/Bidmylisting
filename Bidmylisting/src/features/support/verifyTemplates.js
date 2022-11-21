import waitUtility from "../../utility/wait";
import { assert } from "chai";
let name, heading;

class TemplateVerification {
  async verifyHeading(page, realHeading) {
    await waitUtility.waitForElement(page, templates.templateFeatureClass);
    name = await page.$eval(templates.templateHeading, (el) =>
      el.textContent.trim()
    );
    heading = JSON.stringify(realHeading);
    heading = JSON.parse(heading);
    assert.equal(name, heading);
  }
}
export default new TemplateVerification();
