class SendosoIframe {
  reloadEverytime = false
/**
 * Todo:
 * We need to assign this._channel = channel not route 
 */
  constructor(route = "plugin/amazon_magic", channel = 'plugin') {
    this._host = SendosoConfig.hostUrl
    this._url = `${this.host}${route}`
    this._channel = `${route}`
    this._siteUrl = encodeURIComponent(window.location.href)
  }

  static encodeURIComponentWithSpecialCharacters(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape)
  }

  // ================ Setters ================
  set host(value) {
    this._host = value
  }

  set url(value) {
    this._url = value
  }

  set channel(value) {
    this._channel = value
  }

  set siteUrl(value) {
    this._siteUrl = value
  }

  get host() {
    return this._host
  }

  get url() {
    return this._url
  }

  get channel() {
    return this._channel
  }

  get siteUrl() {
    return this._siteUrl
  }

  get src() {
    return this.url + "?" + decodeURIComponent($.param(this.queryParams))
  }

  get queryParams() {
    return {
      tabId: this.tabId,
      channel: this.channel,
      siteUrl: this.siteUrl
    }
  }

}
