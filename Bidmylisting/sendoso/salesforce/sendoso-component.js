/**
 * This contains code for new AppExchange component integration with Sendoso Chrome extension
 *
 * @file   This files defines the SendosoComponent class.
 * @author Jaffar Hussain
 * @since  2019.09.02
 */

class SendosoComponent {

  iframeContainerSelector = "#sendoso-sidebar-iframe"
  buttonSelector = SendosoConfig.lighteningButtonSelector
  containers = [] //will contain data like {button: ,handler: ,buttonSideBar: }

  initializeSidebars() {
    var that = this;
      var sendosoButtons = $(that.buttonSelector).filter(function( index ) {
        return $( this ).attr( "data-sendoso-configured" ) != '1';
      });
      if (sendosoButtons.length) {
        $(sendosoButtons).each(function (index, sendosoButton) {
          $(sendosoButton).attr('data-sendoso-configured','1')
          var record = that.retrieveData(sendosoButton)
          var objectID = record.id;
          var objectType = record.type;
          var iframeID = `${that.iframeContainerSelector}${objectID}`;
          var handler = that.initializeService(objectID, objectType)
          that.containers.push({
            record  : record,
            sendosoButton: sendosoButton,
            handler: handler,
            sideBar: handler.sendosoSidebar(objectID),
            sideBarButton: handler.sendosoSidebarButton(objectID),
            iframeID: iframeID
          })
        })
        this.addSideBarsHTML()
        this.registerEvents()
      }
  }

  addSideBarsHTML(){
    $(this.containers).each(function (index, container) {
      if ($(container.iframeID).length == 0) {
        $(container.sideBar).insertAfter(container.sendosoButton);
        $(container.sideBarButton).insertAfter(container.sendosoButton);
      }
    })
  }

  registerEvents(){
    var that = this
    $(this.containers).each(function (index, container) {
      $(container.sendosoButton).on("click", function () {
        that.toggleIframeContainer(container.record.id)
      });
      $(`#sendoso-extension-btn${container.record.id}`).on("click", function () {
        that.showIframeContainer(container.record.id)
      });
      container.sideBar.on("click", function () {
        that.hideIframeContainer(container.record.id)
      });
    })
  }

  initializeService(objectID, objectType) {
    return new SalesforceHandlerService(objectID, objectType, true, isConsolePage());
  }

  toggleIframeContainer(id = "") {
    if ($(`.sendoso-extension-btn${id}:visible`).length == 0) {
      this.hideIframeContainer(id);
    } else {
      this.showIframeContainer(id);
    }
  }

  showIframeContainer(id = "") {
    this.loadIframeContainer(id)
    $(`.sendoso-extension-btn${id}`).fadeOut();
    setTimeout(function () {
      $(`#chrome-extension-iframe${id}`).animate({ right: "0px" }, "slow");
    }, 170);
  }

  hideIframeContainer(id = "") {
    $(`#chrome-extension-iframe${id}`).animate({ right: "-440px" }, 1000, 'linear');
    setTimeout(function () {
      $(`.sendoso-extension-btn${id}`).fadeIn("slow");
    }, 400);
    this.resetIframeContainer(id);
  }

  loadIframeContainer(id = "") {
    var iframe = $(`iframe#sendoso-sidebar-iframe${id}`)
    $(iframe).attr('src', iframe.data("src-url"))
  }

  resetIframeContainer(id = "") {
    var iframe = $(`iframe#sendoso-sidebar-iframe${id}`)
    $(iframe).attr('src', 'about:blank')
  }

}
