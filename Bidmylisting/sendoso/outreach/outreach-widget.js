class OutreachWidget extends SendosoWidget {
  loadIframe() {
    this.loadSendosoIframe(new OutreachIframe("plugin/touches", "outreach"));
  }
}
