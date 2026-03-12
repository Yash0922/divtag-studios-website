import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing
 * Validates Requirements 7.1, 7.2, 7.3 (responsive design across mobile, tablet, desktop)
 */
export default defineConfig({
  testDir: './e2e',
  
  // Run tests in files in parallel
  fullyParallel: true,
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  
  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter to use
  reporter: 'html',
  
  // Shared settings for all the projects below
  use: {
    // Base URL to use in actions like `await page.goto('/')`
    baseURL: 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers and viewports
  projects: [
    // Desktop browsers
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: 'firefox-desktop',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1280, height: 720 }
      },
    },
    {
      name: 'webkit-desktop',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1280, height: 720 }
      },
    },

    // Tablet viewports (768px-1023px) - Requirement 7.2
    {
      name: 'tablet-portrait',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 }
      },
    },
    {
      name: 'tablet-landscape',
      use: {
        ...devices['iPad Mini landscape'],
        viewport: { width: 1024, height: 768 }
      },
    },

    // Mobile viewports (320px-767px) - Requirement 7.1
    {
      name: 'mobile-small',
      use: {
        ...devices['iPhone SE'],
        viewport: { width: 375, height: 667 }
      },
    },
    {
      name: 'mobile-medium',
      use: {
        ...devices['iPhone 12'],
        viewport: { width: 390, height: 844 }
      },
    },
    {
      name: 'mobile-large',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 }
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
