
document.addEventListener("DOMContentLoaded", function(){
  function setIframeUrl(){
    var url = new URL(window.location.href);
    var tabId = url.searchParams.get("tab_id");
    document.getElementById("iframe").src = `https://staging.sendoso.com/plugin/users/sign_in?tab_id=${tabId}`;
  }
  setIframeUrl();
});
