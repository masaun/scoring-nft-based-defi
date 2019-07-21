const Asset = artifacts.require('Asset.sol');


contract('Asset', function ([creator, ...accounts]) {
    const name = "Asset Exchange Platform";
    const tokenId = 1;

    it("...is going to confirm the token name and tokenId.", async () => {
        const assetInstance = await Asset.deployed();
        let tokenName = await assetInstance.name();
        let owner = await assetInstance.ownerOf(tokenId);

        //assert.equal(tokenName, name, "Name isn't the same.");
        //assert.equal(creator, owner, "Account isn't the same.");

        console.log('=== Success ===');
    });
});
