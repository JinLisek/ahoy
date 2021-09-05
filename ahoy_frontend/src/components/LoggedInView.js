import React from "react";

import { Container } from "react-bootstrap";

import UserInformation from "./UserInformation";
import CreateRoom from "./CreateRoom";
import Logout from "./Logout";
import SearchInput from "./SearchInput";

const LoggedInView = (props) => {
  return (
    <Container>
      <UserInformation />
      <Logout />
      <SearchInput history={props.history} />
      <CreateRoom history={props.history} />
    </Container>
  );
};

export default LoggedInView;
