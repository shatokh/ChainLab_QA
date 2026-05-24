import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  castLocalDaoVote,
  createLocalDaoVotingState,
  DAO_PROPOSAL_DESCRIPTION,
  DAO_PROPOSAL_TITLE,
} from "../lib/dao.ts";

const account = "0x1234567890abcdef1234567890abcdef12345678";

test("creates a local DAO voting state with seeded proposal", () => {
  const state = createLocalDaoVotingState(account);

  assert.equal(state.account, account);
  assert.equal(state.proposal.id, 1);
  assert.equal(state.proposal.title, DAO_PROPOSAL_TITLE);
  assert.equal(state.proposal.description, DAO_PROPOSAL_DESCRIPTION);
  assert.equal(state.proposal.yesVotes, 0);
  assert.equal(state.proposal.noVotes, 0);
  assert.equal(state.proposal.status, "open");
});

test("casting a yes vote updates totals and user vote state", () => {
  const state = createLocalDaoVotingState(account);
  const nextState = castLocalDaoVote(state, "yes");

  assert.equal(nextState.status, "success");
  assert.equal(nextState.proposal.yesVotes, 1);
  assert.equal(nextState.proposal.noVotes, 0);
  assert.equal(nextState.userVote, "yes");
  assert.equal(nextState.lastMessage, "Your local yes vote was recorded.");
});

test("casting a no vote updates totals", () => {
  const state = createLocalDaoVotingState(account);
  const nextState = castLocalDaoVote(state, "no");

  assert.equal(nextState.status, "success");
  assert.equal(nextState.proposal.yesVotes, 0);
  assert.equal(nextState.proposal.noVotes, 1);
  assert.equal(nextState.userVote, "no");
});

test("voting without an account returns missing wallet state", () => {
  const state = createLocalDaoVotingState(null);
  const nextState = castLocalDaoVote(state, "yes");

  assert.equal(nextState.status, "missing_wallet");
  assert.equal(nextState.lastMessage, "Connect a local wallet before voting.");
});

test("duplicate voting is rejected in local DAO state", () => {
  const state = createLocalDaoVotingState(account);
  const firstVote = castLocalDaoVote(state, "yes");
  const secondVote = castLocalDaoVote(firstVote, "no");

  assert.equal(secondVote.status, "duplicate_vote");
  assert.equal(secondVote.proposal.yesVotes, 1);
  assert.equal(secondVote.proposal.noVotes, 0);
  assert.equal(secondVote.userVote, "yes");
  assert.equal(secondVote.lastMessage, "This local account already voted.");
});

test("DAO contract source exposes vote event for verification", () => {
  const source = readFileSync("contracts/ChainLabDaoVoting.sol", "utf8");

  assert.match(
    source,
    /event VoteCast\(\s*uint256 indexed proposalId,\s*address indexed voter,\s*bool support,\s*uint256 yesVotes,\s*uint256 noVotes\s*\);/,
  );
  assert.match(
    source,
    /emit VoteCast\(proposalId, voter, support, proposal.yesVotes, proposal.noVotes\);/,
  );
});
