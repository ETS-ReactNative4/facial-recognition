import React from "react";
import "./FaceRecognition.css";
import "bootstrap/dist/css/bootstrap-theme.css";

class FaceRecognition extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <React.Fragment>
      <div className="faceRecognition">
        <img id="inputImage" alt="face recognition" src={this.props.imageURL} />
        <div
          className="bounding-box"
          style={{
            top: this.props.box.topRow,
            right: this.props.box.rightCol,
            bottom: this.props.box.bottomRow,
            left: this.props.box.leftCol
          }}
        />
      </div>
      <h2 className="name">{this.props.celeb}</h2>
        <p className="probability">{`Probability ${this.props.probability}%`}</p>
      </React.Fragment>
    );
  }
  
};

export default FaceRecognition;
