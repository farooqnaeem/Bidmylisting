import {Then} from "@cucumber/cucumber";
import HomeOwner from "../../pages/actions/Home_Owner_actions";

Then(/^The user click on homeowner button$/, async function () {
    await HomeOwner.homeownerButton(this.page)
});
Then(/^The user enter the address$/,async function () {
await HomeOwner.enterAddress(this.page)
});
Then(/^The user click on next button$/,async function () {
await HomeOwner.nextButton(this.page)
});
Then(/^The user enter the zip code$/,async function () {
await HomeOwner.zipCode(this.page)
});
Then(/^The user enter the bedrooms$/,async function () {
await HomeOwner.numberofBedrooms(this.page)
});
Then(/^The user enter the baths$/,async function () {
await HomeOwner.numberofBaths(this.page)
});
Then(/^The user enter the SquaremFootage$/,async function () {
await HomeOwner.squareFootage(this.page)
});
Then(/^The user click on yes button of listing agent$/,async function () {
await HomeOwner.listingAgent(this.page)
});
Then(/^The user click on listing agreement expire$/,async function () {
await HomeOwner.expireMonth(this.page)
});
Then(/^The user ask for sell his home$/,async function () {
await HomeOwner.sellYourHome(this.page)
});
Then(/^The user ask for condition of home$/,async function () {
await HomeOwner.conditionofHome(this.page)
});
Then(/^The user click on yes button of buy a home$/,async function () {
await HomeOwner.yesButtonofBuyaHome(this.page)
});
Then(/^The user enter the first name$/,async function () {
await HomeOwner.enterFirstName(this.page)
});
Then(/^The user enter the last name$/, async function () {
await HomeOwner.enterLastName(this.page)
});
Then(/^The user enter the email address$/,async function () {
await HomeOwner.emailAddress(this.page)
});
Then(/^The user reverify the email address$/,async function () {
await HomeOwner.reverifyEmailAddress(this.page)
});
Then(/^The user enter the phone number$/,async function () {
await HomeOwner.phoneNumber(this.page)
});
Then(/^The user enter the Password$/,async function () {
await HomeOwner.Password(this.page)
});
Then(/^The user click on checkbox$/,async function () {
await HomeOwner.clickonCheckbox(this.page)
});
Then(/^The user click on create my listing button$/,async function () {
await HomeOwner.createMyListing(this.page)
});
Then(/^The user click on agent registration button$/,async function () {
await HomeOwner.agentRegistration(this.page)
});
Then(/^The user enter the First Name$/,async function () {
await HomeOwner.agentFistName(this.page)
});
Then(/^The user enter the last Name for agent$/,async function () {
await HomeOwner.agentLastName(this.page)
});
Then(/^The user enter the email address of agent$/,async function () {
await HomeOwner.agentEmailAddress(this.page)
});
Then(/^The user enter the reverify the address of agent$/,async function () {
await HomeOwner.agentEmailReverify(this.page)
});
Then(/^The user enter the phone number of agent$/,async function () {
await HomeOwner.agentPhoneNumber(this.page)
});
Then(/^The user enter the zip code of agent$/,async function () {
await HomeOwner.agentZipCode(this.page)
});