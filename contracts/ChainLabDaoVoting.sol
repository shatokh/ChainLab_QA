// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ChainLabDaoVoting {
  struct Proposal {
    uint256 id;
    string title;
    string description;
    uint256 yesVotes;
    uint256 noVotes;
    bool open;
  }

  uint256 public constant SEEDED_PROPOSAL_ID = 1;

  mapping(uint256 proposalId => Proposal proposal) private _proposals;
  mapping(uint256 proposalId => mapping(address voter => bool voted)) public hasVoted;

  event VoteCast(
    uint256 indexed proposalId,
    address indexed voter,
    bool support,
    uint256 yesVotes,
    uint256 noVotes
  );

  error InvalidProposal();
  error InvalidVoter();
  error DuplicateVote();
  error ProposalClosed();

  constructor(string memory title, string memory description) {
    _proposals[SEEDED_PROPOSAL_ID] = Proposal({
      id: SEEDED_PROPOSAL_ID,
      title: title,
      description: description,
      yesVotes: 0,
      noVotes: 0,
      open: true
    });
  }

  function getProposal(uint256 proposalId)
    external
    view
    returns (
      uint256 id,
      string memory title,
      string memory description,
      uint256 yesVotes,
      uint256 noVotes,
      bool open
    )
  {
    Proposal storage proposal = _requireProposal(proposalId);

    return (
      proposal.id,
      proposal.title,
      proposal.description,
      proposal.yesVotes,
      proposal.noVotes,
      proposal.open
    );
  }

  function vote(uint256 proposalId, address voter, bool support) external {
    Proposal storage proposal = _requireProposal(proposalId);

    if (voter == address(0)) {
      revert InvalidVoter();
    }

    if (!proposal.open) {
      revert ProposalClosed();
    }

    if (hasVoted[proposalId][voter]) {
      revert DuplicateVote();
    }

    hasVoted[proposalId][voter] = true;

    if (support) {
      proposal.yesVotes += 1;
    } else {
      proposal.noVotes += 1;
    }

    emit VoteCast(proposalId, voter, support, proposal.yesVotes, proposal.noVotes);
  }

  function _requireProposal(uint256 proposalId) private view returns (Proposal storage) {
    Proposal storage proposal = _proposals[proposalId];

    if (proposal.id == 0) {
      revert InvalidProposal();
    }

    return proposal;
  }
}
