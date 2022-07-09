// @ts-check
const { test, expect } = require('@playwright/test');
const bml = require('../../qa.config.js');
const baseUrl = bml.url.eventsMS;

/* Endpoints under test
  createEvent   PUT /bml/v1/event
  getEvent      GET /bml/v1/event/:id
  findEvent     GET /bml/v1/event
  queryEvents   POST /bml/v1/event/query
  aggregateEvents POST /bml/v1/event/aggregate
*/

test.describe('Events Microservice API Tests', () => {

  test('Verify service', async ({ request }) => {
    const info = await request.get(baseUrl + '/info');
    expect(info.ok()).toBeTruthy();
    
    const json = await info.json();
    expect(json.routes).toBeTruthy();
    console.log(json.routes);
  });
});