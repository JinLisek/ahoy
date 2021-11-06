import React from "react";

import { Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import UserProfile from "./UserProfile";
import CreateRoom from "./Chat/CreateRoom";
import TopBar from "./TopBar";
import Chat from "./Chat/Chat";
import SearchPage from "./SearchPage";
import FriendsList from "./Chat/FriendsList";

const LoggedInView = (props) => {
  return (
    <Container fluid>
      <Row>
        <Route path="/" component={TopBar} />
      </Row>
      <Row>
        <Col>
          <Route exact path="/" component={CreateRoom} />
          <Route
            exact
            path="/user/:username"
            render={(props) => <UserProfile username={props.match.params.username} />}
          />
          <Route exact path="/search/:searchPhrase" component={SearchPage} />
          <Route exact path="/chat/:roomName" component={Chat} />
        </Col>
        <Col xs={4}>
          <Route path="/" component={FriendsList} />
        </Col>
      </Row>
      <Row>Open Friends Chats</Row>
    </Container>
  );
};

export default LoggedInView;
