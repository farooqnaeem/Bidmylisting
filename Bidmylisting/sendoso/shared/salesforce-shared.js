var sales_console = 'Sales Console'
var sales = 'Sales'
var content = 'Content'
var service = 'Service'
var marketing = 'Marketing'
var community = 'Community'

window.isConsolePage = function() {
	return $(".oneConsoleNav").length != 0;
};

window.launcherType = function() {
	return $('.appName').text()
};

window.isSalesConsoleLauncher = function() {
	return launcherType() == sales_console;
}

window.isSalesPage = function() {
	return launcherType() == sales;
};

window.isContentPage = function() {
	return launcherType() == content;
};

window.isServicePage = function() {
	return launcherType() == service;
};

window.isMarketingPage = function() {
	return launcherType() == marketing;
};

window.isCommunityPage = function() {
	return launcherType() == community;
};

window.hostFromUrl = function() {
	return window.location.host
}