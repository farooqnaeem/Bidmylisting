var custom_stylesheet_link;
var amazon_tab_id;
let activeTabId, lastUrl, lastTitle;

function chromeAppVersion() {
  return chrome.app.getDetails().version;
}

chrome.runtime.onUpdateAvailable.addListener(function (details) {
  chrome.runtime.reload()
});

function onUpdate() {
  chrome.runtime.reload()
}

function isFromAmazonToSalesforce(tabUrl) {
  var url = tabUrl.split("?");
  var isFromAmazon = false;
  if (typeof url[1] != "undefined") {
    params_array = url[1].split("=");
    for (var i = 0; i < params_array.length / 2;) {
      if (params_array[i] == "amazon_tab_id") {
        amazon_tab_id = params_array[i + 1].replace("&", "");
        isFromAmazon = true;
        break;
      }
      i = i + 2;
    }
  }
  return isFromAmazon;
}

function isSalesforceHomeTab(tabUrl) {
  return /(https:\/\/[^]+.salesforce.com\/[^]+)/.test(tabUrl);
}

function isSalesforceLoginTab(tabUrl) {
  return /(https:\/\/login.salesforce.com\/)/.test(tabUrl);
}

function isSalesforceTab(tabUrl) {
  var result = false;
  if (!isSalesforceLoginTab(tabUrl)) {
    result = /(https:\/\/[^]+.salesforce.com\/[^]+)/.test(tabUrl);
    if (result) {
      var splittedUrl = tabUrl.split("/");
      if (splittedUrl.length == 5) {
        result = splittedUrl[splittedUrl.length - 2].length > 4;
      } else {
        result = splittedUrl.length == 4;
      }
    }
  }
  return result;
}

function isSalesforceLighteningReadyTab(tabUrl) {
  return /(https:\/\/[^]+.lightning.force.com\/[^]+\/view)/.test(tabUrl);
}

function isVisualForceTab(tabUrl) {
  return /(https:\/\/[^]+.visual.force.com\/[^]+)/.test(tabUrl);
}

function isAmazonTab(tabUrl) {
  return /(https:\/\/www.amazon.\/*)/.test(tabUrl);
}

chrome.tabs.onRemoved.addListener(function (tabId, info) {
  if (typeof localStorage[tabId] != "undefined") {
    localStorage.removeItem(tabId);
  }
});

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function(tab) {
    if((lastUrl != tab.url || lastTitle != tab.title)) {
      lastUrl = tab.url;
      lastTitle = tab.title;
      chrome.tabs.sendMessage(tab.id, {
        message: 'tab_changed',
        url: tab.url
      })
    }
  });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  getTabInfo(activeTabId = activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
  try {
    var tabUrl = tab.url;
    var salesforce, amazon;

    if (info.url) {
      chrome.tabs.sendMessage(tab.id, {
        message: 'tab_changed',
        url: tab.url
      })
    }

    function addSendosoButtonsToAmazon() {
      chrome.tabs.executeScript(tabId, { code: "var tabId = " + tabId + ";" },
        function () {
          // chrome.tabs.executeScript(tabId, {file: "amazon/amazon-script.js"});
          // chrome.tabs.insertCSS(tabId, {file: "css/style.css"});
        });
    }

    function executeScriptFiles() {
      chrome.tabs.executeScript(tab.id, { file: "js/reload_script.js" });
      if (isAmazonTab(tabUrl) && amazon === true) {
        addSendosoButtonsToAmazon();
      }
    }

    if (info.status === "complete") {
      if ( isSalesforceTab(tabUrl) || isSalesforceLighteningReadyTab(tabUrl) || isVisualForceTab(tabUrl) || isAmazonTab(tabUrl) ) {
        localStorage[tab.id] = tabUrl;
        chrome.storage.sync.get({
          salesforce: true,
          amazon: true
        }, function (items) {
          salesforce = items.salesforce;
          amazon = items.amazon;
          executeScriptFiles();
        });
      }
      chrome.tabs.sendMessage(tab.id, { action: 'addContainer', data: getObjectInfoFromUrl(tab.url) })
    }
  } catch (e) {
    window.location.href += "?url=" + tabUrl + "&chrome_app_version=" + chromeAppVersion();
    Bugsnag.notifyException(e);
  }
});

var popup_url = chrome.extension.getURL("index.html");
chrome.browserAction.onClicked.addListener(function (tab) {
  tab_id = "tab_id_" + Math.floor(Math.random() * 234234455)
  chrome.windows.create({ "url": popup_url + "?tab_id=" + tab_id, focused: true, type: 'popup', width: 460, height: 520, top: 90, left: 900 }, function (win) {});
});

function getVersion() {
  var details = chrome.app.getDetails();
  return details.version;
}

var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
  if (typeof prevVersion != 'undefined') {
    onUpdate();
  }
  localStorage['version'] = currVersion;
}

"use strict";
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'tabInfo') {
    sendResponse(sender.tab);
    return true; // Tell Chrome that we want to call sendResponse asynchronously.
  }
  if (request.action === 'sfdcInfo') {
    sfdcInfo(request, sender, sendResponse)
    return true; // Tell Chrome that we want to call sendResponse asynchronously.
  }
  if(request.action === 'canShowWidget'){
    chrome.storage.sync.get(request.integrations, function (items) {
      sendResponse(items);
    });
    return true;
  }
  return false;
});

function sfdcInfo(request, sender, sendResponse) {
  var info = {};
  info.tab = sender.tab;
  sendResponse(info);
}

function getObjectInfoFromUrl(url) {
  var info
  try {
    if (url != undefined) {
      var path = (new URL(url)).pathname
      var path_array = path.split('/')
      path_array.filter(function (page) {
        if (SendosoConfig.sfdcPageList.includes(page)) {
          objectIndex = parseInt(Object.keys(path_array).find(key => path_array[key] === page))
          objectId = path_array[objectIndex + 1]
          objectView = path_array[objectIndex + 2]
          info = { name: page, id: objectId, view: objectView, path: path }
        }
      });
    }
  } catch (e) {
    console.log('Unable to extract info from url')
  }
  return info
}
