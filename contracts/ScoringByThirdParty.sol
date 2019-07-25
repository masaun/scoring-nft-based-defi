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


    function _getTotalReputationSupply(bytes32 _proposalId) public view returns (uint256) {
        return VotingMachineCallbacks(this).getTotalReputationSupply(_proposalId);
    }
    


    function _balanceOfStakingToken(IERC20 _stakingToken, bytes32 _proposalId) public view returns(uint256) {
        return VotingMachineCallbacks(this).balanceOfStakingToken(_stakingToken, _proposalId);
    }




    function _mintReputation(uint256 _amount, address _beneficiary, bytes32 _proposalId) public returns (bool) {
        return VotingMachineCallbacks(this).mintReputation(_amount, _beneficiary,  _proposalId);
    }


    function _stakingTokenTransfer(
        IERC20 _stakingToken,
        address _beneficiary,
        uint256 _amount,
        bytes32 _proposalId
    ) public returns (bool)
    {
        return VotingMachineCallbacks(this).stakingTokenTransfer(_stakingToken, _beneficiary, _amount, _proposalId);
    }

}
