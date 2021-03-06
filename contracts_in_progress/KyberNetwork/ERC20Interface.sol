pragma solidity >=0.4.18 <0.7.0;
//pragma solidity 0.4.18;


// https://github.com/ethereum/EIPs/issues/20
interface ERC20 {
    function totalSupply() external view returns (uint supply);
    function balanceOf(address _owner)  external view returns (uint balance);
    function transfer(address _to, uint _value) external returns (bool success);
    function transferFrom(address _from, address _to, uint _value) external returns (bool success);
    function approve(address _spender, uint _value) external returns (bool success);
    function allowance(address _owner, address _spender) external view returns (uint remaining);
    function decimals() external view returns(uint digits);
    // function totalSupply() public view returns (uint supply);
    // function balanceOf(address _owner) public view returns (uint balance);
    // function transfer(address _to, uint _value) public returns (bool success);
    // function transferFrom(address _from, address _to, uint _value) public returns (bool success);
    // function approve(address _spender, uint _value) public returns (bool success);
    // function allowance(address _owner, address _spender) public view returns (uint remaining);
    // function decimals() public view returns(uint digits);

    event Approval(address indexed _owner, address indexed _spender, uint _value);
}
