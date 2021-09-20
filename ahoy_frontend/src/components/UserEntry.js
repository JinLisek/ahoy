import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { postBackend } from "../common/BackendApiUtilities";

class UserEntry extends React.Component {
  sendFriendRequest = async () => {
    try {
      await postBackend(`friends/requests/${this.props.username}`);
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
    }
  };

  render = () => (
    <Container>
      <Row>
        <Col>
          <h3>{this.props.username}</h3>
        </Col>
        <Col>
          <Button onClick={this.sendFriendRequest}>Add friend</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default UserEntry;
