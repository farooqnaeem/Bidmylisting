/**
 * This file contains configuration values
 *
 * @file   This files defines the SendosoConfig class.
 * @author Jaffar Hussain, Osama Inayat
 * @since  2019.09.02
 */
class SendosoConfig {
  static hostUrl = 'https://staging.sendoso.com/'
  static lighteningButtonSelector = "button.sendoso-button"
  static classicButtonSelector = "[name=sendoso_app__sendoso_chrome_button]"
  static sfdcPageList = ["Lead", "Contact", "Person Account", "Business Account", "Account"]
  static inboxSDKApplicationId = window.btoa("sdk_SendosoApp_c79dfb8740");
  static gmailIntegrationPostMessage = "sendoso_gmail_integration";
  static iconURL = 'https://cdn.sendoso.com/assets/plugin_icon.png';
  static sendosoLoadingGifUrl = 'https://cdn.sendoso.com/assets/sendoso_landing_logo.gif';
  static domConfigsForObserver = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
  };
  static ignoreErrors = ["ResizeObserver loop limit exceeded"]
}
