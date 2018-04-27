import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import icon from '../images/signup.png'
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    success: ""
  };

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
      .then(() => {
        this.setState({ success: "Success your account was created!" });
        axios({
          url: "https://earbuddies1.herokuapp.com/user_token",
          method: "post",
          data: {
            auth: {
              email: this.state.email,
              password: this.state.password
            }
          }
        }).then(async (res) => {
          await localStorage.setItem("jwtToken", res.jwt);
          this.props.history.push("/EditProfile");
        });
      })
      .catch(err => {
        if(err.message.includes("422")) {
          alert("Password not matched!")
        };
      });
  };

  render() {
    return (
      <div>
        <div>
          <h2 style={{marginTop: '3em' }}>Sign Up</h2>
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
            disabled={this.state.email !== "" && this.state.password !== ""&& this.state.password_confirmation !== "" ? false : true}
            onClick={this.handleClick}
          />
        </div>
        <p>Must be over 18 years of age.</p>
        <p>By signing up you agree to our <a href="#">Terms & Conditions</a></p>.
        <p>{this.state.success}</p>


        <Link to="/">
          <img src={icon} alt="link to home"/>
        </Link>
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default SignUp;
