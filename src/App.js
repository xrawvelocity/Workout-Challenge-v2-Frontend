import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/home/Landing";
import Main from "./components/home/Main";

import jwtDecode from "jwt-decode";

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    authenticated = false;
    localStorage.removeItem("FBIdToken");
    window.location.href = "/login";
  } else {
    authenticated = true;
  }
}

export default class App extends Component {
  render() {
    return (
      <div>
        {authenticated ? (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Main {...props} />}
            ></Route>
          </Switch>
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Landing {...props} />}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} />}
            ></Route>
            <Route
              exact
              path="/signup"
              render={(props) => <Signup {...props} />}
            ></Route>
          </Switch>
        )}
      </div>
    );
  }
}
