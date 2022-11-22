var page_array = ["Lead", "Contact", "Person Account", "Business Account"];

function getPageName() {
	p_name = "";
	if (typeof social != "undefined") {
		p_name = social.socialStateInfo.entityType;
	}
	if (!page_array.includes(p_name)) {
		p_name = document.getElementsByTagName("title")[0].text.split(':')[0] || '';
	}
	return p_name;
}
function setSFDCTabInfo(info) {
	if (info.tab) {
		var att = document.createAttribute("tab_id");
		att.value = info.tab.id;
		document.body.setAttributeNode(att);
		console.log('tabinfo received')
	}
}
chrome.runtime.sendMessage({ action: "sfdcInfo", url: location.href }, function (info) {
	if (info && info.sfdcUser) {
		setSFDCTabInfo(info)
	} else {
		//second try
		console.log('2nd try to get sfdc info')
		chrome.runtime.sendMessage({ action: "sfdcInfo", url: location.href }, function (info) {
			if (info && info.sfdcUser) {
				setSFDCTabInfo(info)
			}
		});
	}
});
