import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import Message from "components/Chat/Message";

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.messagesContainerRef = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages === this.props.messages) return;
    this.updateScroll();
  }

  updateScroll = () => {
    if (this.messagesContainerRef === null) return;

    const containerRef = this.messagesContainerRef;
    containerRef.scrollTop = containerRef.scrollHeight - containerRef.clientHeight;
  };

  render = () => {
    const ref = React.createRef();
    return (
      <ListGroup ref={(ref) => (this.messagesContainerRef = ref)} variant="flush" className="messages-container">
        {this.props.messages.map((msg, idx) => {
          return <Message key={idx + msg.sender + msg.message} author={msg.sender} message={msg.message} />;
        })}
      </ListGroup>
    );
  };
}
export default Messages;
