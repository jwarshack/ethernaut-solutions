# Gatekeeper One

To be this level, we have to pass three access modifiers (gates)

```
 modifier gateOne() {
    require(msg.sender != tx.origin);
    _;
  }
```
The first gate checks to see that `msg.sender` is not equal to `tx.origin`.  This means we will have to be calling this function from an external smart contract.

```
  modifier gateTwo() {
    require(gasleft().mod(8191) == 0);
    _;
  }

```

Gate Two checks that the modulus of `gasleft()` is equal to **8191.**

```
  modifier gateThree(bytes8 _gateKey) {
      require(uint32(uint64(_gateKey)) == uint16(uint64(_gateKey)), "GatekeeperOne: invalid gateThree part one");
      require(uint32(uint64(_gateKey)) != uint64(_gateKey), "GatekeeperOne: invalid gateThree part two");
      require(uint32(uint64(_gateKey)) == uint16(tx.origin), "GatekeeperOne: invalid gateThree part three");
    _;
  }
```

Gate Three is a bit of a doozy. We need to pass a `bytes8` value 