import { combineReducers } from "redux";

import { USER_LOGGED_IN, USER_LOGGED_OUT, OPEN_USER_CHAT, MESSAGE_RECEIVED } from "./actionTypes";

const initialAuthenticationState = {
  userInfo: null,
  openChats: [],
  messages: {},
};

function authenticationReducer(state = initialAuthenticationState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, userInfo: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, userInfo: null };
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
}

const initialChatState = {};

function chatReducer(state = initialChatState, action) {
  return state;
}

const rootReducer = authenticationReducer; //combineReducers({ authentication: authenticationReducer, chat: chatReducer });

export default rootReducer;
