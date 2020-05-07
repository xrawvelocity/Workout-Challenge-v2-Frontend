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

export const getUserData = () => {
  return async (dispatch) => {
    const response = await services.getUserData();
    dispatch({
      type: "GET_USER_DATA",
      payload: response,
    });
  };
};
