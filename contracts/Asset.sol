pragma solidity ^0.5.0;

/* @notice Using OpenZeppelin-solidity v2.1.1 */
import "./openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol";


contract Asset is ERC721Full {
    constructor(
        string memory name,
        string memory symbol,
        uint tokenId,
        string memory tokenURI
    )
        ERC721Full(name, symbol)
        public
    {
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
}



