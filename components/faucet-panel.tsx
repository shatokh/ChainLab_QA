"use client";

import { useState } from "react";
import {
  createLocalFaucetState,
  formatTokenAmount,
  requestFaucetTokens,
  type LocalFaucetState,
} from "../lib/faucet";

type FaucetPanelProps = {
  account: string | null;
  isLocalChain: boolean;
};

export function FaucetPanel({ account, isLocalChain }: FaucetPanelProps) {
  const [faucet, setFaucet] = useState<LocalFaucetState>(() =>
    createLocalFaucetState(account),
  );

  const canRequest = Boolean(account) && isLocalChain;

  const handleRequest = () => {
    if (!isLocalChain) {
      setFaucet((current) => ({
        ...current,
        status: "failed",
        lastMessage: "Switch to Local Hardhat before requesting tokens.",
      }));
      return;
    }

    setFaucet((current) => requestFaucetTokens(current));
  };

  return (
    <section className="faucet-panel" aria-labelledby="faucet-title">
      <div>
        <p className="eyebrow">Local Faucet</p>
        <h2 id="faucet-title">Test Token Faucet</h2>
        <p className="wallet-copy">
          CLT is a valueless local test token for QA practice.
        </p>
      </div>

      <dl className="wallet-details" aria-label="Faucet status">
        <div>
          <dt>Your balance</dt>
          <dd>{formatTokenAmount(faucet.balance)}</dd>
        </div>
        <div>
          <dt>Faucet balance</dt>
          <dd>{formatTokenAmount(faucet.faucetBalance)}</dd>
        </div>
        <div>
          <dt>Network</dt>
          <dd>{isLocalChain ? "Local Hardhat" : "Unavailable"}</dd>
        </div>
      </dl>

      <p
        className={`wallet-message wallet-message-${faucet.status}`}
        role="status"
      >
        {faucet.lastMessage}
      </p>

      <div className="wallet-actions">
        <button type="button" onClick={handleRequest} disabled={!canRequest}>
          Request 100 CLT
        </button>
      </div>
    </section>
  );
}
