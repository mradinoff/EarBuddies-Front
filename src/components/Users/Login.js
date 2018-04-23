import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FlatButton from 'material-ui/FlatButton';
import { Redirect } from 'react-router';
//import { Link } from 'react-router-dom'
import axios from 'axios';

class HomeButton extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Home" />
    );
  }
}


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    let url = "https://earbuddies1.herokuapp.com/user_token";
    
    let postData = {
          auth: {
          email: this.state.email,
          password: this.state.password
        }
    }

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    }

    axios.post(url, postData, axiosConfig)
      .then((res) => {
        console.log("RESPONSE RECEIVED: ", res);
        let token = res.data.jwt;
        localStorage.setItem('jwtToken', token);
        if(res.status === 201) {
          this.setState({redirect: true})
        }
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      })

  }

  render() {
    return (
      <div>
        
          <div>
            <AppBar title="Login"
            iconElementRight= {<HomeButton onClick={<Redirect to="/"/>} />} />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) =>
                this.setState({ email: newValue })
              }
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
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </div>
        
        {this.state.redirect ? <Redirect to='/'/>:null}
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default Login;
