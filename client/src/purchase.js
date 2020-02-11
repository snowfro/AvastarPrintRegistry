import React from 'react';
import Canvas from './canvas2';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class Purchase extends React.Component{
  constructor(props){
  super(props);
  this.state = {purchaseType:null, shipType:null, stackId:null}
  this.handleTypeRadio = this.handleTypeRadio.bind(this);
  this.handleShipRadio = this.handleShipRadio.bind(this);
  this.handleGoBack = this.handleGoBack.bind(this);
  this.handlePurchase = this.handlePurchase.bind(this);
  this.handleStartOver = this.handleStartOver.bind(this);
}

handleGoBack(){
  this.props.handleWelcomeChange(-1);
}

handleStartOver(){
  this.props.handleWelcomeChange(-2);
}
  handleTypeRadio (event){
    this.setState({purchaseType:event.target.value});
  }

  handleShipRadio (event){
    this.setState({shipType:event.target.value});
  }

  findPrice(){
    if (this.state.purchaseType === "Print + NFC"){
      if (this.state.shipType === "Domestic") {
        return 'pricePerPrintInWei';
      } else {
        return 'pricePerPrintIntlShipInWei'
      }
    } else if (this.state.purchaseType === "NFC Only") {
      if (this.state.shipType === "Domestic") {
      return 'pricePerNFCInWei';
    } else {
      return 'pricePerNFCIntlShipInWei';
    }
  }
  }

handlePurchase(purchaseType){
  const { drizzle, drizzleState } = this.props;
  const contract = drizzle.contracts.AvastarPrintRegistry;
  let purchaseFunc='';

  if (purchaseType === 'pricePerPrintInWei' || purchaseType === 'pricePerPrintIntlShipInWei'){
    purchaseFunc = 'purchasePrint'
  } else if (purchaseType === 'pricePerNFCInWei' || purchaseType === 'pricePerNFCIntlShipInWei'){
    purchaseFunc = 'purchaseNFCOnly'
  } else {
    purchaseFunc = 'purchaseMisc'
  }

console.log("type: "+purchaseType + " Func: "+ purchaseFunc);

  const determineAmount = drizzleState.contracts.AvastarPrintRegistry[purchaseType];
  const amountToSend = determineAmount['0x0'].value;
  console.log("sending "+ amountToSend + "contact "+this.props.contactMethod + "Avastar " + this.props.avastarId+ "using: "+ purchaseFunc);

  const stackId = contract.methods[purchaseFunc].cacheSend(this.props.avastarId,this.props.contactMethod, {
    from: drizzleState.accounts[0],
    value: amountToSend
  });
  // save the `stackId` for later reference
  this.setState({ stackId });
};

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

getTokenId(){
  const {transactions, transactionStack } = this.props.drizzleState;
  const txHash = transactionStack[this.state.stackId];
  if (!txHash) return null;
  if (transactions[txHash]){
    if (transactions[txHash].status==='success'){
    const newTokenId = transactions[txHash].receipt.events.Transfer.returnValues[2];
    return newTokenId;
  } else {
    return null;
  }
}
}




  render(){
    const {contracts} = this.props.drizzle;

    const { AvastarPrintRegistry } = this.props.drizzleState.contracts;
    const purchaseType = this.findPrice();
    console.log(contracts);
    console.log(this.props.drizzleState);
    //console.log(KOPrintRegistry);
    //console.log(this.findPrice());

    const pricePerPrintInWei = AvastarPrintRegistry.pricePerPrintInWei['0x0'];
    const pricePerPrintIntlShipInWei = AvastarPrintRegistry.pricePerPrintIntlShipInWei['0x0'];
    const pricePerNFCInWei = AvastarPrintRegistry.pricePerNFCInWei['0x0'];
    const pricePerNFCIntlShipInWei = AvastarPrintRegistry.pricePerNFCIntlShipInWei['0x0'];
    const pricePerMiscInWei = AvastarPrintRegistry.pricePerMiscInWei['0x0'];
    const pricePerMiscIntlShipInWei = AvastarPrintRegistry.pricePerMiscIntlShipInWei['0x0'];

    let priceObject = {pricePerPrintInWei: pricePerPrintInWei, pricePerPrintIntlShipInWei:pricePerPrintIntlShipInWei,pricePerNFCInWei:pricePerNFCInWei,pricePerNFCIntlShipInWei:pricePerNFCIntlShipInWei,pricePerMiscInWei:pricePerMiscInWei, pricePerMiscIntlShipInWei:pricePerMiscIntlShipInWei};
    //if (this.findPrice()){ console.log("being bought: "+ this.findPrice());}
    let status = this.getStatus();
    let tokenId = this.getTokenId();
    let url = "http://apr.artblocks.io/details/";
    if (tokenId) {
      url = url+tokenId;
    }

    const {drizzleState} = this.props;
    const contract = drizzleState.contracts.AvastarPrintRegistry;

    return (
      <div>
      <h1>Avastars Print Registry Purchase Page</h1>
      <br />
      <h4>Almost there! Now you will choose your purchase options and complete the transaction for Avastar #{this.props.avastarId}.</h4>
    <Canvas
    svg = {contract.renderAvastar[this.props.tokenSVG].value}
    />
    <br />
    <br />
    <p>There are two ways to proceed. You may purchase a 12"x12" (30.5x30.5cm) high quality digital print with attached authentication NFC
    or if you already have a nice print you can simply buy the NFC sticker for authentications. Please select one:</p>
    <label><input type="radio" name="purchaseType" value="Print + NFC" onChange={this.handleTypeRadio} />Purchase Print+NFC</label><br />
    <label><input type="radio" name="purchaseType" value="NFC Only" onChange={this.handleTypeRadio} />Purchase NFC Only</label>

    {this.state.purchaseType &&
      <div>
      <h4>Purchase Type: {this.state.purchaseType}</h4>
      <br />
      <p>Now we need to know where this is going. Please select whether you are located in the USA or abroad. Item price will adjust accordingly.</p>
      <label><input type="radio" name="shipType" value="Domestic" onChange={this.handleShipRadio} />Domestic Shipping (within USA)</label><br />
      <label><input type="radio" name="shipType" value="International" onChange={this.handleShipRadio} />International Shipping</label>
      {this.state.shipType &&
      <div>
      <h4>Shiping Type: {this.state.shipType}</h4>
      <br />
      <h4>Total: {priceObject[this.findPrice()] && (web3.utils.fromWei(priceObject[this.findPrice()].value.toString(), 'ether'))}Ξ</h4>
      <br />
      <br />
      <button className = "bigButton" disabled = {status?true:false} onClick={() => {this.handlePurchase(purchaseType)}}>{status?status:'Purchase'}</button>
      {status === 'success' &&
    <div>
    <h1>Congrats!</h1>
    <h4>Your transaction is complete! Please reach out to info@artblocks.io or Snowfro#8886 on Discord using the recorded contact method
    so we can get your package to you ASAP.</h4>
    <br />
    <h4>Your Print Registry TokenId for this transaction is {tokenId}. You can visit your authentication
    page at <a href={url}>{url}</a>. Note that the NFC ID will be set manually at time of printing.</h4>
    <br />
    <p> You will be provided with a tracking number once your package has shipped. Please allow 1-2 weeks for delivery.</p>

  </div>
}
      </div>
    }
      </div>
    }
    <br />
    <br />
    <button onClick = {status==='success'? this.handleStartOver : this.handleGoBack}>{status==='success'?'Start Over':'Go Back'}</button>
    </div>
  )
  }

}

export default Purchase;
