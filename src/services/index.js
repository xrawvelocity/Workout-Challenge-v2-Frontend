import axios from "axios";
let baseURL = "https://us-east1-workoutchallenge30day.cloudfunctions.net/api";

const service = axios.create({ withCredentials: true, baseURL });

const services = {
  getAllPosts: async () => {
    return await service.get("/posts");
  },
  createPost: async (data) => {
    return await service.post("/posts", data);
  },
  logIn: async (data) => {
    return await service.post("/login", data);
  },
};

export default services;
