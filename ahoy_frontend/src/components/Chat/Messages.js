import ListGroup from "react-bootstrap/ListGroup";

import Message from "./Message";

const Messages = (props) => (
  <ListGroup variant="flush">
    {props.messages.map((msg) => (
      <Message key={msg.author + msg.message} author={msg.author} message={msg.message} />
    ))}
  </ListGroup>
);

export default Messages;
