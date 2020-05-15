import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import services from "./../../services/index";
import { getUserData, getOneUserData } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faLink,
  faCalendarAlt,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

class OtherProfile extends Component {
  state = {
    loading: false,
    empty: false,
  };

  async componentDidMount() {
    await this.props.getUserData();
    console.log(this.props.match.params);
    await this.props.getOneUserData(this.props.match.params.username);
    console.log(this.props);
    await this.setState({ loading: true });
    if (this.props.otherUserData.data.posts) {
      await this.setState({ loading: false });
    }
    if (this.props.otherUserData.data.posts.length === 0) {
      await this.setState({ empty: true });
    }
    console.log(this.props);
  }

  hasLiked = (postId) => {
    if (this.props.userData.data.likes) {
      return this.props.userData.data.likes.some((like) => {
        return like.postId === postId;
      });
    }
  };

  hasFollowed = (handle) => {
    if (this.props.userData.data.following) {
      return this.props.userData.data.following.some((follow) => {
        return follow.otherUser === handle;
      });
    }
  };

  showPosts = () => {
    if (this.props.otherUserData && this.props.userData) {
      dayjs.extend(relativeTime);
      return this.props.otherUserData.data.posts.map((post) => {
        return (
          <div key={post.postId} className="home-feed-posts-card">
            <Link
              to={
                post.userHandle === this.props.userData.data.credentials.handle
                  ? "/profile"
                  : `/profile/${post.userHandle}`
              }
              className="home-feed-posts-card-avatar"
            >
              <img
                src={post.userImage}
                alt="avatar"
                className="home-feed-posts-card-avatar-img"
              />
            </Link>
            <div>
              <Link
                to={`/post/${post.postId}`}
                className="home-feed-posts-card-content"
              >
                <div className="home-feed-posts-card-content-top">
                  <div className="home-feed-posts-card-content-top_name">
                    @{post.userHandle}
                  </div>
                  <div className="home-feed-posts-card-content-top_time">
                    &bull; {dayjs(post.createdAt).fromNow()}
                  </div>
                </div>
                <div className="home-feed-posts-card-content-middle">
                  <div>{post.body}</div>
                </div>
              </Link>

              <div className="home-feed-posts-card-content-bottom">
                {this.hasLiked(post.postId) ? (
                  <div
                    onClick={async (e) => {
                      e.stopPropagation();
                      await services.unlikePost(post.postId);
                      await this.props.getUserData();
                      await this.props.getOneUserData(
                        this.props.match.params.username
                      );
                    }}
                  >
                    {post.likeCount}{" "}
                    <FontAwesomeIcon
                      className="home-feed-posts-card-content-bottom_liked"
                      icon={faHeart}
                    />
                  </div>
                ) : (
                  <div
                    onClick={async (e) => {
                      e.stopPropagation();
                      await services
                        .likePost(post.postId)
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
                      await this.props.getUserData();
                      await this.props.getOneUserData(
                        this.props.match.params.username
                      );
                    }}
                  >
                    {post.likeCount}{" "}
                    <FontAwesomeIcon
                      className="home-feed-posts-card-content-bottom_like"
                      icon={faHeart}
                    />
                  </div>
                )}
                <div>
                  {post.commentCount}{" "}
                  <Link
                    className="home-feed-posts-card-content-bottom_comment-parent"
                    to={`/post/${post.postId}`}
                  >
                    <FontAwesomeIcon
                      className="home-feed-posts-card-content-bottom_comment"
                      icon={faComment}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div style={{ fontSize: 50 }} className="form-button_loading"></div>
      );
    }
  };

  render() {
    return this.props.otherUserData ? (
      <Fragment>
        <section className="profile">
          <Fragment>
            <div className="profile-top">
              <div className="profile-top-left">
                <div className="profile-top-left-avatar">
                  <img
                    className="profile-top-left-avatar_image"
                    src={this.props.otherUserData.data.user.imageUrl}
                    alt="avatar"
                  />
                </div>
                <div className="profile-top-left-username">
                  {this.props.otherUserData.data.user.handle}
                </div>
              </div>
              <div className="profile-top-right">
                {this.hasFollowed(this.props.otherUserData.data.user.handle) ? (
                  <button
                    onClick={async () => {
                      await services.unfollowUser(
                        this.props.otherUserData.data.user.handle
                      );
                      await this.props.getUserData();
                      await this.props.getOneUserData(
                        this.props.match.params.username
                      );
                    }}
                    className="profile-top-right-edit"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      await services.followUser(
                        this.props.otherUserData.data.user.handle
                      );
                      await this.props.getUserData();
                      await this.props.getOneUserData(
                        this.props.match.params.username
                      );
                    }}
                    className="profile-top-right-edit"
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className="profile-info">
              {this.props.otherUserData.data.user.bio && (
                <div className="profile-info-bio">
                  {this.props.otherUserData.data.user.bio}
                </div>
              )}
              <div className="profile-info-other">
                <div className="profile-info-other-location">
                  {this.props.otherUserData.data.user.location && (
                    <Fragment>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                      {this.props.otherUserData.data.user.location}
                    </Fragment>
                  )}
                </div>
                <div className="profile-info-other-website">
                  {this.props.otherUserData.data.user.website && (
                    <Fragment>
                      <FontAwesomeIcon icon={faLink} />{" "}
                      <a
                        className="profile-info-other-website-link"
                        href={this.props.otherUserData.data.user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {
                          this.props.otherUserData.data.user.website.split(
                            "//"
                          )[1]
                        }
                      </a>
                    </Fragment>
                  )}
                </div>
                <div className="profile-info-other-joined">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Joined{" "}
                  {new Date(
                    Date.parse(this.props.otherUserData.data.user.createdAt)
                  )
                    .toDateString()
                    .substr(4)}
                </div>
              </div>
            </div>
          </Fragment>

          <div className="profile-info-other-follows">
            <div className="profile-info-other-follows_following">
              {this.props.otherUserData.data.following &&
                this.props.otherUserData.data.following.length}{" "}
              Following
            </div>
            <div className="profile-info-other-follows_followers">
              {this.props.otherUserData.data.followers &&
                this.props.otherUserData.data.followers.length}{" "}
              Followers
            </div>
          </div>

          {this.state.empty ? (
            <div className="profile-content">No posts yet...</div>
          ) : (
            <div className="profile-content">{this.showPosts()}</div>
          )}
        </section>
        <section></section>
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData, otherUserData: state.otherUserData };
};

export default connect(mapStateToProps, { getUserData, getOneUserData })(
  OtherProfile
);
