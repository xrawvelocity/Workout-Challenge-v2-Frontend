import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserData, getAllUsersData } from "../../actions";
import { Link } from "react-router-dom";

class Messages extends Component {
  state = {};

  async componentDidMount() {
    await this.props.getUserData();
    console.log(this.props);
  }

  showPeople = () => {
    return this.props.userData.data.following.map((person) => {
      return (
        <Link
          onClick={async () => {
            await this.setState({ selectedUser: person.otherUser });
          }}
          to={`/messages/${person.otherUser}`}
          className={
            this.props.match
              ? this.props.match.params.username === person.otherUser
                ? "messages-people-card_selected"
                : "messages-people-card"
              : "messages-people-card"
          }
        >
          <div className="messages-people-card_avatar">
            <img
              className="messages-people-card_avatar-image"
              src={person.otherUserImage}
              alt="avatar"
            />
          </div>
          <div className="messages-people-card_username">
            {person.otherUser}
          </div>
        </Link>
      );
    });
  };

  showMessages = () => {
    if (this.props.match && this.props.match.params.username) {
      return <div>The user selected is {this.props.match.params.username}</div>;
    } else {
      return <div>No user selected</div>;
    }
  };

  render() {
    return (
      this.props.userData && (
        <main className="messages">
          <section className="messages-people">{this.showPeople()}</section>
          <section className="messages-list">{this.showMessages()}</section>
        </main>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData, allUsersData: state.allUsersData };
};

export default connect(mapStateToProps, { getUserData, getAllUsersData })(
  Messages
);
