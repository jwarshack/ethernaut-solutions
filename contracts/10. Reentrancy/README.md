# Reentrancy

To beat thie level we have to steal all the funds of the smart contract.

```
  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }
```

The `withdraw` function is vulnerable to a **Reentrancy attack**. A reentrancy attack is usually triggered by a malicious external smart contract.  The malicious contract calls a function on the unsuspecting contract, which then triggers another function on the malicious contract.  

## How to hack it

Notice how the balance of `msg.sender` is updated after the ether has been transferred:
```
balances[msg.sender] -= _amount;
```

We will use a `receive` function to exploit this. When we call `withdraw` from the malicious contract, it will trigger our `receive` function before the balance is updated. 

At this point, the contract still believes our balance is what it was originally even though we have removed ether. Our `receive` function contains logic that will once again call `withdraw`. We have successfully, reentered the function. We have just repeatedly withdrew ether in a single transaction and our balance has not been updated.

In this case, we want to call `withdraw` from another contract. When 

## How to avoid this hack

Making use of a `lock` can protect your smart contracts funds.

```
bool lock = 0;

function doSomething() public {
  require(lock == 0, "Function has been entered");
  lock = 1; // Set lock equal to 1, so would fail on reentrance

  // More code here...

  lock = 0; // Set lock back to 0
}
```

Basically, you have a variable that increments as soon as a function is entered and then decrements after running. Before execution you check that the variable has not been incremented.

Open Zeppelin has a module called **Reentrancy Guard** that protects your contracts from reentrancy attacks.