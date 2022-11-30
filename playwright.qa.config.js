// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'line',
  reporter: [ ['junit', { outputFile: 'results.xml' }] ],
  use: {
    actionTimeout: 0,
    baseURL: 'https://qa.bidmylisting.io',
    trace: 'on-first-retry'
  },

  // Config for BML API tests
  api: {
    url: 'https://api.qa.bidmylisting.io',
    authMsUrl: 'https://auth.ms.qa.bidmylisting.io',
    listingMsUrl: 'https://listing.ms.qa.bidmylisting.io',
    eventsMsUrl: 'https://events.ms.qa.bidmylisting.io',
    notificationMsUrl: 'https://notifications.ms.qa.bidmylisting.io'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};

module.exports = config;
