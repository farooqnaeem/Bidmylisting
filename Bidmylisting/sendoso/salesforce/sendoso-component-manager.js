/**
 * This contains code for new AppExchange component integration with Sendoso Chrome extension
 *
 * @file   This files defines the SendosoComponentManager class.
 * @author Jaffar Hussain
 * @since  2019.09.02
 */

class SendosoComponentManager {
  getComponent() {
    if (this.isClassic()) {
      return new SendosoClassicComponent()
    } else if (this.isLightening()) {
      return new SendosoLighteningComponent
    } else {
      throw 'isIntegrated must be called before invoking getComponent'
    }
  }

  isIntegrated() {
    return (this.isClassic() || this.isLightening())
  }

  isClassic() {
    return ($(SendosoConfig.classicButtonSelector).length > 0 && $(SendosoConfig.classicButtonSelector).is(":visible"))
  }

  isLightening() {
    return ($(SendosoConfig.lighteningButtonSelector).length > 0 && $(SendosoConfig.lighteningButtonSelector).is(":visible"))
  }

  isTabInfoLoaded() {
    return typeof $("body").attr("tab_id") != "undefined" && typeof $("body").attr("access_token") != "undefined"
  }
}
