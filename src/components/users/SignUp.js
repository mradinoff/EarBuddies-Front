import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";

class SignUp extends Component {
  
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    success: ""
  }

  handleClick = () => {
    let url = "https://earbuddies1.herokuapp.com/users.json";

    let postData = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios
      .post(url, postData, axiosConfig)
      .then(res => {
        console.log("RESPONSE RECEIVED: ", res);
        console.log("new user url:", res.data.url);
        if (res.status === 201) {
          this.setState({ success: "Success your account was created!" });
        }
      })
      .catch(err => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <AppBar title="Sign Up" />
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) =>
              this.setState({ password: newValue })
            }
          />
          <br />
          <TextField
            type="password"
            hintText="Password confirmation"
            floatingLabelText="Password Confirmation"
            onChange={(event, newValue) =>
              this.setState({ password_confirmation: newValue })
            }
          />
          <br />
          <RaisedButton
            label="Submit"
            primary={true}
            style={style}
            onClick={this.handleClick}
          />
        </div>

        <p>{this.state.success}</p>
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default SignUp;
