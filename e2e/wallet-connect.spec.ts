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

  await page.getByRole("button", { name: "Request 100 CLT" }).click();

  await expect(
    page.getByText("Received 100 CLT from the local faucet."),
  ).toBeVisible();
  const faucetStatus = page.getByLabel("Faucet status");
  await expect(
    faucetStatus.getByText("100 CLT", { exact: true }),
  ).toBeVisible();
  await expect(
    faucetStatus.getByText("900 CLT", { exact: true }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Mint local NFT" }).click();

  await expect(page.getByText("Minted CLNFT #1 locally.")).toBeVisible();
  const nftStatus = page.getByLabel("NFT mint status");
  await expect(nftStatus.getByText("#2", { exact: true })).toBeVisible();
  const latestNft = page.getByLabel("Latest minted NFT");
  await expect(latestNft.getByText("#1", { exact: true })).toBeVisible();
  await expect(latestNft.getByText(account, { exact: true })).toBeVisible();
  await expect(
    latestNft.getByText("chainlab://local-nft/1", { exact: true }),
  ).toBeVisible();
});

test("shows missing provider state without a wallet provider", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Connect wallet" }).click();

  await expect(page.getByText("No wallet provider found.")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Request 100 CLT" }),
  ).toBeDisabled();
  await expect(
    page.getByRole("button", { name: "Mint local NFT" }),
  ).toBeDisabled();
});
