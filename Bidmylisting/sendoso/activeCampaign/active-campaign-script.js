console.log("Sendoso Debug:--------> Channel = Active Campaign(script)");

var config = {
  attributes: true, childList: true, subtree: true, characterData: true
}

$(document).ready(() => {
  var acWidget = new ActiveCampaignWidget('active-campaign');
  var observer = new MutationObserver(function () {
    
    try {
      chrome.runtime.sendMessage({ action: 'canShowWidget', integrations: { activeCampaign: true } }, (options) => {
        if(options.activeCampaign){
          if (((/https:\/\/[^]+.activehosted.com\/app\/(contacts|deals)\/[0-9]+$/).test(window.location))) {
            acWidget.initialize();
          } else {
            acWidget.manuallyRemoveIframeAndWidget();
          }
        }
      });
    } catch (e) {
      observer.disconnect()
    }
  })
  observer.observe(document.body, config)
})
