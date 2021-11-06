import Container from "react-bootstrap/Container";

import Messages from "components/Chat/Messages";
import NewMessageForm from "components/Chat/NewMessageForm";

const ChatView = (props) => (
  <Container>
    <h1>Room: {props.roomName}</h1>
    <Messages messages={props.messages} />
    <NewMessageForm onMsgChange={props.onMsgChange} onSend={props.onSend} />
  </Container>
);

export default ChatView;
