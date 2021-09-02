import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./actions";

const initialState = {
  userInfo: null,
};

function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, userInfo: action.payload };
    case USER_LOGGED_OUT:
      return { ...state, userInfo: null };
    default:
      return state;
  }
}

const rootReducer = authenticationReducer;

export default rootReducer;
