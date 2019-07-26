const Asset = artifacts.require("./Asset.sol");
//const CreatureFactory = artifacts.require("CreatureFactory.sol");

module.exports = async(deployer, network, accounts) => {
    const name = "Asset Exchange Token";
    const symbol = "AET";
    const proxyRegistryAddress = "0x555e57c4762137241941620f086082569d6b0116";
    const nftAddress = "0x0ee6fff6759f1027cd372486b9663e21d03d319b";
    //const nftAddress = CreatureFactory.address;

    await deployer.deploy(
        Asset,
        name,
        symbol,
        proxyRegistryAddress,
        nftAddress,
        {from: accounts[0]}
    );
};
