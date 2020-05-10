import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPen,
  faDumbbell,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default class Main extends Component {
  state = {
    selected: "",
  };

  render() {
    return (
      <Fragment>
        <section className="home-nav">
          <div className="home-nav_sticky">
            <Link
              className={
                this.state.selected === "home" ||
                window.location.pathname === "/"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/"
              onClick={() => {
                this.setState({
                  selected: "home",
                });
              }}
            >
              Home <FontAwesomeIcon icon={faHome} />
            </Link>

            <Link
              className={
                this.state.selected === "messages" ||
                window.location.pathname === "/messages"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/messages"
              onClick={() => {
                this.setState({
                  selected: "messages",
                });
              }}
            >
              Messages <FontAwesomeIcon icon={faComments} />
            </Link>

            <Link
              className={
                this.state.selected === "workout" ||
                window.location.pathname === "/workout"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/workout"
              onClick={() => {
                this.setState({
                  selected: "workout",
                });
              }}
            >
              Workouts <FontAwesomeIcon icon={faDumbbell} />
            </Link>

            <Link
              className={
                this.state.selected === "profile" ||
                window.location.pathname === "/profile"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/profile"
              onClick={() => {
                this.setState({
                  selected: "profile",
                });
              }}
            >
              Profile <FontAwesomeIcon icon={faUser} />
            </Link>

            <Link
              className={
                this.state.selected === "post" ||
                window.location.pathname === "/post"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/post"
              onClick={() => {
                this.setState({
                  selected: "post",
                });
              }}
            >
              Post <FontAwesomeIcon icon={faPen} />
            </Link>
          </div>
        </section>
      </Fragment>
    );
  }
}
