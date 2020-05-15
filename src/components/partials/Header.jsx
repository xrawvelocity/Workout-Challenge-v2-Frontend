import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRunning
} from "@fortawesome/free-solid-svg-icons";

export default class Header extends Component {
  logOut = async () => {
    await localStorage.removeItem("FBIdToken");
    window.location.href = '/';
  };

  render() {
    return (
      <nav>
        <div className="nav">
          <Link to="/" className="logo">
            <FontAwesomeIcon className="logo-img" icon={faRunning} />
            <div className="title">
              <span><span className="title-green">fit</span><span></span></span>
              <span><span className="title-green"></span><span>social</span></span>
            </div>
          </Link>
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
