import React from "react";

import { Route } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import UserProfile from "components/UserProfile";
import CreateRoom from "components/Chat/CreateRoom";
import TopBar from "components/TopBar";
import Chat from "components/Chat/Chat";
import SearchPage from "components/SearchPage";
import FriendsList from "components/Chat/FriendsList";
import OpenChats from "components/Chat/OpenChats";

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
      <Row>
        <OpenChats />
      </Row>
    </Container>
  );
};

export default LoggedInView;
