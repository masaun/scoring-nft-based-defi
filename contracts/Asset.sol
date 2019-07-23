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


    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param _to address of the future owner of the token
     */
    function mintTo(address _to) public onlyOwner {
    }


    /**
     * @dev calculates the next token ID based on value of _currentTokenId 
     * @return uint256 for the next token ID
     */
    function _getNextTokenId() private view returns (uint256) {
    }
    

    function baseTokenURI() public view returns (string memory) {
    }

    function tokenURI(uint256 _tokenId) public view returns (string memory) {
    );

}
