class OutreachIframe extends SendosoIframe {
  // ================ Setters ================
  set url(value) {
    this._url = value;
  }
  set channel(value) {
    this._channel = value;
  }
  set name(value) {
    this._name = value;
  }
  set companyName(value) {
    this._companyName = value;
  }
  set email(value) {
    this._email = value;
  }
  set address1(value) {
    this._address1 = value;
  }
  set address2(value) {
    this._address2 = value;
  }
  set city(value) {
    this._city = value;
  }
  set state(value) {
    this._state = value;
  }
  set country(value) {
    this._country = value;
  }
  set zip(value) {
    this._zip = value;
  }

  // ================ Getters ================
  get host() {
    return this._host;
  }
  get url() {
    return this._url;
  }
  get channel() {
    return this._channel;
  }
  get name() {
    return this._name;
  }
  get companyName() {
    return this._companyName;
  }
  get email() {
    return this._email;
  }
  get address1() {
    return this._address1;
  }
  get address2() {
    return this._address2;
  }
  get city() {
    return this._city;
  }
  get state() {
    return this._state;
  }
  get country() {
    return this._country;
  }
  get zip() {
    return this._zip;
  }

  get site_url() {
    return this._site_url;
  }

  get channel() {
    return "outreach";
  }

  get mailingAddress() {
    let address = "";
    address = address.concat(this.address1 || "");
    address = address.concat(",");
    address = address.concat(this.address2 || "");
    address = address.concat(",");
    address = address.concat(this.city || "");
    address = address.concat(",");
    address = address.concat(this.state || "");
    address = address.concat(",");
    address = address.concat(this.country || "");
    address = address.concat(",");
    address = address.concat(this.zip || "");
    return address;
  }

  get prospectId() {
    var url = window.location.pathname.split("/");
    var index = url.indexOf("prospects");
    return parseInt(url[index + 1]);
  }

  get prospect() {
    console.log("Sendoso Debug:--------> Channel = Outreach(prospect)");
    const propspectInfoUrl = `/api/prospects/${this.prospectId}`;
    console.log("Logging Prospect ID:", this.prospectId);
    let prospectInfo;
    $.ajax({
      url: propspectInfoUrl,
      method: "GET",
      async: false,
      success: function (result) {
        console.log(
          "Sendoso Debug:--------> Channel = Outreach(prospect result)"
        );
        prospectInfo = result;
      },
    });
    if (
      typeof prospectInfo != "undefined" &&
      typeof prospectInfo.prospect == "object"
    ) {
      return prospectInfo.prospect;
    }
    return "";
  }

  get tabId() {
    var tab = $("body").attr("tab_id");
    if (typeof tab == "undefined") {
      return "";
    } else {
      return tab;
    }
  }

  get queryParams() {
    var params = super.queryParams;
    this.setAllprospectValues();

    $.extend(params, {
      name: this.name,
      email: this.email,
      company_name: this.companyName,
      mailing_address: this.mailingAddress,
      site_url: this.siteUrl,
      tab_id: this.tabId,
    });
    return params;
  }

  // ================ Instance Methods/Functions ================
  setAllprospectValues() {
    console.log(
      "Sendoso Debug:--------> Channel = Outreach(setAllprospectValues)"
    );
    let prospectInfo = this.prospect;
    this._name = prospectInfo.first_name + " " + prospectInfo.last_name;
    this._companyName = prospectInfo.company;
    this._email = prospectInfo.email;
    this._address1 = prospectInfo.address_street;
    this._address2 = prospectInfo.address_street2;
    this._city = prospectInfo.address_city;
    this._state = prospectInfo.address_state;
    this._country = prospectInfo.address_country;
    this._zip = prospectInfo.address_zip;
  }
}
