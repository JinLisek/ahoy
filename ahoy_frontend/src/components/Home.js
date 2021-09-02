import React from "react";

import { connect } from "react-redux";

import NotLoggedInView from "./NotLoggedInView";
import LoggedInView from "./LoggedInView";

const Home = (props) => {
  if (props.userInfo === null) return <NotLoggedInView />;
  return <LoggedInView />;
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(Home);
