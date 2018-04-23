import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';


import { Link } from 'react-router-dom'




const signOut = function () {

}



class Nav extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    logged: true,
  };

  render(){
    return (
      <header>
        <nav className="nav_bar">
          <Link to="/"><img src="" alt="logo"/></Link>
          { window.localStorage.jwtToken ? <Link to="/signup">Logout</Link>:
          <div>
            <Link to="/login">Login</Link>
          </div>
          }
        </nav>
      </header>
    )
  }

}


export default Nav;
