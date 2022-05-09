# Dex Two

To beat this level we have to drain all balances of token1 and token2.


```
  function swap(address from, address to, uint amount) public {
    require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
    uint swap_amount = get_swap_amount(from, to, amount);
    IERC20(from).transferFrom(msg.sender, address(this), amount);
    IERC20(to).approve(address(this), swap_amount);
    IERC20(to).transferFrom(address(this), msg.sender, swap_amount);
  }
  ```

  Notice how the `swap` function doesn't check if `from` and `to` are the same addresses of `token1` and `token2`.

  Because of this we are able to swap any arbitrary token.

  ## How to hack it

  Let's deploy our own malicious token to mess with the swap price.

  We can use an instance of `SwappableToken` and mint 100 to ourselves. 

  Now we approve and call `add_liquidity` on the dex contract passing in our malicious token's address and an amount of 1.

  *We need to add liquidity or else the dex contract will error because it tries to divide by 0*

  Now swap a small amount of malicious token for all of token1.

  Repeat steps for token2.

  **Take a look at test/23.dextwo.test.js to see it in action**