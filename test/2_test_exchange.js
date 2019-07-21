const Exchange = artifacts.require('Exchange.sol');


contract('Exchange', function (accounts) {

    it('Execute listingRegister function', async () => {
        const accounts = await web3.eth.getAccounts();

        // Value of argument for test
        const _ownerAddr = "0xc37a76a5f5de0adc1554f107f13d3c0c29e45514";
        const _energyType = "Solor Power";
        const _price = 1000;

        // Execute function
        const contract = await new web3.eth.Contract(Exchange.abi, Exchange.address);
        const response = await contract.methods.listingRegister(_ownerAddr, _energyType, _price).send({ from: accounts[0], gas: 3000000 });

        // Debug
        console.log('=== response of listingRegister function ===', response);  // Result: 

        const event = response.events.ListingRegister.returnValues.ownerAddr;
        console.log('=== Check event value of addr of listingRegister function ===', event);  // Result: OK
    })


    it('Execute listingDetail function', async () => {
        // Value of argument for test
        const _ownerAddr = "0xc37a76a5f5de0adc1554f107f13d3c0c29e45514";
        const _energyType = "Solor Power";
        const _price = 1000;

        const accounts = await web3.eth.getAccounts();

        // Execute function
        const contract = await new web3.eth.Contract(Exchange.abi, Exchange.address);

        // Get tokenId（count of tokenId start from 1）
        const res = await contract.methods.listingRegister(_ownerAddr, _energyType, _price).send({ from: accounts[0], gas: 3000000 });
        const _tokenId = res.events.ListingRegister.returnValues.tokenId;
        //const _tokenId = 1;    // count of tokenId start from 1
        //const _tokenId = 0;
        console.log('=== tokenId of ListingRegister event ===', _tokenId);  // Result: OK


        const response = await contract.methods.listingDetail(_tokenId).call();

        // Debug
        console.log('=== response of listingDetail function ===', response);
        console.log(response[0]);  // 0xC37A76A5f5DE0adC1554f107F13D3c0c29e45514
        console.log(response[1]);  // Solor Power
        console.log(response[2]);  // 1562178281
        console.log(response[3]);  // 1000
    })




    it('Execute delegate function', async () => {
        const accounts = await web3.eth.getAccounts();

        const _to = "0x8c43b7f99eea463ff39d839731a87c02abc0b591";

        // Execute function
        const contract = await new web3.eth.Contract(Exchange.abi, Exchange.address);
        const response = await contract.methods.delegate(_to).send({ from: accounts[0], gas: 3000000 });

        // Debug
        console.log('=== response of delegate function ===', response);  // Result: 
    })
});


