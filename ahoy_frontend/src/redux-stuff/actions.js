import { USER_LOGGED_IN, USER_LOGGED_OUT, OPEN_USER_CHAT, MESSAGE_RECEIVED } from "./actionTypes";

export const loginUser = (userInfo) => {
  return { type: USER_LOGGED_IN, payload: userInfo };
};

export const logoutUser = () => {
  return { type: USER_LOGGED_OUT, payload: null };
};

export const openUserChat = (username) => {
  return { type: OPEN_USER_CHAT, payload: username };
};

export const receiveMessage = (otherChatUser, sender, message) => {
  return { type: MESSAGE_RECEIVED, payload: { otherChatUser, sender, message } };
};
