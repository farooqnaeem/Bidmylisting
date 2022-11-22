class SendosoAmazonWidget extends SendosoWidget {

  addButton() {
    var container = this.getButtonContainer();
    if (!$(`#${this.button}`).length && container != null && container.length) {
      container.before(this.buttonHtml);
      this.removeWidget();
      return true;
    } else {
      return false;
    }
  }

  loadIframe() {
    var that = this
    var appIframe = new AmazonIframe('plugin/amazon_magic', 'amazon')
    $(`#${this.iframe}`).attr('reload-everytime', appIframe.reloadEverytime)
    $(`#${this.iframe}`).attr('height', '100%')
    $(`#${this.iframe}`).attr('style', 'max-height:100%')
    $(`#${this.iframe}`).attr('src', appIframe.src)
    $(`#${this.iframe}`).on('load',function(){
      $(`#${that.iframe}`).show()
      $(`#${that.spinnerId}`).hide()
    })
    this.addAttribute('product-quantity', appIframe.quantity)
    $(`#${this.iframeContainer}`).addClass('iframe-loaded')
  }

  initialize() {
    if (this.addButton()) {
      this.initializeWidget()
    } else if (this.quantityChanged() == true) {
      this.removeWidget()
      this.initializeWidget()
    }
  }

  initializeWidget() {
    this.addWidget()
    this.addListeners()
  }
  quantityChanged() {
    try {
      var isChanged = false
      var newQuantity = parseInt($('#quantity').val())
      var oldQuanity = parseInt(this.getAttribute('product-quantity'))
      isChanged = (oldQuanity > 0 && newQuantity > 0 && newQuantity != oldQuanity)
    } catch (e) {
      //no need to log parseInt errors in this case
    }
    return isChanged
  }

  getButtonContainer() {
    var container = null;
    try {
      var addToCartUsedProductBtn = $(".a-button-stack #add-to-cart-button-ubb,.a-button-stack #add-to-cart-button").filter(":first");
      var addToCartWhiteBtn = $("#wishlistButtonStack");
      var ReadOnkindleBtn = $("#kcpApp_feature_div");
      var DesktopBuybox = $("#desktop_buybox").next();
      if (addToCartUsedProductBtn.is(':visible')) {
        container = addToCartUsedProductBtn.parent(".a-button-inner").parent();
      } else if (addToCartWhiteBtn.is(":visible")) {
        container = addToCartWhiteBtn;
      } else if (ReadOnkindleBtn.is(":visible")) {
        container = ReadOnkindleBtn;
      } else if (DesktopBuybox.is(":visible")) {
        container = DesktopBuybox;
      }
    } catch (e) {
      //do nothing just return
    }
    return container;
  }
}
