import { ListGroup } from "react-bootstrap";

import Messages from "components/Chat/Messages";
import NewMessageForm from "components/Chat/NewMessageForm";

const ChatView = (props) => (
  <ListGroup className="border-0 justify-content-end">
    <ListGroup.Item>Chatting with: {props.roomName}</ListGroup.Item>
    <ListGroup.Item as={Messages} messages={props.messages} />
    <ListGroup.Item as={NewMessageForm} onMsgChange={props.onMsgChange} onSend={props.onSend} />
  </ListGroup>
);

export default ChatView;
