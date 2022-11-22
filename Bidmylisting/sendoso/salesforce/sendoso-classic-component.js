/**
 * This contains code for new AppExchange component integration with Sendoso Chrome extension
 *
 * @file   This files defines the SendosoClassicComponent class.
 * @author Jaffar Hussain
 * @since  2019.09.02
 */

class SendosoClassicComponent extends SendosoComponent{
  buttonSelector = SendosoConfig.classicButtonSelector

  retrieveData(sendosoButton){
    if(typeof(social) != "undefined" && typeof(social.socialStateInfo) !="undefined"){
      var entityId = social.socialStateInfo.parentId
      var entityType = social.socialStateInfo.entityType
    }else{
      if(isConsolePage()){
        var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
        var entityId = $(iframe).contents().find('.topics.init').attr('data-entityid');
      }else{
        var entityId = getSalesforceUserIdViaWindow();
      }
      var entityType = getPageName()
    }
    return {
      id: entityId,
      type: entityType
    }
  }
}
