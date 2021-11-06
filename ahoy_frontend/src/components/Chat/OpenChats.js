import { connect } from "react-redux";

import Container from "react-bootstrap/esm/Container";

const OpenChats = (props) => <Container>Open Chats {props.openChats}</Container>;

const mapStateToProps = (state) => {
  return { openChats: state.openChats };
};
export default connect(mapStateToProps)(OpenChats);
