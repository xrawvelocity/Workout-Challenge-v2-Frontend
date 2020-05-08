import React, { Component } from "react";
import Header from "../partials/Header";
import Home from "./Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPen,
  faDumbbell,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Messages from "./Messages";
import Profile from "../profile/Profile";

export default class Main extends Component {
  state = {
    selected: "home",
  };

  showComponent = () => {
    if (this.state.selected === "home") {
      return <Home />;
    } else if (this.state.selected === "messages") {
      return <Messages />;
    } else if (this.state.selected === "workouts") {
    } else if (this.state.selected === "profile") {
        return <Profile />
    } else if (this.state.selected === "post") {
    }
  };

  render() {
    return (
      <div>
        <Header />
        <main className="home">
          <section className="home-nav">
            <div className="home-nav_sticky">
              <div>
                <span
                  className={
                    this.state.selected === "home"
                      ? "home-nav_sticky-selected"
                      : ""
                  }
                  onClick={() => this.setState({ selected: "home" })}
                >
                  Home <FontAwesomeIcon icon={faHome} />
                </span>
              </div>
              <div>
                <span
                  className={
                    this.state.selected === "messages"
                      ? "home-nav_sticky-selected"
                      : ""
                  }
                  onClick={() => this.setState({ selected: "messages" })}
                >
                  Messages <FontAwesomeIcon icon={faComments} />
                </span>
              </div>
              <div>
                <span
                  className={
                    this.state.selected === "workouts"
                      ? "home-nav_sticky-selected"
                      : ""
                  }
                  onClick={() => this.setState({ selected: "workouts" })}
                >
                  Workouts <FontAwesomeIcon icon={faDumbbell} />
                </span>
              </div>
              <div>
                <span
                  className={
                    this.state.selected === "profile"
                      ? "home-nav_sticky-selected"
                      : ""
                  }
                  onClick={() => this.setState({ selected: "profile" })}
                >
                  Profile <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div>
                <span
                  className={
                    this.state.selected === "post"
                      ? "home-nav_sticky-selected"
                      : ""
                  }
                  onClick={() => this.setState({ selected: "post" })}
                >
                  Post <FontAwesomeIcon icon={faPen} />
                </span>
              </div>
            </div>
          </section>
          {this.showComponent()}
        </main>
      </div>
    );
  }
}
