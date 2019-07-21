pragma solidity 0.4.18;
//pragma solidity ^0.5.0;


import "./KyberNetwork/ERC20Interface.sol";
//import "./ERC20Interface.sol";
import "./KyberNetwork/KyberNetworkProxy.sol";
//import "./KyberNetworkProxy.sol";


contract KyberExapmle {
    //It is possible to take minRate from kyber contract, but best to get it as an input from the user.

    ERC20 constant internal ETH_TOKEN_ADDRESS = ERC20(0x00eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee);

    event SwapTokenChange(uint balanceBefore, uint balanceAfter, uint change);
    event SwapEtherChange(uint startBalance, uint currentBalance, uint change);

    //must have default payable since this contract expected to receive change
    function() public payable {}


    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param srcToken source token contract address
    //@param srcQty in token wei
    //@param destToken destination token contract address
    //@param destAddress address to send swapped tokens to
    function swapTokenToToken (KyberNetworkProxyInterface _kyberNetworkProxy, ERC20 srcToken, uint srcQty, ERC20 destToken, address destAddress) public {
        uint minRate;

        //getExpectedRate returns expected rate and slippage rate
        //we use the slippage rate as the minRate
        (, minRate) = _kyberNetworkProxy.getExpectedRate(srcToken, destToken, srcQty);

        // Check that the token transferFrom has succeeded
        require(srcToken.transferFrom(msg.sender, this, srcQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(srcToken.approve(_kyberNetworkProxy, 0));

        // Approve tokens so network can take them during the swap
        srcToken.approve(address(_kyberNetworkProxy), srcQty);
        uint destAmount = _kyberNetworkProxy.swapTokenToToken(srcToken, srcQty, destToken, minRate);

        // Send received tokens to destination address
        require(destToken.transfer(destAddress, destAmount));
    }


    //@dev assumed to be receiving ether wei
    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param token destination token contract address
    //@param destAddress address to send swapped tokens to
    function swapEtherToToken (KyberNetworkProxyInterface _kyberNetworkProxy, ERC20 token, address destAddress) public payable {

        uint minRate;
        (, minRate) = _kyberNetworkProxy.getExpectedRate(ETH_TOKEN_ADDRESS, token, msg.value);

        //will send back tokens to this contract's address
        uint destAmount = _kyberNetworkProxy.swapEtherToToken.value(msg.value)(token, minRate);

        //send received tokens to destination address
        require(token.transfer(destAddress, destAmount));
    }


    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param token source token contract address
    //@param tokenQty token wei amount
    //@param destAddress address to send swapped ETH to
    function swapTokenToEther (KyberNetworkProxyInterface _kyberNetworkProxy, ERC20 token, uint tokenQty, address destAddress) public {

        uint minRate;
        (, minRate) = _kyberNetworkProxy.getExpectedRate(token, ETH_TOKEN_ADDRESS, tokenQty);

        // Check that the token transferFrom has succeeded
        require(token.transferFrom(msg.sender, this, tokenQty));

        // Mitigate ERC20 Approve front-running attack, by initially setting
        // allowance to 0
        require(token.approve(_kyberNetworkProxy, 0));

        // Approve tokens so network can take them during the swap
        token.approve(address(_kyberNetworkProxy), tokenQty);
        uint destAmount = _kyberNetworkProxy.swapTokenToEther(token, tokenQty, minRate);

        // Send received ethers to destination address
        require(destAddress.transfer(destAmount));
    }


    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param srcToken source token contract address
    //@param srcQty in token wei
    //@param destToken destination token contract address
    //@param destAddress address to send swapped tokens to
    //@param maxDestQty max number of tokens in swap outcome. will be sent to destAddress
    //@param minRate minimum conversion rate for the swap
    function swapTokenToTokenWithChange (
        KyberNetworkProxyInterface _kyberNetworkProxy,
        ERC20 srcToken,
        uint srcQty,
        ERC20 destToken,
        address destAddress,
        uint maxDestQty,
        uint minRate
    )
        public
    {
    uint beforeTransferBalance = srcToken.balanceOf(this);

    // Check that the token transferFrom has succeeded
    require(srcToken.transferFrom(msg.sender, this, srcQty));

    // Mitigate ERC20 Approve front-running attack, by initially setting
    // allowance to 0
    require(srcToken.approve(_kyberNetworkProxy, 0));

    // Approve tokens so network can take them during the swap
    srcToken.approve(address(_kyberNetworkProxy), srcQty);

    _kyberNetworkProxy.trade(srcToken, srcQty, destToken, destAddress, maxDestQty, minRate, 0);
    uint change = srcToken.balanceOf(this) - beforeTransferBalance;

    // Return any remaining source tokens to user
    srcToken.transfer(msg.sender, change);
    }


    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param token destination token contract address
    //@param destAddress address to send swapped tokens to
    //@param maxDestQty max number of tokens in swap outcome. will be sent to destAddress
    //@param minRate minimum conversion rate for the swap
    function swapEtherToTokenWithChange (
        KyberNetworkProxyInterface _kyberNetworkProxy,
        ERC20 token,
        address destAddress,
        uint maxDestQty,
        uint minRate
    )
        public
        payable
    {
        //note that this.balance has increased by msg.value before the execution of this function
        uint startEthBalance = this.balance;

        //send swapped tokens to dest address. change will be sent to this contract.
        _kyberNetworkProxy.trade.value(msg.value)(ETH_TOKEN_ADDRESS, msg.value, token, destAddress, maxDestQty, minRate, 0);

        //calculate contract starting ETH balance before receiving msg.value (startEthBalance - msg.value)
        //change = current balance after trade - starting ETH contract balance (this.balance - (startEthBalance - msg.value))
        uint change = this.balance - (startEthBalance - msg.value);

        SwapEtherChange(startEthBalance, this.balance, change);

        //return change to msg.sender
        msg.sender.transfer(change);
    }


    //@param _kyberNetworkProxy kyberNetworkProxy contract address
    //@param token source token contract address
    //@param tokenQty token wei amount
    //@param destAddress address to send swapped tokens to
    //@param maxDestQty max number of tokens in swap outcome. will be sent to destAddress
    //@param minRate minimum conversion rate for the swap
    function swapTokenToEtherWithChange (
        KyberNetworkProxyInterface _kyberNetworkProxy,
        ERC20 token,
        uint tokenQty,
        address destAddress,
        uint maxDestQty,
        uint minRate
    )
        public
    {
    uint beforeTransferBalance = srcToken.balanceOf(this);

    // Check that the token transferFrom has succeeded
    require(token.transferFrom(msg.sender, this, tokenQty));

    // Mitigate ERC20 Approve front-running attack, by initially setting
    // allowance to 0
    require(token.approve(_kyberNetworkProxy, 0));

    // Approve tokens so network can take them during the swap
    token.approve(address(_kyberNetworkProxy), tokenQty);

    _kyberNetworkProxy.trade(token, tokenQty, ETH_TOKEN_ADDRESS, destAddress, maxDestQty, minRate, 0);
    uint change = srcToken.balanceOf(this) - beforeTransferBalance;

    // Return any remaining source tokens to user
    token.transfer(msg.sender, change);
    }
}
