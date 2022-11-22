InboxSDK.load(2, window.atob(SendosoConfig.inboxSDKApplicationId)).then(function (sdk) {
  baseDomain = new URL(SendosoConfig.hostUrl).origin
  var tabId = ''
  var modalView = ''
  var sendosoRecipientEmail = ''
  let name = ''

  let getIframeSrc = () => {
    return `${baseDomain}/plugin/gmail?channel=Gmail&email=${sendosoRecipientEmail}&tab_id=${tabId}&name=${name}`
  }

  let initModalViewAndAddListener = () => {
    modalView = sdk.Widgets.showModalView({
      el: `<div id='sendoso-spinner' style='width:440px; height:680px;'>
              <img src='${SendosoConfig.sendosoLoadingGifUrl}' style='position: relative; top: 40%; left: 40%' />
            </div>
            <iframe style="display: none;" src='' data-src-url='${getIframeSrc()}' src="" width="440" height="680" frameborder="0" id="gmail_iframe" allowfullscreen></iframe>`,
      title: 'Sendoso'
    });
  }

  let iframeAndSpinnerHandler = () => {
    $("#gmail_iframe").off('load').on('load', function () {
      if ($("#gmail_iframe").attr('src') != '') {
        $(this).show();
        $('#sendoso-spinner').hide();
      }
    })
    if ($("#gmail_iframe").attr('src') == '') {
      $("#gmail_iframe").attr('src', $("#gmail_iframe").data("src-url"))
    }
  }

  sdk.Compose.registerComposeViewHandler(function (composeView) {
    composeView.on('recipientsChanged', function (e) {
      recipients = composeView.getToRecipients();
      if (recipients.length > 0) {
        sendosoRecipientEmail = recipients[0]['emailAddress']
        name = recipients[0]['name']
      }
      else
        sendosoRecipientEmail = ''
    });

    composeView.addButton({
      title: "Sendoso",
      iconUrl: SendosoConfig.iconURL,
      onClick: function (event) {
        tabId = composeView.getThreadID();

        initModalViewAndAddListener();
        iframeAndSpinnerHandler();
        window.onmessage = function (e) {
          if (e.data && e.data.integrationType == SendosoConfig.gmailIntegrationPostMessage && e.origin == baseDomain) {
            event.composeView.insertHTMLIntoBodyAtCursor(e.data.sendosoGiftLink);
            modalView.close();
          }
        }
      },
    });
  });
});
