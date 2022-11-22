function setSFDCTabInfo(info) {
	if (info.tab) {
		var att = document.createAttribute("tab_id");
		att.value = info.tab.id;
		document.body.setAttributeNode(att);
		console.log('tabinfo received')
	}
}
chrome.runtime.sendMessage({ action: "sfdcInfo", url: location.href }, function (info) {
	console.log('1st try to get sfdc info')
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

