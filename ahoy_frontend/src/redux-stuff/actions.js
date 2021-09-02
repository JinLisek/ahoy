export const USER_LOGGED_IN = "authentication/userLoggedIn";
export const USER_LOGGED_OUT = "authentication/userLoggedOut";

export const loginUser = (userInfo) => {
  return { type: USER_LOGGED_IN, payload: userInfo };
};

export const logoutUser = () => {
  return { type: USER_LOGGED_IN, payload: null };
};
