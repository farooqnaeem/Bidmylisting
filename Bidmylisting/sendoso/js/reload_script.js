var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  if(e.data === 'reload'){
    window.location.reload();
  }
  if(e.data == 'close_salesloft_window'){
    let tagName = document.getElementsByTagName('integration-step-pane')[0];
    if (tagName !== undefined) {
      let className = tagName.getElementsByClassName('composability-panes--header')[0];
      if (className !== undefined) {
        className.getElementsByClassName('sl-icon-close')[0].click();
      }
    }
  }
},false);
