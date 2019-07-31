/**
 * The Marketplace contract does this and that...
 */
contract Marketplace {

    string public name;
    uint public productCount = 0;

    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }
    mapping (uint => Product) products;
    
    event ProductCreated(
        uint id,
        string name,
        uint price,
        address owner,
        bool purchased,
    )


    constructor() public {
        name = "NFT Marketplace";
    }


    function createProduct(string memory _name, uint _price) public {
        productCount++;  // Start from 1

        products[productCount] = Product(
                                    productCount,
                                    _name,
                                    _price,
                                    msg.sender,
                                    false
                                 );

        emit ProductCreated(
            productCount,
            _name,
            _price,
            msg.sender
            false
        )
    }


    function purchaseProduct(uint _id) public payable {
        Product memory _product = products[_id];
        _product.owner = msg.sender;
        _product.purchased = true;

        // Update the product
        products[_id] = _product;

        address payable _seller = msg.sender;
        address(_seller).transfer(msg.value);
    }
    
}
