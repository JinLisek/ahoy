import React from "react";

import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

import { createWebSocket } from "common/BackendApiUtilities";
import { receiveMessage } from "redux-stuff/actions";

import Chat from "components/Chat/Chat";

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
    <Container fluid className="fixed-bottom">
      <h1>OpenChats</h1>
      <Row>
        {this.props.openChats.map((username) => (
          <Chat action key={username} secondChatUser={username} />
        ))}
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ authentication, chat }) => {
  return { openChats: chat.openChats, userInfo: authentication.userInfo };
};
export default connect(mapStateToProps, { receiveMessage })(OpenChats);
