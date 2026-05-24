// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ChainLabDaoVoting} from "./ChainLabDaoVoting.sol";

contract ChainLabDaoVotingTest {
  ChainLabDaoVoting dao;
  address voter = address(0x1234);
  address secondVoter = address(0x5678);

  function setUp() public {
    dao = new ChainLabDaoVoting("Ship local DAO voting", "Validate yes/no voting on local Hardhat.");
  }

  function test_SeededProposalMetadata() public view {
    (
      uint256 proposalId,
      string memory title,
      string memory description,
      uint256 yesVotes,
      uint256 noVotes,
      bool open
    ) = dao.getProposal(1);

    require(proposalId == 1, "Unexpected proposal ID");
    require(keccak256(bytes(title)) == keccak256(bytes("Ship local DAO voting")), "Unexpected title");
    require(
      keccak256(bytes(description)) == keccak256(bytes("Validate yes/no voting on local Hardhat.")),
      "Unexpected description"
    );
    require(yesVotes == 0, "Unexpected yes votes");
    require(noVotes == 0, "Unexpected no votes");
    require(open, "Proposal should be open");
  }

  function test_YesVoteUpdatesTotalsAndUserState() public {
    dao.vote(1, voter, true);

    (, , , uint256 yesVotes, uint256 noVotes, ) = dao.getProposal(1);

    require(yesVotes == 1, "Yes vote not counted");
    require(noVotes == 0, "No vote should stay zero");
    require(dao.hasVoted(1, voter), "Voter state not recorded");
  }

  function test_NoVoteUpdatesTotals() public {
    dao.vote(1, voter, false);
    dao.vote(1, secondVoter, false);

    (, , , uint256 yesVotes, uint256 noVotes, ) = dao.getProposal(1);

    require(yesVotes == 0, "Yes vote should stay zero");
    require(noVotes == 2, "No votes not counted");
  }

  function test_DuplicateVoteIsRejected() public {
    dao.vote(1, voter, true);

    (bool success, ) = address(dao).call(abi.encodeWithSelector(dao.vote.selector, 1, voter, false));

    require(!success, "Duplicate vote should fail");
  }

  function test_InvalidProposalIsRejected() public {
    (bool success, ) = address(dao).call(abi.encodeWithSelector(dao.vote.selector, 404, voter, true));

    require(!success, "Invalid proposal should fail");
  }

  function test_ZeroAddressVoterIsRejected() public {
    (bool success, ) = address(dao).call(abi.encodeWithSelector(dao.vote.selector, 1, address(0), true));

    require(!success, "Zero address vote should fail");
  }
}
