class HubspotIframe extends SendosoIframe {

  contactInfoObject = {};
  
  get contactId() {
    return Number(window.location.href.split('/')[6]);    
  }

  get queryParams() {
    return {
      currentContactId: this.contactId,
      site_url: this.siteUrl,
      tab_id: this.tabId,
      channel: "hubspot",
      siteUrl: this.siteUrl,
      external_user_id: this.contactId,
      email: this.contactInfoObject.email ,
      company_name: this.contactInfoObject.company,
      name: this.encodeURIComponentWithSpecialCharacters(`${this.contactInfoObject.firstname} ${this.contactInfoObject.lastname}`),
      mailing_address: this.encodeURIComponentWithSpecialCharacters(this.mailingAdddress),
    }
  }

  get mailingAdddress() {
    return [this.contactInfoObject.address, this.contactInfoObject.city, this.contactInfoObject.state, this.contactInfoObject.country, this.contactInfoObject.zip];
  }

  encodeURIComponentWithSpecialCharacters(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);
  }
}
