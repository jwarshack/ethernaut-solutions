# Fallout

To beat this level we have to claim ownership of the contract.

```
  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

```

Notice how the constructor function isn't declared using the `constructor` keyword

A constructor function is a function that is only called once upon deployment of the contract.

In older versions of Solidity (<0.4.24), the `constructor` keyword didn't exist and it was practice to name the contstructor function after the name of the contract.

*Note: In later versions of Solidity, you are not able to have a function with the same name as a contract*

## How to hack it

If you look closely, you will notice that this contract's constructor function isn't spelled correctly. This function does not act like a constructor function and is actually callable since it is `public`.

**Take a look at test/2.fallout.test.js to see exactly how to complete this level**