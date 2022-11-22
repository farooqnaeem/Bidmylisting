class SendosoScript {
  static initialize(
    pagesRegex,
    widgetClass,
    widgetName,
    configs = SendosoConfig.domConfigsForObserver,
  ) {
    chrome.runtime.sendMessage({ action: "tabInfo" }, (tabInfo) => {
      chrome.runtime.sendMessage(
        { action: "canShowWidget", integrations: { [widgetName]: true } },
        (options) => {
          if (options[widgetName]) {
            console.log(`Sendoso Script ---> ${widgetName}(Debug)`);
            let att = document.createAttribute("tab_id");
            att.value = tabInfo.id;
            document.body.setAttributeNode(att);
            const widgetReference = widgetClass();
            const sendosoWidget = new widgetReference(widgetName);
            const observer = new MutationObserver(function () {
              try {
                if (pagesRegex.test(window.location)) {
                  sendosoWidget.initialize();
                } else {
                  sendosoWidget.manuallyRemoveIframeAndWidget();
                }
              } catch (e) {
                Bugsnag.notify(e);
                observer.disconnect();
              }
            });
            observer.observe(document.body, configs);
          }
        }
      );
    });
  }
}
