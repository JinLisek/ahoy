import React from "react";

import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";

import { createWebSocket } from "../../common/BackendApiUtilities";
import { receiveMessage } from "../../redux-stuff/actions";

import Chat from "./Chat";

class OpenChats extends React.Component {
  onMessageReceived = (event) => {
    const { other_chat_user, sender, message } = JSON.parse(event.data);

    this.props.receiveMessage(other_chat_user, sender, message);
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

const mapStateToProps = ({ authentication, chat }) => {
  console.log(authentication);
  return { openChats: chat.openChats, userInfo: authentication.userInfo };
};
export default connect(mapStateToProps, { receiveMessage })(OpenChats);
