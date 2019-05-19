import React, { Component } from "react";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Footer from "./components/footer/footer";
import Clarifai from "clarifai";
import "./App.css";


const app = new Clarifai.App({
  apiKey: "c8f7820c0fbc4f4481f429aa42908a18"
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kim-kardashian-west-celebrates-the-launch-of-kkw-beauty-on-news-photo-698979088-1555347876.jpg",
      imageURL: "",
      box: {},
      celeb: "",
      probability: ""
    };
  }

  componentDidMount(){
    this.startProcess();
  }
  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  startProcess = () =>{
    if(this.state.input.length > 0 ){
      this.setState({ imageURL: this.state.input });
      app.models
        .predict('e466caa0619f444ab97497640cefc4dc', this.state.input)
        .then(response =>{
          this.displayFaceBox(this.faceLocation(response))
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  }
  onButtonSubmit = () => {
   this.startProcess();
  };

  celeb = (data) =>{
    this.setState({...this.state.celeb, celeb: data.outputs[0].data.regions[0].data.face.identity.concepts[0].name});
    this.setState({...this.state.probability, probability: Math.round(data.outputs[0].data.regions[0].data.face.identity.concepts[0].value * 100) });    
  }
  faceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
   this.celeb(data);
    return {
      leftCol: Math.round(clarifaiFace.left_col * width),
      topRow: Math.round(clarifaiFace.top_row * height),
      rightCol:Math.round(
      width - (clarifaiFace.right_col * width)),
      bottomRow: Math.round(height - (clarifaiFace.bottom_row * height))
    };
  };


  displayFaceBox = box => {
    this.setState({ box: box });
  };


  render() {
    const {imageURL,box, celeb, probability } = this.state;
    return (
      <div className="App">   
          <div className="containerMain">
            <div className="leftSide">
              <h1>CELEBRITY FACIAL RECOGNITION</h1>
              
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
            </div>

            <div className="rightSide">
               <FaceRecognition probability={probability} celeb={celeb} box={box} imageURL={imageURL} />
            </div>
          </div>
          <Footer/>
      </div>
    );
  }
}

export default App;
