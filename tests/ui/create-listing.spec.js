const { test } = require('@playwright/test');
const listing = require('../../testPages/createListing');
test.describe('Login Tests', () => {

    test('The user automate the complete scenario of create listings', async ({page}) => {
        await listing.createListing(page);
    });
});