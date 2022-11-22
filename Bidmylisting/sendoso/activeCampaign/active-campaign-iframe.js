class ActiveCampaignIframe extends SendosoIframe {
  reloadEverytime = false

  get channel() {
    return "ActiveCampaign";
  }
  get queryParams() {
    var params = super.queryParams
    var acParams = {
      activeWindow: this.activeWindow(),
      ...this.contactAndDealHash()
    }

    $.extend(params, acParams);
    return params;
  }

  activeWindow() {
    return this.isContactsWindow() ? "Contacts" : "Deals";
  }

  isContactsWindow() {
    return this.matchLocationName('contacts')
  }

  isDealsWindow() {
    return this.matchLocationName('deals');
  }

  matchLocationName(tabName) {
    return window.location.pathname.includes(tabName);
  }

  activeWindowId() {
    return window.location.pathname.split('/')[3];
  }

  contactAndDealHash() {
    if (this.isDealsWindow()) {
      return {
        contactId: Number(this.extractContactId()),
        dealId: Number(this.activeWindowId())
      }
    }
    return {
      contactId: Number(this.activeWindowId())
    }
  }

  extractContactId() {
    try {
      const contactUrl = new URL(this.extractContactIdUsingXpath()).pathname;
      if (this.isUrlPatternMatches(contactUrl)) {
        //contact url will be in format /app/contacts/4 
        //so if pattern matches we are returning the id 
        return contactUrl.split('/')[3];
      }
      console.log("Active Campign Contact Id Not Found");
      return "";
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  isUrlPatternMatches(url) {
    return url.match(/\/app\/contacts\/[0-9]+/gm);
  }

  extractContactIdUsingXpath() {
    return document.evaluate(
      "//*[@id='contact-items']/div[1]/div[1]/div[1]/div[2]/div[1]/a",
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.href
  }

}
