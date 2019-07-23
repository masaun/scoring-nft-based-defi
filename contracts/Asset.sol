pragma solidity ^0.5.0;

/* @notice Using OpenZeppelin-solidity v2.1.1 */
//import "./openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
import "./TradeERC721Token.sol";


contract Asset is TradeERC721Token {

    constructor(
        string memory name,
        string memory symbol,
        address proxyRegistryAddress
    )
        public
        TradeERC721Token(name, symbol, proxyRegistryAddress)  // Assign value to constructor of TradeERC721Token.sol
    {
        // in progress
    }


    
}
