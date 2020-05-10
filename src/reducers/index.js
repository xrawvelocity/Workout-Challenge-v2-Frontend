import { combineReducers } from "redux";
import allPostsReducer from "./allPostsReducer";
import onePostReducer from "./onePostReducer";
import userDataReducer from "./userDataReducer";
import otherUserDataReducer from "./otherUserDataReducer";

export default combineReducers({
  allPosts: allPostsReducer,
  onePost: onePostReducer,
  userData: userDataReducer,
  otherUserData: otherUserDataReducer
});
