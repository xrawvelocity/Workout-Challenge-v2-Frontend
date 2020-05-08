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

class Profile extends Component {
  state = {
    loading: false,
    empty: false,
    edit: false,
    info: {},
  };

  async componentDidMount() {
    await this.props.getUserData();
    await this.setState({ loading: true });
    await this.props.getAllPosts();
    if (this.props.allPosts) {
      await this.setState({ loading: false });
      await this.setState({
        sortedPosts: this.props.allPosts.data
          .filter((post) => {
            return post.userHandle === this.props.userData.credentials.handle;
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

  showPosts = () => {
    if (this.state.sortedPosts) {
      dayjs.extend(relativeTime);
      return this.state.sortedPosts.map((post) => {
        return (
          <div key={post.postId} className="home-feed-posts-card">
            <div className="home-feed-posts-card-avatar">
              <img
                src={post.userImage}
                alt="avatar"
                className="home-feed-posts-card-avatar-img"
              />
            </div>
            <div className="home-feed-posts-card-content">
              <div className="home-feed-posts-card-content-top">
                <div className="home-feed-posts-card-content-top_name">
                  {post.userHandle}
                </div>
                <div className="home-feed-posts-card-content-top_username">
                  @{post.userHandle}
                </div>
                <div className="home-feed-posts-card-content-top_time">
                  &bull; {dayjs(post.createdAt).fromNow()}
                </div>
              </div>
              <div className="home-feed-posts-card-content-middle">
                <div>{post.body}</div>
              </div>
              <div className="home-feed-posts-card-content-bottom">
                <div
                  onClick={async () => {
                    await services.likePost(post.postId);
                    await this.props.getAllPosts();
                    this.setState({
                      sortedPosts: this.props.allPosts.data.sort((a, b) => {
                        return (
                          Date.parse(b.createdAt) - Date.parse(a.createdAt)
                        );
                      }),
                    });
                  }}
                  className="home-feed-posts-card-content-bottom_like"
                >
                  {post.likeCount > 0 && post.likeCount}{" "}
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className="home-feed-posts-card-content-bottom_comment">
                  {post.commentCount > 0 && post.commentCount}{" "}
                  <FontAwesomeIcon icon={faComment} />
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
      await services.uploadUserAvatar(uploadData)
      .then(data => console.log(data));
      await this.props.getUserData();
      await this.props.getAllPosts();
      await this.setState({
        sortedPosts: this.props.allPosts.data
          .filter((post) => {
            return post.userHandle === this.props.userData.credentials.handle;
          })
          .sort((a, b) => {
            return Date.parse(b.createdAt) - Date.parse(a.createdAt);
          }),
      });
      console.log(this.state)
    } catch (err) {
      console.log("*****", err.message);
    }
  };

  render() {
    return (
      <Fragment>
        <section className="profile">
          {!this.state.edit ? (
            <Fragment>
              <div className="profile-top">
                <div className="profile-top-left">
                  <div className="profile-top-left-avatar">
                    <img
                      className="profile-top-left-avatar_image"
                      src={this.props.userData.credentials.imageUrl}
                      alt="avatar"
                    />
                  </div>
                  <div className="profile-top-left-username">
                    @{this.props.userData.credentials.handle}
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
                {this.props.userData.credentials.bio && (
                  <div className="profile-info-bio">
                    {this.props.userData.credentials.bio}
                  </div>
                )}
                <div className="profile-info-other">
                  <div className="profile-info-other-location">
                    {this.props.userData.credentials.location && (
                      <Fragment>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                        {this.props.userData.credentials.location}
                      </Fragment>
                    )}
                  </div>
                  <div className="profile-info-other-website">
                    {this.props.userData.credentials.website && (
                      <Fragment>
                        <FontAwesomeIcon icon={faLink} />{" "}
                        <a
                          className="profile-info-other-website-link"
                          href={this.props.userData.credentials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {
                            this.props.userData.credentials.website.split(
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
                      Date.parse(this.props.userData.credentials.createdAt)
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
                      src={this.props.userData.credentials.imageUrl}
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
                    @{this.props.userData.credentials.handle}
                  </div>
                </div>
                <div className="profile-top-right">
                  <button
                    onClick={async () => {
                      console.log("before", this.state.info);
                      try {
                        await services.editUserData(this.state.info);
                        // this.forceUpdate();
                        console.log(this.state);
                      } catch (err) {
                        console.error(err);
                      }
                      await this.props.getUserData();
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

          {this.state.empty ? (
            <div className="profile-content">No posts yet...</div>
          ) : (
            <div className="profile-content">{this.showPosts()}</div>
          )}
        </section>
        <section></section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { userData: state.userData.data, allPosts: state.allPosts };
};

export default connect(mapStateToProps, { getUserData, getAllPosts })(Profile);
