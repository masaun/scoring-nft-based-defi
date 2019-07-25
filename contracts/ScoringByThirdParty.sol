pragma solidity ^0.5.0;

/* @notice Using OpenZeppelin-solidity v2.1.1 */
import "./@daostack/arc/contracts/votingMachines/VotingMachineCallbacks.sol";


contract ScoringByThirdParty is VotingMachineCallbacks {

    constructor(
        // in progress
    )
        public
        VotingMachineCallbacks()  // Assign value to constructor of VotingMachineCallbacks.sol
    {
        // in progress
    }


    function getTotalReputationSupply(bytes32 _proposalId) public view returns (uint256) {
        return VotingMachineCallbacks(this).getTotalReputationSupply(_proposalId);
    }
    

}
