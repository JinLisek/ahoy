import React from "react";

import { Container } from "react-bootstrap";

import UserInformation from "./UserInformation";
import CreateRoom from "./CreateRoom";
import Logout from "./Logout";

const LoggedInView = (props) => {
  return (
    <Container>
      <UserInformation />
      <Logout />
      <CreateRoom history={props.history} />
    </Container>
  );
};

export default LoggedInView;
