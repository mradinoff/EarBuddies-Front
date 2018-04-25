import React, { Component } from "react";
import { Link } from "react-router-dom";
import './Home.css';

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
          <Link to="/">EarBuddies
          </Link>
          {window.localStorage.jwtToken ? (
            <Link to="/">
              <button onClick={this._signOut}>Sign out</button>
            </Link>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      </header>
    );
  }
}

export default Nav;
