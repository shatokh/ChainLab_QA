"use client";

import { useState } from "react";
import {
  castLocalDaoVote,
  createLocalDaoVotingState,
  type DaoVoteChoice,
  type LocalDaoVotingState,
} from "../lib/dao";

type DaoVotingPanelProps = {
  account: string | null;
  isLocalChain: boolean;
};

export function DaoVotingPanel({ account, isLocalChain }: DaoVotingPanelProps) {
  const [voting, setVoting] = useState<LocalDaoVotingState>(() =>
    createLocalDaoVotingState(account),
  );

  const canVote = Boolean(account) && isLocalChain && voting.userVote === null;

  const handleVote = (choice: DaoVoteChoice) => {
    if (!isLocalChain) {
      setVoting((current) => ({
        ...current,
        status: "failed",
        lastMessage: "Switch to Local Hardhat before voting.",
      }));
      return;
    }

    setVoting((current) => castLocalDaoVote(current, choice));
  };

  return (
    <section className="dao-panel" aria-labelledby="dao-title">
      <div>
        <p className="eyebrow">Local DAO</p>
        <h2 id="dao-title">DAO Voting</h2>
        <p className="wallet-copy">
          Vote on a valueless local governance proposal for QA practice.
        </p>
      </div>

      <dl className="wallet-details" aria-label="DAO proposal status">
        <div>
          <dt>Proposal</dt>
          <dd>#{voting.proposal.id}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{voting.proposal.status}</dd>
        </div>
        <div>
          <dt>Your vote</dt>
          <dd>{voting.userVote ?? "None"}</dd>
        </div>
      </dl>

      <div className="proposal-summary">
        <h3>{voting.proposal.title}</h3>
        <p>{voting.proposal.description}</p>
      </div>

      <dl className="wallet-details" aria-label="DAO vote totals">
        <div>
          <dt>Yes votes</dt>
          <dd>{voting.proposal.yesVotes}</dd>
        </div>
        <div>
          <dt>No votes</dt>
          <dd>{voting.proposal.noVotes}</dd>
        </div>
        <div>
          <dt>Total votes</dt>
          <dd>{voting.proposal.yesVotes + voting.proposal.noVotes}</dd>
        </div>
      </dl>

      <p
        className={`wallet-message wallet-message-${voting.status}`}
        role="status"
      >
        {voting.lastMessage}
      </p>

      <div className="wallet-actions">
        <button
          type="button"
          onClick={() => handleVote("yes")}
          disabled={!canVote}
        >
          Vote yes
        </button>
        <button
          type="button"
          onClick={() => handleVote("no")}
          disabled={!canVote}
        >
          Vote no
        </button>
      </div>
    </section>
  );
}
