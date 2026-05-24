import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  createLocalFaucetState,
  formatTokenAmount,
  requestFaucetTokens,
} from "../lib/faucet.ts";

const account = "0x1234567890abcdef1234567890abcdef12345678";

test("creates a local faucet state with zero user balance", () => {
  const state = createLocalFaucetState(account);

  assert.equal(state.account, account);
  assert.equal(state.balance, 0n);
  assert.equal(state.faucetBalance, 1000n * 10n ** 18n);
  assert.equal(state.status, "idle");
});

test("requesting local faucet tokens updates balance and faucet inventory", () => {
  const state = createLocalFaucetState(account);
  const nextState = requestFaucetTokens(state);

  assert.equal(nextState.status, "success");
  assert.equal(nextState.balance, 100n * 10n ** 18n);
  assert.equal(nextState.faucetBalance, 900n * 10n ** 18n);
  assert.equal(
    nextState.lastMessage,
    "Received 100 CLT from the local faucet.",
  );
});

test("faucet contract source exposes a claim event for verification", () => {
  const source = readFileSync("contracts/ChainLabFaucet.sol", "utf8");

  assert.match(
    source,
    /event TokensClaimed\(address indexed recipient, uint256 amount\);/,
  );
  assert.match(source, /emit TokensClaimed\(recipient, claimAmount\);/);
});

test("requesting without an account returns missing wallet state", () => {
  const state = createLocalFaucetState(null);
  const nextState = requestFaucetTokens(state);

  assert.equal(nextState.status, "missing_wallet");
  assert.equal(
    nextState.lastMessage,
    "Connect a local wallet before requesting tokens.",
  );
});

test("requesting from an empty faucet returns empty state", () => {
  const state = {
    ...createLocalFaucetState(account),
    faucetBalance: 0n,
  };
  const nextState = requestFaucetTokens(state);

  assert.equal(nextState.status, "empty");
  assert.equal(nextState.balance, 0n);
  assert.equal(nextState.lastMessage, "Local faucet is empty.");
});

test("formats token amounts with eighteen decimals", () => {
  assert.equal(formatTokenAmount(100n * 10n ** 18n), "100 CLT");
});
