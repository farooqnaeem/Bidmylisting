var host = SendosoConfig.hostUrl;
var url = host + 'plugin/touches';
var channel = 'salesforce';
var page_array = ["Lead", "Contact", "Person Account", "Business Account"];
var salesforce_page = '';
var user_id = '';
var logo_link = "https://cdn.sendoso.com/assets/plugin_icon.png";
var salesforceHandler = '';

function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof $ === 'undefined') ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

function isConsolePage(){
  return /console/.test(window.location.href);
}

function initializeSalesforceHandlerService(){
  salesforceHandler = new SalesforceHandlerService(user_id, salesforce_page, false, isConsolePage());
}

function encodeURIComponentWithSpecialCharacters(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

function getUserProfileHeaderRow(){
  var header = $('#topButtonRow');
  // INTE-180 Fix duplication of sendoso button for a client "Zocdoc"
  if(header.length == 0 && $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible").contents().find("#topButtonRow").length === 0) {
    header = $(".pbButton").first();
  }
  return header;
}

function addSendosoButtonToSalesforceViaDOM(){
  if(sendosoButtonNotExist()){
    var node = salesforceHandler.sendosoButton();
    node.on("click", showHideIframe);
    var headerRow = getUserProfileHeaderRow();
    if(headerRow.length == 0){
      findIframeAndAddSendosoButton(node);
    }else{
      headerRow.append(node);
    }
  }
}

function addSendosoSidebarButtonToSalesForceBasedOnPageType(sendosoBtn, sendosoSidebar = ''){
  if(isConsolePage()){
    var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
    var searchedSendosoBtn = $(iframe).contents().find(".sendoso-extension-btn");
    if(searchedSendosoBtn.length == 0){
      $(iframe).contents().find("body").prepend(sendosoBtn);
      $(iframe).contents().find("body").prepend(sendosoSidebar);
    }
  }else{
    $("body").prepend(sendosoBtn);
    $("body").prepend(sendosoSidebar);
  }
}

function addSendosoSidebarToSalesForceViaDOM(){
  if(sendosoSidebarButtonNotExist()){
    var sendosoBtn = salesforceHandler.sendosoSidebarButton();
    var sendosoSidebar = salesforceHandler.sendosoSidebar();
    sendosoBtn.on("click", showIframe);
    sendosoSidebar.on("click", hideIframe);
    addSendosoSidebarButtonToSalesForceBasedOnPageType(sendosoBtn, sendosoSidebar);
  }
}

function loadIframe(iframe, url) {
  $(iframe).attr('src',url)
}

function resetIframe(iframe) {
  $(iframe).attr('src','about:blank')
}

function showIframe(){
  var iframeInfo = Sendosoiframe() //[Sendosoiframe, SendosoiframeButton, SendosoiframeContainer]
  loadIframe(iframeInfo[0], salesforceHandler.iframeSrc())
  $(iframeInfo[1]).fadeOut();
  setTimeout(function(){
    $(iframeInfo[2]).animate({right: "0px"}, 1000, 'linear');
  }, 170);
}

function hideIframe(){
  var iframeInfo = Sendosoiframe() //[Sendosoiframe, SendosoiframeButton, SendosoiframeContainer]
  resetIframe(iframeInfo[0])
  $(iframeInfo[1]).fadeIn();
  setTimeout(function(){
    $(iframeInfo[2]).animate({right: "-440px"}, 1000, 'linear');
  }, 170);
}

function Sendosoiframe() {
  if(isConsolePage()){
    var iframes = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
    var SendosoiframeButton = $(iframes).contents().find(".sendoso-extension-btn");
    var SendosoiframeContainer = $(iframes).contents().find("#chrome-extension-iframe");
    var Sendosoiframe = $(iframes).contents().find("#chrome-extension-iframe iframe");
  }else{
    var SendosoiframeButton = $(".sendoso-extension-btn")
    var SendosoiframeContainer = $("#chrome-extension-iframe");
    var Sendosoiframe = $("#chrome-extension-iframe iframe");
  }
  return [Sendosoiframe, SendosoiframeButton, SendosoiframeContainer]
}
function findIframeAndAddSendosoButton(node){
  var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
  var seached_header_row = $(iframe).contents().find("#topButtonRow");
  if(seached_header_row.length != 0){
    seached_header_row.append(node);
  }
}

function showHideIframe(){
  if(isConsolePage()){
    var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
    sendoso_btn = $(iframe).contents().find(".sendoso-extension-btn:visible");
  }else{
    sendoso_btn = $(".sendoso-extension-btn:visible");
  }
  if(sendoso_btn.length == 0){
    hideIframe();
  }else{
    showIframe();
  }
}

function button_check(sender_id){
  var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
  var sender_info = "";
  sender_info = $(iframe).contents().find(sender_id);
  return sender_info.length;
}

function popupwindow(url, title, w, h) {
  wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  wTop = window.screenTop ? window.screenTop : window.screenY;
  var left = wLeft + (window.innerWidth / 2) - (w / 2);
  var top = wTop + (window.innerHeight / 2) - (h / 2);
  window.openPopupSalesforce = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  return window.openPopupSalesforce;
}

function closePopupWindowIfOpened(){
  if(typeof window.openPopupSalesforce !== 'undefined'){
    window.openPopupSalesforce.close();
  }
}

function sendosoButtonNotExist(){
  if(isConsolePage()){
    return button_check("[name=sendoso]") == 0;  
  }else{
    return $('input[name="sendoso"]').length === 0;
  }
}

function sendosoSidebarButtonNotExist(){
  if(isConsolePage()){
    var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
    sendoso_btn = $(iframe).contents().find(".sendoso-extension-btn");
    return sendoso_btn.length == 0;
  }else{
    return $(".sendoso-extension-btn").length == 0;
  }
}

function getSalesforceUserIdViaWindow(){
  url = new URL(window.location.href);
  user_id = url.searchParams.get("id");
  if(user_id != null){
    return user_id;
  }else{
    splittedUrl = window.location.href.split('?')[0];
    splittedUrl = splittedUrl.split('/');
    arraySize = splittedUrl.length;
    if(splittedUrl[arraySize-1].length > 3){
      return splittedUrl.pop();
    }else if(typeof splittedUrl[arraySize-2] != "undefined"){
      return splittedUrl[arraySize-2];
    }else{
      return "";
    }
  }
}

// INTE-180 Fix button visibility for a client "Zocdoc"
function getUserIdViaEditButton(iframe) {
  var navigationUrl = $(iframe).contents().find('#topButtonRow input[name="edit"]').attr('onclick');

  if(navigationUrl && navigationUrl.split('/').length > 1)
    return navigationUrl.split('/')[1]
}

function getPageName() {
  p_name = "";
  if(typeof social != "undefined"){
    p_name = social.socialStateInfo.entityType;
  }else if(isConsolePage()){
    var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
    p_name = $(iframe).contents().find('.mainTitle').text();
    p_name = p_name.replace(" Detail", "");
  }
  if(!page_array.includes(p_name)){
    p_name = document.getElementsByTagName("title")[0].text.split(':')[0];
  }
  return p_name;
}

var salesforce_main = function(){
  chrome.runtime.sendMessage({ action: 'canShowWidget', integrations: { salesforce: true } }, ({ salesforce }) => {
    if(salesforce){
      var page_name = getPageName();
      if($.inArray(page_name, page_array) !== -1){
        if(typeof page_name !== 'undefined'){
          salesforce_page = page_name;
          var componentManager = new SendosoComponentManager();
          if(componentManager.isIntegrated() && componentManager.isTabInfoLoaded()){
            console.info('Sendoso Component Found')
            componentManager.getComponent().initializeSidebars()
            return;
          }
          if(isConsolePage()){
            var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
            user_id = $(iframe).contents().find('.topics.init').attr('data-entityid') || getUserIdViaEditButton(iframe)
          }else{
            user_id = getSalesforceUserIdViaWindow();
          }
          if(user_id){
            initializeSalesforceHandlerService();
            addSendosoButtonToSalesforceViaDOM();
            addSendosoSidebarToSalesForceViaDOM();
          }
        }
      }
    }
  });
}

var refreshId1 = setInterval(function(){
  refresh(salesforce_main);
  if(!isConsolePage()){
    clearInterval(refreshId1);
  }
}, 50);
