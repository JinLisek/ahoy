import React from "react";

import { connect } from "react-redux";

import { Container } from "react-bootstrap";

import UserInformation from "./UserInformation";
import CreateRoom from "./CreateRoom";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";

const Home = (props) => {
  return (
    <Container>
      {props.userInfo === null ? <Register /> : null}
      {props.userInfo === null ? <Login /> : null}
      {props.userInfo !== null ? <UserInformation /> : null}
      {props.userInfo !== null ? <Logout /> : null}
      {props.userInfo !== null ? <CreateRoom history={props.history} /> : null}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(Home);
