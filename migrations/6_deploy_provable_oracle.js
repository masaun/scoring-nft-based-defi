const ProvableOracle = artifacts.require("./ProvableOracle.sol");
//const usingOraclize = artifacts.require("./usingOraclize.sol");

let sampleAddress = '0x0000000000000000000000000000000000000000'

module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(ProvableOracle, sampleAddress);
};
