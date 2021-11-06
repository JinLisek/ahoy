import ListGroup from "react-bootstrap/ListGroup";

import Message from "components/Chat/Message";

const Messages = (props) => (
  <ListGroup variant="flush">
    {props.messages.map((msg) => (
      <Message key={msg.sender + msg.message} author={msg.sender} message={msg.message} />
    ))}
  </ListGroup>
);

export default Messages;
