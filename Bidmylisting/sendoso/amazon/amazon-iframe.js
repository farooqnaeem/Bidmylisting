class AmazonIframe extends SendosoIframe {
  reloadEverytime = false
  get queryParams() {
    var params = super.queryParams
    var amazonParams = {
      isSendBuy: true,
      amazonProductId: this.productId,
      quantity: this.quantity,
      productName: this.productName,
      productPrice: this.productPrice,
      isAddOn: this.isAddOn,
      isUnavailable: this.isUnavailable,
      isInvalidVarient: this.isInvalidVarient,
      isPrime: this.isPrime,
      stocksInfo: this.stocksInfo,
      isPrintOnDemand: this.isPrintOnDemand,
      productImgSrc: this.productImgSrc,
      notAbleToSend: this.notAbleToSend,
      isDigital: this.isDigital
    }
    $.extend(params, amazonParams);

    return params;
  }

  get productId() {
    return $("#ASIN").val() || $(".swatchSelect").data('defaultasin');
  }

  get quantity() {
    var price =  $("#quantity").val() || 1;
    return parseInt(price);
  }

  get productName() {
    var prodTitle = $("#productTitle").text().trim();
    if(prodTitle.length == 0){
      prodTitle = $("#ebooksProductTitle").text().trim();
    }
    return AmazonIframe.encodeURIComponentWithSpecialCharacters(prodTitle);
  }

  get productPrice() {
    var priceComponents = this.productPriceComponents;
    var price = 0;

    for (var index = 0; index < priceComponents.length; index++) {
      price = $(priceComponents[index]).text().trim();
      if (price.length != 0 ) {
        return price.replace(/\D/, '');
      }
    }

    return price.replace(/\D/, '');
  }

  get isAddOn() {
    var addon = $('.addOnItem-header > div > span') || $('#addOnItem_feature_div > div').find('#burjActionPanelAddOnBadge');
    return addon.length ? true : false;
  }

  get isUnavailable() {
    return $('#buybox-see-all-buying-choices > span > #buybox-see-all-buying-choices-announce').length ? true : false;
  }

  get isPrime() {
    return $("#pantryBadge").length ? true : false;
  }

  get isInvalidVarient() {
    return $('#native_dropdown_selected_size_name :selected').val() == "-1";
  }

  get stocksInfo() {
    return $("#availability").find("span").text().trim() || $("#outOfStock").find('span').html() || $("span#availability").text().trim();
  }

  get isPrintOnDemand() {
    return $("#desktop_qualifiedBuyBox").text().toLowerCase().includes('printed on demand');
  }

  get productImgSrc(){
    var imgComponents = this.productImgComponents;
    var imgSrc = '';
    for (var index = 0; index < imgComponents.length; index++) {
      imgSrc = $(imgComponents[index]).last();
      if (imgSrc.length != 0 ) {
        return imgSrc.attr('src');
      }
    }

    return '';
  }

  get productPriceComponents(){
    var priceBlockLargeAmount = "#priceblock_ourprice span.price-large";
    var priceBlockOurPrice = "#priceblock_ourprice";
    var priceBlockDealPrice = "#priceblock_dealprice";
    var priceBlockSalesPrice = "#priceblock_saleprice";
    var coloredPrice = ".a-button-selected span.a-color-price";
    var priceInsideBuyBox = "#priceInsideBuyBox_feature_div span#price_inside_buybox";
    var priceInApexSpan = ".apexPriceToPay .a-offscreen";
    var priceASpan = ".a-text-price .a-offscreen";
    var priceInDivSpan = "#tp_price_block_total_price_ww span.a-offscreen"


    var priceComponents = [ priceBlockLargeAmount, priceBlockOurPrice, priceBlockDealPrice, priceBlockSalesPrice, coloredPrice, priceInsideBuyBox, priceInApexSpan, priceASpan, priceInDivSpan];

    return priceComponents;
  }

  get productImgComponents(){
    var mainImg = ".imgTagWrapper img.a-dynamic-image";
    var swatchImg = ".a-list-item .a-button-selected img.imgSwatch, .a-list-item .a-button-selected img";
    var frontImage = ".maintain-height img.frontImage";
    var mainImageContainer = "div#main-image-container div#img-wrapper div#img-canvas img.frontImage"

    var imgComponents = [ mainImg, swatchImg, frontImage, mainImageContainer ];

    return imgComponents;
  }

  get notAbleToSend(){
    const giftCardAmountPicker = document.getElementById("gc-amount-picker");
    if( giftCardAmountPicker ) return true;

    return !this.productPrice;
  }

  get isDigital() {
    const oneClickBtn = document.getElementById("one-click-button");
    const butWithCashBtn = document.getElementById("buy_with_cash_button-announce");
    return oneClickBtn || butWithCashBtn ? true : false;
  }
}
