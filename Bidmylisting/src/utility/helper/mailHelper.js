import MailosaurClient from "mailosaur";
import { JSDOM } from "jsdom";
import { expect } from "chai";

class MailHelper {
  async mailosaurGetSubject(page, apiKey, emailTo, serverID, subjectText) {
    page = this.page;
    const client = new MailosaurClient(apiKey);
    return await client.messages
      .get(serverID, {
        sentTo: emailTo,
        timeout: 120000,
      })
      .then((message) => {
        const sub = message.subject;
        expect(sub).to.contains(subjectText);
      });
  }

  async mailosaurGetElementText(
    page,
    apiKey,
    emailTo,
    serverID,
    locator,
    assertion
  ) {
    const client = new MailosaurClient(apiKey);
    return await client.messages
      .get(serverID, {
        sentTo: emailTo,
      })
      .then((message) => {
        const dom = new JSDOM(message.html.body);
        const el = dom.window.document.querySelector(locator);
        const anyText = el.textContent;
        const anyText1 = anyText.replace(/[^A-Z0-9]/gi, " ").trim();
        expect(anyText1).to.contains(assertion);
      });
  }
}
export default new MailHelper();
