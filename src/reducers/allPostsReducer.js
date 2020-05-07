export default (allPosts = null, action) => {
  switch (action.type) {
    case "GET_ALL_POSTS":
      return (allPosts = action.payload);
    default:
      return allPosts;
  }
};
