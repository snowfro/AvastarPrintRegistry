import React, { Component } from 'react';
import './App.css';

import WelcomeScreen from "./welcomeScreen";
import GetInfo from "./getInfo";
import Purchase from "./purchase";

class App extends Component {
  constructor(props){
  super(props);
  this.state = { loading: true, drizzleState: null, welcomeState: 0, contactMethod: '', artId:null, tokenURIKey:null};
  this.handleWelcomeChange = this.handleWelcomeChange.bind(this);
  this.addContactMethod = this.addContactMethod.bind(this);
  this.setArtId = this.setArtId.bind(this);
  this.setTokenURIKey = this.setTokenURIKey.bind(this);
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

setTokenURIKey(value){
  this.setState({tokenURIKey:value});
}

handleWelcomeChange(value){
  const newWelcomeState = this.state.welcomeState+value;
  this.setState({welcomeState:newWelcomeState});
  if (this.state.welcomeState===2){
    this.setState({contactMethod: '', artId: null});
  }
}

addContactMethod(contactMethod){
  this.setState({contactMethod:contactMethod});
}

setArtId(artId){
  this.setState({artId:artId});
}



render(){
  if (this.state.loading) return "Loading Web3... Please make sure you are connected to Ethereum.";

//console.log(this.state.welcomeState);

  if (this.state.welcomeState===0){
  return(
    <div className="App">
      <WelcomeScreen
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      handleWelcomeChange={this.handleWelcomeChange}
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
      setArtId={this.setArtId}
      artId = {this.state.artId}
      setTokenURIKey={this.setTokenURIKey}
      tokenURIKey={this.state.tokenURIKey}
    />
  </div>
  )
} else if (this.state.welcomeState===2) {
  return (
    <div>
    <Purchase
    artId={this.state.artId}
    contactMethod={this.state.contactMethod}
    drizzle={this.props.drizzle}
    drizzleState={this.state.drizzleState}
    handleWelcomeChange={this.handleWelcomeChange}
    tokenURIKey={this.state.tokenURIKey}
    />
    </div>
  )
}
  }
}
export default App;
