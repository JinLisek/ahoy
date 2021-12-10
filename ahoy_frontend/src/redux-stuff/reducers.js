import { combineReducers } from "redux";

import authenticationReducer from "./reducers/AuthenticationReducer";
import chatReducer from "./reducers/ChatReducer";

const rootReducer = combineReducers({ authentication: authenticationReducer, chat: chatReducer });

export default rootReducer;
