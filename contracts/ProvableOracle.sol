pragma solidity ^0.5.0;

import "./Provable.sol";


contract ProvableOracle is usingOraclize {

    constructor(address sampleAddress) public {}

    function getPriceViaProvable()
        public
        payable
    {
        oraclize_query(
            "URL",
            "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=ETH,USD,EUR"
        );
    }
    
}
