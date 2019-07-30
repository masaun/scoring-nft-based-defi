pragma solidity ^0.5.0;

/* @notice Using OpenZeppelin-solidity v2.1.1 */
import "./openzeppelin-solidity/contracts/payment/escrow/Escrow.sol";



contract EscrowPayment is Escrow {
    constructor(
    )
        public
    {
        // in progress
    }


    function escrowDepositsOf(address payee) public view returns (uint256) {
        depositsOf(payee);
    }

    /**
    * @dev Stores the sent amount as credit to be withdrawn.
    * @param payee The destination address of the funds.
    */
    function escrowDeposit(address payee) public onlyPrimary payable {
        deposit(payee);
    }

    /**
    * @dev Withdraw accumulated balance for a payee.
    * @param payee The address whose funds will be withdrawn and transferred to.
    */
    function escrowWithdraw(address payable payee) public onlyPrimary {
        withdraw(payee);
    }


    /*** Function for test ***/ 
    function test() public returns (string memory) {
        string memory test = 'test';

        return test;
    }
    
}
