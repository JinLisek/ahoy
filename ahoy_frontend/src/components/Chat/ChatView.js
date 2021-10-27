import Messages from "./Messages";
import NewMessageForm from "./NewMessageForm";

const ChatView = (props) => (
  <div>
    <h1>Room: {props.roomName}</h1>
    <Messages messages={props.messages} />
    <NewMessageForm onMsgChange={props.onMsgChange} onSend={props.onSend} />
  </div>
);

export default ChatView;
