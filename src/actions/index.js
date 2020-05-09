import services from "../services";

export const getAllPosts = () => {
  return async (dispatch) => {
    const response = await services.getAllPosts();
    dispatch({
      type: "GET_ALL_POSTS",
      payload: response,
    });
  };
};

export const getOnePost = (postId) => {
  return async (dispatch) => {
    const response = await services.getOnePost(postId);
    dispatch({
      type: "GET_ONE_POST",
      payload: response,
    });
  };
};

export const getUserData = () => {
  return async (dispatch) => {
    const response = await services.getUserData();
    dispatch({
      type: "GET_USER_DATA",
      payload: response,
    });
  };
};
