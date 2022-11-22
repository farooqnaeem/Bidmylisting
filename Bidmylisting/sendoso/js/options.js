
function saveOptions(e) {
  var salesforce = $("#salesforce").prop("checked");
  var outreach = $("#outreach").prop("checked");
  var amazon = $("#amazon").prop("checked");
  var outreach_sidebar = $("#outreach_sidebar").prop("checked");
  var salesloft = $("#salesloft").prop("checked");
  var hubspot = $("#hubspot").prop("checked");
  var activeCampaign = $("#active_campaign").prop("checked");
  changeButtonText(e);
  chrome.storage.sync.set({
    salesforce: salesforce,
    outreach: outreach,
    amazon: amazon,
    outreach_sidebar: outreach_sidebar,
    salesloft: salesloft,
    hubspot: hubspot,
    activeCampaign: activeCampaign
  });
}

function changeButtonText(e){
  e.target.innerText = 'Saved';
  setTimeout(function(){
    e.target.innerText = 'Save';
  }, 300);
}

function restoreOptions(){
  chrome.storage.sync.get({
    salesforce: true,
    outreach: true,
    amazon: true,
    outreach_sidebar: true,
    salesloft: true,
    hubspot: true,
    activeCampaign: true
  }, function(items){
      setCheckboxValues(items);
  });
}
function resetOptions(){
  chrome.storage.sync.set({
    salesforce: false,
    outreach: false,
    amazon: false,
    outreach_sidebar: false,
    salesloft: false,
    hubspot: false,
    activeCampaign: false
  });
  restoreOptions();
}
function setCheckboxValues(items){
  $("#salesforce").prop("checked", items.salesforce);
  $("#outreach").prop("checked", items.outreach);
  $("#amazon").prop("checked", items.amazon);
  $("#outreach_sidebar").prop("checked", items.outreach_sidebar);
  $("#salesloft").prop("checked", items.salesloft);
  $("#hubspot").prop("checked", items.hubspot);
  $("#active_campaign").prop("checked", items.activeCampaign);
}
$(document).ready(function(){
  restoreOptions();
  $(".save").on("click", saveOptions);
  $("#hideall").change(function(){
    if(this.checked){
      resetOptions();
    }
  });

  $("#sidebar_setting_tab > a").on("click", function(){
    $(this).removeClass("inactive-tab-border");
    $(this).addClass("active-tab-border");
    $("#integration_tab > a").addClass("inactive-tab-border");
    $("#integration_tab > a").removeClass("active-tab-border");
  });
});
