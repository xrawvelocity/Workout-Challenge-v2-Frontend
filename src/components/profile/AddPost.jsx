import React, { Component } from "react";
import services from "./../../services/index";

//redux
import { connect } from "react-redux";
import { getAllPosts, getUserData } from "../../actions";

class AddPost extends Component {
  state = {
    body: "",
    success: false,
  };

  async componentDidMount() {
    await this.props
      .getUserData()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.code);
      });
  }

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
      .then((data) => {
        console.log("success", data);
        this.setState({ body: "", success: true });
        setTimeout(() => {
          this.props.history.push("/");
        }, 2000);
      })
      .catch((err) => {
        localStorage.removeItem("FBIdToken");
        window.location.href = "/login";
      });
  };

  render() {
    return (
      <div style={{marginTop: "120px"}} className="home-feed-posts-card">
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
              style={{height: "250px", fontSize: "22px"}}
              maxLength="300"
              value={this.state.body}
              placeholder="What's on your mind..."
              required
            />
            {this.state.success ? (
              <button
                disabled
                className="home-feed-posts-card-content-post_form-button_success"
                type="submit"
              >
                Success
              </button>
            ) : (
              <button
                className="home-feed-posts-card-content-post_form-button"
                type="submit"
              >
                Post
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { allPosts: state.allPosts, userData: state.userData };
};

export default connect(mapStateToProps, { getAllPosts, getUserData })(AddPost);
