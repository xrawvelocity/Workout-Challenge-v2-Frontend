import React, { Component, Fragment } from "react";
import Header from "../partials/Header";
import services from "./../../services/index";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default class Home extends Component {
  state = {};

  async componentDidMount() {
    console.log("yes");
    let posts = await services.getAllPosts();
    console.log("test", posts);
    this.setState({
      allPosts: posts.data.sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      }),
    });
    console.log(this.state);
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
    if (this.state.allPosts) {
      dayjs.extend(relativeTime);
      return this.state.allPosts.map((post) => {
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
                <div className="home-feed-posts-card-content-bottom_like">
                  Like
                </div>
                <div className="home-feed-posts-card-content-bottom_comment">
                  Comment
                </div>
                <div className="home-feed-posts-card-content-bottom_share">
                  Share
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <Fragment>
          {this.showEmptyPost()}
          {this.showEmptyPost()}
          {this.showEmptyPost()}
          {this.showEmptyPost()}
          {this.showEmptyPost()}
        </Fragment>
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
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitPost = async (e) => {
    e.preventDefault();
    await services.createPost({
      body: this.state.body,
    });
    this.setState({body: ''})
  };

  render() {
    return (
      <div>
        <Header />
        <main className="home">
          <section className="home-nav">
            <div>
              <span>Home</span>
            </div>
            <div>
              <span>Messages</span>
            </div>
            <div>
              <span>Workouts</span>
            </div>
            <div>
              <span>Profile</span>
            </div>
            <div>
              <span>Post</span>
            </div>
          </section>
          <section className="home-feed">
            <div className="home-feed-posts">
              <div className="home-feed-posts-card">
                <div className="home-feed-posts-card-avatar">
                  <img
                    src="./img/avatar.jpg"
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
              <h3 className="home-other-workouts_title">
                Recommended Workouts
              </h3>
              {this.showWorkouts(
                "Bodyweight",
                "Victor",
                "Simple Full Body Home Workout",
                "121"
              )}
              {this.showWorkouts(
                "Yoga",
                "Amanda",
                "Morning Yoga Routine",
                "132"
              )}
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
        </main>
      </div>
    );
  }
}
