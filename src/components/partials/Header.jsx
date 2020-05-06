import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav">
          <div>
            <Link to="/" className="title">
              <span className="title-green">Workout</span>{" "}
              <span> Challenge</span>
            </Link>
          </div>
          <ul>
            {false ? (
              <Fragment>
                <div className="progress">
                  <div className="progress-bar" id="progress"></div>
                  <h1 className="progress-text">{`${this.props.progress}%`}</h1>
                </div>
                <a href="#top">
                  <li
                    onClick={this.props.selectCount}
                    className={
                      this.props.selected === "count" ? "selected" : "link"
                    }
                  >
                    Current Count
                  </li>
                </a>
                <a
                  href={
                    JSON.parse(localStorage.getItem("ids"))
                      ? `#day${
                          JSON.parse(localStorage.getItem("ids"))[
                            JSON.parse(localStorage.getItem("ids")).length - 1
                          ]
                        }`
                      : `#first`
                  }
                >
                  <li
                    onClick={this.props.selectDay}
                    className={
                      this.props.selected === "day" ? "selected" : "link"
                    }
                  >
                    Current Day
                  </li>
                </a>
              </Fragment>
            ) : (
              <Fragment>
                <div className="progress progress__hidden">
                  <div className="progress-bar" id="progress"></div>
                  <h1 className="progress-text">{`${this.props.progress}%`}</h1>
                </div>
                <Link className="nav-link" to="/login">
                  {/* Log In */}
                </Link>
                <Link className="nav-link" to="/signup">
                  Log Out
                </Link>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}
