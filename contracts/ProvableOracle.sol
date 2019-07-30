pragma solidity ^0.5.0;

import "./ProvableCrowdsale/Provable.sol";


contract ProvableOracle is usingOraclize {
    constructor(
    )
        public
    {
        // in progress
    }


    function getPriceViaProvable()
        public
        payable
    {
        return oraclize_query(
            "URL",
            "json(https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR).result.XETHZUSD.c.0"
        );
    }
    
}
