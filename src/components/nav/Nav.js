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




class Login extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
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

// const Nav = () => {
//   <header>
//     <nav className="navbar navbar-nav navbar-dark bg-dark justify-content-between sticky-top">
//       <div className="container-fluid">
//         <div className="navbar-header">
//           <NavLink className="logo" to="/" exact={true} activeClassName="is-active">
//             Welcome to Burning Airlines
//           </NavLink>
//         </div>
//         {!window.localStorage.accessToken ? (
//           <div>
//             <NavLink to="/login" exact={true} activeClassName="is-active">
//               Login
//             </NavLink>
//             |
//             <NavLink to="/signup" activeClassName="is-active">
//               Signup
//             </NavLink>
//           </div>
//         ) : (
//           <div>
//             <NavLink to="/logout" activeClassName="is-active">
//               logout
//             </NavLink>
//             |
//             <NavLink to="/reservations" activeClassName="is-active">
//               Your Reservations
//             </NavLink>
//           </div>
//         )}
//       </div>
//     </nav>
//   </header>
// }




export default Nav;
