import React from "react";
import "./imageLinkForm.css";
import "bootstrap/dist/css/bootstrap-theme.css";

const ImageLinkForm = ({ onButtonSubmit, onInputChange }) => {
  return (
    <div>
      <p>
        {"Enter an image URL to get started"}
      </p>
      <div className="form">
        <input
          onChange={onInputChange}
          type="text"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <button onClick={onButtonSubmit} className="btn btn-primary enterForm">
          Detect
        </button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
