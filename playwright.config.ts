import { defineConfig, devices } from "@playwright/test";

const shouldStartWebServer = process.env.CHAINLAB_SKIP_WEBSERVER !== "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  webServer: shouldStartWebServer
    ? {
        command:
          "node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3000",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
      }
    : undefined,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
