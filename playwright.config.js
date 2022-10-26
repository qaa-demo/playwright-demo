
const { devices } = require('@playwright/test');

Object.assign(global, {
  BASE_URL: 'https://testautomationpro.com/aut/',
});

const config = {
  testDir: './tests',
  timeout: 50 * 10000, /* Maximum time one test can run for. */
  expect: {
    timeout: 10000, /* Maximum time expect() should wait for the condition to be met.*/
  },
  fullyParallel: false,/* Run tests in files in parallel */
  forbidOnly: !!process.env.CI, /* Fail the build on CI if you accidentally left test.only in the source code. */
  retries: process.env.CI ? 1 : 0,/* Retry on CI only */
  workers: process.env.CI ? 1 : 1,/* Opt out of parallel tests on CI. */
  reporter: [['html', { open: 'always' }]],/* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10 * 1000,/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    navigationTimeout: 30 * 1000,
    trace: 'on', /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    video: 'on', /* Record Video */
    screenshot: 'only-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 300,
    },
  },
  outputDir: 'test-results/', /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],



  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

module.exports = config;
