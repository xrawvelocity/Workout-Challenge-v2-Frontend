import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/home/Landing";
import Main from "./components/home/Main";

import jwtDecode from "jwt-decode";
import Profile from "./components/profile/Profile";
import OtherProfile from "./components/profile/OtherProfile";
import Workout from "./components/profile/Workout";
import Header from "./components/partials/Header";
import Home from "./components/home/Home";
import Messages from "./components/home/Messages";
import Notifications from "./components/home/Nofitications";
import AddPost from "./components/profile/AddPost";
import Post from "./components/home/Post";

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
          <Fragment>
            <Header />
            <main className="home">
              <Main />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => <Home {...props} />}
                ></Route>
                <Route
                  exact
                  path="/messages"
                  render={() => <Messages />}
                ></Route>
                <Route
                  exact
                  path="/messages/:username"
                  render={props => <Messages {...props} />}
                ></Route>
                <Route exact path="/workout" render={() => <Workout />}></Route>
                <Route exact path="/profile" render={() => <Profile />}></Route>
                <Route exact path="/profile/:username" render={(props) => <OtherProfile {...props} />}></Route>
                <Route exact path="/post" render={() => <AddPost />}></Route>
                <Route exact path="/post/:postId" render={(props) => <Post {...props} />}></Route>
                <Route exact path="/notifications" render={(props) => <Notifications {...props} />}></Route>
              </Switch>
            </main>
          </Fragment>
        ) : (
          <Switch>
            <Route exact path="/" render={() => <Landing />}></Route>
            <Route exact path="/login" render={() => <Login />}></Route>
            <Route exact path="/signup" render={() => <Signup />}></Route>
            <Route exact path="/messages" render={() => <Login />}></Route>
            <Route exact path="/workout" render={() => <Login />}></Route>
            <Route exact path="/profile" render={() => <Login />}></Route>
            <Route exact path="/post" render={() => <Login />}></Route>
          </Switch>
        )}
      </div>
    );
  }
}
