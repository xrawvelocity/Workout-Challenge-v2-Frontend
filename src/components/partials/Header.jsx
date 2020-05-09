import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  logOut = async () => {
    await localStorage.removeItem("FBIdToken");
    window.location.href = '/';
  };

  render() {
    return (
      <nav>
        <div className="nav">
          <div>
            <div className="title">
              <span className="title-green">Workout</span>{" "}
              <span> Challenge</span>
            </div>
          </div>
          <ul>
            {localStorage.getItem("FBIdToken") ? (
              <Fragment>
                <div className="progress progress__hidden">
                  <div className="progress-bar" id="progress"></div>
                  <h1 className="progress-text">{`${this.props.progress}%`}</h1>
                </div>
                <div onClick={this.logOut} className="nav-link">
                  Log Out
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="progress progress__hidden">
                  <div className="progress-bar" id="progress"></div>
                  <h1 className="progress-text">{`${this.props.progress}%`}</h1>
                </div>
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
