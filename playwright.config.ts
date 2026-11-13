import { defineConfig, devices } from '@playwright/test'

const PORT = 4173

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
    // 翻頁動畫在「減少動態效果」時關閉，測試才不用等動畫
    contextOptions: { reducedMotion: 'reduce' },
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: `npx serve .output/public -l ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
})
