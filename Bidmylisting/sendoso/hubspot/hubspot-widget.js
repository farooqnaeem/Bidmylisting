class HubspotWidget extends SendosoWidget {

  hubspotIframe;
  
  // overriding initialize method so that we can load the data for the iframe
  initialize() {
    if (!document.getElementById(this.id)) {
      console.log(`Sendoso Debug:--------> Channel = ${this.idWithoutPrefix}(Widget)`);
      this.hubspotIframe = new HubspotIframe("plugin/touches", "hubspot")
      this.addWidget(false);
      this.addListeners();
    }
  }
  
  loadIframe() {
    this.loadSendosoIframe(this.hubspotIframe);
  }
}
