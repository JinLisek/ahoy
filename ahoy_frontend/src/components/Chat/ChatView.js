import Container from "react-bootstrap/Container";

import Messages from "./Messages";
import NewMessageForm from "./NewMessageForm";

const ChatView = (props) => (
  <Container>
    <h1>Room: {props.roomName}</h1>
    <Messages messages={props.messages} />
    <NewMessageForm onMsgChange={props.onMsgChange} onSend={props.onSend} />
  </Container>
);

export default ChatView;
