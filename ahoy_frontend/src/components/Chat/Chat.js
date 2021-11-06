import React from "react";

import { createWebSocket } from "../../common/BackendApiUtilities";
import { postBackend } from "../../common/BackendApiUtilities";

import ChatView from "./ChatView";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], userMessage: "" };
  }

  sendMessage = async (event) => {
    event.preventDefault();
    const userMsg = this.state.userMessage;
    if (userMsg === "") {
      console.log("Chat::sendMessage -- tried sending empty msg");
      return;
    }

    try {
      const sendMsgResp = await postBackend(`chat/send_message/${this.props.seondChatUser}`, { message: userMsg });
      const { data } = await sendMsgResp;
      console.log(data.message);
    } catch (err) {
      if (err.response) {
        const errResp = err.response;
        console.error(`${errResp.statusText}: ${errResp.data}`);
      } else console.error(err);
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
    this.webSocketClient = createWebSocket("ws/chat/", this.onMessageReceived);
  };

  render = () => (
    <ChatView
      roomName={this.props.seondChatUser}
      messages={this.state.messages}
      onMsgChange={this.updateUserMessage}
      onSend={this.sendMessage}
    />
  );
}

export default Chat;
