// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ChainLabTestToken} from "./ChainLabTestToken.sol";

contract ChainLabFaucet {
  ChainLabTestToken public immutable token;
  uint256 public immutable claimAmount;
  uint256 public totalClaims;

  event TokensClaimed(address indexed recipient, uint256 amount);

  error InvalidRecipient();
  error EmptyFaucet();

  constructor(ChainLabTestToken token_, uint256 claimAmount_) {
    token = token_;
    claimAmount = claimAmount_;
  }

  function claim(address recipient) external {
    if (recipient == address(0)) {
      revert InvalidRecipient();
    }

    if (token.balanceOf(address(this)) < claimAmount) {
      revert EmptyFaucet();
    }

    totalClaims += 1;
    token.transfer(recipient, claimAmount);

    emit TokensClaimed(recipient, claimAmount);
  }
}
