import React from "react";

import { Route } from "react-router-dom";
import Container from "react-bootstrap/Container";

import UserProfile from "./UserProfile";
import CreateRoom from "./CreateRoom";
import TopBar from "./TopBar";
import Chat from "./Chat/Chat";
import SearchPage from "./SearchPage";

const LoggedInView = (props) => {
  return (
    <Container>
      <Route path="/" component={TopBar} />
      <Route exact path="/" component={CreateRoom} />
      <Route exact path="/user/:username" render={(props) => <UserProfile username={props.match.params.username} />} />
      <Route exact path="/search/:searchPhrase" component={SearchPage} />
      <Route exact path="/chat/:roomName" component={Chat} />
    </Container>
  );
};

export default LoggedInView;
