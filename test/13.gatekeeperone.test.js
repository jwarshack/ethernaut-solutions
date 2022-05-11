const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Gatekeeper One", function () {
  it("Should pass all gates", async function () {
    const [_, eoa] = await ethers.getSigners()

    const Contract = await ethers.getContractFactory("GatekeeperOne")
    const contract = await Contract.deploy()

    const Attacker = await ethers.getContractFactory("GatekeeperOneAttacker")
    const attacker = await Attacker.deploy(contract.address)

    await attacker.connect(eoa).execute()
  });
});
