// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../../playwright.config.js');
const apiUrl = config.api.listingMsUrl;

/* Endpoints under test
  createListing  PUT  /bml/v1/listing
  updateListing  PUT  /bml/v1/listing/:id
  deleteListing  DELETE  /bml/v1/listing/:id
  searchListings POST /bml/v1/listing/search
  
  saveListing   PUT  /bml/v1/listing/saved
  unsaveListing DELETE /bml/v1/listing/saved
  getSaveListings GET /bml/v1/listing/saved

  placeBid   PUT /bml/v1/bid
  queryBids  GET /bml/v1/bid
  updateBid  PATCH /bml/v1/bid/:id
  removeBid  DELETE /bml/v1/bid/:id
*/

test.describe('Listing Microservice API Tests - ' + apiUrl, () => {

  test('Verify service', async ({ request }) => {
    const info = await request.get(apiUrl + '/info');
    expect(info.ok()).toBeTruthy();
    
    const json = await info.json();
    expect(json.routes).toBeTruthy();
    console.log(json.routes);
  });
});