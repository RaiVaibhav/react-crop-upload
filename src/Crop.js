import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Link } from "react-router-dom";

import "./App.css";

class Crop extends React.Component {
  state = {
    fileSizeExceeded: null,
    src: null,
    croppedImageSize: null,
    previewUrl: ""
  };

  saveImage(){
    return `http://lorempixel.com/${Math.floor(this.state.croppedImageSize.width)}/${Math.floor(this.state.croppedImageSize.height)}/cats/`
  }
  formatBytes(bytes,decimals) {
     if(bytes === 0) return '0 Bytes';
     var k = 1024,
         dm = decimals <= 0 ? 0 : decimals || 2,
         sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
         i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files[0].size>1048576){
        this.setState({fileSizeExceeded:this.formatBytes(e.target.files[0].size)})
        return;
      }
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({
          src: reader.result,
          fileSizeExceeded: null,
        })
      );
      reader.readAsDataURL(e.target.files[0]);
      return;
    }
    this.setState({
      fileSizeExceeded: null,
      croppedImageUrl: null,
      src: null,
      croppedImageSize: null,
      previewUrl: ""
    })
  };

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {

    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({
        croppedImageUrl: croppedImageUrl,
        croppedImageSize:{height: crop.height, width: crop.width}
      });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <React.Fragment>
        <div>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        {this.state.fileSizeExceeded?
          <h3>Image size greater than 1MB: <font color="red">Image size {this.state.fileSizeExceeded}</font></h3>
          :
          src?
            <ReactCrop
              src={src}
              crop={crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              maxHeight={100}
              maxWidth={800}
            />
          :null
        }
        {croppedImageUrl && (
          <div>
            <h3>Image preview with size &nbsp;
              {this.state.croppedImageSize.width}x
              {this.state.croppedImageSize.height} px
            </h3>
          <img alt="Crop preview" style={{ maxWidth: "100%" }} src={croppedImageUrl} /></div>
        )}
        <div className="flex-padding">
          <button type="button" disabled={!croppedImageUrl} onClick={()=>{
            this.setState({
              previewUrl: this.saveImage()
            })
          }} > Save Image
          </button>
       </div>

        <div className="flex-content flex-padding">
          <div className="form-group">
            <input type="text" value={this.state.previewUrl}
            className="form-control" disabled />
          </div>
          &nbsp;&nbsp;
          <Link to={{ pathname: "/preview", search: `url=${this.state.previewUrl}`}} target="_blank">
            <button type="button" disabled={!this.state.previewUrl}>
              Print Preview
            </button>
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default Crop;
