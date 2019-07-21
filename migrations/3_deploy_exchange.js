const Exchange = artifacts.require("./Exchange.sol");
const TradeERC721Token = artifacts.require("./TradeERC721Token.sol");

// Seller Address which is called when it execute constructor
const _seller = "0x80854256dabb71b5a93bda8e66694d3c2403d68e";

// ERC721 Token 
const _name = "Asset Exchange Token";
const _symbol = "AET";
//const _tokenId = 0;
//const _tokenId = 1;   // count of tokenId start from 1

// 
const _proxyRegistryAddress = "0xd367aece1df7a605fac835c671b4e06a0d9a076a";

// For test of storage（bytes32）
proposalNames = ['0xcfe24a01316a34949a93e102bcb0b8ab18510b28c9a19d1fc506ffc32847e276']


module.exports = function(deployer) {
  // Deploy
  deployer.deploy(Exchange, _seller, _name, _symbol, _proxyRegistryAddress, proposalNames);
  //deployer.deploy(Exchange, _seller, _name, _symbol, _tokenId, _proxyRegistryAddress, proposalNames);

  // Debug
  console.log('=== deployer, _seller, _name, _symbol, _proxyRegistryAddress, proposalNames ===', deployer, _seller, _name, _symbol, _proxyRegistryAddress, proposalNames);
  //console.log('=== deployer, _seller, _name, _symbol, _tokenId, _proxyRegistryAddress, proposalNames ===', deployer, _seller, _name, _symbol, _tokenId, _proxyRegistryAddress, proposalNames);
};
