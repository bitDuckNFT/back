const utils = require("./helpers/utils");
const CryptoZombies = artifacts.require("ZombieOwnership");

const zombieNames = ["Zombie 1", "Zombie 2"];

contract("CryptoZombies Factory", (accounts) => {
    /**
     * PRE_SETS
     */
    /** dummy accounts from ganache **/
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await CryptoZombies.new();
    })

    context("Zombie Factory ", async () => {

        it("should be able to create a new zombie", async () => {
            const result = await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
            let { name: resultName, _dna: resultDna, id } = result.logs[0].args;
            assert.equal(result.receipt.status, true);
            assert.equal(resultName, zombieNames[0])
        })
        it("should not allow two zombies", async () => {

            const result = await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
            let { name: resultName } = result.logs[0].args;
            assert.equal(result.receipt.status, true);
            assert.equal(resultName, zombieNames[0])
            await utils.shouldThrow(contractInstance.createRandomZombie(zombieNames[1], { from: alice }));
        })
        context("with the single-step transfer scenario", async () => {
            it("should transfer a zombie", async () => {
                // alice createZombie and test alice is owner
                const result = await contractInstance.createRandomZombie(zombieNames[0], { from: alice })
                let zombieId = result.logs[0].args.zombieId.toNumber();
                assert.equal(result.receipt.status, true)
                //transfer from alice to bob ordered by alice
                await contractInstance.transferFrom(alice, bob, zombieId, { from: alice });
                // newOwner is the response to zombiesOwner
                const newOwner = await contractInstance.ownerOf(zombieId);
                assert.equal(newOwner, bob);
            })
        })

        context("with the two-step transfer scenario", async () => {
            it("should approve and then transfer a zombie when the approved address calls transferFrom", async () => {
                const result = await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
                const zombieId = result.logs[0].args.zombieId.toNumber();
                // aprove
                await contractInstance.approve(bob, zombieId, { from: alice });
                await contractInstance.transferFrom(alice, bob, zombieId, { from: bob });
                const newOwner = await contractInstance.ownerOf(zombieId);
                assert.equal(newOwner, bob);

            })




            it("should approve and then transfer a zombie when the owner calls transferFrom", async () => {
                const result = await contractInstance.createRandomZombie(zombieNames[0], { from: alice });
                const zombieId = result.logs[0].args.zombieId.toNumber();
                // aprove
                await contractInstance.approve(bob, zombieId, { from: alice });
                await contractInstance.transferFrom(alice, bob, zombieId, { from: alice });
                const newOwner = await contractInstance.ownerOf(zombieId);
                assert.equal(newOwner, bob);
            })
        })
    })

})
