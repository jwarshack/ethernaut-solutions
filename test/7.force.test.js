const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Force", function () {
  it("Should make contract's balance greater than 0", async function () {
    const [_, eoa] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Force")
    const contract = await Contract.deploy()
    await contract.deployed()

    const Attacker = await ethers.getContractFactory("ForceAttacker")
    const attacker = await Attacker.deploy()
    await attacker.deployed()

    // Fund attacker contract
    await eoa.sendTransaction({
      to: attacker.address,
      from: eoa.address,
      value: ethers.utils.parseEther('1')
    })

    // Call function to self destruct and send ether to `Force`
    await attacker.attack(contract.address)

    // Contracts balance should be 1 ether
    expect(await contract.provider.getBalance(contract.address)).to.equal(ethers.utils.parseEther('1'))
    
  });
});
