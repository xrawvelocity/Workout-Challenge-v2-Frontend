import React, { Component } from "react";

export default class Day extends Component {
  render() {
      console.log('day rendered')
    return (
      <div>
        <h2>Day {this.props.day}:</h2>
        <p>Pushups: {this.props.pushups}</p>
        <p>Pullups: {this.props.pullups}</p>
        <p>Leg Raises: {this.props.legraises}</p>
        <p>Squats: {this.props.squats}</p>
      </div>
    );
  }
}
