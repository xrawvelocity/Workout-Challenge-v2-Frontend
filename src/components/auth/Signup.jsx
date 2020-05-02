import React, { Component } from "react";
import Header from "../partials/Header";
import { Link } from "react-router-dom";

export default class Signup extends Component {
  state = {};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      alert("passwords match!" + JSON.stringify(this.state));
    } else {
      alert("passwords dont match!" + JSON.stringify(this.state));
    }
  };

  render() {
    return (
      <div>
        <Header />
        <main>
          <div className="landing">
            <div className="landing-image">
              <img src="./img/workoutLanding.jpg" alt="landing" />
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)} className="form">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                className="form-input"
                required
                placeholder="GymJim93"
                name="username"
                value={this.state.username}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => this.handleChange(e)}
                type="password"
                className="form-input"
                required
                placeholder="******"
                name="password"
                value={this.state.password}
              />
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                onChange={(e) => this.handleChange(e)}
                type="password"
                className="form-input"
                required
                placeholder="******"
                name="confirmPassword"
                value={this.state.confirmPassword}
              />
              <div>
                <button type="submit" className="form-button">
                  Sign Up
                </button>
                <div className="form-member">
                  <span>Already a member?</span>
                  <span>
                    <Link to="/login">Log In</Link> instead
                  </span>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }
}
