import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewMessageForm = (props) => (
  <Form>
    <Form.Group controlId="formUserMessage">
      <Form.Control as="textarea" style={{ height: "100px", width: "700px" }} onChange={props.onMsgChange} />
      <Button variant="primary" onClick={props.onSend}>
        Send
      </Button>
    </Form.Group>
  </Form>
);

export default NewMessageForm;
