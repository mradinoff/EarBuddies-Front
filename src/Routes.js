import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

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
        <Route exact path="/swipe" component={Swipe} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);

export default Routes;
