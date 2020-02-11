import React from 'react';

class Canvas extends React.Component {

  constructor(props){
    super(props);
    this.state = {imgURI:''}
  }

  componentDidMount() {

    const canvas = this.refs.canvas;
    const artwork = canvas.getContext("2d");
    const img = this.refs.image;
    let imageURI;
    var xhr = new XMLHttpRequest();
    
    artwork.fillText("Loading....",20,150);


    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log('response: '+ xhr.responseText);
      var json = JSON.parse(xhr.responseText);
      console.log('json: '+json.image);
      imageURI = json.image;
      console.log('image '+imageURI);
      this.setState({imgURI:imageURI});
    })
    // open the request with the verb and the url
    xhr.open('GET', this.props.imageURI)
    // send the request
    xhr.send()


  img.onload = () => {
      artwork.clearRect(0,0,300,300);

      artwork.drawImage(img, 0,0,300, 300 * img.height / img.width);

    }
  }

render() {
  console.log('insideCanvas: '+this.props.imageURI);
    return(
      <div>
        <canvas ref="canvas" width={300} height={300} />
        <img ref="image" className="hidden" src={this.state.imgURI} alt="10,000 CryptoPunks"/>
      </div>
    )
  }
}

export default Canvas;
