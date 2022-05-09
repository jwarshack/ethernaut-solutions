const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Telephone", function () {
  it("Should claim ownership", async function () {
    const [_, eoa] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Telephone")
    const contract = await Contract.deploy()
    await contract.deployed()

    const Attacker = await ethers.getContractFactory("TelephoneAttacker")
    const attacker = await Attacker.deploy(contract.address) // pass in Telephone address to constructor
    await attacker.deployed()

    // Call `changeOwner` from the attacker contract which passes in our address
    await attacker.connect(eoa).attack()

    // Check if we are now the owner
    expect(await contract.owner()).to.equal(eoa.address)
    
  });
});
