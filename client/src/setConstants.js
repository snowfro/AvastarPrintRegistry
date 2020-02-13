import React from "react";

class SetConstants extends React.Component {

  

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;

    const contract1 = drizzle.contracts.AvastarPrintRegistry;
    const contract2 = drizzle.contracts.AvastarPrintRegistryMinter;

    const pricePerPrintInWei = contract1.methods["pricePerPrintInWei"].cacheCall();
    const pricePerPrintIntlShipInWei = contract1.methods["pricePerPrintIntlShipInWei"].cacheCall();
    const pricePerNFCInWei = contract1.methods["pricePerNFCInWei"].cacheCall();
    const pricePerNFCIntlShipInWei = contract1.methods["pricePerNFCIntlShipInWei"].cacheCall();
    const pricePerMiscInWei = contract1.methods["pricePerMiscInWei"].cacheCall();
    const pricePerMiscIntlShipInWei = contract1.methods["pricePerMiscIntlShipInWei"].cacheCall();


    const creditsToUseKey = contract2.methods['addressToCreditsToSpend'].cacheCall(drizzleState.accounts[0]);
    const creditsToGiveKey = contract2.methods['managerAddressToCreditsToGive'].cacheCall(drizzleState.accounts[0]);
    //console.log(this.creditsToUseKey, this.creditsToGiveKey);


  Promise.all([ pricePerPrintInWei, pricePerPrintIntlShipInWei, pricePerNFCInWei, pricePerNFCIntlShipInWei, pricePerMiscInWei, pricePerMiscIntlShipInWei,creditsToUseKey, creditsToGiveKey ]).then(() => {
      //console.log('promises made');
      this.setState({
          pricesLoading : false
      });
      this.props.setCreditsToUseKey(creditsToUseKey);

      this.props.setCreditsToGiveKey(creditsToGiveKey);
    });

}




  render(){
    const {drizzleState} = this.props;
    console.log(drizzleState.accounts[0]);


return null;

}
}
export default SetConstants;
