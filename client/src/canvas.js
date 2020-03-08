import React from 'react';

class Canvas extends React.Component {

  constructor(props){
    super(props);
    this.state = {svgLoaded:false};
    this.generateSvg = this.generateSvg.bind(this);

  }

  generateSvg() {


          return "data:image/svg+xml;base64," +
              btoa(this.props.tokenSVG);
      }

  componentDidMount() {

    const canvas = this.refs.canvas;
    const artwork = canvas.getContext("2d");
    const img = this.refs.image;



  img.onload = () => {

      artwork.clearRect(0,0,300,300);

      artwork.drawImage(img, 0,0,300, 300 * img.height / img.width);

    }
  }

render() {

    return(
      <div>

        <canvas ref="canvas" width={300} height={300} />
        <img ref="image" className="d-none" src={this.generateSvg()} alt="Avastar"/>
      </div>
    )
  }
}

export default Canvas;
