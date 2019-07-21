pragma solidity ^0.5.0;

//import "./Asset.sol";  // Import Non Fungible Token（ERC721 Token）
import './TradeERC721Token.sol';
import './openzeppelin-solidity/contracts/ownership/Ownable.sol';



/**
 * The Exchange contract does this and that buy and sell
 */
contract Exchange is Ownable, TradeERC721Token {

    uint public tokenId;  // ID of ERC721 Token

    struct EnergyPower {
        address ownerAddr;
        string energyType;
        uint timestamp;
        uint price;
    }
    mapping(uint => EnergyPower) public powers;  // Success
    //EnergyPower[] public powers;               // Fail
    


    /////////////// ------------------------- [Original]： Buy / Sell and Listing -----------------------------------
    event ListingRegister(address ownerAddr, uint256 tokenId, string energyType, uint256 timestamp, uint256 price);

    function listingRegister(
        address _ownerAddr,
        string memory _energyType,
        uint256 _price
    ) public returns (
        address,
        uint256,
        string memory,
        uint256,
        uint256
    )
    {
        //uint256 _tokenId;

        EnergyPower storage power = powers[tokenId];
        power.ownerAddr = _ownerAddr;
        power.energyType = _energyType;
        power.timestamp = block.timestamp;
        power.price = _price;

        //_tokenId = tokenId;  // Increase NFT token's ID every time to register（@notice: count of tokenId start from 1
        tokenId++;

        //emit ListingRegister(_ownerAddr, _tokenId, _energyType, block.timestamp, _price);   // [Log]: Successful
        emit ListingRegister(_ownerAddr, tokenId, _energyType, block.timestamp, _price);  // [Log]: Successful

        //return (_ownerAddr, _tokenId, _energyType, block.timestamp, _price);
        return (_ownerAddr, tokenId, _energyType, block.timestamp, _price);
    }


    function listingIndex() public returns (bool) {
        return true;
        //return powers.length;
    }


    function listingDetail(uint256 tokenId) public view returns (address, string memory, uint256, uint256) {
        uint256 _tokenId;
        _tokenId = tokenId - 1;  // Because index number of list start from 0. Therefore, minus 1 add to tokenId.

        address _ownerAddr;
        string memory _energyType;
        uint256 _blockTimestamp;
        uint256 _price;

        EnergyPower memory power = powers[_tokenId];
        //EnergyPower memory power = powers[tokenId];
        _ownerAddr = power.ownerAddr;
        _energyType = power.energyType;
        _blockTimestamp = power.timestamp;
        _price = power.price;

        return (_ownerAddr, _energyType, _blockTimestamp, _price);
    }
    
    



    function Buy (address owner, uint256 tokenId) public returns (bool) {
        // in progress
        return true;

        // Todo: Users can buy any type of energy by any token by using kyber widgets 
    }


    function Sell (address owner, uint256 tokenId) public returns (bool) {
        // in progress
        return true;
    }



    /////////// ---------- Buy/Sell ------------------------------------------------- 

    uint public value;
    address payable public seller;
    address payable public buyer;

    enum State { 
        Created, 
        Locked, 
        Inactive 
    }
    State public state;

    // Ensure that `msg.value` is an even number.
    // Division will truncate if it is an odd number.
    // Check via multiplication that it wasn't an odd number.
    constructor(
        address payable _seller, 
        string memory _name, 
        string memory _symbol,
        //uint _tokenId,  // count of tokenId start from 1
        address _proxyRegistryAddress,
        bytes32[] memory proposalNames
    ) 
        TradeERC721Token(_name, _symbol, _proxyRegistryAddress) 
        public 
        payable 
    {
        seller = _seller;
        //seller = msg.sender;
        value = msg.value / 2;
        require((2 * value) == msg.value, "Value has to be even.");

        //tokenId = _tokenId;   // count of tokenId start from 1


        // [For test_:Create a new ballot to choose one of `proposalNames`.
        chairperson = msg.sender;
        voters[chairperson].weight = 1;

        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }



    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier onlyBuyer() {
        require(
            msg.sender == buyer,
            "Only buyer can call this."
        );
        _;
    }

    modifier onlySeller() {
        require(
            msg.sender == seller,
            "Only seller can call this."
        );
        _;
    }

    modifier inState(State _state) {
        require(
            state == _state,
            "Invalid state."
        );
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();

    /// Abort the purchase and reclaim the ether.
    /// Can only be called by the seller before
    /// the contract is locked.
    function abort()
        public
        onlySeller
        inState(State.Created)
    {
        emit Aborted();
        state = State.Inactive;
        seller.transfer(address(this).balance);
    }

    /// Confirm the purchase as buyer.
    /// Transaction has to include `2 * value` ether.
    /// The ether will be locked until confirmReceived
    /// is called.
    function confirmPurchase()
        public
        inState(State.Created)
        condition(msg.value == (2 * value))
        payable
    {
        emit PurchaseConfirmed();
        buyer = msg.sender;
        state = State.Locked;
    }

    /// Confirm that you (the buyer) received the item.
    /// This will release the locked ether.
    function confirmReceived()
        public
        onlyBuyer
        inState(State.Locked)
    {
        emit ItemReceived();
        // It is important to change the state first because
        // otherwise, the contracts called using `send` below
        // can call in again here.
        state = State.Inactive;

        // NOTE: This actually allows both the buyer and the seller to
        // block the refund - the withdraw pattern should be used.

        buyer.transfer(value);
        seller.transfer(address(this).balance);

        ///// Transfer Ownership 
        transferOwnership(buyer, tokenId);
        emit OwnershipTransferred(seller, buyer, tokenId);
    }


    /////////////// ------------------------- Override Ownable.sol of openzeppelin-solidity -----------------------------------
    address private _owner;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner, uint256 indexed tokenId);

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner, uint256 tokenId) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address newOwner, uint256 tokenId) internal {
        require(newOwner != address(0));

        _owner = seller;
        //_owner = msg.sender;
        //_owner = newOwner;
        emit OwnershipTransferred(_owner, newOwner, tokenId);
    }



    ////////////////--------------------- Text of storage which reference from solidity document v0.5.0 -------------------------------------------------------------------------
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        address delegate; // person delegated to
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter) public {
        // If the first argument of `require` evaluates
        // to `false`, execution terminates and all
        // changes to the state and to Ether balances
        // are reverted.
        // This used to consume all gas in old EVM versions, but
        // not anymore.
        // It is often a good idea to use `require` to check if
        // functions are called correctly.
        // As a second argument, you can also provide an
        // explanation about what went wrong.
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(
            !voters[voter].voted,
            "The voter already voted."
        );
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address to) public {
        // assigns reference
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        require(to != msg.sender, "Self-delegation is disallowed.");

        // Forward the delegation as long as
        // `to` also delegated.
        // In general, such loops are very dangerous,
        // because if they run too long, they might
        // need more gas than is available in a block.
        // In this case, the delegation will not be executed,
        // but in other situations, such loops might
        // cause a contract to get "stuck" completely.
        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }

        // Since `sender` is a reference, this
        // modifies `voters[msg.sender].voted`
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() public view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
    

}
