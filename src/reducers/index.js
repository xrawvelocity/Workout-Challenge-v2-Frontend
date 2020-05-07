import { combineReducers } from "redux";
import allPostsReducer from "./allPostsReducer";
import userDataReducer from "./userDataReducer";

export default combineReducers({
  allPosts: allPostsReducer,
  userData: userDataReducer,
});
