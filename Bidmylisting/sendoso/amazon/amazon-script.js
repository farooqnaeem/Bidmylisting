chrome.runtime.sendMessage({ action: "tabInfo" }, function (tabInfo) {
  var att = document.createAttribute("tab_id")
  att.value = tabInfo.id
  document.body.setAttributeNode(att)
  var targetNode = document.body
  var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
  }
  $(document).ready(function(){
    amazonWidget = new SendosoAmazonWidget('amazon')
    var observer = new MutationObserver(function () {
      try {
        amazonWidget.initialize()
      } catch (e) {
        observer.disconnect()
      }
    })
    observer.observe(targetNode, config)
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action == 'addContainer') {
        amazonWidget.initialize()
      }
    })
  });
})
