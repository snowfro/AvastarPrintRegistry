import React from "react";

import Welcome from "./welcome";

import PriceList from "./priceList";

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {stackId:null};
    this.handleClick = this.handleClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCreditSendClick = this.handleCreditSendClick.bind(this);
  }

  handleGiveToken(){

  }

  handleCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.AvastarPrintRegistryMinter;
    const stackId = contract.methods['giveCredit'].cacheSend(this.props.creditToAddress, {
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

render(){

const creditsToUse = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];
const creditsToGive = this.props.drizzleState.contracts.AvastarPrintRegistryMinter.managerAddressToCreditsToGive[this.props.creditsToGiveKey];
if(creditsToUse && creditsToGive){
  console.log(creditsToUse.value, creditsToGive.value);
}

  let status = this.getStatus();

console.log('to: '+this.props.creditToAddress);


  return(
    <div>

    {creditsToGive && creditsToGive.value>0 &&
    <div>
    <p>*****</p>
    <h1>You have credits to give!</h1>
    <h4>Paste recipient address below and click "Send"</h4>

    <br />
    <input type="text" id="addressField" onChange={this.handleAddressChange} /><button className="bigButton2" onClick={this.handleCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
    <p>*****</p>
    </div>
    }
    {creditsToUse && creditsToUse.value>0 &&
    <div>
    <p>*****</p>
    <h1>You have a credit to use! </h1>
    <h4>When you get to the purchase page you'll be able to use this credit towards a free print or NFC.</h4>

    <br />

    <p>*****</p>
    </div>
    }

    <Welcome
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}
    />

    <button onClick = {this.handleClick}>Click Here To Get Started</button>
    <PriceList
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}
    />

    </div>
  )
}
}

export default WelcomeScreen;
