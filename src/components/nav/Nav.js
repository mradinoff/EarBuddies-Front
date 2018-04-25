import React, { Component } from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import logo from '../../tmp-logo.svg'
=======
import './Home.css';
>>>>>>> 84a76f764025bd698ba16fbf18a33173450e6efe

// const signOut = function () {

// }

class Nav extends Component {
  _signOut() {
    localStorage.setItem("jwtToken", "");
  }

  render() {
    return (
      <header>
        <nav className="nav_bar">

          <Link to="/">
            <img src={logo} alt=""/>

          <Link to="/">EarBuddies

          </Link>
          {window.localStorage.jwtToken ? (
            <Link to="/">
              <button onClick={this._signOut}>Sign out</button>
            </Link>
          ) : (
            <div>
              <Link to="/login">Explore Events</Link>
              <Link to="/login">Help</Link>
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
