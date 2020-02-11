import React from 'react';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


class PriceList extends React.Component {

  render(){

    const { KOPrintRegistry } = this.props.drizzleState.contracts;

    const pricePerPrintInWei = KOPrintRegistry.pricePerPrintInWei['0x0'];
    const pricePerPrintIntlShipInWei = KOPrintRegistry.pricePerPrintIntlShipInWei['0x0'];
    const pricePerNFCInWei = KOPrintRegistry.pricePerNFCInWei['0x0'];
    const pricePerNFCIntlShipInWei = KOPrintRegistry.pricePerNFCIntlShipInWei['0x0'];
    //const pricePerMiscInWei = KOPrintRegistry.pricePerMiscInWei['0x0'];
    //const pricePerMiscIntlShipInWei = KOPrintRegistry.pricePerMiscIntlShipInWei['0x0'];


    return (
      <div>
      <br />
      <p>--------------------------------------------</p>
      <br />
      <h4>Domestic (US) Pricing: </h4>
      <br />
      <ul>
      <li>12"x12" Print With Authentication NFC: {pricePerPrintInWei && (web3.utils.fromWei((pricePerPrintInWei.value).toString(), 'ether'))}Ξ</li>
      <li>Authentication NFC Only: {pricePerNFCInWei && (web3.utils.fromWei((pricePerNFCInWei.value).toString(), 'ether'))}Ξ</li>
      </ul>
      <br />
      <h4>International Pricing: </h4>
      <br />
      <ul>
      <li>12"x12" Print With Authentication NFC: {pricePerPrintIntlShipInWei && (web3.utils.fromWei((pricePerPrintIntlShipInWei.value).toString(), 'ether'))}Ξ</li>
      <li>Authentication NFC Only: {pricePerNFCIntlShipInWei && (web3.utils.fromWei((pricePerNFCIntlShipInWei.value).toString(), 'ether'))}Ξ</li>
      </ul>
      <br />

    </div>
  )

}
}

export default PriceList;
