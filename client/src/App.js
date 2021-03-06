import React, { Component } from 'react';

import WelcomeScreen from "./welcomeScreen";
import GetInfo from "./getInfo";
import Purchase from "./purchase";
import SetConstants from "./setConstants";

class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    loading: true,
    drizzleState: null,
    welcomeState: 0,
    contactMethod: '',
    address:{firstName:'', lastName:'', address1:'', address2:'', city:'', stateProv:'', zip:'', country:''},
    avastarId:null,
    tokenSVG:null,
    creditsToUseKey:null,
    artCreditsToUse:null,
    creditsToGiveKey:null,
    creditToAddress:null,
    creditToArt:null,
    owner1Key:null,
    owner2Key:null,
    creditManagerCreditsToGive:null,
    creditManagerAddressToCredit:null,
    tokensOfOwnerKey:null
  };

  this.handleWelcomeChange = this.handleWelcomeChange.bind(this);
  this.addContactMethod = this.addContactMethod.bind(this);
  this.setAvastarId = this.setAvastarId.bind(this);
  this.setTokenSVG = this.setTokenSVG.bind(this);
  this.setCreditsToUseKey = this.setCreditsToUseKey.bind(this);
  this.setArtCreditsToUse = this.setArtCreditsToUse.bind(this);
  this.setCreditsToGiveKey = this.setCreditsToGiveKey.bind(this);
  this.setCreditToAddress = this.setCreditToAddress.bind(this);
  this.setCreditToArt = this.setCreditToArt.bind(this);
  this.setOwner1Key = this.setOwner1Key.bind(this);
  this.setOwner2Key = this.setOwner2Key.bind(this);
  this.setCreditManagerCreditsToGive = this.setCreditManagerCreditsToGive.bind(this);
  this.setCreditManagerAddressToCredit = this.setCreditManagerAddressToCredit.bind(this);
  this.setTokensOfOwnerKey = this.setTokensOfOwnerKey.bind(this);
  this.handleAddressInput = this.handleAddressInput.bind(this);

}
  componentDidMount() {

    const { drizzle } = this.props;
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }

    });
  }

  compomentWillUnmount() {
    this.unsubscribe();
    //
  }

setCreditManagerCreditsToGive(value){
  this.setState({creditManagerCreditsToGive:value});
}

setCreditManagerAddressToCredit(value){
  this.setState({creditManagerAddressToCredit:value});
}
setCreditToAddress(value){
  this.setState({creditToAddress:value});
}

setCreditToArt(value){
  this.setState({creditToArt:value});
}

setCreditsToUseKey(value){
  this.setState({creditsToUseKey:value});
}

setArtCreditsToUse(value){
  this.setState({artCreditsToUse:value});
}

setOwner1Key(value){
  this.setState({owner1Key:value});
}

setOwner2Key(value){
  this.setState({owner2Key:value});
}

setCreditsToGiveKey(value){
  this.setState({creditsToGiveKey:value});
}

setTokenSVG(value){
  this.setState({tokenSVG:value});
}

setTokensOfOwnerKey(value){
  this.setState({tokensOfOwnerKey:value});
}

handleWelcomeChange(value){
  window.scrollTo(0, 0);
  const newWelcomeState = this.state.welcomeState+value;
  this.setState({welcomeState:newWelcomeState});
  if (this.state.welcomeState===2){
    this.setState({avastarId: null});
  }
}

addContactMethod(contactMethod){
  this.setState({contactMethod:contactMethod});
}

handleAddressInput(type, value){
  this.setState(state => (state.address[type] = value));
}

setAvastarId(avastarId){
  this.setState({avastarId:avastarId});
}



render(){
  if (this.state.loading) return "Loading Web3... Please make sure you are connected to Ethereum.";

//console.log(this.state.welcomeState);

  if (this.state.welcomeState===0 ){
  return(

    <div className="App">
      <WelcomeScreen
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      handleWelcomeChange={this.handleWelcomeChange}
      creditsToUseKey = {this.state.creditsToUseKey}
      creditsToGiveKey = {this.state.creditsToGiveKey}
      setCreditToAddress = {this.setCreditToAddress}
      setCreditToArt = {this.setCreditToArt}
      creditToAddress = {this.state.creditToAddress}
      creditToArt = {this.state.creditToArt}
      setOwner1Key = {this.setOwner1Key}
      setOwner2Key = {this.setOwner2Key}
      owner1Key = {this.state.owner1Key}
      owner2Key = {this.state.owner2Key}
      setCreditManagerCreditsToGive = {this.setCreditManagerCreditsToGive}
      setCreditManagerAddressToCredit = {this.setCreditManagerAddressToCredit}
      creditManagerCreditsToGive = {this.state.creditManagerCreditsToGive}
      creditManagerAddressToCredit = {this.state.creditManagerAddressToCredit}
      />
      <SetConstants
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      setCreditsToUseKey = {this.setCreditsToUseKey}
      setCreditsToGiveKey = {this.setCreditsToGiveKey}
      setOwner1Key = {this.setOwner1Key}
      setOwner2Key = {this.setOwner2Key}
      setTokensOfOwnerKey = {this.setTokensOfOwnerKey}
      />

      </div>
    )
  } else if (this.state.welcomeState===1) {
    return (
      <div>
      <GetInfo
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      handleWelcomeChange={this.handleWelcomeChange}
      addContactMethod = {this.addContactMethod}
      contactMethod = {this.state.contactMethod}
      setAvastarId={this.setAvastarId}
      avastarId = {this.state.avastarId}
      setArtCreditsToUse = {this.setArtCreditsToUse}
      artCreditsToUse = {this.state.artCreditsToUse}
      setTokenSVG={this.setTokenSVG}
      tokenSVG={this.state.tokenSVG}
      creditsToUseKey = {this.state.creditsToUseKey}
      creditsToGiveKey = {this.state.creditsToGiveKey}
      owner1Key = {this.state.owner1Key}
      owner2Key = {this.state.owner2Key}
      address = {this.state.address}
      handleAddressInput = {this.handleAddressInput}

    />
  </div>
  )
} else if (this.state.welcomeState===2) {
  return (
    <div>
    <Purchase
    avastarId={this.state.avastarId}
    contactMethod={this.state.contactMethod}
    drizzle={this.props.drizzle}
    drizzleState={this.state.drizzleState}
    handleWelcomeChange={this.handleWelcomeChange}
    tokenSVG={this.state.tokenSVG}
    creditsToUseKey = {this.state.creditsToUseKey}
    creditsToGiveKey = {this.state.creditsToGiveKey}
    owner1Key = {this.state.owner1Key}
    owner2Key = {this.state.owner2Key}
    tokensOfOwnerKey = {this.state.tokensOfOwnerKey}
    address = {this.state.address}
    artCreditsToUse = {this.state.artCreditsToUse}
    />
    </div>
  )
}
  }
}
export default App;
