import React from "react";
import "./App.css";
const queryString = require('query-string');

class Preview extends React.Component {

  state = {
    imageStatus: "loading",
    imageUrl: queryString.parse(this.props.location.search).url
  };

  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
    window.print();

  }
  handleImageErrored() {
    this.setState({ imageStatus: "failed to load" });
  }

  render() {
    return (
      this.state.imageUrl?<div className="flex-content h-100">
        <img
          alt="cropped cat"
          src={this.state.imageUrl}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
        />
        {this.state.imageStatus==="loading"?this.state.imageStatus:null}
      </div>:
      <h3> Oops there is nothing to preview Kindly visit Home page</h3>
    );
  }
}

export default Preview;
