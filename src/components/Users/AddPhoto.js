import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import Dropzone from "react-dropzone";
import CircularProgress from "material-ui/CircularProgress";
import "./Users.css"
import axios from "axios";

class AddPhoto extends Component {
  state = {
    name: "",
    imageUrl: "",
    imageId: "",
    onDrop: false
  };

  onDrop = files => {
    // prepare form data, use data key! 
    let data = new FormData();
    console.log(files);
    this.setState({ onDrop: true });
    data.append("avatar", files[0]);
    console.log(data);

    const url = `https://earbuddies1.herokuapp.com/users/${this.props.user.id}.json`;

    axios({
      url,
      method: "patch",
      data: data,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    }).then(res => {
      console.log(res);
      if (res.status === 200) {
        this.setState(prevState => ({
          onDrop: !prevState.onDrop
        }));
      }
    });
  };

  render() {
    return (
      <div style={{ maxWidth: 400, margin: 20 }} className="addImage">
        {!this.state.imageId && (
          <Dropzone className="dropZone"
            onDrop={this.onDrop}
            accept="image/*"
            maxSize={300000}
            multiple={false}
          >
            <div className="addImage">Drop an image or click to choose</div>
          </Dropzone>
        )}

        {this.state.onDrop && (
          <div className="addImage">
            <CircularProgress size={60} thickness={7} />
          </div>
        )}

        {this.state.name && (
          <RaisedButton
            style={{ margin: 20 }}
            onClick={this.onHandleUpload}
            primary={true}
            label="Click to Upload"
            type="submit"
          />
        )}
      </div>
    );
  }
}

export default AddPhoto;
