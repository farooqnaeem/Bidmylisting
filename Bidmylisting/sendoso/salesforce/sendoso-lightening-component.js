/**
 * This contains code for new AppExchange component integration with Sendoso Chrome extension
 *
 * @file   This files defines the SendosoLighteningComponent class.
 * @author Jaffar Hussain
 * @since  2019.09.02
 */

class SendosoLighteningComponent extends SendosoComponent{

  buttonSelector = SendosoConfig.lighteningButtonSelector
  iframeContainerSelector = "#sendoso-sidebar-iframe"

  retrieveData(sendosoButton){
    var entityId = $(sendosoButton).attr("name");
    var entityType = $(sendosoButton).parent().find("lightning-badge.sendoso-event").attr("title").split("-")[0];
    return {
      id: entityId,
      type: entityType
    }
  }

}
