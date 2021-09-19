import React from "react";

import { Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import CreateRoom from "./CreateRoom";
import TopBar from "./TopBar";
import Chat from "./Chat";
import SearchView from "./SearchView";

const LoggedInView = (props) => {
  return (
    <Container>
      <Route path="/" component={TopBar} />
      <Route exact path="/" component={CreateRoom} />
      <Route exact path="/search/:searchPhrase" component={SearchView} />
      <Route exact path="/chat/:roomName" component={Chat} />
    </Container>
  );
};

export default LoggedInView;
