import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const baseUrl = "http://127.0.0.1:3000";

const waitForServer = async () => {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(baseUrl);

      if (response.status >= 200 && response.status < 500) {
        return;
      }
    } catch {
      await delay(1000);
    }
  }

  throw new Error("Next dev server did not become ready.");
};

const run = (command, args, options = {}) =>
  new Promise((resolve) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      ...options,
    });

    child.on("exit", (code) => resolve(code ?? 1));
  });

const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "dev",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3000",
  ],
  {
    stdio: "ignore",
    shell: process.platform === "win32",
  },
);

try {
  await waitForServer();
  const code = await run(
    process.execPath,
    [
      "node_modules/@playwright/test/cli.js",
      "test",
      "e2e/wallet-connect.spec.ts",
      "--workers=1",
    ],
    {
      env: {
        ...process.env,
        CHAINLAB_SKIP_WEBSERVER: "1",
      },
    },
  );

  process.exitCode = code;
} finally {
  if (!server.killed) {
    server.kill();
  }
}
