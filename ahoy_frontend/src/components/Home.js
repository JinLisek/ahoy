import React from "react";

import { connect } from "react-redux";

import CreateRoom from "./CreateRoom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const Home = (props) => {
  return (
    <div>
      {props.userInfo === null ? <Register /> : null}
      {props.userInfo === null ? <Login /> : null}
      {props.userInfo !== null ? <Logout /> : null}
      {props.userInfo !== null ? <CreateRoom history={props.history} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { userInfo } = state;
  return { userInfo };
};
export default connect(mapStateToProps)(Home);
