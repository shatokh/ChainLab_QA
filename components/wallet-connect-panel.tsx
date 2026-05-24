"use client";

import { useState } from "react";
import {
  connectWallet,
  disconnectWallet,
  getBrowserWalletProvider,
  initialWalletState,
  type WalletState,
} from "../lib/wallet";
import { DaoVotingPanel } from "./dao-voting-panel";
import { FaucetPanel } from "./faucet-panel";
import { NftMintPanel } from "./nft-mint-panel";

const statusLabel: Record<WalletState["status"], string> = {
  idle: "Not connected",
  connected: "Connected",
  wrong_chain: "Wrong chain",
  missing_provider: "Missing provider",
  rejected: "Rejected",
  failed: "Failed",
};

export function WalletConnectPanel() {
  const [wallet, setWallet] = useState<WalletState>(() => initialWalletState());
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    const nextWallet = await connectWallet(getBrowserWalletProvider());
    setWallet(nextWallet);
    setIsConnecting(false);
  };

  const handleDisconnect = () => {
    setWallet(disconnectWallet());
  };

  const isConnected =
    wallet.status === "connected" || wallet.status === "wrong_chain";

  return (
    <>
      <section className="wallet-panel" aria-labelledby="wallet-title">
        <div>
          <p className="eyebrow">Local Wallet</p>
          <h2 id="wallet-title">Wallet Connect</h2>
          <p className="wallet-copy">
            Automated checks use a mocked provider first. Manual wallet checks
            are optional and local-only.
          </p>
        </div>

        <dl className="wallet-details" aria-label="Wallet status">
          <div>
            <dt>Status</dt>
            <dd>{statusLabel[wallet.status]}</dd>
          </div>
          <div>
            <dt>Account</dt>
            <dd>{wallet.shortAccount ?? "None"}</dd>
          </div>
          <div>
            <dt>Chain</dt>
            <dd>{wallet.chainLabel ?? "None"}</dd>
          </div>
        </dl>

        <p
          className={`wallet-message wallet-message-${wallet.status}`}
          role="status"
        >
          {wallet.message}
        </p>

        <div className="wallet-actions">
          <button type="button" onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? "Connecting..." : "Connect wallet"}
          </button>
          <button
            type="button"
            onClick={handleDisconnect}
            disabled={!isConnected}
          >
            Disconnect
          </button>
        </div>
      </section>

      <FaucetPanel
        key={wallet.account ?? "no-account"}
        account={wallet.account}
        isLocalChain={wallet.status === "connected"}
      />
      <NftMintPanel
        key={`nft-${wallet.account ?? "no-account"}`}
        account={wallet.account}
        isLocalChain={wallet.status === "connected"}
      />
      <DaoVotingPanel
        key={`dao-${wallet.account ?? "no-account"}`}
        account={wallet.account}
        isLocalChain={wallet.status === "connected"}
      />
    </>
  );
}
