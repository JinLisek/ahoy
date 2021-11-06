import { OPEN_USER_CHAT, MESSAGE_RECEIVED } from "../actionTypes";

const initialChatState = { openChats: [], messages: {} };

const chatReducer = (state = initialChatState, action) => {
  switch (action.type) {
    case OPEN_USER_CHAT:
      return { ...state, openChats: Array.from(new Set(...state.openChats, action.payload)) };
    case MESSAGE_RECEIVED:
      const payload = action.payload;
      const otherChatUser = payload.otherChatUser;

      let userMessages = [action.payload];
      if (otherChatUser in state.messages) userMessages = state.messages[otherChatUser].concat(userMessages);
      let newMessages = { ...state.messages };
      newMessages[otherChatUser] = userMessages;

      return { ...state, messages: newMessages };
    default:
      return state;
  }
};

export default chatReducer;
