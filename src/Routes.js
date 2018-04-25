import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Swipe from "./components/friendships/Swipe"
import Concert from "./components/concerts/Concert"
import Profile from "./components/Users/Profile"
import Attending from "./components/friendships/Attending"
//import SignUp from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import Venues from "./components/concerts/Venues";
import Venue from "./components/concerts/Venue"
import Nav from './components/nav/Nav'
import EditProfile from './components/Users/EditProfile'


const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const Routes = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Router>
      <React.Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/attending" component={Attending} />

        <Route exact path="/Swipe" component={Swipe} />
        <Route exact path="/Profile" component={Profile} />
        <Route exact path="/EditProfile" component={EditProfile} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/venues" component={Venues}/>
        <Route exact path="/venues/:id" component={Venue}/>
        <Route exact path="/events/:id" component={Concert}/>
      </Switch>
      </React.Fragment>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
