import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../earbuddies-logo.svg'
import './Home.css';

// const signOut = function () {

// }

class Nav extends Component {
  _signOut() {
    localStorage.removeItem("jwtToken");
  }

  _venuesClick = v =>{
    pathname: '/venues'
  }

  render() {
    return (
      <header>
        <nav className="nav_bar">

          <Link to="/">
            <img src={logo} alt=""/>
          </Link>
          <Link to = "/search" className ="navLink">Explore Events</Link>
          <Link to = '/venues' className="navLink">Venues</Link>
          <Link to ="#"></Link>

          {/* need to make this not display when on venues page */}

          {window.localStorage.jwtToken ? (
            <div>
            <Link to = "/profile" className="navLinkHelp">Profile</Link>
            <Link to = "/editprofile" className="navLinkHelp">Settings</Link>
            <Link to ="#"></Link>
            <Link to="/">
              <button className= "signOutNav" onClick={this._signOut}>Sign out</button>
            </Link>
            </div>

          ) : (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </header>
    );
  }
}

export default Nav;
