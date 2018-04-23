import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
<<<<<<< HEAD
import Swipe from "./components/friendships/Swipe"
import Concerts from "./components/concerts/Concerts"
import Concert from "./components/concerts/Concert"
import Profile from "./components/users/Profile"
import SignUp from "./components/users/SignUp";
import Login from "./components/users/Login";
=======
import Swipe from "./components/friendships/Swipe";
import Concerts from "./components/concerts/Concerts";
import Profile from "./components/Users/Profile";
//import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
>>>>>>> 6fc194227c88e020f6618bf8be3f046254c9e512

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const Routes = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/Swipe" component={Swipe} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/events" component={Concerts}/>
        
        <Route exact path="/login" component={Login}/>
        <Route exact path="/events" component={Concerts}/>
        <Route exact path="/events/:id" component={Concert}/>
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
