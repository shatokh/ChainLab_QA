import { expect, test } from "@playwright/test";

const account = "0x1234567890abcdef1234567890abcdef12345678";

test("connects to a mocked local wallet provider", async ({ page }) => {
  await page.addInitScript((mockAccount) => {
    const walletWindow = window as Window &
      typeof globalThis & {
        chainLabMockProvider?: {
          request(args: { method: string }): Promise<string[] | string>;
        };
      };

    walletWindow.chainLabMockProvider = {
      async request({ method }: { method: string }) {
        if (method === "eth_requestAccounts") {
          return [mockAccount];
        }

        if (method === "eth_chainId") {
          return "0x7a69";
        }

        throw new Error(`Unsupported method: ${method}`);
      },
    };
  }, account);

  await page.goto("/");

  await page.getByRole("button", { name: "Connect wallet" }).click();

  await expect(page.getByText("0x1234...5678")).toBeVisible();
  await expect(page.getByText("Local Hardhat (31337)")).toBeVisible();
});

test("shows missing provider state without a wallet provider", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Connect wallet" }).click();

  await expect(page.getByText("No wallet provider found.")).toBeVisible();
});
