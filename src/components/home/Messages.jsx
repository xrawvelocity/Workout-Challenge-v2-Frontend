import React, { Component } from "react";
import services from "./../../services";
import { connect } from "react-redux";
import { getUserData, getAllUsersData } from "../../actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import * as firebase from "firebase";

class Messages extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      body: "",
      openChats: [],
    };

    this.mesRef = React.createRef();
    this.message = React.createRef();
  }

  mesRef = React.createRef();

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
    await this.props.getAllUsersData();
    let allChats = await services.getAllChats();
    await this.setState({
      actualChats: allChats.data,
    });
    const rootRef = firebase.database().ref();
    // rootRef.update({ chats: this.state.actualChats });
    rootRef.on("child_changed", (snap) => {
      this.setState({
        actualChats: snap.val().filter(chat=>{
          return chat.userOne === this.props.userData.data.credentials.handle || chat.userTwo === this.props.userData.data.credentials.handle
        }),
      });
      console.log(snap.val())
    });
    this.scrollToBottom();
    console.log("ALL CHATS----", allChats);
    console.log("STATE--------", this.state);
    console.log("PROPS--------", this.props);
  }

  showPeople = () => {
    return this.state.actualChats.map((chat) => {
      let otherUser;
      let otherUserImage;
      if (chat.userOne === this.props.userData.data.credentials.handle) {
        otherUser = chat.userTwo;
        otherUserImage = chat.userTwoImage;
        if (!this.state.openChats.includes(otherUser)) {
          this.setState({
            openChats: [...this.state.openChats, otherUser],
          });
        }
      } else if (chat.userTwo === this.props.userData.data.credentials.handle) {
        otherUser = chat.userOne;
        otherUserImage = chat.userOneImage;
        if (!this.state.openChats.includes(otherUser)) {
          this.setState({
            openChats: [...this.state.openChats, otherUser],
          });
        }
      }
      return (
        <Link
          onClick={async () => {
            await this.setState({ selectedUser: otherUser });
            console.log(this.state.selectedUser);
          }}
          to={`/messages/${otherUser}`}
          className={
            this.props.match
              ? this.props.match.params.username === otherUser
                ? "messages-people-card_selected"
                : "messages-people-card"
              : "messages-people-card"
          }
        >
          <Link
            to={`/profile/${otherUser}`}
            className="messages-people-card_avatar"
          >
            <img
              src={otherUserImage ? otherUserImage : "./img/userdefault.png"}
              alt="avatar"
              className="messages-people-card_avatar-image"
            />
          </Link>

          <div className="messages-people-card_username">{otherUser}</div>
        </Link>
      );
    });
  };

  scrollToBottom = () => {
    if (this.props.match && this.props.match.params.username) {
      this.mesRef.current.scrollTop = this.mesRef.current.scrollHeight;
    }
  };

  showChatbox = () => {
    if (this.props.match && this.props.match.params.username) {
      return (
        <div className="chatbox">
          <div className="chatbox__content">
            <div className="chatbox__top">
              <h1 className="chatbox__top-username">
                {this.props.match.params.username}
              </h1>
              <Link to="/messages" className="chatbox__close">
                &times;
              </Link>
            </div>
            <div ref={this.mesRef} className="chatbox__middle">
              <div className="chatbox__middle-content">
                {this.showMessages()}
              </div>
            </div>
            <div className="chatbox__bottom">
              <form
                onSubmit={(e) => this.submitMessage(e)}
                className="chatbox__bottom-form"
              >
                <textarea
                  onChange={async (e) => {
                    await this.setState({
                      body: e.target.value,
                    });
                  }}
                  value={this.state.body}
                  ref={(input) => {
                    this.message = input;
                  }}
                  type="text"
                  name="message"
                  className="chatbox__bottom-form-message"
                  placeholder="Type your message"
                  autoFocus
                  maxLength="200"
                  required
                />
                <button className="chatbox__bottom-form-submit" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="messages-list_empty">No user selected</div>;
    }
  };

  showMessages = () => {
    setTimeout(() => {
      this.scrollToBottom();
    }, 200);
    let realChat = this.state.actualChats.filter((chat) => {
      return (
        chat.userOne === this.props.match.params.username ||
        chat.userTwo === this.props.match.params.username
      );
    });
    return realChat[0].messages.map((eachMessage) => {
      if (
        eachMessage.sender === this.props.userData.data.credentials.handle &&
        eachMessage.receiver === this.props.match.params.username
      ) {
        return (
          <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
            {eachMessage.body}
          </div>
        );
      } else if (
        eachMessage.receiver === this.props.userData.data.credentials.handle &&
        eachMessage.sender === this.props.match.params.username
      ) {
        return (
          <div className="chatbox__middle-bubble chatbox__middle-bubble-receiver">
            {eachMessage.body}
          </div>
        );
      }
    });
  };

  submitMessage = async (e) => {
    e.preventDefault();
    let realChat = this.state.actualChats.filter((chat) => {
      return (
        chat.userOne === this.props.match.params.username ||
        chat.userTwo === this.props.match.params.username
      );
    });
    if (this.state.body.trim() !== "") {
      await services
        .sendMessage(realChat[0].chatId, {
          body: this.state.body,
          handle: this.props.match.params.username,
        })
        .then((data) => console.log("success", data))
        .catch((err) => {
          console.log("failed", err);
          // localStorage.removeItem("FBIdToken");
          // window.location.href = "/login";
        });
      // const dbRefChat = rootRef.child("chats");
      // const chatRef = dbRefChat.child("wCoK7ODpIpJXI9eCYQgy");
      // const messageRef = chatRef.child("messages");
      // messageRef.update({body: this.state.body});
      let allChats = await services.getAllChats();
      await this.setState({
        actualChats: allChats.data,
        body: "",
      });
      const rootRef = firebase.database().ref();
      rootRef.update({ chats: this.state.actualChats });
      // this.message.focus();
      // this.scrollToBottom();
    } else {
      console.log("MESSAGE MUST NOT BE EMPTY");
    }
  };

  chatStarted = (handle) => {
    return this.state.openChats.includes(handle);
  };

  showUsers = () => {
    let actualUsers = this.props.allUsersData.data.filter((user) => {
      return user.handle
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    return actualUsers.map((user) => {
      if (this.chatStarted(user.handle)) {
        return (
          <Link
            onClick={() => {
              this.setState({
                search: "",
              });
            }}
            to={`/messages/${user.handle}`}
            className="messages-people_search-results-each"
          >
            <div className="messages-people_search-results-each_avatar">
              <img
                src={user.imageUrl ? user.imageUrl : "./img/userdefault.png"}
                alt="avatar"
                className="messages-people_search-results-each_avatar-img"
              />
            </div>
            <div className="messages-people_search-results-each_username">
              {user.handle}
            </div>
            <div className="messages-people_search-results-each_username_action">
              Open Chat
            </div>
          </Link>
        );
      } else {
        return (
          <div
            onClick={async () => {
              await services
                .createChat({
                  userTwoHandle: user.handle,
                  userTwoImageUrl: user.imageUrl,
                })
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err.code);
                  localStorage.removeItem("FBIdToken");
                  window.location.href = "/login";
                });
              await this.setState({
                search: "",
              });
              console.log("user clicked: ", user);
              let allChats = await services.getAllChats();
              await this.setState({
                actualChats: allChats.data,
              });
              this.props.history.push(`/messages/${user.handle}`);
            }}
            className="messages-people_search-results-each"
          >
            <div className="messages-people_search-results-each_avatar">
              <img
                src={user.imageUrl ? user.imageUrl : "./img/userdefault.png"}
                alt="avatar"
                className="messages-people_search-results-each_avatar-img"
              />
            </div>
            <div className="messages-people_search-results-each_username">
              {user.handle}
            </div>
            <div className="messages-people_search-results-each_username_action">
              Create Chat
            </div>
          </div>
        );
      }
    });
  };

  render() {
    return this.props.userData && this.state.actualChats ? (
      <main className="messages">
        <section className="messages-people">
          <input
            className="messages-people_search"
            type="text"
            placeholder="Search for a user..."
            maxLength="30"
            onChange={(e) => {
              this.setState({ search: e.target.value });
            }}
            value={this.state.search}
          />
          {this.state.search.trim() !== "" ? (
            <div className="messages-people_search-results">
              {this.showUsers()}
            </div>
          ) : null}
          {this.showPeople()}
        </section>
        <section className="messages-list">{this.showChatbox()}</section>
      </main>
    ) : (
      <div style={{marginTop: "50px", fontSize: 50 }} className="form-button_loading"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData, allUsersData: state.allUsersData };
};

export default connect(mapStateToProps, { getUserData, getAllUsersData })(
  Messages
);
