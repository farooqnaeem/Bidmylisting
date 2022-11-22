class SendosoSidebarContainer {
  idPrefix = 'sendoso-extension-container'
  cssClassName = 'sendoso-extension-container'
  
  addToDom(data) {
    this.id = `${this.idPrefix}-${data.id}`
    if ($(`#${this.id}`).length == 0) {
      $('body').prepend(`<div id="${this.id}" data-sfdc-path="${data.path}"></div>`)
      //set data attributes
      $(`#${this.id}`).data('sfdc',data)
    }
  }

  getId(){
    return this.id
  }

}
