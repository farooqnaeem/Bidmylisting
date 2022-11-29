// @ts-check
const { test, expect } = require('@playwright/test');
const homeReg = require('../../testPages/homeowner/registration'); 
const URL = require('url');

/* 
* This test follows all the Auction Flow test cases on TestMo 
*/
test('Mock Auction Test', async ({page}, testInfo) => {
  testInfo.setTimeout(1200000);

  // Homeowner - signup and create listing
  console.log("Creating homeowner");
  await homeReg.registerHomeowner(page);

  // Homeowner - verify listing info
  // TODO - homeowner dashboard test to verify listing

  // etc
  


});


