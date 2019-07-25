const EscrowPayment = artifacts.require("./EscrowPayment.sol");


module.exports = async(deployer, network, accounts) => {
    await deployer.deploy(EscrowPayment);
};
