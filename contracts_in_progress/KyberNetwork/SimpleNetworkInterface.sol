pragma solidity >=0.4.18 <0.7.0;
//pragma solidity 0.4.18;


import "./ERC20Interface.sol";


/// @title simple interface for Kyber Network 
interface SimpleNetworkInterface {
    function swapTokenToToken(ERC20 src, uint srcAmount, ERC20 dest, uint minConversionRate) external returns(uint);
    function swapEtherToToken(ERC20 token, uint minConversionRate) external payable returns(uint);
    function swapTokenToEther(ERC20 token, uint srcAmount, uint minConversionRate) external returns(uint);
    // function swapTokenToToken(ERC20 src, uint srcAmount, ERC20 dest, uint minConversionRate) public returns(uint);
    // function swapEtherToToken(ERC20 token, uint minConversionRate) public payable returns(uint);
    // function swapTokenToEther(ERC20 token, uint srcAmount, uint minConversionRate) public returns(uint);
}
