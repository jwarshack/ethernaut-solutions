# Fallback

To beat this level we have to:
1. Claim ownership of the contract
2. Reduce the balance to zero

```
  function contribute() public payable {
    require(msg.value < 0.001 ether);
    contributions[msg.sender] += msg.value;
    if(contributions[msg.sender] > contributions[owner]) {
      owner = msg.sender;
    }
  }
  ```
  Notice that we can send ether to the contract by calling the `contribute()` function. We will be assigned the role of owner when our contribution balance is greater than that of the current owner.

  Unfortunately the current owner's balance is 1000 ether and we are only allowed to send < 0.001 ether at a time.

   `require(msg.value < 0.001 ether);`

  Luckily there are other ways a contract can receive ether:

  1. `fallback()`
  2. `receive()`

  Fallback and receive are similar in that they enable a smart contract to receive ether but are triggered by different types of transactions.

  - `fallback()` is triggered when a transaction is sent to a contract that contains a data field

  - `receive()` is triggered when a transaction is sent to a contract that contains an empty data field

  To call a function on a smart contract, a transaction is sent containing 4 bytes of data. The 4 bytes tell the contract which function to call. If a transaction is sent with telling the contract to call a function that doesn't exist, it will 'fallback' and trigger the `fallback()` function

  Here are other some distinguishing features of `fallback()` vs `receive()`:

  - If a contract only has a `receive()` function any transacition with a non-empty data field will fail

  - If a contract only has a `fallback()` function, it will still be triggered when called by a transaction with a non-empty data field


## Now to hack it

Notice that the contract does have a `receive()` function:
```
  receive() external payable {
    require(msg.value > 0 && contributions[msg.sender] > 0);
    owner = msg.sender;
  }
  ```
If we can send a transaction containing a ether value greater than 0 and our contribution balance is greater than 0, we will be the new owner.

**Take a look at test/1.fallback.test.js to see exactly how to complete this level**
