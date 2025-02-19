const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Verify the initial value is 0", async function () {
        const expectedValue = "0"
        const actualValue = await simpleStorage.retrieve()
        assert.equal(expectedValue, actualValue.toString())
    })

    // it.only() -> tests only one test

    it("Verify whether value gets updated", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(expectedValue, currentValue.toString())
    })
})
