import axios from "axios";
import Cookies from "universal-cookie";

import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class UserEntry extends React.Component {
  sendFriendRequest = async () => {
    console.log("Add friend: " + this.props.username);

    const cookies = new Cookies();
    const csrfCookie = cookies.get("csrftoken");

    try {
      await axios({
        method: "post",
        url: `http://192.168.1.165:8000/friends/request/${this.props.username}`,
        withCredentials: true,
        xsrfHeaderName: "X-CSRFToken",
        xsrfCookieName: "csrftoken",
        headers: { "X-CSRFToken": csrfCookie },
      });
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
