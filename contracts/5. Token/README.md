# Token

To beat this level we have to hack the contract to obtain a large amount of tokens.

We are given 20 tokens at the start.

```
  function transfer(address _to, uint _value) public returns (bool) {
    require(balances[msg.sender] - _value >= 0);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    return true;
  }
  ```

This is a simple function that checks to see if the sender owns the tokens they want to transfer, then deducts the amount from their balance and adds the amount to the receiver's balance. However it is subject to an **arithmetic overflow/underflow attack**.

An overflow/underflow attack is caused by the nature of uint256. A uint256 variable is an unsigned (only positive) integer that can hold up to 256 bits. A uint256 cannot be greater than 2<sup>256</sup>-1 and cannot not be less than 0.

When a uint256 surpasses its ceiling (2<sup>256</sup>-1) or goes below its floor (0), it will wrap around. For example if you subtract 1 from a uint256 that is initialized to 0, it will suddenly become (2<sup>256</sup>-1).

## How to hack it

If we attempt to transfer an amount of tokens greater than our current balance, we will cause an underflow.

Let's see what would happen if we tried to transfer 21 tokens:

`require(balances[msg.sender] - _value >= 0);`

We subtract 21 from 20 (`balances[msg.sender]`), which underflows to an insanly large number. This number is in fact greater than or equal to 0 so the check passes.

`balances[msg.sender] -= _value;`

Our balance is then deducted by 21, causing another underflow making our current balance the 2<sup>256</sup>-1.

## How to avoid this vulnerabiliy
This contract uses an older version of Solidity that does not check for overflow/underflows.

Upgrading to a verion >= 0.8.0 would avoid this vulnerability.

If upgrading is not an option, it is advised to use a library like Open Zeppelin's Safemath, which checks for overflows and underflows.



