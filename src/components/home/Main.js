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
    notificationsClicked: false,
    messagesClicked: false,
  };

  async componentDidMount() {
    await this.props
      .getUserData()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.code);
        localStorage.removeItem("FBIdToken");
        window.location.href = "/login";
      });
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
                window.location.pathname.includes("/messages")
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/messages"
              onClick={() => {
                this.setState({
                  selected: "messages",
                  messagesClicked: true,
                });
              }}
            >
              Messages{" "}
              <FontAwesomeIcon
                style={{ marginLeft: "20px" }}
                className="home-nav_sticky-messages"
                icon={faComments}
              />
              {!this.state.messagesClicked && this.props.userData ? (
                this.props.userData.data.notifications.filter(
                  (notification) => {
                    return notification.read === false;
                  }
                ).length !== 0 ? (
                  <span className="home-nav_sticky-messages_number">
                    {
                      this.props.userData.data.notifications.filter(
                        (notification) => {
                          return notification.read === false;
                        }
                      ).length
                    }
                  </span>
                ) : null
              ) : null}
            </Link>

            <Link
              className={
                this.state.selected === "notifications" ||
                window.location.pathname === "/notifications"
                  ? "home-nav_sticky_selected"
                  : "home-nav_sticky_default"
              }
              to="/notifications"
              onClick={async () => {
                await this.setState({
                  selected: "notifications",
                  notificationsClicked: true,
                });
              }}
            >
              Notifications{" "}
              <div className="home-nav_sticky-notifications">
                <FontAwesomeIcon
                  className="home-nav_sticky-icon"
                  icon={faBell}
                ></FontAwesomeIcon>
                {!this.state.notificationsClicked && this.props.userData ? (
                  this.props.userData.data.notifications.filter(
                    (notification) => {
                      return notification.read === false;
                    }
                  ).length !== 0 ? (
                    <span className="home-nav_sticky-notifications_number">
                      {
                        this.props.userData.data.notifications.filter(
                          (notification) => {
                            return notification.read === false;
                          }
                        ).length
                      }
                    </span>
                  ) : null
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
                window.location.pathname === "/post" ||
                this.state.selected === "post"
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
        <section className="home-nav_bottom">
          <div className="home-nav_bottom">
            <Link
              className={
                this.state.selected === "home" ||
                window.location.pathname === "/"
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/"
              onClick={() => {
                this.setState({
                  selected: "home",
                });
              }}
            >
              <FontAwesomeIcon className="home-nav_bottom-icon" icon={faHome} />
            </Link>

            <Link
              className={
                this.state.selected === "messages" ||
                window.location.pathname.includes("/messages")
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/messages"
              onClick={() => {
                this.setState({
                  selected: "messages",
                  messagesClicked: true,
                });
              }}
            >
              <div className="home-nav_bottom-messages">
                <FontAwesomeIcon
                  className="home-nav_bottom-icon"
                  icon={faComments}
                />
                {!this.state.messagesClicked && this.props.userData ? (
                  this.props.userData.data.notifications.filter(
                    (notification) => {
                      return notification.read === false;
                    }
                  ).length !== 0 ? (
                    <span className="home-nav_bottom-messages_number">
                      {
                        this.props.userData.data.notifications.filter(
                          (notification) => {
                            return notification.read === false;
                          }
                        ).length
                      }
                    </span>
                  ) : null
                ) : null}
              </div>
            </Link>

            <Link
              className={
                this.state.selected === "notifications" ||
                window.location.pathname === "/notifications"
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/notifications"
              onClick={async () => {
                await this.setState({
                  selected: "notifications",
                  notificationsClicked: true,
                });
              }}
            >
              <div className="home-nav_bottom-notifications">
                <FontAwesomeIcon
                  className="home-nav_bottom-icon"
                  icon={faBell}
                ></FontAwesomeIcon>
                {!this.state.notificationsClicked && this.props.userData ? (
                  this.props.userData.data.notifications.filter(
                    (notification) => {
                      return notification.read === false;
                    }
                  ).length !== 0 ? (
                    <span className="home-nav_bottom-notifications_number">
                      {
                        this.props.userData.data.notifications.filter(
                          (notification) => {
                            return notification.read === false;
                          }
                        ).length
                      }
                    </span>
                  ) : null
                ) : null}
              </div>
            </Link>

            <Link
              className={
                this.state.selected === "workout" ||
                window.location.pathname === "/workout"
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/workout"
              onClick={() => {
                this.setState({
                  selected: "workout",
                });
              }}
            >
              <FontAwesomeIcon
                className="home-nav_bottom-icon"
                icon={faDumbbell}
              />
            </Link>

            <Link
              className={
                this.state.selected === "profile" ||
                window.location.pathname === "/profile"
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/profile"
              onClick={() => {
                this.setState({
                  selected: "profile",
                });
              }}
            >
              <FontAwesomeIcon className="home-nav_bottom-icon" icon={faUser} />
            </Link>

            <Link
              className={
                window.location.pathname === "/post" ||
                this.state.selected === "post"
                  ? "home-nav_bottom_selected"
                  : "home-nav_bottom_default"
              }
              to="/post"
              onClick={() => {
                this.setState({
                  selected: "post",
                });
              }}
            >
              <FontAwesomeIcon className="home-nav_bottom-icon" icon={faPen} />
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
