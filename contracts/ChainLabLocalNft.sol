// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ChainLabLocalNft {
  string public constant name = "ChainLab Local NFT";
  string public constant symbol = "CLNFT";
  string public constant baseTokenUri = "chainlab://local-nft/";

  uint256 public totalMinted;

  mapping(uint256 tokenId => address owner) private _owners;
  mapping(address owner => uint256 balance) public balanceOf;

  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
  event LocalNftMinted(address indexed owner, uint256 indexed tokenId, string tokenUri);

  error InvalidRecipient();
  error TokenNotMinted();

  function mint(address recipient) external returns (uint256 tokenId) {
    if (recipient == address(0)) {
      revert InvalidRecipient();
    }

    tokenId = totalMinted + 1;
    totalMinted = tokenId;
    _owners[tokenId] = recipient;
    balanceOf[recipient] += 1;

    emit Transfer(address(0), recipient, tokenId);
    emit LocalNftMinted(recipient, tokenId, tokenURI(tokenId));
  }

  function ownerOf(uint256 tokenId) public view returns (address) {
    address owner = _owners[tokenId];

    if (owner == address(0)) {
      revert TokenNotMinted();
    }

    return owner;
  }

  function tokenURI(uint256 tokenId) public view returns (string memory) {
    ownerOf(tokenId);

    return string(abi.encodePacked(baseTokenUri, _toString(tokenId)));
  }

  function _toString(uint256 value) private pure returns (string memory) {
    if (value == 0) {
      return "0";
    }

    uint256 digits;
    uint256 remaining = value;

    while (remaining != 0) {
      digits += 1;
      remaining /= 10;
    }

    bytes memory buffer = new bytes(digits);

    while (value != 0) {
      digits -= 1;
      buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
      value /= 10;
    }

    return string(buffer);
  }
}
