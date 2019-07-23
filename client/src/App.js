import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Wallet from "./components/Wallet/index.js";
import Instructions from "./components/Instructions/index.js";

import { Loader, Button, Card, Input, Heading, Table, Form } from 'rimble-ui';
import { Grid } from 'react-bootstrap';

import { zeppelinSolidityHotLoaderOptions } from '../config/webpack';

import styles from './App.module.scss';




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      contract: null,
      route: window.location.pathname.replace("/",""),

      /////// Value below is for confirmPurchase and confirmReceived function
      buy_price: '',
      sell_price: '',
      valueOfBuyPrice: '',
      valueOfSellPrice: '',

      buyAndSell: [],

      /////// Listing
      owner_address: '',
      energy_type: '',
      price: '',
      transaction_hash: '',
      token_id: 0,
      valueOfOwnerAddress: '',
      valueOfEnergyType: '',
      valueOfPrice: 0,

      listingIndex: [],

      //////// Listing Detail
      owner_address_detail: '', 
      energy_type_detail: '', 
      price_detail: 0,
      transaction_hash_detail: 'in progress of implementation',
      token_id_detail: 0,
      valueOfTokenId: 0,

      listingDetail: []
    };

    // this.handleInputProductionAddress = this.handleInputProductionAddress.bind(this);
    // this.handleInputProductionTown = this.handleInputProductionTown.bind(this);
    this.sendBuy= this.sendBuy.bind(this);

    this.handleInputTokenId = this.handleInputTokenId.bind(this);
    this.sendListingDetail = this.sendListingDetail.bind(this);

    this.handleInputOwnerAddress = this.handleInputOwnerAddress.bind(this);
    this.handleInputEnergyType = this.handleInputEnergyType.bind(this);
    this.handleInputPrice = this.handleInputPrice.bind(this);    
    this.sendListingRegister= this.sendListingRegister.bind(this);

    this.sendEscrowDeposit = this.sendEscrowDeposit.bind(this);
    this.sendMintTo = this.sendMintTo.bind(this);
    this.sendTokenURI = this.sendTokenURI.bind(this);
  }


  ///////--------------------- Buy/Sell ---------------------------
  sendBuy = async () => {
    const { accounts, exchange, buy_price, valueOfBuyPrice } = this.state;

    const response_1 = await exchange.methods.confirmPurchase().send({ from: accounts[0] })
    const response_2 = await exchange.methods.confirmReceived().send({ from: accounts[0] })

    console.log('=== response of confirmPurchase function ===', response_1);  // Debug
    console.log('=== response of confirmReceived function ===', response_2);  // Debug

    this.setState({
      buy_price: valueOfBuyPrice,
      valueOfBuyPrice: '',
    });
  }


  ///////--------------------- Exchange Detail page ---------------------------
  handleInputTokenId({ target: { value } }) {
    this.setState({ valueOfTokenId: Number(value) });
  }

  sendListingDetail = async () => {
    const { accounts, exchange, owner_address_detail, energy_type_detail, price_detail, transaction_hash_detail, token_id_detail, listingDetail, valueOfTokenId } = this.state;

    const _tokenId = valueOfTokenId;
    //const _tokenId = 1;
    
    const response = await exchange.methods.listingDetail(_tokenId).call();
    const _ownerAddr = response[0];
    const _energyType = response[1];
    const _blockTimestamp = response[2];
    const _price = response[3];

    console.log('=== response of listingDetail ===', response);      // Debug
    console.log('=== rerturn value of _ownerAddr ===', _ownerAddr);  // Debug

    ///// Add value above to list of listIndex
    this.state.listingDetail.push({
      owner_address_detail: _ownerAddr, 
      energy_type_detail: _energyType, 
      price_detail: _price,
      transaction_hash_detail: 'in progress of implementation',
      token_id_detail: _tokenId
    });

    this.setState({
      listingDetail: this.state.listingDetail
    });
  }



  ///////--------------------- Listing ---------------------------
  handleInputOwnerAddress({ target: { value } }) {
    this.setState({ valueOfOwnerAddress: value });
  }

  handleInputEnergyType({ target: { value } }) {
    this.setState({ valueOfEnergyType: value });
  }

  handleInputPrice({ target: { value } }) {
    this.setState({ valueOfPrice: Number(value) });
  }

  sendListingRegister = async (event) => {
    const { accounts, exchange, owner_address, energy_type, price, transaction_hash, token_id, valueOfOwnerAddress, valueOfEnergyType, valueOfPrice, listingIndex } = this.state;

    const response = await exchange.methods.listingRegister(valueOfOwnerAddress, valueOfEnergyType, valueOfPrice).send({ from: accounts[0] })

    console.log('=== response of listingRegister function ===', response);  // Debug

    const Txhash = response.transactionHash
    console.log('=== Txhash of listingRegister function ===', Txhash);


    const tokenId = response.events.ListingRegister.returnValues.tokenId;
    console.log('=== tokenId of ListingRegister event ===', tokenId);

    this.setState({
      owner_address: valueOfOwnerAddress, 
      energy_type: valueOfEnergyType, 
      price: valueOfPrice,
      transaction_hash: Txhash,
      token_id: tokenId,
      valueOfOwnerAddress: '', 
      valueOfEnergyType: '', 
      valueOfPrice: 0  
    });

    ///// Add value above to list of listIndex
    this.state.listingIndex.push({
      owner_address: valueOfOwnerAddress, 
      energy_type: valueOfEnergyType, 
      price: valueOfPrice,
      transaction_hash: Txhash,
      token_id: tokenId
    });

    this.setState({
      listingIndex: this.state.listingIndex
    });
  }
  


  ///////--------------------- EscrowPayment ---------------------------
  sendEscrowDeposit = async () => {
    const { accounts, escrow_payment } = this.state;

    const response_1 = await escrow_payment.methods.test().send({ from: accounts[0] })
    const response_2 = await escrow_payment.methods.escrowDeposit(accounts[0]).send({ from: accounts[0] })

    console.log('=== response of escrowDeposit function ===', response_1);  // Debug
    console.log('=== response of escrowDeposit function ===', response_2);  // Debug

    this.setState({
      deposit_price: '',  // in progress
    });
  }



  ////////--------------------- Asset（TradeERC721）---------------------------
  sendMintTo = async () => {
    const { accounts, asset } = this.state;
    let _address = "0x555e57c4762137241941620f086082569d6b0116"

    const response_1 = await asset.methods.mintTo(_address).send({ from: accounts[0] })
    console.log('=== response of mintTo function of being inherited from TradeERC721Token.sol ===', response_1);  // Debug
  }


  sendTokenURI = async () => {
    const { accounts, asset } = this.state;
    let _tokenId = 5

    const response_1 = await asset.methods.tokenURI(_tokenId).call()
    console.log('=== response of tokenURI function of being inherited from TradeERC721Token.sol ===', response_1);  // Debug
  }







  //////////////////////////////////// 
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    const hotLoaderDisabled = zeppelinSolidityHotLoaderOptions.disabled;
    let Counter = {};
    let Wallet = {};
    let Asset = {};
    let Exchange = {};
    let EscrowPayment = {};

    try {
      Counter = require("../../build/contracts/Counter.json");
      Wallet = require("../../build/contracts/Wallet.json");
      Asset = require("../../build/contracts/Asset.json");        // Load ABI of contract of Asset
      Exchange = require("../../build/contracts/Exchange.json");  // Load ABI of contract of Exchange
      EscrowPayment = require("../../build/contracts/EscrowPayment.json");  // Load ABI of contract of EscrowPayment
      // Counter = require("../../contracts/Counter.sol");
      // Wallet = require("../../contracts/Wallet.sol");
      // Asset = require("../../contracts/Asset.sol");
      // Exchange = require("../../contracts/Exchange.sol");
    } catch (e) {
      console.log(e);
    }

    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        let ganacheAccounts = [];

        try {
          ganacheAccounts = await this.getGanacheAddresses();
        } catch (e) {
          console.log('Ganache is not running');
        }

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const networkType = await web3.eth.net.getNetworkType();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');

        let instance = null;
        let instanceWallet = null;
        let instanceAsset = null;
        let instanceExchange = null;
        let instanceEscrowPayment = null;
        let deployedNetwork = null;

        if (Counter.networks) {
          deployedNetwork = Counter.networks[networkId.toString()];
          if (deployedNetwork) {
            instance = new web3.eth.Contract(
              Counter.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Wallet.networks) {
          deployedNetwork = Wallet.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceWallet = new web3.eth.Contract(
              Wallet.abi,
              deployedNetwork && deployedNetwork.address,
            );
          }
        }
        if (Asset.networks) {
          deployedNetwork = Asset.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceAsset = new web3.eth.Contract(
              Asset.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceAsset ===', instanceAsset);
          }
        }
        if (Exchange.networks) {
          deployedNetwork = Exchange.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceExchange = new web3.eth.Contract(
              Exchange.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceExchange ===', instanceExchange);
          }
        }
        if (EscrowPayment.networks) {
          deployedNetwork = EscrowPayment.networks[networkId.toString()];
          if (deployedNetwork) {
            instanceEscrowPayment = new web3.eth.Contract(
              EscrowPayment.abi,
              deployedNetwork && deployedNetwork.address,
            );
            console.log('=== instanceEscrowPayment ===', instanceEscrowPayment);
          }
        }

        if (instance || instanceWallet || instanceAsset || instanceExchange || instanceEscrowPayment) {
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled,
            isMetaMask, contract: instance, wallet: instanceWallet, asset: instanceAsset, exchange: instanceExchange, escrow_payment: instanceEscrowPayment }, () => {
              this.refreshValues(instance, instanceWallet, instanceAsset, instanceExchange, instanceEscrowPayment);
              setInterval(() => {
                this.refreshValues(instance, instanceWallet, instanceAsset, instanceExchange, instanceEscrowPayment);
              }, 5000);
            });
        }
        else {
          this.setState({ web3, ganacheAccounts, accounts, balance, networkId, networkType, hotLoaderDisabled, isMetaMask });
        }
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshValues = (instance, instanceWallet, instanceAsset, instanceExchange) => {
    if (instance) {
      this.getCount();
    }
    if (instanceWallet) {
      this.updateTokenOwner();
    }
    if (instanceAsset) {
      console.log('refreshValues of instanceAsset');
    }
    if (instanceExchange) {
      console.log('refreshValues of instanceExchange');
    }
    if (instanceExchange) {
      console.log('refreshValues of instanceEscrowPayment');
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  updateTokenOwner = async () => {
    const { wallet, accounts } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await wallet.methods.owner().call();
    // Update state with the result.
    this.setState({ tokenOwner: response.toString() === accounts[0].toString() });
  };

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renounceOwnership = async (number) => {
    const { accounts, wallet } = this.state;
    await wallet.methods.renounceOwnership().send({ from: accounts[0] });
    this.updateTokenOwner();
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  renderDeployCheck(instructionsKey) {
    return (
      <div className={styles.setup}>
        <div className={styles.notice}>
          Your <b> contracts are not deployed</b> in this network. Two potential reasons: <br />
          <p>
            Maybe you are in the wrong network? Point Metamask to localhost.<br />
            You contract is not deployed. Follow the instructions below.
          </p>
        </div>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name={instructionsKey} accounts={this.state.accounts} />
      </div>
    );
  }

  renderBody() {
    const { hotLoaderDisabled, networkType, accounts, ganacheAccounts } = this.state;
    const updgradeCommand = (networkType === 'private' && !hotLoaderDisabled) ? "upgrade-auto" : "upgrade";
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && this.renderLoader()}
        {this.state.web3 && !this.state.contract && (
          this.renderDeployCheck('counter')
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>Counter Contract is good to Go!</h1>
            <p>Interact with your contract on the right.</p>
            <p> You can see your account info on the left </p>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <CounterUI
                decrease={this.decreaseCount}
                increase={this.increaseCount}
                {...this.state} />
            </div>
            {this.state.balance < 0.1 && (
              <Instructions
                ganacheAccounts={ganacheAccounts}
                name="metamask"
                accounts={accounts} />
            )}
            {this.state.balance >= 0.1 && (
              <Instructions
                ganacheAccounts={this.state.ganacheAccounts}
                name={updgradeCommand}
                accounts={accounts} />
            )}
          </div>
        )}
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="setup" accounts={this.state.accounts} />
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.wrapper}>
        <Instructions
          ganacheAccounts={this.state.ganacheAccounts}
          name="faq" accounts={this.state.accounts} />
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.wallet && (
        this.renderDeployCheck('evm')
      )}
      {this.state.web3 && this.state.wallet && (
        <div className={styles.contracts}>
          <h1>Wallet Contract is good to Go!</h1>
          <p>Interact with your contract on the right.</p>
          <p> You can see your account info on the left </p>
          <div className={styles.widgets}>
            <Web3Info {...this.state} />
            <Wallet
              renounce={this.renounceOwnership}
              {...this.state} />
          </div>
          <Instructions
            ganacheAccounts={this.state.ganacheAccounts}
            name="evm" accounts={this.state.accounts} />
        </div>
      )}
      </div>
    );
  }

  renderExchange() {
    const { accounts, exchange, owner_address, energy_type, price, transaction_hash, token_id, listingIndex } = this.state;

    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.exchange && (
        this.renderDeployCheck('exchange')
      )}
      {this.state.web3 && this.state.exchange && (
        <div className={styles.contracts}>
          <h1>Exchange Contract is good to Go!</h1>

          <div style={{ display: "inline-flex" }}>
            <Card width={'350px'} bg="primary">
              <h2>Listing Register</h2>
              <p>Owner Address</p>
              <Input type="text" value={this.state.valueOfOwnerAddress} onChange={this.handleInputOwnerAddress} />

              <p>Energy Type</p>
              <Input type="text" value={this.state.valueOfEnergyType} onChange={this.handleInputEnergyType} />

              <p>Price</p>
              <Input type="text" value={this.state.valueOfPrice} onChange={this.handleInputPrice} />

              <br />
              
              <Button onClick={this.sendListingRegister}>Register Listing</Button>
            </Card>

            <span style={{ padding: "20px" }}></span>

            <Card width={'700px'} bg="primary">
              <Table>
                <thead>
                  <tr>
                    <th style={{ fontSize: '9px'}}>
                      Tx Hash
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      IPFS Hash
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      Token ID
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      Owner Address
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      Energy Type
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      Price
                    </th>
                    <th style={{ fontSize: '9px'}}>
                      Buy / Sell
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listingIndex.map( (listingIndex, i) => {
                    return <tr key={i}>
                             <td>{ listingIndex.transaction_hash }</td>
                             <td> ipfsHash... </td>
                             <td>{ listingIndex.token_id }</td>                           
                             <td>{ listingIndex.owner_address }</td>
                             <td>{ listingIndex.energy_type }</td>
                             <td>{ listingIndex.price }</td>
                             <td>
                                {process.env.NODE_ENV !== 'exchange' && (
                                  <Button onClick={this.sendListingDetail}><a href="/exchange/1" className={styles.link}>Exchange Detail</a></Button>
                                )}
                             </td>
                           </tr>
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </div>
      )}
      </div>
    );
  }


  renderExchangeDetail() {
    const { accounts, exchange, owner_address_detail, energy_type_detail, price_detail, transaction_hash_detail, token_id_detail, listingDetail } = this.state;

    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.exchange && (
        this.renderDeployCheck('exchange')
      )}
      {this.state.web3 && this.state.exchange && (
        <div className={styles.contracts}>
          <h1>Exchange Detail</h1>

          <Card width={'1000px'} bg="primary">
            <h2>tokenId Search</h2>
            <Input type="text" value={this.state.valueOfTokenId} onChange={this.handleInputTokenId} />

            <br />

            <Button onClick={this.sendListingDetail}>Listing Detail</Button>
          </Card>

          <Card width={'1000px'} bg="primary">
            <Table>
              <thead>
                <tr>
                  <th style={{ fontSize: '9px'}}>
                    Tx Hash
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    IPFS Hash
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Token ID
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Owner Address
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Energy Type
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Price
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Buy / Sell
                  </th>
                  <th style={{ fontSize: '9px'}}>
                    Buy / Sell by Kyber Netwrk
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.listingDetail.map( (listingDetail, i) => {
                  return <tr key={i}>
                           <td>{ listingDetail.transaction_hash_detail }</td>
                           <td> ipfsHash... </td>
                           <td>{ listingDetail.token_id_detail }</td>                           
                           <td>{ listingDetail.owner_address_detail }</td>
                           <td>{ listingDetail.energy_type_detail }</td>
                           <td>{ listingDetail.price_detail }</td>
                           <td>
                              {process.env.NODE_ENV !== 'exchange' && (
                                <Button onClick={this.sendBuy}>Buy</Button>
                              )}

                              <br />
                           </td>

                           <td>
                             <Button>
                               <a 
                                  href='https://widget.kyber.network/v0.1/?type=pay&mode=tab&theme=light&receiveAddr=0x0fED8b3f1024f6577E563c29CB8B8829EE2b87ef&receiveToken=ADX&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten' 
                                  class='kyber-widget-button kyber-widget-button--dark' 
                                  name='KyberWidget - Powered by KyberNetwork' 
                                  title='Pay with tokens'
                                  target='_blank'
                               >
                                 Pay with tokens
                               </a>
                             </Button>
                           </td>
                         </tr>
                })}
              </tbody>
            </Table>
          </Card>

        </div>
      )}
      </div>
    );
  }

  renderAsset() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.asset && (
        this.renderDeployCheck('asset')
      )}
      {this.state.web3 && this.state.asset && (
        <div className={styles.contracts}>
          <h1>Asset Contract is good to Go!</h1>

          <Card width={'600px'} bg="primary">
            <Button onClick={this.sendMintTo}> MintTo</Button>

            <span style={{ padding: "20px" }}></span>

            <Button onClick={this.sendTokenURI}> Get tokenURI</Button>
          </Card>
        </div>
      )}
      </div>
    );
  }

  renderEscrowPayment() {
    return (
      <div className={styles.wrapper}>
      {!this.state.web3 && this.renderLoader()}
      {this.state.web3 && !this.state.escrow_payment && (
        this.renderDeployCheck('escrow_payment')
      )}
      {this.state.web3 && this.state.escrow_payment && (
        <div className={styles.contracts}>
          <h1>EscrowPayment Contract is good to Go!</h1>

          <Card width={'600px'} bg="primary">
            <Button onClick={this.sendEscrowDeposit}>Escrow Deposit</Button>
          </Card>
        </div>
      )}
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'counter' && this.renderBody()}
          {this.state.route === 'evm' && this.renderEVM()}
          {this.state.route === 'faq' && this.renderFAQ()}
          {this.state.route === 'asset' && this.renderAsset()}
          {this.state.route === 'exchange' && this.renderExchange()}
          {this.state.route === 'exchange/1' && this.renderExchangeDetail()}
          {this.state.route === 'escrow_payment' && this.renderEscrowPayment()}
        <Footer />
      </div>
    );
  }
}

export default App;
