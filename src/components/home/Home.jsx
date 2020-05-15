import React, { Component, Fragment } from "react";
import services from "./../../services/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

//redux
import { connect } from "react-redux";
import { getAllPosts, getUserData } from "../../actions";

import { Link } from "react-router-dom";

class Home extends Component {
  state = {};

  async componentDidMount() {
    await this.props
      .getAllPosts()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.code);
      });
    await this.props
      .getUserData()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.code);
      });

    this.setState({
      sortedPosts: this.props.allPosts.data.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      }),
    });
    console.log(this.state);
    console.log(this.props);
  }

  hasLiked = (postId) => {
    return this.props.userData.data.likes.some((like) => {
      return like.postId === postId;
    });
  };

  showPosts = () => {
    if (this.state.sortedPosts) {
      dayjs.extend(relativeTime);
      return this.state.sortedPosts.map((post) => {
        return (
          <div key={post.postId} className="home-feed-posts-card">
            {post.userHandle === this.props.userData.data.credentials.handle ? (
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
            ) : null}
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
                      this.setState({
                        sortedPosts: this.props.allPosts.data.sort((a, b) => {
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
                      this.setState({
                        sortedPosts: this.props.allPosts.data.sort((a, b) => {
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
        <div
          style={{ fontSize: 50, marginTop: 125, marginLeft: 450 }}
          className="form-button_loading"
        ></div>
      );
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitPost = async (e) => {
    e.preventDefault();
    await services
      .createPost({
        body: this.state.body,
      })
      .then((data) => console.log("success", data))
      .catch((err) => {
        localStorage.removeItem("FBIdToken");
        window.location.href = "/login";
      });
    await this.props.getAllPosts();
    this.setState({
      sortedPosts: this.props.allPosts.data.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      }),
    });
    this.setState({ body: "" });
  };

  render() {
    return this.props.allPosts ? (
      <Fragment>
        <section className="home-feed">
          <div className="home-feed-posts">
            <div className="home-feed-posts-card">
              <div className="home-feed-posts-card-avatar">
                <img
                  src={
                    this.props.userData
                      ? this.props.userData.data.credentials.imageUrl
                      : "./img/userdefault.png"
                  }
                  alt="avatar"
                  className="home-feed-posts-card-avatar-img"
                />
              </div>
              <div className="home-feed-posts-card-content-post">
                <form
                  className="home-feed-posts-card-content-post_form"
                  onSubmit={(e) => this.submitPost(e)}
                >
                  <textarea
                    className="home-feed-posts-card-content-post_form-input"
                    onChange={(e) => this.handleChange(e)}
                    type="text"
                    name="body"
                    maxLength="300"
                    value={this.state.body}
                    placeholder="What's on your mind..."
                    required
                  />
                  <button
                    className="home-feed-posts-card-content-post_form-button"
                    type="submit"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
            {this.showPosts()}
          </div>
        </section>
      </Fragment>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return { allPosts: state.allPosts, userData: state.userData };
};

export default connect(mapStateToProps, { getAllPosts, getUserData })(Home);
