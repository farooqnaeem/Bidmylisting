const regex = /(https:\/\/app.hubspot.com\/contacts\/\d+\/contact\/\d+\/*)/;
SendosoScript.initialize(regex, () => HubspotWidget, "hubspot");
