import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import services from "./../../services/index";
import { getUserData, getAllPosts } from "../../actions";
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

class Profile extends Component {
  state = {
    loading: false,
    empty: false,
    edit: false,
    info: {
      bio: "",
      website: "",
      location: "",
    },
  };

  async componentDidMount() {
    await this.props
      .getUserData()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.code);
        localStorage.removeItem("FBIdToken");
        this.props.history.push("/login");
      });
    await this.setState({ loading: true });
    await this.props.getAllPosts();
    if (this.props.allPosts) {
      await this.setState({ loading: false });
      await this.setState({
        sortedPosts: this.props.allPosts.data
          .filter((post) => {
            return (
              post.userHandle === this.props.userData.data.credentials.handle
            );
          })
          .sort((a, b) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          }),
      });
    }
    if (this.state.sortedPosts.length === 0) {
      await this.setState({ empty: true });
    }
    console.log(this.props);
  }

  hasLiked = (postId) => {
    return this.props.userData.data.likes.some((like) => {
      return like.postId === postId;
    });
  };

  showPosts = () => {
    console.log(this.state.sortedPosts);
    if (this.state.sortedPosts) {
      dayjs.extend(relativeTime);
      return this.state.sortedPosts.map((post) => {
        return (
          <div key={post.postId} className="home-feed-posts-card">
            <div className="home-feed-posts-card_menu">
              <input
                className="home-feed-posts-card_menu-input"
                type="checkbox"
              />
              <div className="home-feed-posts-card_menu-dots">
                <span>&bull;</span>
                <span>&bull;</span>
                <span>&bull;</span>
              </div>
              <div className="home-feed-posts-card_menu-close">
                <span>&times;</span>
              </div>
              <div
                onClick={async () => {
                  let thisPostId = post.postId;
                  await services.deleteOnePost(thisPostId);
                  await this.setState({
                    sortedPosts: this.state.sortedPosts.filter((post) => {
                      return post.postId !== thisPostId;
                    }),
                  });
                }}
                className="home-feed-posts-card_menu-dropdown"
              >
                <span className="home-feed-posts-card_menu-dropdown_delete">
                  Delete post
                </span>
              </div>
            </div>
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
                    {post.userHandle}
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
                      await this.props.getAllPosts();
                      await this.props.getUserData();
                      await this.setState({
                        sortedPosts: this.props.allPosts.data
                          .filter((post) => {
                            return (
                              post.userHandle ===
                              this.props.userData.data.credentials.handle
                            );
                          })
                          .sort((a, b) => {
                            return (
                              Date.parse(b.createdAt) - Date.parse(a.createdAt)
                            );
                          }),
                      });
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
                      await this.props.getAllPosts();
                      await this.props.getUserData();
                      await this.setState({
                        sortedPosts: this.props.allPosts.data
                          .filter((post) => {
                            return (
                              post.userHandle ===
                              this.props.userData.data.credentials.handle
                            );
                          })
                          .sort((a, b) => {
                            return (
                              Date.parse(b.createdAt) - Date.parse(a.createdAt)
                            );
                          }),
                      });
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

  handleImageSubmit = async (e) => {
    const uploadData = new FormData();
    await uploadData.append("imageUrl", e.target.files[0]);

    try {
      await services
        .uploadUserAvatar(uploadData)
        .then((data) => console.log(data));
      await this.props.getUserData();
      await this.props.getAllPosts();
      await this.setState({
        sortedPosts: this.props.allPosts.data
          .filter((post) => {
            return (
              post.userHandle === this.props.userData.data.credentials.handle
            );
          })
          .sort((a, b) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          }),
      });
      console.log(this.state);
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  render() {
    console.log(this.props.userData);
    return this.props.userData ? (
      <Fragment>
        <section className="profile">
          {!this.state.edit ? (
            <Fragment>
              <div className="profile-top">
                <div className="profile-top-left">
                  <div className="profile-top-left-avatar">
                    <img
                      className="profile-top-left-avatar_image"
                      src={this.props.userData.data.credentials.imageUrl}
                      alt="avatar"
                    />
                  </div>
                  <div className="profile-top-left-username">
                    {this.props.userData.data.credentials.handle}
                  </div>
                </div>
                <div className="profile-top-right">
                  <button
                    onClick={() => {
                      this.setState({ edit: true });
                    }}
                    className="profile-top-right-edit"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="profile-info">
                {this.props.userData.data.credentials.bio && (
                  <div className="profile-info-bio">
                    {this.props.userData.data.credentials.bio}
                  </div>
                )}
                <div className="profile-info-other">
                  <div className="profile-info-other-location">
                    {this.props.userData.data.credentials.location && (
                      <Fragment>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                        {this.props.userData.data.credentials.location}
                      </Fragment>
                    )}
                  </div>
                  <div className="profile-info-other-website">
                    {this.props.userData.data.credentials.website && (
                      <Fragment>
                        <FontAwesomeIcon icon={faLink} />{" "}
                        <a
                          className="profile-info-other-website-link"
                          href={this.props.userData.data.credentials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            this.props.userData.data.credentials.website.split(
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
                      Date.parse(this.props.userData.data.credentials.createdAt)
                    )
                      .toDateString()
                      .substr(4)}
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {/* if we are editing the profile */}
              <div className="profile-top">
                <div className="profile-top-left">
                  <div className="profile-top-left-avatar">
                    <img
                      className="profile-top-left-avatar_image"
                      src={this.props.userData.data.credentials.imageUrl}
                      alt="avatar"
                    />
                    <div className="profile-top-left-avatar_change">
                      <form className="profile-top-left-avatar_change-form">
                        <label
                          className="profile-top-left-avatar_change-form--label"
                          htmlFor="img"
                        >
                          Change Avatar
                        </label>
                        <input
                          className="profile-top-left-avatar_change-form--input"
                          onChange={this.handleImageSubmit}
                          type="file"
                          id="img"
                          name="img"
                          accept="image/*"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="profile-top-left-username">
                    @{this.props.userData.data.credentials.handle}
                  </div>
                </div>
                <div className="profile-top-right">
                  <button
                    onClick={async () => {
                      console.log("before", this.state.info);
                      try {
                        await services.editUserData(this.state.info);
                        console.log(this.state);
                      } catch (err) {
                        console.error(err);
                      }
                      await this.props.getUserData();
                      await this.setState({ loading: true });
                      await this.props.getAllPosts();
                      if (this.props.allPosts) {
                        await this.setState({ loading: false });
                        await this.setState({
                          sortedPosts: this.props.allPosts.data
                            .filter((post) => {
                              return (
                                post.userHandle ===
                                this.props.userData.data.credentials.handle
                              );
                            })
                            .sort((a, b) => {
                              return (
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                              );
                            }),
                        });
                      }
                      if (this.state.sortedPosts.length === 0) {
                        await this.setState({ empty: true });
                      }
                      this.setState({ edit: false });
                    }}
                    className="profile-top-right-edit"
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className="profile-info">
                <label htmlFor="bio">Bio</label>
                <input
                  type="text"
                  className="profile-info-bio profile-info_edit"
                  maxLength="300"
                  onChange={async (e) => {
                    await this.setState({
                      info: {
                        ...this.state.info,
                        [e.target.name]: e.target.value,
                      },
                    });
                  }}
                  name="bio"
                  placeholder="Add your bio"
                  id="bio"
                />
                <div className="profile-info-other">
                  <div className="profile-info-other_edit">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      className="profile-info-other-location profile-info_edit"
                      maxLength="30"
                      onChange={async (e) => {
                        await this.setState({
                          info: {
                            ...this.state.info,
                            [e.target.name]: e.target.value,
                          },
                        });
                      }}
                      name="location"
                      placeholder="Add your location"
                      id="location"
                    />
                  </div>
                  <div className="profile-info-other_edit">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      className="profile-info-other-website profile-info_edit"
                      maxLength="100"
                      onChange={async (e) => {
                        await this.setState({
                          info: {
                            ...this.state.info,
                            [e.target.name]: e.target.value,
                          },
                        });
                      }}
                      name="website"
                      placeholder="Add your website"
                      id="website"
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          <div className="profile-info-other-follows">
            <div className="profile-info-other-follows_following">
              {this.props.userData.data.following &&
                this.props.userData.data.following.length}{" "}
              Following
            </div>
            <div className="profile-info-other-follows_followers">
              {this.props.userData.data.followers &&
                this.props.userData.data.followers.length}{" "}
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
  return { userData: state.userData, allPosts: state.allPosts };
};

export default connect(mapStateToProps, { getUserData, getAllPosts })(Profile);
