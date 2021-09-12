import React from "react";

import { connect } from "react-redux";

import NotLoggedInView from "./components/NotLoggedInView";
import LoggedInView from "./components/LoggedInView";

import "bootstrap/dist/css/bootstrap.min.css";

const App = (props) => {
  if (props.userInfo === null) return <NotLoggedInView />;
  return <LoggedInView history={props.history} />;
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(App);
