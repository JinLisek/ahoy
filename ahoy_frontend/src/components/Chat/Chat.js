import React from "react";

import { createWebSocket } from "../../common/BackendApiUtilities";

import ChatView from "./ChatView";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], userMessage: "" };
    this.roomName = this.props.match.params.roomName;
  }

  sendMessage = (event) => {
    event.preventDefault();
    const userMsg = this.state.userMessage;
    if (userMsg !== "") {
      const messageJson = JSON.stringify({ message: userMsg });
      this.webSocketClient.send(messageJson);
    }
  };

  updateUserMessage = (event) => {
    this.setState({ userMessage: event.target.value });
  };

  onMessageReceived = (event) => {
    const data = JSON.parse(event.data);
    this.setState((prevState) => {
      return { messages: [...prevState.messages, data] };
    });
  };

  componentDidMount = () => {
    this.webSocketClient = createWebSocket("ws/chat/" + this.roomName + "/", this.onMessageReceived);
  };

  render = () => (
    <ChatView
      roomName={this.roomName}
      messages={this.state.messages}
      onMsgChange={this.updateUserMessage}
      onSend={this.sendMessage}
    />
  );
}

export default Chat;
