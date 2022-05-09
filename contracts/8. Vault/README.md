# Vault

To beat this level we have to unlock the vault.

```
  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
  ```

We need to call the unlock function and pass it a password that will set locked to false.

The problem is the password is marked `private` and we are unable to know what it is.


## How to hack it

Even though the password is private, all data on the blockchain is accessible. Access modifiers should not be used to hide secret information.

A smart contract's storage can be viewed as an array of 

Storage values are added to this array in the order they are declared. 

 ``` 
  bool public locked;
  bytes32 private password;
  ```

In this contract, `locked` is at slot 0 and `password` is at slot 1.

**Take a look at test/8.password.test.js to see how to get the storage at slot 1**