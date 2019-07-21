pragma solidity ^0.5.0;
//pragma solidity >=0.4.18 <0.7.0;
//pragma solidity 0.4.18;


import "./ERC20Interface.sol";


/// @title Kyber Network interface
interface KyberNetworkInterface {
    function maxGasPrice() external view returns(uint);
    function getUserCapInWei(address user) external view returns(uint);
    function getUserCapInTokenWei(address user, ERC20 token) external view returns(uint);
    function enabled() external view returns(bool);
    function info(bytes32 id) external view returns(uint);

    function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) external view
        returns (uint expectedRate, uint slippageRate);

    function tradeWithHint(address trader, ERC20 src, uint srcAmount, ERC20 dest, address payable destAddress,
        uint maxDestAmount, uint minConversionRate, address walletId, bytes calldata hint) external payable returns(uint);

    // function maxGasPrice() public view returns(uint);
    // function getUserCapInWei(address user) public view returns(uint);
    // function getUserCapInTokenWei(address user, ERC20 token) public view returns(uint);
    // function enabled() public view returns(bool);
    // function info(bytes32 id) public view returns(uint);

    // function getExpectedRate(ERC20 src, ERC20 dest, uint srcQty) public view
    //     returns (uint expectedRate, uint slippageRate);

    // function tradeWithHint(address trader, ERC20 src, uint srcAmount, ERC20 dest, address destAddress,
    //     uint maxDestAmount, uint minConversionRate, address walletId, bytes memory hint) public payable returns(uint);
}
