export default (user = null, action) => {
  switch (action.type) {
    case "GET_ONE_USER_DATA":
      return (user = action.payload);
    default:
      return user;
  }
};
