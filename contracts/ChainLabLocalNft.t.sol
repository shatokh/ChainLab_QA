// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {ChainLabLocalNft} from "./ChainLabLocalNft.sol";

contract ChainLabLocalNftTest {
  ChainLabLocalNft nft;
  address recipient = address(0x1234);

  function setUp() public {
    nft = new ChainLabLocalNft();
  }

  function test_MetadataIsLocalOnly() public view {
    require(keccak256(bytes(nft.name())) == keccak256(bytes("ChainLab Local NFT")), "Unexpected name");
    require(keccak256(bytes(nft.symbol())) == keccak256(bytes("CLNFT")), "Unexpected symbol");
    require(
      keccak256(bytes(nft.baseTokenUri())) == keccak256(bytes("chainlab://local-nft/")),
      "Unexpected base URI"
    );
  }

  function test_MintAssignsOwnershipAndMetadata() public {
    uint256 tokenId = nft.mint(recipient);

    require(tokenId == 1, "Unexpected token ID");
    require(nft.ownerOf(tokenId) == recipient, "Owner not assigned");
    require(nft.balanceOf(recipient) == 1, "Balance not updated");
    require(nft.totalMinted() == 1, "Total minted not updated");
    require(
      keccak256(bytes(nft.tokenURI(tokenId))) == keccak256(bytes("chainlab://local-nft/1")),
      "Token URI not updated"
    );
  }

  function test_MintRejectsZeroAddressRecipient() public {
    (bool success, ) = address(nft).call(abi.encodeWithSelector(nft.mint.selector, address(0)));

    require(!success, "Mint to zero address should fail");
  }

  function test_OwnerOfRejectsMissingToken() public view {
    (bool success, ) = address(nft).staticcall(abi.encodeWithSelector(nft.ownerOf.selector, 404));

    require(!success, "Missing owner lookup should fail");
  }

  function test_TokenUriRejectsMissingToken() public view {
    (bool success, ) = address(nft).staticcall(abi.encodeWithSelector(nft.tokenURI.selector, 404));

    require(!success, "Missing token URI lookup should fail");
  }
}
