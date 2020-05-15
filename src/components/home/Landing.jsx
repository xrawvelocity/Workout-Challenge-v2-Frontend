import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Header />
        <main>
          <div className="landing">
            <div className="landing-image">
              <img src="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2397x1600/5ee21529db5b4961f73e697ebe9e215d/photo-1574680096145-d05b474e2155.jpg" alt="landing" />
            </div>
            <div className="landing-heading">
              <span>Stay Active</span>
              <span>Stay Achieving</span>
              <span>Stay Accountable</span>
              <Link to="/signup" className="landing-heading-btn">Join Now!</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
