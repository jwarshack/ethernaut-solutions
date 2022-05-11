const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Puzzle Wallet", function () {
  it("Should become admin of wallet", async function () {
    const [_, eoa] = await ethers.getSigners()

    const PuzzleWallet = await ethers.getContractFactory("PuzzleWallet")
    const proxy = await upgrades.deployProxy(PuzzleWallet, [])




    
  });
});
