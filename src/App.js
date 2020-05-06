import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/home/Landing";
import Workout from "./components/profile/Workout";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Landing {...props} />}
          ></Route>
          <Route
            exact
            path="/home"
            render={(props) => <Home {...props} />}
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
          <Route
            exact
            path="/workout"
            render={(props) => <Workout {...props} />}
          ></Route>
        </Switch>
      </div>
    );
  }
}
