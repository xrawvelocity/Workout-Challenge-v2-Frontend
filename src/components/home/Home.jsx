import React, { Component } from "react";
import Header from "../partials/Header";

export default class Home extends Component {
  showPosts = (name, username, time, content) => {
    return (
      <div className="home-feed-posts-card">
        <div className="home-feed-posts-card-avatar">
          <img
            src="./img/avatar.jpg"
            alt="avatar"
            className="home-feed-posts-card-avatar-img"
          />
        </div>
        <div className="home-feed-posts-card-content">
          <div className="home-feed-posts-card-content-top">
            <div className="home-feed-posts-card-content-top_name">{name}</div>
            <div className="home-feed-posts-card-content-top_username">
              {username}
            </div>
            <div className="home-feed-posts-card-content-top_time">
              &bull; {time}
            </div>
          </div>
          <div className="home-feed-posts-card-content-middle">
            <div>{content}</div>
          </div>
          <div className="home-feed-posts-card-content-bottom">
            <div className="home-feed-posts-card-content-bottom_like">Like</div>
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
              {this.showPosts(
                "Victor",
                "@victorworkout1",
                "16h",
                `Has anyone heard of this new trend that says to only eat One Meal A Day (OMAD)?`
              )}
              {this.showPosts(
                "Pepe",
                "@pepeworkout2",
                "18h",
                `Is doing yoga before working out better than doing it after?`
              )}
              {this.showPosts(
                "Jose",
                "@joseworkout3",
                "19h",
                `An easy way to do at least 100 pushups per day is to split them into small sets throughout the day to make it easy to develop the habit.`
              )}
              {this.showPosts(
                "Juan",
                "@juanworkout4",
                "20h",
                `Sometimes I don't want to workout... that's when it's more crucial that I do, comfort is your enemy.`
              )}
              {this.showPosts(
                "Jose",
                "@joseworkout3",
                "19h",
                `An easy way to do at least 100 pushups per day is to split them into small sets throughout the day to make it easy to develop the habit.`
              )}
              {this.showPosts(
                "Jose",
                "@joseworkout3",
                "19h",
                `An easy way to do at least 100 pushups per day is to split them into small sets throughout the day to make it easy to develop the habit.`
              )}
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
