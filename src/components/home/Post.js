import React, { Component } from "react";
import services from "./../../services/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//redux
import { connect } from "react-redux";
import { getOnePost, getUserData } from "../../actions";

class Post extends Component {
  state = {
    loading: false,
    body: "",
  };

  async componentDidMount() {
    dayjs.extend(relativeTime);
    await this.props.getUserData();
    await this.setState({ loading: true });
    await this.props.getOnePost(this.props.match.params.postId);
    console.log(this.props.onePost);
    if (this.props.onePost) {
      await this.setState({
        loading: false,
        onePost: this.props.onePost,
      });
    }
  }

  hasLiked = (postId) => {
    return this.props.userData.data.likes.some((like) => {
      return like.postId === postId;
    });
  };

  showComments = () => {
    return this.state.onePost.data.comments.map((comment) => {
      return (
        <div className="home-feed-posts-card">
          <div className="home-feed-posts-card-avatar">
            <img
              src={comment.userImage}
              alt="avatar"
              className="home-feed-posts-card-avatar-img"
            />
          </div>
          <div className="home-feed-posts-card-content">
            <div className="home-feed-posts-card-content-top">
              <div className="home-feed-posts-card-content-top_name">
                {comment.userHandle}
              </div>
              <div className="home-feed-posts-card-content-top_time">
                &bull; {dayjs(comment.createdAt).fromNow()}
              </div>
            </div>
            <div className="home-feed-posts-card-content-middle">
              <div>{comment.body}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  handleComment = (e) => {
    this.setState({
      body: e.target.value,
    });
  };

  postComment = async () => {
    await services
      .addComment(this.state.onePost.data.postId, { body: this.state.body })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    await this.props.getOnePost(this.props.match.params.postId);
    await this.setState({
      onePost: this.props.onePost,
      body: "",
    });
  };

  render() {
    console.log(this.props.onePost);
    return this.state.onePost ? (
      <section style={{ width: "60%" }} className="home-feed">
        <div className="home-feed-posts">
          <div className="home-feed-posts-card">
            <div className="home-feed-posts-card-avatar">
              <img
                src={this.state.onePost.data.userImage}
                alt="avatar"
                className="home-feed-posts-card-avatar-img"
              />
            </div>
            <div className="home-feed-posts-card-content">
              <div className="home-feed-posts-card-content-top">
                <div className="home-feed-posts-card-content-top_name">
                  {this.state.onePost.data.userHandle}
                </div>
                <div className="home-feed-posts-card-content-top_time">
                  &bull; {dayjs(this.state.onePost.data.createdAt).fromNow()}
                </div>
              </div>
              <div className="home-feed-posts-card-content-middle">
                <div>{this.state.onePost.data.body}</div>
              </div>
              <div className="home-feed-posts-card-content-bottom">
                {this.hasLiked(this.state.onePost.data.postId) ? (
                  <div
                    onClick={async () => {
                      await services.unlikePost(this.state.onePost.data.postId);
                      await this.props.getOnePost(
                        this.props.match.params.postId
                      );
                      await this.props.getUserData();
                      await this.setState({
                        onePost: this.props.onePost,
                      });
                    }}
                  >
                    {this.state.onePost.data.likeCount}{" "}
                    <FontAwesomeIcon
                      className="home-feed-posts-card-content-bottom_liked"
                      icon={faHeart}
                    />
                  </div>
                ) : (
                  <div
                    onClick={async () => {
                      await services
                        .likePost(this.state.onePost.data.postId)
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
                      await this.props.getOnePost(
                        this.props.match.params.postId
                      );
                      await this.props.getUserData();
                      await this.setState({
                        onePost: this.props.onePost,
                      });
                    }}
                  >
                    {this.state.onePost.data.likeCount}{" "}
                    <FontAwesomeIcon
                      className="home-feed-posts-card-content-bottom_like"
                      icon={faHeart}
                    />
                  </div>
                )}

                <div>
                  {this.state.onePost.data.commentCount}{" "}
                  <FontAwesomeIcon
                    className="home-feed-posts-card-content-bottom_comment"
                    icon={faComment}
                  />
                </div>
              </div>
              <div>
                <input
                  onChange={(e) => this.handleComment(e)}
                  type="text"
                  value={this.state.body}
                  placeholder="Say what you think..."
                  className="home-feed-posts-card-content-bottom_comment-input"
                />
                <button
                  onClick={this.postComment}
                  className="home-feed-posts-card-content-bottom_comment-button"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
          {this.showComments()}
        </div>
      </section>
    ) : (
      <div style={{ fontSize: 50 }} className="form-button_loading"></div>
    );
  }
}

const mapStateToProps = (state) => {
  return { onePost: state.onePost, userData: state.userData };
};

export default connect(mapStateToProps, { getOnePost, getUserData })(Post);
