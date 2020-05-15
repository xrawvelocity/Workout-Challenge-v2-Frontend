import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getUserData } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import services from "./../../services";
import { Link } from "react-router-dom";

class Nofitications extends Component {
  async componentDidMount() {
    await this.props.getUserData();
    await services.markNotificationRead(
      this.props.userData.data.notifications.map((a) => a.notificationId)
    );
    console.log(this.props)
  }

  showNotifications = () => {
    dayjs.extend(relativeTime);
    if(this.props.userData.data.notifications.length !== 0){
        return this.props.userData.data.notifications.map((notification) => {
          return (
            <Link
              to={
                notification.type === "like" || notification.type === "comment"
                  ? `/post/${notification.postId}`
                  : `/profile/${notification.sender}`
              }
              style={{ alignItems: "center" }}
              className={
                notification.read
                  ? "home-feed-posts-card_notifications_read"
                  : "home-feed-posts-card_notifications"
              }
            >
              <Link
                to={
                  notification.sender ===
                  this.props.userData.data.credentials.handle
                    ? "/profile"
                    : `/profile/${notification.sender}`
                }
                className="home-feed-posts-card-avatar"
              >
                <img
                  src={
                    notification.senderImage
                      ? notification.senderImage
                      : "./img/userdefault.png"
                  }
                  alt="avatar"
                  className="home-feed-posts-card-avatar-img"
                />
              </Link>
              <div className="home-feed-posts-card-content_comment">
                <div className="home-feed-posts-card-content-middle">
                  {notification.type === "like" && (
                    <Fragment>
                      <FontAwesomeIcon
                        style={{ color: "#d22", paddingTop: "4px" }}
                        icon={faHeart}
                      />{" "}
                      {notification.sender} liked your post{" "}
                    </Fragment>
                  )}
                  {notification.type === "comment" && (
                    <Fragment>
                      <FontAwesomeIcon
                        style={{ color: "#1da1f2", paddingTop: "4px" }}
                        icon={faComment}
                      />{" "}
                      {notification.sender} commented on your post{" "}
                    </Fragment>
                  )}
                  {notification.type === "follow" && (
                    <Fragment>
                      <FontAwesomeIcon
                        style={{ color: "#04ED04", paddingTop: "4px" }}
                        icon={faUser}
                      />{" "}
                      {notification.sender} followed you{" "}
                    </Fragment>
                  )}
                  {dayjs(notification.createdAt).fromNow()}
                </div>
              </div>
            </Link>
          );
        });
    } else {
        return <div className="notifications_none">No notifications to show</div>
    }
  };

  render() {
    return this.props.userData && <div className="notifications">{this.showNotifications()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData };
};

export default connect(mapStateToProps, { getUserData })(Nofitications);
