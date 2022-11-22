class SendosoWidget {
  prefix = 'sendoso-extension'
  widgetContainer = 'body'

  constructor(id = '', cssClass = '', type = 'widget') {
    this.id = id
    this.cssClass = cssClass
    this._type = type
    this.button = this.id
    this.icon = this.id
    this.iframeContainer = this.id
    this.iframe = this.id
  }

  // First Time Initialization
  initialize() {
    if (!document.getElementById(this.id)) {
      console.log(`Sendoso Debug:--------> Channel = ${this.idWithoutPrefix}(Widget)`);
      this.addWidget(false);
      this.addListeners();
    }
  }

  get id() {
    return this._id
  }

  get cssClass() {
    return this._cssClass
  }

  get type() {
    return this._type
  }

  get widgetHtml() {
    return $(`
    <div class='${this.idWithoutPrefix}-sidebar sendoso-spinner ${this.idWithoutPrefix}-menu' id='${this.id}'>
      ${this.iconHtml}
      ${this.iframeHtml}
    </div>
  `)
  }

  get iconHtml() {
    return `
      <div>
        <img id='${this.icon}' src='https://cdn.sendoso.com/assets/extension-button.svg' />
      </div>
    `
  }

  get iframeHtml() {
    return `
      <div class='${this.idWithoutPrefix}-content' id='${this.iframeContainer}'>
        ${this.spinnerHtml}
        <iframe reload-everytime ='false' width='456' height='680' frameborder='0' src='about:blank' id='${this.iframe}' class='sendoso-iframe' allowfullscreen ></iframe>
      </div>
    `
  }

  get spinnerHtml() {
    return `
      <div id='${this.spinnerId}' >
        <div class="loading-area">
          <div class="loading-image">
            <img src="https://cdn.sendoso.com/assets/amazon-loader.svg" alt="Loading">
          </div>
          <div class="loading-content">
            <h2>One Moment Please</h2>
            <p>Our wizards are doing some magic to fetch all the data</p>
            <img id="loading" src="https://cdn.sendoso.com/assets/amazon_landing_loader.svg" alt="">
          </div>
        </div>
      </div>
    `
  }

  get buttonHtml() {
    return $(`<button class = '${this.idWithoutPrefix}-button' id='${this.button}' type='button'>[Sendoso] Buy/Send via Amazon</button><br/>`)
  }

  get button() {
    return this._button
  }

  get iframe() {
    return this._iframe
  }

  get iframeContainer() {
    return this._iframeContainer
  }

  get spinnerId() {
    return `${this.id}-spinner-container`
  }

  get icon() {
    return this._icon
  }

  set button(id) {
    this._button = `${id}-button`
  }

  set icon(id) {
    this._icon = `${id}-icon`
  }

  set iframeContainer(id) {
    this._iframeContainer = `${id}-iframe-container`
  }

  set iframe(id) {
    this._iframe = `${id}-iframe`
  }

  set id(value) {
    this._id = `${this.prefix}-${value}`
  }

  set cssClass(value) {
    this._cssClass = `${this.prefix}-${value}`
  }

  set type(value) {
    this._type = `${this.prefix}-${value}`
  }

  get idWithoutPrefix() {
    return this.id.replace(`${this.prefix}-`, '')
  }

  addAttribute(name, value) {
    $(`#${this.id}`).attr(name, value)
  }

  getAttribute(name) {
    return $(`#${this.id}`).attr(name)
  }

  addCssClass(name) {
    $(`${this.id}`).addClass(name)
  }

  toggleCssClass(name) {
    $(`${this.id}`).toggleClass(name)
  }

  exists() {
    return $(`${this.id}`).length > 0
  }

  visible() {
    $(`${this.id}`).is(':visible') > 0
  }

  hide() {
    $(`${this.id}`).hide()
  }

  show() {
    $(`${this.id}`).show()
  }

  isIframeOpened() {
    return $(`#${this.id}-iframe-container`).hasClass("show");
  }

  toggleIframe() {
    let container = $(`#${this.iframeContainer}`);
    if (container.hasClass('iframe-loaded')) {
      if ($(`#${this.iframe}`).attr('reload-everytime') == 'true' && !container.hasClass('show')) {
        this.loadIframe();
      }
      container.toggleClass('show');
    } else {
      this.loadIframe();
      container.addClass('show');
    }
  }

  handleWidgetClick(e) {
    this.toggleIframe();
    if (this.isIframeOpened()) {
      $(`#${this.id}`).css({
        "top": "12px",
        "transition": "all 1s linear 0s"
      });
    } else {
        if(localStorage.getItem("sendosoWidgetTop")) {
          $(`#${this.id}`).css({
            "top": localStorage.getItem("sendosoWidgetTop"),
            "transition": "all 1s linear 0s"
          });
        }
      }
  }

  addButtonListener(buttonElement) {
    let that = this;
    buttonElement.onclick = handleButtonClick;

    function handleButtonClick() {
      that.toggleIframe();
    }
  }


  // Make Widget draggable
  dragElement(widgetElement) {
    let that = this;
    const threshold = 6;
    let startX;
    let startY;
    let positionX = 0;
    let positionY = 0;
    widgetElement.style.cursor = "pointer";
    widgetElement.onmousedown = dragMouseDown;
    if (localStorage.getItem("sendosoWidgetTop")) {
      widgetElement.style.top = localStorage.getItem("sendosoWidgetTop");
    };

    function dragMouseDown(e) {
      startX = e.pageX;
      startY = e.pageY;
      e.preventDefault();
      // get the mouse cursor position at startup:
      positionX = e.pageX - widgetElement.offsetLeft;
      positionY = e.pageY - widgetElement.offsetTop;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;

    }

    function elementDrag(e) {
      if (!that.isIframeOpened()) {
        widgetElement.style.transition = "";
        let xMax = window.innerWidth - widgetElement.offsetWidth;
        let yMax = window.innerHeight - widgetElement.offsetHeight;
        if ((e.pageX - positionX >= 0) && (e.pageX - positionX <= xMax)) {
          widgetElement.style.left = `${e.pageX - positionX}px`;
        }
        if ((e.pageY - positionY >= 0) && (e.pageY - positionY <= yMax)) {
          widgetElement.style.top = `${e.pageY - positionY}px`;
        }
        
        try {
          localStorage.setItem("sendosoWidgetTop", widgetElement.style.top);
        }
        catch(error) {
          if (error.name == "QuotaExceededError") {
            console.log("Sendoso Message:-------->Unable to update position of widget in localStorage because of QuotaExceededError");
          }
          else {
            Bugsnag.notify(e);
            console.log(error);
          }
        }
              
      }
    }

    function closeDragElement(e) {
      widgetElement.style.left = "";
      widgetElement.style.right = "0px";
      document.onmouseup = null;
      document.onmousemove = null;

      //Checking if user action is click or drag
      const diffX = Math.abs(e.pageX - startX);
      const diffY = Math.abs(e.pageY - startY);
      if (diffX < threshold && diffY < threshold) {
        that.handleWidgetClick();
      }
    }

  }

  addWidget(checkForButton = true) {
    if ((checkForButton && !this.exists()) || !checkForButton) {
      this.addWidgetScript();
    }
  }
  // only this class is allowed to use this method
  addWidgetScript() {
    $(`${this.widgetContainer}`).prepend(this.widgetHtml)
  }

  removeWidget() {
    $(`#${this.id}`).remove()
  }

  addListeners() {
    const widgetElement = $(`#${this.id}`)[0];
    const buttonElement = $(`#${this.button}`)[0];
    if (buttonElement){
     this.addButtonListener(buttonElement);
    }
    this.dragElement(widgetElement);
  }

  /**
   * To make things reuseable pass the object of
   * the type of integration you want to load iframe
   */
  loadSendosoIframe(integrationObject) {
    let ifram = $(`#${this.iframe}`);
    let appIframe = integrationObject;

    ifram.attr('reload-everytime', appIframe.reloadEverytime)
    ifram.attr('height', '100%')
    ifram.attr('style', 'max-height:100%')
    ifram.attr('src', appIframe.src)
    ifram.on('load', () => {
      $(`#${this.spinnerId}`).hide();
      ifram.show();
    });
    $(`#${this.iframeContainer}`).addClass('iframe-loaded');
  }

  /**
   * In case page is using history base routing
   * sometimes only few components of page are re-rendered
   * in that case your extension will show on all pages as it is
   * attached with the body so this method will make sure of removing
   * widget and its iframe from body
   */
  manuallyRemoveIframeAndWidget() {
    if ($(`#${this.id}`)) {
      // remove button from dom
      $(`#${this.id}`).remove();
      if ($(`#${this.iframeContainer}`)) {
        // remove iframe
        $(`#${this.iframeContainer}`).remove();
      }
    }
  }

}
