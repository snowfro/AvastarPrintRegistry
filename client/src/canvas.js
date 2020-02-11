import React from 'react';

class Canvas extends React.Component {

  componentDidMount() {

    const canvas = this.refs.canvas;
    const punk = canvas.getContext("2d");
    punk.imageSmoothingEnabled = false;
    const img = this.refs.image;
    const punkId = this.props.punkId;

  img.onload = () => {


      //punk.drawImage(img, 0, 0);
      //punk.font = "40px Courier"
      punk.fillStyle = 'rgb(99,132,150)';
      punk.fillRect(0,0,300,300)
      let lastTwo = parseInt(punkId.toString().slice(-2));

      let row = 0;
      for (let i = 1; i<=100; i++){
        if (punkId>i*100 && punkId<(i*100)+100) {
          row = i;
        }
      }


      punk.drawImage(img, lastTwo*24, row*24,24, 24, 0, 0, 300, 300);

    }
  }

render() {
    return(
      <div>
        <canvas ref="canvas" width={300} height={300} />
        <img ref="image" className="hidden" src={require('./punks.png')} alt="10,000 CryptoPunks"/>
      </div>
    )
  }
}

export default Canvas;
