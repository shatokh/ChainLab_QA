import assert from "node:assert/strict";
import test from "node:test";
import {
  connectWallet,
  disconnectWallet,
  LOCAL_HARDHAT_CHAIN_ID,
  shortenAddress,
} from "../lib/wallet.ts";

type RequestCall = {
  method: string;
  params?: unknown[];
};

class MockProvider {
  calls: RequestCall[] = [];
  private readonly accounts: string[];
  private readonly chainId: string;
  private readonly rejectConnection: boolean;

  constructor(accounts: string[], chainId: string, rejectConnection = false) {
    this.accounts = accounts;
    this.chainId = chainId;
    this.rejectConnection = rejectConnection;
  }

  async request(call: RequestCall) {
    this.calls.push(call);

    if (call.method === "eth_requestAccounts") {
      if (this.rejectConnection) {
        throw Object.assign(new Error("User rejected request"), { code: 4001 });
      }

      return this.accounts;
    }

    if (call.method === "eth_chainId") {
      return this.chainId;
    }

    throw new Error(`Unsupported method: ${call.method}`);
  }
}

const account = "0x1234567890abcdef1234567890abcdef12345678";

test("connects with a mocked local Hardhat provider", async () => {
  const provider = new MockProvider([account], "0x7a69");
  const state = await connectWallet(provider);

  assert.equal(state.status, "connected");
  assert.equal(state.account, account);
  assert.equal(state.shortAccount, "0x1234...5678");
  assert.equal(state.chainId, LOCAL_HARDHAT_CHAIN_ID);
  assert.equal(state.chainLabel, "Local Hardhat (31337)");
  assert.deepEqual(
    provider.calls.map((call) => call.method),
    ["eth_requestAccounts", "eth_chainId"],
  );
});

test("returns wrong-chain state for non-local chains", async () => {
  const provider = new MockProvider([account], "0x1");
  const state = await connectWallet(provider);

  assert.equal(state.status, "wrong_chain");
  assert.equal(state.account, account);
  assert.equal(state.chainId, 1);
  assert.equal(state.chainLabel, "Unsupported chain (1)");
});

test("returns missing-provider state without a provider", async () => {
  const state = await connectWallet(undefined);

  assert.equal(state.status, "missing_provider");
  assert.equal(state.account, null);
  assert.equal(state.chainId, null);
});

test("returns rejected state when the provider reports user rejection", async () => {
  const provider = new MockProvider([account], "0x7a69", true);
  const state = await connectWallet(provider);

  assert.equal(state.status, "rejected");
  assert.equal(state.account, null);
});

test("disconnect resets wallet state", () => {
  const state = disconnectWallet();

  assert.equal(state.status, "idle");
  assert.equal(state.account, null);
  assert.equal(state.chainId, null);
});

test("shortens valid addresses for display", () => {
  assert.equal(shortenAddress(account), "0x1234...5678");
});
