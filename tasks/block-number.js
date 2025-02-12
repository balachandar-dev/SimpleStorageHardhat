const { task } = require("hardhat/config")

task("block-number", "print current block number").setAction(
    async (currentArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    },
)
