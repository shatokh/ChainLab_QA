import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  createLocalNftMintState,
  mintLocalNft,
  NFT_BASE_TOKEN_URI,
  NFT_COLLECTION_NAME,
  NFT_SYMBOL,
} from "../lib/nft.ts";

const account = "0x1234567890abcdef1234567890abcdef12345678";

test("creates a local NFT mint state with collection metadata", () => {
  const state = createLocalNftMintState(account);

  assert.equal(state.account, account);
  assert.equal(state.collectionName, NFT_COLLECTION_NAME);
  assert.equal(state.symbol, NFT_SYMBOL);
  assert.equal(state.nextTokenId, 1);
  assert.deepEqual(state.mintedTokens, []);
});

test("minting a local NFT assigns token ID, owner, and token URI", () => {
  const state = createLocalNftMintState(account);
  const nextState = mintLocalNft(state);

  assert.equal(nextState.status, "success");
  assert.equal(nextState.nextTokenId, 2);
  assert.equal(nextState.mintedTokens.length, 1);
  assert.deepEqual(nextState.mintedTokens[0], {
    tokenId: 1,
    owner: account,
    tokenUri: `${NFT_BASE_TOKEN_URI}1`,
  });
  assert.equal(nextState.lastMessage, "Minted CLNFT #1 locally.");
});

test("minting without an account returns missing wallet state", () => {
  const state = createLocalNftMintState(null);
  const nextState = mintLocalNft(state);

  assert.equal(nextState.status, "missing_wallet");
  assert.equal(
    nextState.lastMessage,
    "Connect a local wallet before minting an NFT.",
  );
});

test("NFT contract source exposes mint and transfer events for verification", () => {
  const source = readFileSync("contracts/ChainLabLocalNft.sol", "utf8");

  assert.match(
    source,
    /event LocalNftMinted\(address indexed owner, uint256 indexed tokenId, string tokenUri\);/,
  );
  assert.match(
    source,
    /event Transfer\(address indexed from, address indexed to, uint256 indexed tokenId\);/,
  );
  assert.match(
    source,
    /emit LocalNftMinted\(recipient, tokenId, tokenURI\(tokenId\)\);/,
  );
});
