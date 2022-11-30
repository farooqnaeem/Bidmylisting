// @ts-check
const { test, expect } = require('@playwright/test');
const config = require('../../playwright.config.js');

const microservices = [
  {name: 'auth', url: config.api.authMsUrl},
  {name: 'listing', url: config.api.listingMsUrl},
  {name: 'notification', url: config.api.notificationMsUrl},
  {name: 'events', url: config.api.eventsMsUrl}
];

test.describe('Microservice Tests', () => {
  
  test('Verify microservices are up', async({ request }) => {
    await Promise.all(microservices.map(async (ms) => {
      console.log(`Calling ${ms.name}-ms at ${ms.url}`);
      
      const info = await request.get(ms.url + '/info');
      expect(info.ok()).toBeTruthy();
    
      const json = await info.json();
      expect(json.routes).toBeTruthy();
      console.log(`Received ${ms.name}-ms info\n: ${json.routes}`);
    }));
  });
});

// Verifies that the microservice is up by calling its info endpoint
async function testMicroserviceInfo(request, msUrl) {
  
}