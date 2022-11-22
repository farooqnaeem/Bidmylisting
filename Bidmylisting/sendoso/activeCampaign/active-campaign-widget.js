class ActiveCampaignWidget extends SendosoWidget {

  initialize() {
    if (!document.getElementById(this.id)) {
      console.log("Sendoso Debug:--------> Channel = Active Campaign(Widget)");
      this.addWidget(false);
      this.addListeners();
    }
  }

  loadIframe() {
    this.loadSendosoIframe(
      new ActiveCampaignIframe("plugin/active_campaign", "active compaign")
    );
  }
}
