const { ethers } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()

    console.log("deployed at", simpleStorage.target)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(0)
    })
