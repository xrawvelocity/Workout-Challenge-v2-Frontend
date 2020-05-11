import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPen,
  faDumbbell,
  faComments,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserData } from "../../actions";

class Main extends Component {
  state = {
    selected: "",
  };

  async componentDidMount() {
    await this.props.getUserData();
    console.log(
      this.props.userData.data.notifications.map((notification) => {
        return notification.read;
      }).length
    );
  }

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
              Home{" "}
              <FontAwesomeIcon className="home-nav_sticky-icon" icon={faHome} />
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
              Messages{" "}
              <FontAwesomeIcon
                className="home-nav_sticky-icon"
                icon={faComments}
              />
            </Link>

            <Link
              className={
                this.state.selected === "notifications" ||
                window.location.pathname === "/notifications"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/notifications"
              onClick={() => {
                this.setState({
                  selected: "notifications",
                });
              }}
            >
              Notifications{" "}
              <div className="home-nav_sticky-notifications">
                <FontAwesomeIcon
                  className="home-nav_sticky-icon"
                  icon={faBell}
                ></FontAwesomeIcon>
                {this.props.userData ? (
                  <span className="home-nav_sticky-notifications_number">
                    {
                      this.props.userData.data.notifications.map(
                        (notification) => {
                          return notification.read;
                        }
                      ).length
                    }
                  </span>
                ) : null}
              </div>
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
              Workouts{" "}
              <FontAwesomeIcon
                className="home-nav_sticky-icon"
                icon={faDumbbell}
              />
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
              Profile{" "}
              <FontAwesomeIcon className="home-nav_sticky-icon" icon={faUser} />
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
              Post{" "}
              <FontAwesomeIcon className="home-nav_sticky-icon" icon={faPen} />
            </Link>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

export default connect(mapStateToProps, { getUserData })(Main);
