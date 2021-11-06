import Col from "react-bootstrap/Col";

import Messages from "components/Chat/Messages";
import NewMessageForm from "components/Chat/NewMessageForm";

const ChatView = (props) => (
  <Col md={4}>
    <h1>Room: {props.roomName}</h1>
    <Messages messages={props.messages} />
    <NewMessageForm onMsgChange={props.onMsgChange} onSend={props.onSend} />
  </Col>
);

export default ChatView;
