import React from "react";


class Welcome extends React.Component {
  render(){

    return (
      <div>
      <h1> Welcome to the Avastars Print Registry Store </h1>
      <br />
      <h4>Here you'll be able to purchase authentication for your <a href="https://www.avastars.io">Avastar.</a></h4>
      <br />
      <p>There are two purchase options to choose from:</p>
      <br />
      <ul>
      <li>A 12"x12" (or smaller) high quality print of your Avastar with authentication NFC. </li>
      <li>An authentication NFC sticker that you can attatch to a print you already have. </li>
      </ul>
      <br />
      <p>You will be transacting directly through the Avastar Print Registry Smart Contract. In other words,
      the storefront itself is a smart contract. In order to purchase an artwork print or NFC, <b>you must have ownership
      of that artwork in the Ethereum address <i>that you send the funds from</i></b>.</p>
      <br />
      <p>The Print Registry Store will reject your transaction if you do not send funds from the "owner" address. </p>
      <br />
      <p>In order to maintain your privacy, you will not be sending shipping information to the smart contract along with your transaction.
      Instead you will simply provide a communication method such as an e-mail address or full Discord handle that that we can use to verify
      the source of shipping information.
      </p>
      <br />
      <p> This contact method will be deleted after you receive your print or NFC.</p>
      <br />
      </div>
    )
  }
  }

export default Welcome;
