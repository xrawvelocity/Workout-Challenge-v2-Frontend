import axios from "axios";
let baseURL = "https://us-east1-workoutchallenge30day.cloudfunctions.net/api";

const service = axios.create({ withCredentials: true, baseURL });

const services = {
  getAllPosts: async () => {
    return await service.get("/posts");
  },
  getOnePost: async (postId) => {
    return await service.get(`/post/${postId}`);
  },
  deleteOnePost: async (postId) => {
    return await service.delete(`/post/${postId}`, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  createPost: async (data) => {
    return await service.post("/posts", data, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  likePost: async (postId) => {
    return await service.get(`/post/${postId}/like`, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  unlikePost: async (postId) => {
    return await service.get(`/post/${postId}/unlike`, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  addComment: async (postId, data) => {
    return await service.post(`/post/${postId}/comment`, data, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },

  logIn: async (data) => {
    return await service.post("/login", data);
  },
  signUp: async (data) => {
    console.log("zebra", data);
    return await service.post("/signup", data);
  },

  getAllUsersData: async () => {
    return await service.get("/users", {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  getOneUserData: async (handle) => {
    return await service.get(`/user/${handle}`);
  },
  getUserData: async () => {
    return await service.get("/user", {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  editUserData: async (data) => {
    return await service.post("/user", data, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  uploadUserAvatar: async (data) => {
    return await service.post("/user/image", data, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  followUser: async (handle) => {
    return await service.get(`/user/${handle}/follow`, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  unfollowUser: async (handle) => {
    return await service.get(`/user/${handle}/unfollow`, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
  markNotificationRead: async (data) => {
    return await service.post("/notifications", data, {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
};

export default services;
