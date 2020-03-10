import React from "react";

import Welcome from "./welcome";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {stackId:null, purchaseCredit:false};
    this.handleClick = this.handleClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleArtToCreditChange = this.handleArtToCreditChange.bind(this);
    this.handleAddressCreditSendClick = this.handleAddressCreditSendClick.bind(this);
    this.handleArtCreditSendClick = this.handleArtCreditSendClick.bind(this);
    this.handleCreditSendClick2 = this.handleCreditSendClick2.bind(this);
    this.handleCreditManagerAddressChange = this.handleCreditManagerAddressChange.bind(this);
    this.handleCreditManagerCreditsToGive = this.handleCreditManagerCreditsToGive.bind(this);
    this.handlePurchaseToggle = this.handlePurchaseToggle.bind(this);

  }

  handleAddressCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    if (this.state.purchaseCredit){
      const amountToSend = drizzleState.contracts.AvastarPrintRegistry.pricePerPrintIntlShipInWei['0x0'].value;
      console.log('amount to send' + amountToSend);
      const stackId = contract.methods['giveAddressCredit'].cacheSend(this.props.creditToAddress, {
        from: drizzleState.accounts[0],
        value: amountToSend
      });
      this.setState({ stackId });
    } else {
    const stackId = contract.methods['giveAddressCredit'].cacheSend(this.props.creditToAddress, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }

  }

  handleArtCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    if (this.state.purchaseCredit){
      const amountToSend = drizzleState.contracts.AvastarPrintRegistry.pricePerPrintIntlShipInWei['0x0'].value;
      console.log('amount to send' + amountToSend);
      const stackId = contract.methods['giveArtCredit'].cacheSend(this.props.creditToArt, {
        from: drizzleState.accounts[0],
        value: amountToSend
      });
      this.setState({ stackId });
    } else {
    const stackId = contract.methods['giveArtCredit'].cacheSend(this.props.creditToArt, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }
  }

  handleCreditSendClick2(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    const stackId = contract.methods['setManagerCredits'].cacheSend(this.props.creditManagerAddressToCredit, this.props.creditManagerCreditsToGive, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }

  handlePurchaseToggle(){
    this.setState({purchaseCredit:!this.state.purchaseCredit});
  }

  getStatus(){
    const { transactions, transactionStack } = this.props.drizzleState;
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    if (transactions[txHash]){
    console.log(transactions[txHash].status);
    return transactions[txHash].status;
  }
  }

  handleClick(){

  this.props.handleWelcomeChange(1);

  }

  handleAddressChange(event){
    this.props.setCreditToAddress(event.target.value);
  }

  handleArtToCreditChange(event){
    this.props.setCreditToArt(event.target.value);
  }

  handleCreditManagerAddressChange(event){
    this.props.setCreditManagerAddressToCredit(event.target.value);
  }

  handleCreditManagerCreditsToGive(event){
    this.props.setCreditManagerCreditsToGive(event.target.value);
  }

render(){
let isOwner;

const { AvastarPrintRegistry } = this.props.drizzleState.contracts;
const pricePerPrintIntlShipInWei = AvastarPrintRegistry.pricePerPrintIntlShipInWei['0x0'];

const creditsToUse = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];
const creditsToGive = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.managerAddressToCreditsToGive[this.props.creditsToGiveKey];
const owner1 = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.owner1[this.props.owner1Key];
const owner2 = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.printerAddress[this.props.owner2Key];
if(creditsToUse && creditsToGive){
  console.log(creditsToUse.value, creditsToGive.value);
}

if(owner1 && owner2){
  isOwner = this.props.drizzleState.accounts[0]===owner1.value || this.props.drizzleState.accounts[0]===owner2.value;
console.log('isOwner? '+isOwner);
}

  let status = this.getStatus();
  const {transactionStack } = this.props.drizzleState;
  const txHash = transactionStack[this.state.stackId];
  let url = 'https://www.etherscan.io/tx/'+txHash;

console.log('to: '+this.props.creditToAddress);


return(

<div className="container mt-5">
<div className="jumbotron">
  <div>
  <div >
  <div className="row">
    <div className="col text-center">
      <button className="btn btn-info btn-small btn-block text-light mb-2" onClick={this.handlePurchaseToggle}>Purchase Print Credits</button>
    </div>
  </div>

  {this.state.purchaseCredit &&
    <div className="p-3 mb-2 bg-info text-white rounded">
    <h4>You can purchase print credits towards an Ethereum address or an individual Avastar for {pricePerPrintIntlShipInWei && (web3.utils.fromWei((pricePerPrintIntlShipInWei.value).toString(), 'ether'))}Ξ each.</h4>
    <ul>
    <li>Credits can only go towards a print. No "NFC Only" credits exist.</li>
    <li>Price of a credit is based on international shipping pricing.</li>
    <li>Orders shipped within the USA are entitled to 80% (0.04Ξ) refund of international shipping charges.</li>
    <li>Purchaser can revoke a credit within 120 days of purchase and receive an 80% refund of the purchase price.</li>
    <li>Credits never expire, but no refunds will be granted after 120 days of purchase.</li>
    <li>All refunds are processed manually in order to avoid storage of funds in minting contract.</li>
    <li>Contact info@artblocks.io for support.</li>
    </ul>
    <br />
    <div className="input-group flex-nowrap">
    <div className="input-group-prepend">
    <span className="input-group-text" id="address-wrapping">Recipient Address</span>
    </div>

    <input type="text" className="form-control" placeholder="0x..." aria-label="Address" aria-describedby="address-wrapping" onChange={this.handleAddressChange} />
    </div>


    <button className="btn btn-primary" onClick={this.handleAddressCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
    <br />
    <br />
    <div className="input-group flex-nowrap">
    <div className="input-group-prepend">
    <span className="input-group-text" id="address-wrapping">Avastar ID</span>
    </div>

    <input type="number" className="form-control" placeholder="..." aria-label="Address" aria-describedby="address-wrapping" onChange={this.handleArtToCreditChange} />
    </div>


    <button className="btn btn-primary" onClick={this.handleArtCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>

    {status === 'success' &&
    <div>
    <h4>Credit has been applied. Your TXID is: {txHash}. View a receipt of your transaction <a href={url}>here</a>.</h4>
    </div>

  }
    </div>



  }

  {isOwner &&
    <div className="p-3 mb-2 bg-info text-white rounded">
    <div >

    <h1>Assign Print Credits to Manager</h1>
    <br />

    <div className="input-group flex-nowrap">
    <div className="input-group-prepend">
    <span className="input-group-text" id="address-wrapping">Manager Address</span>
    </div>

    <input type="text" className="form-control" placeholder="0x..." aria-label="Manager Address" aria-describedby="address-wrapping" onChange={this.handleCreditManagerAddressChange} />
    </div>

    <div className="input-group flex-nowrap">
    <div className="input-group-prepend">
    <span className="input-group-text" id="credits-wrapping">Credits</span>
    </div>

    <input type="number" className="form-control" placeholder="Credits" aria-label="Credits" aria-describedby="credits-wrapping" onChange={this.handleCreditManagerCreditsToGive} />
    </div>



    <button className="btn btn-primary" onClick={this.handleCreditSendClick2} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
    <br />
    <br />



    </div>
    </div>
  }

  {creditsToGive && creditsToGive.value>0 &&
  <div className="p-3 mb-2 bg-info text-white rounded">

  {creditsToGive.value>0? <h1>You have {creditsToGive.value} print {creditsToGive.value>1?'credits':'credit'}  to give!</h1>:<h1>Assign Print Credits to User or Avastar</h1>}
  <h4>You can assign your credits to an address or a specific Avastar.</h4>
  <br />
  <div className="input-group flex-nowrap">
  <div className="input-group-prepend">
  <span className="input-group-text" id="address-wrapping">Recipient Address</span>
  </div>

  <input type="text" className="form-control" placeholder="0x..." aria-label="Address" aria-describedby="address-wrapping" onChange={this.handleAddressChange} />
  </div>


  <button className="btn btn-primary" onClick={this.handleAddressCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
  <br />
  <br />
  <div className="input-group flex-nowrap">
  <div className="input-group-prepend">
  <span className="input-group-text" id="address-wrapping">Avastar ID</span>
  </div>

  <input type="number" className="form-control" placeholder="..." aria-label="Address" aria-describedby="address-wrapping" onChange={this.handleArtToCreditChange} />
  </div>


  <button className="btn btn-primary" onClick={this.handleArtCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>

  </div>
  }

  {creditsToUse && creditsToUse.value>0 &&
  <div className="p-3 mb-2 bg-info text-white rounded">

  <h1>You have {creditsToUse.value} {creditsToUse.value>1?'credits':'credit'} to use! </h1>
  <h4>When you get to the purchase page you'll be able to use this credit towards a free print.</h4>

  <br />
  <br />


  </div>
  }
  </div>
  <Welcome
  drizzle={this.props.drizzle}
  drizzleState={this.props.drizzleState}

  />
  <div className="text-center mb-5 pb-5">
    <button onClick = {this.handleClick} className="btn btn-primary btn-lg text-center">Click Here To Get Started</button>
  </div>
  </div>
</div>
</div>

)
}
}

export default WelcomeScreen;
