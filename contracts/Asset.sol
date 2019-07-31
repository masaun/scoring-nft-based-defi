pragma solidity ^0.5.0;

/* @notice Using OpenZeppelin-solidity v2.1.1 */
//import "./openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";
//import "./TradeERC721Token.sol";
//import "./TradeableERC721Token.sol";
import "./CreatureFactory.sol";


import "./Marketplace.sol";


contract Asset is CreatureFactory, Marketplace {

    address nftAddress;

    constructor(
        //string memory name,
        //string memory symbol,
        address _proxyRegistryAddress,
        address _nftAddress
    )
        public
        //TradeERC721Token(name, symbol, proxyRegistryAddress)  // Assign value to constructor of TradeERC721Token.sol
        //TradeableERC721Token(name, symbol, proxyRegistryAddress)  // Assign value to constructor of TradeERC721Token.sol
        CreatureFactory(_proxyRegistryAddress, _nftAddress)
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
        return "http://localhost:3000/exchange/";  // Specify URL
    }



    function getTokenURI(uint256 _tokenId) public view returns (string memory) {
        // [Note]： If it call external function, it must use "this" in front of function which is called
        return CreatureFactory(this).tokenURI(_tokenId);
        //return TradeERC721Token(this).tokenURI(_tokenId);
        //return TradeableERC721Token(this).tokenURI(_tokenId);
        //return this.tokenURI(_tokenId);
    }


    /////////// ------ Reference from CreatureFactory.sol ---------------------
    function _mint(uint256 _optionId, address _toAddress) public returns (bool) {
        //mint(_optionId, _toAddress);  
        CreatureFactory(this).mint(_optionId, _toAddress);
        return true;
    }


    /////////// ------ Reference from Marketplace.sol ---------------------
    function makeProduct(string memory _name, uint _price) public {
        createProduct(_name, _price);
    }

    function buyProduct(uint _id) public {
        purchaseProduct(_id);
    }
    
    
    
}
