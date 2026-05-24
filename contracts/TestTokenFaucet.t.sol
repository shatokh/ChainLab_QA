// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ChainLabTestToken} from "./ChainLabTestToken.sol";
import {ChainLabFaucet} from "./ChainLabFaucet.sol";

contract TestTokenFaucetTest {
  ChainLabTestToken token;
  ChainLabFaucet faucet;

  address recipient = address(0x1234);

  function setUp() public {
    token = new ChainLabTestToken();
    faucet = new ChainLabFaucet(token, 100 ether);
    token.mint(address(faucet), 1_000 ether);
  }

  function test_TokenMetadataIsLocalOnly() public view {
    require(
      keccak256(bytes(token.name())) == keccak256(bytes("ChainLab Local Test Token")),
      "Unexpected token name"
    );
    require(keccak256(bytes(token.symbol())) == keccak256(bytes("CLT")), "Unexpected token symbol");
    require(token.decimals() == 18, "Unexpected decimals");
  }

  function test_FaucetClaimTransfersTokens() public {
    uint256 beforeBalance = token.balanceOf(recipient);

    faucet.claim(recipient);

    require(token.balanceOf(recipient) == beforeBalance + 100 ether, "Recipient balance not updated");
    require(token.balanceOf(address(faucet)) == 900 ether, "Faucet balance not reduced");
    require(faucet.totalClaims() == 1, "Claim count not updated");
  }

  function test_FaucetRejectsZeroAddressRecipient() public {
    (bool success, ) = address(faucet).call(abi.encodeWithSelector(faucet.claim.selector, address(0)));

    require(!success, "Claim to zero address should fail");
  }

  function test_FaucetRejectsEmptyInventory() public {
    ChainLabFaucet emptyFaucet = new ChainLabFaucet(token, 100 ether);

    (bool success, ) = address(emptyFaucet).call(
      abi.encodeWithSelector(emptyFaucet.claim.selector, recipient)
    );

    require(!success, "Empty faucet claim should fail");
  }
}
