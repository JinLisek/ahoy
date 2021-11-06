import React from "react";

import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { createWebSocket } from "../../common/BackendApiUtilities";
import { receiveMessage } from "../../redux-stuff/actions";

import Chat from "./Chat";

class OpenChats extends React.Component {
  onMessageReceived = (event) => {
    const data = JSON.parse(event.data);
    console.log(`onMessageReceived: ${data.sender}, ${data.receiver}`);
    this.props.receiveMessage(data.sender, data.receiver, data.message);
  };

  componentDidMount = () => {
    this.webSocketClient = createWebSocket("ws/chat/", this.onMessageReceived);
  };

  componentWillUnmount = () => {
    this.webSocketClient.close();
  };

  render = () => (
    <Container>
      <h1>OpenChats</h1>
      <ListGroup horizontal>
        {this.props.openChats.map((username) => (
          <ListGroup.Item action key={username} as={Chat} secondChatUser={username} />
        ))}
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { openChats: state.openChats };
};
export default connect(mapStateToProps, { receiveMessage })(OpenChats);
