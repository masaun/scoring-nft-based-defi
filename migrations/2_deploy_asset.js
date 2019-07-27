const Asset = artifacts.require("./Asset.sol");

module.exports = async(deployer, network, accounts) => {
    //const name = "Asset Exchange Token";
    //const symbol = "AET";
    //const proxyRegistryAddress = "0x555e57c4762137241941620f086082569d6b0116";

    const _proxyRegistryAddress = "0x555e57c4762137241941620f086082569d6b0116";
    const _nftAddress = "0x7b904de0defb041f406a2eaa7be3a26efabc7193"

    await deployer.deploy(
        Asset,
        //name,
        //symbol,
        _proxyRegistryAddress,
        _nftAddress,
        {from: accounts[0]}
    );
};
