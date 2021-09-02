import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./actionTypes";

export const loginUser = (userInfo) => {
  return { type: USER_LOGGED_IN, payload: userInfo };
};

export const logoutUser = () => {
  return { type: USER_LOGGED_OUT, payload: null };
};
