class SalesloftIframe extends SendosoIframe {
  reloadEverytime = false;

  get channel() {
    return "salesloft";
  }
  get queryParams() {
    var params = super.queryParams;
    var slParams = {
      tab_id: this.tabId(),
      site_url: this.siteUrl,
      person_id: this.personId(),
    };

    $.extend(params, slParams);
    return params;
  }

  tabId() {
    const tab = $("body").attr("tab_id");
    if (typeof tab == "undefined") {
      return "";
    } 
    return tab;
  }

  personId() {
    let url =  window.location.href.split('/');
    return url[url.length-1];
  }
}
