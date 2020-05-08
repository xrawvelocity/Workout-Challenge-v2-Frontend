import React, { Component, Fragment } from "react";
import services from "./../../services/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

//redux
import { connect } from "react-redux";
import { getAllPosts, getUserData } from "../../actions";

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
    await this.props.getUserData()
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.log(err.code)
    })

    this.setState({
      sortedPosts: this.props.allPosts.data.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      }),
    });
    console.log(this.state);
    console.log(this.props);
  }

  showEmptyPost = () => {
    return (
      <div className="home-feed-posts-card">
        <div className="home-feed-posts-card-avatar">
          <img
            src="./img/userdefault.png"
            alt="avatar"
            className="home-feed-posts-card-avatar-img"
          />
        </div>
        <div className="home-feed-posts-card-content">
          <div className="home-feed-posts-card-content-top">
            <div className="home-feed-posts-card-content-top_name"></div>
            <div className="home-feed-posts-card-content-top_username"></div>
            <div className="home-feed-posts-card-content-top_time"></div>
          </div>
          <div className="home-feed-posts-card-content-middle">
            <div>Loading...</div>
          </div>
          <div className="home-feed-posts-card-content-bottom">
            <div className="home-feed-posts-card-content-bottom_like"></div>
            <div className="home-feed-posts-card-content-bottom_comment"></div>
            <div className="home-feed-posts-card-content-bottom_share"></div>
          </div>
        </div>
      </div>
    );
  };

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
        <div
          style={{ fontSize: 50, marginTop: 125, marginLeft: 450 }}
          className="form-button_loading"
        ></div>
      );
    }
  };

  showWorkouts = (type, author, title, likes) => {
    return (
      <div className="home-other-workouts-card">
        <div>
          <div className="home-other-workouts-card_type">{type}</div>
          <div className="home-other-workouts-card_author">&bull; {author}</div>
        </div>
        <div className="home-other-workouts-card_title">{title}</div>
        <div className="home-other-workouts-card_likes">Likes: {likes}</div>
      </div>
    );
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
    return (
      <Fragment>
        <section className="home-feed">
          <div className="home-feed-posts">
            <div className="home-feed-posts-card">
              <div className="home-feed-posts-card-avatar">
                <img
                  src={this.props.userData ? this.props.userData.data.credentials.imageUrl : "./img/userdefault.png"}
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
        <section className="home-other">
          <div className="home-other-search">
            <img
              src="./icons/searchIcon.png"
              alt="search"
              className="home-other-search_icon"
            />
            <input
              type="text"
              className="home-other-search_input"
              placeholder="Search..."
            />
          </div>
          <div className="home-other-workouts">
            <h3 className="home-other-workouts_title">Recommended Workouts</h3>
            {this.showWorkouts(
              "Bodyweight",
              "Victor",
              "Simple Full Body Home Workout",
              "121"
            )}
            {this.showWorkouts("Yoga", "Amanda", "Morning Yoga Routine", "132")}
          </div>
          <div className="home-other-people">
            <h3 className="home-other-people_title">Who to follow</h3>
            <div className="home-other-people-card">
              <div className="home-feed-posts-card-avatar">
                <img
                  src="./img/avatar.jpg"
                  alt="avatar"
                  className="home-feed-posts-card-avatar-img"
                />
              </div>
              <div className="home-other-people-card-middle">
                <div className="home-other-people-card-middle_name">Pepe</div>
                <div className="home-other-people-card-middle_username">
                  @pepeworkout2
                </div>
              </div>
              <div className="home-other-people-card-button">
                <button className="home-other-people-card-button_follow">
                  Follow
                </button>
              </div>
            </div>
            <div className="home-other-people-card">
              <div className="home-feed-posts-card-avatar">
                <img
                  src="./img/avatar.jpg"
                  alt="avatar"
                  className="home-feed-posts-card-avatar-img"
                />
              </div>
              <div className="home-other-people-card-middle">
                <div className="home-other-people-card-middle_name">Jose</div>
                <div className="home-other-people-card-middle_username">
                  @joseworkout3
                </div>
              </div>
              <div className="home-other-people-card-button">
                <button className="home-other-people-card-button_following">
                  Following
                </button>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { allPosts: state.allPosts, userData: state.userData };
};

export default connect(mapStateToProps, { getAllPosts, getUserData })(Home);
