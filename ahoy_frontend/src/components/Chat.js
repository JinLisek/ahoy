import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Chat = (props) => {
  return (
    <div>
      <h1>Room: {props.match.params.room_name}</h1>
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

export default Chat;
