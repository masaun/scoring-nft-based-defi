const StakingToken = artifacts.require("./StakingToken.sol");

module.exports = function(deployer, network, accounts) {
    const name = "Staking Token";
    const symbol = "SKT";
    const decimals = 18;
    //const initSupply = 10000e18;                               // 100 ether
    const initSupply = web3.utils.toBN(100 * (10 ** decimals));  // 100 ether
    
    return deployer.then(() => {
        return deployer.deploy(
            StakingToken,
            name,
            symbol,
            decimals,
            initSupply
        );
    });
}
