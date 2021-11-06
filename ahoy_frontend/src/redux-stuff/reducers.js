import { combineReducers } from "redux";

import { USER_LOGGED_IN, USER_LOGGED_OUT, OPEN_USER_CHAT } from "./actionTypes";

const initialAuthenticationState = {
  userInfo: null,
};

function authenticationReducer(state = initialAuthenticationState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, userInfo: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, userInfo: null };
    case OPEN_USER_CHAT:
      return state;
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
