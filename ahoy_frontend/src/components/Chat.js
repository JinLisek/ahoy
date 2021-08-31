import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

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
      return { messages: [...prevState.messages, data.message] };
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

  render = () => {
    return (
      <div>
        <h1>Room: {this.roomName}</h1>
        <Form>
          <Form.Group controlId="formRoomChatHistory">
            <Form.Control
              as="textarea"
              style={{ height: "600px", width: "800px" }}
              value={this.state.messages.join("\n")}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="formUserMessage">
            <Form.Control as="textarea" style={{ height: "100px", width: "700px" }} onChange={this.updateUserMessage} />
            <Button variant="primary" onClick={this.sendMessage}>
              Send
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  };
}

export default Chat;