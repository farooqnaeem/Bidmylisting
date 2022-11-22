class SalesloftWidget extends SendosoWidget {

  loadIframe() {
    this.loadSendosoIframe(
      new SalesloftIframe("plugin/touches", "salesloft")
    );
  }
}
