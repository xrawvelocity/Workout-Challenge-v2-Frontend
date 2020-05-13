export default (users = null, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_DATA":
      return (users = action.payload);
    default:
      return users;
  }
};
