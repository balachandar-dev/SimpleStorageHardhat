const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    // console.log("deploying")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()

    console.log("deployed at", simpleStorage.target)

    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        simpleStorage.deploymentTransaction(6)
        await verify(simpleStorage.target, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value : ${currentValue}`)

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`updated value : ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("verifying")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified")
        }
        console.error("verification failed", e)
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(0)
    })
