import React from "react";

import { connect } from "react-redux";

import { postBackend } from "common/BackendApiUtilities";

import ChatView from "components/Chat/ChatView";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userMessage: "" };
  }

  sendMessage = async (event) => {
    event.preventDefault();
    const userMsg = this.state.userMessage;
    if (userMsg === "") {
      console.log("Chat::sendMessage -- tried sending empty msg");
      return;
    }

    try {
      const sendMsgResp = await postBackend(`chat/send_message/${this.props.secondChatUser}`, { message: userMsg });
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

  render = () => (
    <ChatView
      roomName={this.props.secondChatUser}
      messages={this.props.messages}
      onMsgChange={this.updateUserMessage}
      onSend={this.sendMessage}
    />
  );
}

const mapStateToProps = ({ chat }, ownProps) => {
  if (!(ownProps.secondChatUser in chat.messages)) return { messages: [] };

  return { messages: chat.messages[ownProps.secondChatUser] };
};
export default connect(mapStateToProps)(Chat);
