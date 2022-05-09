# Force

To beat this level we have to make the contract's ether balance greater than 0.

This is the most useless smart contract in the world... It does absolutely nothing. It has no functions and can't even receive ether. 

Or can it?

If a smart contract does not have a `receive()` or `fallback()` there is one other way we can send it ether: `selfdestruct`

`selfdestruct` is an opcode that allows a contract to essentially be deleted from the blockchain. It removes all the bytecode from the contract, and makes it so the contract can be no longer interacted with.

It also sends the self-destructing contract's ether balance to an address specified in the `selfdestruct` call.

## How to hack it

We have to write a smart contract that is able to self-destruct and force the ether into this level's contract.

**Take a look at ForceAttacker.sol to see how to build this contract**