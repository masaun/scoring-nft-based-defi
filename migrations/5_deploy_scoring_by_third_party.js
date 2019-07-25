const ScoringByThirdParty = artifacts.require("./ScoringByThirdParty.sol");
const StakingToken = artifacts.require("./StakingToken.sol");

const _stakingToken = StakingToken.address;

module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(
        ScoringByThirdParty,
        _stakingToken
    );
};
