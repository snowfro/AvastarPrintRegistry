import React from "react";

class SetConstants extends React.Component {

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.KOPrintRegistry;

    const pricePerPrintInWei = contract.methods["pricePerPrintInWei"].cacheCall();
    const pricePerPrintIntlShipInWei = contract.methods["pricePerPrintIntlShipInWei"].cacheCall();
    const pricePerNFCInWei = contract.methods["pricePerNFCInWei"].cacheCall();
    const pricePerNFCIntlShipInWei = contract.methods["pricePerNFCIntlShipInWei"].cacheCall();
    const pricePerMiscInWei = contract.methods["pricePerMiscInWei"].cacheCall();
    const pricePerMiscIntlShipInWei = contract.methods["pricePerMiscIntlShipInWei"].cacheCall();


  Promise.all([ pricePerPrintInWei, pricePerPrintIntlShipInWei, pricePerNFCInWei, pricePerNFCIntlShipInWei, pricePerMiscInWei, pricePerMiscIntlShipInWei ]).then(() => {
      //console.log('promises made');
      this.setState({
          pricesLoading : false
      });
    });
}
  render(){
return null;

}
}
export default SetConstants;
