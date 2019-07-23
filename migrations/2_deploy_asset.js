const Asset = artifacts.require("./Asset.sol");

module.exports = async(deployer, network, accounts) => {
    const name = "Asset Exchange Token";
    const symbol = "AET";
    const proxyRegistryAddress = "0x555e57c4762137241941620f086082569d6b0116";

    await deployer.deploy(
        Asset,
        name,
        symbol,
        proxyRegistryAddress,
        {from: accounts[0]}
    );
};
