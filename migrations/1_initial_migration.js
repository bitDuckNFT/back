const ZombieFactory = artifacts.require("ZombieFactory");
const ZombieFeeding = artifacts.require("ZombieFeeding");
const ZombieHelper = artifacts.require("ZombieHelper");
const ZombieOwnership = artifacts.require("ZombieOwnership");



module.exports = function (deployer) {

  deployer.deploy(ZombieFactory)
  deployer.deploy(ZombieFeeding)
  deployer.deploy(ZombieHelper)
  deployer.deploy(ZombieOwnership)

};
