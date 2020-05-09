export default (post = null, action) => {
    switch (action.type) {
      case "GET_ONE_POST":
        return (post = action.payload);
      default:
        return post;
    }
  };
  