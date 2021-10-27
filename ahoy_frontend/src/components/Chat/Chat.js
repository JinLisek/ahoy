import React from "react";

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

  openEventListener = (event) => {
    console.log("Received open event on websocket");
  };

  onMessageReceived = (event) => {
    const data = JSON.parse(event.data);
    this.setState((prevState) => {
      return { messages: [...prevState.messages, data] };
    });
  };

  componentDidMount = () => {
    const webSocketAddr = "ws://192.168.1.165:8000/ws/chat/" + this.roomName + "/";
    this.webSocketClient = new WebSocket(webSocketAddr);
    this.webSocketClient.onmessage = this.onMessageReceived;

    this.webSocketClient.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };
    this.webSocketClient.addEventListener("open", this.openEventListener);
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
