import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import services from "../../services/index";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
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
    const { email, password } = this.state;
    this.setState({ loading: true });
    await services
      .logIn({ email, password })
      .then(async (res) => {
        console.log(res.data);
        await localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          errors: err.response.data,
        });
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
              <label htmlFor="username" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => this.handleChange(e)}
                type="email"
                className="form-input"
                required
                placeholder="gymjim93@email.com"
                name="email"
                value={this.state.email}
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
              {this.state.errors.general && (
                <div className="form-error">{this.state.errors.general}</div>
              )}
              <div>
                {!this.state.loading ? (
                  <button type="submit" className="form-button">
                    Log In
                  </button>
                ) : (
                  <button disabled type="submit" className="form-button">
                    <div className="form-button_loading"></div>
                  </button>
                )}
                <div className="form-member">
                  <span>Not a member?</span>
                  <span>
                    <Link to="/signup">Sign Up</Link> now!
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
