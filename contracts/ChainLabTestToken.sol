// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ChainLabTestToken {
  string public constant name = "ChainLab Local Test Token";
  string public constant symbol = "CLT";
  uint8 public constant decimals = 18;

  address public immutable owner;
  uint256 public totalSupply;

  mapping(address account => uint256 balance) public balanceOf;
  mapping(address account => mapping(address spender => uint256 allowance)) public allowance;

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);

  error NotOwner();
  error InvalidRecipient();
  error InsufficientBalance();
  error InsufficientAllowance();

  constructor() {
    owner = msg.sender;
  }

  function mint(address to, uint256 amount) external {
    if (msg.sender != owner) {
      revert NotOwner();
    }

    if (to == address(0)) {
      revert InvalidRecipient();
    }

    totalSupply += amount;
    balanceOf[to] += amount;

    emit Transfer(address(0), to, amount);
  }

  function transfer(address to, uint256 amount) external returns (bool) {
    _transfer(msg.sender, to, amount);
    return true;
  }

  function approve(address spender, uint256 amount) external returns (bool) {
    allowance[msg.sender][spender] = amount;

    emit Approval(msg.sender, spender, amount);

    return true;
  }

  function transferFrom(address from, address to, uint256 amount) external returns (bool) {
    uint256 currentAllowance = allowance[from][msg.sender];

    if (currentAllowance < amount) {
      revert InsufficientAllowance();
    }

    allowance[from][msg.sender] = currentAllowance - amount;
    _transfer(from, to, amount);

    return true;
  }

  function _transfer(address from, address to, uint256 amount) internal {
    if (to == address(0)) {
      revert InvalidRecipient();
    }

    if (balanceOf[from] < amount) {
      revert InsufficientBalance();
    }

    balanceOf[from] -= amount;
    balanceOf[to] += amount;

    emit Transfer(from, to, amount);
  }
}
