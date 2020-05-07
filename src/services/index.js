import axios from "axios";
let baseURL = "https://us-east1-workoutchallenge30day.cloudfunctions.net/api";

const service = axios.create({ withCredentials: true, baseURL });

const services = {
  getAllPosts: async () => {
    return await service.get("/posts");
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

  logIn: async (data) => {
    return await service.post("/login", data);
  },
  signUp: async (data) => {
    return await service.post("/signup", data);
  },
  getUserData: async () => {
    return await service.get("/user", {
      headers: {
        Authorization: localStorage.FBIdToken,
      },
    });
  },
};

export default services;
