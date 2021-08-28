import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.roomName = this.props.match.params.roomName;
  }

  render = () => {
    return (
      <div>
        <h1>Room: {this.roomName}</h1>
        <Form>
          <Form.Group controlId="formRoomChatHistory">
            <Form.Control as="textarea" style={{ height: "600px", width: "800px" }} />
          </Form.Group>
          <Form.Group controlId="formUserMessage">
            <Form.Control as="textarea" style={{ height: "100px", width: "700px" }} />
            <Button variant="primary" type="submit">
              Send
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  openEventListener = (event) => {
    console.log("Received open event on websocket");
  };

  componentDidMount = () => {
    const webSocketAddr = "ws://192.168.1.165:8000/ws/chat/" + this.roomName + "/";
    this.webSocketClient = new WebSocket(webSocketAddr);
    this.webSocketClient.addEventListener("open", this.openEventListener);
  };
}

export default Chat;
