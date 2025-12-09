import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30_000,
  retries: 0,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.aerobus.fr/',
  },
  reporter: 'html',
  testDir: './tests',
  webServer: undefined,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
