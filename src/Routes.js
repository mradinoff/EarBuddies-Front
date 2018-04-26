import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Swipe from "./components/friendships/Swipe"
import Concert from "./components/concerts/Concert"
import Profile from "./components/Users/Profile"
import SignUp from "./components/Users/Sign-Up";
import Login from "./components/Users/Login";
import Venues from "./components/concerts/Venues";
import Nav from './components/nav/Nav'
import Home from './components/nav/Home'
import EditProfile from './components/Users/EditProfile';
import Venue from './components/concerts/Venue';


const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: "#5C67E1"
  },
  flatButton: { primaryTextColor: "#5C67E1" }
});

const token = localStorage.getItem('jwtToken');

const Routes = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
    <Router>
      <React.Fragment>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Search" component={App} />
        <Route exact path="/Swipe" component={Swipe} />
        <Route exact path="/Profile" render={props => (
          token ? (
            <Profile {...props} token={token}/>
          ) : (
            <Redirect to="/login" />
          )
        )} />
        <Route exact path="/EditProfile" render={props => (
          token ? (
            <EditProfile {...props} token={token}/>
          ) : (
            <Redirect to="/login" />
          )
        )} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/venues" component={Venues}/>
        <Route exact path="/venues/:id" component={Venue}/>
        <Route exact path="/events/:id" component={Concert}/>
      </Switch>
      </React.Fragment>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
