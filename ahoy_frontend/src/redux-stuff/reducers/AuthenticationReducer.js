import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actionTypes";

const initialAuthenticationState = {
  userInfo: null,
};

const authenticationReducer = (state = initialAuthenticationState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, userInfo: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, userInfo: null };

    default:
      return state;
  }
};

export default authenticationReducer;
