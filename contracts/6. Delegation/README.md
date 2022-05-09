# Delegation 

To beat this level we have to claim ownership of the `Delegate` contract.

There are two smart contracts `Delegate` and `Delegation`. `Delegate` contains a function called `pwn()` that assigns the caller to `owner`. Sounds easy right? Just call this function and we will be the owner.

Unfortunately, we want to claim ownership of the `Delegation` contract, not the `Delegate` contract.

```
  fallback() external {
    (bool result,) = address(delegate).delegatecall(msg.data);
    if (result) {
      this;
    }
  }
```

In the `Delegation` contract there is a fallback function that uses `delegatecall()` to trigger a function on the `Delegate` contract. 

### What is `delegatecall`?

`delegatecall` is similar to `call` in that it is a way to trigger execution of a function on an external smart contract. The difference between the two of them is how the 