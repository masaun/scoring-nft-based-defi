const Asset = artifacts.require("./Asset.sol");

module.exports = async(deployer, network, accounts) => {
    const name = "Asset Exchange Token";
    const symbol = "AET";
    const tokenId = 1;
    const tokenURI = "https://ipfs.io/ipfs/QmNgJ5tGRDNmXQyQQrehQBJWJXhQ6iPXazbiCrEc6odUHg";

    await deployer.deploy(
        Asset,
        name,
        symbol,
        tokenId,
        tokenURI,
        {from: accounts[0]}
    );
};
