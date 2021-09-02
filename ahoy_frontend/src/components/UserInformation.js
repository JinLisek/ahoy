import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserInformation = (props) => {
  return (
    <Container>
      <Row>
        <Col>Username: {props.userInfo.username}</Col>
        <Col>Email: {props.userInfo.email}</Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.userInfo };
};
export default connect(mapStateToProps)(UserInformation);
