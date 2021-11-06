import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";
import ListGroup from "react-bootstrap/ListGroup";

import Chat from "./Chat";

const OpenChats = (props) => (
  <Container>
    <h1>OpenChats</h1>
    <ListGroup horizontal>
      {props.openChats.map((username) => (
        <ListGroup.Item action key={username} as={Chat} seondChatUser={username} />
      ))}
    </ListGroup>
  </Container>
);

const mapStateToProps = (state) => {
  return { openChats: state.openChats };
};
export default connect(mapStateToProps)(OpenChats);
