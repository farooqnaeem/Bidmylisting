var host = SendosoConfig.hostUrl;
var url = host + 'plugin/touches';
var channel = 'salesforce';
var page_array = SendosoConfig.sfdcPageList;
var contact_array = page_array[1];
var salesforce_page = '';
var user_id = '';
var logo_link = "https://cdn.sendoso.com/assets/plugin_icon.png";
var salesforceHandler;
var child_tab_id = '';

function addSendosoButtonToSalesforceViaDOM(){
  if(sendosoButtonNotExist()){
    var node = salesforceHandler.sendosoButton();
    appendChildId(node)
    node.on("click", showHideIframe);
    if(isConsolePage()){
      var headerSection = $(".active.oneWorkspace .active.oneConsoleTab .slds-grid.forceActionsContainer");
      if(isSalesConsoleLauncher()){
        headerSection = $(".active.oneWorkspace .slds-grid.actionsContainer");
        if(node.is('visible'))
          node.insertBefore(headerSection);
      }else{
        headerSection.each(function(){
          $(this).prepend(node);
        });
      }
    }
    else if (isSalesPage() || isContentPage() || isServicePage() || isMarketingPage() || isCommunityPage()){
      var headerSection = $(".slds-col.slds-no-flex.slds-grid.slds-grid_vertical-align-center.actionsContainer");
      node.insertBefore(headerSection);
    }else{
      $('.active.oneContent .slds-col.slds-no-flex.slds-grid.slds-align-middle.actionsContainer').each(function(){
        $(this).prepend(node);
      });
    }
  }
}

function appendChildId(handler){
  if(isConsolePage()){
    var handlerId = handler.attr('id');
    if (typeof handlerId != 'undefined'){
      if (!(/\d/.test(handlerId))){
        $(handler).attr('id', handlerId+'-'+child_tab_id)
      }
    }
  }
}

function addSendosoSidebarButtonToSalesForceViaDOM(){
  if(sendosoSidebarButtonNotExist()){
    var sendosoBtn = salesforceHandler.sendosoSidebarButton();
    var sendosoSidebar = salesforceHandler.sendosoSidebar();
    appendChildId(sendosoBtn)
    appendChildId(sendosoSidebar)
    sendosoBtn.on("click", showIframe);
    sendosoSidebar.on("click", hideIframe);
    if(hasChildTabs()) {
      let domElementToInsert = $(".tabContent .active .oneConsoleTab");
      domElementToInsert.append(sendosoBtn);
      domElementToInsert.append(sendosoSidebar);
    } else if(isConsolePage()){
      var sideBarSection = $(".active.oneConsoleTab");
      sideBarSection.prepend(sendosoBtn);
      sideBarSection.prepend(sendosoSidebar);
    }
    else{
      $('.active.oneContent').prepend(sendosoBtn);
      $('.active.oneContent').prepend(sendosoSidebar);
    }
  }
}

function showIframe(){
  loadIframe(salesforceHandler.iframeSrc())
  if(isConsolePage()){
    $(".active.oneWorkspace #sendoso-extension-btn-"+child_tab_id).fadeOut();
    setTimeout(function(){
      $(".active.oneWorkspace #chrome-extension-iframe-"+child_tab_id).animate({right: "0px"}, 1000, 'linear');
    }, 170);
  }else{
    $(".active.oneContent .sendoso-extension-btn").fadeOut();
    setTimeout(function(){
      $(".active.oneContent #chrome-extension-iframe").animate({right: "0px"}, "slow");
    }, 170);
  }
}

function hideIframe(){
  if(isConsolePage()){
    $(".active.oneWorkspace #chrome-extension-iframe-"+child_tab_id).animate({right: "-440px"}, 1000, 'linear');
    setTimeout(function(){
      $(".active.oneWorkspace #sendoso-extension-btn-"+child_tab_id).fadeIn("slow");
    },400);
  }else{
    $(".active.oneContent #chrome-extension-iframe").animate({right: "-440px"}, 1000, 'linear');
    setTimeout(function(){
      $(".active.oneContent .sendoso-extension-btn").fadeIn("slow");
    },400);
  }
  resetIframe();
}

function loadIframe(url) {
  var iframe;
  if(isConsolePage()){
    iframe = $(".active.oneWorkspace #chrome-extension-iframe-"+child_tab_id+" iframe")
  }else{
    iframe = $(".windowViewMode-normal.oneContent.active.lafPageHost iframe#sendoso-sidebar-iframe")
  }
  $(iframe).attr('src',url)
}

function resetIframe() {
  var iframe;
  if(isConsolePage()){
    iframe = $(".active.oneWorkspace #chrome-extension-iframe-"+child_tab_id+" iframe")
  }else{
    iframe = $(".windowViewMode-normal.oneContent.active.lafPageHost iframe#sendoso-sidebar-iframe")
  }
  $(iframe).attr('src','about:blank')
}

function showHideIframe(){
  var iframeHidden = true;
  if(isConsolePage()){
    if ($(".active.oneWorkspace #chrome-extension-iframe-"+child_tab_id).css("right") != "-440px"){
      iframeHidden = false;
    }
  }else{
    sendoso_extension_btn = $('.active.oneContent .sendoso-extension-btn:visible');
    if(sendoso_extension_btn.length == 0){
      iframeHidden = false;
    }
  }
  if (iframeHidden){
    showIframe();
  }else{
    hideIframe();
  }
}

function initializeSalesforceHandlerService(){
  salesforceHandler = new SalesforceHandlerService(user_id, salesforce_page, true, isConsolePage());
  if(!hasChildTabs()) {
    child_tab_id = salesforceHandler.childTabId;
    if (typeof child_tab_id != "undefined"){
      child_tab_id = child_tab_id.split(":")[0];
    }
  }
}

function sendosoButtonNotExist(){
  if(isConsolePage()){
    return $(".active.oneWorkspace .active.oneConsoleTab .sendoso").length === 0;
  }else{
    return $('.active.oneContent .sendoso').length === 0;
  }
}

function sendosoSidebarButtonNotExist(){
  if(hasChildTabs()) {
    return $(`#sendoso-extension-btn-${getIdForChildTab()}`).length == 0;
  }
  else if(isConsolePage()){
    return $(".active.oneWorkspace .active.oneConsoleTab .sendoso-extension-btn").length == 0;
  } 
  else{
    return $(".active.oneContent .sendoso-extension-btn").length == 0;
  }
}

function openUserDetailsTab(){
  var mailing_address;
  if(isConsolePage()){
    mailing_address = $(".tabContent.active.oneConsoleTab .active.lafPageHost .tabs__content .forceDetailPanelDesktop").text();
    if(mailing_address.length == 0){
      detailsTab = $(".tabContent.active.oneConsoleTab .active .uiTabBar [title=Details]")[0];
      if(typeof detailsTab != 'undefined' && detailsTab.length != 0){
        detailsTab.click();
      }
    }
  }else{
    mailing_address = $(".active.oneContent .forceDetailPanelDesktop").text();
    if(mailing_address.length == 0){
      detailsTab = $(".active.oneContent .uiTabItem").contents("[title=Details]")[0];
      if(typeof detailsTab != 'undefined' && detailsTab.length != 0){
        detailsTab.click();
      }
    }
  }
}

function setPageNameAndUserId() {
  try {
    salesforce_page = getPageName() || getPageNameFromUrl();
    user_id = window.location.hash.split('/')[2];
    if (typeof user_id == 'undefined') {
      user_id = window.location.pathname.split('/')[4];
    }
    if (typeof user_id == 'undefined') {
      user_id = $('ul.tabBarItems li.active .tabHeader.slds-context-bar__label-action').attr('href').split('/')[4];
    }
  } catch (e) {
    //console.log('Unable to get lead/contact info')
  }
}

function getPageName(){
  if(isConsolePage()){
    var pageName = $(".active.oneConsoleTabContainer .tabBar.slds-sub-tabs .active .slds-icon-text-default").attr('title');
    if(!validPage(pageName)){
      pageName = $(".active.oneConsoleTabItem .slds-icon-text-default").attr('title');
    }
    if(!validPage(pageName) && validPage(getPageNameFromUrl())) {
      pageName = getPageNameFromUrl()
    }
    return pageName;
  }else{
    return $(".oneContent.active.lafPageHost .slds-breadcrumb__item").text();
  }
}

function validPage(pageName){
  var url = (window.location.href).split("?")[0];
  return (typeof pageName !== 'undefined' && $.inArray(pageName, page_array) !== -1 && url.includes(pageName));
}

var salesforce_main = function(){
  var pageName = getPageName() || getPageNameFromUrl();
  if(validPage(pageName)){
    var componentManager = new SendosoComponentManager()
    if(componentManager.isIntegrated() && componentManager.isTabInfoLoaded()){
      console.info('Sendoso Component Found')
      componentManager.getComponent().initializeSidebars()
      return;
    }
    openUserDetailsTab();
    addSendosoButtonAndSideBar();
    delete componentManager
  }
}

var addSendosoButtonAndSideBar = function(pageName){
  setTimeout(function(){
    chrome.runtime.sendMessage({ action: 'canShowWidget', integrations: { salesforce: true } }, ({ salesforce }) => {
      if(salesforce) {
        setPageNameAndUserId();
        if(validPage(salesforce_page)){
          initializeSalesforceHandlerService();
          addSendosoButtonToSalesforceViaDOM();
          addSendosoSidebarButtonToSalesForceViaDOM();
        }
      }
    })
  }, 150);
}
function getPageNameFromUrl(){
  var pageName;
  var url = window.location.href.toLowerCase();
  var pageNames = page_array.filter(function (page) {
    return url.indexOf(`/${page.toLowerCase()}/`) !== -1;
  });
  if(pageNames.length){
    pageName = pageNames[0]
  }
  return pageName;
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.message == 'tab_changed') {
      removeExistingButtons();
      child_tab_id = getIdForChildTab();
      salesforce_main();
  } else if(request.action == 'addContainer' && typeof request.data != 'undefined' && request.data.view == 'view'){
    var container = new SendosoSidebarContainer()
		container.addToDom(request.data)
		delete container
		if($(`[data-sfdc-path='${window.location.pathname}']`).length){
			addSendosoButtonAndSideBar()
		}
	} else {
		$('#sendoso-extension-btn,#chrome-extension-iframe').remove()
	}
})

function hasChildTabs() {
  const mainWindow = document.querySelector('[role="main"]')
  if(mainWindow && mainWindow.hasChildNodes()) {  
    let childNodes = mainWindow.childNodes;
    if (!childNodes || childNodes.length == 0) return false
    
    for (let index = 0; index < childNodes.length; index++) {
      const element = childNodes[index];
      if (element.nodeName != 'SECTION') {
        return false;
      }
    }
    return true;
  }
  return false;
}

function getIdForChildTab() {
  const childTabId = $('.tabContent .active .oneConsoleTab').attr('id')
  if(!!childTabId) {
    return childTabId.split(":")[0]
  }
  return null; 
}

function removeExistingButtons() {
  $(`.sendoso-extension-btn-with-iframe`).remove();
  $(`.sendoso-extension-btn`).remove();
  $(`.sendoso-spinner`).remove();
  $(`#sendoso-extension-btn-${getIdForChildTab()}`).remove();
  $(`#chrome-extension-iframe-${getIdForChildTab()}`).remove();
}

// Mutation Observer
var callback = function(mutationsList) {
  const idForChildTab = getIdForChildTab();
  if (hasChildTabs() && !!idForChildTab) {
    child_tab_id = idForChildTab;
  }
  salesforce_main();
};

var targetNode = document.body;
var observerConfig = {
  attributes: true,
  childList: true
};

var observer = new MutationObserver(callback);
observer.observe(targetNode, observerConfig);
