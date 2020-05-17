export default (allChats = null, action) => {
  switch (action.type) {
    case "GET_ALL_CHATS":
      return (allChats = action.payload);
    default:
      return allChats;
  }
};
