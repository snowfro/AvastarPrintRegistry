import React from "react";

import Welcome from "./welcome";

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {stackId:null};
    this.handleClick = this.handleClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleArtToCreditChange = this.handleArtToCreditChange.bind(this);
    this.handleAddressCreditSendClick = this.handleAddressCreditSendClick.bind(this);
    this.handleArtCreditSendClick = this.handleArtCreditSendClick.bind(this);
    this.handleCreditSendClick2 = this.handleCreditSendClick2.bind(this);
    this.handleCreditManagerAddressChange = this.handleCreditManagerAddressChange.bind(this);
    this.handleCreditManagerCreditsToGive = this.handleCreditManagerCreditsToGive.bind(this);

  }

  handleAddressCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    const stackId = contract.methods['giveAddressCredit'].cacheSend(this.props.creditToAddress, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }

  handleArtCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    const stackId = contract.methods['giveArtCredit'].cacheSend(this.props.creditToArt, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
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

console.log('to: '+this.props.creditToAddress);


return(

<div className="container mt-5">
<div className="jumbotron">
  <div>
  <div >
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
