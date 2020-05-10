import React, { Component } from "react";
import Header from "../partials/Header";
import { Link } from "react-router-dom";
import services from "../../services/index";

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    loading: false,
    errors: {},
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, handle } = this.state;
    this.setState({ loading: true });
    await services
      .signUp({ email, password, confirmPassword, handle })
      .then(async (res) => {
        console.log(res.data);
        await localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        console.log(err)
        this.setState({
          loading: false,
          errors: err.response.data,
        });
        console.log(this.state.errors);
      });
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              {this.state.errors.email && (
                <div className="form-error">{this.state.errors.email}</div>
              )}
              <input
                onChange={(e) => this.handleChange(e)}
                type="email"
                className="form-input"
                required
                placeholder="gymjim93@gmail.com"
                name="email"
                value={this.state.email}
              />
              <label htmlFor="handle" className="form-label">
                Username
              </label>
              {this.state.errors.handle && (
                <div className="form-error">{this.state.errors.handle}</div>
              )}
              <input
                onChange={(e) => this.handleChange(e)}
                type="text"
                className="form-input"
                required
                placeholder="GymJim93"
                name="handle"
                value={this.state.handle}
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
              {this.state.errors.confirmPassword && (
                <div className="form-error">
                  {this.state.errors.confirmPassword}
                </div>
              )}
              <input
                onChange={(e) => this.handleChange(e)}
                type="password"
                className="form-input"
                required
                placeholder="******"
                name="confirmPassword"
                value={this.state.confirmPassword}
              />
              {this.state.errors.general && (
                <div className="form-error">{this.state.errors.general}</div>
              )}
              <div>
                {!this.state.loading ? (
                  <button type="submit" className="form-button">
                    Sign Up
                  </button>
                ) : (
                  <button disabled type="submit" className="form-button">
                    <div className="form-button_loading"></div>
                  </button>
                )}
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
