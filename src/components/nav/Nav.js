import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../tmp-logo.svg'
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
          <Link to = '/venues' class="navLink">Venues</Link>
          <Link to = "/login" class ="navLink">Explore Events</Link>
          <Link to = "/login" class ="navLinkHelp">Help</Link>
          {/* need to make this not display when on venues page */}
          {window.localStorage.jwtToken ? (
            <Link to="/">
              <button class = "signOutNav" onClick={this._signOut}>Sign out</button>
            </Link>

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
