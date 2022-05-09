# Telephone

To beat this level we have to claim ownership of the contract.

```
  function changeOwner(address _owner) public {
    if (tx.origin != msg.sender) {
      owner = _owner;
    }
  }
  ```

This function checks if `tx.origin` is not equal to `msg.sender` and then assigns a new owner.

We have to understand the difference between `tx.origin` and `msg.sender`.

`tx.origin` and `msg.sender` are both global address variables. The main difference is that `tx.origin` is the address of the account that created the transaction, while `msg.sender` is the address of the account that invokes a smart contract function.  `tx.origin` is always the address of an external account while `msg.sender` can be the address of an intermediary contract.

# How to hack it

We have to create a transaction that makes `tx.origin` not equal to `msg.sender`

To do this we need to call the `changeOwner` function from an intermediary smart contract.

**Take a look at TelephoneAttacker.sol to see how to call the function from another smart contract**


