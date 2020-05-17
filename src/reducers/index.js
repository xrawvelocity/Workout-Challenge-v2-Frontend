import { combineReducers } from "redux";
import allPostsReducer from "./allPostsReducer";
import onePostReducer from "./onePostReducer";
import userDataReducer from "./userDataReducer";
import otherUserDataReducer from "./otherUserDataReducer";
import allUsersDataReducer from "./allUsersDataReducer";
import allChatsReducer from "./allChatsReducer";

export default combineReducers({
  allPosts: allPostsReducer,
  onePost: onePostReducer,
  userData: userDataReducer,
  otherUserData: otherUserDataReducer,
  allUsersData: allUsersDataReducer,
  allChatsData: allChatsReducer
});
