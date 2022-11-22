class SalesforceHandlerService{
	constructor(userId, userType = 'Lead', isLighteningReady = false, isConsole = false){
		this.userId = userId;
		this.userType = userType;
		this.isLighteningReady = isLighteningReady;
		this.isConsole = isConsole;
		this.channel = "salesforce";
		this.host = SendosoConfig.hostUrl;
		this.url = this.host + 'plugin/touches';
		this.logoLink = "https://cdn.sendoso.com/assets/plugin_icon.png";
		this.btnText = '|| Sendoso ||';
		this.siteUrl = this.encodeURIComponentWithSpecialCharacters(window.location.href);
	}
	
	encodeURIComponentWithSpecialCharacters(str) {
  	return encodeURIComponent(str).replace(/[!'()*]/g, escape);
	}
	
	iframeSrc(){
	    var params = {
	      tab_id: this.tabId,
	      channel: this.channel,
	      user_type: this.userType,
	      user_id: this.userId,
	      company_name: this.companyNameViaDom(),
	      site_url: this.siteUrl
	    }
	    if (this.isLighteningReady || this.isConsole) {
				params.child_tab_id = this.childTabId
			}
	    var queryString = jQuery.param(params)
	    var iframeURL = this.url+"?"+decodeURIComponent(queryString)
	    return iframeURL;
	}

	sendosoSidebar(id=""){
		if(this.isLighteningReady){
			return $(`
			<div id='chrome-extension-iframe${id}' class='sendoso-spinner' style='display: block;z-index: 9999;position: fixed;background-color: white;top: 160px; right: -440px;border: 1px solid #888;width: 440px;border-radius: 1%;animation: fadeInFromNone 0.5s ease-in;'>
				<div class='sendoso-extension-btn-with-iframe'  style='margin-top: -40px;z-index: 999998;border-style: solid;border-color: #888;background-color: white;border-radius: 50%;border-width: 1px;border-bottom-right-radius:0px;width: 60px;height: 60px;float: right;margin-right: -1.5%;cursor: pointer;'>
					<img src="${this.logoLink}" style='cursor: pointer;width: 80%;height: 80%;margin-top: 10%;margin-bottom: 10%;margin-left: 13%;' />
				</div>
				<iframe src='about:blank' data-src-url="${this.iframeSrc()}"  width='440' height='500' frameborder='0' id='sendoso-sidebar-iframe${id}' allowfullscreen></iframe>
			</div>
			`);
			
		}else{
			if(this.isConsole){
		    return $("<div id='chrome-extension-iframe' class='sendoso-spinner' style='display: block;z-index: 98;position: fixed;background-color: white; top:"+this.sidebarTopHeight()+"px;right:-440px;border: 1px solid #888;width: 440px;border-radius: 1%;animation: fadeInFromNone 0.5s ease-in;'><div class='sendoso-extension-btn-with-iframe' style='margin-top: -40px;z-index: 999998;border-style: solid;border-color: #888;background-color: white;border-radius: 50%;border-width: 1px;border-bottom-right-radius:0px;width: 60px;height: 60px;float: right;margin-right: -1.5%;cursor: pointer;'><img src="+this.logoLink+" style='cursor: pointer;width: 80%;height: 80%;margin-top: 10%;margin-bottom: 10%;margin-left: 13%;' /></div><iframe src='about:blank' width='440' height='500' frameborder='0'  id='sendoso-sidebar-iframe' allowfullscreen></iframe></div>");
		  }else{
				return $(`
					<div id='chrome-extension-iframe${id}' class='sendoso-spinner' style='display: block;z-index: 98;position: fixed;background-color: white; top:${this.sidebarTopHeight()}px;right:-440px;border: 1px solid #888;width: 440px;border-radius: 1%;animation: fadeInFromNone 0.5s ease-in;'>
						<div class='sendoso-extension-btn-with-iframe' style='margin-top: -40px;z-index: 999998;border-style: solid;border-color: #888;background-color: white;border-radius: 50%;border-width: 1px;border-bottom-right-radius:0px;width: 60px;height: 60px;float: right;margin-right: -1.5%;cursor: pointer;'>
						<img src="${this.logoLink}" style='cursor: pointer;width: 80%;height: 80%;margin-top: 10%;margin-bottom: 10%;margin-left: 13%;' />
						</div>
						<iframe src='about:blank' data-src-url="${this.iframeSrc()}" width='440' height='500' frameborder='0'  id='sendoso-sidebar-iframe${id}' allowfullscreen></iframe>
					</div>
				`);
		  }
		}
	}

	sendosoSidebarButton(id=""){
		if(this.isLighteningReady){
			return $(`
			<div class='sendoso-extension-btn${id}' id='sendoso-extension-btn${id}' style='z-index: 9999;cursor: pointer;position: fixed;top: 155px; right: -5.5px;display: block;width: 60px;height: 60px;opacity: 1;border-width: 1px;border-style: solid;border-color: orange;border-radius: 50%;background-color: white;'>
				<img src="${this.logoLink}" style='width: 80%;height: 80%;margin-top: 10%;margin-bottom: 10%;margin-left: 13%;' />
			</div>
			`); 
		}else{
			return $(`
				<div class='sendoso-extension-btn${id}' id='sendoso-extension-btn${id}' style='z-index: 98;cursor: pointer;position: fixed;top:${this.sidebarBtnTopHeight()}px; right: -5.5px;display: block;width: 60px;height: 60px;opacity: 1;border-width: 1px;border-style: solid;border-color: orange;border-radius: 50%;background-color: white;'>
					<img src="${this.logoLink}" style='width: 80%;height: 80%;margin-top: 10%;margin-bottom: 10%;margin-left: 13%;'/>
				</div>
			`);
		}
	}

	sendosoButton(){
		if(this.isLighteningReady){
			if($(".appName").text() == "Sales Console"){
				return $('<button style="margin-bottom: 4%; width: 55%;" class="sendoso slds-button slds-button--neutral not-selected slds-not-selected uiButton" id="sendosoTextBtn" aria-live="assertive" type="button" data-aura-rendered-by="103:2211;a" data-aura-class="uiButton">' + this.btnText + '</button>');
			}else{
				return $('<button style="margin-right: 5px" class="sendoso slds-button slds-button--neutral not-selected slds-not-selected uiButton" aria-live="assertive" type="button" data-aura-rendered-by="103:2211;a" data-aura-class="uiButton">' + this.btnText + '</button>');
			}
		}else{
			return $('<input value="'+ this.btnText +'" class="btn" name="sendoso" title="'+ this.btnText +'" type="button">');
		}
	}

	sidebarTopHeight(){
	  if(this.isConsole){
	    return 59;
	  }else{
	    return 96;  
	  }
	}

	sidebarBtnTopHeight(){
		if(this.isConsole){
			return 20;
	  }else{
	  	return 57;
	  }
	}

	get tabId(){
		var tId = $("body").attr("tab_id");
		if(typeof tId == "undefined"){
			tId = this.generateRandomTabId();
			this.saveRandomTabId('tab_id', tId);
			return tId;
	  }else{
	    return tId;
	  }
	}

	get childTabId(){
		if(this.isLighteningReady){
		  if(this.isConsole){
		    return $(".active.oneWorkspace .active.oneConsoleTab").attr("id");
		  }else{
				var tId = this.generateRandomTabId()+':';
				this.saveRandomTabId('id', tId);
				return tId;
		  }
		}else{
			if(isConsolePage()){
		    var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
		    if(iframe.length==0){
					var tId = this.generateRandomTabId()+':';
					this.saveRandomTabId('id', tId);
					return tId;
		    }else{
		      return $(iframe).attr("name");
		    }
		  }
	  }
	  return "";
	}

	generateRandomTabId() {
		return Math.round(Math.random() * Date.now());
	}

	saveRandomTabId(attrName, tId) {
		var att = document.createAttribute(attrName);
		att.value = tId;
		document.body.setAttributeNode(att);
	}

  companyNameFromlighteningReady(){
  	var cName;
  	if(this.userType == "Contact"){
	    if(this.isConsole){
	      cName = $('.active.oneWorkspace [title="Account Name"]').next().find('a').text();
	    }else{
	      cName = $('.active.oneContent [title="Account Name"]').next().find('a').text();
	    }
	  }else{
	    if(this.isConsole){
	      cName = $('.active.oneWorkspace [title="Company"]').next().text();
	    }else{
	      cName = $('.active.oneContent [title="Company"]').next().text();
	    }
	  }
	  return this.encodeURIComponentWithSpecialCharacters(cName); 
  }

  companyNameFromClassic(){
  	var cName = this.senderCompanyNameViaDom();
  	if(typeof cName == "undefined" || cName == ""){
	    cName = this.senderInfoFromIframe(this.companyNameId());
	  }
	  return cName;
  }
 
	companyNameViaDom(){
		var companyName;
	  if(this.isLighteningReady){
		  companyName = this.companyNameFromlighteningReady();
	  }else{
	  	companyName = this.companyNameFromClassic();
	  }   
	  return companyName;
	}

	senderCompanyNameViaDom(){
		return this.encodeURIComponentWithSpecialCharacters($('#con4_ilecell a').text()); 
	}

	companyNameId(){
	  return "#con4_ilecell a";
	}

	senderInfoFromIframe(senderId){
		var iframe = $('.sd_primary_container:visible').find("iframe[title!='sessionserver']:visible");
	  var senderInfo = "";
	  senderInfo = $(iframe).contents().find(senderId);
	  if(senderInfo.length != 0){
	    senderInfo = this.encodeURIComponentWithSpecialCharacters(senderInfo.html());
	  }
	  if(senderInfo.length == 0){
	    return "";
	  }else{
	    return senderInfo;
	  }
	}
}
