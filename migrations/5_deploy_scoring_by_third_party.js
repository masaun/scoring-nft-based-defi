const ScoringByThirdParty = artifacts.require("./ScoringByThirdParty.sol");

module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(
        ScoringByThirdParty
    );
};
