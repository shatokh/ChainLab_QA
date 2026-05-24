"use client";

import { useState } from "react";
import {
  createLocalNftMintState,
  mintLocalNft,
  type LocalNftMintState,
} from "../lib/nft";

type NftMintPanelProps = {
  account: string | null;
  isLocalChain: boolean;
};

export function NftMintPanel({ account, isLocalChain }: NftMintPanelProps) {
  const [mintState, setMintState] = useState<LocalNftMintState>(() =>
    createLocalNftMintState(account),
  );

  const latestMint =
    mintState.mintedTokens[mintState.mintedTokens.length - 1] ?? null;
  const canMint = Boolean(account) && isLocalChain;

  const handleMint = () => {
    if (!isLocalChain) {
      setMintState((current) => ({
        ...current,
        status: "failed",
        lastMessage: "Switch to Local Hardhat before minting an NFT.",
      }));
      return;
    }

    setMintState((current) => mintLocalNft(current));
  };

  return (
    <section className="nft-panel" aria-labelledby="nft-title">
      <div>
        <p className="eyebrow">Local NFT</p>
        <h2 id="nft-title">NFT Mint</h2>
        <p className="wallet-copy">
          CLNFT is a valueless local NFT for metadata and ownership checks.
        </p>
      </div>

      <dl className="wallet-details" aria-label="NFT mint status">
        <div>
          <dt>Collection</dt>
          <dd>{mintState.collectionName}</dd>
        </div>
        <div>
          <dt>Symbol</dt>
          <dd>{mintState.symbol}</dd>
        </div>
        <div>
          <dt>Next token</dt>
          <dd>#{mintState.nextTokenId}</dd>
        </div>
      </dl>

      {latestMint ? (
        <dl className="wallet-details" aria-label="Latest minted NFT">
          <div>
            <dt>Token ID</dt>
            <dd>#{latestMint.tokenId}</dd>
          </div>
          <div>
            <dt>Owner</dt>
            <dd>{latestMint.owner}</dd>
          </div>
          <div>
            <dt>Token URI</dt>
            <dd>{latestMint.tokenUri}</dd>
          </div>
        </dl>
      ) : null}

      <p
        className={`wallet-message wallet-message-${mintState.status}`}
        role="status"
      >
        {mintState.lastMessage}
      </p>

      <div className="wallet-actions">
        <button type="button" onClick={handleMint} disabled={!canMint}>
          Mint local NFT
        </button>
      </div>
    </section>
  );
}
